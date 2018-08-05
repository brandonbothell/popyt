import { YouTube } from '..'
import { youtube_v3 } from 'googleapis'
import { Video } from '.'

/**
 * A YouTube playlist.
 */
export class Playlist {
  /**
   * The YouTube object that created this playlist.
   */
  public youtube: YouTube

  /**
   * The raw data of this playlist.
   */
  public data: youtube_v3.Schema$Playlist | youtube_v3.Schema$SearchResult

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
   * The videos in the playlist. Only available after calling `Playlist#getVideos()`.
   */
  public videos: Video[]

  /**
   * The ID of the creator of the playlist.
   */
  public creatorId: string

  /**
   * The date the playlist was created.
   */
  public datePublished: Date

  /**
   * The thumbnails for the playlist.
   */
  public thumbnails: youtube_v3.Schema$ThumbnailDetails

  /**
   * The number of items in the playlist.
   */
  public itemCount: number

  /**
   * An <iframe> tag that embeds a player that will play the playlist.
   */
  public embedHtml: string

  /**
   * The tags of the playlist.
   */
  public tags: string[]

  constructor (youtube: YouTube, data: youtube_v3.Schema$Playlist | youtube_v3.Schema$SearchResult) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  private _init (data: youtube_v3.Schema$Playlist | youtube_v3.Schema$SearchResult) {
    if (data.kind === 'youtube#playlist') {
      const playlist = data as youtube_v3.Schema$Playlist

      this.id = playlist.id
      this.tags = playlist.snippet.tags
      this.itemCount = playlist.contentDetails.itemCount
      this.embedHtml = playlist.player.embedHtml
    } else if (data.kind === 'youtube#searchResult') {
      this.id = (data as youtube_v3.Schema$SearchResult).id.playlistId
    } else {
      throw new Error(`Invalid playlist type: ${data.kind}`)
    }

    this.title = data.snippet.title
    this.creatorId = data.snippet.channelId
    this.datePublished = new Date(data.snippet.publishedAt)
    this.thumbnails = data.snippet.thumbnails
    this.full = data.kind === 'youtube#playlist'
  }

  /**
   * Adds every video in this playlist to the `videos` property of this playlist.
   */
  public async getVideos () {
    this.videos = await this.youtube.getPlaylistItems(this.id)
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
