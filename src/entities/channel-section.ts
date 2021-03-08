import { YouTube, Playlist, Channel, ChannelSectionType } from '..'
import { ChannelParts, ChannelSectionParts, PlaylistParts } from '../types/Parts'

/**
 * A YouTube [[Channel]] section.
 */
export class ChannelSection {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'channelSections'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet,contentDetails,localizations,targeting'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,contentDetails,localizations,snippet,targeting)'

  /**
   * The YouTube object that created this channel section object.
   */
  public youtube: YouTube

  /**
   * Whether or not this a full channel section object.
   */
  public full: boolean

  /**
   * The raw data of this channel section.
   */
  public data: any

  /**
   * The name of this channel section.
   */
  public name: string

  /**
   * The type of this channel section.
   */
  public type: ChannelSectionType

  /**
   * The style of this channel section.
   */
  public style: 'horizontalRow' | 'verticalList'

  /**
   * The ID of the channel that created this channel section.
   */
  public channelId: string

  /**
   * The zero-based position of this channel section on the channel page.
   */
  public position: number

  /**
   * The language of the title of this channel section.
   */
  public language: string

  /**
   * The localized name of this channel section if the `hl` parameter was used when fetching it.
   */
  public localizedName: string

  /**
   * The IDs of the playlists in this channel section. Undefined if there aren't any.
   */
  public playlistIds?: string[]

  /**
   * The IDs of the channels in this channel section. Undefined if there aren't any.
   */
  public channelIds?: string[]

  /**
   * The localizations of the channel section.
   */
  public localizations?: {
    /**
     * The language of the localized title. A [BCP-47](http://www.rfc-editor.org/rfc/bcp/bcp47.txt) language code.
     */
    [key: string]: {
      /**
       * The localized title.
       */
      title: string
    }
  }

  /**
   * The targeting settings of the channel section.
   */
  public targeting?: {
    /**
     * The languages for which the channel section is visible.
     */
    languages: string[]

    /**
     * The regions where the channel section is visible.
     */
    regions: string[]

    /**
     * The countries where the channel section is visible.
     */
    countries: string[]
  }

  /**
   * The playlists in the channel section. Only available after calling [[ChannelSection#fetchPlaylists]].
   */
  public playlists?: Playlist[]

  /**
   * The channels in the channel section. Only available after calling [[ChannelSection#fetchChannels]].
   */
  public channels?: Channel[]

  /**
   * The ID of this channel section.
   */
  public id: string

  constructor (youtube: YouTube, data: any) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind !== 'youtube#channelSection') {
      throw new Error(`Invalid channel section type: ${data.kind}`)
    }

    const section = data

    this.id = section.id

    /* istanbul ignore next */
    if (section.snippet) {
      this.type = section.snippet.type
      this.channelId = section.snippet.channelId
      this.name = section.snippet.title
      this.position = section.snippet.position
      this.language = section.snippet.defaultLanguage
      this.style = section.snippet.style
      /* istanbul ignore next */
      this.localizedName = section.snippet.localized ? section.snippet.localized.title : undefined
    } else {
      this.full = false
    }

    /* istanbul ignore next */
    if (section.contentDetails) {
      this.playlistIds = section.contentDetails.playlists
      this.channelIds = section.contentDetails.channels
    } else {
      this.full = false
    }

    /* istanbul ignore next */
    if (section.localizations) {
      this.localizations = section.localizations
    } else {
      this.full = false
    }

    /* istanbul ignore next */
    if (section.targeting) {
      this.targeting = section.targeting
    } else {
      this.full = false
    }
  }

  /**
   * Fetches this channel section and reassigns this object to the new channel section object.
   * Only useful if `this.full` is false, or if you want updated channel section info.
   */
  public async fetch (parts?: ChannelSectionParts) {
    const section = await this.youtube.getChannelSection(this.id, parts)
    return Object.assign(this, section)
  }

  /**
   * Fetches the channel section's playlists and assigns them to the [[ChannelSection#playlists]] property.
   */
  public async fetchPlaylists (parts?: PlaylistParts) {
    if (!this.playlistIds) {
      return
    }

    const playlists = []

    for (let i = 0; i < this.playlistIds.length; i++) {
      playlists.push(await this.youtube.getPlaylist(this.playlistIds[i], parts))
    }

    this.playlists = playlists
    return this.playlists
  }

  /**
   * Fetches the channel section's channels and assigns them to the [[ChannelSection#channels]] property.
   */
  public async fetchChannels (parts?: ChannelParts) {
    if (!this.channelIds) {
      return
    }

    const channels = []

    for (let i = 0; i < this.channelIds.length; i++) {
      channels.push(await this.youtube.getChannel(this.channelIds[i], parts))
    }

    this.channels = channels
    return this.channels
  }
}
