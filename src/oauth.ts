/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test, they are instead manually tested. */

import YouTube from '.'
import { YTComment, Channel } from './entities'
import { CommentThreadData, SubscriptionData } from './constants'
import { Subscription } from './entities/subscription'

/**
 * @ignore
 */
export class OAuth {
  public youtube: YouTube

  /**
   *
   * @param youtube The YouTube object to retrieve the token from.
   */
  constructor (youtube: YouTube) {
    this.youtube = youtube
  }

  private checkTokenAndThrow () {
    if (this.youtube._tokenType !== 'oauth') {
      throw new Error('Token is not an oauth token')
    }
  }

  // tslint:disable:no-trailing-whitespace
  /**
   * Post a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 03/04/2019 23:20. PASSING
   * @param text The text content of the comment.
   * @param channelId The channel to post the comment on.
   * @param videoId The video of the channel to post the comment on.
   * If falsey, the comment will be posted to the channel discussion.
   */
  // tslint:enable:no-trailing-whitespace
  public async postComment (text: string, channelId: string, videoId?: string): Promise<YTComment> {
    this.checkTokenAndThrow()

    if (text === undefined || text === null || text.trim() === '') {
      return Promise.reject('Invalid comment text')
    }

    const data: typeof CommentThreadData = JSON.parse(JSON.stringify(CommentThreadData))
    data.snippet.topLevelComment.snippet.textOriginal = text
    data.snippet.channelId = channelId

    if (videoId) {
      data.snippet.videoId = videoId
    }

    const result = await this.sendData('post', 'commentThreads', 'snippet', data)
    const type = result.snippet.channelId ? 'channel' : 'video'
    return new YTComment(this.youtube, result.snippet.topLevelComment, type)
  }

  // tslint:disable:no-trailing-whitespace
  /**
   * Edit a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 03/04/2019 23:20. PASSING
   * @param text The new text content of the comment.
   * @param commentId The ID of the comment.
   */
  // tslint:enable:no-trailing-whitespace
  public async editComment (text: string, commentId: string): Promise<YTComment> {
    this.checkTokenAndThrow()

    if (text === undefined || text === null || text.trim() === '') {
      return Promise.reject('Invalid comment text')
    }

    const data: typeof CommentThreadData = JSON.parse(JSON.stringify(CommentThreadData))
    data.snippet.topLevelComment.snippet.textOriginal = text
    data.id = commentId

    const result = await this.sendData('put', 'commentThreads', 'snippet', data)
    const type = result.snippet.channelId ? 'channel' : 'video'
    const comment = new YTComment(this.youtube, result.snippet.topLevelComment, type)

    if (result.replies) {
      result.replies.comments.forEach(reply => {
        const created = new YTComment(this.youtube, reply, type)
        comment.replies.push(created)
      })
    }

    return comment
  }

  // tslint:disable:no-trailing-whitespace
  /**
   * Subscribe to a [[Channel]].  
   * Last tested 03/04/2019 23:17. PASSING
   * @param channelId The channel to subscribe to.
   * @returns A partial subscription object.
   */
  // tslint:enable:no-trailing-whitespace
  public async subscribeToChannel (channelId: string): Promise<Subscription> {
    this.checkTokenAndThrow()

    if (channelId === undefined || channelId === null || channelId.trim() === '') {
      return Promise.reject('Invalid channel ID')
    }

    const data: typeof SubscriptionData = JSON.parse(JSON.stringify(SubscriptionData))
    data.snippet.resourceId.channelId = channelId

    const result = await this.sendData('post', 'subscriptions', 'snippet', data)
    return new Subscription(this.youtube, result)
  }

  // tslint:disable:no-trailing-whitespace
  /**
   * Unsubscribe from a [[Channel]].  
   * Last tested 03/04/2019 23:17. PASSING
   * @param channelId The channel to unsubscribe from.
   */
  // tslint:enable:no-trailing-whitespace
  public async unsubscribeFromChannel (subscriptionId: string): Promise<void> {
    this.checkTokenAndThrow()

    if (subscriptionId === undefined || subscriptionId === null || subscriptionId.trim() === '') {
      return Promise.reject('Invalid subscription ID')
    }

    await this.youtube._request.delete('subscriptions', { id: subscriptionId }, this.youtube.token)
  }

  private sendData (type: 'post' | 'put', endpoint: string, part: string, data: any) {
    return this.youtube._request[type](endpoint, { part }, this.youtube.token, JSON.stringify(data))
  }
}
