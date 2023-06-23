import 'mocha'
import { Parser } from '../src/util'
import { YouTube, Video, Channel, Playlist, Comment } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Creation of the YouTube instance', () => {
  it('should work with an invalid token', () => {
    expect(new YouTube('adasd')).to.be.instanceOf(YouTube)
  })

  it('should fail with no token', () => {
    let err = ''

    try {
      new YouTube('', '')
    } catch (error) {
      err = error.message
    }

    expect(err).to.equal('Must include one of api key or access token whenever constructing the YouTube object.')
  })
})

describe('Getting/Parsing', () => {
  it('should work with ids', async () => {
    expect(await youtube.getVideo('dQw4w9WgXcQ')).to.be.instanceOf(Video)
  })

  it('should work with urls', () => {
    expect((Parser.parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ') as any).video?.id).to.equal('dQw4w9WgXcQ')
    expect((Parser.parseUrl('https://www.youtube.com/channel/UCuAXFkgsw1L7xaCfnd5JJOw') as any).channel?.id).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect((Parser.parseUrl('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl') as any).playlist?.id).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect((Parser.parseUrl('https://www.youtube.com/c/SomeChannel') as any).channel?.searchQuery).to.equal('SomeChannel')
    expect((Parser.parseUrl('https://www.youtube.com/@SomeUsername') as any).channel?.username).to.equal('SomeUsername')

    const videoWithPlaylist = Parser.parseUrl('https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl') as any
    expect(videoWithPlaylist.playlist?.id).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithPlaylist.video?.id).to.equal('dQw4w9WgXcQ')
    expect(videoWithPlaylist.channel).to.equal(undefined)

    const channelWithoutUsername = Parser.parseUrl('https://www.youtube.com/@/sadsd') as any
    expect(channelWithoutUsername.playlist).to.equal(undefined)
    expect(channelWithoutUsername.video).to.equal(undefined)
    expect(channelWithoutUsername.channel).to.equal(undefined)

    const playlistWithoutId = Parser.parseUrl('https://www.youtube.com/playlist') as any
    expect(playlistWithoutId.playlist).to.equal(undefined)
    expect(playlistWithoutId.video).to.equal(undefined)
    expect(playlistWithoutId.channel).to.equal(undefined)

    const channelWithoutId = Parser.parseUrl('https://www.youtube.com/channel/') as any
    expect(channelWithoutId.playlist).to.equal(undefined)
    expect(channelWithoutId.video).to.equal(undefined)
    expect(channelWithoutId.channel).to.equal(undefined)

    const channelWithLegacyUrl = Parser.parseUrl('https://www.youtube.com/channel/yay!') as any
    expect(channelWithLegacyUrl.playlist).to.equal(undefined)
    expect(channelWithLegacyUrl.video).to.equal(undefined)
    expect(channelWithLegacyUrl.channel?.searchQuery).to.equal('yay!')

    const invalidResource = Parser.parseUrl('https://www.youtube.com/dfsdfdsf/') as any
    expect(invalidResource.playlist).to.equal(undefined)
    expect(invalidResource.video).to.equal(undefined)
    expect(invalidResource.channel).to.equal(undefined)

    const shortUrl = Parser.parseUrl('https://youtu.be/dQw4w9WgXcQ') as any
    expect(shortUrl.playlist).to.equal(undefined)
    expect(shortUrl.video?.id).to.equal('dQw4w9WgXcQ')
    expect(shortUrl.channel).to.equal(undefined)

    const shortUrlWithWww = Parser.parseUrl('https://www.youtu.be/dQw4w9WgXcQ') as any
    expect(shortUrlWithWww.playlist).to.equal(undefined)
    expect(shortUrlWithWww.video?.id).to.equal('dQw4w9WgXcQ')
    expect(shortUrlWithWww.channel).to.equal(undefined)

    const shortUrlWithoutId = Parser.parseUrl('https://youtu.be') as any
    expect(shortUrlWithoutId.playlist).to.equal(undefined)
    expect(shortUrlWithoutId.video).to.equal(undefined)
    expect(shortUrlWithoutId.channel).to.equal(undefined)

    const videoWithoutHttps = Parser.parseUrl('www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl') as any
    expect(videoWithoutHttps.playlist?.id).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutHttps.video?.id).to.equal('dQw4w9WgXcQ')
    expect(videoWithoutHttps.channel).to.equal(undefined)

    const videoWithoutWww = Parser.parseUrl('https://youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl') as any
    expect(videoWithoutWww.playlist?.id).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutWww.video?.id).to.equal('dQw4w9WgXcQ')
    expect(videoWithoutWww.channel).to.equal(undefined)

    const videoWithoutHttpsWww = Parser.parseUrl('youtube.com/watch?v=dQw4w9WgXcQ&list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl') as any
    expect(videoWithoutHttpsWww.playlist?.id).to.equal('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(videoWithoutHttpsWww.video?.id).to.equal('dQw4w9WgXcQ')
    expect(videoWithoutHttpsWww.channel).to.equal(undefined)

    const invalidUrl = Parser.parseUrl('https://github.com/jasonhaxstuff') as any
    expect(invalidUrl.playlist).to.equal(undefined)
    expect(invalidUrl.video).to.equal(undefined)
    expect(invalidUrl.channel).to.equal(undefined)
  })

  it('shouldn\'t work with bad urls', () => {
    const parsed = Parser.parseUrl('https://www.youtube.com/watch') as any

    expect(parsed.video).to.equal(undefined)
    expect(parsed.channel).to.equal(undefined)
    expect(parsed.playlist).to.equal(undefined)
  })

  it('shouldn\'t work with non-urls', () => {
    expect(Parser.parseUrl('Wait, this is not a URL...')).to.equal(false)
  })

  it('should throw an error if kind is wrong', () => {
    expect(() => new Video(youtube, { kind: 'notakind' })).to.throw('Invalid video type: notakind')
    expect(() => new Channel(youtube, { kind: 'notakind' })).to.throw('Invalid channel type: notakind')
    expect(() => new Comment(youtube, { kind: 'notakind' })).to.throw('Invalid comment type: notakind')
    expect(() => new Playlist(youtube, { kind: 'notakind' })).to.throw('Invalid playlist type: notakind')
  })
})
