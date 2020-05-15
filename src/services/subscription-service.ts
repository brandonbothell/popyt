import YouTube, { Subscription } from '..'
import { Cache } from '../util'

/**
 * @ignore
 */
export class SubscriptionService {
  /* istanbul ignore next */
  public static async getSubscriptionByChannels (youtube: YouTube, subscriberId: string, channelId: string): Promise<Subscription> {
    const cached = Cache.get(`sub_by_channels://"${subscriberId}"/"${channelId}"`)

    if (youtube._shouldCache && cached) {
      return cached
    }

    const data: {
      part: string
      forChannelId: string
      channelId: string
      maxResults: number
    } = {
      part: 'snippet,contentDetails,subscriberSnippet',
      forChannelId: channelId,
      channelId: subscriberId,
      maxResults: 1
    }

    const results = await youtube._request.api('subscriptions', data, youtube.token, youtube.accessToken)

    if (results.items.length === 0) {
      return Promise.reject('Subscription not found')
    }

    const toReturn = new Subscription(youtube, results.items[0])

    if (youtube._shouldCache && youtube._cacheSearches) {
      youtube._cache(`sub_by_channels://"${subscriberId}"/"${channelId}"`, toReturn)
    }

    return toReturn
  }
}
