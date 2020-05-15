import YouTube from '..'
import { Thumbnail } from '../types'

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
  public static part = 'snippet,contentDetails,subscriberSnippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,snippet(publishedAt,title,channelTitle,description,resourceId(channelId),channelId,thumbnails),' +
    'contentDetails(newItemCount,totalItemCount,activityType),subscriberSnippet(title,description,thumbnails))'

  /**
   * The YouTube object that created this subscription object.
   */
  public youtube: YouTube

  /**
   * Whether or not this is a full subscription object.
   */
  public full: boolean

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
   * Information on the [[Channel]] that the user subscribed to.
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
   */
  public subscriber: {
    /**
     * The user's ID.
     */
    id: string

    /**
     * The user's username.
     */
    name: string

    /**
     * The user's description.
     */
    description: string

    /**
     * Thumbnail images for the user's channel.
     */
    thumbnails: {
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
   */
  public activities: 'all' | 'uploads'

  constructor (youtube: YouTube, data: any) {
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
    this.full = true

    /* istanbul ignore next */
    if (subscription.snippet) {
      this.dateSubscribed = new Date(subscription.snippet.publishedAt)
      this.channel = {
        name: subscription.snippet.channelTitle || subscription.snippet.title,
        id: subscription.snippet.resourceId.channelId
      }
      this.title = subscription.snippet.title
      this.description = subscription.snippet.description
      this.subscriber = {
        id: subscription.snippet.channelId,
        name: null,
        description: null,
        thumbnails: null
      }
      this.thumbnails = subscription.snippet.thumbnails
    } else {
      /* istanbul ignore next */
      this.full = false
    }

    if (subscription.contentDetails) {
      this.items = {
        new: subscription.contentDetails.newItemCount,
        total: subscription.contentDetails.totalItemCount
      }
      this.activities = subscription.contentDetails.activityType
    } else {
      this.full = false
    }

    if (subscription.subscriberSnippet) {
      this.subscriber.name = subscription.subscriberSnippet.title
      this.subscriber.description = subscription.subscriberSnippet.description
      this.subscriber.thumbnails = subscription.subscriberSnippet.thumbnails
    } else {
      this.full = false
    }
  }

  /**
   * Fetches this subscription and reassigns this object to the new subscription object.
   * Only useful if `this.full` is false, or if you want updated subscription info.
   */
  public async fetch () {
    let subscription = await this.youtube.getSubscription(this.id).catch((e: string) => e)

    /* istanbul ignore next */
    if (typeof subscription === 'string') {
      subscription = await this.youtube.getSubscriptionByChannels(this.subscriber.id, this.channel.id).catch(e => e)
    }

    return Object.assign(this, subscription)
  }
}
