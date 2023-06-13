import { YouTube, Playlist, Thumbnail, YTComment, Subscription, ChannelSection, ChannelBrandingSettings, PageOptions } from '..'
import { ChannelParts, ChannelSectionParts, CommentThreadParts, PlaylistParts, SubscriptionParts } from '../types/Parts'

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
   * The channel's uploads. Only available after calling [[Channel.fetchVideos]]
   */
  public videos: Playlist

  /**
   * The number of subscribers this channel has. `-1` if the subcount is hidden.
   */
  public subCount: number

  /**
   * This channel's comment count.
   * @deprecated See https://developers.google.com/youtube/v3/docs/channels#statistics.commentCount
   */
  public commentCount: number

  /**
   * The channel's comments. Only defined when [[Channel.fetchComments]] is called.
   */
  public comments: YTComment[]

  /**
   * The URLs of all of this channel's featured channels. This property is broken for some channels.
   */
  /* istanbul ignore next */
  public featuredChannels: string[]

  /**
   * The channel's playlists. Only defined when [[Channel.fetchPlaylists]] is called.
   */
  public playlists: Playlist[]

  /**
   * The channel's subscriptions. Only defined when [[Channel.fetchSubscriptions]] is called.
   */
  public subscriptions: Subscription[]

  /**
   * The channel's sections. Only defined when [[Channel.fetchSections]] is called.
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

  constructor (youtube: YouTube, data: any, full = false) {
    this.youtube = youtube
    this.data = data
    this.full = full

    this._init(data)
  }

  /**
   * @ignore
   */
  private _init (data: any) {
    const channel = data

    /* istanbul ignore next */
    if (data.kind === 'youtube#channel') {

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

      if (channel.status) {
        this.kids = {
          madeForKids: channel.status.madeForKids,
          selfDeclaredMadeForKids: channel.status.selfDeclaredMadeForKids
        }
      }

      /* istanbul ignore next */
      if (channel.brandingSettings) {
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

          // Broken for many channels
          /* istanbul ignore next */
          this.featuredChannels = channel.brandingSettings.channel.featuredChannelsUrls ?
            channel.brandingSettings.channel.featuredChannelsUrls.map(id => `https://www.youtube.com/channel/${id}`) : []
        }
      }
    } else if (channel.kind === 'youtube#searchResult') {
      this.id = channel.id?.channelId ?? channel.snippet?.channelId

      /* istanbul ignore next */
      if (channel.snippet) {
        // Impossible to test
        /* istanbul ignore next */
        this.liveStatus = channel.snippet.liveBroadcastContent !== 'none' ? channel.snippet.liveBroadcastContent : false
      }
    } else {
      throw new Error(`Invalid channel type: ${channel.kind}`)
    }

    /* istanbul ignore next */
    if (channel.snippet) {
      this.profilePictures = channel.snippet.thumbnails
      this.dateCreated = new Date(channel.snippet.publishedAt)
      this.name = channel.snippet.title
      this.about = channel.snippet.description
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
  public async fetch (parts?: ChannelParts) {
    const channel = await this.youtube.getChannel(this.id, parts)
    return Object.assign(this, channel)
  }

  /**
   * Fetches the channel's playlist of uploads and assigns it to the [[Channel.videos]] property.
   */
  public async fetchVideos (parts?: PlaylistParts) {
    if (!(this.data.contentDetails)) {
      await this.fetch([ 'contentDetails' ])
    }

    const videos = await this.youtube.getPlaylist(this.data.contentDetails.relatedPlaylists.uploads, parts)
    this.videos = videos

    return this.videos
  }

  /**
   * @deprecated See https://support.google.com/youtube/thread/130882091?hl=en&msgid=131295194
   * Fetches the channel's discussion tab comments and assigns them to [[Channel.comments]].
   * @param pages The number of pages of comments to fetch. Defaults to 1. Set <1 to fetch all items.
   */
  /* istanbul ignore next */
  public async fetchComments (pages?: number, parts?: CommentThreadParts) {
    this.comments = await this.youtube.getChannelComments(this.id, { pages }, parts)
    return this.comments
  }

  /**
   * Fetches the channel's playlists and assigns them to [[Channel.playlists]].
   * @param pages The number of pages of playlists to fetch. Defaults to 1. Set <1 to fetch all items.
   */
  public async fetchPlaylists (pages?: number, parts?: PlaylistParts) {
    this.playlists = await this.youtube.getChannelPlaylists(this.id, { pages }, parts)
    return this.playlists
  }

  /**
   * Fetches the channel's subscriptions and assigns them to [[Channel.subscriptions]].
   * @param pages The number of pages of subscriptions to fetch. Defaults to 1. Set <1 to fetch all items.
   */
  /* istanbul ignore next */
  public async fetchSubscriptions (pages?: number, parts?: SubscriptionParts) {
    this.subscriptions = await this.youtube.getChannelSubscriptions(this.id, { pages }, parts)
    return this.subscriptions
  }

  /**
   * Fetches the channel's sections and assigns them to [[Channel.sections]].
   */
  public async fetchSections (parts?: ChannelSectionParts) {
    this.sections = await this.youtube.getChannelSections(this.id, parts)
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

  /**
   * Updates the channel's branding settings.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public updateBranding (branding: ChannelBrandingSettings) {
    return this.youtube.oauth.updateChannelBranding(this.id, branding)
  }

  /**
   * Updates the channel's localizations.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public updateLocalizations (localizations: { [key: string]: { title: string; description: string } }) {
    return this.youtube.oauth.updateChannelLocalizations(this.id, localizations)
  }

  /**
   * Sets whether or not the channel is made for kids.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public setMadeForKids (madeForKids: boolean) {
    return this.youtube.oauth.setChannelMadeForKids(this.id, madeForKids)
  }

  /**
   * Sets the channel's watermark.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public setWatermark (type: 'fromStart' | 'fromEnd', offset: number, duration: number, image: Buffer, imageType: 'png' | 'jpeg') {
    return this.youtube.oauth.setChannelWatermark(this.id, type, offset, duration, image, imageType)
  }

  /**
   * Unsets the channel's watermark.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public unsetWatermark () {
    return this.youtube.oauth.unsetChannelWatermark(this.id)
  }

  /**
   * Uploads and sets the channel's banner.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public async setBanner (image: { data: Buffer; type: 'png' | 'jpeg' }) {
    if (!this.data.brandingSettings) {
      await this.fetch()
    }

    if (!this.data.brandingSettings) {
      return Promise.reject('Unable to fetch channel branding settings')
    }

    if (!this.data.brandingSettings.image) {
      this.data.brandingSettings.image = {}
    }

    this.data.brandingSettings.image.bannerExternalUrl = await this.youtube.oauth.uploadChannelBanner(image)
    return this.youtube.oauth.updateChannelBranding(this.id, this.data.brandingSettings)
  }
}
