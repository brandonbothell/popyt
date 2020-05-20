/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test, they are instead manually tested. */

import YouTube, { YTComment, Channel, Playlist, Subscription, Video, VideoAbuseReportReason, VideoUpdateResource, BrandingSettings } from '.'
import { CommentThreadData, SubscriptionData, PlaylistData, PlaylistItemData, CommentData, WatermarkData, ChannelData } from './constants'
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
   * Last tested 05/18/2020 11:48. PASSING
   */
  public getMe (): Promise<Channel> {
    this.checkTokenAndThrow()
    return GenericService.getItem(this.youtube, Channel, true) as Promise<Channel>
  }

  /**
   * Gets the authorized user's [[Subscription]]s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxResults The maximum number of subscriptions to fetch.
   * Fetches 10 by default. Set to a value <=0 to fetch all.
   */
  public getMySubscriptions (maxResults: number = 10): Promise<Subscription[]> {
    this.checkTokenAndThrow()
    return GenericService.getPaginatedItems(this.youtube, 'subscriptions', true, null, maxResults) as Promise<Subscription[]>
  }

  /**
   * Gets the authorized user's [[Playlist]]s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxResults The maximum number of playlists to fetch.
   * Fetches 10 by default. Set to a value <=0 to fetch all.
   */
  public getMyPlaylists (maxResults: number = 10): Promise<Playlist[]> {
    this.checkTokenAndThrow()
    return GenericService.getPaginatedItems(this.youtube, 'playlists:channel', true, null, maxResults) as Promise<Playlist[]>
  }

  /**
   * Post a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param text The text content of the comment.
   * @param channelResolvable The channel to post the comment on.
   * @param videoResolvable The video of the channel to post the comment on.
   * If falsey, the comment will be posted to the channel discussion.
   */
  public async postComment (text: string, channelResolvable: string | Channel, videoResolvable?: string): Promise<YTComment> {
    this.checkTokenAndThrow()

    const channelId = await GenericService.getId(this.youtube, channelResolvable, Channel)
    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
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
   * Last tested 05/18/2020 11:48. PASSING
   * @param commentId The ID of the comment to reply to.
   * @param text The text to reply with.
   * @param commentType What this comment is on - defaults to video.
   * Required for [[YTComment#url]] to be correct.
   */
  public async replyToComment (commentId: string, text: string) {
    this.checkTokenAndThrow()

    const data: typeof CommentData = JSON.parse(JSON.stringify(CommentData))
    data.snippet = { parentId: commentId, textOriginal: text }

    const response = await this.youtube._request.post('comments', { part: 'id,snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new YTComment(this.youtube, response, response.snippet.channelId ? 'channel' : 'video')
  }

  /**
   * Edit a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 05/18/2020 11:48. PASSING
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
   * Last tested 05/18/2020 11:48. PASSING
   * @param commentId The ID of the reply to edit.
   * @param text The text to edit the reply to.
   * @param commentType What this comment is on - defaults to video.
   * Required for [[YTComment#url]] to be correct.
   */
  public async editCommentReply (commentId: string, text: string) {
    this.checkTokenAndThrow()

    const data: typeof CommentData = JSON.parse(JSON.stringify(CommentData))
    data.id = commentId
    data.snippet.textOriginal = text

    const response = await this.youtube._request.put('comments', { part: 'id,snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new YTComment(this.youtube, response, response.snippet.channelId ? 'channel' : 'video')
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
   * Last tested 05/18/2020 11:48. PASSING
   * @param id The ID of the comment to delete.
   */
  public deleteComment (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('comments', { id }, null, this.youtube.accessToken)
  }

  /**
   * Subscribe to a [[Channel]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param channelResolvable The channel to subscribe to.
   * @returns A partial subscription object.
   */
  public async subscribeToChannel (channelResolvable: string | Channel): Promise<Subscription> {
    this.checkTokenAndThrow()

    const channelId = await GenericService.getId(this.youtube, channelResolvable, Channel)
    const data: typeof SubscriptionData = JSON.parse(JSON.stringify(SubscriptionData))

    data.snippet.resourceId.channelId = channelId

    const result = await this.youtube._request.post('subscriptions', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Subscription(this.youtube, result)
  }

  /**
   * Unsubscribe from a [[Channel]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param channelId The channel to unsubscribe from.
   */
  public unsubscribeFromChannel (subscriptionId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('subscriptions', { id: subscriptionId }, null, this.youtube.accessToken)
  }

  /**
   * Like, dislike, or remove a rating from a [[Video]].
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvable The video to rate.
   * @param rating The rating to give the video.
   */
  public async rateVideo (videoResolvable: string | Video, rating: 'like' | 'dislike' | 'none'): Promise<void> {
    this.checkTokenAndThrow()

    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
    return this.youtube._request.post('videos/rate', { id: videoId, rating }, null, null, this.youtube.accessToken)
  }

  /**
   * Retrieve your rating on a [[Video]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvables The video(s) to retrieve your rating from.
   */
  public async getMyRatings (videoResolvables: string[]): Promise<{ videoId: string; rating: 'like' | 'dislike' | 'none' | 'unspecified' }[]> {
    this.checkTokenAndThrow()

    const videoIds = await Promise.all(videoResolvables.map(videoResolvable => GenericService.getId(this.youtube, videoResolvable, Video)))
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
   * @param videoResolvable The video to report.
   * @param reasonId The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list))
   * @param secondaryReasonId An optional second reason for reporting.
   * @param comments Any additional information.
   * @param language The language that the reporter speaks.
   */
  public async reportAbuse (videoResolvable: string | Video, reasonId: string, secondaryReasonId?: string, comments?: string, language?: string): Promise<void> {
    this.checkTokenAndThrow()

    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
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
   * @param videoResolvable The video to delete.
   */
  public async deleteVideo (videoResolvable: string | Video): Promise<void> {
    this.checkTokenAndThrow()

    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
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
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvable The video to set the thumbnail for.
   * @param image The image data and type to upload.
   */
  public async setThumbnail (videoResolvable: string | Video, image: { type: 'jpeg' | 'png'; data: Buffer }): Promise<typeof Video.prototype.thumbnails> {
    this.checkTokenAndThrow()

    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)
    const response = await this.youtube._upload.imagePost('thumbnails/set', image.data, image.type, { videoId }, null, this.youtube.accessToken)

    return response.items[0]
  }

  /**
   * Creates a [[Playlist]].  
   * Last tested 05/18/2020 11:48. PASSING
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
    data.snippet.defaultLanguage = language ? language : this.youtube.language

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (localizations) data.localizations = localizations

    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.youtube._request.post('playlists', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Playlist(this.youtube, response)
  }

  /**
   * Updates a [[Playlist]].  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 05/18/2020 11:48. PASSING
   * @param playlistResolvable The playlist to update.
   * @param title A title for the playlist.
   * @param description A description of the playlist.
   * @param privacy Whether the video is private, public, or unlisted.
   * @param tags Tags pertaining to the playlist.
   * @param language The language of the playlist's default title and description.
   * @param localizations Translated titles and descriptions.
   */
  public async updatePlaylist (playlistResolvable: string | Playlist, title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<Playlist> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, playlistResolvable, Playlist)
    const data: typeof PlaylistData = JSON.parse(JSON.stringify(PlaylistData))
    const parts: string[] = [ 'id', 'player', 'snippet' ]

    data.id = id
    data.snippet = { title }
    data.snippet.defaultLanguage = language ? language : this.youtube.language

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (localizations) data.localizations = localizations

    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.youtube._request.put('playlists', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Playlist(this.youtube, response)
  }

  /**
   * Deletes a [[Playlist]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param playlistResolvable The playlist to delete.
   */
  public async deletePlaylist (playlistResolvable: string | Playlist): Promise<void> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, playlistResolvable, Playlist)
    return this.youtube._request.delete('playlists', { id }, null, this.youtube.accessToken)
  }

  /**
   * Adds a [[Video]] to a [[Playlist]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param playlistResolvable The playlist to add the video to.
   * @param videoResolvable The video to add to the playlist.
   * @param position The position to add the video in. Defaults to the end.
   * @param note A user-generated note on the video.
   * @returns A partial video object.
   */
  public async addPlaylistItem (playlistResolvable: string | Playlist, videoResolvable: string | Video, position?: number, note?: string): Promise<Video> {
    this.checkTokenAndThrow()

    const playlistId = await GenericService.getId(this.youtube, playlistResolvable, Playlist)
    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)

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
   * Last tested 05/18/2020 11:48. PASSING
   * @param id The ID of the playlist item to edit.
   * @param playlistResolvable The playlist that the video is in.
   * @param videoResolvable The video that's in the playlist.
   * @param position The position to change the playlist item's to.
   * @param note The note to change the playlist item's to.
   * @returns A partial video object.
   */
  public async updatePlaylistItem (id: string, playlistResolvable: string | Playlist, videoResolvable: string | Video, position?: number, note?: string): Promise<Video> {
    this.checkTokenAndThrow()

    const playlistId = await GenericService.getId(this.youtube, playlistResolvable, Playlist)
    const videoId = await GenericService.getId(this.youtube, videoResolvable, Video)

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
   * Last tested 05/18/2020 11:48. PASSING
   * @param id The ID of the playlist item to delete.
   */
  public deletePlaylistItem (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('playlistItems', { id }, null, this.youtube.accessToken)
  }

  /**
   * Updates a channel's branding settings.
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested NEVER
   * @param channelResolvable The channel to update the branding settings of.
   * @param brandingSettings The new branding settings.
   */
  public async updateChannelBranding (channelResolvable: string | Channel, brandingSettings: BrandingSettings): Promise<Channel> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, channelResolvable, Channel)
    const data: typeof ChannelData = JSON.parse(JSON.stringify(ChannelData))

    data.id = id
    data.brandingSettings = brandingSettings

    const response = await this.youtube._request.put('channels', { part: 'brandingSettings' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Channel(this.youtube, response)
  }

  /**
   * Updates a channel's localizations.
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 05/20/2020 02:58. PASSING
   * @param channelResolvable The channel to update the localizations of.
   * @param localizations The new localizations.
   */
  public async updateChannelLocalizations (channelResolvable: string | Channel, localizations: { [key: string]: { title: string; description: string } }): Promise<Channel> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, channelResolvable, Channel)
    const data: typeof ChannelData = JSON.parse(JSON.stringify(ChannelData))

    data.id = id
    data.localizations = localizations

    const response = await this.youtube._request.put('channels', { part: 'localizations' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Channel(this.youtube, response)
  }

  /**
   * Sets a channel as made for kids or not made for kids.  
   * Last tested 05/20/2020 02:58. PASSING
   * @param channelResolvable The channel to update.
   * @param madeForKids Whether or not the channel is made for kids.
   */
  public async setChannelMadeForKids (channelResolvable: string | Channel, madeForKids: boolean): Promise<Channel> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, channelResolvable, Channel)
    const data: typeof ChannelData = JSON.parse(JSON.stringify(ChannelData))

    data.id = id
    data.status = {
      selfDeclaredMadeForKids: madeForKids
    }

    const response = await this.youtube._request.put('channels', { part: 'status' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new Channel(this.youtube, response)
  }

  /**
   * Sets a channel's watermark.  
   * Last tested 05/19/2020 18:07. PASSING
   * @param channelResolvable The channel to set the watermark for.
   * @param type The timing type of the watermark.
   * @param offset The offset, in milliseconds, from the start/end of the video to display the watermark from.
   * @param duration The duration, in millseconds, to display the watermark for.
   * @param image The watermark image.
   */
  public async setChannelWatermark (channelResolvable: string | Channel, type: 'fromStart' | 'fromEnd', offset: number, duration: number, image: Buffer, imageType: 'png' | 'jpeg'): Promise<void> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, channelResolvable, Channel)
    const data: typeof WatermarkData = JSON.parse(JSON.stringify(WatermarkData))

    data.timing = {
      type: type === 'fromStart' ? 'offsetFromStart' : 'offsetFromEnd',
      offsetMs: offset,
      durationMs: duration
    }

    return this.youtube._upload.multipartPost('watermarks/set', JSON.stringify(data), image, imageType, { channelId: id }, null, this.youtube.accessToken)
  }

  /**
   * Unsets a channel's watermark.  
   * Last tested 05/18/2020 18:23. PASSING
   * @param channelResolvable The channel to unset the watermark from.
   */
  public async unsetChannelWatermark (channelResolvable: string | Channel): Promise<void> {
    this.checkTokenAndThrow()

    const id = await GenericService.getId(this.youtube, channelResolvable, Channel)
    return this.youtube._request.post('watermarks/unset', { channelId: id }, null, null, this.youtube.accessToken)
  }

  /**
   * Uploads a channel banner.  
   * Last tested 05/20/2020 03:17. PASSING
   * @param image The channel banner to upload.
   * @returns The URL of the uploaded banner, used as
   * [[BrandingSettings#image#bannerExternalUrl]] in [[OAuth#updateChannelBranding]]
   */
  public async uploadChannelBanner (image: { data: Buffer; type: 'png' | 'jpeg' }): Promise<string> {
    this.checkTokenAndThrow()

    const response = await this.youtube._upload.imagePost('channelBanners/insert', image.data, image.type, null, null, this.youtube.accessToken)
    return response.url
  }

  /**
   * Get a list of [[VideoAbuseReportReason]]s.
   * Last tested 05/18/2020 11:48. PASSING
   */
  public getVideoAbuseReportReasons () {
    this.checkTokenAndThrow()
    return GenericService.getPaginatedItems(this.youtube, 'videoAbuseReportReasons', false) as Promise<VideoAbuseReportReason[]>
  }
}
