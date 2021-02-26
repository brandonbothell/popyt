import { Video, YTComment, Playlist, Subscription, VideoCategory, VideoAbuseReportReason, Language, Region, ChannelSection, Caption } from '..'

/**
 * @ignore
 */
export type PaginatedItemsEndpoints = 'playlistItems' | 'playlists' | 'playlists:channel' | 'commentThreads' | 'commentThreads:video' | 'commentThreads:channel' |
  'comments' | 'subscriptions' | 'videoCategories' | 'videoAbuseReportReasons' | 'i18nLanguages' | 'i18nRegions' | 'channelSections' | 'captions'

/**
 * @ignore
 */
export type PaginatedItemsReturns = Video[] | YTComment[] | Playlist[] | Subscription[] | VideoCategory[] | VideoAbuseReportReason[] | Language[] |
  Region[] | ChannelSection[] | Caption[]
