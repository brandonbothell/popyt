import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, ChannelSection, Caption, Region, Language, VideoAbuseReportReason } from '..'

/**
 * @ignore
 */
export type ItemTypes = typeof Video | typeof Channel | typeof Playlist | typeof YTComment | typeof Subscription | typeof VideoCategory | typeof ChannelSection |
  typeof Caption

/**
 * @ignore
 */
export type ItemReturns = Video | Channel | Playlist | YTComment | Subscription | VideoCategory | ChannelSection | Caption
