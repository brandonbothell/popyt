import { ChannelParts, ChannelSectionParts, PlaylistParts, SubscriptionParts } from '../types/Parts'
import { YouTube, Playlist, Channel, ChannelSectionType, PageOptions, PaginatedResponse, Subscription } from '..'
import { youtube_v3 } from '@googleapis/youtube'

/**
 * A YouTube [Channel](./Library_Exports.Channel#) section.
 */
export class ChannelSection {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'channelSections'

  /**
   * The parts to request for this entity.
   */
  public static part = 'contentDetails,snippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,contentDetails,snippet)'

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
   * The name of this channel section.
   */
  public name: string

  /**
   * The type of this channel section.
   */
  public type: Lowercase<ChannelSectionType>

  /**
   * The ID of the channel that created this channel section.
   */
  public channelId: string

  /**
   * The zero-based position of this channel section on the channel page.
   */
  public position: number

  /**
   * The IDs of the playlists in this channel section. Undefined if there aren't any.
   */
  public playlistIds?: string[]

  /**
   * The IDs of the channels in this channel section. Undefined if there aren't any.
   */
  public channelIds?: string[]

  /**
   * The playlists in the channel section. Only available after calling [ChannelSection.fetchPlaylists](./Library_Exports.ChannelSection#fetchPlaylists).
   */
  public playlists?: Playlist[]

  /**
   * The channels in the channel section. Only available after calling [ChannelSection.fetchChannels](./Library_Exports.ChannelSection#fetchChannels).
   */
  public channels?: Channel[]

  /**
   * The subscriptions in the channel section.  
   * Only valid if `ChannelSection.type` is `subscriptions`.
   * Only available after calling [ChannelSection.fetchChannels()](./Library_Exports.ChannelSection#fetchChannels).
   */
  public subscriptions?: PaginatedResponse<Subscription>

  /**
   * The ID of this channel section.
   */
  public id: string

  constructor (youtube: YouTube, data: youtube_v3.Schema$ChannelSection, full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: youtube_v3.Schema$ChannelSection) {
    if (data.kind !== 'youtube#channelSection') {
      throw new Error(`Invalid channel section type: ${data.kind}`)
    }

    const section = data

    this.id = section.id

    if (section.snippet) {
      this.type = section.snippet.type.toLowerCase() as ChannelSection['type']
      this.channelId = section.snippet.channelId
      this.name = section.snippet.title
      this.position = section.snippet.position
    }

    if (section.contentDetails?.playlists) this.playlistIds = section.contentDetails.playlists
    if (section.contentDetails?.channels) this.channelIds = section.contentDetails.channels
  }

  /**
   * Fetches this channel section from the API and reassigns this object to the new channel section object.
   * Only useful if `this.full` is false, or if you want updated channel section info.
   */
  public async fetch (parts?: ChannelSectionParts) {
    const section = await this.youtube.getChannelSection(this.id, parts)
    return Object.assign(this, section)
  }

  /**
   * Fetches the channel section's playlists from the API and assigns them to the [ChannelSection.playlists](./Library_Exports.ChannelSection#playlists) property.
   */
  public async fetchPlaylists (pageOptions?: PageOptions, parts?: PlaylistParts) {
    if (this.type === 'allplaylists') {
      this.playlists = (await this.youtube.getChannelPlaylists(this.channelId, pageOptions, parts)).items
      return this.playlists
    }

    if (!this.playlistIds) {
      return
    }

    this.playlists = await this.youtube.getPlaylist(this.playlistIds, parts)
    return this.playlists
  }

  /**
   * Fetches the channel section's channels from the API and assigns them to the [ChannelSection.channels](./Library_Exports.ChannelSection#channels) property.
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

  public async fetchSubscriptions (pageOptions?: PageOptions, parts?: SubscriptionParts) {
    if (this.type !== 'subscriptions') {
      return
    }

    this.subscriptions = await this.youtube.getChannelSubscriptions(this.channelId, pageOptions, parts)
    return this.subscriptions
  }
}
