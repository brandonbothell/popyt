/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test;
   They are instead manually tested. */

/**
 * @module OAuth
 */

import * as Part from '../types/Parts'
import * as Data from '../constants'
import YouTube, * as YT from '..'
import { OAuthVideos } from './videos'
import { OAuthPlaylists } from './playlists'
import { OAuthComments } from './comments'
import { OAuthChannels } from './channels'
import { OAuthCaptions } from './captions'

/**
 * All methods requiring an OAuth access token.
 * Use `YouTube.oauth` to access these methods.
 */
export class OAuth {
  public youtube: YouTube

  /**
   * All OAuth methods related to [comments](./Library_Exports.Comment).
   */
  public comments = new OAuthComments(this)

  /**
   * All OAuth methods related to [videos](./Library_Exports.Video)/video ratings.
   */
  public videos = new OAuthVideos(this)

  /**
   * All OAuth methods related to
   * [playlists](./Library_Exports.Playlist)/playlist items.
   */
  public playlists = new OAuthPlaylists(this)

  /**
   * All OAuth methods related to [channels](./Library_Exports.Channel).
   */
  public channels = new OAuthChannels(this)

  /**
   * All OAuth methods related to [captions](./Library_Exports.Caption).
   */
  public captions = new OAuthCaptions(this)

  /**
   * 
   * @param youtube The [YouTube](./Library_Exports.YouTube) object to retrieve the token from.
   */
  constructor (youtube: YouTube) {
    this.youtube = youtube
  }

  /**
   * @ignore
   */
  public checkTokenAndThrow () {
    if (!this.youtube.hasAccessToken()) {
      throw new Error('Must have an access token for OAuth related methods')
    }
  }

  /**
   * Gets the authorized user's [Channel](./Library_Exports.Channel#).  
   * Last tested 05/18/2020 11:48. PASSING
   */
  public getMe (parts?: Part.ChannelParts): Promise<YT.Channel> {
    this.checkTokenAndThrow()
    return this.youtube._genericService.getItem(YT.Channel, true, null, parts) as Promise<YT.Channel>
  }

  /**
   * Gets the authorized user's [Subscription](./Library_Exports.Subscription#)s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxPerPage The maximum number of subscriptions to fetch per page.
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public async getMySubscriptions (maxPerPage?: number, parts?: Part.SubscriptionParts): Promise<YT.Subscription[]> {
    this.checkTokenAndThrow()

    const results = await this.youtube._genericService.getPaginatedItems({ type: YT.PaginatedItemType.Subscriptions, mine: true, maxPerPage, parts })
    return results.items as YT.Subscription[]
  }

  /**
   * Gets the authorized user's [Playlist](./Library_Exports.Playlist#)s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxPerPage The maximum number of playlists to fetch per page.
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public async getMyPlaylists (maxPerPage?: number, parts?: Part.PlaylistParts): Promise<YT.Playlist[]> {
    this.checkTokenAndThrow()

    const result = await this.youtube._genericService.getPaginatedItems({ type: YT.PaginatedItemType.Playlists, mine: true, maxPerPage, parts })
    return result.items as YT.Playlist[]
  }

  /**
   * Subscribe to a [Channel](./Library_Exports.Channel#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param channelResolvable The channel to subscribe to.
   * @returns A partial subscription object.
   */
  public async subscribeToChannel (channelResolvable: YT.ChannelResolvable): Promise<YT.Subscription> {
    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.SUBSCRIPTION_DATA = JSON.parse(JSON.stringify(Data.SUBSCRIPTION_DATA))

    data.snippet.resourceId.channelId = typeof channel === 'string' ? channel : channel.id

    const result = await this.youtube._request.post('subscriptions', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Subscription(this.youtube, result)
  }

  /**
   * Unsubscribe from a [Channel](./Library_Exports.Channel#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param channelId The channel to unsubscribe from.
   */
  public unsubscribeFromChannel (subscriptionId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('subscriptions', {
      params: { id: subscriptionId },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Gets a list of [VideoAbuseReportReason](./Library_Exports.VideoAbuseReportReason#)s.
   * Last tested 05/18/2020 11:48. PASSING
   */
  public async getVideoAbuseReportReasons () {
    this.checkTokenAndThrow()
    return (await this.youtube._genericService.getPaginatedItems({ type: YT.PaginatedItemType.VideoAbuseReportReasons })).items as YT.VideoAbuseReportReason[]
  }
}

export default OAuth
