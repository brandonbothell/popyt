/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test;
   They are instead manually tested. */

/**
 * @module OAuth
 */

import * as Part from '../types/Parts'
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
   * Gets the authorized user's uploads.  
   * These are **partial [Video](./Library_Exports.Video) objects**,
   * meaning they are missing some data. See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
   * Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to
   * fetch the full objects while not spamming your quota like you would using a loop.  
   * Last tested NEVER
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the videos to fetch.
   */
  public async getMyUploads (pageOptions: YT.PageOptions, parts?: Part.PlaylistItemParts) {
    const channel = await this.getMe()
    if (!channel.data.contentDetails) await channel.fetch([ 'contentDetails' ])

    return this.youtube.getPlaylistItems(
      channel.data.contentDetails.relatedPlaylists?.uploads as string,
      pageOptions, parts)
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
}

export default OAuth
