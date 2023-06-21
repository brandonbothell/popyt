import { Video, Channel, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, Language, Region, ChannelSection, Caption } from '..'
import { ChannelResolvable, VideoCategoryResolvable } from './Resolvable'

const PAGINATED_CLASSES = [
  VideoCategory, VideoAbuseReportReason, Language, Region, Video, YTComment, Caption, Playlist, Subscription, ChannelSection, Channel
]

/**
 * @ignore
 */
export enum PaginatedItemType {
  VideoCategories,
  VideoAbuseReportReasons,
  Languages,
  Regions,
  PlaylistItems,
  VideoComments,
  CommentReplies,
  Captions,
  Playlists,
  Subscriptions,
  ChannelSections
}

export type PaginatedType = typeof PAGINATED_CLASSES[number]

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

export type PageOptions = {
  pages?: number
  maxPerPage?: number
  pageToken?: string
}

export type PaginatedItemsReturns<T extends PaginatedType> = {
  items: InstanceType<T>[]
  prevPageToken?: string
  nextPageToken?: string
}

/* Searching */

export type SearchType = typeof Video | typeof Playlist | typeof Channel

export type SearchFilters<T extends SearchType = SearchType> = {
  types?: T[]
  order?: 'date' | 'rating' | 'relevance' | 'title' | 'videoCount' | 'viewCount'
} &
  (T extends typeof Video ? VideoSearchOptions :
  T extends typeof Playlist ? PlaylistSearchOptions :
  T extends typeof Channel ? ChannelSearchOptions : {})

export type GenericSearchOptions<T extends SearchType = SearchType> = {
  searchFilters?: SearchFilters<T>
  pageOptions?: PageOptions
}

export type EntitySearchOptions<T extends SearchType = SearchType> = {
  searchFilters?: Omit<SearchFilters<T>, 'types'>
  pageOptions?: PageOptions
}

/**
 * @ignore
 */
export type InternalSearchOptions<T extends SearchType = SearchType> = SearchFilters<T> & PageOptions & {
  searchTerm: string
}

export type VideoSearchOptions = {
  channel?: ChannelResolvable
  videoCategory?: VideoCategoryResolvable
  videoEmbeddable?: boolean
  eventType?: 'completed' | 'live' | 'upcoming'
  videoType?: 'any' | 'episode' | 'movie'
  videoCaption?: 'any' | 'closedCaption' | 'none'

  /**
   * Latitude and longitude coordinates in the format (37.42307,-122.08427).
   */
  location?: string

  /**
   * Units are m, km, ft, and mi. E.g. 5km.  
   * No larger than 1000km
   */
  locationRadius?: string
}

export type PlaylistSearchOptions = {
  channel?: ChannelResolvable
}

export type ChannelSearchOptions = {
  /**
   * Filter by TV shows
   */
  channelType?: 'any' | 'show'
}
