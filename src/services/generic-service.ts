import YouTube,
{ Video, Channel, Playlist, YTComment, VideoAbuseReportReason, Subscription, VideoCategory, Language, Region, ChannelSection, Caption } from '..'
import { Cache, Parser } from '../util'
import { ItemTypes, ItemReturns, PaginatedItemsReturns, PaginatedItemType } from '../types'

/**
 * @ignore
 */
export class GenericService {
  /* istanbul ignore next */
  public static async getItem (youtube: YouTube, type: ItemTypes, mine: boolean, id?: string, parts?: string[]): Promise<ItemReturns> {
    if (!([ Video, Channel, Playlist, YTComment, Subscription, VideoCategory, VideoAbuseReportReason, ChannelSection, Caption ].includes(type))) {
      return Promise.reject('Type must be a video, channel, playlist, comment, subscription, video category, or channel section.')
    }

    if (!mine && id == null) {
      return Promise.reject('Items must either specify an ID or the \'mine\' parameter.')
    }

    if (mine && [ 'comments', 'videos', 'guideCategories', 'videoAbuseReportReasons', 'videoCategories', 'playlistItems' ].includes(type.endpoint)) {
      return Promise.reject(`${type.endpoint} cannot be filtered by the 'mine' parameter.`)
    }

    if (youtube._shouldCache) {
      const cached = Cache.get(`get://${type.endpoint}/${id ? id : 'mine'}`)
      if (cached) return cached
    }

    const params: {
      id?: string
      mine?: string
      fields: string
      part: string
      hl?: string
    } = {
      [id ? 'id' : 'mine']: id ? id : mine,
      fields: encodeURIComponent(type.fields),
      part: type === YTComment ? 'snippet' : parts ? parts.join(',') : type.part
    }

    if (type === VideoCategory) {
      params.hl = youtube.language
    }

    const result = await youtube._request.api(type.endpoint, params, youtube.token, youtube.accessToken)

    if (!result.items || result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    let endResult: ItemReturns

    if (type === YTComment) {
      endResult = new type(youtube, result.items[0], true, result.items[0].snippet.channelId ? 'channel' : 'video')
    } else {
      endResult = new (type as typeof Video)(youtube, result.items[0], true)
    }

    endResult.full = true

    if (youtube._shouldCache) youtube._cache(`get://${type.endpoint}/${id ? id : 'mine'}`, endResult)

    return endResult
  }

  /* istanbul ignore next */
  public static async getPaginatedItems (youtube: YouTube, type: PaginatedItemType, mine: boolean, id?: string, maxResults: number = 10,
    subId?: string, parts?: string[]):
  Promise<PaginatedItemsReturns> {
    const name = PaginatedItemType[type] as keyof typeof PaginatedItemType

    // These four types in the PaginatedItemTypes enum don't require any sort of identification parameter
    if (!mine && id == null &&
      ![ 'VideoCategories', 'VideoAbuseReportReasons', 'Languages', 'Regions' ].includes(name)) {
      return Promise.reject(`${name} must either specify an ID or the 'mine' parameter.`)
    }

    // These three types in the PaginatedItemTypes enum are the only to be filtered by the 'mine' parameter
    if (mine && ![ 'Playlists', 'Subscriptions', 'ChannelSections' ].includes(name)) {
      return Promise.reject(`${name} cannot be filtered by the 'mine' parameter.`)
    }

    if (youtube._shouldCache) {
      const cached = Cache.get(`getpage://${type}/${id ? id : 'mine'}/${maxResults}`)
      if (cached) return cached
    }

    let items = []

    const full = maxResults <= 0
    const options: {
      part: string
      maxResults?: number
      videoId?: string
      parentId?: string
      textFormat?: string
      playlistId?: string
      channelId?: string
      regionCode?: string
      pageToken?: string
      mine?: boolean
      hl?: string
    } = {
      part: parts ? parts.join(',') : 'snippet'
    }

    let endpoint: string
    let max: number
    let clazz: typeof Video | typeof YTComment | typeof Playlist | typeof Subscription | typeof VideoCategory | typeof VideoAbuseReportReason | typeof Language |
      typeof Region | typeof ChannelSection | typeof Caption
    let commentType: 'video' | 'channel'

    // MUST specify endpoint and clazz values, and most likely need a max as well
    switch (type) {
      case PaginatedItemType.PlaylistItems:
        endpoint = 'playlistItems'
        max = 50
        clazz = Video
        options.playlistId = id
        if (!options.part.includes('snippet')) options.part += ',snippet'
        if (subId) options.videoId = subId
        break

      case PaginatedItemType.VideoComments:
        commentType = 'video'
        // falls through

      case PaginatedItemType.ChannelComments:
        if (!commentType) commentType = 'channel'

        endpoint = 'commentThreads'
        max = 100
        clazz = YTComment
        options[`${commentType}Id`] = id
        if (!options.part.includes('snippet')) options.part += ',snippet'
        options.textFormat = 'plainText'
        break

      case PaginatedItemType.CommentReplies:
        endpoint = 'comments'
        max = 100
        clazz = YTComment
        options.parentId = id
        if (!options.part.includes('snippet')) options.part += ',snippet'
        break

      case PaginatedItemType.Playlists:
        endpoint = 'playlists'
        clazz = Playlist
        // falls through

      case PaginatedItemType.Subscriptions:
        if (!endpoint) endpoint = 'subscriptions'
        if (!clazz) clazz = Subscription

        max = 50
        // falls through

      case PaginatedItemType.ChannelSections:
        if (!endpoint) endpoint = 'channelSections'
        if (!clazz) clazz = ChannelSection

        if (mine) options.mine = mine; else options.channelId = id
        break

      case PaginatedItemType.VideoCategories:
        endpoint = 'videoCategories'
        clazz = VideoCategory
        options.regionCode = youtube.region
        // falls through

      case PaginatedItemType.VideoAbuseReportReasons:
        if (!endpoint) endpoint = 'videoAbuseReportReasons'
        if (!clazz) clazz = VideoAbuseReportReason
        // falls through

      case PaginatedItemType.Languages:
        if (!endpoint) endpoint = 'i18nLanguages'
        if (!clazz) clazz = Language
        // falls through

      case PaginatedItemType.Regions:
        if (!endpoint) endpoint = 'i18nRegions'
        if (!clazz) clazz = Region
        options.hl = youtube.language
        break

      case PaginatedItemType.Captions:
        endpoint = 'captions'
        clazz = Caption
        options.videoId = id
        break

      default:
        return Promise.reject('Unknown item type: ' + type)
    }

    if (max && maxResults > max) {
      return Promise.reject(`Max results must be ${max} or below for ${endpoint}`)
    }

    if (max) {
      options.maxResults = full ? max : maxResults
    }

    let results
    let pages = -1
    let shouldReturn = !full

    for (let i = 1; i < (pages > 0 ? pages : 3); i++) {
      results = await youtube._request.api(endpoint, options, youtube.token, youtube.accessToken)

      if (results.items.length === 0) {
        return []
      }

      if (pages < 1) {
        pages = results.pageInfo ? results.pageInfo.totalResults / results.pageInfo.resultsPerPage : 0

        if (pages <= 1) {
          shouldReturn = true
        }

        pages = Math.floor(pages)
      }

      for (let i = 0; i < results.items.length; i++) {
        const item = results.items[i]
        let comment: YTComment

        if (item.snippet && item.snippet.topLevelComment) {
          comment = new YTComment(youtube, item.snippet.topLevelComment, false, commentType)
          items.push(comment)
        } else {
          items.push(new clazz(youtube, item, false, commentType))
        }

        if (item.replies) {
          item.replies.comments.forEach(reply => {
            const created = new YTComment(youtube, reply, false, commentType)
            comment.replies.push(created)
          })
        }
      }

      if (results.nextPageToken && !shouldReturn) {
        options.pageToken = results.nextPageToken
      } else {
        return items
      }
    }

    if (youtube._shouldCache) youtube._cache(`getpage://${endpoint}/${id ? id : 'mine'}/${maxResults}`, items)

    return items
  }

  /* istanbul ignore next */
  public static async getId (youtube: YouTube, input: string | Video | Channel | Playlist, type: typeof Video | typeof Channel | typeof Playlist): Promise<string> {
    let id: string = null

    const cached = Cache.get(`get_id://${type.endpoint}/${input}`)

    if (cached) {
      return cached
    }

    const cachedEntity: Video | Channel | Playlist | YTComment = Cache.get(`get://${type.endpoint}/${input}`)

    if (cachedEntity && cachedEntity.id) {
      return cachedEntity.id
    }

    if (typeof input !== 'string') {
      return input.id
    }

    if (input.includes('youtube.com') || input.includes('youtu.be')) {
      id = Parser.parseUrl(input)[type.name.toLowerCase()]

      // Custom channel URLs don't work that well
      if (type === Channel && id && !id.startsWith('UC')) {
        id = await youtube._request.api('search', {
          q: encodeURIComponent(id),
          type: 'channel',
          part: 'id',
          maxResults: 1
        }, youtube.token, youtube.accessToken).then(r => r.items[0] ? r.items[0].id.channelId : undefined)
      }
    }

    if (id !== null && id !== undefined && id !== '') {
      return id
    }

    if (type === Channel && (!input.startsWith('UC') || input.includes(' '))) {
      id = await youtube._request.api('search', {
        q: encodeURIComponent(input),
        type: 'channel',
        part: 'id', maxResults: 1
      }, youtube.token, youtube.accessToken).then(r => r.items ? (r.items.length > 0 ? r.items[0].id.channelId : undefined) : undefined)
    } else if (type === Playlist && input.includes(' ')) {
      id = await youtube._request.api('search', {
        q: encodeURIComponent(input),
        type: 'playlist',
        part: 'id',
        maxResults: 1
      }, youtube.token, youtube.accessToken).then(r => r.items ? (r.items.length > 0 ? r.items[0].id.playlistId : undefined) : undefined)
    } else if (type === Video && (input.length < 11 || input.includes(' '))) {
      id = await youtube._request.api('search', {
        q: encodeURIComponent(input),
        type: 'video',
        part: 'id',
        maxResults: 1
      }, youtube.token, youtube.accessToken).then(r => r.items ? (r.items.length > 0 ? r.items[0].id.videoId : undefined) : undefined)
    }

    if (id === null || id === undefined || id === '') {
      id = input
    }

    youtube._cache(`get_id://${type.endpoint}/${input}`, id)

    return id
  }
}
