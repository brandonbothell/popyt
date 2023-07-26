import YouTube from '..'
import { youtube_v3 } from '@googleapis/youtube'

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
   * The YouTube object that created this region object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full region object.
   */
  public full = true

  /**
   * The raw data of this region.
   */
  public data: any

  /**
   * The ID of this region.
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

  constructor (youtube: YouTube, data: youtube_v3.Schema$I18nRegion, full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: youtube_v3.Schema$I18nRegion) {
    if (data.kind !== 'youtube#i18nRegion') {
      throw new Error(`Invalid region type: ${data.kind}`)
    }

    const region = data
    this.id = region.id

    if (region.snippet) {
      this.gl = region.snippet.gl
      this.name = region.snippet.name
    }
  }
}
