import 'mocha'
import { Channel } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */

describe('OAuth', () => {
  let channel: Channel

  it('should fetch my channel', async () => {
    channel = await youtube.oauth.getMe([ 'id' ])

    expect(channel.id).to.be.a('string')
  })

  it('should fetch my subscriptions', async () => {
    const subscription =
      (await youtube.oauth.getMySubscriptions({ pages: 1 }, [ 'id' ])).items[0]
    expect(subscription.id).to.be.a('string')
  })

  it('should fetch my playlists', async () => {
    const playlists = await youtube.oauth.getMyPlaylists({ pages: 1 }, [ 'id' ])
    const playlist = playlists.items[0]

    expect(playlist.id).to.be.a('string')
  })

  it('should fetch my uploads', async () => {
    const uploads =
      (await youtube.oauth.getMyUploads({ pages: 1 })).items
    expect(uploads.length).to.be.greaterThan(0)
  })
})
