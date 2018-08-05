import { YouTube } from '..'
import { youtube_v3 } from 'googleapis'

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
  public data: youtube_v3.Schema$Video | youtube_v3.Schema$PlaylistItem | youtube_v3.Schema$SearchResult

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
  public thumbnails: youtube_v3.Schema$ThumbnailDetails

  /**
   * The date the video was published.
   */
  public datePublished: Date

  /**
   * The ID of the channel that uploaded the video.
   */
  public channelId: string

  /**
   * The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S,
   * in which the letters PT indicate that the value specifies a period of time, and the letters
   * M and S refer to length in minutes and seconds, respectively. The # characters preceding the
   * M and S letters are both integers that specify the number of minutes (or seconds) of the video.
   * For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.
   */
  public length: string

  /**
   * The length of the video in minutes.
   */
  public minutes: number

  /**
   * The length of the video in seconds.
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

  constructor (youtube: YouTube, data: youtube_v3.Schema$Video | youtube_v3.Schema$PlaylistItem | youtube_v3.Schema$SearchResult) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  private _init (data: youtube_v3.Schema$Video | youtube_v3.Schema$PlaylistItem | youtube_v3.Schema$SearchResult) {
    if (data.kind === 'youtube#video') {
      const video = data as youtube_v3.Schema$Video

      this.id = video.id
      this.length = video.contentDetails.duration
      this.minutes = parseInt(this.length.substring(this.length.indexOf('PT') + 2, this.length.indexOf('M')))
      this.seconds = parseInt(this.length.substring(this.length.indexOf('M') + 1, this.length.length - 1))
    } else if (data.kind === 'youtube#playlistItem') {
      this.id = (data.snippet as youtube_v3.Schema$PlaylistItemSnippet).resourceId.videoId
    } else if (data.kind === 'youtube#searchResult') {
      this.id = (data.id as youtube_v3.Schema$ResourceId).videoId
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
  }

  /**
   * Fetches this video and reassigns this object to the new video object.
   * Only useful if `this.full` is false, or if you want updated video info.
   */
  public async fetch () {
    const video = await this.youtube.getVideo(this.id)
    return Object.assign(this, video)
  }
}
