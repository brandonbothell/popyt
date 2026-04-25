import { Video, Channel, Comment, Playlist, Subscription, VideoCategory,
  VideoAbuseReportReason, Language, Region, Caption, ChannelSection, VideoRating } from '..'
import { ChannelResolvable, VideoCategoryResolvable } from './Resolutions'

/* Item Types */

export const GETTABLE_CLASSES =
  [ Video, Channel, Playlist, Comment, Subscription,
    VideoCategory, ChannelSection, Caption, VideoRating ]

export type ItemTypes = typeof GETTABLE_CLASSES[number]

export type ItemReturns<T extends any | any[], K extends ItemTypes, M extends boolean> =
  M extends true ? InstanceType<K> :
  T extends any[] ? InstanceType<K>[] : InstanceType<K>

/* Paginated Types */

/**
 * An array containing every entity that is capable of returning a paginated response from the API.
 */
export const PAGINATED_CLASSES = [
  VideoCategory, VideoAbuseReportReason, Language, Region, Video, Comment, Caption,
  Playlist, Subscription, ChannelSection, Channel, VideoRating
]

/**
 * @ignore
 */
export enum PaginatedItemType {
  VideoCategories,
  VideoAbuseReportReasons,
  Languages,
  Regions,
  VideoRatings,
  PlaylistItems,
  VideoComments,
  CommentReplies,
  Captions,
  Playlists,
  Subscriptions,
  ChannelSections
}

/**
 * A union type of every entity that is capable of returning a paginated response from the API.
 */
export type PaginatedType = typeof PAGINATED_CLASSES[number]

/**
 * A union of every entity that is capable of returning a paginated response from the API.
 */
export type PaginatedInstance = InstanceType<PaginatedType>

/**
 * @ignore
 */
export type PaginatedItemOptions = {
  type: PaginatedItemType
  mine?: boolean
  id?: string
  subId?: string
  parts?: string[]

  /**
   * Only valid for comments
   */
  order?: 'time' | 'relevance'
} & PageOptions

/**
 * @ignore
 */
export type PaginatedRequestParams = {
  part: string
  maxResults?: number
  id?: string
  videoId?: string
  parentId?: string
  textFormat?: string
  playlistId?: string
  channelId?: string
  forChannelId?: string
  regionCode?: string
  pageToken?: string
  mine?: boolean
  hl?: string
  order?: string
}

/**
 * When retrieving a paginated entity, use these options to specify number, size, and location of pages you are requesting.
 */
export type PageOptions = {
  /**
   * The number of pages to fetch.
   */
  pages?: number

  /**
   * The maximum number of items to include per page.
   */
  maxPerPage?: number

  /**
   * The token of the page to fetch, retrieved from a previous call to the method returning a PaginatedResponse.
   */
  pageToken?: string
}

/**
 * A paginated response that can be navigated by providing the `nextPageToken` to a related function within
 * the [YouTube](/docs/api/Library-Exports/classes/YouTube) class to instruct it to retrieve the next page.
 */
export type PaginatedResponse<T extends PaginatedInstance> = {
  /**
   * The items returned from the request to the YouTube API.
   */
  items: T[]

  prevPageToken?: string

  /**
   * Provide this to a function within the [YouTube](/docs/api/Library-Exports/classes/YouTube) class to retrieve the next page
   * instead of the first page of items from the method.
   */
  nextPageToken?: string
}

/* Searching */

/**
 * A union of the searchable YouTube entities available via Popyt.
 */
export type SearchType = typeof Video | typeof Playlist | typeof Channel

/**
 * A generic intersection of the general search filters on YouTube and the filters for a specific entity.
 */
export type SearchFilters<T extends SearchType = SearchType> = {
  types?: T[]
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'
} &
  (T extends typeof Video ? VideoSearchOptions :
  T extends typeof Playlist ? PlaylistSearchOptions :
  T extends typeof Channel ? ChannelSearchOptions : {})

/**
 * Generic type for the [YouTube#search()](/docs/api/Library-Exports/classes/YouTube#search) function.
 */
export type GenericSearchOptions<T extends SearchType = SearchType> = {
  /**
   * The filters to narrow down your YouTube search.
   */
  searchFilters?: SearchFilters<T>

  /**
   * Use these options to specify number, size, and location of pages you are requesting.
   */
  pageOptions?: PageOptions
}

/**
 * Generic type for the entity-specific search functions.
 */
export type EntitySearchOptions<T extends SearchType = SearchType> = {
  /**
   * The search filters to narrow down your YouTube search.
   */
  searchFilters?: Omit<SearchFilters<T>, 'types'>

  /**
   * Use these options to specify number, size, and location of pages you are requesting.
   */
  pageOptions?: PageOptions
}

/**
 * @ignore
 */
export type InternalSearchOptions<T extends SearchType = SearchType> = SearchFilters<T> & PageOptions & {
  searchTerm: string
}

/**
 * Filters to be used with [YouTube#search()](/docs/api/Library-Exports/classes/YouTube#search)
 * or [YouTube#searchVideos()](/docs/api/Library-Exports/classes/YouTube#searchvideos)
 */
export type VideoSearchOptions = {
  /**
   * Search for videos uploaded by a channel.
   */
  channel?: ChannelResolvable

  /**
   * Search for videos in a certain category (Film & Animation, Comedy, Drama, etc.) (must be an object or ID from the API, not a title of a category).
   */
  videoCategory?: VideoCategoryResolvable

  /**
   * Search for videos that are embeddable into external websites.
   */
  videoEmbeddable?: boolean

  /**
   * Search for ended, live, or upcoming livestreams.
   */
  eventType?: 'completed' | 'live' | 'upcoming'

  /**
   * Search specifically for TV shows or movies.
   */
  videoType?: 'any' | 'episode' | 'movie'
  videoCaption?: 'any' | 'closedCaption' | 'none'

  /**
   * Search by latitude and longitude coordinates in the format (37.42307,-122.08427).
   */
  location?: string

  /**
   * See [Location](/docs/api/Library-Exports/type-aliases/VideoSearchOptions#location)  
   *   
   * Units are 'm', 'km', 'ft', and 'mi'. e.g. '5km'. No larger than 1000km.
   */
  locationRadius?: string
}

/**
 * Filters to be used with [YouTube#search()](/docs/api/Library-Exports/classes/YouTube#search)
 * or [YouTube#searchPlaylists()](/docs/api/Library-Exports/classes/YouTube#searchplaylists)
 */
export type PlaylistSearchOptions = {
  channel?: ChannelResolvable
}

/**
 * Filters to be used with [YouTube#search()](/docs/api/Library-Exports/classes/YouTube#search)
 * or [YouTube#searchChannels()](/docs/api/Library-Exports/classes/YouTube#searchchannels)
 */
export type ChannelSearchOptions = {
  /**
   * Filter by TV shows
   */
  channelType?: 'any' | 'show'
}
