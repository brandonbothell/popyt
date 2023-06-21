import 'mocha'
import YouTube, { Playlist, Video, Channel, PaginatedItemsReturns } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Searching', () => {
  let defaultPlaylistsSearch: PaginatedItemsReturns<typeof Playlist>
  let defaultChannelsSearch: PaginatedItemsReturns<typeof Channel>
  let defaultVideosSearch: PaginatedItemsReturns<typeof Video>
  let videoChannelSearch: PaginatedItemsReturns<typeof Video | typeof Channel>

  before(async () => {
    defaultPlaylistsSearch = await youtube.searchPlaylists('music')
    defaultChannelsSearch = await youtube.searchChannels('rick astley')
    defaultVideosSearch = await youtube.searchVideos('never gonna give you up')
    videoChannelSearch = await youtube.search('vevo', { searchFilters: { types: [ Video, Channel ] } })

    defaultPlaylistsSearch = await youtube.searchPlaylists('music')
    defaultChannelsSearch = await youtube.searchChannels('rick astley')
    defaultVideosSearch = await youtube.searchVideos('never gonna give you up')
    videoChannelSearch = await youtube.search('vevo', { searchFilters: { types: [ Video, Channel ] } })
  })

  it('should default to 50 results', async () => {
    expect(defaultVideosSearch.items.length + defaultChannelsSearch.items.length + defaultPlaylistsSearch.items.length).to.equal(50 + 50 + 50)
    expect(videoChannelSearch.items.length).to.equal(50)
  }).timeout(20000)

  it('should return an object with page token and results', async () => {
    expect(defaultPlaylistsSearch.items).to.be.instanceOf(Array)
    expect(defaultPlaylistsSearch.nextPageToken).to.be.a('string')
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
    const channel = defaultChannelsSearch.items[0]

    expect(channel.id).to.equal('UCuAXFkgsw1L7xaCfnd5JJOw')
    expect(channel.country).to.equal(undefined)
    expect(channel.language).to.equal(undefined)
    expect(channel.views).to.equal(undefined)
    expect(channel.comments).to.equal(undefined)
  })

  it('should be able to fetch videos of a channel search result', async () => {
    const channel = defaultChannelsSearch.items[0]
    const videos = await channel.fetchVideos([ 'id' ])

    expect(videos).to.be.an.instanceOf(Playlist)
  })

  it('should work with multiple types by default', async () => {
    const search = await youtube.search('vevo')

    expect([
      search.items.find(r => r instanceof Video),
      search.items.find(r => r instanceof Playlist),
      search.items.find(r => r instanceof Channel)
    ].filter(r => r !== undefined).length).to.be.greaterThanOrEqual(2) // playlists aren't that favored by the youtube algorithm
  })

  it('should work with fetching videos of a channel', async () => {
    const video = (await youtube.searchVideos('bukkit', { searchFilters: { channel: 'UC6mi9rp7vRYninucP61qOjg' }, pageOptions: { maxPerPage: 1 } })).items[0]
    expect(video.channel.id).to.equal('UC6mi9rp7vRYninucP61qOjg')
    expect(video.channel.name).to.be.a('string')
  })

  it('should return an array with a size of pages * maxPerPage', async () => {
    expect((await youtube.search('gaming moments', { pageOptions: { pages: 3, maxPerPage: 6 } })).items.length).to.equal(18)
  })
})
