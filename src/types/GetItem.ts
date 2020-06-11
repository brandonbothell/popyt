import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, GuideCategory, ChannelSection, Caption } from '..'

/**
 * @ignore
 */
export type ItemTypes = typeof Video | typeof Channel | typeof Playlist | typeof YTComment | typeof Subscription | typeof VideoCategory | typeof GuideCategory |
  typeof ChannelSection | typeof Caption

/**
 * @ignore
 */
export type ItemReturns = Video | Channel | Playlist | YTComment | Subscription | VideoCategory | GuideCategory | ChannelSection | Caption
