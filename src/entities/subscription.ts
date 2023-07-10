import { ChannelParts, SubscriptionParts } from '../types/Parts'
import { Thumbnail } from '../types'
import YouTube from '..'

/**
 * A YouTube subscription.
 */
export class Subscription {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'subscriptions'

  /**
   * The parts to request for this entity.
   */
  public static part = 'contentDetails,snippet,subscriberSnippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,' +
    'snippet(publishedAt,title,channelTitle,description,resourceId(channelId),channelId,thumbnails),' +
    'contentDetails(newItemCount,totalItemCount,activityType),' +
    'subscriberSnippet(title,description,thumbnails))'

  /**
   * The YouTube object that created this subscription object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full subscription object.
   */
  public full = true

  /**
   * The raw data of this subscription.
   */
  public data: any

  /**
   * The ID of this subscription.
   */
  public id: string

  /**
   * The date that the user subscribed to the channel on.
   */
  public dateSubscribed: Date

  /**
   * Information on the [Channel](./Library_Exports.Channel#) that the user subscribed to.
   */
  public channel: {
    /**
     * The ID of the channel.
     */
    id: string

    /**
     * The name of the channel.
     */
    name: string
  }

  /**
   * The title of the subscription.
   */
  public title: string

  /**
   * The details of the subscription.
   */
  public description: string

  /**
   * Information on the user that subscribed to the channel.  
   * **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600
   */
  public subscriber: {
    /**
     * The user's ID.
     */
    id: string

    /**
     * The user's username.
     */
    name?: string

    /**
     * The user's description.
     */
    description?: string

    /**
     * Thumbnail images for the user's channel.
     */
    thumbnails?: {
      default: Thumbnail
      medium: Thumbnail
      high: Thumbnail
    }
  }

  /**
   * Thumbnail images for the subscription.
   */
  public thumbnails: {
    default: Thumbnail
    medium: Thumbnail
    high: Thumbnail
  }

  /**
   * Statistics on the items that the subscription points to.  
   * **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600
   */
  public items: {
    /**
     * The number of new items in the subscription.
     */
    new: number

    /**
     * The total number of items that the subscription points to.
     */
    total: number
  }

  /**
   * The activities that the user has subscribed to.  
   * **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600
   */
  public activities: 'all' | 'uploads'

  constructor (youtube: YouTube, data: any, full = true) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    if (data.kind !== 'youtube#subscription') {
      throw new Error(`Invalid subscription type: ${data.kind}`)
    }

    const subscription = data

    this.id = subscription.id

    if (subscription.snippet) {
      this.dateSubscribed = new Date(subscription.snippet.publishedAt)
      this.channel = {
        name: subscription.snippet.channelTitle || subscription.snippet.title,
        id: subscription.snippet.resourceId?.channelId
      }
      this.title = subscription.snippet.title
      this.description = subscription.snippet.description
      this.subscriber = { id: subscription.snippet.channelId }
      this.thumbnails = subscription.snippet.thumbnails
    }

    /* **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600 */
    if (subscription.contentDetails) {
      this.items = {
        new: subscription.contentDetails.newItemCount,
        total: subscription.contentDetails.totalItemCount
      }
      this.activities = subscription.contentDetails.activityType
    }

    /* **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600 */
    if (subscription.subscriberSnippet) {
      if (!this.subscriber) this.subscriber = { id: subscription.subscriberSnippet.channelId }
      this.subscriber.name = subscription.subscriberSnippet.title
      this.subscriber.description = subscription.subscriberSnippet.description
      this.subscriber.thumbnails = subscription.subscriberSnippet.thumbnails
    }
  }

  /**
   * Fetches this subscription from the API and reassigns this object to the new subscription object.
   * Only useful if `this.full` is false, or if you want updated subscription info.  
   * **CURRENTLY NOT WORKING** unless the subscriber and channel properties are populated, see https://issuetracker.google.com/issues/288609601
   */
  public async fetch (parts?: SubscriptionParts) {
    let subscription = await this.youtube.getSubscription(this.id, parts).catch((e: Error) => e.message)

    if (typeof subscription === 'string') {
      if (this.subscriber && this.channel) subscription = await this.youtube.getSubscriptionByChannels(this.subscriber.id, this.channel.id, parts)
      else return undefined
    }

    return Object.assign(this, subscription as Subscription)
  }

  public async getChannel (parts?: ChannelParts) {
    if (!this.channel) await this.fetch([ 'snippet' ])
    return this.channel ? this.youtube.getChannel(this.channel.id, parts) : undefined
  }

  public async getSubscriber (parts?: ChannelParts) {
    if (!this.subscriber) await this.fetch([ 'subscriberSnippet' ])
    return this.subscriber ? this.youtube.getChannel(this.subscriber.id, parts) : undefined
  }
}
