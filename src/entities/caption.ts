import YouTube from '..'

/**
 * A caption track.
 */
export class Caption {
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
  public static fields = 'items(kind,id,snippet)'

  /**
   * The YouTube object that created this caption track object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full caption track object.
   */
  public full = true

  /**
   * The raw data of this caption track.
   */
  public data: any

  /**
   * The ID of this caption track.
   */
  public id: string

  /**
   * The ID of the [Video](./Library_Exports.Video#) that this caption track is for.
   */
  public videoId: string

  /**
   * When this caption track was last updated.
   */
  public lastUpdated: Date

  /**
   * The kind of caption track this is (automatic speech recognition, forced due to foreign language, or standard).
   */
  public kind: 'ASR' | 'forced' | 'standard'

  /**
   * The language that this caption track is written in.
   */
  public language: string

  /**
   * The name of this caption track.
   */
  public name: string

  /**
   * Whether the audio is a commentary/descriptive (alternate audio tracks), the primary audio track, or unknown.
   */
  public audioType: 'commentary' | 'descriptive' | 'primary' | 'unknown'

  /**
   * Whether or not this caption track is for the deaf/hard of hearing.
   */
  public closedCaptions: boolean

  /**
   * Whether or not this caption track uses large text for the vision-impaired.
   */
  public large: boolean

  /**
   * Whether or not this caption track is written at a third-grade level (for language learners).
   */
  public easyReader: boolean

  /**
   * Whether or not this caption track is a draft. If so, it won't be shown to users.
   */
  public draft: boolean

  /**
   * Whether or not this caption track has been autosynced to the audio by YouTube.
   */
  public autoSynced: boolean

  /**
   * The processing status of the caption track.
   */
  public status: 'failed' | 'serving' | 'syncing'

  /**
   * If [Caption.status](./Library_Exports.Caption#status) is `failed`, then this is populated with the reason failure.
   */
  // Must fail for this property to be populated
  /* istanbul ignore next */
  public failureReason?: 'processingFailed' | 'unknownFormat' | 'unsupportedFormat'

  constructor (youtube: YouTube, data: any, full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind !== 'youtube#caption') {
      throw new Error(`Invalid caption type: ${data.kind}`)
    }

    const caption = data

    this.id = caption.id

    /* istanbul ignore next */
    if (caption.snippet) {
      this.videoId = caption.snippet.videoId
      this.lastUpdated = new Date(caption.snippet.lastUpdated)
      this.kind = caption.snippet.trackKind
      this.language = caption.snippet.language
      this.name = caption.snippet.name
      this.audioType = caption.snippet.audioTrackType
      this.closedCaptions = caption.snippet.isCC
      this.large = caption.snippet.isLarge
      this.easyReader = caption.snippet.isEasyReader
      this.draft = caption.snippet.isDraft
      this.autoSynced = caption.snippet.isAutoSynced
      this.status = caption.snippet.status
      this.failureReason = caption.snippet.failureReason
    }
  }

  /**
   * Fetches this caption from the API and reassigns this object to the new caption object.
   * Only useful if `this.full` is false, or if you want updated caption info.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public async fetch () {
    const caption = await this.youtube.oauth.getCaption(this.videoId, this.id)
    return Object.assign(this, caption)
  }

  /**
   * Updates this caption.
   * Must be using an access token with correct scopes.
   * @param track The modified caption track to upload.
   * @param draft Whether or not the track is a draft.
   */
  /* istanbul ignore next */
  public async update (track?: Buffer, draft: boolean = null): Promise<Caption> {
    const newCaption = await this.youtube.oauth.updateCaption(this.id, track, draft)
    return Object.assign(this, { ...newCaption, full: true })
  }

  /**
   * Downloads this caption's track.
   * Must be using an access token with correct scopes.
   * @param format The file format to download the track in.
   * @param language The language to download the track in.
   */
  /* istanbul ignore next */
  public download (format?: 'sbv' | 'scc' | 'srt' | 'ttml' | 'vtt', language?: string) {
    return this.youtube.oauth.downloadCaption(this.id, format, language)
  }

  /**
   * Deletes the caption.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public delete () {
    return this.youtube.oauth.deleteCaption(this.id)
  }
}
