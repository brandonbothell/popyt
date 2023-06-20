import 'mocha'
import { Video } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Videos', () => {
  it('should reject if the video isn\'t found', async () => {
    expect(await youtube.getVideo('ASDADASaVeryFakeVideo').catch(error => {
      return error
    })).to.equal('Item not found')
  })

  it('should work with proper IDs', async () => {
    expect(await youtube.getVideo('Lq1D8PFnjWY', [ 'id' ])).to.be.an.instanceOf(Video)
  })

  it('should work with proper URLs', async () => {
    expect(await youtube.getVideo('https://youtube.com/watch?v=Lq1D8PFnjWY', [ 'id' ])).to.be.an.instanceOf(Video)
  })

  it('should work with single searching', async () => {
    expect(await youtube.getVideo('how to youtube', [ 'id' ])).to.be.an.instanceOf(Video)
  })

  it('should work with fetching', async () => {
    const video = await youtube.getVideo('Lq1D8PFnjWY', [ 'id' ])
    expect(await video.fetch([ 'id' ])).to.be.an.instanceOf(Video)
  })

  it('should work with fetching video comments', async () => {
    const video = await youtube.getVideo('Lq1D8PFnjWY', [ 'id' ])
    expect(await video.fetchComments({ pages: 1 }, [ 'id' ])).to.be.an.instanceOf(Array)
  })
})
