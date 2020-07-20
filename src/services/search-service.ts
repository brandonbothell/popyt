import YouTube, { Video, Channel, Playlist } from '..'
import { Cache } from '../util'

/**
 * @ignore
 */
export class SearchService {
  /* istanbul ignore next */
  public static async search (youtube: YouTube, types: (typeof Video | typeof Channel | typeof Playlist)[], searchTerm: string, maxResults: number = 10, pageToken?: string,
    fields?: string, category?: string, onlyEmbeddable: boolean = false, eventType?: 'completed' | 'live' | 'upcoming', videoType?: 'any' | 'episode' | 'movie'):
  Promise<{ results: (Video | Channel | Playlist)[]; prevPageToken: string; nextPageToken: string }> {
    const type = types.map(t => t.endpoint.substring(0, t.endpoint.length - 1)).join(',')
    const cached = Cache.get(`search://${type}/"${searchTerm}"/${maxResults}/"${pageToken}"`)

    if (youtube._shouldCache && cached) {
      return cached
    }

    if (maxResults < 1 || maxResults > 50) {
      return Promise.reject('Max results must be greater than 0 and less than or equal to 50')
    }

    const data: {
      q: string
      fields: string
      maxResults: number
      part: string
      type: string
      regionCode: string
      pageToken?: string
      videoEmbeddable?: string
      category?: string
      eventType?: string
      videoType?: string
    } = {
      q: encodeURIComponent(searchTerm),
      fields: encodeURIComponent(fields || 'prevPageToken,nextPageToken,items(kind,id,snippet(title,description,thumbnails,publishedAt,channelId,liveBroadcastContent))'),
      maxResults,
      part: 'snippet',
      type,
      regionCode: youtube.region
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
