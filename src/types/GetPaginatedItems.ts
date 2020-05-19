import { Video, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, GuideCategory } from '..'

/**
 * @ignore
 */
export type PaginatedItemsEndpoints = 'playlistItems' | 'playlists' | 'playlists:channel' | 'commentThreads' |
'commentThreads:video' | 'commentThreads:channel' | 'comments' | 'subscriptions' | 'videoCategories' | 'videoAbuseReportReasons' | 'guideCategories'

/**
 * @ignore
 */
export type PaginatedItemsReturns = Video[] | YTComment[] | Playlist[] | Subscription[] | VideoCategory[] | VideoAbuseReportReason[] | GuideCategory[]
