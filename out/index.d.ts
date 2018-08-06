import { youtube_v3 } from "googleapis"

/**
 * The main class used to interact with the YouTube API. Use this.
 */
export class YouTube {
  public token: string

  /**
   *
   * @param token Your YouTube Data API v3 token. Don't share this with anybody.
   */
  constructor(token: string)

  public searchVideos(searchTerm: string, maxResults: number): Promise<Video[] | Video>
  public getVideo(id: string): Promise<Video>
  public getVideoByUrl(url: string): Promise<Video>

  public searchChannels(searchTerm: string, maxResults: number): Promise<Channel[] | Channel>
  public getChannel(id: string): Promise<Channel>
  public getChannelByUrl(url: string): Promise<Channel>

  /**
   * Gets the 50 latest videos from a channel.
   * @param id The ID of the channel.
   */
  public getChannelVideos(id: string): Promise<Video[]>

  public getPlaylist(id: string): Promise<Playlist>
  public getPlaylistByUrl(url: string): Promise<Playlist>
  public searchPlaylists(searchTerm: string, maxResults: number): Promise<Playlist[] | Playlist>
  public getPlaylistItems(playlistId: string): Promise<Video[]>
}

/**
 * A YouTube video.
 */
export class Video {
  /**
 * YouTube object that created the video.
 */
  public youtube

  /**
   * The raw data of the video.
   */
  public data: youtube_v3.Schema$Video | youtube_v3.Schema$PlaylistItem | youtube_v3.Schema$SearchResult

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
  public thumbnails: youtube_v3.Schema$ThumbnailDetails

  /**
   * The date the video was published.
   */
  public datePublished: Date

  /**
   * The ID of the channel that uploaded the video.
   */
  public channelId: string

  /**
   * The length of the video. The tag value is an ISO 8601 duration in the format PT#M#S,
   * in which the letters PT indicate that the value specifies a period of time, and the letters
   * M and S refer to length in minutes and seconds, respectively. The # characters preceding the
   * M and S letters are both integers that specify the number of minutes (or seconds) of the video.
   * For example, a value of PT15M51S indicates that the video is 15 minutes and 51 seconds long.
   */
  public length: string

  /**
   * The length of the video in minutes.
   */
  public minutes: number

  /**
   * The length of the video in seconds.
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

  constructor(youtube, data: youtube_v3.Schema$Video | youtube_v3.Schema$PlaylistItem | youtube_v3.Schema$SearchResult)

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
  public data: youtube_v3.Schema$Channel | youtube_v3.Schema$SearchResult

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
  public profilePictures: youtube_v3.Schema$ThumbnailDetails

  /**
   * The date this channel was created.
   */
  public datePublished: Date

  /**
   * The default language for this channel's uploads.
   */
  public language: string

  /**
   * This channel's statistics.
   */
  public statistics: youtube_v3.Schema$ChannelStatistics

  /**
   * The status of this channel.
   */
  public status: youtube_v3.Schema$ChannelStatus

  /**
   * The channel's uploads. Only available after called `Channel#getVideos()`
   */
  public videos: Playlist

  constructor (youtube: YouTube, data: youtube_v3.Schema$Channel | youtube_v3.Schema$SearchResult)

  /**
   * Fetches this channel and reassigns this object to the new channel object.
   * Only useful if `this.full` is false, or if you want updated channel info.
   */
  public fetch (): Promise<this & Channel>

  /**
   * Fetches the channel's videos and assigns them to the `Channel#videos` property.
   */
  public getVideos (): Promise<Playlist>
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
  public data: youtube_v3.Schema$Playlist | youtube_v3.Schema$SearchResult

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
  public thumbnails: youtube_v3.Schema$ThumbnailDetails

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

  constructor (youtube: YouTube, data: youtube_v3.Schema$Playlist | youtube_v3.Schema$SearchResult)

  public getVideos (): Promise<Video[]>

  public fetch (): Promise<this & Playlist>
}
