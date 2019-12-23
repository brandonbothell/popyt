import { Video, Channel, Playlist, YTComment } from './entities'
import { Parser, Cache, Request } from './util'
import { OAuth } from './oauth'
import { SearchService, GenericService } from './services'

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

  public _tokenType: 'key' | 'oauth'

  /**
   * @ignore
   */
  private _token: string

  get token (): string {
    return this._token
  }
  set token (val: string) {
    this._token = val
    this._tokenType = val.startsWith('ya29') ? 'oauth' : 'key'
  }

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
   * @param videoResolvable The URL, ID, or Title of the video.
   */
  public async getVideo (videoResolvable: string) {
    const id = await GenericService.getId(this, videoResolvable, Video)
    return GenericService.getItemById(this, Video, id) as Promise<Video>
  }

  /**
   * Get a [[Channel]] object from the Username, URL or ID of a channel.
   * @param channelResolvable The Username, URL or ID of the channel.
   */
  public async getChannel (channelResolvable: string) {
    const id = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getItemById(this, Channel, id) as Promise<Channel>
  }

  /**
   * Get a [[Playlist]] object from the URL, ID, or Title of a playlist.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   */
  public async getPlaylist (playlistResolvable: string) {
    const id = await GenericService.getId(this, playlistResolvable, Playlist)
    return GenericService.getItemById(this, Playlist, id) as Promise<Playlist>
  }

  /**
   * Get a [[Comment]] object from the ID of a comment.
   * @param id The ID of the comment.
   */
  public getComment (commentId: string) {
    return GenericService.getItemById(this, YTComment, commentId) as Promise<YTComment>
  }

  /**
   * Get a video object from the url of a video.
   * @deprecated Use getVideo() instead
   * @param url The url of the video.
   */
  /* istanbul ignore next */
  public getVideoByUrl (url: string) {
    const id = Parser.parseUrl(url)

    if (!id.video) {
      return Promise.reject('Not a valid video url')
    }

    return GenericService.getItemById(this, Video, id.video) as Promise<Video>
  }

  /**
   * Get a channel object from the url of a channel.
   * @deprecated Use getChannel() instead
   * @param url The url of the channel.
   */
  /* istanbul ignore next */
  public getChannelByUrl (url: string) {
    const id = Parser.parseUrl(url)

    if (!id.channel) {
      return Promise.reject('Not a valid channel url')
    }

    return GenericService.getItemById(this, Channel, id.channel) as Promise<Channel>
  }

  /**
   * Get a playlist object from the url of a playlist.
   * @deprecated Use getPlaylist() instead
   * @param url The url of the playlist.
   */
  /* istanbul ignore next */
  public getPlaylistByUrl (url: string) {
    const id = Parser.parseUrl(url)

    if (!id.playlist) {
      return Promise.reject('Not a valid playlist url')
    }

    return GenericService.getItemById(this, Playlist, id.playlist) as Promise<Playlist>
  }

  /**
   * Get `maxResults` videos in a [[Playlist]]. Used mostly internally with `Playlist#fetchVideos`.
   * @param playlistResolvable The URL, ID, or Title of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
   */
  public async getPlaylistItems (playlistResolvable: string, maxResults: number = -1) {
    const playlistId = await GenericService.getId(this, playlistResolvable, Playlist)
    return GenericService.getPaginatedItems(this, 'playlistItems', playlistId, maxResults) as Promise<Video[]>
  }

  /**
   * Get `maxResults` [[YTComment]]s from a [[Video]]. Used mostly internally with `Video#fetchComments`.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param maxResults The maximum amount of comments to get from the video. If <= 0 or not included, returns all comments on the video.
   */
  public async getVideoComments (videoResolvable: string, maxResults: number = -1) {
    const videoId = await GenericService.getId(this, videoResolvable, Video)
    return GenericService.getPaginatedItems(this, 'commentThreads:video', videoId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` [[YTComment]]s from a [[Channel]]'s discussion tab. Used mostly internally with `Channel#fetchComments`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of comments to get from the channel. If <= 0 or not included, returns all comments on the channel.
   */
  public async getChannelComments (channelResolvable: string, maxResults: number = -1) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'commentThreads:channel', channelId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` of a [[Channel]]'s [[Playlist]]s. Used mostly internally with `Channel#fetchPlaylists`.
   * @param channelResolvable The Username, URL, or ID of the channel.
   * @param maxResults The maximum amount of playlists to get from the channel. If <= 0 or not included, returns all playlists.
   */
  public async getChannelPlaylists (channelResolvable: string, maxResults: number = -1) {
    const channelId = await GenericService.getId(this, channelResolvable, Channel)
    return GenericService.getPaginatedItems(this, 'playlists:channel', channelId, maxResults) as Promise<Playlist[]>
  }

  /**
   * Get `maxResults` replies to a [[YTComment]]. Used mostly internally with `Comment#fetchReplies`.
   * @param commentId The ID of the comment to get replies from.
   * @param maxResults The maximum amount of replies to get. Gets all replies if <= 0 or not included.
   */
  public getCommentReplies (commentId: string, maxResults: number = -1) {
    return GenericService.getPaginatedItems(this, 'comments', commentId, maxResults) as Promise<YTComment[]>
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
