import 'mocha'
import { expect } from 'chai'
import YouTube, { Playlist, Video, Channel } from '../src'
import { youtube } from './setup-instance'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Searching', () => {
  it('should default to 10 results', async () => {
    expect((await youtube.searchVideos('never gonna give you up')).results.length).to.equal(10)
    expect((await youtube.searchChannels('rick astley')).results.length).to.equal(10)
    expect((await youtube.searchPlaylists('music')).results.length).to.equal(10)
    expect((await youtube.search([ Video, Channel, Playlist ], 'vevo')).results.length).to.equal(10)
  }).timeout(20000)

  it('should return an array', async () => {
    expect((await youtube.searchPlaylists('music')).results).to.be.instanceOf(Array)
  })

  it('should reject if maxResults is < 1', async () => {
    expect(await youtube.searchChannels('rick astley', 0).catch(error => {
      return error
    })).to.equal('Max results must be between 1 and 50 for search queries')
  })

  it('should reject if maxResults is > 50', async () => {
    expect(await youtube.searchVideos('never gonna give you up', 51).catch(error => {
      return error
    })).to.equal('Max results must be between 1 and 50 for search queries')
  })

  it('should reject if api key is wrong', async () => {
    const youtube = new YouTube('asda')
    expect(await youtube.searchVideos('la di da').catch(error => {
      return error
    })).to.be.an.instanceOf(Error)
  })

  it('should set what it can with search results', async () => {
    const channel = (await youtube.searchChannels('rick astley', 1)).results[0]

    expect(channel.id).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(channel.country).to.equal(undefined)
    expect(channel.language).to.equal(undefined)
    expect(channel.views).to.equal(undefined)
    expect(channel.comments).to.equal(undefined)
  })

  it('should be able to fetch videos of a channel search result', async () => {
    const channel = (await youtube.searchChannels('rick astley', 1)).results[0]
    const videos = await channel.fetchVideos([ 'id' ])

    expect(videos).to.be.an.instanceOf(Playlist)
  })

  it('should work with multiple types', async () => {
    const data = (await youtube.search([ Video, Playlist, Channel ], 'vevo', 25))

    expect(data.results.find(r => r instanceof Video)).to.not.equal(undefined)
    expect(data.results.find(r => r instanceof Playlist)).to.not.equal(undefined)
    expect(data.results.find(r => r instanceof Channel)).to.not.equal(undefined)
  })

  it('should work with fetching videos of a channel', async () => {
    const video = (await youtube.searchVideos('bukkit', 10, undefined, undefined, 'UC6mi9rp7vRYninucP61qOjg')).results[0]
    expect(video.channel.id).to.equal('UC6mi9rp7vRYninucP61qOjg')
    expect(video.channel.name).to.be.a('string')
  })
})
