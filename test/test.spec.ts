import 'mocha'
import { expect } from 'chai'
import { YouTube, Video, YTComment, Channel, Playlist } from '../src'
import { parseUrl } from '../src/util'
import { Cache } from '../src/util/caching'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Creation of the YouTube instance', () => {
  it('should work with an invalid token', () => {
    expect(new YouTube('')).to.be.instanceOf(YouTube)
  })
})

describe('Searching', () => {
  it('should default to 10 results', async () => {
    const youtube = new YouTube(apiKey)
    expect((await youtube.searchVideos('never gonna give you up')).length).to.equal(10)
  })

  it('should return an array', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.searchPlaylists('music')).to.be.instanceOf(Array)
  })

  it('should reject if maxResults is < 1', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.searchChannels('rick astley', 0).catch(error => { return error })).to.equal('Max results must be greater than 0 and less than or equal to 50')
  })

  it('should reject if maxResults is > 50', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.searchVideos('never gonna give you up', 51).catch(error => { return error })).to.equal('Max results must be greater than 0 and less than or equal to 50')
  })

  it('should reject if api key is wrong', async () => {
    const youtube = new YouTube('')
    expect(await youtube.searchVideos('never gonna give you up').catch(error => { return error })).to.be.an.instanceOf(Error)
  })

  it('should throw an error if kind is wrong', () => {
    const youtube = new YouTube('')

    expect(() => new Video(youtube, { kind: 'notakind' })).to.throw('Invalid video type: notakind')
    expect(() => new Channel(youtube, { kind: 'notakind' })).to.throw('Invalid channel type: notakind')
    expect(() => new YTComment(youtube, { kind: 'notakind' })).to.throw('Invalid comment type: notakind')
    expect(() => new Playlist(youtube, { kind: 'notakind' })).to.throw('Invalid playlist type: notakind')
  })
})

describe('Getting', () => {
  it('should work with ids', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getVideo('dQw4w9WgXcQ')).to.be.instanceOf(Video)
  })

  it('should work with urls', () => {
    expect(parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ').video).to.equal('dQw4w9WgXcQ')
    expect(parseUrl('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw').channel).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(parseUrl('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl').playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')

    const videoWithPlaylist = parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithPlaylist.playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithPlaylist.video).to.equal('dQw4w9WgXcQ')
    expect(videoWithPlaylist.channel).to.equal(null)

    const playlistWithoutId = parseUrl('https://www.youtube.com/playlist')
    expect(playlistWithoutId.playlist).to.equal(null)
    expect(playlistWithoutId.video).to.equal(null)
    expect(playlistWithoutId.channel).to.equal(null)

    const channelWithoutId = parseUrl('https://www.youtube.com/channel/')
    expect(channelWithoutId.playlist).to.equal(null)
    expect(channelWithoutId.video).to.equal(null)
    expect(channelWithoutId.channel).to.equal(null)

    const invalidResource = parseUrl('https://www.youtube.com/dfsdfdsf/')
    expect(invalidResource.playlist).to.equal(null)
    expect(invalidResource.video).to.equal(null)
    expect(invalidResource.channel).to.equal(null)

    const shortUrl = parseUrl('https://youtu.be/dQw4w9WgXcQ')
    expect(shortUrl.playlist).to.equal(null)
    expect(shortUrl.video).to.equal('dQw4w9WgXcQ')
    expect(shortUrl.channel).to.equal(null)

    const shortUrlWithoutId = parseUrl('https://youtu.be')
    expect(shortUrlWithoutId.playlist).to.equal(null)
    expect(shortUrlWithoutId.video).to.equal(null)
    expect(shortUrlWithoutId.channel).to.equal(null)

    const invalidUrl = parseUrl('https://github.com/jasonhaxstuff')
    expect(invalidUrl.playlist).to.equal(null)
    expect(invalidUrl.video).to.equal(null)
    expect(invalidUrl.channel).to.equal(null)
  })

  it('shouldn\'t work with bad urls', () => {
    const parsed = parseUrl('https://www.youtube.com/watch')

    expect(parsed.video).to.equal(null)
    expect(parsed.channel).to.equal(null)
    expect(parsed.playlist).to.equal(null)
  })

  describe('Videos', () => {
    it('should reject if the video isn\'t found', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getVideo('').catch(error => { return error })).to.equal('Item not found')
    })

    it('should work with proper IDs', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getVideo('Lq1D8PFnjWY')).to.be.an.instanceOf(Video)
    })

    it('should work with proper URLs', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getVideoByUrl('https://youtube.com/watch?v=Lq1D8PFnjWY')).to.be.an.instanceOf(Video)
    })

    it('should work with fetching', async () => {
      const youtube = new YouTube(apiKey)
      const video = await youtube.getVideo('Lq1D8PFnjWY')

      expect(await video.fetch()).to.be.an.instanceOf(Video)
    })

    it('should work with fetching videos', async () => {
      const youtube = new YouTube(apiKey)
      const video = await youtube.getVideo('Lq1D8PFnjWY')

      expect(await video.fetchComments(1)).to.be.an.instanceOf(Array)
    })
  })

  describe('Channels', () => {
    it('should reject if the channel isn\'t found', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getChannel('').catch(error => { return error })).to.equal('Item not found')
    })

    it('should work with proper IDs', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')).to.be.an.instanceOf(Channel)
    })

    it('should work with proper URLs', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getChannelByUrl('https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ')).to.be.an.instanceOf(Channel)
    })

    it('should work with fetching', async () => {
      const youtube = new YouTube(apiKey)
      const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')

      expect(await channel.fetch()).to.be.an.instanceOf(Channel)
    })

    it('should work with fetching videos', async () => {
      const youtube = new YouTube(apiKey)
      const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')

      expect(await channel.fetchVideos()).to.be.an.instanceOf(Playlist)
    })
  })

  describe('Playlists', () => {
    it('should reject if the playlist isn\'t found', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getPlaylist('').catch(error => { return error })).to.equal('Item not found')
    })

    it('should work with proper IDs', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
    })

    it('should work with proper URLs', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getPlaylistByUrl('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
    })

    it('should work with fetching', async () => {
      const youtube = new YouTube(apiKey)
      const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')

      expect(await playlist.fetch()).to.be.an.instanceOf(Playlist)
    })

    it('should work with fetching videos', async () => {
      const youtube = new YouTube(apiKey)
      const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
      const videos = await playlist.fetchVideos(1)

      expect(videos[0]).to.be.an.instanceOf(Video)
      expect(playlist.videos[0].id).to.equal(videos[0].id)
    })
  })

  describe('Playlist items', () => {
    it('should reject if the playlist isn\'t found', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getPlaylistItems('').catch(error => { return error })).to.equal('Items not found')
    })

    it('should reject if maxResults is > 50', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 51).catch(error => { return error })).to.equal('Max results must be 50 or below for playlistItems')
    })

    it('should return an array with a length of <= maxResults', async () => {
      const youtube = new YouTube(apiKey)
      expect((await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 2)).length).to.be.lessThan(3)
    })

    it('should return an array the size of the playlist if maxResults isn\'t defined or is < 1', async () => {
      const youtube = new YouTube(apiKey)
      expect((await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 0)).length).to.be.greaterThan(50)
    }).timeout(8000)
  })

  describe('Video comments', () => {
    it('should work with valid videos with comments and replies', async () => {
      const youtube = new YouTube(apiKey)
      const comments = await youtube.getVideoComments('Lq1D8PFnjWY')

      expect(comments[0]).to.be.an.instanceOf(YTComment)
      expect(comments.find(comment => comment.text.displayed.startsWith('comment')).replies[0]).to.be.an.instanceOf(YTComment)
    })

    it('should work with fetching from a video object', async () => {
      const youtube = new YouTube(apiKey)
      const video = await youtube.getVideo('Lq1D8PFnjWY')
      const comments = await video.fetchComments()

      expect(comments[0]).to.be.an.instanceOf(YTComment)
      expect(video.comments[0].id).to.equal(comments[0].id)
    })

    it('should not work with valid videos with comments disabled', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getVideoComments('24EWkH5ipdw').catch(error => { return error })).to.equal('Items not found')
    })

    it('should not work with invalid videos', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getVideoComments('0').catch(error => { return error })).to.equal('Items not found')
    })

    it('should return an array with a length of <= maxResults', async () => {
      const youtube = new YouTube(apiKey)
      expect((await youtube.getVideoComments('Lq1D8PFnjWY', 1)).length).to.be.lessThan(2)
    })

    it('should work with fetching replies', async () => {
      const youtube = new YouTube(apiKey)
      expect(await ((await youtube.getVideoComments('Lq1D8PFnjWY', 1))[0].fetchReplies())).to.be.an.instanceOf(Array)
    })

    it('should be individually gettable', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getComment('Uggw2qPdnUEfcHgCoAEC')).to.be.an.instanceOf(YTComment)
    })
  })

  describe('Comment replies', () => {
    it('should work with valid comments with replies', async () => {
      const youtube = new YouTube(apiKey)

      const replies = await youtube.getCommentReplies('Uggw2qPdnUEfcHgCoAEC')
      expect(replies[0]).to.be.instanceOf(YTComment)

      return {}
    }).timeout(3000)

    it('should not work with invalid comments/comments with no replies', async () => {
      const youtube = new YouTube(apiKey)
      expect(await youtube.getCommentReplies('0').catch(error => { return error })).to.equal('Items not found')
    })

    it('should return an array with a length of <= maxResults', async () => {
      const youtube = new YouTube(apiKey)
      expect((await youtube.getCommentReplies('Uggw2qPdnUEfcHgCoAEC', 1)).length).to.be.lessThan(2)
    })
  })
})

describe('Caching', () => {
  it('should work fast', async () => {
    const youtube = new YouTube(apiKey)
    return youtube.getVideo('dQw4w9WgXcQ')
  }).timeout(50)

  it('should be disabled if cache is false', async () => {
    const youtube = new YouTube(apiKey, { cache: false })
    const video = youtube.getVideo('dQw4w9WgXcQ')
    const time = new Date().getTime()

    await video

    expect(new Date().getTime() - time).to.be.greaterThan(50)
  })

  it('should not use expired items', async () => {
    const youtube = new YouTube(apiKey, { cacheTTL: 0.01, cacheCheckInterval: 0.009 })
    await youtube.getVideo('dQw4w9WgXcQ')

    const video = youtube.getVideo('dQw4w9WgXcQ')
    const time = new Date().getTime()

    await video

    expect(new Date().getTime() - time).to.be.greaterThan(50)
  })

  it('should delete items successfully', () => {
    Cache.set('test', 'value', 0)
    Cache._delete('test')

    expect(Cache.get('test')).to.equal(undefined)
  })

  it('should ignore items with a ttl <= 0', () => {
    Cache.set('test', 'value', 0)
    Cache.checkTTLs()

    expect(Cache.get('test')).to.equal('value')

    Cache._delete('test')
  })

  it('should delete expired items', () => {
    Cache.set('test', 'value', 1)
    Cache.checkTTLs()

    expect(Cache.get('test')).to.equal(undefined)
  })
})
