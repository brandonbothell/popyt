import { Video, Channel, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, Language, Region, ChannelSection, Caption } from '..'

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
  ChannelComments,
  CommentReplies,
  Captions,
  Playlists,
  Subscriptions,
  ChannelSections
}

export type PaginatedType = typeof VideoCategory | typeof VideoAbuseReportReason | typeof Language | typeof Region | typeof Video | typeof YTComment |
  typeof Caption | typeof Playlist | typeof Subscription | typeof ChannelSection | typeof Channel

/**
 * @ignore
 */
export type PaginatedItemOptions = {
  type: PaginatedItemType
  mine?: boolean
  id?: string
  subId?: string
  parts?: string[]
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
} &
  (T extends typeof Video ? VideoSearchOptions :
  T extends typeof Playlist ? PlaylistSearchOptions :
  T extends typeof Channel ? ChannelSearchOptions : {})

export type SearchOptions<T extends SearchType = SearchType> = {
  searchFilters?: SearchFilters<T>
  pageOptions?: PageOptions
}

/**
 * @ignore
 */
export type GenericSearchOptions<T extends SearchType = SearchType> = SearchFilters<T> & PageOptions & {
  searchTerm: string
}

export type VideoSearchOptions = {
  channelId?: string
  videoCategoryId?: string
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
  channelId?: string
}

export type ChannelSearchOptions = {
  /**
   * Filter by TV shows
   */
  channelType?: 'any' | 'show'
}
