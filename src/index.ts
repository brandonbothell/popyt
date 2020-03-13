import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory } from './entities'
import { Cache, Request } from './util'
import { OAuth } from './oauth'
import { SearchService, GenericService, SubscriptionService } from './services'

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
   * Methods requiring an OAuth token
   */
  public oauth: OAuth

  /**
   *
   * @param token Your YouTube Data API v3 token. Don't share this with anybody.
   * It could be an API key or an OAuth 2.0 token.
   * @param options Caching options. Recommended to change.
   */
  constructor (token?: string, accessToken?: string, options: YouTubeOptions = { cache: true, cacheTTL: 600, cacheCheckInterval: 600, cacheSearches: true }) {
    this.token = token
    this.accessToken = accessToken

    if (!this.accessToken && !this.token) {
      throw new TypeError('Must include one of token or access token whenever constructing the YouTube object.')
    }

    this.oauth = new OAuth(this)

    this._shouldCache = options.cache
    this._cacheSearches = options.cacheSearches
    this._cacheTTL = options.cacheTTL

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
   * @param pageToken The page token to start at. Provide this if you have received it as output from a call to a search method.
   */
  public search (types: (typeof Video | typeof Channel | typeof Playlist)[], searchTerm: string, maxResults: number = 10, pageToken?: string) {
    return SearchService.search(this, types, searchTerm, maxResults, pageToken)
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
   * Get a [[Video]] object from the URL, ID, or Title of a video.
   * Meant mostly for getting by URL or ID.
   * @param videoResolvable The URL, ID, or Title of the video.
   */
  public async getVideo (videoResolvable: string) {
    const id = await GenericService.getId(this, videoResolvable, Video)
    return GenericService.getItem(this, Video, false, id) as Promise<Video>
  }

  /**
   * Get a [[Channel]] object from the Username, URL or ID of a channel.
   * Meant mostly for getting by URL or ID.
   * @param channelResolvable The Username, URL or ID of the channel.
   */
  public async getChannel (channelResolvable: string) {
    const id = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getItem(this, Channel, false, id) as Promise<Channel>
  }

  /**
   * Get a [[Playlist]] object from the URL, ID, or Title of a playlist.
   * Meant mostly for getting by URL or ID.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   */
  public async getPlaylist (playlistResolvable: string) {
    const id = await GenericService.getId(this, playlistResolvable, Playlist)
    return GenericService.getItem(this, Playlist, false, id) as Promise<Playlist>
  }

  /**
   * Get a [[Comment]] object from the ID of a comment.
   * @param commentId The ID of the comment.
   */
  public getComment (commentId: string) {
    return GenericService.getItem(this, YTComment, false, commentId) as Promise<YTComment>
  }

  /**
   * Get a [[Subscription]] object from the ID of a subscription.
   * @param subscriptionId The ID of the subscription.
   */
  public getSubscription (subscriptionId: string) {
    return GenericService.getItem(this, Subscription, false, subscriptionId) as Promise<Subscription>
  }

  /**
   * Get a [[VideoCategory]] object from the ID of a category.
   * @param categoryId The ID of the category.
   */
  public getCategory (categoryId: string) {
    return GenericService.getItem(this, VideoCategory, false, categoryId) as Promise<VideoCategory>
  }

  /**
   * Get a [[Subscription]] object from the subscriber and channel of a subscription.
   * @param subscriberResolvable A resolvable channel that is the subscriber.
   * @param channelResolvable A resolvable channel that is the channel being subscribed to.
   */
  public async getSubscriptionByChannels (subscriberResolvable: string, channelResolvable: string) {
    const subscriberId = await GenericService.getId(this, subscriberResolvable, Channel)
    const channelId = await GenericService.getId(this, channelResolvable, Channel)

    return SubscriptionService.getSubscriptionByChannels(this, subscriberId, channelId)
  }

  /**
   * Get `maxResults` videos in a [[Playlist]]. Used mostly internally with `Playlist#fetchVideos`.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <=0, returns all videos in the playlist.
   * @returns Partial video objects.
   */
  public async getPlaylistItems (playlistResolvable: string, maxResults: number = 10) {
    const playlistId = await GenericService.getId(this, playlistResolvable, Playlist)
    return GenericService.getPaginatedItems(this, 'playlistItems', false, playlistId, maxResults) as Promise<Video[]>
  }

  /**
   * Get `maxResults` [[YTComment]]s from a [[Video]]. Used mostly internally with `Video#fetchComments`.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param maxResults The maximum amount of comments to get from the video. If <=0, returns all comments on the video.
   * @returns Partial comment objects.
   */
  public async getVideoComments (videoResolvable: string, maxResults: number = 10) {
    const videoId = await GenericService.getId(this, videoResolvable, Video)
    return GenericService.getPaginatedItems(this, 'commentThreads:video', false, videoId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` [[YTComment]]s from a [[Channel]]'s discussion tab. Used mostly internally with `Channel#fetchComments`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of comments to get from the channel. If <=0, returns all comments on the channel.
   * @returns Partial comment objects.
   */
  public async getChannelComments (channelResolvable: string, maxResults: number = 10) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'commentThreads:channel', false, channelId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` of a [[Channel]]'s [[Playlist]]s. Used mostly internally with `Channel#fetchPlaylists`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of playlists to get from the channel. If <=0, returns all playlists.
   * @returns Partial playlist objects.
   */
  public async getChannelPlaylists (channelResolvable: string, maxResults: number = 10) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'playlists:channel', false, channelId, maxResults) as Promise<Playlist[]>
  }

  /**
   * Get `maxResults` of a [[Channel]]'s [[Subscription]]s. Used mostly internally with `Channel#fetchSubscriptions`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of subscriptions to get from the channel. If <=0, returns all subscriptions.
   * @returns Partial subscription objects.
   */
  public async getChannelSubscriptions (channelResolvable: string, maxResults: number = 10) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'subscriptions', false, channelId, maxResults) as Promise<Subscription[]>
  }

  /**
   * Get `maxResults` replies to a [[YTComment]]. Used mostly internally with `Comment#fetchReplies`.
   * @param commentId The ID of the comment to get replies from.
   * @param maxResults The maximum amount of replies to get. Gets all replies if <=0.
   * @returns Partial comment objects.
   */
  public getCommentReplies (commentId: string, maxResults: number = 10) {
    return GenericService.getPaginatedItems(this, 'comments', false, commentId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get a list of categories of a country..
   * @param region An [ISO 3166-1 alpha-2](https://www.iso.org/iso-3166-country-codes.html) region code.
   * Defaults to the US.
   * @param all Whether or not to get all categories (otherwise just gets a page).
   */
  public getCategories (region: string = 'US', all: boolean = false) {
    return GenericService.getPaginatedItems(this, 'videoCategories', false, region, all ? -1 : 100) as Promise<VideoCategory[]>
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
