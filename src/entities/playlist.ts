import { YouTube, Video, Thumbnail, PaginatedItemType } from '..'
import { GenericService } from '../services'
import { PlaylistItemParts, PlaylistParts } from '../types/Parts'

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
  public static part = 'snippet,contentDetails,player'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,snippet(tags,title,description,channelId,publishedAt,thumbnails),contentDetails(itemCount),player(embedHtml))'

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
   * The videos in the playlist. Only available after calling [[Playlist.fetchVideos]].
   */
  public videos: Video[]

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
      /* istanbul ignore next */
      this.tags = playlist.snippet ? playlist.snippet.tags : undefined
      /* istanbul ignore next */
      this.length = playlist.contentDetails ? playlist.contentDetails.itemCount : undefined
      /* istanbul ignore next */
      this.embedHtml = playlist.player ? playlist.player.embedHtml : undefined
    } else if (data.kind === 'youtube#searchResult') {
      this.id = data.id.playlistId
    } else {
      throw new Error(`Invalid playlist type: ${data.kind}`)
    }

    /* istanbul ignore next */
    if (playlist.snippet) {
      this.tags = playlist.snippet.tags
      this.title = playlist.snippet.title
      this.description = playlist.snippet.description
      this.creatorId = playlist.snippet.channelId
      this.dateCreated = new Date(playlist.snippet.publishedAt)
      this.thumbnails = playlist.snippet.thumbnails
    }

    this.url = `https://youtube.com/playlist?list=${this.id}`
  }

  /**
   * Adds videos in this playlist to the `videos` property of this playlist.
   * @param pages The number of pages of videos to fetch.
   */
  public async fetchVideos (pages?: number, parts?: PlaylistItemParts) {
    this.videos = await this.youtube.getPlaylistItems(this.id, { pages }, parts)
    return this.videos
  }

  /**
   * Fetches this playlist and reassigns this object to the new playlist object.
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
  /* istanbul ignore next */
  public async update (title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<Playlist> {
    const newPlaylist = await this.youtube.oauth.updatePlaylist(this.id, title, description, privacy, tags, language, localizations)
    return Object.assign(this, { ...newPlaylist, full: true })
  }

  /**
   * Adds a [[Video]] to the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param position The zero-based position to insert the video in.
   * @param note A note on the video.
   */
  /* istanbul ignore next */
  public async addVideo (videoResolvable: string | Video, position?: number, note?: string) {
    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
    const video = await this.youtube.oauth.addPlaylistItem(this.id, videoId, position, note)

    if (this.videos) {
      this.videos.push(video)
    } else {
      this.videos = [ video ]
    }

    return video
  }

  /**
   * Updates a [[Video]] in the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or Title of the video.
   * @param position The zero-based position to move the video to.
   * @param note A new note on the video.
   * @param itemId The playlist item ID if you have it.
   */
  /* istanbul ignore next */
  public async updateVideo (videoResolvable: string | Video, position?: number, note?: string, itemId?: string) {
    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
    const playlistItemId = itemId ?? (await GenericService.getPaginatedItems({ youtube: this.youtube, type: PaginatedItemType.PlaylistItems, mine: false, id: this.id, maxPerPage: 1, subId: videoId }))[0].id

    return this.youtube.oauth.updatePlaylistItem(playlistItemId, this.id, videoId, position, note)
  }

  /**
   * Removes a [[Video]] from the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or Title of the video.
   */
  /* istanbul ignore next */
  public async removeVideo (videoResolvable: string) {
    const playlistItemId = (await GenericService.getPaginatedItems({ youtube: this.youtube, type: PaginatedItemType.PlaylistItems, mine: false, id: this.id, maxPerPage: 1, subId: await GenericService.getId(this.youtube, videoResolvable, Video) }))[0].id

    return this.removeItem(playlistItemId)
  }

  /**
   * Removes a [[Video]] from the playlist.
   * Must be using an access token with correct scopes.
   * @param playlistItemId The playlist item ID (not the same as video id. See [[Playlist.removeVideo]]).
   */
  /* istanbul ignore next */
  public async removeItem (playlistItemId: string) {
    await this.youtube.oauth.deletePlaylistItem(playlistItemId)

    if (this.videos) {
      const index = this.videos.findIndex(v => v.data.id === playlistItemId)

      if (index >= 0) {
        this.videos.splice(index, 1)
      }
    }
  }

  /**
   * Deletes the playlist.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public delete () {
    return this.youtube.oauth.deletePlaylist(this.id)
  }
}
