import YouTube, { Video, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, Language, Region, ChannelSection, Caption } from '..'

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

/**
 * @ignore
 */
export type PaginatedItemOptions = {
  youtube: YouTube
  type: PaginatedItemType
  mine?: boolean
  id?: string
  maxPerPage?: number
  pages?: number
  pageToken?: string
  subId?: string
  parts?: string[]
}

export type PageOptions = { pages?: number; maxPerPage?: number }

/**
 * @ignore
 */
export type PaginatedItemsReturns = {
  results: (Video | YTComment | Playlist | Subscription | VideoCategory | VideoAbuseReportReason | Language | Region | ChannelSection | Caption)[]
  prevPageToken?: string
  nextPageToken?: string
}
