import YouTube, { Video, Channel, Playlist, GenericSearchOptions, SearchType, PaginatedItemsReturns, SearchFilters } from '..'
import { Cache } from '../util'

/**
 * @ignore
 */
export class SearchService {
  constructor (private youtube: YouTube) {}

  /* istanbul ignore next */
  public async search<T extends SearchType = SearchType> (
    { // page options
      pages = 1, maxPerPage = 50, pageToken,
      // search options
      types = [Video, Channel, Playlist] as T[], searchTerm, ...otherFilters
    }: GenericSearchOptions<T>): Promise<PaginatedItemsReturns<T>> {

    const type = types.map(t => t.name.toLowerCase()).join(',')

    if (this.youtube._shouldCache) {
      const cached = Cache.get(`search://${type}/"${searchTerm}"/${pages}/${maxPerPage}/${pageToken}/${JSON.stringify(otherFilters)}`)
      if (cached) return cached
    }

    if (maxPerPage < 1) {
      return Promise.reject('Max per page must be above 0')
    }

    if (maxPerPage > 50) {
      return Promise.reject('Max per page must be 50 or below for searches')
    }

    if (pages < 1) pages = 1

    const options: {
      q: string
      maxResults: number
      part: string
      type: string
      regionCode: string
      channelId?: string
      pageToken?: string
      videoEmbeddable?: string
      videoCategoryId?: string
      eventType?: string
      videoType?: string
      videoCaption?: string
      location?: string
      locationRadius?: string
    } = {
      q: encodeURIComponent(searchTerm),
      maxResults: maxPerPage,
      part: 'snippet',
      type,
      regionCode: this.youtube.region
    }

    if (pageToken) options.pageToken = pageToken

    const searchFilters = otherFilters as any as SearchFilters<T>

    if ('channelId' in searchFilters) options.channelId = searchFilters.channelId
    if ('videoCategoryId' in searchFilters) options.videoCategoryId = searchFilters.videoCategoryId
    if ('eventType' in searchFilters) options.eventType = searchFilters.eventType
    if ('videoType' in searchFilters) options.videoType = searchFilters.videoType
    if ('videoCaption' in searchFilters) options.videoCaption = searchFilters.videoCaption
    if ('location' in searchFilters) options.location = searchFilters.location
    if ('locationRadius' in searchFilters) options.locationRadius = searchFilters.locationRadius
    if ('channelId' in searchFilters) options.videoEmbeddable = 'true'

    const toReturn = await this.youtube._genericService.fetchPages(pages, 'search', options)

    if (this.youtube._shouldCache && this.youtube._cacheSearches) {
      this.youtube._cache(`search://${type}/"${searchTerm}"/${pages}/${maxPerPage}/${pageToken}/${JSON.stringify(otherFilters)}`, toReturn)
    }

    return toReturn
  }
}
