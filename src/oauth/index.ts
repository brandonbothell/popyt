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

export * from './videos'
export * from './playlists'
export * from './comments'
export * from './channels'
export * from './captions'

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
   */
  public getMe (parts?: Part.ChannelParts): Promise<YT.Channel> {
    this.checkTokenAndThrow()
    return this.youtube._genericService.getItem(YT.Channel, { mine: true }, parts)
  }

  /**
   * Gets the authorized user's uploads.  
   * These are **partial [Video](./Library_Exports.Video) objects**,
   * meaning they are missing some data. See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
   * Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to
   * fetch the full objects while not spamming your quota like you would using a loop.  
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the videos to fetch.
   */
  public async getMyUploads (pageOptions?: YT.PageOptions, parts?: Part.PlaylistItemParts) {
    const channel = await this.getMe()
    if (!channel.data.contentDetails) await channel.fetch([ 'contentDetails' ])

    return this.youtube.getPlaylistItems(
      channel.data.contentDetails.relatedPlaylists?.uploads as string,
      pageOptions, parts)
  }

  /**
   * Gets the authorized user's [Subscription](./Library_Exports.Subscription#)s.  
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public getMySubscriptions (pageOptions?: YT.PageOptions, parts?: Part.SubscriptionParts) {
    this.checkTokenAndThrow()

    return this.youtube._genericService.getPaginatedItems<YT.Subscription>(
      { type: YT.PaginatedItemType.Subscriptions, mine: true, parts, ...pageOptions },
      { accessToken: true }
    )
  }

  /**
   * Gets the authorized user's [Playlist](./Library_Exports.Playlist#)s.  
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public getMyPlaylists (pageOptions?: YT.PageOptions, parts?: Part.PlaylistParts) {
    this.checkTokenAndThrow()

    return this.youtube._genericService.getPaginatedItems<YT.Playlist>(
      { type: YT.PaginatedItemType.Playlists, mine: true, parts, ...pageOptions },
      { accessToken: true }
    )
  }

  /**
   * Gets the authorized user's [ChannelSection](./Library_Exports.ChannelSection)s.  
   */
  public async getMyChannelSections (parts?: Part.ChannelSectionParts) {
    this.checkTokenAndThrow()

    return (await this.youtube._genericService.getPaginatedItems<YT.ChannelSection>(
      { type: YT.PaginatedItemType.ChannelSections, mine: true, parts },
      { accessToken: true }
    )).items
  }
}

export default OAuth
