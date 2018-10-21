import { YouTube } from '..'

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
   * Replies to the comment. If the comment was fetched from a video, then
   * this will be partially filled. You'll need to use Comment#fetchReplies
   * to get all of the replies, though.
   */
  public replies: YTComment[]

  constructor (youtube: YouTube, data) {
    this.youtube = youtube
    this.data = data

    this._init(data)
  }

  private _init (data) {
    if (data.kind !== 'youtube#comment') {
      throw new Error(`Invalid comment type: ${data.kind}`)
    }

    const comment = data

    this.id = comment.id
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
    this.rateable = comment.canRate
    this.popular = comment.viewerRating === 'like' ? true : comment.likeCount >= 100
    this.likes = comment.likeCount
    this.datePublished = comment.publishedAt
    this.dateEdited = comment.updatedAt
    this.parentId = comment.parentId ? comment.parentId : comment.videoId
    this.replies = []
  }

  /**
   * Fetches replies to the comment.
   * @param maxResults The maximum amount of replies to fetch. Fetches all comments if not included
   * or less than 0.
   */
  public async fetchReplies (maxResults: number = -1) {
    this.replies = await this.youtube.getCommentReplies(this.id, maxResults)
    return this.replies
  }
}
