import { google } from 'googleapis'
import { Video, Channel, Playlist } from './entities'
import { parseUrl } from './util'
export * from './entities'

const youtube = google.youtube('v3')

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

  private async search (type: 'video' | 'channel' | 'playlist', searchTerm: string, maxResults: number = 10) {
    if (maxResults < 1 || maxResults > 50) {
      return Promise.reject('Max results must be greater than 0 and less than or equal to 50')
    }

    const { data: results } = await youtube.search.list({
      q: searchTerm,
      maxResults,
      auth: this.token,
      part: 'snippet',
      type
    })

    const items = []

    results.items.forEach(item => {
      if (type === 'video') {
        items.push(new Video(this, item))
      } else if (type === 'channel') {
        items.push(new Channel(this, item))
      } else if (type === 'playlist') {
        items.push(new Playlist(this, item))
      }
    })

    return items as Video[] | Channel[] | Playlist[]
  }

  private async getItemById (type: 'video' | 'channel' | 'playlist', id: string) {
    let result

    if (type === 'video') {
      result = (await youtube.videos.list({
        id,
        part: 'snippet,contentDetails,statistics,status',
        auth: this.token
      })).data
    } else if (type === 'channel') {
      result = (await youtube.channels.list({
        id,
        part: 'snippet,contentDetails,statistics,status',
        auth: this.token
      })).data
    } else if (type === 'playlist') {
      result = (await youtube.playlists.list({
        id,
        part: 'snippet,contentDetails,player',
        auth: this.token
      })).data
    }

    if (result.items.length === 0) {
      return Promise.reject('Item not found')
    }

    return result.items[0]
  }

  /**
   * Search videos on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public async searchVideos (searchTerm: string, maxResults: number = 10) {
    return this.search('video', searchTerm, maxResults) as Promise<Video[]>
  }

  /**
   * Search channels on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public async searchChannels (searchTerm: string, maxResults: number = 10) {
    return this.search('channel', searchTerm, maxResults) as Promise<Channel[]>
  }

  /**
   * Search playlists on YouTube.
   * @param searchTerm What to search for on YouTube.
   * @param maxResults The maximum amount of results to find. Defaults to 10.
   */
  public async searchPlaylists (searchTerm: string, maxResults: number = 10) {
    return this.search('playlist', searchTerm, maxResults) as Promise<Playlist[]>
  }

  /**
   * Get a video object from the ID of a video.
   * @param id The ID of the video.
   */
  public async getVideo (id: string) {
    return new Video(this, await this.getItemById('video', id))
  }

  /**
   * Get a channel object from the ID of a channel.
   * @param id The ID of the channel.
   */
  public async getChannel (id: string) {
    return new Channel(this, await this.getItemById('channel', id))
  }

  /**
   * Get a playlist object from the ID of a playlist.
   * @param id The ID of the playlist.
   */
  public async getPlaylist (id: string) {
    return new Playlist(this, await this.getItemById('playlist', id))
  }

  /**
   * Get a video object from the url of a video.
   * @param url The url of the video.
   */
  public async getVideoByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.video) {
      return Promise.reject('Not a valid video url')
    }

    return new Video(this, await this.getItemById('video', id.video))
  }

  /**
   * Get a channel object from the url of a channel.
   * @param url The url of the channel.
   */
  public async getChannelByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.channel) {
      return Promise.reject('Not a valid channel url')
    }

    return new Channel(this, await this.getItemById('channel', id.channel))
  }

  /**
   * Get a playlist object from the url of a playlist.
   * @param url The url of the playlist.
   */
  public async getPlaylistByUrl (url: string) {
    const id = parseUrl(url)

    if (!id.playlist) {
      return Promise.reject('Not a valid playlist url')
    }

    return new Playlist(this, await this.getItemById('playlist', id.playlist))
  }

  /**
   * Get `maxResults` videos in a playlist. Used mostly internally with `Playlist#getVideos`.
   * @param playlistId The ID of the playlist.
   * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
   */
  public async getPlaylistItems (playlistId: string, maxResults: number = -1) {
    let full
    let videos: Video[] = []

    if (maxResults <= 0) {
      full = true
    } else {
      full = false
    }

    if (maxResults > 50) {
      return Promise.reject('Max results must be 50 or below')
    }

    let { data: results } = await youtube.playlistItems.list({
      playlistId,
      part: 'snippet',
      auth: this.token,
      maxResults: full ? 50 : maxResults
    }).catch(error => {
      return Promise.reject('Playlist not found')
    })

    const totalResults = results.pageInfo.totalResults
    const perPage = 50
    const pages = Math.floor(totalResults / perPage)

    results.items.forEach(item => {
      videos.push(new Video(this, item))
    })

    if (!full || pages === 0) {
      return videos
    }

    let oldRes = results

    for (let i = 0; i < pages; i++) {
      const { data: newResults } = await youtube.playlistItems.list({
        playlistId,
        part: 'snippet',
        auth: this.token,
        maxResults: 50,
        pageToken: oldRes.nextPageToken
      })

      oldRes = newResults
      newResults.items.forEach((item) => {
        videos.push(new Video(this, item))
      })
    }

    return videos
  }
}
