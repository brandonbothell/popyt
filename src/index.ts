/**
 * @module Library Exports
 */

import { Cache, Request } from './util'
import { VideoParts, ChannelParts, ChannelSectionParts, CommentParts, CommentThreadParts, PlaylistItemParts, PlaylistParts, SubscriptionParts } from './types/Parts'
import { PageOptions, PaginatedItemType, PaginatedItemsReturns, SearchOptions, SearchType } from './types'
import { SearchService, GenericService, SubscriptionService } from './services'
import { OAuth } from './oauth'
import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, Language, Region, ChannelSection } from './entities'

export * from './entities'
export * from './types'

/**
 * The main class used to interact with the YouTube API. Use this.
 */
export class YouTube {
  /**
   * @ignore
   */
  public _shouldCache: boolean

  /**
   * @ignore
   */
  public _cacheSearches: boolean

  /**
   * @ignore
   */
  public _cacheTTL: number

  /**
   * @ignore
   */
  public _request = new Request('https://www.googleapis.com/youtube/v3')

  /**
   * @ignore
   */
  public _upload = new Request('https://www.googleapis.com/upload/youtube/v3')

  /**
   * @ignore
   */
  public _searchService = new SearchService(this)

  /**
   * @ignore
   */
  public _subscriptionService = new SubscriptionService(this)

  /**
   * @ignore
   */
  public _genericService = new GenericService(this)

  public token: string

  public accessToken: string

  /**
   * Methods requiring an OAuth token.
   */
  public oauth: OAuth

  /**
   * The language for the API to respond in. See [[YouTube.getLanguages]].
   */
  public language: string

  /**
   * The region for the API cater responses to. See [[YouTube.getRegions]].
   */
  public region: string

  /**
   *
   * @param token Your YouTube Data API v3 token. Don't share this with anybody.
   * It could be an API key or an OAuth 2.0 token.
   * @param accessToken A Google OAuth 2.0 access token. Used for [[YouTube.oauth]] methods.
   * @param options Caching options. Recommended to change.
   * @param language The language for the API to respond in. See [[YouTube.getLanguages]].
   * @param region The region for the API cater responses to. See [[YouTube.getRegions]].
   */
  constructor (token?: string, accessToken?: string, options: YouTubeOptions = { cache: true, cacheTTL: 600, cacheCheckInterval: 600, cacheSearches: true },
    language: string = 'en_US', region: string = 'US') {
    this.token = token
    this.accessToken = accessToken

    if (!this.accessToken && !this.token) {
      throw new TypeError('Must include one of token or access token whenever constructing the YouTube object.')
    }

    this.oauth = new OAuth(this)

    this._shouldCache = options.cache
    this._cacheSearches = options.cacheSearches
    this._cacheTTL = options.cacheTTL

    this.language = language
    this.region = region

    if (options.cacheCheckInterval > 0) {
      setInterval(Cache.checkTTLs, options.cacheCheckInterval * 1000)
    }
  }

  /**
   * @ignore
   */
  public _cache (id: string, value: any) {
    if (!this._shouldCache) {
      return
    }

    Cache.set(id, value, this._cacheTTL > 0 ? this._cacheTTL * 1000 + new Date().getTime() : 0)
  }

  /**
   * Search supported entities on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async search<T extends SearchType = SearchType> (searchTerm: string, searchOptions?: SearchOptions<T>): Promise<PaginatedItemsReturns<T>> {
    return this._searchService.search({ searchTerm, ...searchOptions?.searchFilters, ...searchOptions?.pageOptions })
  }

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async searchVideos (searchTerm: string, searchOptions?: SearchOptions<typeof Video>) {
    return this.search(searchTerm, { searchFilters: { ...searchOptions?.searchFilters, types: [Video] }, pageOptions: searchOptions?.pageOptions })
  }

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async searchChannels (searchTerm: string, searchOptions?: SearchOptions<typeof Channel>) {
    return this.search(searchTerm, { searchFilters: { ...searchOptions?.searchFilters, types: [Channel] }, pageOptions: searchOptions?.pageOptions })
  }

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async searchPlaylists (searchTerm: string, searchOptions?: SearchOptions<typeof Playlist>) {
    return this.search(searchTerm, { searchFilters: { ...searchOptions?.searchFilters, types: [Playlist] }, pageOptions: searchOptions?.pageOptions })
  }

  /**
   * Get a [[Video]] object from the URL, ID, or Title of a video.
   * Meant mostly for getting by URL or ID.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param parts The parts of the video to fetch (saves quota if you aren't using certain properties!)
   */
  public async getVideo (videoResolvable: string | Video, parts?: VideoParts) {
    const id = await this._genericService.getId(videoResolvable, Video)
    return this._genericService.getItem(Video, false, id, parts) as Promise<Video>
  }

  /**
   * Get a [[Channel]] object from the Username, URL or ID of a channel.
   * Meant mostly for getting by URL or ID.  
   * **Beware**, custom channel URLs may not work.
   * @param channelResolvable The Username, URL or ID of the channel.
   * @param parts The parts of the channel to fetch (saves quota if you aren't using certain properties!)
   */
  public async getChannel (channelResolvable: string | Channel, parts?: ChannelParts) {
    const id = await this._genericService.getId(channelResolvable, Channel)
    return this._genericService.getItem(Channel, false, id, parts) as Promise<Channel>
  }

  /**
   * Get a [[Playlist]] object from the URL, ID, or Title of a playlist.
   * Meant mostly for getting by URL or ID.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param parts The parts of the playlist to fetch (saves quota if you aren't using certain properties!)
   */
  public async getPlaylist (playlistResolvable: string | Playlist, parts?: PlaylistParts) {
    const id = await this._genericService.getId(playlistResolvable, Playlist)
    return this._genericService.getItem(Playlist, false, id, parts) as Promise<Playlist>
  }

  /**
   * Get a [[Comment]] object from the ID of a comment.
   * @param commentId The ID of the comment.
   * @param parts The parts of the comment to fetch (saves quota if you aren't using certain properties!)
   */
  public async getComment (commentId: string, parts?: CommentParts) {
    return this._genericService.getItem(YTComment, false, commentId, parts) as Promise<YTComment>
  }

  /**
   * Get a [[Subscription]] object from the ID of a subscription.
   * @param subscriptionId The ID of the subscription.
   * @param parts The parts of the subscription to fetch (saves quota if you aren't using certain properties!)
   */
  public async getSubscription (subscriptionId: string, parts?: SubscriptionParts) {
    return this._genericService.getItem(Subscription, false, subscriptionId, parts) as Promise<Subscription>
  }

  /**
   * Get a [[VideoCategory]] object from the ID of a category.
   * @param categoryId The ID of the category.
   */
  public async getCategory (categoryId: string) {
    return this._genericService.getItem(VideoCategory, false, categoryId) as Promise<VideoCategory>
  }

  /**
   * Get a [[ChannelSection]] object from the ID of a section.
   * @param categoryId The ID of the section.
   * @param parts The parts of the channel section to fetch (saves quota if you aren't using certain properties!)
   */
  public async getChannelSection (sectionId: string, parts?: ChannelSectionParts) {
    return this._genericService.getItem(ChannelSection, false, sectionId, parts) as Promise<ChannelSection>
  }

  /**
   * Get a [[Subscription]] object from the subscriber and channel of a subscription.
   * @param subscriberResolvable A resolvable channel that is the subscriber.
   * @param channelResolvable A resolvable channel that is the channel being subscribed to.
   * @param parts The parts of the subscription to fetch (saves quota if you aren't using certain properties!)
   */
  public async getSubscriptionByChannels (subscriberResolvable: string | Channel, channelResolvable: string | Channel, parts?: SubscriptionParts) {
    const subscriberId = await this._genericService.getId(subscriberResolvable, Channel)
    const channelId = await this._genericService.getId(channelResolvable, Channel)

    return this._subscriptionService.getSubscriptionByChannels(subscriberId, channelId, parts)
  }

  /**
   * Get `maxPerPage * pages` videos in a [[Playlist]]. Used mostly internally with [[Playlist.fetchVideos]].
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the videos to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial video objects.
   */
  public async getPlaylistItems (playlistResolvable: string | Playlist, pageOptions?: PageOptions, parts?: PlaylistItemParts) {
    const playlistId = await this._genericService.getId(playlistResolvable, Playlist)
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.PlaylistItems, id: playlistId, ...pageOptions, parts })).items as Video[]
  }

  /**
   * Get `maxPerPage * pages` [[YTComment]]s from a [[Video]]. Used mostly internally with [[Video.fetchComments]].
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the comments to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial comment objects.
   */
  public async getVideoComments (videoResolvable: string | Video, pageOptions?: PageOptions, parts?: CommentThreadParts) {
    const videoId = await this._genericService.getId(videoResolvable, Video)
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.VideoComments, id: videoId, ...pageOptions, parts })).items as YTComment[]
  }

  /**
   * @deprecated See https://support.google.com/youtube/thread/130882091?hl=en&msgid=131295194
   * 
   * Get `maxPerPage * pages` [[YTComment]]s from a [[Channel]]'s discussion tab. Used mostly internally with [[Channel.fetchComments]].
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the comments to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial comment objects.
   */
  public async getChannelComments (channelResolvable: string | Channel, pageOptions?: PageOptions, parts?: CommentThreadParts) {
    const channelId = await this._genericService.getId(channelResolvable, Channel)
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.ChannelComments, id: channelId, ...pageOptions, parts })).items as YTComment[]
  }

  /**
   * Get `maxPerPage * pages` of a [[Channel]]'s [[Playlist]]s. Used mostly internally with [[Channel.fetchPlaylists]].
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the playlists to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial playlist objects.
   */
  public async getChannelPlaylists (channelResolvable: string | Channel, pageOptions?: PageOptions, parts?: PlaylistParts) {
    const channelId = await this._genericService.getId(channelResolvable, Channel)
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.Playlists, id: channelId, ...pageOptions, parts })).items as Playlist[]
  }

  /**
   * Get `maxPerPage * pages` of a [[Channel]]'s [[Subscription]]s. Used mostly internally with [[Channel.fetchSubscriptions]].
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial subscription objects.
   */
  public async getChannelSubscriptions (channelResolvable: string | Channel, pageOptions?: PageOptions, parts?: SubscriptionParts) {
    const channelId = await this._genericService.getId(channelResolvable, Channel)
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.Subscriptions, id: channelId, ...pageOptions, parts })).items as Subscription[]
  }

  /**
   * Get `maxPerPage * pages` replies to a [[YTComment]]. Used mostly internally with [[Comment.fetchReplies]].
   * @param commentId The ID of the comment to get replies from.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the replies to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial comment objects.
   */
  public async getCommentReplies (commentId: string, pageOptions?: PageOptions, parts?: CommentParts) {
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.CommentReplies, id: commentId, ...pageOptions, parts })).items as YTComment[]
  }

  /**
   * Gets the [[ChannelSection]]s of a [[Channel]]. Used mostly internally with [[Channel.fetchSections]].
   * @param channelResolvable The Username, URL, or ID of the channel to get the sections from.
   * @param parts The parts of the channel sections to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial channel section objects.
   */
  public async getChannelSections (channelResolvable: string | Channel, parts?: ChannelSectionParts) {
    const channelId = await this._genericService.getId(channelResolvable, Channel)
    return (await this._genericService.getPaginatedItems(
      { type: PaginatedItemType.ChannelSections, id: channelId, parts })).items as ChannelSection[]
  }

  /**
   * Get the list of categories in `this.region`.
   */
  public async getCategories () {
    return (await this._genericService.getPaginatedItems({ type: PaginatedItemType.VideoCategories })).items as VideoCategory[]
  }

  /**
   * Get a list of languages that YouTube supports.
   */
  public async getLanguages () {
    return (await this._genericService.getPaginatedItems({ type: PaginatedItemType.Languages })).items as Language[]
  }

  /**
   * Get a list of regions that YouTube supports.
   */
  public async getRegions () {
    return (await this._genericService.getPaginatedItems({ type: PaginatedItemType.Regions })).items as Region[]
  }
}

export type YouTubeOptions = {
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
