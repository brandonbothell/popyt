/**
 * @module OAuth
 */

import OAuth from '../oauth'
import * as Data from '../constants'
import * as YT from '..'

export class OAuthPlaylists {
  constructor (public oauth: OAuth) {}

  /**
   * Creates a [Playlist](./Library_Exports.Playlist#).  
   * @param title A title for the playlist.
   * @param description A description of the playlist.
   * @param privacy Whether the video is private, public, or unlisted.
   * @param tags Tags pertaining to the playlist.
   * @param language The language of the playlist's default title and description.
   * @param localizations Translated titles and descriptions.
   */
  public async createPlaylist (title: string, description?: string, privacy?: 'private' | 'public' | 'unlisted', tags?: string[], language?: string,
    localizations?: {[language: string]: { title: string; description: string }}): Promise<YT.Playlist> {

    this.oauth.checkTokenAndThrow()

    const data: typeof Data.PLAYLIST_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_DATA))
    const parts: string[] = [ 'id', 'player', 'snippet' ]

    data.snippet = { title }
    data.snippet.defaultLanguage = language ? language : this.oauth.youtube.language

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (localizations) data.localizations = localizations

    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.oauth.youtube._request.post('playlists', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Playlist(this.oauth.youtube, response)
  }

  /**
   * Updates a [Playlist](./Library_Exports.Playlist#).  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
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

    this.oauth.checkTokenAndThrow()

    const playlist = await this.oauth.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    const data: typeof Data.PLAYLIST_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_DATA))
    const parts: string[] = [ 'id', 'player', 'snippet' ]

    data.id = typeof playlist === 'string' ? playlist : playlist.id
    data.snippet = { title }
    data.snippet.defaultLanguage = language ? language : this.oauth.youtube.language

    if (description) data.snippet.description = description
    if (privacy) data.status = { privacyStatus: privacy }
    if (tags) data.snippet.tags = tags.join(',')
    if (localizations) data.localizations = localizations

    if (privacy) parts.push('status')
    if (localizations) parts.push('localizations')

    const response = await this.oauth.youtube._request.put('playlists', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Playlist(this.oauth.youtube, response)
  }

  /**
   * Deletes a [Playlist](./Library_Exports.Playlist#).  
   * @param playlistResolvable The playlist to delete.
   */
  public async deletePlaylist (playlistResolvable: YT.PlaylistResolvable): Promise<void> {
    this.oauth.checkTokenAndThrow()

    const playlist = await this.oauth.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    return this.oauth.youtube._request.delete('playlists', {
      params: { id: typeof playlist === 'string' ? playlist : playlist.id },
      authorizationOptions: { accessToken: true }
    })
  }

  /**
   * Adds a [Video](./Library_Exports.Video#) to a [Playlist](./Library_Exports.Playlist#).  
   * @param playlistResolvable The playlist to add the video to.
   * @param videoResolvable The video to add to the playlist.
   * @param position The position to add the video in. Defaults to the end.
   * @param note A user-generated note on the video.
   * @returns A partial video object.
   */
  public async addPlaylistItem (playlistResolvable: YT.PlaylistResolvable, videoResolvable: YT.VideoResolvable,
    position?: number, note?: string): Promise<YT.Video> {

    this.oauth.checkTokenAndThrow()

    const playlist = await this.oauth.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)

    const data: typeof Data.PLAYLIST_ITEM_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_ITEM_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.snippet.playlistId = typeof playlist === 'string' ? playlist : playlist.id
    data.snippet.resourceId.videoId = typeof video === 'string' ? video : video.id

    if (position) data.snippet.position = position
    if (note) data.contentDetails = { note }

    if (note) parts.push('contentDetails')

    const response = await this.oauth.youtube._request.post('playlistItems', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Video(this.oauth.youtube, response)
  }

  /**
   * Edits a playlist item.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * @param id The ID of the playlist item to edit.
   * @param playlistResolvable The playlist that the video is in.
   * @param videoResolvable The video that's in the playlist.
   * @param position The position to change the playlist item's to.
   * @param note The note to change the playlist item's to.
   * @returns A partial video object.
   */
  public async updatePlaylistItem (id: string, playlistResolvable: YT.PlaylistResolvable,
    videoResolvable: YT.VideoResolvable, position?: number, note?: string): Promise<YT.Video> {

    this.oauth.checkTokenAndThrow()

    const playlist = await this.oauth.youtube._resolutionService.resolve(playlistResolvable, YT.Playlist)
    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)

    const data: typeof Data.PLAYLIST_ITEM_DATA = JSON.parse(JSON.stringify(Data.PLAYLIST_ITEM_DATA))
    const parts: string[] = [ 'id', 'snippet' ]

    data.id = id
    data.snippet.playlistId = typeof playlist === 'string' ? playlist : playlist.id
    data.snippet.resourceId.videoId = typeof video === 'string' ? video : video.id

    if (position) data.snippet.position = position
    if (note) data.contentDetails = { note }

    if (note) parts.push('contentDetails')

    const response = await this.oauth.youtube._request.put('playlistItems', {
      params: { part: parts.join(',') },
      data: JSON.stringify(data),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Video(this.oauth.youtube, response)
  }

  /**
   * Deletes a playlist item.  
   * @param id The ID of the playlist item to delete.
   */
  public deletePlaylistItem (id: string): Promise<void> {
    this.oauth.checkTokenAndThrow()
    return this.oauth.youtube._request.delete('playlistItems', {
      params: { id },
      authorizationOptions: { accessToken: true }
    })
  }
}
