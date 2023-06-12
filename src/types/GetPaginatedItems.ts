import { Video, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, Language, Region, ChannelSection, Caption } from '..'

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
export type PaginatedItemsReturns = Video[] | YTComment[] | Playlist[] | Subscription[] | VideoCategory[] | VideoAbuseReportReason[] | Language[] |
  Region[] | ChannelSection[] | Caption[]
