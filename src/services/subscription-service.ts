import { SubscriptionParts } from '../types/Parts'
import { Cache } from '../oauth'
import YouTube, { Subscription } from '..'

/**
 * @ignore
 */
export class SubscriptionService {
  constructor (private youtube: YouTube) {}

  public async getSubscriptionByChannels (subscriberId: string, channelId: string, parts?: SubscriptionParts): Promise<Subscription> {
    if (this.youtube._shouldCache) {
      const cached = Cache.get(`sub_by_channels://"${subscriberId}"/"${channelId}"`)
      if (cached) return cached
    }

    const options: {
      part: string
      forChannelId: string
      channelId: string
      maxResults: number
    } = {
      part: parts ? parts.join(',') : 'snippet,contentDetails,subscriberSnippet',
      forChannelId: channelId,
      channelId: subscriberId,
      maxResults: 1
    }

    const results = await this.youtube._request.get('subscriptions', { params: options, authorizationOptions: { apiKey: true } })

    if (!results.items?.length) {
      return Promise.reject(new Error('Subscription not found'))
    }

    const toReturn = new Subscription(this.youtube, results.items[0])

    if (this.youtube._shouldCache && this.youtube._cacheSearches) {
      this.youtube._cache(`sub_by_channels://"${subscriberId}"/"${channelId}"`, toReturn)
    }

    return toReturn
  }
}
