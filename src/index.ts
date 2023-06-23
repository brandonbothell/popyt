/**
 * @module Library Exports
 */

import { Cache, Request } from './util'
import * as Part from './types/Parts'
import * as T from './types'
import * as Service from './services'
import OAuth from './oauth'
import * as Entity from './entities'

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
  public _request = new Request('https://www.googleapis.com/youtube/v3/')

  /**
   * @ignore
   */
  public _upload = new Request('https://www.googleapis.com/upload/youtube/v3/')

  /**
   * @ignore
   */
  public _searchService = new Service.SearchService(this)

  /**
   * @ignore
   */
  public _subscriptionService = new Service.SubscriptionService(this)

  /**
   * @ignore
   */
  public _channelService = new Service.ChannelService(this)

  /**
   * @ignore
   */
  public _resolutionService = new Service.ResolutionService(this)

  /**
   * @ignore
   */
  public _genericService = new Service.GenericService(this)

  public auth: T.Authorization = {}

  /**
   * Methods requiring an OAuth token.
   */
  public oauth: OAuth

  /**
   * The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages).
   */
  public language: string

  /**
   * The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions).
   */
  public region: string

  /**
   *
   * @param apiKey Your YouTube Data API v3 key. Don't share this with anybody.
   * @param accessToken A Google OAuth 2.0 access token. Used for [`YouTube.oauth`](#oauth) methods.
   * @param options Caching options. Recommended to change.
   * @param language The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages).
   * @param region The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions)..
   */
  constructor (apiKey?: string, accessToken?: string, options: YouTubeOptions = { cache: true, cacheTTL: 600, cacheCheckInterval: 600, cacheSearches: true },
    language: string = 'en_US', region: string = 'US') {
    this.auth.apiKey = apiKey
    this.auth.accessToken = accessToken

    if (!this.auth.accessToken && !this.auth.apiKey) {
      throw new TypeError('Must include one of api key or access token whenever constructing the YouTube object.')
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
  public async search<T extends T.SearchType = T.SearchType> (searchTerm: string, searchOptions?: T.GenericSearchOptions<T>):
  Promise<T.PaginatedResponse<InstanceType<T>>> {
    return this._searchService.search({ searchTerm, ...searchOptions?.searchFilters, ...searchOptions?.pageOptions })
  }

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async searchVideos (searchTerm: string, searchOptions?: T.EntitySearchOptions<typeof Entity.Video>) {
    return this.search(searchTerm, { searchFilters: { ...searchOptions?.searchFilters, types: [Entity.Video] }, pageOptions: searchOptions?.pageOptions })
  }

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async searchChannels (searchTerm: string, searchOptions?: T.EntitySearchOptions<typeof Entity.Channel>) {
    return this.search(searchTerm, { searchFilters: { ...searchOptions?.searchFilters, types: [Entity.Channel] }, pageOptions: searchOptions?.pageOptions })
  }

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param searchOptions Options related to the search including search filters,
   * the number of pages, maximum number of results per page, and starting page token.
   * Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.
   */
  public async searchPlaylists (searchTerm: string, searchOptions?: T.EntitySearchOptions<typeof Entity.Playlist>) {
    return this.search(searchTerm, { searchFilters: { ...searchOptions?.searchFilters, types: [Entity.Playlist] }, pageOptions: searchOptions?.pageOptions })
  }

  /**
   * Get a [`Video`](./Library_Exports.Video) object from the URL, ID, or search query of a video.
   * @param videoResolvable The URL, ID, or search query of the video.
   * @param parts The parts of the video to fetch (saves quota if you aren't using certain properties!)
   */
  public async getVideo<T extends T.VideoResolvable | T.VideoResolvable[]> (videoResolvable: T, parts?: Part.VideoParts) {
    const video = await this._resolutionService.resolve(videoResolvable, Entity.Video)
    return this._genericService.getItem(Entity.Video, false, video, parts)
  }

  /**
   * Get a [`Channel`](./Library_Exports.Channel) object from the URL, ID, search query, or handle of a channel.
   * **Beware**, support for old custom channel URLs is shoddy.
   * Consider migrating to [the new @ system.](https://support.google.com/youtube/answer/2657968?hl=en)
   * @param channelResolvable The URL, ID, search query, or handle of the channel.
   * @param parts The parts of the channel to fetch (saves quota if you aren't using certain properties!)
   */
  public async getChannel<T extends T.ChannelResolvable | T.ChannelResolvable[]> (channelResolvable: T, parts?: Part.ChannelParts) {
    const channel = await this._resolutionService.resolve(channelResolvable, Entity.Channel)
    return this._genericService.getItem(Entity.Channel, false, channel, parts)
  }

  /**
   * Get a [`Playlist`](./Library_Exports.Playlist) object from the URL, ID, or search query of a playlist.
   * Meant mostly for getting by URL or ID.
   * @param playlistResolvable The URL, ID, or search query of the playlist.
   * @param parts The parts of the playlist to fetch (saves quota if you aren't using certain properties!)
   */
  public async getPlaylist<T extends T.PlaylistResolvable | T.PlaylistResolvable[]> (playlistResolvable: T, parts?: Part.PlaylistParts) {
    const playlist = await this._resolutionService.resolve(playlistResolvable, Entity.Playlist)
    return this._genericService.getItem(Entity.Playlist, false, playlist, parts)
  }

  /**
   * Get a [`Comment`](./Library_Exports.Comment) object from the ID of a comment.
   * @param commentId The ID of the comment.
   * @param parts The parts of the comment to fetch (saves quota if you aren't using certain properties!)
   */
  public async getComment<T extends string | string[]> (commentId: T, parts?: Part.CommentParts) {
    return this._genericService.getItem(Entity.Comment, false, commentId, parts)
  }

  /**
   * Get a [`Subscription`](./Library_Exports.Subscription) object from the ID of a subscription.
   * @param subscriptionId The ID of the subscription.
   * @param parts The parts of the subscription to fetch (saves quota if you aren't using certain properties!)
   */
  public async getSubscription<T extends string | string[]> (subscriptionId: T, parts?: Part.SubscriptionParts) {
    return this._genericService.getItem(Entity.Subscription, false, subscriptionId, parts)
  }

  /**
   * Get a [`VideoCategory`](./Library_Exports.VideoCategory) object from the ID of a category.
   * @param categoryId The ID of the category.
   */
  public async getCategory<T extends string | string[]> (categoryId: T) {
    return this._genericService.getItem(Entity.VideoCategory, false, categoryId)
  }

  /**
   * Get a [`ChannelSection`](./Library_Exports.ChannelSection) object from the ID of a section.
   * @param categoryId The ID of the section.
   * @param parts The parts of the channel section to fetch (saves quota if you aren't using certain properties!)
   */
  public async getChannelSection<T extends string | string[]> (sectionId: T, parts?: Part.ChannelSectionParts) {
    return this._genericService.getItem(Entity.ChannelSection, false, sectionId, parts)
  }

  /**
   * Get a [`Subscription`](./Library_Exports.Subscription) object from the subscriber and channel of a subscription.
   * Channels can be passed in the form of ID, URL, or search query.
   * @param subscriberResolvable A resolvable channel that is the subscriber.
   * @param channelResolvable A resolvable channel that is the channel being subscribed to.
   * @param parts The parts of the subscription to fetch (saves quota if you aren't using certain properties!)
   */
  public async getSubscriptionByChannels (subscriberResolvable: T.ChannelResolvable, channelResolvable: T.ChannelResolvable, parts?: Part.SubscriptionParts) {
    const subscriberAndChannel = (await this._resolutionService.resolve([ subscriberResolvable, channelResolvable ], Entity.Channel))
      .map(channel => typeof channel === 'string' ? channel : channel.id)

    return this._subscriptionService.getSubscriptionByChannels(subscriberAndChannel[0], subscriberAndChannel[1], parts)
  }

  /**
   * Get `maxPerPage * pages` videos in a [`Playlist`](./Library_Exports.Playlist).
   * Used mostly internally with [`Playlist.fetchVideos()`](./Library_Exports.Playlist#fetchvideos).
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the videos to fetch (saves quota if you aren't using certain properties!)
   * @returns An object containing page token information for future requests and ***partial* video objects**.
   */
  public async getPlaylistItems (playlistResolvable: T.PlaylistResolvable, pageOptions?: T.PageOptions, parts?: Part.PlaylistItemParts) {
    const playlist = await this._resolutionService.resolve(playlistResolvable, Entity.Playlist)
    return this._genericService.getPaginatedItems<Entity.Video>(
      { type: T.PaginatedItemType.PlaylistItems, id: typeof playlist === 'string' ? playlist : playlist.id, ...pageOptions, parts }
    )
  }

  /**
   * Get `maxPerPage * pages` [`Comment`](./Library_Exports.Comment)s from a [`Video`](./Library_Exports.Video).
   * Used mostly internally with [`Video.fetchComments()`](./Library_Exports.Video#fetchcomments).
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the comments to fetch (saves quota if you aren't using certain properties!)
   * @returns An object containing page token information for future requests and **comment objects**.
   */
  public async getVideoComments (videoResolvable: T.VideoResolvable, pageOptions?: T.PageOptions,
    order?: 'time' | 'relevance', parts?: Part.CommentThreadParts) {

    const video = await this._resolutionService.resolve(videoResolvable, Entity.Video)
    return this._genericService.getPaginatedItems<Entity.Comment>(
      { type: T.PaginatedItemType.VideoComments, id: typeof video === 'string' ? video : video.id, ...pageOptions, parts, order })
  }

  /**
   * Get `maxPerPage * pages` of a [`Channel`](./Library_Exports.Channel)'s [`Playlist`](./Library_Exports.Playlist)s.
   * Used mostly internally with [`Channel.fetchPlaylists()`](./Library_Exports.Channel#fetchplaylists).
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the playlists to fetch (saves quota if you aren't using certain properties!)
   * @returns An object containing page token information for future requests and **playlist objects**.
   */
  public async getChannelPlaylists (channelResolvable: T.ChannelResolvable, pageOptions?: T.PageOptions, parts?: Part.PlaylistParts) {
    const channel = await this._resolutionService.resolve(channelResolvable, Entity.Channel)
    return this._genericService.getPaginatedItems<Entity.Playlist>(
      { type: T.PaginatedItemType.Playlists, id: typeof channel === 'string' ? channel : channel.id, ...pageOptions, parts })
  }

  /**
   * Get `maxPerPage * pages` of a [`Channel`](./Library_Exports.Channel)'s [`Subscription`](./Library_Exports.Subscription)s.
   * Used mostly internally with [`Channel.fetchSubscriptions()`](./Library_Exports.Channel#fetchsubscriptions).
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!)
   * @returns An object containing page token information for future requests and **subscription objects**.
   */
  public async getChannelSubscriptions (channelResolvable: T.ChannelResolvable, pageOptions?: T.PageOptions, parts?: Part.SubscriptionParts) {
    const channel = await this._resolutionService.resolve(channelResolvable, Entity.Channel)
    return this._genericService.getPaginatedItems<Entity.Subscription>(
      { type: T.PaginatedItemType.Subscriptions, id: typeof channel === 'string' ? channel : channel.id, ...pageOptions, parts })
  }

  /**
   * Get `maxPerPage * pages` replies to a [`Comment`](./Library_Exports.Comment).
   * Used mostly internally with [`Comment.fetchReplies`](./Library_Exports.Comment#fetchreplies).
   * @param commentId The ID of the comment to get replies from.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the replies to fetch (saves quota if you aren't using certain properties!)
   * @returns An object containing page token information for future requests and **comment objects**.
   */
  public async getCommentReplies (commentResolvable: T.CommentResolvable, pageOptions?: T.PageOptions, parts?: Part.CommentParts) {
    const comment = await this._resolutionService.resolve(commentResolvable, Entity.Comment)
    return this._genericService.getPaginatedItems<Entity.Comment>(
      { type: T.PaginatedItemType.CommentReplies, id: typeof comment === 'string' ? comment : comment.id, ...pageOptions, parts })
  }

  /**
   * Gets the [`ChannelSection`](./Library_Exports.ChannelSection)s of a [`Channel`](./Library_Exports.Channel).
   * Used mostly internally with [`Channel.fetchSections`](./Library_Exports.Channel#fetchsections).
   * @param channelResolvable The Username, URL, or ID of the channel to get the sections from.
   * @param parts The parts of the channel sections to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial channel section objects.
   */
  public async getChannelSections (channelResolvable: T.ChannelResolvable, parts?: Part.ChannelSectionParts) {
    const channel = await this._resolutionService.resolve(channelResolvable, Entity.Channel)
    return (await this._genericService.getPaginatedItems<Entity.ChannelSection>(
      { type: T.PaginatedItemType.ChannelSections, id: typeof channel === 'string' ? channel : channel.id, parts })).items
  }

  /**
   * Get the list of video categories in [`this.region`](#region)`.
   */
  public async getCategories () {
    return (await this._genericService.getPaginatedItems({ type: T.PaginatedItemType.VideoCategories })).items as Entity.VideoCategory[]
  }

  /**
   * Get a list of languages that YouTube supports.
   */
  public async getLanguages () {
    return (await this._genericService.getPaginatedItems({ type: T.PaginatedItemType.Languages })).items as Entity.Language[]
  }

  /**
   * Get a list of regions that YouTube supports.
   */
  public async getRegions () {
    return (await this._genericService.getPaginatedItems({ type: T.PaginatedItemType.Regions })).items as Entity.Region[]
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
