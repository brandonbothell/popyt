import { Video, Channel, Playlist, YTComment } from './entities'
import { parseUrl, request } from './util'
import { Cache } from './util/caching'
import { OAuth } from './oauth'
export * from './entities'
export * from './types'

/**
 * The main class used to interact with the YouTube API. Use this.
 */
export class YouTube {
  private _shouldCache: boolean
  private _cacheSearches: boolean
  private _cacheTTL: number
  private _token: string

  get token (): string {
    return this._token
  }
  set token (val: string) {
    this._token = val
    this.tokenType = val.startsWith('ya29') ? 'oauth' : 'key'
  }

  public tokenType: 'key' | 'oauth'

  /**
   * Methods requiring an OAuth token
   */
  public oauth: OAuth

  /**
   *
   * @param token Your YouTube Data API v3 token. Don't share this with anybody.
   * It could be an API key or an OAuth 2.0 token.
   * @param options Caching options. Recommended to change.
   */
  constructor (token: string, options: YouTubeOptions = { cache: true, cacheTTL: 600, cacheCheckInterval: 600, cacheSearches: true }) {
    this.token = token

    this.oauth = new OAuth(this)

    this._shouldCache = options.cache
    this._cacheSearches = options.cacheSearches
    this._cacheTTL = options.cacheTTL

    if (options.cacheCheckInterval > 0) {
      setInterval(Cache.checkTTLs, options.cacheCheckInterval * 1000)
    }
  }

  public _cache (id: string, value: any) {
    if (!this._shouldCache) {
      return
    }

    Cache.set(id, value, this._cacheTTL > 0 ? this._cacheTTL * 1000 + new Date().getTime() : 0)
  }

  /**
   * Search supported entities on YouTube.
   * @param types An array of types to search for. May be a single type or multiple types.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public search (types: (typeof Video | typeof Channel | typeof Playlist)[], searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return this._search(types, searchTerm, maxResults, pageToken)
  }

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public searchVideos (searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return this.search([ Video ], searchTerm, maxResults, pageToken) as Promise<{ results: Video[], prevPageToken: string, nextPageToken: string }>
  }

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public searchChannels (searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return this.search([ Channel ], searchTerm, maxResults, pageToken) as Promise<{ results: Channel[], prevPageToken: string, nextPageToken: string }>
  }

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public searchPlaylists (searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return this.search([ Playlist ], searchTerm, maxResults, pageToken) as Promise<{ results: Playlist[], prevPageToken: string, nextPageToken: string }>
  }

  /**
   * Get a video object from the URL, ID, or Title of a video.
   * @param videoResolvable The URL, ID, or Title of the video.
   */
  public async getVideo (videoResolvable: string) {
    const id = await this.getId(videoResolvable, 'video')
    return this.getItemById(Video, id) as Promise<Video>
  }

  /**
   * Get a channel object from the Username, URL or ID of a channel.
   * @param channelResolvable The Username, URL or ID of the channel.
   */
  public async getChannel (channelResolvable: string) {
    const id = await this.getId(channelResolvable, 'channel')
    return this.getItemById(Channel, id) as Promise<Channel>
  }

  /**
   * Get a playlist object from the URL, ID, or Title of a playlist.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   */
  public async getPlaylist (playlistResolvable: string) {
    const id = await this.getId(playlistResolvable, 'playlist')
    return this.getItemById(Playlist, id) as Promise<Playlist>
  }

  /**
   * Get a comment object from the ID of a comment.
   * @param id The ID of the comment.
   */
  public getComment (commentId: string) {
    return this.getItemById(YTComment, commentId) as Promise<YTComment>
  }

  /**
   * @deprecated Use getVideo() instead
   * Get a video object from the url of a video.
   * @param url The url of the video.
   */
  /* istanbul ignore next */
  public getVideoByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.video) {
      return Promise.reject('Not a valid video url')
    }

    return this.getItemById(Video, id.video) as Promise<Video>
  }

  /**
   * @deprecated Use getChannel() instead
   * Get a channel object from the url of a channel.
   * @param url The url of the channel.
   */
  /* istanbul ignore next */
  public getChannelByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.channel) {
      return Promise.reject('Not a valid channel url')
    }

    return this.getItemById(Channel, id.channel) as Promise<Channel>
  }

  /**
   * @deprecated Use getPlaylist() instead
   * Get a playlist object from the url of a playlist.
   * @param url The url of the playlist.
   */
  /* istanbul ignore next */
  public getPlaylistByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.playlist) {
      return Promise.reject('Not a valid playlist url')
    }

    return this.getItemById(Playlist, id.playlist) as Promise<Playlist>
  }

  /**
   * Get `maxResults` videos in a playlist. Used mostly internally with `Playlist#fetchVideos`.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
   */
  public async getPlaylistItems (playlistResolvable: string, maxResults: number = -1) {
    const playlistId = await this.getId(playlistResolvable, 'playlist')
    return this.getPaginatedItems('playlistItems', playlistId, maxResults) as Promise<Video[]>
  }

  /**
   * Get `maxResults` comments from a video. Used mostly internally with `Video#fetchComments`.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param maxResults The maximum amount of comments to get from the video. If <= 0 or not included, returns all comments on the video.
   */
  public async getVideoComments (videoResolvable: string, maxResults: number = -1) {
    const videoId = await this.getId(videoResolvable, 'video')
    return this.getPaginatedItems('commentThreads:video', videoId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` comments from a channel's discussion tab. Used mostly internally with `Channel#fetchComments`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of comments to get from the channel. If <= 0 or not included, returns all comments on the channel.
   */
  public async getChannelComments (channelResolvable: string, maxResults: number = -1) {
    const channelId = await this.getId(channelResolvable, 'channel')
    return this.getPaginatedItems('commentThreads:channel', channelId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` of a channel's playlists. Used mostly internally with `Channel#fetchPlaylists`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of playlists to get from the channel. If <= 0 or not included, returns all playlists.
   */
  public async getChannelPlaylists (channelResolvable: string, maxResults: number = -1) {
    const channelId = await this.getId(channelResolvable, 'channel')
    return this.getPaginatedItems('playlists:channel', channelId, maxResults) as Promise<Playlist[]>
  }

  /**
   * Get `maxResults` replies to a comment. Used mostly internally with `Comment#fetchReplies`.
   * @param commentId The ID of the comment to get replies from.
   * @param maxResults The maximum amount of replies to get. Gets all replies if <= 0 or not included.
   */
  public getCommentReplies (commentId: string, maxResults: number = -1) {
    return this.getPaginatedItems('comments', commentId, maxResults) as Promise<YTComment[]>
  }

  /* istanbul ignore next */
  private async _search (types: (typeof Video | typeof Channel | typeof Playlist)[], searchTerm: string, maxResults: number = 10, pageToken?: string): Promise<
    { results: (Video | Channel | Playlist)[], prevPageToken: string, nextPageToken: string }
  > {
    const type = types.map(t => t.endpoint.substring(0, t.endpoint.length - 1)).join(',')
    const cached = Cache.get(`search://${type}/"${searchTerm}"/${maxResults}/"${pageToken}"`)

    if (this._shouldCache && cached) {
      return cached
    }

    if (maxResults < 1 || maxResults > 50) {
      return Promise.reject('Max results must be greater than 0 and less than or equal to 50')
    }

    const fields = 'prevPageToken,nextPageToken,items(kind,id,snippet(title,description,thumbnails,publishedAt,channelId))'
    const data: {
      q: string,
      fields: string
      maxResults: number,
      part: string,
      type: string,
      pageToken?: string
    } = {
      q: encodeURIComponent(searchTerm),
      fields: encodeURIComponent(fields),
      maxResults,
      part: 'snippet',
      type
    }

    if (pageToken) {
      data.pageToken = pageToken
    }

    const results = await request.api('search', data, this.token, this.tokenType)
    const items = []

    results.items.forEach(item => {
      if (item.id.videoId) {
        items.push(new Video(this, item))
      } else if (item.id.channelId) {
        items.push(new Channel(this, item))
      } else if (item.id.playlistId) {
        items.push(new Playlist(this, item))
      }
    })

    const toReturn = { results: items, prevPageToken: results.prevPageToken, nextPageToken: results.nextPageToken }

    if (this._shouldCache && this._cacheSearches) {
      this._cache(`search://${type}/"${searchTerm}"/${maxResults}/"${pageToken}"`, toReturn)
    }

    return toReturn
  }

  /* istanbul ignore next */
  private async getItemById (type: typeof Video | typeof Channel | typeof Playlist | typeof YTComment, id: string): Promise<Video | Channel | Playlist | YTComment> {
    if (!([ Video, Channel, Playlist, YTComment ].includes(type))) {
      return Promise.reject('Type must be a video, channel, playlist, or comment.')
    }

    const cached = Cache.get(`get://${type.endpoint}/${id}`)

    if (this._shouldCache && cached) {
      return cached
    }

    const result = await request.api(type.endpoint, {
      id,
      fields: encodeURIComponent(type.fields),
      part: type.part
    }, this.token, this.tokenType)

    if (result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    let endResult: Video | Playlist | Channel | YTComment = new type(this, result.items[0], result.items[0].snippet.channelId ? 'channel' : 'video')

    if (this._shouldCache) {
      this._cache(`get://${type.endpoint}/${id}`, endResult)
    }

    return endResult
  }

  /* istanbul ignore next */
  private async getPaginatedItems (endpoint: 'playlistItems' | 'playlists' | 'playlists:channel' | 'commentThreads' |
    'commentThreads:video' | 'commentThreads:channel' | 'comments', id: string, maxResults: number = -1): Promise<Video[] | YTComment[] | Playlist[]> {
    const cached = Cache.get(`get://${endpoint}/${id}/${maxResults}`)

    if (this._shouldCache && cached) {
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
      results = await request.api(endpoint, options, this.token, this.tokenType).catch(() => {
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
          comment = new YTComment(this, item.snippet.topLevelComment, commentType)
          items.push(comment)
        } else {
          items.push(new clazz(this, item, commentType))
        }

        if (item.replies) {
          item.replies.comments.forEach(reply => {
            const created = new YTComment(this, reply, commentType)
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

    if (this._shouldCache) {
      this._cache(`get://${endpoint}/${id}/${maxResults}`, items)
    }

    return items
  }

  /* istanbul ignore next */
  private async getId (input: string, type: 'playlist' | 'channel' | 'video'): Promise<string> {
    let id: string = null

    if (input.includes('youtube.com') || input.includes('youtu.be')) {
      const idFromUrl = parseUrl(input)[type]

      // Custom channel URLs don't work that well
      if (type === 'channel' && idFromUrl && !idFromUrl.startsWith('UC')) {
        id = await request.api('search', { q: idFromUrl, type, part: 'id' }, this.token, this.tokenType).then(r => r.items[0] ? r.items[0].id.channelId : undefined)
      }

      id = idFromUrl
    }

    if (id !== null && id !== undefined && id !== '') {
      return id
    }

    if (type === 'channel' && (!input.startsWith('UC') || input.includes(' '))) {
      id = await request.api('search', { q: input, type, part: 'id', maxResults: 1 }, this.token, this.tokenType).then(r => r.items[0] ? r.items[0].id.channelId : undefined)
    } else if (type === 'playlist' && input.includes(' ')) {
      id = await request.api('search', { q: input, type, part: 'id', maxResults: 1 }, this.token, this.tokenType).then(r => r.items[0] ? r.items[0].id.playlistId : undefined)
    } else if (type === 'video' && (input.length < 11 || input.includes(' '))) {
      id = await request.api('search', { q: input, type, part: 'id', maxResults: 1 }, this.token, this.tokenType).then(r => r.items[0] ? r.items[0].id.videoId : undefined)
    } else {
      id = input
    }

    if (id === null || id === undefined || id === '') {
      return Promise.reject('Item not found')
    }

    return id
  }
}

type YouTubeOptions = {
  /**
   * Whether or not to cache entities.
   */
  cache?: boolean

  /**
   * How long to cache entities in seconds (0 = unlimited).
   */
  cacheTTL?: number

  /**
   * How often to check for and delete expired cached items in seconds.
   */
  cacheCheckInterval?: number

  /**
   * Whether or not we should cache searches
   */
  cacheSearches?: boolean
}

export default YouTube
