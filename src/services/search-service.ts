import YouTube, { Video, Channel, Playlist, InternalSearchOptions, SearchType, PaginatedResponse, SearchFilters, VideoCategory } from '..'
import { ResolutionService } from '.'

/**
 * @ignore
 */
export class SearchService {
  public part = 'snippet'

  constructor (private youtube: YouTube) {}

  public async search<T extends SearchType = SearchType> (
    { // page options
      pages = 1, maxPerPage = 50, pageToken,
      // search options
      types = [Video, Channel, Playlist] as T[], searchTerm, ...otherFilters
    }: InternalSearchOptions<T>): Promise<PaginatedResponse<InstanceType<T>>> {

    const type = types.map(t => t.name.toLowerCase()).join(',')

    if (maxPerPage < 1) {
      return Promise.reject(new Error('Max per page must be above 0'))
    }

    if (maxPerPage > 50) {
      return Promise.reject(new Error('Max per page must be 50 or below for searches'))
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
      order?: string
    } = {
      q: encodeURIComponent(searchTerm),
      maxResults: maxPerPage,
      part: this.part,
      type,
      regionCode: this.youtube.region
    }

    if (pageToken) options.pageToken = pageToken

    const searchFilters = otherFilters as unknown as SearchFilters<T>

    if ('channel' in searchFilters) {
      const channel = await this.youtube._services.resolution.resolve(searchFilters.channel, Channel)
      options.channelId = ResolutionService.toId(channel)
    }
    if ('videoCategory' in searchFilters) {
      const videoCategory = await this.youtube._services.resolution.resolve(searchFilters.videoCategory, VideoCategory)
      options.videoCategoryId = ResolutionService.toId(videoCategory)
    }
    if ('eventType' in searchFilters) options.eventType = searchFilters.eventType
    if ('videoType' in searchFilters) options.videoType = searchFilters.videoType
    if ('videoCaption' in searchFilters) options.videoCaption = searchFilters.videoCaption
    if ('location' in searchFilters) options.location = searchFilters.location
    if ('locationRadius' in searchFilters) options.locationRadius = searchFilters.locationRadius
    if ('order' in searchFilters) options.order = searchFilters.order
    if ('videoEmbeddable' in searchFilters) options.videoEmbeddable = 'true'

    // Caching handled here
    return this.youtube._services.retrieval.getPages<T>(pages, 'search', options)
  }
}
