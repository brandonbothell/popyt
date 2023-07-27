/**
 * @module OAuth
 */

import { ResolutionService } from '../services'
import OAuth from '../oauth'
import * as Data from '../constants'
import * as YT from '..'

export class OAuthChannels {
  constructor (public oauth: OAuth) {}

  /**
   * Updates a channel's branding settings.
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * @param channelResolvable The channel to update the branding settings of.
   * @param brandingSettings The new branding settings.
   */
  public async updateChannelBranding (channelResolvable: YT.ChannelResolvable, brandingSettings: YT.ChannelBrandingSettings): Promise<YT.Channel> {
    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.CHANNEL_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_DATA))

    data.id = ResolutionService.toId(channel)
    data.brandingSettings = brandingSettings

    const response = await this.oauth.youtube._request.put('channels', {
      params: { part: 'brandingSettings' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Channel(this.oauth.youtube, response)
  }

  /**
   * Updates a channel's localizations.
   * **CURRENTLY BROKEN in the API**
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * @param channelResolvable The channel to update the localizations of.
   * @param localizations The new localizations.
   */
  public async updateChannelLocalizations (channelResolvable: YT.ChannelResolvable,
    localizations: { [key: string]: { title: string; description: string } }): Promise<YT.Channel> {

    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.CHANNEL_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_DATA))

    data.id = ResolutionService.toId(channel)
    data.localizations = localizations

    const response = await this.oauth.youtube._request.put('channels', {
      params: { part: 'localizations' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Channel(this.oauth.youtube, response)
  }

  /**
   * Sets a channel as made for kids or not made for kids.  
   * @param channelResolvable The channel to update.
   * @param madeForKids Whether or not the channel is made for kids.
   */
  public async setChannelMadeForKids (channelResolvable: YT.ChannelResolvable, madeForKids: boolean): Promise<YT.Channel> {
    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.CHANNEL_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_DATA))

    data.id = ResolutionService.toId(channel)
    data.status = {
      selfDeclaredMadeForKids: madeForKids
    }

    const response = await this.oauth.youtube._request.put('channels', {
      params: { part: 'status' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Channel(this.oauth.youtube, response)
  }

  /**
   * Sets a channel's watermark.  
   * @param channelResolvable The channel to set the watermark for.
   * @param type The timing type of the watermark.
   * @param offset The offset, in milliseconds, from the start/end of the video to display the watermark from.
   * @param duration The duration, in millseconds, to display the watermark for.
   * @param image The watermark image.
   */
  public async setChannelWatermark (channelResolvable: YT.ChannelResolvable, type: 'fromStart' | 'fromEnd',
    offset: number, duration: number, image: YT.Image): Promise<void> {

    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.WATERMARK_DATA = JSON.parse(JSON.stringify(Data.WATERMARK_DATA))

    data.timing = {
      type: type === 'fromStart' ? 'offsetFromStart' : 'offsetFromEnd',
      offsetMs: offset,
      durationMs: duration
    }

    return this.oauth.youtube._upload.multipartImagePost('watermarks/set', {
      authorizationOptions: { accessToken: true },
      params: { channelId: ResolutionService.toId(channel) },
      parts: [
        { data: JSON.stringify(data) },
        { data: image.data, contentType: image.type }
      ]
    })
  }

  /**
   * Unsets a channel's watermark.  
   * @param channelResolvable The channel to unset the watermark from.
   */
  public async unsetChannelWatermark (channelResolvable: YT.ChannelResolvable): Promise<void> {
    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    return this.oauth.youtube._request.post('watermarks/unset', {
      params: { channelId: ResolutionService.toId(channel) },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Uploads a channel banner.  
   * @param image The channel banner to upload.
   * @returns The URL of the uploaded banner, used as
   * [`BrandingSettings.image.bannerExternalUrl`](../modules/Library_Exports#channelbrandingsettings)
   * in [`OAuth.updateChannelBranding()`](#updatechannelbranding)
   */
  public async uploadChannelBanner (image: YT.Image): Promise<string> {
    this.oauth.checkTokenAndThrow()

    const response = await this.oauth.youtube._upload.imagePost('channelBanners/insert', {
      authorizationOptions: { accessToken: true },
      image
    })
    return response.url
  }

  /**
   * Adds a [ChannelSection](./Library_Exports.ChannelSection#) to the authorized user's [Channel](./Library_Exports.Channel#).  
   * @param type The type of channel section.
   * @param name The name of the channel section.
   * @param position The position of the channel section on the channel homepage.
   * @param playlistsResolvable Any playlists in the channel section.
   * @param channelsResolvable Any channels in the channel section.
   */
  public async addChannelSection (type: YT.ChannelSectionType, name?: string, position?: number, playlistsResolvable?: YT.PlaylistResolvable[],
    channelsResolvable?: (YT.ChannelResolvable)[]): Promise<YT.ChannelSection> {
    this.oauth.checkTokenAndThrow()

    const resolvedPlaylists =
      playlistsResolvable ? await Promise.all(playlistsResolvable.map(v => this.oauth.youtube._services.resolution.resolve(v, YT.Playlist))) : undefined
    const resolvedChannels =
      channelsResolvable? await Promise.all(channelsResolvable.map(v => this.oauth.youtube._services.resolution.resolve(v, YT.Channel))) : undefined

    const data: typeof Data.CHANNEL_SECTION_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_SECTION_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.snippet.type = type

    if (name) data.snippet.title = name
    if (position != null) data.snippet.position = position
    if (playlistsResolvable || channelsResolvable) data.contentDetails = {}
    if (resolvedPlaylists) data.contentDetails.playlists = resolvedPlaylists.map(resolution => ResolutionService.toId(resolution))
    if (resolvedChannels) data.contentDetails.channels = resolvedChannels.map(resolution => ResolutionService.toId(resolution))

    if (resolvedPlaylists || resolvedChannels) parts.push('contentDetails')

    const response = await this.oauth.youtube._request.post('channelSections', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })

    if (response.kind !== 'youtube#channelSection') {
      return Promise.reject(new Error('Failed to create channel section'))
    }

    // For some reason the response is just the first channel section
    // C'mon, YouTube
    const channelSections = await this.oauth.getMyChannelSections()
    return channelSections.find(position == null ?
      section => section.position === channelSections.length - 1 : // Highest position
      section => section.position === position) // Matching position
  }

  /**
   * Updates a [ChannelSection](./Library_Exports.ChannelSection#).
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * @param id The ID of the channel section.
   * @param type The type of channel section.
   * @param style The style of the channel section.
   * @param name The name of the channel section.
   * @param position The position of the channel section on the channel homepage.
   * @param language The default language of the channel section.
   * @param playlistsResolvable Any playlists in the channel section.
   * @param channelsResolvable Any channels in the channel section.
   * @param localizations Translations of the channel section's title.
   * @param targeting Targeting data for the channel section.
   */
  public async updateChannelSection (id: string, type: YT.ChannelSectionType, name?: string, position?: number, playlistsResolvable?: YT.PlaylistResolvable[],
    channelsResolvable?: (YT.ChannelResolvable)[]): Promise<YT.ChannelSection> {
    this.oauth.checkTokenAndThrow()

    const resolvedPlaylists =
      playlistsResolvable ? await Promise.all(playlistsResolvable.map(v => this.oauth.youtube._services.resolution.resolve(v, YT.Playlist))) : undefined
    const resolvedChannels =
      channelsResolvable? await Promise.all(channelsResolvable.map(v => this.oauth.youtube._services.resolution.resolve(v, YT.Channel))) : undefined

    const data: typeof Data.CHANNEL_SECTION_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_SECTION_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.id = id
    data.snippet.type = type

    if (name) data.snippet.title = name
    if (position) data.snippet.position = position
    if (playlistsResolvable || channelsResolvable) data.contentDetails = {}
    if (resolvedPlaylists) data.contentDetails.playlists = resolvedPlaylists.map(resolution => ResolutionService.toId(resolution))
    if (resolvedChannels) data.contentDetails.channels = resolvedChannels.map(resolution => ResolutionService.toId(resolution))

    if (resolvedPlaylists || resolvedChannels) parts.push('contentDetails')

    const response = await this.oauth.youtube._request.put('channelSections', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.ChannelSection(this.oauth.youtube, response)
  }

  /**
   * Deletes a [ChannelSection](./Library_Exports.ChannelSection#).
   * @param id The ID of the channel section.
   */
  public deleteChannelSection (id: string): Promise<YT.ChannelSection> {
    this.oauth.checkTokenAndThrow()
    return this.oauth.youtube._request.delete('channelSections', {
      params: { id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Subscribe to a [Channel](./Library_Exports.Channel#).  
   * @param channelResolvable The channel to subscribe to.
   * @returns A partial subscription object.
   */
  public async subscribeToChannel (channelResolvable: YT.ChannelResolvable): Promise<YT.Subscription> {
    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.SUBSCRIPTION_DATA = JSON.parse(JSON.stringify(Data.SUBSCRIPTION_DATA))

    data.snippet.resourceId.channelId = ResolutionService.toId(channel)

    const result = await this.oauth.youtube._request.post('subscriptions', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Subscription(this.oauth.youtube, result)
  }

  /**
   * Unsubscribe from a [Channel](./Library_Exports.Channel#).  
   * @param channelId The channel to unsubscribe from.
   */
  public unsubscribeFromChannel (subscriptionId: string): Promise<void> {
    this.oauth.checkTokenAndThrow()
    return this.oauth.youtube._request.delete('subscriptions', {
      params: { id: subscriptionId },
      authorizationOptions: { accessToken: true }
    })
  }
}
