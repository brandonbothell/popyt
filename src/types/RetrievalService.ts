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

const PAGINATED_CLASSES = [
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

export type PaginatedType = typeof PAGINATED_CLASSES[number]

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

export type PageOptions = {
  pages?: number
  maxPerPage?: number
  pageToken?: string
}

export type PaginatedResponse<T extends PaginatedInstance> = {
  items: T[]
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
