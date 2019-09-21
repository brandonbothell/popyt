import 'mocha'
import { expect } from 'chai'
import { YouTube, Video, YTComment } from '../src'
import { parseUrl, request } from '../src/util'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Creation of the YouTube instance', () => {
  it('should work with an invalid token', () => {
    expect(new YouTube('')).to.be.instanceOf(YouTube)
  })
})

describe('Getting/Parsing', () => {
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
})
