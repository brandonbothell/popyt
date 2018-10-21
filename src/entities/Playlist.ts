import { YouTube } from '..'
import { Video } from '.'
import { Thumbnail } from '../types'

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
  public thumbnails: {
    default?: Thumbnail,
    high?: Thumbnail,
    maxres?: Thumbnail
    medium?: Thumbnail,
    standard?: Thumbnail
  }

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

  constructor (youtube: YouTube, data) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  private _init (data) {
    if (data.kind === 'youtube#playlist') {
      const playlist = data

      this.id = playlist.id
      this.tags = playlist.snippet.tags
      this.itemCount = playlist.contentDetails.itemCount
      this.embedHtml = playlist.player.embedHtml
    } else if (data.kind === 'youtube#searchResult') {
      this.id = data.id.playlistId
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
  public async fetchVideos (maxResults: number = -1) {
    this.videos = await this.youtube.getPlaylistItems(this.id, maxResults)
    return this.videos
  }

  /**
   * Deprecated, use Playlist#fetchVideos instead.
   * @param maxResults Maximum number of videos to fetch.
   */
  public getVideos (maxResults: number = -1) {
    return this.fetchVideos(maxResults)
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
