/**
 * The main class used to interact with the YouTube API. Use this.
 */
export class YouTube {
  public token: string

  /**
   * @param token Your YouTube Data API v3 token. Don't share this with anybody.
   */
  constructor(token: string)

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public searchVideos(searchTerm: string, maxResults?: number): Promise<Video[]>

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public searchChannels(searchTerm: string, maxResults?: number): Promise<Channel[]>

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public searchPlaylists(searchTerm: string, maxResults?: number): Promise<Playlist[]>

  /**
   * Get a video object from the ID of a video.
   * @param id The ID of the video.
   */
  public getVideo(id: string): Promise<Video>

  /**
   * Get a channel object from the ID of a channel.
   * @param id The ID of the channel.
   */
  public getChannel(id: string): Promise<Channel>

  /**
   * Get a playlist object from the ID of a playlist.
   * @param id The ID of the playlist.
   */
  public getPlaylist(id: string): Promise<Playlist>

  /**
   * Get a video object from the url of a video.
   * @param url The url of the video.
   */
  public getVideoByUrl(url: string): Promise<Video>

  /**
   * Get a channel object from the url of a channel.
   * @param url The url of the channel.
   */
  public getChannelByUrl(url: string): Promise<Channel>

  /**
   * Get a playlist object from the url of a playlist.
   * @param url The url of the playlist.
   */
  public getPlaylistByUrl(url: string): Promise<Playlist>

  /**
   * Get `maxResults` videos in a playlist. Used mostly internally with `Playlist#getVideos`.
   * @param playlistId The ID of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
   */
  public getPlaylistItems(playlistId: string, maxResults?: number): Promise<Video[]>

  /**
   * Get `maxResults` comments on a video. Used mostly internally with `Video#fetchComments`.
   * @param videoId The ID of the video.
   * @param maxResults The maximum amount of comments to get from the video. If <= 0 or not included, returns all comments on the video.
   */
  public getVideoComments (videoId: string, maxResults: number): Promise<YTComment[]>

  /**
   * Get `maxResults` replies to a comment. Used mostly internally with `Comment#fetchReplies`.
   * @param commentId The ID of the comment to get replies from.
   * @param maxResults The maximum amount of replies to get. Gets all replies if <= 0 or not included.
   */
  public getCommentReplies (commentId: string, maxResults: number): Promise<YTComment[]>
}

/**
 * A YouTube video.
 */
export class Video {
  /**
   * YouTube object that created the video.
   */
  public youtube: YouTube

  /**
   * The raw data of the video.
   */
  public data

  /**
   * Whether or not this is a full video object.
   */
  public full: boolean

  /**
   * The ID of the video.
   */
  public id: string

  /**
   * The title of the video.
   */
  public title: string

  /**
   * The description of the video.
   */
  public description: string

  /**
   * The thumbnails of the video.
   */
  public thumbnails: {
    default?: Thumbnail,
    high?: Thumbnail,
    maxres?: Thumbnail
    medium?: Thumbnail,
    standard?: Thumbnail
  }

  /**
   * The date the video was published.
   */
  public datePublished: Date

  /**
   * The ID of the channel that uploaded the video.
   */
  public channelId: string

  private _length: string

  /**
   * The minutes of the video.
   */
  public minutes: number

  /**
   * The seconds of the video.
   */
  public seconds: number

  /**
   * The url of the video.
   */
  public url: string

  /**
   * The short url of the video, i.e. https://youtu.be/id
   */
  public shortUrl: string

  /**
   * The number of likes the video has.
   */
  public likes: number

  /**
   * The number of dislikes the video has.
   */
  public dislikes: number

  /**
   * The number of views the video has.
   */
  public views: number

  /**
   * Whether or not this video COULD BE private. True if the video might
   * be private, as you cannot check if playlist items are private.
   * I would recommend you try and fetch the video and catch an error
   * if it is private.
   */
  public private: boolean

  /**
   * The video's comments. Only defined when Video#fetchComments is called.
   */
  public comments: YTComment[]

  constructor(youtube: YouTube, data)

  /**
   * Fetches this video and reassigns this object to the new video object.
   * Only useful if `this.full` is false, or if you want updated video info.
   */
  public fetch(): Promise<this & Video>
}

/**
 * A YouTube channel.
 */
export class Channel {
  /**
   * The YouTube object that created this channel object.
   */
  public youtube: YouTube

  /**
   * Whether or not this a full channel object or not.
   */
  public full: boolean

  /**
   * The raw data of this channel.
   */
  public data: any

  /**
   * The name of this channel.
   */
  public name: string

  /**
   * The description of this channel.
   */
  public about: string

  /**
   * The ID of this channel.
   */
  public id: string

  /**
   * The country this channel is based in.
   */
  public country: string

  /**
   * The url of the channel.
   */
  public url: string

  /**
   * This channel's custom URL, if they have one.
   */
  public customUrl: string

  /**
   * This channel's profile pictures.
   */
  public profilePictures: {
    default?: Thumbnail,
    high?: Thumbnail,
    maxres?: Thumbnail
    medium?: Thumbnail,
    standard?: Thumbnail
  }

  /**
   * The date this channel was created.
   */
  public datePublished: Date

  /**
   * The default language for this channel's uploads.
   */
  public language: string

  /**
   * This channel's view count.
   */
  public views: number

  /**
   * The channel's uploads. Only available after calling `Channel#getVideos()`
   */
  public videos: Playlist

  /**
   * The number of subscribers this channel has. `-1` if the subcount is hidden.
   */
  public subCount: number

  /**
   * This channel's comment count.
   */
  public comments: number

  constructor (youtube: YouTube, data)

  /**
   * Fetches this channel and reassigns this object to the new channel object.
   * Only useful if `this.full` is false, or if you want updated channel info.
   */
  public fetch(): Promise<this & Channel>

  /**
   * Fetches the channel's videos and assigns them to the `Channel#videos` property.
   */
  public getVideos(): Promise<Playlist>
}

/**
 * A YouTube playlist.
 */
export class Playlist {
  /**
   * The YouTube object that created this playlist.
   */
  public youtube: YouTube

  /**
   * The raw data of this playlist.
   */
  public data: any

  /**
   * Whether or not this is a full playlist object.
   */
  public full: boolean

  /**
   * The ID of this playlist.
   */
  public id: string

  /**
   * The title of the playlist.
   */
  public title: string

  /**
   * The description of the playlist.
   */
  public description: string

  /**
   * The videos in the playlist. Only available after calling `Playlist#getVideos()`.
   */
  public videos: Video[]

  /**
   * The ID of the creator of the playlist.
   */
  public creatorId: string

  /**
   * The date the playlist was created.
   */
  public datePublished: Date

  /**
   * The thumbnails for the playlist.
   */
  public thumbnails: {
    default?: Thumbnail,
    high?: Thumbnail,
    maxres?: Thumbnail
    medium?: Thumbnail,
    standard?: Thumbnail
  }

  /**
   * The number of items in the playlist.
   */
  public itemCount: number

  /**
   * An <iframe> tag that embeds a player that will play the playlist.
   */
  public embedHtml: string

  /**
   * The tags of the playlist.
   */
  public tags: string[]

  constructor (youtube: YouTube, data)
 
  /**
   * Adds every video in this playlist to the `videos` property of this playlist.
   * @param maxResults Maximum number of videos to fetch.
   */
  public fetchVideos (maxResults?: number): Promise<Video[]>

  /**
   * Deprecated, use Playlist#fetchVideos instead.
   * @param maxResults Maximum number of videos to fetch.
   */
  public getVideos (maxResults?: number): Promise<Video[]>

  /**
   * Fetches this playlist and reassigns this object to the new playlist object.
   * Only useful if `this.full` is false, or if you want updated playlist info.
   */
  public fetch(): Promise<this & Playlist>
}

export class YTComment {
  /**
   * The YouTube object used to create the comment.
   */
  public youtube: YouTube

  /**
   * The raw data from the YouTube API of the comment.
   */
  public data: any

  /**
   * The comment's unique YouTube ID.
   */
  public id: string

  /**
   * The comment's author.
   */
  public author: {
    /**
     * The author's YouTube username. May not be unique.
     */
    username: string,

    /**
     * The author's avatar URL.
     */
    avatar: string,

    /**
     * The author's channel ID.
     */
    channelId: string,

    /**
     * The author's channel URL.
     */
    channelUrl: string
  }

  /**
   * The comment's content.
   */
  public text: {
    /**
     * What YouTube displays to the user viewing the comment.
     */
    displayed: string,
    /**
     * The comment's plain text.
     */
    original: string
  }

  /**
   * Whether or not you can like/dislike the comment.
   */
  public rateable: boolean

  /**
   * Either YouTube thinks it's popular, or it has at least 100 likes.
   */
  public popular: boolean

  /**
   * The number of likes the comment has gotten.
   */
  public likes: number

  /**
   * The date the comment was published.
   */
  public datePublished: Date

  /**
   * Either the date the comment was last edited, or the date it was
   * posted.
   */
  public dateEdited: Date

  /**
   * Either the ID of the video that it commented on, or the ID of the
   * comment it is replying to.
   */
  public parentId: string

  /**
   * Replies to the comment.
   */
  public replies: YTComment[]

  constructor (youtube: YouTube, data)

  /**
   * Fetches replies to the comment.
   * @param maxResults The maximum amount of replies to fetch. Fetches all comments if not included
   * or less than 0.
   */
  public fetchReplies (maxResults?: number): Promise<YTComment[]>
}


export type Thumbnail = {
  height?: number,
  width?: number,
  url?: string
}
