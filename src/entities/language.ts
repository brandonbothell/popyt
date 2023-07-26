import YouTube from '..'
import { youtube_v3 } from '@googleapis/youtube'

/**
 * A language.
 */
export class Language {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'i18nLanguages'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,snippet(hl,name))'

  /**
   * The YouTube object that created this language object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full language object.
   */
  public full = true

  /**
   * The raw data of this language.
   */
  public data: any

  /**
   * The ID of this language.
   */
  public id: string

  /**
   * The language code that uniquely identifies the language.
   */
  public hl: string

  /**
   * The language's name.
   */
  public name: string

  constructor (youtube: YouTube, data: youtube_v3.Schema$I18nLanguage, full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: youtube_v3.Schema$I18nLanguage) {
    if (data.kind !== 'youtube#i18nLanguage') {
      throw new Error(`Invalid language type: ${data.kind}`)
    }

    const language = data

    this.id = language.id

    if (language.snippet) {
      this.hl = language.snippet.hl
      this.name = language.snippet.name
    }
  }
}
