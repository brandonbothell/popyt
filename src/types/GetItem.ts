import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, GuideCategory, ChannelSection } from '..'

/**
 * @ignore
 */
export type ItemTypes = typeof Video | typeof Channel | typeof Playlist | typeof YTComment | typeof Subscription | typeof VideoCategory | typeof GuideCategory |
  typeof ChannelSection

/**
 * @ignore
 */
export type ItemReturns = Video | Channel | Playlist | YTComment | Subscription | VideoCategory | GuideCategory | ChannelSection
