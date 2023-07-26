/**
 * @module OAuth
 */

import OAuth from '../oauth'
import * as Data from '../constants'
import * as YT from '..'

export class OAuthComments {
  constructor (public oauth: OAuth) {}

  /**
   * Post a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
   * @param text The text content of the comment.
   * @param channelResolvable The channel to post the comment on.
   * @param videoResolvable The video of the channel to post the comment on.
   * If falsey, the comment will be posted to the channel discussion.
   */
  public async postComment (text: string, channelResolvable: YT.ChannelResolvable, videoResolvable: YT.VideoResolvable): Promise<YT.Comment> {
    this.oauth.checkTokenAndThrow()

    const channel = await this.oauth.youtube._services.resolution.resolve(channelResolvable, YT.Channel)
    const video = await this.oauth.youtube._services.resolution.resolve(videoResolvable, YT.Video)
    const data: typeof Data.COMMENT_THREAD_DATA = JSON.parse(JSON.stringify(Data.COMMENT_THREAD_DATA))

    data.snippet.topLevelComment.snippet.textOriginal = text
    data.snippet.channelId = typeof channel === 'string' ? channel : channel.id
    data.snippet.videoId = typeof video === 'string' ? video : video.id

    const result = await this.oauth.youtube._request.post('commentThreads', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })

    return new YT.Comment(this.oauth.youtube, result, true)
  }

  /**
   * Replies to a [Comment](./Library_Exports.Comment#).  
   * @param commentId The ID of the comment to reply to.
   * @param text The text to reply with.
   * Required for [Comment.url](./Library_Exports.Comment#url) to be correct.
   */
  public async replyToComment (commentId: string, text: string) {
    this.oauth.checkTokenAndThrow()

    const data: typeof Data.COMMENT_DATA = JSON.parse(JSON.stringify(Data.COMMENT_DATA))
    data.snippet = { parentId: commentId, textOriginal: text }

    const response = await this.oauth.youtube._request.post('comments', {
      params: { part: 'id,snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Comment(this.oauth.youtube, response, true)
  }

  /**
   * Edit a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
   * @param commentId The ID of the comment.
   * @param text The new text content of the comment.
   */
  public async editComment (commentId: string, text: string): Promise<YT.Comment> {
    this.oauth.checkTokenAndThrow()

    const data: typeof Data.COMMENT_DATA = JSON.parse(JSON.stringify(Data.COMMENT_DATA))
    data.snippet.textOriginal = text
    data.id = commentId

    const result = await this.oauth.youtube._request.put('comments', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    const comment = new YT.Comment(this.oauth.youtube, result, true)

    return comment
  }

  /**
   * Marks a [Comment](./Library_Exports.Comment#) as spam.  
   * @param commentId The ID of the comment to mark as spam.
   */
  public markCommentAsSpam (commentId: string): Promise<void> {
    this.oauth.checkTokenAndThrow()
    return this.oauth.youtube._request.post('comments/markAsSpam', {
      params: { id: commentId },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Sets the moderation status of a [Comment](./Library_Exports.Comment#)  
   * @param commentId The ID of the comment to set the moderation status of.
   * @param moderationStatus The moderation status to set the comment to.
   * @param banAuthor Whether or not to ban the author from making future comments.
   */
  public setCommentModerationStatus (commentId: string, moderationStatus: 'heldForReview' | 'published' | 'rejected', banAuthor?: boolean): Promise<void> {
    this.oauth.checkTokenAndThrow()

    const data: {
      id: string
      moderationStatus: string
      banAuthor?: boolean
    } = {
      id: commentId,
      moderationStatus
    }

    if (banAuthor) {
      data.banAuthor = banAuthor
    }

    return this.oauth.youtube._request.post('comments/setModerationStatus', {
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Deletes a [Comment](./Library_Exports.Comment#).  
   * @param id The ID of the comment to delete.
   */
  public deleteComment (commentId: string): Promise<void> {
    this.oauth.checkTokenAndThrow()
    return this.oauth.youtube._request.delete('comments', {
      params: { id: commentId },
      authorizationOptions: { accessToken: true }
    })
  }
}
