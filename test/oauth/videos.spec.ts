import 'mocha'
import { readFileSync } from 'fs'
import { Video, VideoAbuseReportReason } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */
const oauthVideoId = process.env.YOUTUBE_OAUTH_VIDEO_ID

let video: Video

describe('OAuth videos', () => {
  it('should rate videos', async () => {
    video = await youtube.getVideo('E6UTz_Doic8')
    await video.like()
    await video.dislike()
    await video.unrate()
  })

  it('should retrieve ratings on videos', async () => {
    const rating = await video.getRating()
    expect(rating).to.equal('none')
  })

  it('should cache ratings on videos', async () => {
    const rating = video.getRating()
    const start = new Date().getTime()

    await rating

    expect(new Date().getTime() - start).to.be.lessThan(50)
  })

  it('should set thumbnails', async () => {
    if (!oauthVideoId) {
      expect.fail('The environment variable YOUTUBE_OAUTH_VIDEO_ID must be set for this test to be ran!')
    }

    video = await youtube.getVideo(oauthVideoId)
    const image = readFileSync('./test/data/image.jpg')
    const thumbnails = await video.setThumbnail({ type: 'jpeg', data: image })

    expect(thumbnails.default?.url).to.be.a('string')
  })

  it('should update videos', async () => {
    if (!video) expect.fail('No video object to test with')
    const oldVideo = Object.assign({}, video)

    await video.update({
      snippet: { ...video.data.snippet, title: 'OAuth Test Video' },
      localizations: { ...video.localizations, de: { title: 'OAuth Test Video auf Deutsch', description: 'Keine Deutsch' } },
      recordingDetails: { recordingDate: new Date() },
      status: { ...video.data.status, license: 'creativeCommon' }
    })

    expect(video.title).to.equal('OAuth Test Video')
    expect(video.localizations.de).to.haveOwnProperty('title', 'OAuth Test Video auf Deutsch')
    expect(video.localizations.de).to.haveOwnProperty('description', 'Keine Deutsch')
    expect(video.dateRecorded.getDay()).to.equal(new Date().getDay())
    expect(video.license).to.equal('creativeCommon')

    await video.update({
      snippet: oldVideo.data.snippet,
      localizations: oldVideo.data.localizations,
      recordingDetails: oldVideo.data.recordingDetails,
      status: oldVideo.data.status
    })
  })

  it('should set all available properties of abuse reasons', async () => {
    const reasons = await youtube.oauth.videos.getVideoAbuseReportReasons()
    const reason = reasons.find(reason => reason.secondaryReasons)

    if (!reason) expect.fail('No full abuse reason to test with')

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
