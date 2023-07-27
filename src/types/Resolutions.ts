import { Channel, Playlist, Video, VideoCategory, Comment, PaginatedType,
  Subscription, CacheItem } from '..'

const RESOLVABLE_CLASSES = [
  Video, Playlist, Channel, VideoCategory, Comment, Subscription
]

export type Resolvable<T extends PaginatedType> = string | InstanceType<T>

export type ResolutionMap<T extends ResolvableClass = ResolvableClass> =
  Map<T, Map<string, CacheItem<Resolvable<T>>>>

/**
 * @ignore
 */
export type ResolveReturn<T extends Resolvable<K> | Resolvable<K>[], K extends ResolvableClass> =
  T extends Resolvable<K>[] ? Resolvable<K>[] : Resolvable<K>

/**
 * @ignore
 */
export type ResolvableClass = typeof RESOLVABLE_CLASSES[number]

/**
 * A URL, ID, search query, or object of a video.
 */
export type VideoResolvable = string | Video

/**
 * A URL, ID, search query, or object of a playlist.
 */
export type PlaylistResolvable = string | Playlist

/**
 * A URL, ID, search query, or object of a channel.
 */
export type ChannelResolvable = string | Channel

/**
 * An ID or object of a video category.
 */
export type VideoCategoryResolvable = string | VideoCategory

/**
 * An ID or object of a comment.
 */
export type CommentResolvable = string | Comment

/**
 * An ID or object of a subscription.
 */
export type SubscriptionResolvable = string | Subscription

export interface IDEntity {
  id: string
  [key: string]: any
}
