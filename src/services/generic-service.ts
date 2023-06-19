import YouTube,
{ Video, Channel, Playlist, YTComment, VideoAbuseReportReason, Subscription, VideoCategory, Language, Region, ChannelSection, Caption } from '..'
import { Cache, Parser } from '../util'
import { ItemTypes, ItemReturns, PaginatedItemsReturns, PaginatedItemType, PaginatedItemOptions, PaginatedType } from '../types'

/**
 * @ignore
 */
export class GenericService {
  constructor (private youtube: YouTube) {}

  /* istanbul ignore next */
  public async getItem (type: ItemTypes, mine: boolean, id?: string, parts?: string[]): Promise<ItemReturns> {
    if (!([ Video, Channel, Playlist, YTComment, Subscription, VideoCategory, VideoAbuseReportReason, ChannelSection, Caption ].includes(type))) {
      return Promise.reject(`${type.name}s cannot be directly fetched. The item may be paginated or not directly accessible.`)
    }

    if (!mine && id == null) {
      return Promise.reject('Items must either specify an ID or the \'mine\' parameter.')
    }

    if (mine && [ 'comments', 'videos', 'guideCategories', 'videoAbuseReportReasons', 'videoCategories', 'playlistItems' ].includes(type.endpoint)) {
      return Promise.reject(`${type.endpoint} cannot be filtered by the 'mine' parameter.`)
    }

    if (this.youtube._shouldCache) {
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
      params.hl = this.youtube.language
    }

    const result = await this.youtube._request.api(type.endpoint, params, this.youtube.token, this.youtube.accessToken)

    if (!result.items || result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    let endResult: ItemReturns = new (type)(this.youtube, result.items[0], true)

    endResult.full = true

    if (this.youtube._shouldCache) this.youtube._cache(`get://${type.endpoint}/${id ? id : 'mine'}`, endResult)

    return endResult
  }

  /**
   * 
   * @param maxPerPage Leave undefined or set to < 1 to fetch the maximum allowed by the API for any given type.
   * @param pages Number of pages to fetch from the API. Set to < 1 to fetch all of them. Defaults to 1.
   * @param pageToken The page to start at (retrieved from the return value of a previous call to this function)
   * 
   * @returns An object containing the array of instantiated entities as well as possible next and previous page tokens.
   */
  /* istanbul ignore next */
  public async getPaginatedItems ({ type, mine = false, id, maxPerPage = 0, pages = 1, pageToken, subId, parts }: PaginatedItemOptions):
  Promise<PaginatedItemsReturns<PaginatedType>> {

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

    if (this.youtube._shouldCache) {
      const cached = Cache.get(`getpage://${type}/${mine}/${id}/${subId}/${parts?.join(',')}/${pages < 1 ? maxPerPage : 0}/${pages}/${pageToken}`)
      if (cached) return cached
    }

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
    let maxForEndpoint: number
    let clazz: typeof Video | typeof YTComment | typeof Playlist | typeof Subscription | typeof VideoCategory | typeof VideoAbuseReportReason | typeof Language |
      typeof Region | typeof ChannelSection | typeof Caption
    let commentType: 'video' | 'channel'

    // MUST specify endpoint and clazz values, and most likely need a max as well
    switch (type) {
      case PaginatedItemType.PlaylistItems:
        endpoint = 'playlistItems'
        maxForEndpoint = 50
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
        maxForEndpoint = 100
        clazz = YTComment
        options[`${commentType}Id`] = id
        if (!options.part.includes('snippet')) options.part += ',snippet'
        if (!options.part.includes('replies')) options.part += ',replies'
        options.textFormat = 'plainText'
        break

      case PaginatedItemType.CommentReplies:
        endpoint = 'comments'
        maxForEndpoint = 100
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

        maxForEndpoint = 50
        // falls through

      case PaginatedItemType.ChannelSections:
        if (!endpoint) endpoint = 'channelSections'
        if (!clazz) clazz = ChannelSection

        if (mine) options.mine = mine; else options.channelId = id
        break

      case PaginatedItemType.VideoCategories:
        endpoint = 'videoCategories'
        clazz = VideoCategory
        options.regionCode = this.youtube.region
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
        options.hl = this.youtube.language
        break

      case PaginatedItemType.Captions:
        endpoint = 'captions'
        clazz = Caption
        options.videoId = id
        break

      default:
        return Promise.reject('Unknown item type: ' + type)
    }

    if (maxForEndpoint !== undefined) {
      if (pages < 1 || maxPerPage < 1) options.maxResults = maxForEndpoint
      else if (maxPerPage > maxForEndpoint) return Promise.reject(`Max per page must be ${maxForEndpoint} or below for ${endpoint}`)
      else options.maxResults = maxPerPage
    }

    if (pages < 1) {
      pages = Infinity
    }

    if (pageToken) options.pageToken = pageToken

    const toReturn = await this.fetchPages(pages, endpoint, options, clazz)

    if (this.youtube._shouldCache) {
      this.youtube._cache(`getpage://${type}/${id ? id : 'mine'}/${subId}/${parts?.join(',')}/${maxPerPage}/${pages}/${pageToken}`, toReturn)
    }

    return toReturn
  }

  /**
   * 
   * @param pages 
   * @param endpoint 
   * @param clazz Most endpoints only return one type of entity, set this to that entity.
   * If endpoint is `search`, then leave undefined.
   * @param options 
   * @returns 
   */
  /* istanbul ignore next */
  public async fetchPages (pages: number, endpoint: string, options: { part: string; maxResults?: number; hl?: string; [key: string]: any }, clazz?: PaginatedType) {
    if (!clazz && endpoint !== 'search') {
      return Promise.reject('Endpoints other than search must specify an entity class')
    }

    const toReturn: PaginatedItemsReturns<PaginatedType> = {
      items: []
    }

    let pagesFetched = 0

    while (true) {
      const apiResponse = await this.youtube._request.api(endpoint, options, this.youtube.token, this.youtube.accessToken)

      if (!apiResponse.items?.length) {
        if (apiResponse.prevPageToken) toReturn.prevPageToken = apiResponse.prevPageToken
        break
      }

      pagesFetched++

      for (const data of apiResponse.items) {
        if (endpoint === 'search') {
          if (data.id.videoId) {
            toReturn.items.push(new Video(this.youtube, data))
          } else if (data.id.channelId) {
            toReturn.items.push(new Channel(this.youtube, data))
          } else if (data.id.playlistId) {
            toReturn.items.push(new Playlist(this.youtube, data))
          }
        } else if (data.kind === 'youtube#commentThread') {
          toReturn.items.push(new YTComment(this.youtube, data.snippet.topLevelComment, true, data.replies?.comments))
        } else {
          toReturn.items.push(new clazz(this.youtube, data, false))
        }
      }

      if (pagesFetched >= pages || !apiResponse.nextPageToken) {
        if (apiResponse.prevPageToken) toReturn.prevPageToken = apiResponse.prevPageToken
        if (apiResponse.nextPageToken) toReturn.nextPageToken = apiResponse.nextPageToken

        break
      }

      options.pageToken = apiResponse.nextPageToken
    }

    return toReturn
  }

  /* istanbul ignore next */
  public async getId (input: string | Video | Channel | Playlist, type: typeof Video | typeof Channel | typeof Playlist): Promise<string> {
    let id: string = null

    if (this.youtube._shouldCache) {
      const cached = Cache.get(`get_id://${type.endpoint}/${input}`)
      if (cached) return cached
    }

    const cachedEntity: Video | Channel | Playlist | YTComment = Cache.get(`get://${type.endpoint}/${input}`)

    if (cachedEntity && cachedEntity.id) {
      return cachedEntity.id
    }

    if (typeof input !== 'string') {
      return input.id
    }

    if (input.includes('youtube.com') || input.includes('youtu.be')) {
      const parsedUrl = Parser.parseUrl(input)

      if (type === Channel && parsedUrl.channel) {
        if (parsedUrl.channel.id && !parsedUrl.channel.id.startsWith('UC')) {
          // Custom channel URLs don't work that well
          id = await this.youtube._request.api('search', {
            q: encodeURIComponent(id),
            type: 'channel',
            part: 'id',
            maxResults: 1
          }, this.youtube.token, this.youtube.accessToken).then(r => r.items[0]?.id.channelId)
        } else if (parsedUrl.channel.username) {
          // but the new usernames work perfectly
          id = await this.youtube._request.api('channels', {
            q: encodeURIComponent(id),
            part: 'id',
            forUsername: parsedUrl.channel.username
          }, this.youtube.token, this.youtube.accessToken).then(r => r.items[0]?.id)
        }
      }

      if (id === null || id === undefined || id === '') {
        id = parsedUrl[type.name.toLowerCase() as 'video' | 'playlist' | 'channel'].id
      }
    }

    if (id !== null && id !== undefined && id !== '') {
      return id
    }

    if (type === Channel && (!input.startsWith('UC') || input.includes(' '))) {
      id = await this.youtube._request.api('search', {
        q: encodeURIComponent(input),
        type: 'channel',
        part: 'id',
        maxResults: 1
      }, this.youtube.token, this.youtube.accessToken).then(r => r.items ? (r.items.length > 0 ? r.items[0].id.channelId : undefined) : undefined)
    } else if (type === Playlist && input.includes(' ')) {
      id = await this.youtube._request.api('search', {
        q: encodeURIComponent(input),
        type: 'playlist',
        part: 'id',
        maxResults: 1
      }, this.youtube.token, this.youtube.accessToken).then(r => r.items ? (r.items.length > 0 ? r.items[0].id.playlistId : undefined) : undefined)
    } else if (type === Video && (input.length < 11 || input.includes(' '))) {
      id = await this.youtube._request.api('search', {
        q: encodeURIComponent(input),
        type: 'video',
        part: 'id',
        maxResults: 1
      }, this.youtube.token, this.youtube.accessToken).then(r => r.items ? (r.items.length > 0 ? r.items[0].id.videoId : undefined) : undefined)
    }

    if (id === null || id === undefined || id === '') {
      id = input
    }

    if (this.youtube._shouldCache) this.youtube._cache(`get_id://${type.endpoint}/${input}`, id)

    return id
  }
}
