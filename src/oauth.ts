/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test, they are instead manually tested. */

/**
 * @module OAuth
 */

import YouTube,
{
  YTComment,
  Channel,
  Playlist,
  Subscription,
  Video,
  VideoAbuseReportReason,
  ChannelSection,
  VideoUpdateResource,
  ChannelBrandingSettings,
  ChannelSectionType,
  Caption,
  PaginatedItemType
} from '.'
import { COMMENT_THREAD_DATA, SUBSCRIPTION_DATA, PLAYLIST_DATA, PLAYLIST_ITEM_DATA, COMMENT_DATA, WATERMARK_DATA, CHANNEL_DATA, CHANNEL_SECTION_DATA, CAPTION_DATA } from './constants'
import { GenericService } from './services'
import { ChannelParts, PlaylistParts, SubscriptionParts } from './types/Parts'
import { Cache } from './util'

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
    if (!this.youtube.accessToken) {
      throw new Error('Must have an access token for OAuth related methods')
    }
  }

  /**
   * Gets the authorized user's [[Channel]].  
   * Last tested 05/18/2020 11:48. PASSING
   */
  public getMe (parts?: ChannelParts): Promise<Channel> {
    this.checkTokenAndThrow()
    return this.youtube._genericService.getItem(Channel, true, null, parts) as Promise<Channel>
  }

  /**
   * Gets the authorized user's [[Subscription]]s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxPerPage The maximum number of subscriptions to fetch per page.
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public async getMySubscriptions (maxPerPage?: number, parts?: SubscriptionParts): Promise<Subscription[]> {
    this.checkTokenAndThrow()
    return (await this.youtube._genericService.getPaginatedItems({ type: PaginatedItemType.Subscriptions, mine: true, maxPerPage, parts })).items as Subscription[]
  }

  /**
   * Gets the authorized user's [[Playlist]]s.  
   * Last tested 05/18/2020 11:48. PASSING
   * @param maxPerPage The maximum number of playlists to fetch per page.
   * Fetches the maximum allowed by the API by default.
   * Set to a value <=0 to fetch all.
   */
  public async getMyPlaylists (maxPerPage?: number, parts?: PlaylistParts): Promise<Playlist[]> {
    this.checkTokenAndThrow()
    return (await this.youtube._genericService.getPaginatedItems({ type: PaginatedItemType.Playlists, mine: true, maxPerPage, parts })).items as Playlist[]
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

    const channelId = await this.youtube._genericService.getId(channelResolvable, Channel)
    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
    const data: typeof COMMENT_THREAD_DATA = JSON.parse(JSON.stringify(COMMENT_THREAD_DATA))

    data.snippet.topLevelComment.snippet.textOriginal = text
    data.snippet.channelId = channelId

    if (videoId) {
      data.snippet.videoId = videoId
    }

    const result = await this.youtube._request.post('commentThreads', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new YTComment(result.snippet.topLevelComment, true)
  }

  /**
   * Replies to a [[YTComment]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param commentId The ID of the comment to reply to.
   * @param text The text to reply with.
   * Required for [[YTComment.url]] to be correct.
   */
  public async replyToComment (commentId: string, text: string) {
    this.checkTokenAndThrow()

    const data: typeof COMMENT_DATA = JSON.parse(JSON.stringify(COMMENT_DATA))
    data.snippet = { parentId: commentId, textOriginal: text }

    const response = await this.youtube._request.post('comments', { part: 'id,snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    return new YTComment(response, true)
  }

  /**
   * Edit a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
   * Last tested 07/05/2021 17:40. PASSING
   * @param commentId The ID of the comment.
   * @param text The new text content of the comment.
   */
  public async editComment (commentId: string, text: string): Promise<YTComment> {
    this.checkTokenAndThrow()

    const data: typeof COMMENT_DATA = JSON.parse(JSON.stringify(COMMENT_DATA))
    data.snippet.textOriginal = text
    data.id = commentId

    console.log(data)

    const result = await this.youtube._request.put('comments', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    const comment = new YTComment(result, true)

    if (result.replies) {
      result.replies.comments.forEach(reply => {
        const created = new YTComment(reply, true)
        comment.replies.push(created)
      })
    }

    return comment
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

    const channelId = await this.youtube._genericService.getId(channelResolvable, Channel)
    const data: typeof SUBSCRIPTION_DATA = JSON.parse(JSON.stringify(SUBSCRIPTION_DATA))

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

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
    return this.youtube._request.post('videos/rate', { id: videoId, rating }, null, null, this.youtube.accessToken)
  }

  /**
   * Retrieve your rating on a [[Video]].  
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvables The video(s) to retrieve your rating from.
   */
  public async getMyRatings (videoResolvables: (string | Video)[]): Promise<{ videoId: string; rating: 'like' | 'dislike' | 'none' | 'unspecified' }[]> {
    this.checkTokenAndThrow()

    const videoIds = await Promise.all(videoResolvables.map(videoResolvable => this.youtube._genericService.getId(videoResolvable, Video)))
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

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
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

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
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

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
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

    const data: typeof PLAYLIST_DATA = JSON.parse(JSON.stringify(PLAYLIST_DATA))
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

    const id = await this.youtube._genericService.getId(playlistResolvable, Playlist)
    const data: typeof PLAYLIST_DATA = JSON.parse(JSON.stringify(PLAYLIST_DATA))
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

    const id = await this.youtube._genericService.getId(playlistResolvable, Playlist)
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

    const playlistId = await this.youtube._genericService.getId(playlistResolvable, Playlist)
    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)

    const data: typeof PLAYLIST_ITEM_DATA = JSON.parse(JSON.stringify(PLAYLIST_ITEM_DATA))
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

    const playlistId = await this.youtube._genericService.getId(playlistResolvable, Playlist)
    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)

    const data: typeof PLAYLIST_ITEM_DATA = JSON.parse(JSON.stringify(PLAYLIST_ITEM_DATA))
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
  public async updateChannelBranding (channelResolvable: string | Channel, brandingSettings: ChannelBrandingSettings): Promise<Channel> {
    this.checkTokenAndThrow()

    const id = await this.youtube._genericService.getId(channelResolvable, Channel)
    const data: typeof CHANNEL_DATA = JSON.parse(JSON.stringify(CHANNEL_DATA))

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

    const id = await this.youtube._genericService.getId(channelResolvable, Channel)
    const data: typeof CHANNEL_DATA = JSON.parse(JSON.stringify(CHANNEL_DATA))

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

    const id = await this.youtube._genericService.getId(channelResolvable, Channel)
    const data: typeof CHANNEL_DATA = JSON.parse(JSON.stringify(CHANNEL_DATA))

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

    const id = await this.youtube._genericService.getId(channelResolvable, Channel)
    const data: typeof WATERMARK_DATA = JSON.parse(JSON.stringify(WATERMARK_DATA))

    data.timing = {
      type: type === 'fromStart' ? 'offsetFromStart' : 'offsetFromEnd',
      offsetMs: offset,
      durationMs: duration
    }

    return this.youtube._upload.multipartImagePost('watermarks/set', JSON.stringify(data), image, imageType, { channelId: id }, null, this.youtube.accessToken)
  }

  /**
   * Unsets a channel's watermark.  
   * Last tested 05/18/2020 18:23. PASSING
   * @param channelResolvable The channel to unset the watermark from.
   */
  public async unsetChannelWatermark (channelResolvable: string | Channel): Promise<void> {
    this.checkTokenAndThrow()

    const id = await this.youtube._genericService.getId(channelResolvable, Channel)
    return this.youtube._request.post('watermarks/unset', { channelId: id }, null, null, this.youtube.accessToken)
  }

  /**
   * Uploads a channel banner.  
   * Last tested 05/20/2020 03:17. PASSING
   * @param image The channel banner to upload.
   * @returns The URL of the uploaded banner, used as
   * [[BrandingSettings.image.bannerExternalUrl]] in [[OAuth.updateChannelBranding]]
   */
  public async uploadChannelBanner (image: { data: Buffer; type: 'png' | 'jpeg' }): Promise<string> {
    this.checkTokenAndThrow()

    const response = await this.youtube._upload.imagePost('channelBanners/insert', image.data, image.type, null, null, this.youtube.accessToken)
    return response.url
  }

  /**
   * Adds a [[ChannelSection]] to the authorized user's [[Channel]].  
   * Last tested 05/24/2020 10:11. PASSING
   * @param type The type of channel section.
   * @param name The name of the channel section.
   * @param position The position of the channel section on the channel homepage.
   * @param playlistsResolvable Any playlists in the channel section.
   * @param channelsResolvable Any channels in the channel section.
   */
  public async addChannelSection (type: ChannelSectionType, name?: string, position?: number, playlistsResolvable?: (string | Playlist)[],
    channelsResolvable?: (string | Channel)[]): Promise<ChannelSection> {
    this.checkTokenAndThrow()

    const data: typeof CHANNEL_SECTION_DATA = JSON.parse(JSON.stringify(CHANNEL_SECTION_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.snippet.type = type

    if (name) data.snippet.title = name
    if (position) data.snippet.position = position
    if (playlistsResolvable || channelsResolvable) data.contentDetails = {}
    if (playlistsResolvable) data.contentDetails.playlists = await Promise.all(playlistsResolvable.map(v => this.youtube._genericService.getId(v, Playlist)))
    if (channelsResolvable) data.contentDetails.channels = await Promise.all(channelsResolvable.map(v => this.youtube._genericService.getId(v, Channel)))

    if (playlistsResolvable || channelsResolvable) parts.push('contentDetails')

    const response = await this.youtube._request.post('channelSections', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new ChannelSection(this.youtube, response)
  }

  /**
   * Updates a [[ChannelSection]].
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
  public async updateChannelSection (id: string, type: ChannelSectionType, name?: string, position?: number, playlistsResolvable?: (string | Playlist)[],
    channelsResolvable?: (string | Channel)[]): Promise<ChannelSection> {
    this.checkTokenAndThrow()

    const data: typeof CHANNEL_SECTION_DATA = JSON.parse(JSON.stringify(CHANNEL_SECTION_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.id = id
    data.snippet.type = type

    if (name) data.snippet.title = name
    if (position) data.snippet.position = position
    if (playlistsResolvable || channelsResolvable) data.contentDetails = {}
    if (playlistsResolvable) data.contentDetails.playlists = await Promise.all(playlistsResolvable.map(v => this.youtube._genericService.getId(v, Playlist)))
    if (channelsResolvable) data.contentDetails.channels = await Promise.all(channelsResolvable.map(v => this.youtube._genericService.getId(v, Channel)))

    if (playlistsResolvable || channelsResolvable) parts.push('contentDetails')

    const response = await this.youtube._request.put('channelSections', { part: parts.join(',') }, JSON.stringify(data), null, this.youtube.accessToken)
    return new ChannelSection(this.youtube, response)
  }

  /**
   * Deletes a [[ChannelSection]].
   * Last tested 05/24/2020 10:11. PASSING
   * @param id The ID of the channel section.
   */
  public deleteChannelSection (id: string): Promise<ChannelSection> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('channelSections', { id }, null, this.youtube.accessToken)
  }

  /**
   * Get a [[Caption]] object from the ID of the caption.  
   * Last tested 06/11/2020 04:50. PASSING
   * @param videoResolvable The Title, URL, or ID of the video to get the caption from.
   * @param captionId The ID of the caption.
   */
  public async getCaption (videoResolvable: string | Video, captionId: string): Promise<Caption> {
    this.checkTokenAndThrow()

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
    const data = await this.youtube._request.api('captions', { videoId, id: captionId, part: 'snippet' }, null, this.youtube.accessToken)

    if (!data.items || data.items.length === 0) {
      return Promise.reject('Caption not found')
    }

    return new Caption(this.youtube, data.items[0])
  }

  /**
   * Gets the [[Caption]]s of a [[Video]]. Used mostly internally with [[Video.fetchCaptions]].  
   * Last tested 06/11/2020 04:50. PASSING
   * @param videoResolvable The Title, URL, or ID of the video to get the captions from.
   */
  public async getCaptions (videoResolvable: string | Video): Promise<Caption[]> {
    this.checkTokenAndThrow()

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
    const data = await this.youtube._request.api('captions', { videoId, part: 'snippet' }, null, this.youtube.accessToken)

    if (!data.items || data.items.length === 0) {
      return Promise.reject('Captions not found')
    }

    return data.items.map(caption => new Caption(this.youtube, caption))
  }

  /**
   * Uploads a [[Caption]] track for a [[Video]].  
   * Last tested 06/11/2020 04:50. PASSING
   * @param videoResolvable The video to add the caption track to.
   * @param language The language that the caption track is in.
   * @param name The name of the caption track.
   * @param track The caption track to upload.
   * @param draft Whether or not the caption track is a draft. If it is, it isn't visible to users.
   */
  public async uploadCaption (videoResolvable: string | Video, language: string, name: string, track: Buffer, draft: boolean = false): Promise<Caption> {
    this.checkTokenAndThrow()

    const videoId = await this.youtube._genericService.getId(videoResolvable, Video)
    const data: typeof CAPTION_DATA = JSON.parse(JSON.stringify(CAPTION_DATA))

    data.snippet = {
      videoId: videoId,
      language: language,
      name: name,
      isDraft: draft
    }

    const response = await this.youtube._upload.multipartStreamPost('captions', JSON.stringify(data), track, { part: 'snippet' }, null, this.youtube.accessToken)
    return new Caption(this.youtube, response)
  }

  /**
   * Edits a [[Caption]] track.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * Last tested 06/11/2020 04:50. PASSING
   * @param id The ID of the caption track to edit.
   * @param track The caption track to upload.
   * @param draft Whether or not the caption track is a draft. If it is, it isn't visible to users.
   */
  public async updateCaption (id: string, track?: Buffer, draft: boolean = null): Promise<Caption> {
    this.checkTokenAndThrow()

    const data: typeof CAPTION_DATA = JSON.parse(JSON.stringify(CAPTION_DATA))

    data.id = id
    data.snippet = { isDraft: draft }

    let response

    if (track) {
      if (draft !== null) {
        response = await this.youtube._upload.multipartStreamPut('captions', JSON.stringify(data), track, { part: 'snippet' }, null, this.youtube.accessToken)
      } else {
        response = await this.youtube._upload.streamPut('captions', track, { part: 'snippet' }, null, this.youtube.accessToken)
      }
    } else {
      response = await this.youtube._request.put('captions', { part: 'snippet' }, JSON.stringify(data), null, this.youtube.accessToken)
    }

    return new Caption(this.youtube, response)
  }

  /**
   * Downloads a [[Caption]] track.  
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

    return this.youtube._request.api(`captions/${id}`, params, null, this.youtube.accessToken)
  }

  /**
   * Deletes a [[Caption]] track.  
   * Last tested 06/11/2020 04:50. PASSING
   * @param id The ID of the caption track to delete.
   */
  public deleteCaption (id: string): Promise<void> {
    this.checkTokenAndThrow()
    return this.youtube._request.delete('captions', { id }, null, this.youtube.accessToken)
  }

  /**
   * Gets a list of [[VideoAbuseReportReason]]s.
   * Last tested 05/18/2020 11:48. PASSING
   */
  public async getVideoAbuseReportReasons () {
    this.checkTokenAndThrow()
    return (await this.youtube._genericService.getPaginatedItems({ type: PaginatedItemType.VideoAbuseReportReasons })).items as VideoAbuseReportReason[]
  }
}
