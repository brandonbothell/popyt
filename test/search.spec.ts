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
    expect((await youtube.searchVideos('never gonna give you up')).items.length).to.equal(10)
    expect((await youtube.searchChannels('rick astley')).items.length).to.equal(10)
    expect((await youtube.searchPlaylists('music')).items.length).to.equal(10)
    expect((await youtube.search('vevo', { searchFilters: { types: [ Video, Channel, Playlist ] } })).items.length).to.equal(10)
  }).timeout(20000)

  it('should return an array', async () => {
    expect((await youtube.searchPlaylists('music')).items).to.be.instanceOf(Array)
  })

  it('should reject if maxResults is < 1', async () => {
    expect(await youtube.searchChannels('rick astley', { pageOptions: { maxPerPage: 0 } }).catch(error => {
      return error
    })).to.equal('Max per page must be above 0')
  })

  it('should reject if maxResults is > 50', async () => {
    expect(await youtube.searchVideos('never gonna give you up', { pageOptions: { maxPerPage: 51 } }).catch(error => {
      return error
    })).to.equal('Max per page must be 50 or below for searches')
  })

  it('should reject if api key is wrong', async () => {
    const youtube = new YouTube('asda')
    expect(await youtube.searchVideos('la di da').catch(error => {
      return error
    })).to.be.an.instanceOf(Error)
  })

  it('should set what it can with search results', async () => {
    const channel = (await youtube.searchChannels('rick astley', undefined)).items[0]

    expect(channel.id).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(channel.country).to.equal(undefined)
    expect(channel.language).to.equal(undefined)
    expect(channel.views).to.equal(undefined)
    expect(channel.comments).to.equal(undefined)
  })

  it('should be able to fetch videos of a channel search result', async () => {
    const channel = (await youtube.searchChannels('rick astley', { pageOptions: { maxPerPage: 1 } })).items[0]
    const videos = await channel.fetchVideos([ 'id' ])

    expect(videos).to.be.an.instanceOf(Playlist)
  })

  it('should work with multiple types by default', async () => {
    const data = (await youtube.search('vevo', { pageOptions: { maxPerPage: 50 } }))

    expect(data.items.find(r => r instanceof Video)).to.not.equal(undefined)
    expect(data.items.find(r => r instanceof Playlist)).to.not.equal(undefined)
    expect(data.items.find(r => r instanceof Channel)).to.not.equal(undefined)
  })

  it('should work with fetching videos of a channel', async () => {
    const video = (await youtube.searchVideos('bukkit', { searchFilters: { channelId: 'UC6mi9rp7vRYninucP61qOjg' }, pageOptions: { maxPerPage: 1 } })).items[0]
    expect(video.channel.id).to.equal('UC6mi9rp7vRYninucP61qOjg')
    expect(video.channel.name).to.be.a('string')
  })

  it('should return an array with a size of pages * maxPerPage', async () => {
    expect((await youtube.search('gaming moments', { pageOptions: { pages: 3, maxPerPage: 6 } })).items.length).to.equal(18)
  })
})
