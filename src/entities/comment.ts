import { CommentParts } from '../types/Parts'
import { PageOptions, YouTube } from '..'

export class YTComment {
  /**
   * The name of the endpoint used for this entity.
   */
  public static endpoint = 'comments'

  /**
   * The parts to request for this entity.
   */
  public static part = 'snippet'

  /**
   * The fields to request for this entity.
   */
  public static fields = 'items(kind,id,' +
    'snippet(authorDisplayName,authorProfileImageUrl,authorChannelId,authorChannelUrl,textDisplay,textOriginal,parentId,videoId,channelId,canRate,likeCount,publishedAt,updatedAt))'

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
   * Whether or not this a full comment object.
   */
  public full = true

  /**
   * The comment's author.
   */
  public author: {
    /**
     * The author's YouTube username. May not be unique.
     */
    username: string

    /**
     * The author's avatar URL.
     */
    avatar: string

    /**
     * The author's channel ID.
     */
    channelId: string

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
    displayed: string
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
   * The number of likes the comment has received.
   */
  public likes: number

  /**
   * The url of the comment.
   */
  public url?: string

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
   * The ID of the channel that uploaded the video this comment is on, if any.
   */
  public channelId?: string

  /**
   * The ID of the video that this comment is on, if any.
   */
  public videoId?: string

  /**
   * If this comment is a reply, then this is the ID of the comment it is replying to.
   */
  public parentCommentId?: string

  /**
   * Replies directed to the comment. If the comment was fetched from a video,
   * then this will be partially filled. You'll need to use [[Comment.fetchReplies]]
   * to get all of the replies, though.
   */
  public replies: YTComment[]

  constructor (youtube: YouTube, data: any, full = true, replies?: any[]) {
    this.youtube = youtube
    this.data = data
    if (replies) this.data.replies = replies

    this._init(data, replies)
  }

  /**
   * @ignore
   */
  private _init (data: any, replies?: any[]) {
    if (data.kind !== 'youtube#comment') {
      throw new Error(`Invalid comment type: ${data.kind}`)
    }

    const comment = data

    /* istanbul ignore next */
    if (comment.snippet) {
      this.author = {
        username: comment.snippet.authorDisplayName,
        avatar: comment.snippet.authorProfileImageUrl,
        channelId: comment.snippet.authorChannelId?.value,
        channelUrl: comment.snippet.authorChannelUrl
      }

      this.text = {
        displayed: comment.snippet.textDisplay,
        original: comment.snippet.textOriginal
      }

      this.rateable = comment.snippet.canRate
      this.popular = comment.snippet.likeCount >= 100
      this.likes = comment.snippet.likeCount
      this.datePublished = comment.snippet.publishedAt
      this.dateEdited = comment.snippet.updatedAt
      this.channelId = comment.snippet.channelId
      this.videoId = comment.snippet.videoId
      this.parentCommentId = comment.snippet.parentId

      if (comment.snippet.videoId) {
        this.url = `https://youtube.com/watch?v=${comment.snippet.videoId}&lc=${comment.id}`
      }
    }

    this.replies = []

    if (replies) {
      for (const replyData of replies) {
        this.replies.push(new YTComment(this.youtube, replyData))
      }
    }

    this.id = comment.id
  }

  /**
   * Fetches replies to the comment.
   * @param pageOptions The number of pages and maximum number of items per page.
   * Fetches the maximum number of items allowed by the API per page by default.  
   * Set pages to a value <=0 to fetch all.
   * @param parts The parts of the object to fetch (saves quota if you aren't using certain properties!)
   */
  public async fetchReplies (pageOptions?: PageOptions, parts?: CommentParts) {
    this.replies = await this.youtube.getCommentReplies(this.id, pageOptions, parts)
    return this.replies
  }

  /**
   * Edits the comment.
   * Must be using an access token with correct scopes.
   * @param text The new text of the comment.
   */
  /* istanbul ignore next */
  public edit (text: string) {
    return this.youtube.oauth.editComment(this.id, text)
  }

  /**
   * Replies to the comment.
   * Must be using an access token with correct scopes.
   * @param text The text of the reply.
   */
  /* istanbul ignore next */
  public reply (text: string) {
    return this.youtube.oauth.replyToComment(this.id, text)
  }

  /**
   * Marks the comment as spam.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public markAsSpam () {
    return this.youtube.oauth.markCommentAsSpam(this.id)
  }

  /**
   * Sets the comment's moderation status.
   * Must be using an access token with correct scopes.
   * @param status The status to set the comment to.
   * @param banAuthor Whether or not to ban the author of the comment from commenting again.
   * Defaults to false.
   */
  /* istanbul ignore next */
  public setModerationStatus (status?: 'heldForReview' | 'published' | 'rejected', banAuthor: boolean = false) {
    return this.youtube.oauth.setCommentModerationStatus(this.id, status, banAuthor)
  }

  /**
   * Deletes the comment.
   * Must be using an access token with correct scopes.
   */
  /* istanbul ignore next */
  public delete () {
    return this.youtube.oauth.deleteComment(this.id)
  }
}
