import YouTube, { Subscription } from '..'
import { SubscriptionParts } from '../types/Parts'
import { Cache } from '../util'

/**
 * @ignore
 */
export class SubscriptionService {
  constructor (private youtube: YouTube) {}

  /* istanbul ignore next */
  public async getSubscriptionByChannels (subscriberId: string, channelId: string, parts?: SubscriptionParts): Promise<Subscription> {
    const cached = Cache.get(`sub_by_channels://"${subscriberId}"/"${channelId}"`)

    if (this.youtube._shouldCache && cached) {
      return cached
    }

    const data: {
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

    const results = await this.youtube._request.api('subscriptions', data, this.youtube.token, this.youtube.accessToken)

    if (results.items.length === 0) {
      return Promise.reject('Subscription not found')
    }

    const toReturn = new Subscription(this.youtube, results.items[0])

    if (this.youtube._shouldCache && this.youtube._cacheSearches) {
      this.youtube._cache(`sub_by_channels://"${subscriberId}"/"${channelId}"`, toReturn)
    }

    return toReturn
  }
}
