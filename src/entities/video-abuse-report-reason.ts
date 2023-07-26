import YouTube from '..'
import { youtube_v3 } from '@googleapis/youtube'

/**
 * A YouTube [Video](./Library_Exports.Video#) abuse report reason.
 */
export class VideoAbuseReportReason {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'videoAbuseReportReasons'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,snippet(label,secondaryReasons))'

  /**
   * The YouTube object that created this reason object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full reason object.
   */
  public full = true

  /**
   * The raw data of this reason.
   */
  public data: any

  /**
   * The ID of this reason.
   */
  public id: string

  /**
   * The label text of this reason.
   */
  public label: string

  /**
   * A list of secondary reasons associated with the reason, if any are available.
   */
  public secondaryReasons: { id?: string; label?: string }[]

  constructor (youtube: YouTube, data: youtube_v3.Schema$VideoAbuseReportReason,
    full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: youtube_v3.Schema$VideoAbuseReportReason) {
    if (data.kind !== 'youtube#videoAbuseReportReason') {
      throw new Error(`Invalid video abuse report reason type: ${data.kind}`)
    }

    const reason = data

    this.id = reason.id

    if (reason.snippet) {
      this.label = reason.snippet.label
      this.secondaryReasons = reason.snippet.secondaryReasons
    }
  }
}
