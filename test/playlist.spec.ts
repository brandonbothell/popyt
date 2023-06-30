import 'mocha'
import { Playlist } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Playlists', () => {
  it('should reject if the playlist isn\'t found', async () => {
    expect(await youtube.getPlaylist('JSDJFSFaVeryFakePlaylist').catch(error => error.message)).to.equal('Item not found')
  })

  it('should work with multiple different resolutions at once', async () => {
    const result = await youtube.getPlaylist(
      [ 'PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 'youtube.com/playlist?list=PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI', 'gaming shorts' ],
      [ 'id' ]
    )

    expect(result.length).to.equal(3)
    expect(result[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with proper IDs', async () => {
    expect(await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])).to.be.an.instanceOf(Playlist)
  })

  it('should work with proper URLs', async () => {
    expect(await youtube.getPlaylist('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])).to.be.an.instanceOf(Playlist)
  })

  it('should work with single searching', async () => {
    expect(await youtube.getPlaylist('best songs ever', [ 'id' ])).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])
    expect(await playlist.fetch([ 'id' ])).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching a page of videos', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])
    const videos = (await playlist.fetchVideos(undefined, [ 'id' ])).items

    expect(videos.length).to.equal(50)
    expect(playlist.videos.items.length).to.equal(50)
  })

  it('should work with fetching all videos', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])
    const videos = (await playlist.fetchVideos({ pages: 0 }, [ 'id' ])).items

    expect(videos.length).to.be.greaterThan(50)
    expect(playlist.videos.items.length).to.be.greaterThan(50)
  })

  it('should work with fetching channel playlists with maxPerPage', async () => {
    const playlists = (await youtube.getChannelPlaylists('UCBR8-60-B28hp2BmDPdntcQ', { maxPerPage: 5 }, [ 'id' ])).items

    expect(playlists.length).to.equal(5)
    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching channel playlists by object', async () => {
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'id' ])
    const playlist = (await youtube.getChannelPlaylists(channel)).items[0]
    expect(playlist).to.be.an.instanceOf(Playlist)
  })
})
