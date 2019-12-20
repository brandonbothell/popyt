/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test, they are instead manually tested. */

import YouTube from '.'
import { request } from './util'
import { YTComment } from './entities'
import { CommentThreadData } from './constants'

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
   * Post a comment on a video or channel discussion.  
   * Last tested 09/26/2019 06:02. PASSING
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
   * Edit a comment on a video or channel discussion.  
   * Last tested 09/26/2019 06:23. PASSING
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

  private sendData (type: 'post' | 'put', endpoint: string, part: string, data: any) {
    return request[type](endpoint, { part }, this.youtube.token, JSON.stringify(data))
  }
}
