import 'mocha'
import { expect } from 'chai'
import { YouTube, Video } from '../src'
import { Parser } from '../src/util'
import { youtube } from './cache.spec'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Creation of the YouTube instance', () => {
  it('should work with an invalid token', () => {
    expect(new YouTube('adasd')).to.be.instanceOf(YouTube)
  })

  it('should fail with no token', () => {
    let err: string

    try {
      // tslint:disable-next-line:no-unused-expression
      new YouTube('', '')
    } catch (error) {
      err = error.message
    }

    expect(err).to.equal('Must include one of token or access token whenever constructing the YouTube object.')
  })
})

describe('Getting/Parsing', () => {
  it('should work with ids', async () => {
    expect(await youtube.getVideo('dQw4w9WgXcQ')).to.be.instanceOf(Video)
  })

  it('should work with urls', () => {
    expect(Parser.parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ').video).to.equal('dQw4w9WgXcQ')
    expect(Parser.parseUrl('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw').channel).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(Parser.parseUrl('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl').playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')

    const videoWithPlaylist = Parser.parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithPlaylist.playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithPlaylist.video).to.equal('dQw4w9WgXcQ')
    expect(videoWithPlaylist.channel).to.equal(null)

    const playlistWithoutId = Parser.parseUrl('https://www.youtube.com/playlist')
    expect(playlistWithoutId.playlist).to.equal(null)
    expect(playlistWithoutId.video).to.equal(null)
    expect(playlistWithoutId.channel).to.equal(null)

    const channelWithoutId = Parser.parseUrl('https://www.youtube.com/channel/')
    expect(channelWithoutId.playlist).to.equal(null)
    expect(channelWithoutId.video).to.equal(null)
    expect(channelWithoutId.channel).to.equal(null)

    const invalidResource = Parser.parseUrl('https://www.youtube.com/dfsdfdsf/')
    expect(invalidResource.playlist).to.equal(null)
    expect(invalidResource.video).to.equal(null)
    expect(invalidResource.channel).to.equal(null)

    const shortUrl = Parser.parseUrl('https://youtu.be/dQw4w9WgXcQ')
    expect(shortUrl.playlist).to.equal(null)
    expect(shortUrl.video).to.equal('dQw4w9WgXcQ')
    expect(shortUrl.channel).to.equal(null)

    const shortUrlWithoutId = Parser.parseUrl('https://youtu.be')
    expect(shortUrlWithoutId.playlist).to.equal(null)
    expect(shortUrlWithoutId.video).to.equal(null)
    expect(shortUrlWithoutId.channel).to.equal(null)

    const videoWithoutHttps = Parser.parseUrl('www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutHttps.playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutHttps.video).to.equal('dQw4w9WgXcQ')
    expect(videoWithoutHttps.channel).to.equal(null)

    const videoWithoutWww = Parser.parseUrl('https://youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutWww.playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutWww.video).to.equal('dQw4w9WgXcQ')
    expect(videoWithoutWww.channel).to.equal(null)

    const videoWithoutHttpsWww = Parser.parseUrl('youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutHttpsWww.playlist).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutHttpsWww.video).to.equal('dQw4w9WgXcQ')
    expect(videoWithoutHttpsWww.channel).to.equal(null)

    const invalidUrl = Parser.parseUrl('https://github.com/jasonhaxstuff')
    expect(invalidUrl.playlist).to.equal(null)
    expect(invalidUrl.video).to.equal(null)
    expect(invalidUrl.channel).to.equal(null)
  })

  it('shouldn\'t work with bad urls', () => {
    const parsed = Parser.parseUrl('https://www.youtube.com/watch')

    expect(parsed.video).to.equal(null)
    expect(parsed.channel).to.equal(null)
    expect(parsed.playlist).to.equal(null)
  })
})
