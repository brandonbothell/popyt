import { YouTube, Video, Thumbnail } from '..'

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
  public async fetchVideos (maxResults: number = 10) {
    this.videos = await this.youtube.getPlaylistItems(this.id, maxResults)
    return this.videos
  }

  /**
   * Fetches this playlist and reassigns this object to the new playlist object.
   * Only useful if `this.full` is false, or if you want updated playlist info.
   */
  public async fetch () {
    const playlist = await this.youtube.getPlaylist(this.id)
    return Object.assign(this, playlist)
  }
}
