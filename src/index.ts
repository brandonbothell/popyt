import { Video, Channel, Playlist, YTComment } from './entities'
import { parseUrl, request } from './util'
export * from './entities'
export * from './types'

/**
 * The main class used to interact with the YouTube API. Use this.
 */
export class YouTube {
  public token: string

  /**
   *
   * @param token Your YouTube Data API v3 token. Don't share this with anybody.
   */
  constructor (token: string) {
    this.token = token
  }

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public searchVideos (searchTerm: string, maxResults: number = 10) {
    return this.search('video', searchTerm, maxResults) as Promise<Video[]>
  }

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public searchChannels (searchTerm: string, maxResults: number = 10) {
    return this.search('channel', searchTerm, maxResults) as Promise<Channel[]>
  }

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public searchPlaylists (searchTerm: string, maxResults: number = 10) {
    return this.search('playlist', searchTerm, maxResults) as Promise<Playlist[]>
  }

  /**
   * Get a video object from the ID of a video.
   * @param id The ID of the video.
   */
  public getVideo (id: string) {
    return this.getItemById('video', id) as Promise<Video>
  }

  /**
   * Get a channel object from the ID of a channel.
   * @param id The ID of the channel.
   */
  public getChannel (id: string) {
    return this.getItemById('channel', id) as Promise<Channel>
  }

  /**
   * Get a playlist object from the ID of a playlist.
   * @param id The ID of the playlist.
   */
  public getPlaylist (id: string) {
    return this.getItemById('playlist', id) as Promise<Playlist>
  }

  /**
   * Get a comment object from the ID of a comment.
   * @param id The ID of the comment.
   */
  public getComment (id: string) {
    return this.getItemById('comment', id) as Promise<YTComment>
  }

  /**
   * Get a video object from the url of a video.
   * @param url The url of the video.
   */
  public getVideoByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.video) {
      return Promise.reject('Not a valid video url')
    }

    return this.getItemById('video', id.video) as Promise<Video>
  }

  /**
   * Get a channel object from the url of a channel.
   * @param url The url of the channel.
   */
  public getChannelByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.channel) {
      return Promise.reject('Not a valid channel url')
    }

    return this.getItemById('channel', id.channel) as Promise<Channel>
  }

  /**
   * Get a playlist object from the url of a playlist.
   * @param url The url of the playlist.
   */
  public getPlaylistByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.playlist) {
      return Promise.reject('Not a valid playlist url')
    }

    return this.getItemById('playlist', id.playlist) as Promise<Playlist>
  }

  /**
   * Get `maxResults` videos in a playlist. Used mostly internally with `Playlist#fetchVideos`.
   * @param playlistId The ID of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
   */
  public getPlaylistItems (playlistId: string, maxResults: number = -1) {
    return this.getPaginatedItems('playlistItems', playlistId, maxResults) as Promise<Video[]>
  }

  /**
   * Get `maxResults` comments on a video. Used mostly internally with `Video#fetchComments`.
   * Can only get the last 100 comments on a video, due to a bug with the YouTube API.
   * @param videoId The ID of the video.
   * @param maxResults The maximum amount of comments to get from the video. If <= 0 or not included, returns all comments on the video.
   */
  public getVideoComments (videoId: string, maxResults: number = -1) {
    return this.getPaginatedItems('commentThreads', videoId, maxResults) as Promise<YTComment[]>
  }

  /**
   * Get `maxResults` replies to a comment. Used mostly internally with `Comment#fetchReplies`.
   * @param commentId The ID of the comment to get replies from.
   * @param maxResults The maximum amount of replies to get. Gets all replies if <= 0 or not included.
   */
  public getCommentReplies (commentId: string, maxResults: number = -1) {
    return this.getPaginatedItems('comments', commentId, maxResults) as Promise<YTComment[]>
  }

  private async search (type: 'video' | 'channel' | 'playlist', searchTerm: string, maxResults: number = 10): Promise<Video[] | Channel[] | Playlist[]> {
    if (maxResults < 1 || maxResults > 50) {
      return Promise.reject('Max results must be greater than 0 and less than or equal to 50')
    }

    const results = await request.api('search', {
      q: encodeURIComponent(searchTerm),
      maxResults,
      key: this.token,
      part: 'snippet',
      type
    })

    const items = []

    results.items.forEach(item => {
      switch (type) {
        case 'video':
          items.push(new Video(this, item))
          break
        case 'channel':
          items.push(new Channel(this, item))
          break
        case 'playlist':
          items.push(new Playlist(this, item))
          break
        default:
          throw new Error('Type must be a video, channel, or playlist')
      }
    })

    return items
  }

  private async getItemById (type: 'video' | 'channel' | 'playlist' | 'comment', id: string): Promise<Video | Channel | Playlist | YTComment> {
    let result

    if (type === 'video') {
      result = await request.api('videos', {
        id,
        part: 'snippet,contentDetails,statistics,status',
        key: this.token
      })
    } else if (type === 'channel') {
      result = await request.api('channels', {
        id,
        part: 'snippet,contentDetails,statistics,status',
        key: this.token
      })
    } else if (type === 'playlist') {
      result = await request.api('playlists', {
        id,
        part: 'snippet,contentDetails,player',
        key: this.token
      })
    } else if (type === 'comment') {
      result = await request.api('comments', {
        id,
        part: 'snippet',
        key: this.token
      })
    }

    if (result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    switch (type) {
      case 'video':
        return new Video(this, result.items[0])
      case 'playlist':
        return new Playlist(this, result.items[0])
      case 'channel':
        return new Channel(this, result.items[0])
      case 'comment':
        return new YTComment(this, result.items[0])
      default:
        throw new Error('Type must be a video, channel, or playlist')
    }
  }

  private async getPaginatedItems (type: 'playlistItems' | 'commentThreads' | 'comments', id: string, maxResults: number = -1): Promise<Video[] | YTComment[]> {
    let full: boolean
    let items = []

    if (maxResults <= 0) {
      full = true
    } else {
      full = false
    }

    let max: number

    if (type === 'playlistItems') {
      max = 50
    } else if (type === 'commentThreads' || type === 'comments') {
      max = 100
    } else {
      return Promise.reject('Unknown item type ' + type)
    }

    if (maxResults > max) {
      return Promise.reject(`Max results must be ${max} or below`)
    }

    const options: {
      part: string,
      key: string,
      maxResults: number,
      videoId?: string,
      parentId?: string,
      textFormat?: string,
      playlistId?: string,
      pageToken?: string
    } = {
      part: 'snippet',
      key: this.token,
      maxResults: full ? max : maxResults
    }

    switch (type) {
      case 'playlistItems':
        options.playlistId = id
        break
      case 'commentThreads':
        options.videoId = id
        options.part += ',replies'
        options.textFormat = 'plainText'
        break
      case 'comments':
        options.parentId = id
        break
    }

    const results = await request.api(type, options).catch(error => {
      return Promise.reject('Items not found')
    })

    if (results.items.length === 0) {
      return Promise.reject('Items not found')
    }

    const totalResults = results.pageInfo.totalResults
    const perPage = results.pageInfo.resultsPerPage
    const pages = Math.floor(totalResults / perPage)

    results.items.forEach(item => {
      let comment: YTComment

      switch (type) {
        case 'playlistItems':
          items.push(new Video(this, item))
          break
        case 'commentThreads':
          comment = new YTComment(this, item.snippet.topLevelComment)
          items.push(comment)
          break
        case 'comments':
          items.push(new YTComment(this, item))
          break
      }

      if (item.replies) {
        item.replies.comments.forEach(reply => {
          const created = new YTComment(this, reply)
          comment.replies.push(created)
        })
      }
    })

    if (!full || pages === 0) {
      return items
    }

    let oldRes = results
    options.pageToken = oldRes.nextPageToken

    for (let i = 1; i < pages; i++) {
      const newResults = await request.api(type, options)

      oldRes = newResults
      newResults.items.forEach(item => {
        let comment: YTComment

        switch (type) {
          case 'playlistItems':
            items.push(new Video(this, item))
            break
          case 'commentThreads':
            comment = new YTComment(this, item.snippet.topLevelComment)
            items.push(comment)
            break
          case 'comments':
            items.push(new YTComment(this, item))
            break
        }

        if (item.replies) {
          item.replies.comments.forEach(reply => {
            const created = new YTComment(this, reply)
            comment.replies.push(created)
          })
        }
      })
    }

    return items
  }
}
