import 'mocha'
import { expect } from 'chai'
import YouTube, { Playlist, Video } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Playlists', () => {
  it('should reject if the playlist isn\'t found', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylist('JSDJFSFaVeryFakePlaylist').catch(error => { return error })).to.equal('Item not found')
  })

  it('should work with proper IDs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
  })

  it('should work with proper URLs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylist('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
  })

  it('should work with single searching', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylist('best songs ever')).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching', async () => {
    const youtube = new YouTube(apiKey)
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')

    expect(await playlist.fetch()).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching maxResults videos', async () => {
    const youtube = new YouTube(apiKey)
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    const videos = await playlist.fetchVideos(1)

    expect(videos[0]).to.be.an.instanceOf(Video)
    expect(playlist.videos[0].id).to.equal(videos[0].id)
  })

  it('should work with fetching all videos', async () => {
    const youtube = new YouTube(apiKey)
    const playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')
    const videos = await playlist.fetchVideos()

    expect(videos.length).to.be.gte(150)
    expect(playlist.videos.length).to.be.gte(150)
  }).timeout(8000)

  it('should work with fetching channel playlists with maxResults', async () => {
    const youtube = new YouTube(apiKey)
    const playlists = await youtube.getChannelPlaylists('UCBR8-60-B28hp2BmDPdntcQ', 5)

    expect(playlists.length).to.equal(5)
    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching channel playlists', async () => {
    const youtube = new YouTube(apiKey)
    const playlists = await youtube.getChannelPlaylists('UC6mi9rp7vRYninucP61qOjg')

    expect(playlists[0]).to.be.an.instanceOf(Playlist)
  })
})
