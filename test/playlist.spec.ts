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
    expect(await youtube.getPlaylist('').catch(error => { return error })).to.equal('Item not found')
  })

  it('should work with proper IDs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
  })

  it('should work with proper URLs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylistByUrl('https://www.youtube.com/playlist?list=PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl')).to.be.an.instanceOf(Playlist)
  })

  it('shouldn\'t work with invalid URLs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getPlaylistByUrl('https://youtube.com/playlist').catch(e => e)).to.equal('Not a valid playlist url')
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
})
