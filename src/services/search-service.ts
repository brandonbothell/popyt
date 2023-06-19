import YouTube, { Video, Channel, Playlist, GenericSearchOptions, SearchType, PaginatedItemsReturns } from '..'
import { Cache } from '../util'

/**
 * @ignore
 */
export class SearchService {
  constructor (private youtube: YouTube) {}

  /* istanbul ignore next */
  public async search<T extends SearchType = SearchType> (
    { // search options
      // @ts-ignore Default values, please chill TypeScript
      types = [Video, Channel, Playlist], searchTerm, fields,
      // page options
      pages = 1, maxPerPage = 10, pageToken, ...otherFilters
    }: GenericSearchOptions<T>): Promise<PaginatedItemsReturns<T>> {

    const type = types.map(t => t.name.toLowerCase()).join(',')

    if (this.youtube._shouldCache) {
      const cached = Cache.get(`search://${type}/"${searchTerm}"/${pages}/${maxPerPage}/"${pageToken}"`)
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
      videoCaption?: string
      location?: string
      locationRadius?: string
    } = {
      q: encodeURIComponent(searchTerm),
      fields: encodeURIComponent(fields ||
        '*'),
      maxResults: maxPerPage,
      part: 'snippet',
      type,
      regionCode: this.youtube.region
    }

    if (pageToken) options.pageToken = pageToken

    const searchFilters = otherFilters as any

    if (searchFilters.channelId) options.channelId = searchFilters.channelId
    if (searchFilters.categoryId) options.category = searchFilters.categoryId
    if (searchFilters.eventType) options.eventType = searchFilters.eventType
    if (searchFilters.videoType) options.videoType = searchFilters.videoType
    if (searchFilters.videoCaption) options.videoCaption = searchFilters.videoCaption
    if (searchFilters.location) options.location = searchFilters.location
    if (searchFilters.locationRadius) options.locationRadius = searchFilters.locationRadius
    if (searchFilters.videoEmbeddable) options.videoEmbeddable = 'true'

    const toReturn = await this.youtube._genericService.fetchPages(pages, 'search', options)

    if (this.youtube._shouldCache && this.youtube._cacheSearches) {
      this.youtube._cache(`search://${type}/"${searchTerm}"/${pages}/${maxPerPage}/"${pageToken}"`, toReturn)
    }

    return toReturn
  }
}
