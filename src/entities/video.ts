import { Parser } from '../util'
import { CommentThreadParts, VideoParts } from '../types/Parts'
import { Thumbnail, ISODuration, PageOptions, PaginatedResponse } from '../types'
import { YouTube, VideoUpdateResource, Caption } from '..'
import { Comment } from './comment'

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
  public static part =
    'contentDetails,localizations,recordingDetails,snippet,statistics,status'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,' +
    'contentDetails,recordingDetails,' +
    'statistics,status,localizations,' +
    'snippet)'

  /**
   * YouTube object that created the video.
   */
  public youtube: YouTube

  /**
   * The raw data of the video.
   */
  public data: any

  /**
   * Whether or not this is a full video object (would it be the same if we ran [Video.fetch](./Library_Exports.Video#fetch) under the same conditions as last time?).
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
    default?: Thumbnail
    medium?: Thumbnail
    high?: Thumbnail
    standard?: Thumbnail
    maxres?: Thumbnail
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
   * The date the video was recorded. This is specified by the uploader.
   */
  public dateRecorded: Date

  /**
   * Information on the channel that uploaded the video.
   */
  public channel: {
    id: string
    name: string
  }

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
   * The video's comments. Only defined when [Video.fetchComments](./Library_Exports.Video#fetchComments) is called.
   */
  public comments: PaginatedResponse<Comment>

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
    madeForKids: boolean

    /**
     * Whether or not the poster of the video marked it as made for kids.
     */
    selfDeclaredMadeForKids: boolean
  }

  /**
   * The caption data associated with this video. Only available after running [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).
   */
  public captions: Caption[]

  /**
   * If this video was fetched from a playlist, this can be populated with a user-created note about the video.
   */
  public note: string

  /**
   * The license this video falls under.
   */
  public license: 'creativeCommon' | 'youtube'

  /**
   * The localized titles and descriptions of this video, if any.
   */
  public localizations: { [language: string]: { title: string; description: string } }

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
    if (data.kind === 'youtube#video') {
      this.id = data.id
      this.localizations = data.localizations

      if (data.contentDetails) {
        this._length = Parser.parseIsoDuration(data.contentDetails.duration)
        this.minutes = (this._length.hours * 60) + this._length.minutes
        this.seconds = this._length.seconds
      }

      if (data.recordingDetails?.recordingDate) {
        this.dateRecorded = new Date(data.recordingDetails.recordingDate)
      }
    } else if (data.kind === 'youtube#playlistItem') {
      this.id = data.snippet?.resourceId.videoId

      if (data.contentDetails) {
        this.note = data.contentDetails.note
        this.datePublished = new Date(data.contentDetails.videoPublishedAt)
      }
    } else if (data.kind === 'youtube#searchResult') {
      this.id = data.id.videoId
    } else {
      throw new Error(`Invalid video type: ${data.kind}`)
    }

    if (data.snippet) {
      if (!this.datePublished) this.datePublished = new Date(data.snippet.publishedAt)
      this.title = data.snippet.title
      this.description = data.snippet.description
      this.thumbnails = data.snippet.thumbnails
      this.tags = data.snippet.tags
      this.channel = {
        id: data.snippet.channelId || data.snippet.videoOwnerChannelId,
        name: data.snippet.channelTitle || data.snippet.videoOwnerChannelTitle
      }
      // Impossible to test
      this.liveStatus = data.snippet.liveBroadcastContent !== 'none' ? data.snippet.liveBroadcastContent : false
      this.category = data.snippet.categoryId
    }

    if (data.statistics) {
      this.likes = Number(data.statistics.likeCount)
      this.dislikes = Number(data.statistics.dislikeCount)
      this.views = Number(data.statistics.viewCount)
      this.commentCount = Number(data.statistics.commentCount)
    }

    if (data.status) {
      this.private = data.status.privacyStatus === 'private'
      this.kids = 'madeForKids' in data.status ? {
        madeForKids: data.status.madeForKids,
        selfDeclaredMadeForKids: data.status.selfDeclaredMadeForKids
      } : undefined
      this.license = data.status.license
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
  public async postComment (text: string) {
    const comment = await this.youtube.oauth.comments.postComment(text, this.channel.id, this.id)

    if (!this.comments) this.comments = { items: [ comment ] }
    else this.comments.items.push(comment)

    return comment
  }

  /**
   * Fetches this video from the API and reassigns this object to the new video object.
   * Only useful if `this.full` is false, or if you want updated video info.
   */
  public async fetch (parts?: VideoParts) {
    const video = await this.youtube.getVideo(this.id, parts)
    return Object.assign(this, video)
  }

  /**
   * Fetches the video's comments from the API and assigns them to [Video.comments](./Library_Exports.Video#comments).
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the object to fetch (saves quota if you aren't using certain properties!)
   */
  public async fetchComments (pageOptions?: PageOptions, order?: 'time' | 'relevance', parts?: CommentThreadParts) {
    this.comments = await this.youtube.getVideoComments(this.id, pageOptions, order, parts)
    return this.comments
  }

  /**
   * Gets the user's rating on the video.
   * Must be using an access token with correct scopes.
   */
  public async getRating (): Promise<'like' | 'dislike' | 'none' | 'unspecified'> {
    const response = await this.youtube.oauth.videos.getMyRatings([ this.id ])
    return response[0].rating
  }

  /**
   * Likes the video.
   * Must be using an access token with correct scopes.
   */
  public like () {
    return this.youtube.oauth.videos.rateVideo(this.id, 'like')
  }

  /**
   * Dislikes the video.
   * Must be using an access token with correct scopes.
   */
  public dislike () {
    return this.youtube.oauth.videos.rateVideo(this.id, 'dislike')
  }

  /**
   * Removes the user's like/dislike on the video.
   * Must be using an access token with correct scopes.
   */
  public unrate () {
    return this.youtube.oauth.videos.rateVideo(this.id, 'none')
  }

  /**
   * Reports the video for abuse.
   * Must be using an access token with correct scopes.
   * @param reasonId The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list))
   * @param secondaryReasonId An optional second reason for reporting.
   * @param comments Any additional information.
   * @param language The language that the reporter speaks.
   */
  public reportAbuse (reasonId: string, secondaryReasonId?: string, comments?: string, language?: string) {
    return this.youtube.oauth.videos.reportAbuse(this.id, reasonId, secondaryReasonId, comments, language)
  }

  /**
   * Deletes the video.
   * Must be using an access token with correct scopes.
   */
  public delete () {
    return this.youtube.oauth.videos.deleteVideo(this.id)
  }

  /**
   * Edits the video.
   * Must be using an access token with correct scopes.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**
   * @param video The updated video object.
   */
  public async update (video: Omit<VideoUpdateResource, 'id'>): Promise<Video> {
    const newVideo = await this.youtube.oauth.videos.updateVideo({ ...video, id: this.id })
    return Object.assign(this, { ...newVideo, full: true })
  }

  /**
   * Sets a new thumbnail for a video.
   * Must be using an access token with correct scopes.
   * @param image The image data and type to upload.
   */
  public async setThumbnail (image: { type: 'jpeg' | 'png'; data: Buffer }): Promise<typeof Video.prototype.thumbnails> {
    const newThumbnails = await this.youtube.oauth.videos.setThumbnail(this.id, image)
    return Object.assign(this.thumbnails, newThumbnails)
  }

  /**
   * Fetches the captions for the video from the API.
   * Must be using an access token with correct scopes.
   */
  public async fetchCaptions (): Promise<Caption[]> {
    this.captions = await this.youtube.oauth.captions.getCaptions(this.id)
    return this.captions
  }

  /**
   * Uploads a caption track for a video.
   * Must be using an access token with correct scopes.
   * @param language The language of the track.
   * @param name The name of the track.
   * @param track The caption track to upload.
   * @param draft Whether or not the track is a draft.
   */
  public async uploadCaption (language: string, name: string, track: Buffer, draft: boolean = false): Promise<Caption> {
    const toReturn = await this.youtube.oauth.captions.uploadCaption(this.id, language, name, track, draft)
    return toReturn
  }
}
