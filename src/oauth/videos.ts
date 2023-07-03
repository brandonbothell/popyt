/* istanbul ignore file */
/* We ignore this file because OAuth endpoints are too taxing to test;
   They are instead manually tested. */

import { Cache } from '../util'
import OAuth from '../oauth'
import * as YT from '..'

export class OAuthVideos {
  constructor (public oauth: OAuth) {}

  /**
   * Like, dislike, or remove a rating from a [Video](./Library_Exports.Video#).
   * Last tested 05/18/2020 11:48. PASSING
   * @param videoResolvable The video to rate.
   * @param rating The rating to give the video.
   */
  public async rateVideo (videoResolvable: YT.VideoResolvable, rating: 'like' | 'dislike' | 'none'): Promise<void> {
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    return this.oauth.youtube._request.post('videos/rate', {
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
    this.oauth.checkTokenAndThrow()

    const videoIds = await Promise.all(videoResolvables.map(videoResolvable => this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)))

    if (this.oauth.youtube._shouldCache) {
      const cached = Cache.get(`get://videos/getRating/${JSON.stringify(videoIds)}`)
      if (cached) return cached
    }

    const response = await this.oauth.youtube._request.get('videos/getRating', {
      params: { id: videoIds.join(',') },
      authorizationOptions: { accessToken: true }
    })
    this.oauth.youtube._cache(`get://videos/getRating/${JSON.stringify(videoIds)}`, response.items)

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
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
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

    return this.oauth.youtube._request.post('videos/reportAbuse', {
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
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    return this.oauth.youtube._request.delete('videos', {
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
    this.oauth.checkTokenAndThrow()

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

    if (!parts.length) return this.oauth.youtube.getVideo(video.id)

    const response = await this.oauth.youtube._request.put('videos', {
      params: { part: parts.join(',') },
      data: JSON.stringify(video),
      authorizationOptions: { accessToken: true }
    })
    return new YT.Video(this.oauth.youtube, response)
  }

  /**
     * Sets a new [Thumbnail](../modules/Library_Exports#thumbnail) for a [Video](./Library_Exports.Video).  
     * Last tested 05/18/2020 11:48. PASSING
     * @param videoResolvable The video to set the thumbnail for.
     * @param image The image data and type to upload.
     */
  public async setThumbnail (videoResolvable: YT.VideoResolvable, image: YT.Image): Promise<typeof YT.Video.prototype.thumbnails> {
    this.oauth.checkTokenAndThrow()

    const video = await this.oauth.youtube._resolutionService.resolve(videoResolvable, YT.Video)
    const response = await this.oauth.youtube._upload.imagePost('thumbnails/set', {
      params: { videoId: typeof video === 'string' ? video : video.id },
      image,
      authorizationOptions: { accessToken: true }
    })

    return response.items[0]
  }

  /**
   * Gets a list of [VideoAbuseReportReason](./Library_Exports.VideoAbuseReportReason#)s.
   * Last tested 05/18/2020 11:48. PASSING
   */
  public async getVideoAbuseReportReasons () {
    this.oauth.checkTokenAndThrow()
    return (await this.oauth.youtube._genericService.getPaginatedItems(
      { type: YT.PaginatedItemType.VideoAbuseReportReasons },
      { accessToken: true })
    ).items as YT.VideoAbuseReportReason[]
  }
}
