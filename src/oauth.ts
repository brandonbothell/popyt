/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test, they are instead manually tested. */

/**
 * @module OAuth
 */

import { Cache } from './util'
import * as Part from './types/Parts'
import * as Data from './constants'
import YouTube, * as YT from '.'

/**
 * All methods requiring an OAuth access token.
 * Use `YouTube.oauth` to access these methods.
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
    if (!this.youtube.hasAccessToken()) {
      throw new Error('Must have an access token for OAuth related methods')
    }
  }

  /**
   * Gets the authorized user's [Channel](./Library_Exports.Channel#).  
   * Last tested 05/18/2020 11:48. PASSING
   */
  public getMe (parts?: Part.ChannelParts): Promise<YT.Channel> {
    this.checkTokenAndThrow()
    return this.youtube._genericService.getItem(YT.Channel, true, null, parts) as Promise<YT.Channel>
  }

  /**
   * Gets the authorized user's [Subscription](./Library_Exports.Subscription#)s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxPerPage The maximum number of subscriptions to fetch per page.
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public async getMySubscriptions (maxPerPage?: number, parts?: Part.SubscriptionParts): Promise<YT.Subscription[]> {
    this.checkTokenAndThrow()

    const results = await this.youtube._genericService.getPaginatedItems({ type: YT.PaginatedItemType.Subscriptions, mine: true, maxPerPage, parts })
    return results.items as YT.Subscription[]
  }

  /**
   * Gets the authorized user's [Playlist](./Library_Exports.Playlist#)s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxPerPage The maximum number of playlists to fetch per page.
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public async getMyPlaylists (maxPerPage?: number, parts?: Part.PlaylistParts): Promise<YT.Playlist[]> {
    this.checkTokenAndThrow()

    const result = await this.youtube._genericService.getPaginatedItems({ type: YT.PaginatedItemType.Playlists, mine: true, maxPerPage, parts })
    return result.items as YT.Playlist[]
  }

  /**
   * Post a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param text The text content of the comment.
   * @param channelResolvable The channel to post the comment on.
   * @param videoResolvable The video of the channel to post the comment on.
   * If falsey, the comment will be posted to the channel discussion.
   */
  public async postComment (text: string, channelResolvable: YT.ChannelResolvable, videoResolvable: YT.VideoResolvable): Promise<YT.Comment> {
    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data: typeof Data.COMMENT_THREAD_DATA = JSON.parse(JSON.stringify(Data.COMMENT_THREAD_DATA))

    data.snippet.topLevelComment.snippet.textOriginal = text
    data.snippet.channelId = typeof channel === 'string' ? channel : channel.id
    data.snippet.videoId = typeof video === 'string' ? video : video.id

    const result = await this.youtube._request.post('commentThreads', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Comment(this.youtube, result, true)
  }

  /**
   * Replies to a [Comment](./Library_Exports.Comment#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param commentId The ID of the comment to reply to.
   * @param text The text to reply with.
   * Required for [Comment.url](./Library_Exports.Comment#url) to be correct.
   */
  public async replyToComment (commentId: string, text: string) {
    this.checkTokenAndThrow()

    const data: typeof Data.COMMENT_DATA = JSON.parse(JSON.stringify(Data.COMMENT_DATA))
    data.snippet = { parentId: commentId, textOriginal: text }

    const response = await this.youtube._request.post('comments', {
      params: { part: 'id,snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Comment(this.youtube, response, true)
  }

  /**
   * Edit a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
   * Last tested 07/05/2021 17:40. PASSING
   * @param commentId The ID of the comment.
   * @param text The new text content of the comment.
   */
  public async editComment (commentId: string, text: string): Promise<YT.Comment> {
    this.checkTokenAndThrow()

    const data: typeof Data.COMMENT_DATA = JSON.parse(JSON.stringify(Data.COMMENT_DATA))
    data.snippet.textOriginal = text
    data.id = commentId

    const result = await this.youtube._request.put('comments', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    const comment = new YT.Comment(this.youtube, result, true)

    return comment
  }

  /**
   * Marks a [Comment](./Library_Exports.Comment#) as spam.  
   * Last tested NEVER
   * @param commentId The ID of the comment to mark as spam.
   */
  public markCommentAsSpam (commentId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.post('comments/markAsSpam', {
      params: { id: commentId },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Sets the moderation status of a [Comment](./Library_Exports.Comment#)  
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

    return this.youtube._request.post('comments/setModerationStatus', {
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Deletes a [Comment](./Library_Exports.Comment#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param id The ID of the comment to delete.
   */
  public deleteComment (commentId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('comments', {
      params: { id: commentId },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Subscribe to a [Channel](./Library_Exports.Channel#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param channelResolvable The channel to subscribe to.
   * @returns A partial subscription object.
   */
  public async subscribeToChannel (channelResolvable: YT.ChannelResolvable): Promise<YT.Subscription> {
    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.SUBSCRIPTION_DATA = JSON.parse(JSON.stringify(Data.SUBSCRIPTION_DATA))

    data.snippet.resourceId.channelId = typeof channel === 'string' ? channel : channel.id

    const result = await this.youtube._request.post('subscriptions', {
      params: { part: 'snippet' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Subscription(this.youtube, result)
  }

  /**
   * Unsubscribe from a [Channel](./Library_Exports.Channel#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param channelId The channel to unsubscribe from.
   */
  public unsubscribeFromChannel (subscriptionId: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('subscriptions', {
      params: { id: subscriptionId },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Like, dislike, or remove a rating from a [Video](./Library_Exports.Video#).
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvable The video to rate.
   * @param rating The rating to give the video.
   */
  public async rateVideo (videoResolvable: YT.VideoResolvable, rating: 'like' | 'dislike' | 'none'): Promise<void> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    return this.youtube._request.post('videos/rate', {
      params: { id: typeof video === 'string' ? video : video.id, rating },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Retrieve your rating on [Videos](./Library_Exports.Video#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvables The video(s) to retrieve your rating from.
   */
  public async getMyRatings (videoResolvables: YT.VideoResolvable[]): Promise<{ videoId: string; rating: 'like' | 'dislike' | 'none' | 'unspecified' }[]> {
    this.checkTokenAndThrow()

    const videoIds = await Promise.all(videoResolvables.map(videoResolvable => this.youtube._resolutionService.resolve(videoResolvable, YT.Video)))

    if (this.youtube._shouldCache) {
      const cached = Cache.get(`get://videos/getRating/${JSON.stringify(videoIds)}`)
      if (cached) return cached
    }

    const response = await this.youtube._request.get('videos/getRating', {
      params: { id: videoIds.join(',') },
      authorizationOptions: { accessToken: true }
    })
    this.youtube._cache(`get://videos/getRating/${JSON.stringify(videoIds)}`, response.items)

    return response.items
  }

  /**
   * Report a [Video](./Library_Exports.Video#) for abuse.  
   * Last tested NEVER
   * @param videoResolvable The video to report.
   * @param reasonId The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list))
   * @param secondaryReasonId An optional second reason for reporting.
   * @param comments Any additional information.
   * @param language The language that the reporter speaks.
   */
  public async reportAbuse (videoResolvable: YT.VideoResolvable, reasonId: string, secondaryReasonId?: string, comments?: string, language?: string): Promise<void> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data: {
      videoId: string
      reasonId: string
      secondaryReasonId?: string
      comments?: string
      language?: string
    } = {
      videoId: typeof video === 'string' ? video : video.id,
      reasonId
    }

    if (secondaryReasonId) data.secondaryReasonId = secondaryReasonId
    if (comments) data.comments = comments
    if (language) data.language = language

    return this.youtube._request.post('videos/reportAbuse', {
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Deletes a [Video](./Library_Exports.Video#).
   * Last tested NEVER
   * @param videoResolvable The video to delete.
   */
  public async deleteVideo (videoResolvable: YT.VideoResolvable): Promise<void> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    return this.youtube._request.delete('videos', {
      params: { id: typeof video === 'string' ? video : video.id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Updates a [Video](./Library_Exports.Video#).  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested NEVER
   * @param video The updated video object.
   */
  public async updateVideo (video: YT.VideoUpdateResource): Promise<YT.Video> {
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

    if (!parts.length) return this.youtube.getVideo(video.id)

    const response = await this.youtube._request.put('videos', {
      params: { part: parts.join(',') },
      data: JSON.stringify(video),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Video(this.youtube, response)
  }

  /**
   * Sets a new [Thumbnail](../modules/Library_Exports#thumbnail) for a [Video](./Library_Exports.Video).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvable The video to set the thumbnail for.
   * @param image The image data and type to upload.
   */
  public async setThumbnail (videoResolvable: YT.VideoResolvable, image: YT.Image): Promise<typeof YT.Video.prototype.thumbnails> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const response = await this.youtube._upload.imagePost('thumbnails/set', {
      params: { videoId: typeof video === 'string' ? video : video.id },
      image,
      authorizationOptions: { accessToken: true }
    })

    return response.items[0]
  }

  /**
   * Creates a [Playlist](./Library_Exports.Playlist#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param title A title for the playlist.
   * @param description A description of the playlist.
   * @param privacy Whether the video is private, public, or unlisted.
   * @param tags Tags pertaining to the playlist.
   * @param language The language of the playlist's default title and description.
   * @param localizations Translated titles and descriptions.
   */
  public async createPlaylist (title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<YT.Playlist> {

    this.checkTokenAndThrow()

    const data: typeof Data.PLAYLIST_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_DATA))
    const parts: string[] = [ 'id', 'player' ]

    data.snippet = { title }
    data.snippet.defaultLanguage = language ? language : this.youtube.language

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (localizations) data.localizations = localizations

    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.youtube._request.post('playlists', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Playlist(this.youtube, response)
  }

  /**
   * Updates a [Playlist](./Library_Exports.Playlist#).  
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
  public async updatePlaylist (playlistResolvable: YT.PlaylistResolvable, title: string,
    description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<YT.Playlist> {

    this.checkTokenAndThrow()

    const playlist = await this.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    const data: typeof Data.PLAYLIST_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_DATA))
    const parts: string[] = [ 'id', 'player', 'snippet' ]

    data.id = typeof playlist === 'string' ? playlist : playlist.id
    data.snippet = { title }
    data.snippet.defaultLanguage = language ? language : this.youtube.language

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (localizations) data.localizations = localizations

    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.youtube._request.put('playlists', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Playlist(this.youtube, response)
  }

  /**
   * Deletes a [Playlist](./Library_Exports.Playlist#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param playlistResolvable The playlist to delete.
   */
  public async deletePlaylist (playlistResolvable: YT.PlaylistResolvable): Promise<void> {
    this.checkTokenAndThrow()

    const playlist = await this.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    return this.youtube._request.delete('playlists', {
      params: { id: typeof playlist === 'string' ? playlist : playlist.id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Adds a [Video](./Library_Exports.Video#) to a [Playlist](./Library_Exports.Playlist#).  
   * Last tested 05/18/2020 11:48. PASSING
   * @param playlistResolvable The playlist to add the video to.
   * @param videoResolvable The video to add to the playlist.
   * @param position The position to add the video in. Defaults to the end.
   * @param note A user-generated note on the video.
   * @returns A partial video object.
   */
  public async addPlaylistItem (playlistResolvable: YT.PlaylistResolvable, videoResolvable: YT.VideoResolvable,
    position?: number, note?: string): Promise<YT.Video> {

    this.checkTokenAndThrow()

    const playlist = await this.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)

    const data: typeof Data.PLAYLIST_ITEM_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_ITEM_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.snippet.playlistId = typeof playlist === 'string' ? playlist : playlist.id
    data.snippet.resourceId.videoId = typeof video === 'string' ? video : video.id

    if (position) data.snippet.position = position
    if (note) data.contentDetails = { note }

    if (note) parts.push('contentDetails')

    const response = await this.youtube._request.post('playlistItems', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Video(this.youtube, response)
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
  public async updatePlaylistItem (id: string, playlistResolvable: YT.PlaylistResolvable,
    videoResolvable: YT.VideoResolvable, position?: number, note?: string): Promise<YT.Video> {

    this.checkTokenAndThrow()

    const playlist = await this.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)

    const data: typeof Data.PLAYLIST_ITEM_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_ITEM_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.id = id
    data.snippet.playlistId = typeof playlist === 'string' ? playlist : playlist.id
    data.snippet.resourceId.videoId = typeof video === 'string' ? video : video.id

    if (position) data.snippet.position = position
    if (note) data.contentDetails = { note }

    if (note) parts.push('contentDetails')

    const response = await this.youtube._request.put('playlistItems', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Video(this.youtube, response)
  }

  /**
   * Deletes a playlist item.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param id The ID of the playlist item to delete.
   */
  public deletePlaylistItem (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('playlistItems', {
      params: { id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Updates a channel's branding settings.
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested NEVER
   * @param channelResolvable The channel to update the branding settings of.
   * @param brandingSettings The new branding settings.
   */
  public async updateChannelBranding (channelResolvable: YT.ChannelResolvable, brandingSettings: YT.ChannelBrandingSettings): Promise<YT.Channel> {
    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.CHANNEL_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_DATA))

    data.id = typeof channel === 'string' ? channel : channel.id
    data.brandingSettings = brandingSettings

    const response = await this.youtube._request.put('channels', {
      params: { part: 'brandingSettings' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Channel(this.youtube, response)
  }

  /**
   * Updates a channel's localizations.
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 05/20/2020 02:58. PASSING
   * @param channelResolvable The channel to update the localizations of.
   * @param localizations The new localizations.
   */
  public async updateChannelLocalizations (channelResolvable: YT.ChannelResolvable,
    localizations: { [key: string]: { title: string; description: string } }): Promise<YT.Channel> {

    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.CHANNEL_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_DATA))

    data.id = typeof channel === 'string' ? channel : channel.id
    data.localizations = localizations

    const response = await this.youtube._request.put('channels', {
      params: { part: 'localizations' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Channel(this.youtube, response)
  }

  /**
   * Sets a channel as made for kids or not made for kids.  
   * Last tested 05/20/2020 02:58. PASSING
   * @param channelResolvable The channel to update.
   * @param madeForKids Whether or not the channel is made for kids.
   */
  public async setChannelMadeForKids (channelResolvable: YT.ChannelResolvable, madeForKids: boolean): Promise<YT.Channel> {
    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.CHANNEL_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_DATA))

    data.id = typeof channel === 'string' ? channel : channel.id
    data.status = {
      selfDeclaredMadeForKids: madeForKids
    }

    const response = await this.youtube._request.put('channels', {
      params: { part: 'status' },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Channel(this.youtube, response)
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
  public async setChannelWatermark (channelResolvable: YT.ChannelResolvable, type: 'fromStart' | 'fromEnd',
    offset: number, duration: number, image: YT.Image): Promise<void> {

    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    const data: typeof Data.WATERMARK_DATA = JSON.parse(JSON.stringify(Data.WATERMARK_DATA))

    data.timing = {
      type: type === 'fromStart' ? 'offsetFromStart' : 'offsetFromEnd',
      offsetMs: offset,
      durationMs: duration
    }

    return this.youtube._upload.multipartImagePost('watermarks/set', {
      authorizationOptions: { accessToken: true },
      params: { channelId: typeof channel === 'string' ? channel : channel.id },
      parts: [
        { data: JSON.stringify(data) },
        { data: image.data, contentType: image.type }
      ]
    })
  }

  /**
   * Unsets a channel's watermark.  
   * Last tested 05/18/2020 18:23. PASSING
   * @param channelResolvable The channel to unset the watermark from.
   */
  public async unsetChannelWatermark (channelResolvable: YT.ChannelResolvable): Promise<void> {
    this.checkTokenAndThrow()

    const channel = await this.youtube._resolutionService.resolve(channelResolvable, YT.Channel)
    return this.youtube._request.post('watermarks/unset', {
      params: { channelId: typeof channel === 'string' ? channel : channel.id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Uploads a channel banner.  
   * Last tested 05/20/2020 03:17. PASSING
   * @param image The channel banner to upload.
   * @returns The URL of the uploaded banner, used as
   * [`BrandingSettings.image.bannerExternalUrl`](../modules/Library_Exports#channelbrandingsettings)
   * in [`OAuth.updateChannelBranding()`](#updatechannelbranding)
   */
  public async uploadChannelBanner (image: YT.Image): Promise<string> {
    this.checkTokenAndThrow()

    const response = await this.youtube._upload.imagePost('channelBanners/insert', {
      authorizationOptions: { accessToken: true },
      image
    })
    return response.url
  }

  /**
   * Adds a [ChannelSection](./Library_Exports.ChannelSection#) to the authorized user's [Channel](./Library_Exports.Channel#).  
   * Last tested 05/24/2020 10:11. PASSING
   * @param type The type of channel section.
   * @param name The name of the channel section.
   * @param position The position of the channel section on the channel homepage.
   * @param playlistsResolvable Any playlists in the channel section.
   * @param channelsResolvable Any channels in the channel section.
   */
  public async addChannelSection (type: YT.ChannelSectionType, name?: string, position?: number, playlistsResolvable?: YT.PlaylistResolvable[],
    channelsResolvable?: (YT.ChannelResolvable)[]): Promise<YT.ChannelSection> {
    this.checkTokenAndThrow()

    const resolvedPlaylists =
      playlistsResolvable ? await Promise.all(playlistsResolvable.map(v => this.youtube._resolutionService.resolve(v, YT.Playlist))) : undefined
    const resolvedChannels =
      channelsResolvable? await Promise.all(channelsResolvable.map(v => this.youtube._resolutionService.resolve(v, YT.Channel))) : undefined

    const data: typeof Data.CHANNEL_SECTION_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_SECTION_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.snippet.type = type

    if (name) data.snippet.title = name
    if (position) data.snippet.position = position
    if (playlistsResolvable || channelsResolvable) data.contentDetails = {}
    if (resolvedPlaylists) data.contentDetails.playlists = resolvedPlaylists.map(resolution => typeof resolution === 'string' ? resolution : resolution.id)
    if (resolvedChannels) data.contentDetails.channels = resolvedChannels.map(resolution => typeof resolution === 'string' ? resolution : resolution.id)

    if (resolvedPlaylists || resolvedChannels) parts.push('contentDetails')

    const response = await this.youtube._request.post('channelSections', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.ChannelSection(this.youtube, response)
  }

  /**
   * Updates a [ChannelSection](./Library_Exports.ChannelSection#).
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 05/24/2020 10:11. PASSING
   * @param id The ID of the channel section.
   * @param type The type of channel section.
   * @param style The style of the channel section.
   * @param name The name of the channel section.
   * @param position The position of the channel section on the channel homepage.
   * @param language The default language of the channel section.
   * @param playlistsResolvable Any playlists in the channel section.
   * @param channelsResolvable Any channels in the channel section.
   * @param localizations Translations of the channel section's title.
   * @param targeting Targeting data for the channel section.
   */
  public async updateChannelSection (id: string, type: YT.ChannelSectionType, name?: string, position?: number, playlistsResolvable?: YT.PlaylistResolvable[],
    channelsResolvable?: (YT.ChannelResolvable)[]): Promise<YT.ChannelSection> {
    this.checkTokenAndThrow()

    const resolvedPlaylists =
      playlistsResolvable ? await Promise.all(playlistsResolvable.map(v => this.youtube._resolutionService.resolve(v, YT.Playlist))) : undefined
    const resolvedChannels =
      channelsResolvable? await Promise.all(channelsResolvable.map(v => this.youtube._resolutionService.resolve(v, YT.Channel))) : undefined

    const data: typeof Data.CHANNEL_SECTION_DATA = JSON.parse(JSON.stringify(Data.CHANNEL_SECTION_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.id = id
    data.snippet.type = type

    if (name) data.snippet.title = name
    if (position) data.snippet.position = position
    if (playlistsResolvable || channelsResolvable) data.contentDetails = {}
    if (resolvedPlaylists) data.contentDetails.playlists = resolvedPlaylists.map(resolution => typeof resolution === 'string' ? resolution : resolution.id)
    if (resolvedChannels) data.contentDetails.channels = resolvedChannels.map(resolution => typeof resolution === 'string' ? resolution : resolution.id)

    if (resolvedPlaylists || resolvedChannels) parts.push('contentDetails')

    const response = await this.youtube._request.put('channelSections', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.ChannelSection(this.youtube, response)
  }

  /**
   * Deletes a [ChannelSection](./Library_Exports.ChannelSection#).
   * Last tested 05/24/2020 10:11. PASSING
   * @param id The ID of the channel section.
   */
  public deleteChannelSection (id: string): Promise<YT.ChannelSection> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('channelSections', {
      params: { id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Get a [Caption](./Library_Exports.Caption#) object from the ID of the caption.  
   * Last tested 06/11/2020 04:50. PASSING
   * @param videoResolvable The Title, URL, or ID of the video to get the caption from.
   * @param captionId The ID of the caption.
   */
  public async getCaption (videoResolvable: YT.VideoResolvable, captionId: string): Promise<YT.Caption> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data = await this.youtube._request.get('captions', {
      params: { part: 'snippet', videoId: typeof video === 'string' ? video : video.id, id: captionId },
      authorizationOptions: { accessToken: true }
    })

    if (!data.items?.length) {
      return Promise.reject(new Error('Caption not found'))
    }

    return new YT.Caption(this.youtube, data.items[0])
  }

  /**
   * Gets the [Caption](./Library_Exports.Caption#)s of a [Video](./Library_Exports.Video#). Used mostly internally with [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).  
   * Last tested 06/11/2020 04:50. PASSING
   * @param videoResolvable The Title, URL, or ID of the video to get the captions from.
   */
  public async getCaptions (videoResolvable: YT.VideoResolvable): Promise<YT.Caption[]> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data = await this.youtube._request.get('captions', {
      params: { part: 'snippet', videoId: typeof video === 'string' ? video : video.id },
      authorizationOptions: { accessToken: true }
    })

    if (!data.items?.length) {
      return Promise.reject(new Error('Captions not found'))
    }

    return data.items.map(caption => new YT.Caption(this.youtube, caption))
  }

  /**
   * Uploads a [Caption](./Library_Exports.Caption#) track for a [Video](./Library_Exports.Video#).  
   * Last tested 06/11/2020 04:50. PASSING
   * @param videoResolvable The video to add the caption track to.
   * @param language The language that the caption track is in.
   * @param name The name of the caption track.
   * @param track The caption track to upload.
   * @param draft Whether or not the caption track is a draft. If it is, it isn't visible to users.
   */
  public async uploadCaption (videoResolvable: YT.VideoResolvable, language: string, name: string, track: Buffer, draft: boolean = false): Promise<YT.Caption> {
    this.checkTokenAndThrow()

    const video = await this.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data: typeof Data.CAPTION_DATA = JSON.parse(JSON.stringify(Data.CAPTION_DATA))

    data.snippet = {
      videoId: typeof video === 'string' ? video : video.id,
      language: language,
      name: name,
      isDraft: draft
    }

    const response = await this.youtube._upload.multipartStreamPost('captions', {
      authorizationOptions: { accessToken: true },
      params: { part: 'snippet' },
      parts: [
        { data: JSON.stringify(data) },
        { data: track }
      ]
    })
    return new YT.Caption(this.youtube, response)
  }

  /**
   * Edits a [Caption](./Library_Exports.Caption#) track.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 06/11/2020 04:50. PASSING
   * @param id The ID of the caption track to edit.
   * @param track The caption track to upload.
   * @param draft Whether or not the caption track is a draft. If it is, it isn't visible to users.
   */
  public async updateCaption (id: string, track?: Buffer, draft: boolean = null): Promise<YT.Caption> {
    this.checkTokenAndThrow()

    const data: typeof Data.CAPTION_DATA = JSON.parse(JSON.stringify(Data.CAPTION_DATA))

    data.id = id
    data.snippet = { isDraft: draft }

    let response

    if (track) {
      if (draft !== null) {
        response = await this.youtube._upload.multipartStreamPut('captions', {
          authorizationOptions: { accessToken: true },
          params: { part: 'snippet' },
          parts: [
            { data: JSON.stringify(data) },
            { data: track }
          ]
        })
      } else {
        response = await this.youtube._upload.streamPut('captions', {
          authorizationOptions: { accessToken: true },
          params: { part: 'snippet' },
          stream: track
        })
      }
    } else {
      response = await this.youtube._request.put('captions', {
        params: { part: 'snippet' },
        data: JSON.stringify(data),
        authorizationOptions: { accessToken: true }
      })
    }

    return new YT.Caption(this.youtube, response)
  }

  /**
   * Downloads a [Caption](./Library_Exports.Caption#) track.  
   * Last tested 06/11/2020 04:50. PASSING
   * @param id The ID of the caption track to download.
   * @param format The file format to download the track in.
   * @param language The language to download the track in.
   */
  public downloadCaption (id: string, format?: 'sbv' | 'scc' | 'srt' | 'ttml' | 'vtt', language?: string): Promise<Buffer> {
    this.checkTokenAndThrow()

    const params: {
      tfmt?: string
      tlang?: string
    } = {}

    if (format) {
      params.tfmt = format
    }

    if (language) {
      params.tlang = language
    }

    return this.youtube._request.get(`captions/${id}`, { params, authorizationOptions: { accessToken: true } })
  }

  /**
   * Deletes a [Caption](./Library_Exports.Caption#) track.  
   * Last tested 06/11/2020 04:50. PASSING
   * @param id The ID of the caption track to delete.
   */
  public deleteCaption (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('captions', { params: { id }, authorizationOptions: { accessToken: true } })
  }

  /**
   * Gets a list of [VideoAbuseReportReason](./Library_Exports.VideoAbuseReportReason#)s.
   * Last tested 05/18/2020 11:48. PASSING
   */
  public async getVideoAbuseReportReasons () {
    this.checkTokenAndThrow()
    return (await this.youtube._genericService.getPaginatedItems({ type: YT.PaginatedItemType.VideoAbuseReportReasons })).items as YT.VideoAbuseReportReason[]
  }
}

export default OAuth
