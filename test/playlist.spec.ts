import 'mocha'
import { expect } from 'chai'
import { Playlist, Video } from '../src'
import { youtube } from './setup-instance'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Playlists', () => {
  it('should reject if the playlist isn\'t found', async () => {
    expect(await youtube.getPlaylist('JSDJFSFaVeryFakePlaylist').catch(error => {
      return error
    })).to.equal('Item not found')
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
    const videos = await playlist.fetchVideos(undefined, [ 'id' ])

    expect(videos.length).to.equal(50)
    expect(playlist.videos.length).to.equal(50)
  })

  it('should work with fetching all videos', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])
    const videos = await playlist.fetchVideos({ pages: 0 }, [ 'id' ])

    expect(videos.length).to.be.greaterThan(50)
    expect(playlist.videos.length).to.be.greaterThan(50)
  })

  it('should work with fetching channel playlists with maxPerPage', async () => {
    const playlists = await youtube.getChannelPlaylists('UCBR8-60-B28hp2BmDPdntcQ', { maxPerPage: 5 }, [ 'id' ])

    expect(playlists.length).to.equal(5)
    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching channel playlists', async () => {
    const playlists = await youtube.getChannelPlaylists('UC6mi9rp7vRYninucP61qOjg')
    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })
})
