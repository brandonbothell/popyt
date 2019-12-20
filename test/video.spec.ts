import 'mocha'
import { expect } from 'chai'
import { Video } from '../src'
import { youtube } from './cache.spec'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Videos', () => {
  it('should reject if the video isn\'t found', async () => {
    Video.part = 'id'
    expect(await youtube.getVideo('ASDADASaVeryFakeVideo').catch(error => { return error })).to.equal('Item not found')
  })

  it('should work with proper IDs', async () => {
    expect(await youtube.getVideo('Lq1D8PFnjWY')).to.be.an.instanceOf(Video)
  })

  it('should work with proper URLs', async () => {
    expect(await youtube.getVideo('https://youtube.com/watch?v=Lq1D8PFnjWY')).to.be.an.instanceOf(Video)
  })

  it('should work with single searching', async () => {
    expect(await youtube.getVideo('how to youtube')).to.be.an.instanceOf(Video)
  })

  it('should work with fetching', async () => {
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    expect(await video.fetch()).to.be.an.instanceOf(Video)
  })

  it('should work with fetching video comments', async () => {
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    expect(await video.fetchComments(1)).to.be.an.instanceOf(Array)
  })
})
