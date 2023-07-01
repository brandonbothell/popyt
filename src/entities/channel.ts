import { ChannelParts, ChannelSectionParts, PlaylistParts, SubscriptionParts } from '../types/Parts'
import { YouTube, Playlist, Thumbnail, Subscription, ChannelSection, ChannelBrandingSettings, PageOptions, PaginatedResponse, Image } from '..'

/**
 * A YouTube channel.
 */
export class Channel {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'channels'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet,contentDetails,statistics,status,brandingSettings'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,' +
    'contentDetails(relatedPlaylists(uploads)),' +
    'statistics(subscriberCount,viewCount,hiddenSubscriberCount),' +
    'snippet(title,description,thumbnails,publishedAt,country,defaultLanguage),' +
    'brandingSettings(image,channel(keywords,featuredChannelsUrls)),' +
    'status(isLinked,madeForKids,selfDeclaredMadeForKids))'

  /**
   * The YouTube object that created this channel object.
   */
  public youtube: YouTube

  /**
   * Whether or not this a full channel object.
   */
  public full: boolean

  /**
   * The raw data of this channel.
   */
  public data: any

  /**
   * The name of this channel.
   */
  public name: string

  /**
   * The description of this channel.
   */
  public about: string

  /**
   * The ID of this channel.
   */
  public id: string

  /**
   * The country this channel is based in.
   */
  public country: string

  /**
   * The url of the channel.
   */
  public url: string

  /**
   * This channel's custom URL, if they have one.
   */
  public customUrl: string

  /**
   * This channel's profile pictures.
   */
  public profilePictures: {
    default?: Thumbnail
    high?: Thumbnail
    maxres?: Thumbnail
    medium?: Thumbnail
    standard?: Thumbnail
  }

  /**
   * The date this channel was created.
   */
  public dateCreated: Date

  /**
   * The default language for this channel's uploads.
   */
  public language: string

  /**
   * This channel's view count.
   */
  public views: number

  /**
   * This channel's keywords.
   */
  public keywords: string[]

  /**
   * The channel's uploads. Only available after calling [Channel.fetchVideos](./Library_Exports.Channel#fetchVideos)
   */
  public videos: Playlist

  /**
   * The number of subscribers this channel has. `-1` if the subcount is hidden.
   */
  public subCount: number

  /**
   * The URLs of all of this channel's featured channels. This property is broken for some channels.
   */
  public featuredChannels: string[]

  /**
   * The channel's playlists. Only defined when [Channel.fetchPlaylists](./Library_Exports.Channel#fetchPlaylists) is called.
   */
  public playlists: PaginatedResponse<Playlist>

  /**
   * The channel's subscriptions. Only defined when [Channel.fetchSubscriptions](./Library_Exports.Channel#fetchSubscriptions) is called.
   */
  public subscriptions: PaginatedResponse<Subscription>

  /**
   * The channel's sections. Only defined when [Channel.fetchSections](./Library_Exports.Channel#fetchSections) is called.
   */
  public sections: ChannelSection[]

  /**
   * Only set if the channel is a search result.
   *
   * If the channel has an ongoing livestream, this is `live`.
   * If the channel has an upcoming livestream, this is `upcoming`.
   * If the channel has neither an ongoing nor upcoming livestream, this is `false`.
   */
  public liveStatus: 'live' | 'upcoming' | false

  /**
   * Properties to do with videos made for children.
   */
  public kids: {
    /**
     * Whether or not the channel is made for children.
     */
    madeForKids: boolean

    /**
     * Whether or not the owner of the channel marked it as made for kids.
     */
    selfDeclaredMadeForKids: boolean
  }

  constructor (youtube: YouTube, data: any, full = false) {
    this.youtube = youtube
    this.data = data
    this.full = full

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    const channel = data

    if (data.kind === 'youtube#channel') {

      this.id = channel.id

      if (channel.snippet) {
        this.country = channel.snippet.country
        this.language = channel.snippet.defaultLanguage
      }

      if (channel.statistics) {
        this.views = Number(channel.statistics.viewCount)

        if (!channel.statistics.hiddenSubscriberCount) {
          this.subCount = Number(channel.statistics.subscriberCount)
        } else {
          this.subCount = -1
        }
      }

      if (channel.status) {
        this.kids = {
          madeForKids: channel.status.madeForKids,
          selfDeclaredMadeForKids: channel.status.selfDeclaredMadeForKids
        }
      }

      if (channel.brandingSettings) {
        // Unknown behavior
        if (channel.brandingSettings.channel) {
          this.keywords = []

          if (channel.brandingSettings.channel.keywords) {
            // Split by spaces but keep quotations intact
            const broken: string[] = channel.brandingSettings.channel.keywords.split(/( )(?=(?:[^"]*"[^"]*")*[^"]*$)/i)

            for (let i = 0; i < broken.length; i++) {
              if (i % 2 === 0) {
                this.keywords.push(broken[i].replace(/(^"|"$)/gi, ''))
              }
            }
          }

          // Broken for many channels
          this.featuredChannels = channel.brandingSettings.channel.featuredChannelsUrls ?
            channel.brandingSettings.channel.featuredChannelsUrls.map(id => `https://www.youtube.com/channel/${id}`) : []
        }
      }
    } else if (channel.kind === 'youtube#searchResult') {
      this.id = channel.id?.channelId ?? channel.snippet?.channelId

      if (channel.snippet) {
        // Impossible to test
        this.liveStatus = channel.snippet.liveBroadcastContent !== 'none' ? channel.snippet.liveBroadcastContent : false
      }
    } else {
      throw new Error(`Invalid channel type: ${channel.kind}`)
    }

    if (channel.snippet) {
      this.profilePictures = channel.snippet.thumbnails
      this.dateCreated = new Date(channel.snippet.publishedAt)
      this.name = channel.snippet.title
      this.about = channel.snippet.description
    }

    this.url = `https://youtube.com/channel/${this.id}`
  }

  /**
   * Fetches this channel from the API and reassigns this object to the new channel object.
   * Only useful if `this.full` is false, or if you want updated channel info.
   */
  public async fetch (parts?: ChannelParts) {
    const channel = await this.youtube.getChannel(this.id, parts)
    return Object.assign(this, channel)
  }

  /**
   * Fetches the channel's playlist of uploads from the API and assigns it to the [Channel.videos](./Library_Exports.Channel#videos) property.
   */
  public async fetchVideos (parts?: PlaylistParts) {
    if (!(this.data.contentDetails)) {
      await this.fetch([ 'contentDetails' ])
    }

    const videos = await this.youtube.getPlaylist(this.data.contentDetails.relatedPlaylists?.uploads as string, parts)
    this.videos = videos

    return this.videos
  }

  /**
   * Fetches the channel's playlists from the API and assigns them to [Channel.playlists](./Library_Exports.Channel#playlists).
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the object to fetch (saves quota if you aren't using certain properties!)
   */
  public async fetchPlaylists (pageOptions?: PageOptions, parts?: PlaylistParts) {
    this.playlists = await this.youtube.getChannelPlaylists(this.id, pageOptions, parts)
    return this.playlists
  }

  /**
   * Fetches the channel's subscriptions from the API and assigns them to [Channel.subscriptions](./Library_Exports.Channel#subscriptions).
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the object to fetch (saves quota if you aren't using certain properties!)
   */
  public async fetchSubscriptions (pageOptions?: PageOptions, parts?: SubscriptionParts) {
    this.subscriptions = await this.youtube.getChannelSubscriptions(this.id, pageOptions, parts)
    return this.subscriptions
  }

  /**
   * Fetches the channel's sections from the API and assigns them to [Channel.sections](./Library_Exports.Channel#sections).
   */
  public async fetchSections (parts?: ChannelSectionParts) {
    this.sections = await this.youtube.getChannelSections(this.id, parts)
    return this.sections
  }

  /**
   * Subscribes to the channel.
   * Must be using an access token with correct scopes.
   */
  public subscribe () {
    return this.youtube.oauth.subscribeToChannel(this.id)
  }

  /**
   * Unsubscribes from the channel.
   * Must be using an access token with correct scopes.
   */
  public unsubscribe () {
    return this.youtube.oauth.unsubscribeFromChannel(this.id)
  }

  /**
   * Updates the channel's branding settings.
   * Must be using an access token with correct scopes.
   */
  public updateBranding (branding: ChannelBrandingSettings) {
    return this.youtube.oauth.channels.updateChannelBranding(this.id, branding)
  }

  /**
   * Updates the channel's localizations.
   * Must be using an access token with correct scopes.
   */
  public updateLocalizations (localizations: { [key: string]: { title: string; description: string } }) {
    return this.youtube.oauth.channels.updateChannelLocalizations(
      this.id, localizations)
  }

  /**
   * Sets whether or not the channel is made for kids.
   * Must be using an access token with correct scopes.
   */
  public setMadeForKids (madeForKids: boolean) {
    return this.youtube.oauth.channels.setChannelMadeForKids(this.id, madeForKids)
  }

  /**
   * Sets the channel's watermark.
   * Must be using an access token with correct scopes.
   */
  public setWatermark (type: 'fromStart' | 'fromEnd', offset: number, duration: number, image: Image) {
    return this.youtube.oauth.channels.setChannelWatermark(
      this.id, type, offset, duration, image)
  }

  /**
   * Unsets the channel's watermark.
   * Must be using an access token with correct scopes.
   */
  public unsetWatermark () {
    return this.youtube.oauth.channels.unsetChannelWatermark(this.id)
  }

  /**
   * Uploads and sets the channel's banner.
   * Must be using an access token with correct scopes.
   */
  public async setBanner (image: { data: Buffer; type: 'png' | 'jpeg' }) {
    if (!this.data.brandingSettings) {
      await this.fetch()
    }

    if (!this.data.brandingSettings) {
      return Promise.reject(new Error('Unable to fetch channel branding settings'))
    }

    if (!this.data.brandingSettings.image) {
      this.data.brandingSettings.image = {}
    }

    this.data.brandingSettings.image.bannerExternalUrl =
      await this.youtube.oauth.channels.uploadChannelBanner(image)
    return this.youtube.oauth.channels.updateChannelBranding(
      this.id, this.data.brandingSettings)
  }
}
