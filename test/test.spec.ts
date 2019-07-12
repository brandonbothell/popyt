import 'mocha'
import { expect } from 'chai'
import { YouTube, Video, YTComment } from '../src'
import { apiKey } from './config'
import { parseUrl } from '../src/util'

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
    expect(await youtube.searchVideos('never gonna give you up').catch(error => { return error })).to.be.instanceOf(Error)
  })
})

describe('Getting', () => {
  it('should work with ids', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getVideo('dQw4w9WgXcQ')).to.be.instanceOf(Video)
  })

  it('should work with urls', async () => {
    expect(parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ').video).to.equal('dQw4w9WgXcQ')
    expect(parseUrl('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw').channel).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(parseUrl('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl').playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
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

      expect(comments.find(comment => comment.text.displayed.startsWith('comment'))).to.be.instanceOf(YTComment)
      expect(comments.find(comment => comment.text.displayed.startsWith('comment')).replies[0]).to.be.instanceOf(YTComment)
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
  })

  describe('Comment replies', () => {
    it('should work with valid comments with replies', async () => {
      const youtube = new YouTube(apiKey)

      youtube.getCommentReplies('Uggw2qPdnUEfcHgCoAEC').then(replies => {
        expect(replies[0]).to.be.instanceOf(YTComment)
      })
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
  }).timeout(100)
})
