import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, GuideCategory } from '..'

/**
 * @ignore
 */
export type ItemTypes = typeof Video | typeof Channel | typeof Playlist | typeof YTComment | typeof Subscription | typeof VideoCategory | typeof GuideCategory

/**
 * @ignore
 */
export type ItemReturns = Video | Channel | Playlist | YTComment | Subscription | VideoCategory | GuideCategory
