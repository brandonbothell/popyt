import 'mocha'
import { Playlist, Video } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */

let playlist: Playlist
let playlistId: string
let playlistItemId: string

describe('OAuth', () => {
  it('should work with creating playlists', async () => {
    playlist = await youtube.oauth.playlists.createPlaylist(
      'Some playlist', 'An awesome playlist!', 'unlisted', [ 'awesome', 'cool' ], 'en_US',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { de_DE: { title: 'Einige Wiedergabelisten', description: 'Eine tolle Wiedergabeliste!' } })
    playlistId = playlist.id

    expect(playlist.title).to.equal('Some playlist')
    expect(playlist.description).to.equal('An awesome playlist!')
  })

  it('should work with updating playlists', async () => {
    if (!playlist) expect.fail('No playlist to test with')
    await playlist.update(
      'Other playlist', 'An awesome playlist...', 'unlisted', [ 'awesome' ], 'en_US',
      { de: { title: 'Andere Playlist', 'description': 'Eine wunderbar Playlist...' } }
    )

    expect(playlist.title).to.equal('Other playlist')
    expect(playlist.description).to.equal('An awesome playlist...')
  })

  it('should work with adding playlist items', async () => {
    if (!playlist) expect.fail('No playlist to test with')
    const video = await playlist.addVideo('dQw4w9WgXcQ', 0, 'A fantastic song!')
    playlistItemId = video.data.id

    expect(video.id).to.equal('dQw4w9WgXcQ')
    expect(video.data.kind).to.equal('youtube#playlistItem')
  })

  let video: Video

  it('should work with updating playlist items', async () => {
    if (!playlist || !playlistItemId) expect.fail('No playlist/item to test with')
    video = await playlist.updateVideo('dQw4w9WgXcQ', 0,
      'A fantastic song...', playlistItemId)

    expect(video.note).to.equal('A fantastic song...')
    expect(video.data.kind).to.equal('youtube#playlistItem')
  })

  it('should work with deleting playlist videos', async () => {
    if (!playlist || !video) expect.fail('No playlist/video to test with')
    await playlist.removeVideo(video)
  })

  it('should work with deleting playlists', async () => {
    if (!playlist) expect.fail('No playlist to test with')
    await playlist.delete()
  })
})
