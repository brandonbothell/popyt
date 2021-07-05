import { YouTube } from '..'
import { CommentParts } from '../types/Parts'

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
  public full: boolean

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
   * Either the ID of the video that it is commenting on, the ID of the
   * comment it is replying to, or the ID of the channel it is commenting
   * on.
   * Undefined whenever the comment is fetched directly using the ID.
   */
  public parentId: string

  /**
   * Replies directed to the comment. If the comment was fetched from a video,
   * then this will be partially filled. You'll need to use [[Comment.fetchReplies]]
   * to get all of the replies, though.
   */
  public replies: YTComment[]

  constructor (youtube: YouTube, data: any, type: 'video' | 'channel') {
    this.youtube = youtube
    this.data = data

    this._init(data, type)
  }

  /**
   * @ignore
   */
  private _init (data: any, type: 'video' | 'channel') {
    if (data.kind !== 'youtube#comment') {
      throw new Error(`Invalid comment type: ${data.kind}`)
    }

    const comment = data

    /* istanbul ignore next */
    if (comment.snippet) {
      this.author = {
        username: comment.snippet.authorDisplayName,
        avatar: comment.snippet.authorProfileImageUrl,
        channelId: comment.snippet.authorChannelId.value,
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
      this.parentId = comment.snippet.parentId ? comment.snippet.parentId : comment.snippet.videoId ? comment.snippet.videoId : comment.snippet.channelId
    } else {
      this.full = false
    }

    this.id = comment.id

    if (this.parentId) {
      this.url = 'https://youtube.com/' + (type === 'channel' ? `channel/${this.parentId}/discussion?lc=${this.id}` : `watch?v=${this.parentId}&lc=${this.id}`)
    }

    this.replies = []
  }

  /**
   * Fetches replies to the comment.
   * @param maxResults The maximum amount of replies to fetch. Fetches all comments if <=0.
   */
  public async fetchReplies (maxResults: number = 10, parts?: CommentParts) {
    this.replies = await this.youtube.getCommentReplies(this.id, maxResults, parts)
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
