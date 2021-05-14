/**
 * @packageDocumentation
 * @module Public
 */

import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, Language, Region, ChannelSection } from './entities'
import { Cache, Request } from './util'
import { OAuth } from './oauth'
import { SearchService, GenericService, SubscriptionService } from './services'
import { VideoParts, ChannelParts, ChannelSectionParts, CommentParts, CommentThreadParts, PlaylistItemParts, PlaylistParts, SubscriptionParts } from './types/Parts'

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
   * @param types An array of types to search for. May be a single type or multiple types.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param fields The fields to include in the response. Includes all by default.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public search (types: (typeof Video | typeof Channel | typeof Playlist)[], searchTerm: string, maxResults: number = 10, pageToken?: string, fields?: string) {
    return SearchService.search(this, types, searchTerm, maxResults, pageToken, null, fields)
  }

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   * @param channelId The channel ID that you want to specifically search for.
   * @param category The category ID that you want to specifically search for.
   * @param onlyEmbeddable Whether or not to return only embeddable videos.
   * @param eventType The type of event you want to search for. Searches for everything by default.
   */
  public searchVideos (searchTerm: string, maxResults: number = 10, pageToken?: string, category?: string, channelId?: string, onlyEmbeddable: boolean = false,
    eventType?: 'completed' | 'live' | 'upcoming', type: 'any' | 'episode' | 'movie' = 'any') {
    return SearchService.search(this, [ Video ], searchTerm, maxResults, pageToken, channelId,
      null, category, onlyEmbeddable, eventType, type) as Promise<{ results: Video[]; prevPageToken: string; nextPageToken: string }>
  }

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public searchChannels (searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return this.search([ Channel ], searchTerm, maxResults, pageToken) as Promise<{ results: Channel[]; prevPageToken: string; nextPageToken: string }>
  }

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public searchPlaylists (searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return this.search([ Playlist ], searchTerm, maxResults, pageToken) as Promise<{ results: Playlist[]; prevPageToken: string; nextPageToken: string }>
  }

  /**
   * Get a [[Video]] object from the URL, ID, or Title of a video.
   * Meant mostly for getting by URL or ID.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param parts The parts of the video to fetch (saves quota if you aren't using certain properties!)
   */
  public async getVideo (videoResolvable: string | Video, parts?: VideoParts) {
    const id = await GenericService.getId(this, videoResolvable, Video)
    return GenericService.getItem(this, Video, false, id, parts) as Promise<Video>
  }

  /**
   * Get a [[Channel]] object from the Username, URL or ID of a channel.
   * Meant mostly for getting by URL or ID.  
   * **Beware**, custom channel URLs may not work.
   * @param channelResolvable The Username, URL or ID of the channel.
   * @param parts The parts of the channel to fetch (saves quota if you aren't using certain properties!)
   */
  public async getChannel (channelResolvable: string | Channel, parts?: ChannelParts) {
    const id = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getItem(this, Channel, false, id, parts) as Promise<Channel>
  }

  /**
   * Get a [[Playlist]] object from the URL, ID, or Title of a playlist.
   * Meant mostly for getting by URL or ID.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param parts The parts of the playlist to fetch (saves quota if you aren't using certain properties!)
   */
  public async getPlaylist (playlistResolvable: string | Playlist, parts?: PlaylistParts) {
    const id = await GenericService.getId(this, playlistResolvable, Playlist)
    return GenericService.getItem(this, Playlist, false, id, parts) as Promise<Playlist>
  }

  /**
   * Get a [[Comment]] object from the ID of a comment.
   * @param commentId The ID of the comment.
   * @param parts The parts of the comment to fetch (saves quota if you aren't using certain properties!)
   */
  public getComment (commentId: string, parts?: CommentParts) {
    return GenericService.getItem(this, YTComment, false, commentId, parts) as Promise<YTComment>
  }

  /**
   * Get a [[Subscription]] object from the ID of a subscription.
   * @param subscriptionId The ID of the subscription.
   * @param parts The parts of the subscription to fetch (saves quota if you aren't using certain properties!)
   */
  public getSubscription (subscriptionId: string, parts?: SubscriptionParts) {
    return GenericService.getItem(this, Subscription, false, subscriptionId, parts) as Promise<Subscription>
  }

  /**
   * Get a [[VideoCategory]] object from the ID of a category.
   * @param categoryId The ID of the category.
   */
  public getCategory (categoryId: string) {
    return GenericService.getItem(this, VideoCategory, false, categoryId) as Promise<VideoCategory>
  }

  /**
   * Get a [[ChannelSection]] object from the ID of a section.
   * @param categoryId The ID of the section.
   * @param parts The parts of the channel section to fetch (saves quota if you aren't using certain properties!)
   */
  public getChannelSection (sectionId: string, parts?: ChannelSectionParts) {
    return GenericService.getItem(this, ChannelSection, false, sectionId, parts) as Promise<ChannelSection>
  }

  /**
   * Get a [[Subscription]] object from the subscriber and channel of a subscription.
   * @param subscriberResolvable A resolvable channel that is the subscriber.
   * @param channelResolvable A resolvable channel that is the channel being subscribed to.
   * @param parts The parts of the subscription to fetch (saves quota if you aren't using certain properties!)
   */
  public async getSubscriptionByChannels (subscriberResolvable: string | Channel, channelResolvable: string | Channel, parts?: SubscriptionParts) {
    const subscriberId = await GenericService.getId(this, subscriberResolvable, Channel)
    const channelId = await GenericService.getId(this, channelResolvable, Channel)

    return SubscriptionService.getSubscriptionByChannels(this, subscriberId, channelId, parts)
  }

  /**
   * Get `maxResults` videos in a [[Playlist]]. Used mostly internally with [[Playlist.fetchVideos]].
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <=0, returns all videos in the playlist.
   * @param parts The parts of the videos to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial video objects.
   */
  public async getPlaylistItems (playlistResolvable: string | Playlist, maxResults: number = 10, parts?: PlaylistItemParts) {
    const playlistId = await GenericService.getId(this, playlistResolvable, Playlist)
    return GenericService.getPaginatedItems(this, 'playlistItems', false, playlistId, maxResults, null, parts) as Promise<Video[]>
  }

  /**
   * Get `maxResults` [[YTComment]]s from a [[Video]]. Used mostly internally with [[Video.fetchComments]].
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param maxResults The maximum amount of comments to get from the video. If <=0, returns all comments on the video.
   * @param parts The parts of the comments to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial comment objects.
   */
  public async getVideoComments (videoResolvable: string | Video, maxResults: number = 10, parts?: CommentThreadParts) {
    const videoId = await GenericService.getId(this, videoResolvable, Video)
    return GenericService.getPaginatedItems(this, 'commentThreads:video', false, videoId, maxResults, null, parts) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` [[YTComment]]s from a [[Channel]]'s discussion tab. Used mostly internally with [[Channel.fetchComments]].
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of comments to get from the channel. If <=0, returns all comments on the channel.
   * @param parts The parts of the comments to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial comment objects.
   */
  public async getChannelComments (channelResolvable: string | Channel, maxResults: number = 10, parts?: CommentThreadParts) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'commentThreads:channel', false, channelId, maxResults, null, parts) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` of a [[Channel]]'s [[Playlist]]s. Used mostly internally with [[Channel.fetchPlaylists]].
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of playlists to get from the channel. If <=0, returns all playlists.
   * @param parts The parts of the playlists to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial playlist objects.
   */
  public async getChannelPlaylists (channelResolvable: string | Channel, maxResults: number = 10, parts?: PlaylistParts) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'playlists:channel', false, channelId, maxResults, null, parts) as Promise<Playlist[]>
  }

  /**
   * Get `maxResults` of a [[Channel]]'s [[Subscription]]s. Used mostly internally with [[Channel.fetchSubscriptions]].
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of subscriptions to get from the channel. If <=0, returns all subscriptions.
   * @param parts The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial subscription objects.
   */
  public async getChannelSubscriptions (channelResolvable: string | Channel, maxResults: number = 10, parts?: SubscriptionParts) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'subscriptions', false, channelId, maxResults, null, parts) as Promise<Subscription[]>
  }

  /**
   * Get `maxResults` replies to a [[YTComment]]. Used mostly internally with [[Comment.fetchReplies]].
   * @param commentId The ID of the comment to get replies from.
   * @param maxResults The maximum amount of replies to get. Gets all replies if <=0.
   * @param parts The parts of the replies to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial comment objects.
   */
  public getCommentReplies (commentId: string, maxResults: number = 10, parts?: CommentParts) {
    return GenericService.getPaginatedItems(this, 'comments', false, commentId, maxResults, null, parts) as Promise<YTComment[]>
  }

  /**
   * Gets the [[ChannelSection]]s of a [[Channel]]. Used mostly internally with [[Channel.fetchSections]].
   * @param channelResolvable The Username, URL, or ID of the channel to get the sections from.
   * @param parts The parts of the channel sections to fetch (saves quota if you aren't using certain properties!)
   * @returns Partial channel section objects.
   */
  public async getChannelSections (channelResolvable: string | Channel, parts?: ChannelSectionParts) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'channelSections', false, channelId, null, null, parts) as Promise<ChannelSection[]>
  }

  /**
   * Get the list of categories in `this.region`.
   * @param all Whether or not to get all categories (otherwise just gets a page).
   */
  public getCategories (all: boolean = false) {
    return GenericService.getPaginatedItems(this, 'videoCategories', false, null, all ? -1 : 100) as Promise<VideoCategory[]>
  }

  /**
   * Get a list of languages that YouTube supports.
   */
  public getLanguages () {
    return GenericService.getPaginatedItems(this, 'i18nLanguages', false, null) as Promise<Language[]>
  }

  /**
   * Get a list of regions that YouTube supports.
   */
  public getRegions () {
    return GenericService.getPaginatedItems(this, 'i18nRegions', false, null) as Promise<Region[]>
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
