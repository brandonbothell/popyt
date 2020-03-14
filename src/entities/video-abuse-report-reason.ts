/* istanbul ignore file */
/* OAuth */

import YouTube from '..'

/**
 * A YouTube [[Video]] abuse report reason.
 */
export class VideoAbuseReportReason {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'videoAbuseReportReasons'

  /**
   * The parts to request for this entity.
   */
  public static part = 'id,snippet'

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
  public full: boolean

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
  public secondaryReasons: { id: string, label: string }[]

  constructor (youtube: YouTube, data: any) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind !== 'youtube#videoAbuseReportReason') {
      throw new Error(`Invalid video abuse report reason type: ${data.kind}`)
    }

    const reason = data

    this.id = reason.id
    this.full = true

    /* istanbul ignore next */
    if (reason.snippet) {
      this.label = reason.snippet.label
      this.secondaryReasons = reason.snippet.secondaryReasons
    } else {
      /* istanbul ignore next */
      this.full = false
    }
  }
}
