/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test, they are instead manually tested. */

import YouTube, { YTComment, Channel, Playlist, Subscription, Video, VideoAbuseReportReason } from '.'
import { CommentThreadData, SubscriptionData, PlaylistData, PlaylistItemData, CommentData } from './constants'
import { GenericService } from './services'
import { Cache } from './util'

/**
 * All methods requiring an OAuth access token.
 * Use `YouTube#oauth` to access these methods.
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

  /**
   * @ignore
   */
  private checkTokenAndThrow () {
    if (!this.youtube.accessToken) {
      throw new Error('Must have an access token for OAuth related methods')
    }
  }

  /**
   * Gets the authorized user's [[Channel]].  
   * Last tested 03/06/2020 22:21. PASSING
   */
  public getMe (): Promise<Channel> {
    this.checkTokenAndThrow()
    return GenericService.getItem(this.youtube, Channel, true) as Promise<Channel>
  }

  /**
   * Gets the authorized user's [[Subscription]]s.  
   * Last tested 03/06/2020 23:20. PASSING
   * @param maxResults The maximum number of subscriptions to fetch.
   * Fetches 10 by default. Set to a value <=0 to fetch all.
   */
  public getMySubscriptions (maxResults: number = 10): Promise<Subscription[]> {
    this.checkTokenAndThrow()
    return GenericService.getPaginatedItems(this.youtube, 'subscriptions', true, null, maxResults) as Promise<Subscription[]>
  }

  /**
   * Gets the authorized user's [[Playlist]]s.  
   * Last tested 05/16/2020 04:33. PASSING
   * @param maxResults The maximum number of playlists to fetch.
   * Fetches 10 by default. Set to a value <=0 to fetch all.
   */
  public getMyPlaylists (maxResults: number = 10): Promise<Playlist[]> {
    this.checkTokenAndThrow()
    return GenericService.getPaginatedItems(this.youtube, 'playlists:channel', true, null, maxResults) as Promise<Playlist[]>
  }

  /**
   * Post a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 03/04/2020 23:20. PASSING
   * @param text The text content of the comment.
   * @param channelId The channel to post the comment on.
   * @param videoId The video of the channel to post the comment on.
   * If falsey, the comment will be posted to the channel discussion.
   */
  public async postComment (text: string, channelId: string, videoId?: string): Promise<YTComment> {
    this.checkTokenAndThrow()

    const data: typeof CommentThreadData = JSON.parse(JSON.stringify(CommentThreadData))
    data.snippet.topLevelComment.snippet.textOriginal = text
    data.snippet.channelId = channelId

    if (videoId) {
      data.snippet.videoId = videoId
    }

    const result = await this.youtube._request.post('commentThreads', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    const type = result.snippet.channelId ? 'channel' : 'video'
    return new YTComment(this.youtube, result.snippet.topLevelComment, type)
  }

  /**
   * Replies to a [[YTComment]].  
   * Last tested 05/18/2020 11:37. PASSING
   * @param commentId The ID of the comment to reply to.
   * @param text The text to reply with.
   * @param commentType What this comment is on - defaults to video.
   * Required for [[YTComment#url]] to be correct.
   */
  public async replyToComment (commentId: string, text: string, commentType: 'video' | 'channel' = 'video') {
    this.checkTokenAndThrow()

    const data: typeof CommentData = JSON.parse(JSON.stringify(CommentData))
    data.snippet = { parentId: commentId, textOriginal: text }

    const response = await this.youtube._request.post('comments', { part: 'id,snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new YTComment(this.youtube, response, commentType)
  }

  /**
   * Edit a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 03/04/2020 23:20. PASSING
   * @param text The new text content of the comment.
   * @param commentId The ID of the comment.
   */
  public async editComment (text: string, commentId: string): Promise<YTComment> {
    this.checkTokenAndThrow()

    const data: typeof CommentThreadData = JSON.parse(JSON.stringify(CommentThreadData))
    data.snippet.topLevelComment.snippet.textOriginal = text
    data.id = commentId

    const result = await this.youtube._request.put('commentThreads', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
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

  /**
   * Edits a [[YTComment]] reply.  
   * Last tested 05/18/2020 11:37. PASSING
   * @param commentId The ID of the reply to edit.
   * @param text The text to edit the reply to.
   * @param commentType What this comment is on - defaults to video.
   * Required for [[YTComment#url]] to be correct.
   */
  public async editCommentReply (commentId: string, text: string, commentType: 'video' | 'channel' = 'video') {
    this.checkTokenAndThrow()

    const data: typeof CommentData = JSON.parse(JSON.stringify(CommentData))
    data.id = commentId
    data.snippet.textOriginal = text

    const response = await this.youtube._request.put('comments', { part: 'id,snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new YTComment(this.youtube, response, commentType)
  }

  /**
   * Marks a [[YTComment]] as spam.  
   * Last tested NEVER
   * @param commentId The ID of the comment to mark as spam.
   */
  public markCommentAsSpam (commentId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.post('comments/markAsSpam', { id: commentId }, null, null, this.youtube.accessToken)
  }

  /**
   * Sets the moderation status of a [[YTComment]]  
   * Last tested NEVER
   * @param commentId The ID of the comment to set the moderation status of.
   * @param moderationStatus The moderation status to set the comment to.
   * @param banAuthor Whether or not to ban the author from making future comments.
   */
  public setCommentModerationStatus (commentId: string, moderationStatus: 'heldForReview' | 'published' | 'rejected', banAuthor?: boolean): Promise<void> {
    this.checkTokenAndThrow()

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

    return this.youtube._request.post('comments/setModerationStatus', data, null, null, this.youtube.accessToken)
  }

  /**
   * Deletes a [[YTComment]].  
   * Last tested 05/18/2020 11:37. PASSING
   * @param id The ID of the comment to delete.
   */
  public deleteComment (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('comments', { id }, null, this.youtube.accessToken)
  }

  /**
   * Subscribe to a [[Channel]].  
   * Last tested 03/04/2020 23:17. PASSING
   * @param channelId The channel to subscribe to.
   * @returns A partial subscription object.
   */
  public async subscribeToChannel (channelId: string): Promise<Subscription> {
    this.checkTokenAndThrow()

    const data: typeof SubscriptionData = JSON.parse(JSON.stringify(SubscriptionData))
    data.snippet.resourceId.channelId = channelId

    const result = await this.youtube._request.post('subscriptions', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Subscription(this.youtube, result)
  }

  /**
   * Unsubscribe from a [[Channel]].  
   * Last tested 03/04/2020 23:17. PASSING
   * @param channelId The channel to unsubscribe from.
   */
  public unsubscribeFromChannel (subscriptionId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('subscriptions', { id: subscriptionId }, null, this.youtube.accessToken)
  }

  /**
   * Like, dislike, or remove a rating from a [[Video]].
   * Last tested 03/07/2020 02:15. PASSING
   * @param videoId The video to rate.
   * @param rating The rating to give the video.
   */
  public rateVideo (videoId: string, rating: 'like' | 'dislike' | 'none'): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.post('videos/rate', { id: videoId, rating }, null, null, this.youtube.accessToken)
  }

  /**
   * Retrieve your rating on a [[Video]].  
   * Last tested 03/07/2020 02:35. PASSING
   * @param videoId The video to retrieve your rating from.
   */
  public async getMyRatings (videoIds: string[]): Promise<{ videoId: string; rating: 'like' | 'dislike' | 'none' | 'unspecified' }[]> {
    this.checkTokenAndThrow()

    const cached = Cache.get(`get://videos/getRating/${JSON.stringify(videoIds)}`)

    if (this.youtube._shouldCache && cached) {
      return cached
    }

    const response = await this.youtube._request.api('videos/getRating', { id: videoIds.join(',') }, null, this.youtube.accessToken)
    this.youtube._cache(`get://videos/getRating/${JSON.stringify(videoIds)}`, response.items)

    return response.items
  }

  /**
   * Report a [[Video]] for abuse.  
   * Last tested NEVER
   * @param videoId The video to report.
   * @param reasonId The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list))
   * @param secondaryReasonId An optional second reason for reporting.
   * @param comments Any additional information.
   * @param language The language that the reporter speaks.
   */
  public reportAbuse (videoId: string, reasonId: string, secondaryReasonId?: string, comments?: string, language?: string): Promise<void> {
    this.checkTokenAndThrow()

    const data: {
      videoId: string
      reasonId: string
      secondaryReasonId?: string
      comments?: string
      language?: string
    } = {
      videoId,
      reasonId
    }

    if (secondaryReasonId) data.secondaryReasonId = secondaryReasonId
    if (comments) data.comments = comments
    if (language) data.language = language

    return this.youtube._request.post('videos/reportAbuse', null, JSON.stringify(data), null, this.youtube.accessToken)
  }

  /**
   * Deletes a [[Video]].
   * Last tested NEVER
   * @param videoId The video to delete.
   */
  public deleteVideo (videoId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('videos', { id: videoId }, null, this.youtube.accessToken)
  }

  /**
   * Updates a [[Video]].  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested NEVER
   * @param video The updated video object.
   */
  public async updateVideo (video: VideoUpdateResource): Promise<Video> {
    this.checkTokenAndThrow()

    const parts = []

    if (video.snippet) {
      parts.push('snippet')
      if (Array.isArray(video.snippet.tags)) video.snippet.tags = video.snippet.tags.join(',')
    }

    if (video.status) {
      parts.push('status')
      if (video.status.publishAt instanceof Date) video.status.publishAt = video.status.publishAt.toISOString()
    }

    if (video.recordingDetails) {
      parts.push('recordingDetails')

      if (video.recordingDetails.recordingDate instanceof Date) {
        video.recordingDetails.recordingDate = video.recordingDetails.recordingDate.toISOString()
      }
    }

    if (video.localizations) parts.push('localizations')

    if (parts.length === 0) {
      return this.youtube.getVideo(video.id)
    }

    const response = await this.youtube._request.put('videos', { part: parts.join(',') }, JSON.stringify(video), null, this.youtube.accessToken)
    return new Video(this.youtube, response)
  }

  /**
   * Sets a new [[Thumbnail]] for a [[Video]].  
   * Last tested 03/07/2020 11:25. PASSING
   * @param videoId The video to set the thumbnail for.
   * @param image The image data and type to upload.
   */
  public async setThumbnail (videoId: string, image: { type: 'jpeg' | 'png'; data: Buffer }): Promise<typeof Video.prototype.thumbnails> {
    this.checkTokenAndThrow()

    const response = await this.youtube._upload.imagePost('thumbnails/set', image.data, image.type, { videoId }, null, this.youtube.accessToken)
    return response.items[0]
  }

  /**
   * Creates a [[Playlist]].  
   * Last tested 05/16/2020 04:33. PASSING
   * @param title A title for the playlist.
   * @param description A description of the playlist.
   * @param privacy Whether the video is private, public, or unlisted.
   * @param tags Tags pertaining to the playlist.
   * @param language The language of the playlist's default title and description.
   * @param localizations Translated titles and descriptions.
   */
  public async createPlaylist (title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<Playlist> {
    this.checkTokenAndThrow()

    const data: typeof PlaylistData = JSON.parse(JSON.stringify(PlaylistData))
    const parts: string[] = [ 'id', 'player' ]

    data.snippet = { title }

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (language) data.snippet.defaultLanguage = language
    if (localizations) data.localizations = localizations

    if (description || tags || language) parts.push('snippet')
    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.youtube._request.post('playlists', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Playlist(this.youtube, response)
  }

  /**
   * Updates a [[Playlist]].  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 05/16/2020 04:33. PASSING
   * @param id The ID of the playlist to update.
   * @param title A title for the playlist.
   * @param description A description of the playlist.
   * @param privacy Whether the video is private, public, or unlisted.
   * @param tags Tags pertaining to the playlist.
   * @param language The language of the playlist's default title and description.
   * @param localizations Translated titles and descriptions.
   */
  public async updatePlaylist (id: string, title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<Playlist> {
    this.checkTokenAndThrow()

    const data: typeof PlaylistData = JSON.parse(JSON.stringify(PlaylistData))
    const parts: string[] = [ 'id', 'player' ]

    data.id = id
    data.snippet = { title }

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (language) data.snippet.defaultLanguage = language
    if (localizations) data.localizations = localizations

    if (description || tags || language) parts.push('snippet')
    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.youtube._request.put('playlists', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Playlist(this.youtube, response)
  }

  /**
   * Deletes a [[Playlist]].  
   * Last tested 03/19/2020 03:18. PASSING
   * @param id The ID of the playlist to delete.
   */
  public deletePlaylist (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('playlists', { id }, null, this.youtube.accessToken)
  }

  /**
   * Adds a [[Video]] to a [[Playlist]].  
   * Last tested 05/16/2020 04:33. PASSING
   * @param playlistId The ID of the playlist to add the video to.
   * @param videoId The ID of the video to add to the playlist.
   * @param position The position to add the video in. Defaults to the end.
   * @param note A user-generated note on the video.
   * @returns A partial video object.
   */
  public async addPlaylistItem (playlistId: string, videoId: string, position?: number, note?: string): Promise<Video> {
    this.checkTokenAndThrow()

    const data: typeof PlaylistItemData = JSON.parse(JSON.stringify(PlaylistItemData))
    const parts: string[] = [ 'id', 'snippet' ]

    data.snippet.playlistId = playlistId
    data.snippet.resourceId.videoId = videoId

    if (position) data.snippet.position = position
    if (note) data.contentDetails = { note }

    if (note) parts.push('contentDetails')

    const response = await this.youtube._request.post('playlistItems', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Video(this.youtube, response)
  }

  /**
   * Edits a playlist item.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 05/16/2020 04:51. PASSING
   * @param id The ID of the playlist item to edit.
   * @param playlistId The ID of the playlist that the video is in.
   * @param videoId The ID of the video that is in the playlist.
   * @param position The position to change the playlist item's to.
   * @param note The note to change the playlist item's to.
   * @returns A partial video object.
   */
  public async updatePlaylistItem (id: string, playlistId: string, videoId: string, position?: number, note?: string): Promise<Video> {
    this.checkTokenAndThrow()

    const data: typeof PlaylistItemData = JSON.parse(JSON.stringify(PlaylistItemData))
    const parts: string[] = [ 'id', 'snippet' ]

    data.id = id
    data.snippet.playlistId = playlistId
    data.snippet.resourceId.videoId = videoId

    if (position) data.snippet.position = position
    if (note) data.contentDetails = { note }

    if (note) parts.push('contentDetails')

    const response = await this.youtube._request.put('playlistItems', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Video(this.youtube, response)
  }

  /**
   * Deletes a playlist item.  
   * Last tested 05/16/2020 04:54. PASSING
   * @param id The ID of the playlist item to delete.
   */
  public deletePlaylistItem (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('playlistItems', { id }, null, this.youtube.accessToken)
  }

  /**
   * Get a list of [[VideoAbuseReportReason]]s.
   * Last tested 03/14/2020 10:47. PASSING
   */
  public getVideoAbuseReportReasons () {
    this.checkTokenAndThrow()
    return GenericService.getPaginatedItems(this.youtube, 'videoAbuseReportReasons', false) as Promise<VideoAbuseReportReason[]>
  }
}
