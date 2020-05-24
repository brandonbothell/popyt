import { YouTube, Playlist, Thumbnail, Banners, YTComment, Subscription, ChannelSection } from '..'

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
    'snippet(title,description,thumbnails,publishedAt,country,defaultLanguage),brandingSettings(image,channel(keywords,featuredChannelsUrls)),' +
    'status(isLinked,madeForKids,selfDeclaredMadeForKids))'

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
    default?: Thumbnail
    high?: Thumbnail
    maxres?: Thumbnail
    medium?: Thumbnail
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
   * The channel's subscriptions. Only defined when `Channel#fetchSubscriptions` is called.
   */
  public subscriptions: Subscription[]

  /**
   * The channel's sections. Only defined when [[Channel#fetchSections]] is called.
   */
  public sections: ChannelSection[]

  /**
   * Only set if the channel is a search result.
   *
   * If the channel has an ongoing livestream, this is `live`.
   * If the channel has an upcoming livestream, this is `upcoming`.
   * If the channel has neither an ongoing nor upcoming livestream, this is `false`.
   */
  public liveStatus: 'live' | 'upcoming' | false

  /**
   * Properties to do with videos made for children.
   */
  public kids: {
    /**
     * Whether or not the channel is made for children.
     */
    madeForKids: boolean

    /**
     * Whether or not the owner of the channel marked it as made for kids.
     */
    selfDeclaredMadeForKids: boolean
  }

  constructor (youtube: YouTube, data: any) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    /* istanbul ignore next */
    if (data.kind === 'youtube#channel' && (!data.status || data.status.isLinked)) {
      const channel = data

      this.id = channel.id

      /* istanbul ignore next */
      if (channel.snippet) {
        this.country = channel.snippet.country
        this.language = channel.snippet.defaultLanguage
      } else {
        this.full = false
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
      } else {
        this.full = false
      }

      if (channel.status) {
        this.kids = {
          madeForKids: channel.status.madeForKids,
          selfDeclaredMadeForKids: channel.status.selfDeclaredMadeForKids
        }
      } else {
        this.full = false
      }

      /* istanbul ignore next */
      if (channel.brandingSettings) {
        this.banners = channel.brandingSettings.image

        // Unknown behavior
        /* istanbul ignore next */
        if (channel.brandingSettings.channel) {
          this.keywords = []

          if (channel.brandingSettings.channel.keywords) {
            // Split by spaces but keep quotations intact
            const broken: string[] = channel.brandingSettings.channel.keywords.split(/( )(?=(?:[^"]*"[^"]*")*[^"]*$)/i)

            for (let i = 0; i < broken.length; i++) {
              if (i % 2 === 0) {
                this.keywords.push(broken[i].replace(/(^"|"$)/gi, ''))
              }
            }
          }

          this.featuredChannels = channel.brandingSettings.channel.featuredChannelsUrls ?
            channel.brandingSettings.channel.featuredChannelsUrls.map(id => `https://www.youtube.com/channel/${id}`) : []
        }
      } else {
        this.full = false
      }
    } else if (data.kind === 'youtube#searchResult') {
      this.full = false
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
    } else {
      this.full = false
    }

    this.url = `https://youtube.com/channel/${this.id}`
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
  public async fetchComments (maxResults: number = 10) {
    this.comments = await this.youtube.getChannelComments(this.id, maxResults)
    return this.comments
  }

  /**
   * Fetches the channel's playlists and assigns them to Channel#playlists.
   * @param maxResults The maximum amount of playlists to fetch
   */
  public async fetchPlaylists (maxResults: number = 10) {
    this.playlists = await this.youtube.getChannelPlaylists(this.id, maxResults)
    return this.playlists
  }

  /**
   * Fetches the channel's subscriptions and assigns them to Channel#subscriptions.
   * @param maxResults The maximum amount of subscriptions to fetch
   */
  /* istanbul ignore next */
  public async fetchSubscriptions (maxResults: number = 10) {
    this.subscriptions = await this.youtube.getChannelSubscriptions(this.id, maxResults)
    return this.subscriptions
  }

  /**
   * Fetches the channel's sections and assigns them to [[Channel#sections]].
   */
  public async fetchSections () {
    this.sections = await this.youtube.getChannelSections(this.id)
    return this.sections
  }

  /**
   * Subscribes to the channel.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public subscribe () {
    return this.youtube.oauth.subscribeToChannel(this.id)
  }

  /**
   * Unsubscribes from the channel.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public unsubscribe () {
    return this.youtube.oauth.unsubscribeFromChannel(this.id)
  }
}
