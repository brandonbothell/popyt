import YouTube, { Video, Channel, Playlist, YTComment } from '..'
import { Cache, Parser } from '../util'

/**
 * @ignore
 */
export class GenericService {
  /* istanbul ignore next */
  public static async getItemById (youtube: YouTube, type: typeof Video | typeof Channel | typeof Playlist | typeof YTComment, id: string): Promise<Video | Channel | Playlist | YTComment> {
    if (!([ Video, Channel, Playlist, YTComment ].includes(type))) {
      return Promise.reject('Type must be a video, channel, playlist, or comment.')
    }

    const cached = Cache.get(`get://${type.endpoint}/${id}`)

    if (youtube._shouldCache && cached) {
      return cached
    }

    const result = await youtube._request.api(type.endpoint, {
      id,
      fields: encodeURIComponent(type.fields),
      part: type === YTComment ? !type.part.includes('snippet') ? type.part + ',snippet' : type.part : type.part
    }, youtube.token, youtube._tokenType)

    if (result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    let endResult: Video | Playlist | Channel | YTComment

    if (type === YTComment) {
      endResult = new type(youtube, result.items[0], result.items[0].snippet.channelId ? 'channel' : 'video')
    } else {
      endResult = new (type as typeof Video | typeof Channel | typeof Playlist)(youtube, result.items[0])
    }

    if (youtube._shouldCache) {
      youtube._cache(`get://${type.endpoint}/${id}`, endResult)
    }

    return endResult
  }

  /* istanbul ignore next */
  public static async getPaginatedItems (youtube: YouTube, endpoint: 'playlistItems' | 'playlists' | 'playlists:channel' | 'commentThreads' |
    'commentThreads:video' | 'commentThreads:channel' | 'comments', id: string, maxResults: number = -1): Promise<Video[] | YTComment[] | Playlist[]> {
    const cached = Cache.get(`get://${endpoint}/${id}/${maxResults}`)

    if (youtube._shouldCache && cached) {
      return cached
    }

    let items = []

    const full = maxResults <= 0
    const options: {
      part: string,
      maxResults: number,
      videoId?: string,
      parentId?: string,
      textFormat?: string,
      playlistId?: string,
      channelId?: string,
      pageToken?: string
    } = {
      part: 'snippet',
      maxResults: 0
    }

    let max: number
    let clazz: typeof Video | typeof YTComment | typeof Playlist
    let commentType: 'video' | 'channel'

    if (endpoint === 'playlistItems') {
      max = 50
      clazz = Video
      options.playlistId = id
    } else if (endpoint.startsWith('commentThreads')) {
      max = 100
      clazz = YTComment

      const [, type ] = endpoint.split(':') as ('video' | 'channel')[]

      commentType = type ? type : 'video'
      endpoint = 'commentThreads'
      options[`${type}Id`] = id
      options.part += ',replies'
      options.textFormat = 'plainText'
    } else if (endpoint === 'comments') {
      max = 100
      clazz = YTComment
      options.parentId = id
    } else if (endpoint === 'playlists:channel') {
      max = 50
      clazz = Playlist
      endpoint = 'playlists'
      options.part += ',contentDetails,player'
      options.channelId = id
    } else {
      return Promise.reject('Unknown item type ' + endpoint)
    }

    if (maxResults > max) {
      return Promise.reject(`Max results must be ${max} or below for ${endpoint}`)
    }

    options.maxResults = full ? max : maxResults

    let results
    let pages = null
    let shouldReturn = !full

    for (let i = 1; i < pages ? pages : 3; i++) {
      results = await youtube._request.api(endpoint, options, youtube.token, youtube._tokenType).catch(() => {
        return Promise.reject('Items not found')
      })

      if (results.items.length === 0) {
        return Promise.reject('Items not found')
      }

      if (!pages) {
        pages = results.pageInfo.totalResults / results.pageInfo.resultsPerPage

        if (pages <= 1) {
          shouldReturn = true
        }

        pages = Math.floor(pages)
      }

      results.items.forEach(item => {
        let comment: YTComment

        if (item.snippet.topLevelComment) {
          comment = new YTComment(youtube, item.snippet.topLevelComment, commentType)
          items.push(comment)
        } else {
          items.push(new clazz(youtube, item, commentType))
        }

        if (item.replies) {
          item.replies.comments.forEach(reply => {
            const created = new YTComment(youtube, reply, commentType)
            comment.replies.push(created)
          })
        }
      })

      if (results.nextPageToken && !shouldReturn) {
        options.pageToken = results.nextPageToken
      } else {
        return items
      }
    }

    if (youtube._shouldCache) {
      youtube._cache(`get://${endpoint}/${id}/${maxResults}`, items)
    }

    return items
  }

  /* istanbul ignore next */
  public static async getId (youtube: YouTube, input: string, type: 'playlist' | 'channel' | 'video'): Promise<string> {
    let id: string = null

    if (input.includes('youtube.com') || input.includes('youtu.be')) {
      const idFromUrl = Parser.parseUrl(input)[type]

      // Custom channel URLs don't work that well
      if (type === 'channel' && idFromUrl && !idFromUrl.startsWith('UC')) {
        id = await youtube._request.api('search', { q: idFromUrl, type, part: 'id' }, youtube.token, youtube._tokenType).then(r => r.items[0] ? r.items[0].id.channelId : undefined)
      }

      id = idFromUrl
    }

    if (id !== null && id !== undefined && id !== '') {
      return id
    }

    if (type === 'channel' && (!input.startsWith('UC') || input.includes(' '))) {
      id = await youtube._request.api('search', { q: input, type, part: 'id', maxResults: 1 }, youtube.token, youtube._tokenType).then(r => r.items[0] ? r.items[0].id.channelId : undefined)
    } else if (type === 'playlist' && input.includes(' ')) {
      id = await youtube._request.api('search', { q: input, type, part: 'id', maxResults: 1 }, youtube.token, youtube._tokenType).then(r => r.items[0] ? r.items[0].id.playlistId : undefined)
    } else if (type === 'video' && (input.length < 11 || input.includes(' '))) {
      id = await youtube._request.api('search', { q: input, type, part: 'id', maxResults: 1 }, youtube.token, youtube._tokenType).then(r => r.items[0] ? r.items[0].id.videoId : undefined)
    } else {
      id = input
    }

    if (id === null || id === undefined || id === '') {
      return Promise.reject('Item not found')
    }

    return id
  }
}
