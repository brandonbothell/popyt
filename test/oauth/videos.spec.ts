import 'mocha'
import { readFileSync } from 'fs'
import { VideoAbuseReportReason } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */
const thumbnailVideoId = process.env.YOUTUBE_THUMBNAIL_VIDEO_ID

describe('OAuth videos', () => {
  it('should rate videos', async () => {

    await youtube.oauth.videos.rateVideo('E6UTz_Doic8', 'like')
    await youtube.oauth.videos.rateVideo('E6UTz_Doic8', 'none')
  })

  it('should retrieve ratings on videos', async () => {
    const rating =
      (await youtube.oauth.videos.getMyRatings([ 'E6UTz_Doic8' ]))[0].rating

    expect(rating).to.equal('none')
  })

  it('should set thumbnails', async () => {
    if (!thumbnailVideoId) {
      expect.fail('The environment variable YOUTUBE_THUMBNAIL_VIDEO_ID must be set for this test to be ran!')
    }

    const image = readFileSync('./test/data/image.jpg')

    const thumbnails = await youtube.oauth.videos.setThumbnail(
      thumbnailVideoId, { type: 'jpeg', data: image })

    expect(thumbnails.default?.url).to.be.a('string')
  })

  it('should set all available properties of abuse reasons', async () => {
    const reason = (await youtube.oauth.videos.getVideoAbuseReportReasons())[0]

    expect(reason.full).to.equal(true)
    expect(reason.id).to.be.a('string')
    expect(reason.label).to.be.a('string')
    expect(reason.secondaryReasons).to.be.an('array')
  })

  it('should throw an error on invalid type of abuse reasons', () => {
    let error = ''

    try {
      new VideoAbuseReportReason(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid video abuse report reason type: invalid')
  })
})
