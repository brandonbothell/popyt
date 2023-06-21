import { Channel, Playlist, Video, VideoCategory, YTComment } from '..'

const RESOLVABLE_CLASSES = [ Video, Playlist, Channel, VideoCategory, YTComment ]

/**
 * @ignore
 */
export type Resolvable = typeof RESOLVABLE_CLASSES[number]

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
export type CommentResolvable = string | YTComment
