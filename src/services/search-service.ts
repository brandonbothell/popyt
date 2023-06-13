import YouTube, { Video, Channel, Playlist } from '..'
import { Cache } from '../util'

/**
 * @ignore
 */
export class SearchService {
  /* istanbul ignore next */
  public static async search (youtube: YouTube, types: (typeof Video | typeof Channel | typeof Playlist)[], searchTerm: string, maxResults: number = 10, pageToken?: string,
    channelId?: string, fields?: string, category?: string, onlyEmbeddable: boolean = false, eventType?: 'completed' | 'live' | 'upcoming',
    videoType?: 'any' | 'episode' | 'movie'):
  Promise<{ results: (Video | Channel | Playlist)[]; prevPageToken: string; nextPageToken: string }> {

    const type = types.map(t => t.name.toLowerCase()).join(',')

    if (youtube._shouldCache) {
      const cached = Cache.get(`search://${type}/"${searchTerm}"/${maxResults}/"${pageToken}"`)
      if (cached) return cached
    }

    if (maxResults < 1 || maxResults > 50) {
      return Promise.reject('Max results must be between 1 and 50 for search queries')
    }

    const data: {
      q: string
      fields: string
      maxResults: number
      part: string
      type: string
      regionCode: string
      channelId?: string
      pageToken?: string
      videoEmbeddable?: string
      category?: string
      eventType?: string
      videoType?: string
    } = {
      q: encodeURIComponent(searchTerm),
      fields: encodeURIComponent(fields ||
        'prevPageToken,nextPageToken,items(kind,id,snippet(title,description,thumbnails,publishedAt,channelId,channelTitle,liveBroadcastContent))'),
      maxResults,
      part: 'snippet',
      type,
      regionCode: youtube.region
    }

    if (channelId) {
      data.channelId = channelId
    }

    if (pageToken) {
      data.pageToken = pageToken
    }

    if (category) {
      data.category = category
    }

    if (eventType) {
      data.eventType = eventType
    }

    if (onlyEmbeddable) {
      data.videoEmbeddable = 'true'
    }

    if (videoType) {
      data.videoType = videoType
    }

    const results = await youtube._request.api('search', data, youtube.token, youtube.accessToken)
    const items = []

    results.items.forEach(item => {
      if (item.id.videoId) {
        items.push(new Video(youtube, item))
      } else if (item.id.channelId) {
        items.push(new Channel(youtube, item))
      } else if (item.id.playlistId) {
        items.push(new Playlist(youtube, item))
      }
    })

    const toReturn = { results: items, prevPageToken: results.prevPageToken, nextPageToken: results.nextPageToken }

    if (youtube._shouldCache && youtube._cacheSearches) {
      youtube._cache(`search://${type}/"${searchTerm}"/${maxResults}/"${pageToken}"`, toReturn)
    }

    return toReturn
  }
}
