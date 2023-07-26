/**
 * @module OAuth
 */

import OAuth from '../oauth'
import * as Data from '../constants'
import * as YT from '..'

export class OAuthCaptions {
  constructor (public oauth: OAuth) {}

  /**
   * Get a [Caption](./Library_Exports.Caption#) object
   * from the URL, ID, or search query of its video and the ID of the caption.  
   * @param videoResolvable The Title, URL, or ID of the video to get the caption from.
   * @param captionId The ID of the caption.
   */
  public async getCaption (videoResolvable: YT.VideoResolvable, captionId: string): Promise<YT.Caption> {
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const params: { videoId: string; id?: string } =
      { videoId: typeof video === 'string' ? video : video.id }

    if (captionId) params.id = captionId

    const data = await this.oauth.youtube._request.get('captions', {
      params: { part: 'snippet', id: captionId },
      authorizationOptions: { accessToken: true }
    })

    if (!data.items?.length) {
      return Promise.reject(new Error('Caption not found'))
    }

    return new YT.Caption(this.oauth.youtube, data.items[0])
  }

  /**
   * Gets the [Caption](./Library_Exports.Caption#)s of a [Video](./Library_Exports.Video#). Used mostly internally with [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).  
   * @param videoResolvable The Title, URL, or ID of the video to get the captions from.
   */
  public async getCaptions (videoResolvable: YT.VideoResolvable): Promise<YT.Caption[]> {
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data = await this.oauth.youtube._request.get('captions', {
      params: { part: 'snippet', videoId: typeof video === 'string' ? video : video.id },
      authorizationOptions: { accessToken: true }
    })

    if (!data.items?.length) {
      return Promise.reject(new Error('Captions not found'))
    }

    return data.items.map(caption => new YT.Caption(this.oauth.youtube, caption))
  }

  /**
   * Uploads a [Caption](./Library_Exports.Caption#) track for a [Video](./Library_Exports.Video#).  
   * @param videoResolvable The video to add the caption track to.
   * @param language The language that the caption track is in.
   * @param name The name of the caption track.
   * @param track The caption track to upload.
   * @param draft Whether or not the caption track is a draft. If it is, it isn't visible to users.
   */
  public async uploadCaption (videoResolvable: YT.VideoResolvable, language: string, name: string, track: Buffer, draft: boolean = false): Promise<YT.Caption> {
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const data: typeof Data.CAPTION_DATA = JSON.parse(JSON.stringify(Data.CAPTION_DATA))

    data.snippet = {
      videoId: typeof video === 'string' ? video : video.id,
      language: language,
      name: name,
      isDraft: draft
    }

    const response = await this.oauth.youtube._upload.multipartStreamPost('captions', {
      authorizationOptions: { accessToken: true },
      params: { part: 'snippet' },
      parts: [
        { data: JSON.stringify(data) },
        { data: track }
      ]
    })
    return new YT.Caption(this.oauth.youtube, response)
  }

  /**
   * Edits a [Caption](./Library_Exports.Caption#) track.  
   * **If your request does not specify a value for a property that already has a value,
   * the property's existing value will be deleted.**  
   * @param id The ID of the caption track to edit.
   * @param track The caption track to upload.
   * @param draft Whether or not the caption track is a draft. If it is, it isn't visible to users.
   */
  public async updateCaption (id: string, track?: Buffer, draft: boolean = null): Promise<YT.Caption> {
    this.oauth.checkTokenAndThrow()

    const data: typeof Data.CAPTION_DATA = JSON.parse(JSON.stringify(Data.CAPTION_DATA))

    data.id = id
    data.snippet = { isDraft: draft }

    let response

    if (track) {
      if (draft !== null) {
        response = await this.oauth.youtube._upload.multipartStreamPut('captions', {
          authorizationOptions: { accessToken: true },
          params: { part: 'snippet' },
          parts: [
            { data: JSON.stringify(data) },
            { data: track }
          ]
        })
      } else {
        response = await this.oauth.youtube._upload.streamPut('captions', {
          authorizationOptions: { accessToken: true },
          params: { part: 'snippet' },
          stream: track
        })
      }
    } else {
      response = await this.oauth.youtube._request.put('captions', {
        params: { part: 'snippet' },
        data: JSON.stringify(data),
        authorizationOptions: { accessToken: true }
      })
    }

    return new YT.Caption(this.oauth.youtube, response)
  }

  /**
   * Downloads a [Caption](./Library_Exports.Caption#) track.  
   * @param id The ID of the caption track to download.
   * @param format The file format to download the track in.
   * @param language The language to download the track in.
   */
  public downloadCaption (id: string, format?: 'sbv' | 'scc' | 'srt' | 'ttml' | 'vtt', language?: string): Promise<Buffer> {
    this.oauth.checkTokenAndThrow()

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

    return this.oauth.youtube._request.get(`captions/${id}`, { params, authorizationOptions: { accessToken: true } })
  }

  /**
   * Deletes a [Caption](./Library_Exports.Caption#) track.  
   * @param id The ID of the caption track to delete.
   */
  public deleteCaption (id: string): Promise<void> {
    this.oauth.checkTokenAndThrow()
    return this.oauth.youtube._request.delete('captions', { params: { id }, authorizationOptions: { accessToken: true } })
  }
}
