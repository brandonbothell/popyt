import YouTube from '..'

/**
 * A YouTube [[Video]] category.
 */
export class VideoCategory {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'videoCategories'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,snippet(channelId,title,assignable))'

  /**
   * The YouTube object that created this category object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full category object.
   */
  public full: boolean

  /**
   * The raw data of this category.
   */
  public data: any

  /**
   * The ID of this category.
   */
  public id: string

  /**
   * The [[Channel]] that created the category.
   */
  public channelId: string

  /**
   * The category's title.
   */
  public title: string

  /**
   * Whether or not videos can be associated with the category.
   */
  public assignable: boolean

  constructor (youtube: YouTube, data: any) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind !== 'youtube#videoCategory') {
      throw new Error(`Invalid video category type: ${data.kind}`)
    }

    const category = data

    this.id = category.id
    this.full = true

    /* istanbul ignore next */
    if (category.snippet) {
      this.channelId = category.snippet.channelId
      this.title = category.snippet.title
      this.assignable = category.snippet.assignable
    } else {
      /* istanbul ignore next */
      this.full = false
    }
  }

  /**
   * Fetches this category and reassigns this object to the new category object.
   * Only useful if `this.full` is false, or if you want updated category info.
   */
  public async fetch () {
    const category = await this.youtube.getCategory(this.id)
    return Object.assign(this, category)
  }

  /**
   * Fetches the channel associated with this category.
   */
  public getChannel () {
    return this.youtube.getChannel(this.channelId)
  }
}
