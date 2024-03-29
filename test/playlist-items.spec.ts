import 'mocha'
import { Playlist } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

let playlist: Playlist

describe('Playlist items', () => {
  it('should reject if the playlist isn\'t found', async () => {
    expect(await youtube.getPlaylistItems('DSFDKLSDFaVeryFakePlaylistID')
      .catch(error => error.message)).to.equal('The playlist identified with the request\'s <code>playlistId</code> parameter cannot be found.')
  })

  it('should reject if maxPerPage is > 50', async () => {
    expect(await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', { maxPerPage: 51 })
      .catch(error => error.message)).to.equal('Max per page must be 50 or below for playlistItems')
  })

  it('should return an array with a length of <= maxPerPage <= 50', async () => {
    playlist = await youtube.getPlaylist('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', [ 'id' ])
    expect((await youtube.getPlaylistItems(playlist, { maxPerPage: 2 }, [ 'id' ])).items.length).to.be.lessThan(3)
  })

  it('should return an array with a size of 50 if maxPerPage isn\'t defined or is < 1', async () => {
    expect((await youtube.getPlaylistItems(playlist, undefined, [ 'id' ])).items.length).to.equal(50)
  })

  it('should return an array with a size of the playlist if pages is < 1', async () => {
    expect((await youtube.getPlaylistItems(playlist, { pages: 0 }, [ 'id' ])).items.length).to.be.greaterThan(50)
  })

  it('should return an array with a size of pages * maxPerPage', async () => {
    expect((await youtube.getPlaylistItems(playlist, { pages: 3, maxPerPage: 5 }, [ 'id' ])).items.length).to.be.equal(15)
  })
})
