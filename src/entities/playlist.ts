import { PlaylistItemParts, PlaylistParts } from '../types/Parts'
import { YouTube, Video, Thumbnail, PaginatedItemType, PageOptions, VideoResolvable, PaginatedResponse } from '..'

/**
 * A YouTube playlist.
 */
export class Playlist {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'playlists'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet,contentDetails,player,status'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,' +
    'snippet(tags,title,description,channelId,publishedAt,thumbnails),' +
    'contentDetails(itemCount),' +
    'player(embedHtml),' +
    'status(privacyStatus))'

  /**
   * The YouTube object that created this playlist.
   */
  public youtube: YouTube

  /**
   * The raw data of this playlist.
   */
  public data: any

  /**
   * Whether or not this is a full playlist object.
   */
  public full: boolean

  /**
   * The ID of this playlist.
   */
  public id: string

  /**
   * The title of the playlist.
   */
  public title: string

  /**
   * The description of the playlist.
   */
  public description: string

  /**
   * The videos in the playlist. Only available after calling [`Playlist.fetchVideos()`](#fetchvideos).  
   * **These are partial**, meaning they are missing some data.
   * See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
   * Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
   * like you would using a loop.
   */
  public videos: PaginatedResponse<Video>

  /**
   * The ID of the creator of the playlist.
   */
  public creatorId: string

  /**
   * The url of the playlist.
   */
  public url: string

  /**
   * The date the playlist was created.
   */
  public dateCreated: Date

  /**
   * The thumbnails for the playlist.
   */
  public thumbnails: {
    default?: Thumbnail
    high?: Thumbnail
    maxres?: Thumbnail
    medium?: Thumbnail
    standard?: Thumbnail
  }

  /**
   * The number of items in the playlist.
   */
  public length: number

  /**
   * An \<iframe\> tag that embeds a player that will play the playlist.
   */
  public embedHtml: string

  /**
   * The tags of the playlist.
   */
  public tags: string[]

  /**
   * Information on this playlist's privacy.
   */
  public privacy: 'private' | 'public' | 'unlisted'

  constructor (youtube: YouTube, data: any, full = false) {
    this.youtube = youtube
    this.data = data
    this.full = full

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    const playlist = data

    if (data.kind === 'youtube#playlist') {
      this.id = playlist.id
    } else if (data.kind === 'youtube#searchResult') {
      this.id = data.id.playlistId
    } else {
      throw new Error(`Invalid playlist type: ${data.kind}`)
    }

    if (playlist.snippet) {
      this.tags = playlist.snippet.tags
      this.title = playlist.snippet.title
      this.description = playlist.snippet.description
      this.creatorId = playlist.snippet.channelId
      this.dateCreated = new Date(playlist.snippet.publishedAt)
      this.thumbnails = playlist.snippet.thumbnails
    }

    this.length = playlist.contentDetails?.itemCount
    this.embedHtml = playlist.player?.embedHtml
    this.privacy = playlist.status?.privacyStatus

    this.url = `https://youtube.com/playlist?list=${this.id}`
  }

  /**
   * Fetches the videos in this playlist from the API and adds them to the `videos` property.  
   * **These are partial**, meaning they are missing some data.
   * See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
   * Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
   * like you would using a loop.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the object to fetch (saves quota if you aren't using certain properties!)
   */
  public async fetchVideos (pageOptions?: PageOptions, parts?: PlaylistItemParts) {
    this.videos = await this.youtube.getPlaylistItems(this.id, pageOptions, parts)
    return this.videos
  }

  /**
   * Fetches this playlist from the API and reassigns this object to the new playlist object.
   * Only useful if `this.full` is false, or if you want updated playlist info.
   */
  public async fetch (parts?: PlaylistParts) {
    const playlist = await this.youtube.getPlaylist(this.id, parts)
    return Object.assign(this, playlist)
  }

  /**
   * Edits the playlist.
   * Must be using an access token with correct scopes.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**
   * @param title A title for the playlist.
   * @param description A description of the playlist.
   * @param privacy Whether the video is private, public, or unlisted.
   * @param tags Tags pertaining to the playlist.
   * @param language The language of the playlist's default title and description.
   * @param localizations Translated titles and descriptions.
   */
  public async update (title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<Playlist> {
    const newPlaylist = await this.youtube.oauth.playlists.updatePlaylist(
      this.id, title, description, privacy, tags, language, localizations)
    return Object.assign(this, { ...newPlaylist, full: true })
  }

  /**
   * Adds a [Video](./Library_Exports.Video) to the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or search query of the video.
   * @param position The zero-based position to insert the video in.
   * @param note A note on the video.
   */
  public async addVideo (videoResolvable: VideoResolvable, position?: number, note?: string) {
    const videoId = await this.youtube._resolutionService.resolve(videoResolvable, Video)
    const playlistItem = await this.youtube.oauth.playlists.addPlaylistItem(
      this, videoId, position, note)

    if (this.videos) this.videos.items.push(playlistItem)
    else this.videos = { items: [ playlistItem ] }

    return playlistItem
  }

  /**
   * Updates a [Video](./Library_Exports.Video) in the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or (not recommended) search query of the video.
   * @param position The zero-based position to move the video to.
   * @param note A new note on the video.
   * @param itemId The playlist item ID if you have it.
   */
  public async updateVideo (videoResolvable: VideoResolvable, position?: number, note?: string, itemId?: string) {
    const video = await this.youtube._resolutionService.resolve(videoResolvable, Video)
    const playlistItemId = itemId ?? (await this.youtube._genericService.getPaginatedItems({
      type: PaginatedItemType.PlaylistItems,
      mine: false,
      id: this.id,
      maxPerPage: 1,
      subId: typeof video === 'string' ? video : video.id
    })
    )[0].id

    return this.youtube.oauth.playlists.updatePlaylistItem(
      playlistItemId, this, video, position, note)
  }

  /**
   * Removes a [Video](./Library_Exports.Video) from the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or (not recommended) search query of the video.
   */
  public async removeVideo (videoResolvable: VideoResolvable) {
    const video = await this.youtube._resolutionService.resolve(videoResolvable, Video)
    const playlistItemId = (this.youtube._genericService.getPaginatedItems({
      type: PaginatedItemType.PlaylistItems,
      mine: false,
      id: this.id,
      maxPerPage: 1,
      subId: typeof video === 'string' ? video : video.id
    }))[0].id

    return this.removeItem(playlistItemId)
  }

  /**
   * Removes a [Video](./Library_Exports.Video) from the playlist.
   * Must be using an access token with correct scopes.
   * @param playlistItemId The playlist item ID (not the same as video ID; see [`Playlist.removeVideo()`](./Library_Exports.Playlist#removevideo)).
   */
  public async removeItem (playlistItemId: string) {
    await this.youtube.oauth.playlists.deletePlaylistItem(playlistItemId)

    if (this.videos) {
      const index = this.videos.items.findIndex(v => v.data.id === playlistItemId)

      if (index >= 0) {
        this.videos.items.splice(index, 1)
      }
    }
  }

  /**
   * Deletes the playlist.
   * Must be using an access token with correct scopes.
   */
  public delete () {
    return this.youtube.oauth.playlists.deletePlaylist(this.id)
  }
}
