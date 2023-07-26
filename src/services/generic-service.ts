import { Cache } from '../util'
import { ItemTypes, ItemReturns, PaginatedResponse, PaginatedItemType, PaginatedItemOptions,
  PaginatedType, Resolvable, PaginatedInstance, PaginatedRequestParams, AuthorizationOptions } from '../types'
import YouTube,
{ Video, Channel, Playlist, Comment, VideoAbuseReportReason, Subscription, VideoCategory, Language, Region, ChannelSection, Caption, VideoRating } from '..'

/**
 * @ignore
 */
export class GenericService {
  public readonly _getItemAllowedTypes = new Set([ Video, Channel, Playlist, Comment, Subscription, VideoCategory, ChannelSection, Caption ].map(c => c.name))
  public readonly _getMineAllowed = new Set([ Playlist, Subscription, ChannelSection, Channel ].map(c => c.name))

  constructor (private youtube: YouTube) {

  }

  public async getItem<T extends Resolvable<K> | Resolvable<K>[], K extends ItemTypes, M extends boolean = false>
  (type: K, { mine, resolvableEntity }:
  { mine?: M; resolvableEntity?: T }, parts?: string[]):
  Promise<ItemReturns<T, K, M>> {

    if (!this._getItemAllowedTypes.has(type.name)) {
      return Promise.reject(new Error(`${type.name}s cannot be directly fetched. The item may be paginated or not directly accessible.`))
    }

    if (mine && !this._getMineAllowed.has(type.name)) {
      return Promise.reject(new Error(`${type.name}s cannot be filtered by the 'mine' parameter.`))
    }

    if (!mine && !resolvableEntity) {
      return Promise.reject(new Error('Items must either specify an ID or the \'mine\' parameter.'))
    }

    // Convert to array full of IDs and/or entity class instances
    const resolvables: Resolvable<K>[] = mine ? [] : Array.isArray(resolvableEntity) ?
      resolvableEntity :
      [ resolvableEntity as Resolvable<K> ]

    if (!mine && resolvables.length === 0) {
      return Promise.reject(
        new Error('The resolvableEntity parameter must include at least one item.')
      )
    }

    // IDs
    let resolvableStrings: string[]

    // Instances of entity classes
    let resolvedEntities: InstanceType<K>[]
    let alreadyResolvedCount = 0

    for (let i = 0; i < resolvables.length; i++) {
      const entry = resolvables[i]

      // An ID
      if (typeof entry === 'string') {
        const cachedEntity = this.youtube._shouldCache ? Cache.getItem(type, entry, parts) : undefined

        if (!cachedEntity) {
          if (!resolvableStrings) resolvableStrings = []
          resolvableStrings.push(entry)
        // An instance we have cached and can just return
        } else {
          if (!resolvedEntities) resolvedEntities = new Array(resolvables.length).fill(undefined)
          resolvedEntities[i] = cachedEntity as InstanceType<K>
          alreadyResolvedCount++
        }
      // An instance that we can just return
      } else if (entry instanceof type) {
        if (!resolvedEntities) resolvedEntities = new Array(resolvables.length).fill(undefined)
        resolvedEntities[i] = entry
        alreadyResolvedCount++
      } else {
        return Promise.reject(new TypeError(
          'The resolvableEntity parameter must be a string, array, or proper entity class.'
        ))
      }
    }

    // If all of the items are instances, what are we even doing here?
    if (!mine && alreadyResolvedCount === resolvables.length) {
      return (resolvedEntities.length === 1 ?
        resolvedEntities[0] :
        resolvedEntities) as ItemReturns<T, K, M>
    }

    const idString = resolvableStrings?.join(',')

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

    const result: { items?: any[] } = await this.youtube._request.get(type.endpoint, {
      params: options,
      authorizationOptions: { [options.mine ? 'accessToken' : 'apiKey']: true }
    })

    if (!result.items?.length) {
      return Promise.reject(new Error('Item not found'))
    }

    // All resolvable entries are strings (IDs, URLs, and search queries)
    if (!resolvedEntities) {
      resolvedEntities = result.items.map((item, index) =>
        this.transformItemToCachedEntity(type, item, resolvables[index] as string, parts))
    // Otherwise there are some entity objects to include
    } else {
      let resultIndex = 0
      // All undefined indices should coorelate with a string value in resolvables[]
      // and a result from the API
      resolvedEntities = resolvedEntities.map((entity, index) =>
        entity ?? this.transformItemToCachedEntity(type, result.items[resultIndex++],
          resolvables[index] as string, parts))

      if (resultIndex < result.items.length - 1) {
        return Promise.reject(new Error(`There are ${
          result.items.length - resultIndex - 1} extra items in the response`))
      }
    }

    return (resolvedEntities.length === 1 ?
      resolvedEntities[0] :
      resolvedEntities) as ItemReturns<T, K, M>
  }

  /**
   * 
   * @param maxPerPage Leave undefined or set to < 1 to fetch the maximum allowed by the API for any given type.
   * @param pages Number of pages to fetch from the API. Set to < 1 to fetch all of them. Defaults to 1.
   * @param pageToken The page to start at (retrieved from the return value of a previous call to this function)
   * 
   * @returns An object containing the array of instantiated entities as well as possible next and previous page tokens.
   */
  public async getPaginatedItems<T extends PaginatedInstance = PaginatedInstance>
  ({ type, mine = false, id, maxPerPage = 0, pages = 1, pageToken, subId, parts, ...otherFilters }: PaginatedItemOptions,
    auth?: AuthorizationOptions): Promise<PaginatedResponse<T>> {

    const name = PaginatedItemType[type] as keyof typeof PaginatedItemType

    // These four types in the PaginatedItemTypes enum don't require any sort of identification parameter
    if (!mine && !id &&
        name !== 'VideoCategories' &&
        name !== 'VideoAbuseReportReasons' &&
        name !== 'Languages' &&
        name !== 'Regions') {
      return Promise.reject(new Error(`${name} must either specify an ID or the 'mine' parameter.`))
    }

    // These three types in the PaginatedItemTypes enum are the only to be filtered by the 'mine' parameter
    if (mine &&
        name !== 'Playlists' && name !== 'Subscriptions' && name !== 'ChannelSections') {
      return Promise.reject(new Error(`${name} cannot be filtered by the 'mine' parameter.`))
    }

    /* let cacheKey: string

    if (this.youtube._shouldCache) {
      cacheKey = `getpage://${type}/${id ? id : 'mine'}/${subId}/${parts?.join(',')}/${maxPerPage >= 1 ? maxPerPage : 0}/${pages}/${pageToken}`
      const cached = Cache.get(cacheKey)
      if (cached) return cached
    } */

    const options: PaginatedRequestParams = {
      part: parts?.join(',')
    }

    let endpoint: string
    let maxForEndpoint: number
    let clazz: typeof Video | typeof Comment | typeof Playlist | typeof Subscription |
      typeof VideoCategory | typeof VideoAbuseReportReason | typeof Language |
      typeof Region | typeof ChannelSection | typeof Caption | typeof VideoRating
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
        options.textFormat = 'plainText'

        if (!options.part) options.part = 'snippet,replies'
        if (otherFilters.order) options.order = otherFilters.order
        break

      case PaginatedItemType.CommentReplies:
        endpoint = 'comments'
        maxForEndpoint = 100
        clazz = Comment
        if (!options.part) options.part = 'snippet'
        options.parentId = id
        break

      case PaginatedItemType.Captions:
        endpoint = 'captions'
        clazz = Caption
        options.videoId = id
        break

      case PaginatedItemType.Playlists:
        endpoint = 'playlists'
        clazz = Playlist
        // falls through
      case PaginatedItemType.Subscriptions:
        if (!endpoint) endpoint = 'subscriptions'
        if (!clazz) clazz = Subscription
        if (subId) options.forChannelId = subId

        maxForEndpoint = 50
        // falls through
      case PaginatedItemType.ChannelSections:
        if (!endpoint) endpoint = 'channelSections'
        if (!clazz) clazz = ChannelSection

        if (mine) options.mine = mine
        else options.channelId = id
        break

      case PaginatedItemType.VideoCategories:
        endpoint = 'videoCategories'
        clazz = VideoCategory
        options.regionCode = this.youtube.region
        break

      case PaginatedItemType.VideoAbuseReportReasons:
        endpoint = 'videoAbuseReportReasons'
        clazz = VideoAbuseReportReason
        options.hl = this.youtube.language
        // falls through
      case PaginatedItemType.Languages:
        if (!endpoint) endpoint = 'i18nLanguages'
        if (!clazz) clazz = Language
        // falls through
      case PaginatedItemType.Regions:
        if (!endpoint) endpoint = 'i18nRegions'
        if (!clazz) clazz = Region
        break

      case PaginatedItemType.VideoRatings:
        endpoint = 'videos/getRating'
        clazz = VideoRating
        options.id = id
        break

      default:
        return Promise.reject(new TypeError('Unknown item type: ' + type))
    }

    if (!clazz.part) delete options.part
    else if (!options.part) options.part = clazz.part

    if (pages < 1) pages = Infinity
    if (pageToken) options.pageToken = pageToken

    if (maxForEndpoint !== undefined) {
      if (pages === Infinity || maxPerPage < 1) options.maxResults = maxForEndpoint
      else if (maxPerPage <= maxForEndpoint) options.maxResults = maxPerPage
      else {
        return Promise.reject(
          new Error(`Max per page must be ${maxForEndpoint} or below for ${endpoint}`))
      }
    }

    // Caching handled here
    return this.getPages(
      pages, endpoint, options, clazz, auth, parts) as Promise<PaginatedResponse<T>>
  }

  /**
   * Caching handled here
   * @param clazz Most endpoints only return one type of entity, so set this to that entity.
   * If endpoint is `search`, then leave undefined.
   */
  public async getPages<T extends PaginatedType = PaginatedType> (
    pages: number, endpoint: string, options: PaginatedRequestParams, clazz?: T,
    auth?: AuthorizationOptions, parts?: string[]):
  Promise<PaginatedResponse<InstanceType<T>>> {

    if (!clazz && endpoint !== 'search') {
      return Promise.reject(new Error('Endpoints other than search must specify an entity class'))
    }

    let toReturn: PaginatedResponse<InstanceType<T>> = {
      items: []
    }

    const cachedPages = this.youtube._shouldCache ?
      Cache.getPages<InstanceType<T>>(endpoint, options, auth, parts, clazz) :
      undefined

    let pagesFetched = 0


    while (true) {
      let page: PaginatedResponse<any>

      if (this.youtube._shouldCache) {
        page = cachedPages?.[pagesFetched]

        // We have a cached page, use that
        if (page) {
          toReturn.items = toReturn.items.concat(page.items)
          if (page.prevPageToken) toReturn.prevPageToken = page.prevPageToken
          if (page.nextPageToken) toReturn.nextPageToken = page.nextPageToken
          if (++pagesFetched >= pages || !page.nextPageToken) break
          options.pageToken = toReturn.nextPageToken
          continue
        }
      }

      // No cached page, request one from the API
      page = await this.youtube._request.get(endpoint, {
        params: options,
        authorizationOptions: auth ?? { [options.mine ? 'accessToken' : 'apiKey']: true } })

      // No more items found, return
      if (!page.items?.length) {
        if (page.prevPageToken) toReturn.prevPageToken = page.prevPageToken
        break
      }

      const instances: InstanceType<T>[] = []

      for (const data of page.items) {
        if (endpoint === 'search') {
          if (data.id.videoId) {
            instances.push(new Video(this.youtube, data) as InstanceType<T>)
          } else if (data.id.channelId) {
            instances.push(new Channel(this.youtube, data) as InstanceType<T>)
          } else if (data.id.playlistId) {
            instances.push(new Playlist(this.youtube, data) as InstanceType<T>)
          }
        } else if (data.kind === 'youtube#commentThread') {
          instances.push(new Comment(this.youtube, data, true) as InstanceType<T>)
        } else {
          instances.push(new clazz(this.youtube, data, false) as InstanceType<T>)
        }
      }

      toReturn.items = toReturn.items.concat(instances)

      const toCache: PaginatedResponse<InstanceType<T>> = {
        items: instances
      }

      if (page.prevPageToken) toCache.prevPageToken = page.prevPageToken
      if (page.nextPageToken) toCache.nextPageToken = page.nextPageToken

      if (this.youtube._shouldCache) {
        this.youtube._cachePage(
          endpoint, pagesFetched, options, auth, parts, clazz, toCache)
      }

      if (++pagesFetched >= pages || !page.nextPageToken) {
        if (page.prevPageToken) toReturn.prevPageToken = page.prevPageToken
        if (page.nextPageToken) toReturn.nextPageToken = page.nextPageToken

        break
      }

      options.pageToken = page.nextPageToken
    }

    return toReturn
  }

  private transformItemToCachedEntity<K extends ItemTypes>
  (type: K, item: any, cacheString: string, parts?: string[]):
  InstanceType<K> {
    const entity = new (type)(this.youtube, item, true) as InstanceType<K>

    if (this.youtube._shouldCache) {
      this.youtube._cacheItem(type, cacheString, entity, parts)
    }

    return entity
  }
}
