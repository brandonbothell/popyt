import { YouTube } from '..'
import { Thumbnail } from '../types'
import { YTComment } from './Comment'

/**
 * A YouTube video.
 */
export class Video {
  /**
   * YouTube object that created the video.
   */
  public youtube: YouTube

  /**
   * The raw data of the video.
   */
  public data

  /**
   * Whether or not this is a full video object.
   */
  public full: boolean

  /**
   * The ID of the video.
   */
  public id: string

  /**
   * The title of the video.
   */
  public title: string

  /**
   * The description of the video.
   */
  public description: string

  /**
   * The thumbnails of the video.
   */
  public thumbnails: {
    default?: Thumbnail,
    high?: Thumbnail,
    maxres?: Thumbnail
    medium?: Thumbnail,
    standard?: Thumbnail
  }

  /**
   * The date the video was published.
   */
  public datePublished: Date

  /**
   * The ID of the channel that uploaded the video.
   */
  public channelId: string

  private _length: string

  /**
   * The minutes of the video.
   */
  public minutes: number

  /**
   * The seconds of the video.
   */
  public seconds: number

  /**
   * The url of the video.
   */
  public url: string

  /**
   * The short url of the video, i.e. https://youtu.be/id
   */
  public shortUrl: string

  /**
   * The number of likes the video has.
   */
  public likes: number

  /**
   * The number of dislikes the video has.
   */
  public dislikes: number

  /**
   * The number of views the video has.
   */
  public views: number

  /**
   * Whether or not this video COULD BE private. True if the video might
   * be private, as you cannot check if playlist items are private.
   * I would recommend you try and fetch the video and catch an error
   * if it is private.
   */
  public private: boolean

  /**
   * The video's comments. Only defined when Video#fetchComments is called.
   */
  public comments: YTComment[]

  constructor (youtube: YouTube, data) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  private _init (data) {
    if (data.kind === 'youtube#video') {
      const video = data

      this._length = video.contentDetails.duration
      this.minutes = parseInt(this._length.substring(this._length.indexOf('PT') + 2, this._length.indexOf('M')))
      this.seconds = parseInt(this._length.substring(this._length.indexOf('M') + 1, this._length.length - 1))

      this.likes = Number(video.statistics.likeCount)
      this.dislikes = Number(video.statistics.dislikeCount)
      this.views = Number(video.statistics.viewCount)
      this.id = video.id
    } else if (data.kind === 'youtube#playlistItem') {
      this.id = data.snippet.resourceId.videoId
      this.private = data.snippet.title === 'Private video'
    } else if (data.kind === 'youtube#searchResult') {
      this.id = data.id.videoId
    } else {
      throw new Error(`Invalid video type: ${data.kind}.`)
    }

    this.title = data.snippet.title
    this.description = data.snippet.description
    this.thumbnails = data.snippet.thumbnails
    this.datePublished = new Date(data.snippet.publishedAt)
    this.channelId = data.snippet.channelId
    this.full = data.kind === 'youtube#video'
    this.url = `https://youtube.com/watch?v=${this.id}`
    this.shortUrl = `https://youtu.be/${this.id}`

    return this
  }

  /**
   * Fetches this video and reassigns this object to the new video object.
   * Only useful if `this.full` is false, or if you want updated video info.
   */
  public async fetch () {
    const video = await this.youtube.getVideo(this.id)
    return Object.assign(this, video)
  }

  /**
   * Fetches the video's comments and assigns them to Video#comments.
   * @param maxResults The maximum amount of comments to fetch
   */
  public async fetchComments (maxResults: number = -1) {
    this.comments = await this.youtube.getVideoComments(this.id, maxResults)
    return this.comments
  }
}
