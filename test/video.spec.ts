import 'mocha'
import { expect } from 'chai'
import YouTube, { Video } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

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

  it('shouldn\'t work with invalid URLs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getVideoByUrl('https://youtube.com/watch').catch(e => e)).to.equal('Not a valid video url')
  })

  it('should work with fetching', async () => {
    const youtube = new YouTube(apiKey)
    const video = await youtube.getVideo('Lq1D8PFnjWY')

    expect(await video.fetch()).to.be.an.instanceOf(Video)
  })

  it('should work with fetching video comments', async () => {
    const youtube = new YouTube(apiKey)
    const video = await youtube.getVideo('Lq1D8PFnjWY')

    expect(await video.fetchComments(1)).to.be.an.instanceOf(Array)
  })
})
