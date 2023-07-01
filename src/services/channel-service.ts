import { ChannelParts } from '../types/Parts'
import { Cache } from '../util'
import YouTube, { Channel } from '..'

/**
 * @ignore
 */
export class ChannelService {
  constructor (private youtube: YouTube) {}

  /**
   * @deprecated Currently broken, not implemented in the current API
   */
  public async getChannelByUsername (username: string, parts?: ChannelParts): Promise<Channel> {
    if (this.youtube._shouldCache) {
      const cached = Cache.get(`channel_by_username://${username}`)
      if (cached) return cached
    }

    const result = await this.youtube._request.get('channels', {
      params: {
        part: parts ? parts.join(',') : Channel.part,
        forUsername: username
      },
      authorizationOptions: { apiKey: true }
    })

    if (!result.items?.length) {
      return Promise.reject(new Error('Channel not found'))
    }

    const channel = new Channel(this.youtube, result.items[0], true)
    this.youtube._cache(`channel_by_username://${username}`, channel)

    return channel
  }
}
