import 'mocha'
import { expect } from 'chai'
import { YouTube } from '../src'
import { Cache } from '../src/util/caching'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

export const youtube = new YouTube(apiKey)

describe('Caching', () => {
  it('should work fast', async () => {
    const youtube = new YouTube(apiKey)

    await youtube.getVideo('dQw4w9WgXcQ')

    const video = youtube.getVideo('dQw4w9WgXcQ')
    const time = new Date().getTime()

    await video

    expect(new Date().getTime() - time).to.be.lessThan(50)
  }).timeout(8000)

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

  it('should not cache if _shouldCalche is false', () => {
    const youtube = new YouTube(apiKey, { cache: false })
    youtube._cache('test', 'value')

    expect(Cache.get('test')).to.equal(undefined)
  })

  it('should cache if _shouldCache is true', () => {
    const youtube = new YouTube(apiKey, { cache: true, cacheTTL: 60 })
    youtube._cache('test', 'value')

    expect(Cache.get('test')).to.equal('value')
    Cache._delete('test')
  })

  it('should cache forever if cacheTTL is <= 0', () => {
    const youtube = new YouTube(apiKey, { cache: true, cacheTTL: 0 })
    youtube._cache('test', 'value')

    expect(Cache.get('test')).to.equal('value')
    Cache._delete('test')
  })
})
