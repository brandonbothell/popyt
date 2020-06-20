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
    Playlist.part = 'id'
    expect(await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
  })

  it('should work with proper URLs', async () => {
    expect(await youtube.getPlaylist('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
  })

  it('should work with single searching', async () => {
    expect(await youtube.getPlaylist('best songs ever')).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    expect(await playlist.fetch()).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching maxResults videos', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    const videos = await playlist.fetchVideos(1)

    expect(videos[0]).to.be.an.instanceOf(Video)
    expect(playlist.videos[0].id).to.equal(videos[0].id)
  })

  it('should work with fetching all videos', async () => {
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    const videos = await playlist.fetchVideos()

    expect(videos.length).to.be.lte(10)
    expect(playlist.videos.length).to.be.lte(10)
  })

  it('should work with fetching channel playlists with maxResults', async () => {
    const playlists = await youtube.getChannelPlaylists('UCBR8-60-B28hp2BmDPdntcQ', 5)

    expect(playlists.length).to.equal(5)
    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching channel playlists', async () => {
    const playlists = await youtube.getChannelPlaylists('UC6mi9rp7vRYninucP61qOjg')
    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })
})
