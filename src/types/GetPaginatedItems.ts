import { Video, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, GuideCategory, Language, Region } from '..'

/**
 * @ignore
 */
export type PaginatedItemsEndpoints = 'playlistItems' | 'playlists' | 'playlists:channel' | 'commentThreads' | 'commentThreads:video' | 'commentThreads:channel' |
  'comments' | 'subscriptions' | 'videoCategories' | 'videoAbuseReportReasons' | 'guideCategories' | 'i18nLanguages' | 'i18nRegions'

/**
 * @ignore
 */
export type PaginatedItemsReturns = Video[] | YTComment[] | Playlist[] | Subscription[] | VideoCategory[] | VideoAbuseReportReason[] | GuideCategory[] | Language[] | Region[]
