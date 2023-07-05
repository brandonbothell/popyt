import 'mocha'
import { Caption, Video } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */

const captionVideoId = process.env.YOUTUBE_CAPTION_VIDEO_ID

let video: Video
let caption: Caption
let captionId: string
let track: Buffer

describe('OAuth captions', () => {
  it('should get caption tracks of videos', async () => {
    if (!captionVideoId) {
      expect.fail('The environment variable YOUTUBE_CAPTION_VIDEO_ID must be set for this test to be ran!')
    }

    video = await youtube.getVideo(captionVideoId)

    await video.fetchCaptions()
    caption = video.captions[0]
    captionId = caption.id

    expect(video.captions).to.be.an('array')
    expect(video.captions[0]).to.be.an.instanceOf(Caption)
    expect(caption).to.be.an.instanceOf(Caption)
  })

  it('should download caption tracks', async () => {
    track = await caption.download('vtt', 'en_US')
    expect(track).to.be.an.instanceOf(Buffer)
  })

  it('should update caption tracks', async () => {
    if (!caption || !track) expect.fail('No caption/track to upload')

    await caption.update(track, false)
    expect(caption.draft).to.equal(false)
  })

  it('should delete caption tracks', async () => {
    if (!caption) expect.fail('No caption track to replace with')
    await caption.delete()
  })

  it('should upload caption tracks', async () => {
    if (!captionVideoId) {
      expect.fail('The environment variable YOUTUBE_CAPTION_VIDEO_ID must be set for this test to be ran!')
    }

    if (!track) expect.fail('No caption track to upload')

    const video = await youtube.getVideo(captionVideoId)
    const newCaption = await video.uploadCaption('en_US', 'Main', track, false)

    expect(newCaption.draft).to.equal(false)
    expect(newCaption.name).to.equal('Main')
    expect(newCaption.language).to.equal('en-US')
  })
})
