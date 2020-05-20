import YouTube from '..'

/**
 * A region.
 */
export class Region {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'i18nRegions'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,snippet(gl,name))'

  /**
   * The YouTube object that created this language object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full language object.
   */
  public full: boolean

  /**
   * The raw data of this language.
   */
  public data: any

  /**
   * The ID of this language.
   */
  public id: string

  /**
   * The country code that uniquely identifies the region.
   */
  public gl: string

  /**
   * The region's name.
   */
  public name: string

  constructor (youtube: YouTube, data: any) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind !== 'youtube#i18nRegion') {
      throw new Error(`Invalid region type: ${data.kind}`)
    }

    const region = data

    this.id = region.id
    this.full = true

    /* istanbul ignore next */
    if (region.snippet) {
      this.gl = region.snippet.gl
      this.name = region.snippet.name
    } else {
      /* istanbul ignore next */
      this.full = false
    }
  }
}
