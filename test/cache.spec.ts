import 'mocha'
import './setup-instance'

import { setTimeout } from 'timers/promises'
import { Cache } from '../src/util/cache'
import { VideoRating, YouTube } from '../src'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Caching', () => {
  it('should work fast', async () => {
    const youtube = new YouTube(apiKey)

    await youtube.getVideo('dQw4w9WgXcQ')

    const video = youtube.getVideo('dQw4w9WgXcQ', [ 'contentDetails' ])
    const time = new Date().getTime()

    await video

    expect(new Date().getTime() - time).to.be.lessThan(50)
  })

  it('should be disabled if cache is false', async () => {
    const youtube = new YouTube(apiKey, undefined, { cache: false })
    const video = youtube.getVideo('dQw4w9WgXcQ')
    const time = new Date().getTime()

    await video

    expect(new Date().getTime() - time).to.be.greaterThan(30)
  })

  it('should not use expired items', async () => {
    Cache.setTTLs(1) // for clearing previous test cache

    const youtube = new YouTube(apiKey, undefined, { cacheTTL: 0.001, cacheCheckInterval: 0.009 })
    await setTimeout(20) // clearing previous test cache

    await youtube.getVideo('dQw4w9WgXcQ')
    await setTimeout(20) // give enough time to clear cache

    let time = new Date().getTime()
    const video = await youtube.getVideo('dQw4w9WgXcQ')

    expect(new Date().getTime() - time).to.be.greaterThan(30)

    await video.fetchComments()
    await setTimeout(20)

    time = new Date().getTime()
    const comments = video.fetchComments()

    await comments

    expect(new Date().getTime() - time).to.be.greaterThan(30)
  })

  const testRating = new VideoRating(new YouTube('test'),
    { videoId: 'test', rating: 'like' })

  it('should ignore items with a ttl <= 0', () => {
    Cache.setItem(VideoRating, 'test', testRating, 0)
    Cache.checkTTLs()

    expect(Cache.getItem(VideoRating, 'test')).to.equal(testRating)

    Cache._deleteItem('videorating/test')
  })

  it('should delete expired items', () => {
    Cache.setItem(VideoRating, 'test', testRating, 1)
    Cache.checkTTLs()

    expect(Cache.getItem(VideoRating, 'test')).to.equal(undefined)
  })

  it('should cache forever if cacheTTL is <= 0', () => {
    const youtube = new YouTube(apiKey, undefined, { cache: true, cacheTTL: 0 })
    youtube._cacheItem(VideoRating, 'test', testRating)

    expect(Cache.getItem(VideoRating, 'test')).to.equal(testRating)
    expect(Cache._deleteItem('videorating/test')?.v).to.equal(testRating)
  })
})
