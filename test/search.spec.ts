import 'mocha'
import { expect } from 'chai'
import YouTube, { Playlist, Video, Channel, YTComment } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Searching', () => {
  it('should default to 10 results', async () => {
    const youtube = new YouTube(apiKey)
    expect((await youtube.searchVideos('never gonna give you up')).length).to.equal(10)
    expect((await youtube.searchChannels('rick astley')).length).to.equal(10)
    expect((await youtube.searchPlaylists('music')).length).to.equal(10)
    expect((await youtube.search([ Video, Channel, Playlist ], 'vevo')).length).to.equal(10)
  }).timeout(20000)

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
    expect(await youtube.searchVideos('never gonna give you up').catch(error => { return error })).to.be.an.instanceOf(Error)
  })

  it('should set what it can with search results', async () => {
    const youtube = new YouTube(apiKey)
    const channel = (await youtube.searchChannels('rick astley', 1))[0]

    expect(channel.id).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(channel.country).to.equal(undefined)
    expect(channel.language).to.equal(undefined)
    expect(channel.views).to.equal(undefined)
    expect(channel.comments).to.equal(undefined)
  })

  it('should be able to fetch videos of a channel search result', async () => {
    const youtube = new YouTube(apiKey)
    const channel = (await youtube.searchChannels('rick astley', 1))[0]
    const videos = await channel.fetchVideos()

    expect(videos).to.be.an.instanceOf(Playlist)
  }).timeout(8000)

  it('should work with multiple types', async () => {
    const youtube = new YouTube(apiKey)
    const results = (await youtube.search([ Video, Playlist, Channel ], 'vevo', 10))

    expect(results.find(r => r instanceof Video)).to.not.equal(undefined)
    expect(results.find(r => r instanceof Playlist)).to.not.equal(undefined)
    expect(results.find(r => r instanceof Channel)).to.not.equal(undefined)
  })

  it('should throw an error if kind is wrong', () => {
    const youtube = new YouTube('')

    expect(() => new Video(youtube, { kind: 'notakind' })).to.throw('Invalid video type: notakind')
    expect(() => new Channel(youtube, { kind: 'notakind' })).to.throw('Invalid channel type: notakind')
    expect(() => new YTComment(youtube, { kind: 'notakind' }, 'video')).to.throw('Invalid comment type: notakind')
    expect(() => new Playlist(youtube, { kind: 'notakind' })).to.throw('Invalid playlist type: notakind')
  })
})
