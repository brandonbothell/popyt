import { Video, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, Language, Region, ChannelSection, Caption } from '..'

/**
 * @ignore
 */
export type PaginatedItemsEndpoints = 'playlistItems' | 'playlists' | 'commentThreads' | 'commentThreads:video' | 'commentThreads:channel' |
  'comments' | 'subscriptions' | 'videoCategories' | 'videoAbuseReportReasons' | 'i18nLanguages' | 'i18nRegions' | 'channelSections' | 'captions'

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
