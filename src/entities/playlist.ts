import { YouTube, Video, Thumbnail } from '..'
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
   * The videos in the playlist. Only available after calling `Playlist#fetchVideos()`.
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

  constructor (youtube: YouTube, data: any) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind === 'youtube#playlist') {
      const playlist = data

      this.id = playlist.id
      /* istanbul ignore next */
      this.tags = playlist.snippet ? playlist.snippet.tags : undefined
      /* istanbul ignore next */
      this.length = playlist.contentDetails ? playlist.contentDetails.itemCount : undefined
      /* istanbul ignore next */
      this.embedHtml = playlist.player ? playlist.player.embedHtml : undefined
    } else if (data.kind === 'youtube#searchResult') {
      this.full = false
      this.id = data.id.playlistId
    } else {
      throw new Error(`Invalid playlist type: ${data.kind}`)
    }

    /* istanbul ignore next */
    if (data.snippet) {
      this.tags = data.snippet.tags
      this.title = data.snippet.title
      this.description = data.snippet.description
      this.creatorId = data.snippet.channelId
      this.dateCreated = new Date(data.snippet.publishedAt)
      this.thumbnails = data.snippet.thumbnails
    } else {
      this.full = false
    }

    this.url = `https://youtube.com/playlist?list=${this.id}`
  }

  /**
   * Adds videos in this playlist to the `videos` property of this playlist.
   * @param maxResults Fetches all videos if <=0.
   */
  public async fetchVideos (maxResults: number = 10, parts?: PlaylistItemParts) {
    this.videos = await this.youtube.getPlaylistItems(this.id, maxResults, parts)
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
    const playlistItemId = itemId ? itemId : (await GenericService.getPaginatedItems(this.youtube, 'playlistItems', false, this.id, 1, videoId))[0].id

    return this.youtube.oauth.updatePlaylistItem(playlistItemId, this.id, videoId, position, note)
  }

  /**
   * Removes a [[Video]] from the playlist.
   * Must be using an access token with correct scopes.
   * @param videoResolvable The URL, ID, or Title of the video. Must specify this or `itemId`.
   * @param itemId The playlist item ID if you have it. Must specify this or `videoResolvable`.
   */
  /* istanbul ignore next */
  public async removeVideo (videoResolvable?: string, itemId?: string) {
    if (!videoResolvable && !itemId) {
      return Promise.reject('Must specify either videoResolvable or itemId')
    }

    const playlistItemId = itemId ? itemId : (await GenericService.getPaginatedItems(this.youtube, 'playlistItems', false, this.id, 1,
      await GenericService.getId(this.youtube, videoResolvable, Video)))[0].id

    await this.youtube.oauth.deletePlaylistItem(playlistItemId)

    if (this.videos) {
      const index = this.videos.findIndex(v => v.data.id === playlistItemId)

      if (index) {
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
