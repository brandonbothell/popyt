import 'mocha'
import { expect } from 'chai'
import { youtube } from './setup-instance'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Playlist items', () => {
  it('should reject if the playlist isn\'t found', async () => {
    expect(await youtube.getPlaylistItems('DSFDKLSDFaVeryFakePlaylistID').catch(error => {
      return error.message
    })).to.equal('The playlist identified with the request\'s <code>playlistId</code> parameter cannot be found.')
  })

  it('should reject if maxResults is > 50', async () => {
    expect(await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 51).catch(error => {
      return error
    })).to.equal('Max results must be 50 or below for playlistItems')
  })

  it('should return an array with a length of <= maxResults', async () => {
    expect((await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 2, [ 'id' ])).length).to.be.lessThan(3)
  })

  it('should return an array the size of the playlist if maxResults isn\'t defined or is < 1', async () => {
    expect((await youtube.getPlaylistItems('PLMC9KNkIncKvYin_USF1qoJQnIyMAfRxl', 0, [ 'id' ])).length).to.be.greaterThan(50)
  })
})
