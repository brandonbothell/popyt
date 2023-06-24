import { Cache } from '../util'
import { ItemTypes, ItemReturns, PaginatedResponse, PaginatedItemType, PaginatedItemOptions,
  PaginatedType, Resolvable, PaginatedInstance, PaginatedRequestParams } from '../types'
import YouTube,
{ Video, Channel, Playlist, Comment, VideoAbuseReportReason, Subscription, VideoCategory, Language, Region, ChannelSection, Caption } from '..'

/**
 * @ignore
 */
export class GenericService {
  public readonly _getItemAllowedTypes = new Set([ Video, Channel, Playlist, Comment, Subscription, VideoCategory, ChannelSection, Caption ].map(c => c.name))
  public readonly _getMineAllowed = new Set([ Playlist, Subscription, ChannelSection ].map(c => c.name))

  constructor (private youtube: YouTube) {

  }

  /* istanbul ignore next */
  public async getItem<T extends Resolvable<K> | Resolvable<K>[], K extends ItemTypes> (type: K, mine: boolean, id?: T, parts?: string[]):
  Promise<ItemReturns<T, K>> {
    if (!this._getItemAllowedTypes.has(type.name)) {
      return Promise.reject(`${type.name}s cannot be directly fetched. The item may be paginated or not directly accessible.`)
    }

    if (mine && !this._getMineAllowed.has(type.name)) {
      return Promise.reject(`${type.name}s cannot be filtered by the 'mine' parameter.`)
    }

    if (!mine && !id) {
      return Promise.reject('Items must either specify an ID or the \'mine\' parameter.')
    }

    let alreadyResolvedCount = 0
    const alreadyResolved: InstanceType<K>[] = []
    const idsToGet: string[] = []

    if (typeof id === 'string') idsToGet.push(id)
    else if (Array.isArray(id)) {
      for (let i = 0; i < id.length; i++) {
        const entry = id[i]

        if (typeof entry === 'string') {
          idsToGet.push(entry)
        } else {
          if (alreadyResolved.length < i + 1) alreadyResolved.length = id.length
          alreadyResolved[i] = entry
          alreadyResolvedCount++
        }
      }

      // If all of the items are entities, what are we even doing here?
      if (alreadyResolvedCount === id.length) {
        return alreadyResolved as ItemReturns<T, K>
      }
    } else if (id) {
      return id as ItemReturns<T, K>
    }

    const idString = idsToGet.join(',')
    let preresolvedCacheString = alreadyResolved.length ? alreadyResolved.map(r => r.id).join(',') : ''

    let cacheKey: string

    if (this.youtube._shouldCache) {
      cacheKey = `get://${type.endpoint}/${id ? idString : 'mine'}/${preresolvedCacheString}/${parts?.join(',')}`
      const cached = Cache.get(cacheKey)
      if (cached) return cached
    }

    const options: {
      id?: string
      mine?: boolean
      fields: string
      part: string
      hl?: string
    } = {
      fields: encodeURIComponent(type.fields),
      part: type === Comment ? 'snippet' : parts ? parts.join(',') : type.part
    }

    if (idString) options.id = idString
    if (mine) options.mine = mine

    if (type === VideoCategory) {
      options.hl = this.youtube.language
    }

    const result: {
      items: any[]
    } = await this.youtube._request.get(type.endpoint, { params: options, authorizationOptions: { apiKey: true } })

    if (!result.items || result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    let endResult: ItemReturns<string | string[], ItemTypes>

    if (alreadyResolved.length === 0) endResult = await Promise.all(result.items.map(async item => new (type)(this.youtube, await item, true)))
    else {
      for (const item of result.items) {
        alreadyResolved[alreadyResolved.findIndex(value => value === undefined)] = new (type)(this.youtube, item, true) as InstanceType<K>
      }

      endResult = alreadyResolved
    }

    if (endResult.length === 1) endResult = endResult[0]
    if (this.youtube._shouldCache) this.youtube._cache(cacheKey, endResult)

    return endResult as ItemReturns<T, K>
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
  public async getPaginatedItems<T extends PaginatedInstance = PaginatedInstance>
  ({ type, mine = false, id, maxPerPage = 0, pages = 1, pageToken, subId, parts, ...otherFilters }: PaginatedItemOptions):
  Promise<PaginatedResponse<T>> {

    const name = PaginatedItemType[type] as keyof typeof PaginatedItemType

    // These four types in the PaginatedItemTypes enum don't require any sort of identification parameter
    if (!mine && !id &&
        name !== 'VideoCategories' &&
        name !== 'VideoAbuseReportReasons' &&
        name !== 'Languages' &&
        name !== 'Regions') {
      return Promise.reject(`${name} must either specify an ID or the 'mine' parameter.`)
    }

    // These three types in the PaginatedItemTypes enum are the only to be filtered by the 'mine' parameter
    if (mine && name !== 'Playlists' && name !== 'Subscriptions' && name !== 'ChannelSections') {
      return Promise.reject(`${name} cannot be filtered by the 'mine' parameter.`)
    }

    let cacheKey: string

    if (this.youtube._shouldCache) {
      cacheKey = `getpage://${type}/${id ? id : 'mine'}/${subId}/${parts?.join(',')}/${maxPerPage >= 1 ? maxPerPage : 0}/${pages}/${pageToken}`
      const cached = Cache.get(cacheKey)
      if (cached) return cached
    }

    const options: PaginatedRequestParams = {
      part: parts?.join(',')
    }

    let endpoint: string
    let maxForEndpoint: number
    let clazz: typeof Video | typeof Comment | typeof Playlist | typeof Subscription | typeof VideoCategory | typeof VideoAbuseReportReason | typeof Language |
      typeof Region | typeof ChannelSection | typeof Caption
    let commentType: 'video' | 'channel'

    // MUST specify endpoint and clazz values, and most likely need a max as well
    switch (type) {
      case PaginatedItemType.PlaylistItems:
        endpoint = 'playlistItems'
        maxForEndpoint = 50
        clazz = Video
        options.playlistId = id

        if (!options.part) options.part = 'snippet,contentDetails,status'
        if (subId) options.videoId = subId
        break

      case PaginatedItemType.VideoComments:
        commentType = 'video'
        endpoint = 'commentThreads'
        maxForEndpoint = 100
        clazz = Comment
        options[`${commentType}Id`] = id
        if (!options.part) options.part = 'snippet,replies'
        if (otherFilters.order) options.order = otherFilters.order
        options.textFormat = 'plainText'
        break

      case PaginatedItemType.CommentReplies:
        endpoint = 'comments'
        maxForEndpoint = 100
        clazz = Comment
        if (!options.part) options.part = 'snippet'
        options.parentId = id
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

    if (!options.part) {
      options.part = clazz.part
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

    const toReturn = await this.fetchPages(pages, endpoint, options, clazz) as PaginatedResponse<T>

    if (this.youtube._shouldCache) this.youtube._cache(cacheKey, toReturn)

    return toReturn
  }

  /**
   * @param clazz Most endpoints only return one type of entity, so set this to that entity.
   * If endpoint is `search`, then leave undefined.
   */
  /* istanbul ignore next */
  public async fetchPages<T extends PaginatedType = PaginatedType> (pages: number, endpoint: string, options:
  { part: string; maxResults?: number; hl?: string; [key: string]: any }, clazz?: T): Promise<PaginatedResponse<InstanceType<T>>> {

    if (!clazz && endpoint !== 'search') {
      return Promise.reject('Endpoints other than search must specify an entity class')
    }

    const toReturn: PaginatedResponse<InstanceType<T>> = {
      items: []
    }

    let pagesFetched = 0

    while (true) {
      const apiResponse = await this.youtube._request.get(endpoint, {
        params: options,
        authorizationOptions: { apiKey: true }
      })

      if (!apiResponse.items?.length) {
        if (apiResponse.prevPageToken) toReturn.prevPageToken = apiResponse.prevPageToken
        break
      }

      pagesFetched++

      for (const data of apiResponse.items) {
        if (endpoint === 'search') {
          if (data.id.videoId) {
            toReturn.items.push(new Video(this.youtube, data) as InstanceType<T>)
          } else if (data.id.channelId) {
            toReturn.items.push(new Channel(this.youtube, data) as InstanceType<T>)
          } else if (data.id.playlistId) {
            toReturn.items.push(new Playlist(this.youtube, data) as InstanceType<T>)
          }
        } else if (data.kind === 'youtube#commentThread') {
          toReturn.items.push(new Comment(this.youtube, data, true) as InstanceType<T>)
        } else {
          toReturn.items.push(new clazz(this.youtube, data, false) as InstanceType<T>)
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
}
