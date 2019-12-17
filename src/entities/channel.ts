import { YouTube, Playlist, Thumbnail, Banners } from '..'
import { YTComment } from './comment'

/**
 * A YouTube channel.
 */
export class Channel {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'channels'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet,contentDetails,statistics,status,brandingSettings'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,contentDetails(relatedPlaylists(uploads)),statistics(subscriberCount,commentCount,viewCount,hiddenSubscriberCount),' +
    'snippet(title,description,thumbnails,publishedAt,country,defaultLanguage),brandingSettings(image,channel(keywords,featuredChannelsUrls)),status(isLinked))'

  /**
   * The YouTube object that created this channel object.
   */
  public youtube: YouTube

  /**
   * Whether or not this a full channel object.
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
   * This channel's banners.
   */
  public banners: Banners

  /**
   * The date this channel was created.
   */
  public dateCreated: Date

  /**
   * The default language for this channel's uploads.
   */
  public language: string

  /**
   * This channel's view count.
   */
  public views: number

  /**
   * This channel's keywords.
   */
  public keywords: string[]

  /**
   * The channel's uploads. Only available after calling `Channel#fetchVideos()`
   */
  public videos: Playlist

  /**
   * The number of subscribers this channel has. `-1` if the subcount is hidden.
   */
  public subCount: number

  /**
   * This channel's comment count.
   */
  public commentCount: number

  /**
   * The channel's comments. Only defined when `Channel#fetchComments` is called.
   */
  public comments: YTComment[]

  /**
   * The URLs of all of this channel's featured channels.
   */
  public featuredChannels: string[]

  /**
   * The channel's playlists. Only defined when `Channel#fetchPlaylists` is called.
   */
  public playlists: Playlist[]

  /**
   * Only set if the channel is a search result.
   *
   * If the channel has an ongoing livestream, this is `live`.
   * If the channel has an upcoming livestream, this is `upcoming`.
   * If the channel has neither an ongoing nor upcoming livestream, this is `false`.
   */
  public liveStatus: 'live' | 'upcoming' | false

  constructor (youtube: YouTube, data) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  private _init (data) {

    if (data.kind === 'youtube#channel' && data.status.isLinked) {
      const channel = data

      this.id = channel.id

      /* istanbul ignore next */
      if (channel.snippet) {
        this.country = channel.snippet.country
        this.language = channel.snippet.defaultLanguage
      }

      /* istanbul ignore next */
      if (channel.statistics) {
        this.views = Number(channel.statistics.viewCount)
        this.commentCount = Number(channel.statistics.commentCount)

        if (!channel.statistics.hiddenSubscriberCount) {
          this.subCount = Number(channel.statistics.subscriberCount)
        } else {
          this.subCount = -1
        }
      }

      /* istanbul ignore next */
      if (channel.brandingSettings) {
        this.banners = channel.brandingSettings.image

        // Unknown behavior
        /* istanbul ignore next */
        if (channel.brandingSettings.channel) {
          this.keywords = channel.brandingSettings.channel.keywords ? channel.brandingSettings.channel.keywords.split(' ') : []
          this.featuredChannels = channel.brandingSettings.channel.featuredChannelsUrls ?
            channel.brandingSettings.channel.featuredChannelsUrls.map(id => `https://www.youtube.com/channel/${id}`) : []
        }
      }
    } else if (data.kind === 'youtube#searchResult') {
      this.id = data.id.channelId

      /* istanbul ignore next */
      if (data.snippet) {
        // Impossible to test
        /* istanbul ignore next */
        this.liveStatus = data.snippet.liveBroadcastContent !== 'none' ? data.snippet.liveBroadcastContent : false
      }
    } else {
      throw new Error(`Invalid channel type: ${data.kind}`)
    }

    /* istanbul ignore next */
    if (data.snippet) {
      this.profilePictures = data.snippet.thumbnails
      this.dateCreated = new Date(data.snippet.publishedAt)
      this.name = data.snippet.title
      this.about = data.snippet.description
    }

    this.url = `https://youtube.com/channel/${this.id}`
    this.full = data.kind === 'youtube#channel'
  }

  /**
   * Posts a comment on the channel's discussion tab.
   * Must be using an access token with correct scopes.
   * @param text The text of the comment.
   */
  /* istanbul ignore next */
  public async postComment (text: string) {
    const comment = await this.youtube.oauth.postComment(text, this.id)

    if (this.comments !== undefined) {
      this.comments.push(comment)
    } else {
      this.comments = [ comment ]
    }

    return comment
  }

  /**
   * Fetches this channel and reassigns this object to the new channel object.
   * Only useful if `this.full` is false, or if you want updated channel info.
   */
  public async fetch () {
    const channel = await this.youtube.getChannel(this.id)
    return Object.assign(this, channel)
  }

  /**
   * Fetches the channel's videos and assigns them to the `Channel#videos` property.
   */
  public async fetchVideos () {
    if (!(this.data.contentDetails)) {
      await this.fetch()
    }

    const videos = await this.youtube.getPlaylist(this.data.contentDetails.relatedPlaylists.uploads)
    this.videos = videos

    return this.videos
  }

  /**
   * Fetches the channel's discussion tab comments and assigns them to Channel#comments.
   * @param maxResults The maximum amount of comments to fetch
   */
  public async fetchComments (maxResults: number = -1) {
    this.comments = await this.youtube.getChannelComments(this.id, maxResults)
    return this.comments
  }

  /**
   * Fetches the channel's playlists and assigns them to Channel#playlists.
   * @param maxResults The maximum amount of playlists to fetch
   */
  public async fetchPlaylists (maxResults: number = -1) {
    this.playlists = await this.youtube.getChannelPlaylists(this.id, maxResults)
    return this.playlists
  }
}
