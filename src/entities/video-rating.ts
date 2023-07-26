import { YouTube } from '..'

/**
 * A YouTube [Video](./Library_Exports.Video) rating (like/dislike).
 */
export class VideoRating {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'videos/getRating'

  /**
   * The parts to request for this entity.
   */
  public static part = ''

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(videoId,rating)'

  /**
   * The YouTube object that created this channel section object.
   */
  public youtube: YouTube

  /**
   * Whether or not this a full channel section object.
   */
  public full = true

  /**
   * The raw data of this channel section.
   */
  public data: any

  /**
   * The ID of the video this rating is for.
   */
  public videoId: string

  /**
   * The rating left on this video.
   */
  public rating: 'like' | 'dislike' | 'none' | 'unspecified'

  constructor (youtube: YouTube, data: any, full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    // Currently broken in the API
    /* if (data.kind !== 'youtube#videoGetRatingResponse') {
      throw new Error(`Invalid video rating type: ${data.kind}`)
    } */

    if (!data.videoId || !data.rating) {
      throw new Error('Invalid video rating')
    }

    this.videoId = data.videoId
    this.rating = data.rating
  }

  /**
   * Fetches this video rating from the API and reassigns this object to the new rating object.
   * Only useful if you want updated rating info.
   */
  public async fetch () {
    const rating = await this.youtube.oauth.videos.getMyRatings(this.videoId)
    return Object.assign(this, rating)
  }
}
