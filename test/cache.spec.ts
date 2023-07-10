import 'mocha'
import './setup-instance'

import { setTimeout } from 'timers/promises'
import { Cache } from '../src/util/cache'
import { YouTube } from '../src'
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

  it('should not cache if _shouldCache is false', () => {
    const youtube = new YouTube(apiKey, undefined, { cache: false })
    youtube._cache('test', 'value')

    expect(Cache.get('test')).to.equal(undefined)
  })

  it('should cache if _shouldCache is true', () => {
    const youtube = new YouTube(apiKey, undefined, { cache: true, cacheTTL: 60 })
    youtube._cache('test', 'value')

    expect(Cache.get('test')).to.equal('value')
    Cache._delete('test')
  })

  it('should cache forever if cacheTTL is <= 0', () => {
    const youtube = new YouTube(apiKey, undefined, { cache: true, cacheTTL: 0 })
    youtube._cache('test', 'value')

    expect(Cache.get('test')).to.equal('value')
    Cache._delete('test')
  })
})
