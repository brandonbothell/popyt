import { YouTube } from '..'
import { Thumbnail, ISODuration } from '../types'
import { YTComment } from './comment'
import { Parser } from '../util'

/**
 * A YouTube video.
 */
export class Video {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'videos'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet,contentDetails,statistics,status'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,contentDetails(duration),statistics(likeCount,dislikeCount,viewCount,commentCount),' +
    'status(privacyStatus,madeForKids,selfDeclaredMadeForKids),snippet(title,description,thumbnails,tags,publishedAt,channelId,liveBroadcastContent,categoryId))'

  /**
   * YouTube object that created the video.
   */
  public youtube: YouTube

  /**
   * The raw data of the video.
   */
  public data: any

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
   * The tags of the video.
   */
  public tags: string[]

  /**
   * The date the video was published.
   */
  public datePublished: Date

  /**
   * The ID of the channel that uploaded the video.
   */
  public channelId: string

  /**
   * @ignore
   */
  public _length: ISODuration

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
   *
   * I would recommend that you try and fetch the video and catch an error
   * if it is from a playlist & marked as private.
   */
  public private: boolean

  /**
   * The video's comments. Only defined when Video#fetchComments is called.
   */
  public comments: YTComment[]

  /**
   * The number of comments on the video.
   */
  public commentCount: number

  /**
   * If this is a ongoing livestream, this is `live`.
   * If this is an upcoming livestream, this is `upcoming`.
   * If this is not a livestream, this is `false`.
   */
  public liveStatus: 'live' | 'upcoming' | false

  /**
   * The video category associated with the video.
   */
  public category: string

  /**
   * Properties to do with videos made for children.
   */
  public kids: {
    /**
     * Whether or not the video was made for children.
     */
    madeForKids: boolean,

    /**
     * Whether or not the poster of the video marked it as made for kids.
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
    if (data.kind === 'youtube#video') {
      const video = data

      /* istanbul ignore next */
      if (video.contentDetails) {
        this._length = Parser.parseIsoDuration(video.contentDetails.duration)
        this.minutes = (this._length.hours * 60) + this._length.minutes
        this.seconds = this._length.seconds
      } else {
        this.full = false
      }

      /* istanbul ignore next */
      if (video.statistics) {
        this.likes = Number(video.statistics.likeCount)
        this.dislikes = Number(video.statistics.dislikeCount)
        this.views = Number(video.statistics.viewCount)
        this.commentCount = Number(video.statistics.commentCount)
      } else {
        this.full = false
      }

      this.id = video.id
    } else if (data.kind === 'youtube#playlistItem') {
      this.full = false
      this.id = data.snippet.resourceId.videoId
      this.private = data.snippet.title === 'Private video'
    } else if (data.kind === 'youtube#searchResult') {
      this.full = false
      this.id = data.id.videoId
    } else {
      throw new Error(`Invalid video type: ${data.kind}`)
    }

    /* istanbul ignore next */
    if (data.snippet) {
      this.title = data.snippet.title
      this.description = data.snippet.description
      this.thumbnails = data.snippet.thumbnails
      this.tags = data.snippet.tags
      this.datePublished = new Date(data.snippet.publishedAt)
      this.channelId = data.snippet.channelId
      // Impossible to test
      /* istanbul ignore next */
      this.liveStatus = data.snippet.liveBroadcastContent !== 'none' ? data.snippet.liveBroadcastContent : false
      this.category = data.snippet.categoryId
    } else {
      this.full = false
    }

    /* istanbul ignore next */
    if (data.status) {
      this.private = data.status.privacyStatus === 'private'
      this.kids = {
        madeForKids: data.status.madeForKids,
        selfDeclaredMadeForKids: data.status.selfDeclaredMadeForKids
      }
    } else {
      this.full = false
    }

    this.url = `https://youtube.com/watch?v=${this.id}`
    this.shortUrl = `https://youtu.be/${this.id}`

    return this
  }

  /**
   * Posts a comment to the video.
   * Must be using an access token with correct scopes.
   * @param text The text of the comment.
   */
  /* istanbul ignore next */
  public async postComment (text: string) {
    const comment = await this.youtube.oauth.postComment(text, this.channelId, this.id)

    if (this.comments !== undefined) {
      this.comments.push(comment)
    } else {
      this.comments = [ comment ]
    }

    return comment
  }

  /**
   * Fetches this video and reassigns this object to the new video object.
   * Only useful if `this.full` is false, or if you want updated video info.
   */
  public async fetch () {
    const video = await this.youtube.getVideo(this.id)
    return Object.assign(this, video)
  }

  /**
   * Fetches the video's comments and assigns them to Video#comments.
   * @param maxResults The maximum amount of comments to fetch
   */
  public async fetchComments (maxResults: number = 10) {
    this.comments = await this.youtube.getVideoComments(this.id, maxResults)
    return this.comments
  }

  /**
   * Gets the user's rating on the video.
   */
  /* istanbul ignore next */
  public async getRating (): Promise<'like' | 'dislike' | 'none' | 'unspecified'> {
    const response = await this.youtube.oauth.getMyRatings([ this.id ])
    return response[0].rating
  }

  /**
   * Likes the video.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public like () {
    return this.youtube.oauth.rateVideo(this.id, 'like')
  }

  /**
   * Dislikes the video.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public dislike () {
    return this.youtube.oauth.rateVideo(this.id, 'dislike')
  }

  /**
   * Removes the user's like/dislike on the video.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public unrate () {
    return this.youtube.oauth.rateVideo(this.id, 'none')
  }

  /**
   * Reports the video for abuse.
   * Must be using an access token with correct scopes.
   * @param reasonId The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list))
   * @param secondaryReasonId An optional second reason for reporting.
   * @param comments Any additional information.
   * @param language The language that the reporter speaks.
   */
  /* istanbul ignore next */
  public reportAbuse (reasonId: string, secondaryReasonId?: string, comments?: string, language?: string) {
    return this.youtube.oauth.reportAbuse(this.id, reasonId, secondaryReasonId, comments, language)
  }

  /**
   * Deletes the video.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public delete () {
    return this.youtube.oauth.deleteVideo(this.id)
  }

  // tslint:disable:no-trailing-whitespace
  /**
   * Updates the video.
   * Must be using an access token with correct scopes.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**
   * @param video The updated video object.
   */
  // tslint:enable:no-trailing-whitespace
  /* istanbul ignore next */
  public async update (video: VideoUpdateResource): Promise<Video> {
    const newVideo = await this.youtube.oauth.updateVideo(video)
    return Object.assign(this, { ...newVideo, full: true })
  }
}
