import 'mocha'
import './setup-instance'
import { readFileSync } from 'fs'
import { YouTube, VideoAbuseReportReason, Caption, Channel, Video } from '../src'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */

const key = process.env.YOUTUBE_OAUTH_API_KEY
const token = process.env.YOUTUBE_ACCESS_TOKEN
const thumbnailVideoId = process.env.YOUTUBE_THUMBNAIL_VIDEO_ID
const captionVideoId = process.env.YOUTUBE_CAPTION_VIDEO_ID

if (!key) {
  throw new Error('No API key')
}

if (!token) {
  throw new Error('No access token')
}
let videoId: string // video from above channel to comment on

let commentId: string
let commentReplyId: string

let playlistId: string
let playlistItemId: string

let sectionId: string

let trackId: string
let captionTrack: Buffer

describe('OAuth', () => {
  let channel: Channel

  it('should fetch my channel', async () => {
    const youtube = new YouTube(key, token)
    channel = await youtube.oauth.getMe([ 'id' ])

    expect(channel.id).to.be.a('string')
  })

  it('should fetch my subscriptions', async () => {
    const youtube = new YouTube(key, token)
    const subscription = (await youtube.oauth.getMySubscriptions(1, [ 'id' ]))[0]

    expect(subscription.id).to.be.a('string')
  })

  it('should fetch my playlists', async () => {
    const youtube = new YouTube(key, token)
    const playlist = (await youtube.oauth.getMyPlaylists(1, [ 'id' ]))[0]

    expect(playlist.id).to.be.a('string')
  })

  let uploads: Video[]

  it('should fetch my uploads', async () => {
    const youtube = new YouTube(key, token)
    uploads = (await youtube.getPlaylistItems(
      channel.data.contentDetails.relatedPlaylists?.uploads)).items

    expect(uploads.length).to.be.greaterThan(0)
  })

  it('should post comments', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.comments.postComment(
      text, channel.id, uploads[0].id)
    commentId = comment.id

    expect(comment.datePublished.getDay()).to.equal(new Date().getDay())
  })

  it('should edit comments', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.comments.editComment(commentId, text)

    expect(comment.text.original).to.equal(text)
  })

  it('should post comment replies', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.comments.replyToComment(commentId, text)
    commentReplyId = comment.id

    expect(comment.parentCommentId).to.equal(commentId)
  })

  it('should edit comment replies', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.comments.editComment(commentReplyId, text)

    expect(comment.text.original).to.equal(text)
  })

  it('should delete comments', async () => {
    const youtube = new YouTube(key, token)
    await youtube.oauth.comments.deleteComment(commentId)
  })

  it('should (un)subscribe to channels', async () => {
    const youtube = new YouTube(key, token)
    const channel = 'UCBR8-60-B28hp2BmDPdntcQ'
    const subscription = await youtube.oauth.subscribeToChannel(channel)

    expect(subscription.channel.id).to.equal(channel)

    await youtube.oauth.unsubscribeFromChannel(subscription.id)
  })

  it('should rate videos', async () => {
    const youtube = new YouTube(key, token)

    await youtube.oauth.rateVideo('E6UTz_Doic8', 'like')
    await youtube.oauth.rateVideo('E6UTz_Doic8', 'none')
  })

  it('should retrieve ratings on videos', async () => {
    const youtube = new YouTube(key, token)
    const rating = (await youtube.oauth.getMyRatings([ 'E6UTz_Doic8' ]))[0].rating

    expect(rating).to.equal('none')
  })

  it('should set thumbnails', async () => {
    if (!thumbnailVideoId) {
      expect.fail('The environment variable YOUTUBE_THUMBNAIL_VIDEO_ID must be set for this test to be ran!')
    }

    const image = readFileSync('./test/data/image.jpg')

    const youtube = new YouTube(key, token)
    const thumbnails = await youtube.oauth.setThumbnail(thumbnailVideoId, { type: 'jpeg', data: image })

    expect(thumbnails.default?.url).to.be.a('string')
  })

  it('should set all available properties of abuse reasons', async () => {
    const youtube = new YouTube(key, token)
    const reason = (await youtube.oauth.getVideoAbuseReportReasons())[0]

    expect(reason.full).to.equal(true)
    expect(reason.id).to.be.a('string')
    expect(reason.label).to.be.a('string')
    expect(reason.secondaryReasons).to.be.an('array')
  })

  it('should throw an error on invalid type of abuse reasons', () => {
    const youtube = new YouTube(key, token)
    let error = ''

    try {
      new VideoAbuseReportReason(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid video abuse report reason type: invalid')
  })

  it('should work with creating playlists', async () => {
    const youtube = new YouTube(key, token)
    const playlist = await youtube.oauth.createPlaylist('Some playlist', 'An awesome playlist!', 'unlisted', [ 'awesome', 'cool' ], 'en_US',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      { de_DE: { title: 'Einige Wiedergabelisten', description: 'Eine tolle Wiedergabeliste!' } })
    playlistId = playlist.id

    expect(playlist.title).to.equal('Some playlist')
    expect(playlist.description).to.equal('An awesome playlist!')
  })

  it('should work with updating playlists', async () => {
    const youtube = new YouTube(key, token)
    const playlist = await youtube.oauth.updatePlaylist(playlistId, 'Other playlist', 'An awesome playlist...')

    expect(playlist.title).to.equal('Other playlist')
    expect(playlist.description).to.equal('An awesome playlist...')
  })

  it('should work with adding playlist items', async () => {
    const youtube = new YouTube(key, token)
    const video = await youtube.oauth.addPlaylistItem(playlistId, 'dQw4w9WgXcQ', 0, 'A fantastic song!')
    playlistItemId = video.data.id

    expect(video.id).to.equal('dQw4w9WgXcQ')
    expect(video.data.kind).to.equal('youtube#playlistItem')
  })

  it('should work with updating playlist items', async () => {
    const youtube = new YouTube(key, token)
    const video = await youtube.oauth.updatePlaylistItem(playlistItemId, playlistId, 'dQw4w9WgXcQ', 0, 'A fantastic song...')

    expect(video.data.contentDetails.note).to.equal('A fantastic song...')
    expect(video.data.kind).to.equal('youtube#playlistItem')
  })

  it('should work with deleting playlist items', async () => {
    const youtube = new YouTube(key, token)
    await youtube.oauth.deletePlaylistItem(playlistItemId)
  })

  it('should work with deleting playlists', async () => {
    const youtube = new YouTube(key, token)
    await youtube.oauth.deletePlaylist(playlistId)
  })

  it('should set channel watermarks', async () => {
    const youtube = new YouTube(key, token)

    if (!channel.id) {
      channel.id = (await youtube.oauth.getMe()).id
    }

    await youtube.oauth.setChannelWatermark(channel.id, 'fromStart', 3000, 10000, { data: readFileSync('./test/data/watermark.png'), type: 'png' })
  })

  it('should unset channel watermarks', async () => {
    const youtube = new YouTube(key, token)

    if (!channel.id) {
      channel.id = (await youtube.oauth.getMe()).id
    }

    await youtube.oauth.unsetChannelWatermark(channel.id)
  })

  it('should update channel localizations', async () => {
    const youtube = new YouTube(key, token)

    if (!channel.id) {
      channel.id = (await youtube.oauth.getMe()).id
    }

    // eslint-disable-next-line @typescript-eslint/naming-convention
    await youtube.oauth.updateChannelLocalizations(channel.id, { de_DE: { title: 'nicht brandon bothell', description: 'das ist sehr interresant' } })
  })

  it('should update a channel\'s made for kids status', async () => {
    const youtube = new YouTube(key, token)

    if (!channel) {
      channel = await youtube.oauth.getMe()
    }

    channel = await youtube.oauth.setChannelMadeForKids(channel.id, false)
    expect(channel.kids.selfDeclaredMadeForKids).to.equal(false)
  })

  it('should upload channel banners', async () => {
    const youtube = new YouTube(key, token)
    const url = await youtube.oauth.uploadChannelBanner({ type: 'png', data: readFileSync('./test/data/banner.png') })

    expect(url).to.be.a('string')
  })

  it('should work with adding channel sections', async () => {
    const youtube = new YouTube(key, token)
    const section = await youtube.oauth.addChannelSection('multipleChannels', 'Testing woot', undefined, undefined, [ 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', 'UCS5Oz6CHmeoF7vSad0qqXfw' ])
    sectionId = section.id

    expect(section.type).to.equal('multipleChannels')
    expect(section.name).to.equal('Testing woot')
    expect(section.channelId).to.equal(channel.id)
    expect(section.channelIds).to.contain('UC-lHJZR3Gqxm24_Vd_AJ5Yw').and.contain('UCS5Oz6CHmeoF7vSad0qqXfw')
  })

  it('should work with updating channel sections', async () => {
    const youtube = new YouTube(key, token)
    const section = await youtube.oauth.updateChannelSection(sectionId, 'multiplePlaylists', 'Test...', 1,
      [ 'PLnN8TpQ0Wd0ljBDpST59rMvl7pFmDXU74', 'PLnN8TpQ0Wd0lN-T7dZEyijkjA4A8spMq6' ])

    expect(section.type).to.equal('multiplePlaylists')
    expect(section.name).to.equal('Test...')
    expect(section.position).to.equal(1)
    expect(section.playlistIds).to.contain('PLnN8TpQ0Wd0ljBDpST59rMvl7pFmDXU74').and.contain('PLnN8TpQ0Wd0lN-T7dZEyijkjA4A8spMq6')
  })

  it('should work with deleting channel sections', async () => {
    const youtube = new YouTube(key, token)
    await youtube.oauth.deleteChannelSection(sectionId)
  })

  it('should get caption tracks of videos', async () => {
    if (!captionVideoId) {
      expect.fail('The environment variable YOUTUBE_CAPTION_VIDEO_ID must be set for this test to be ran!')
    }

    const youtube = new YouTube(key, token)
    const tracks = await youtube.oauth.getCaptions(captionVideoId)
    const track = await youtube.oauth.getCaption(captionVideoId, tracks[0].id)

    trackId = track.id

    expect(tracks).to.be.an('array')
    expect(tracks[0]).to.be.an.instanceOf(Caption)
    expect(track).to.be.an.instanceOf(Caption)
  })

  it('should download caption tracks', async () => {
    const youtube = new YouTube(key, token)
    captionTrack = await youtube.oauth.downloadCaption(trackId, 'sbv')

    expect(captionTrack).to.be.an.instanceOf(Buffer)
  })

  it('should update caption tracks', async () => {
    const youtube = new YouTube(key, token)
    const track = await youtube.oauth.updateCaption(trackId, captionTrack, false)

    expect(track.draft).to.equal(false)
  })

  it('should delete caption tracks', async () => {
    const youtube = new YouTube(key, token)

    if (!captionTrack) {
      console.log('no caption track to replace with, not attempting to delete the current one')
      return
    }

    await youtube.oauth.deleteCaption(trackId)
  })

  it('should upload caption tracks', async () => {
    if (!captionVideoId) {
      expect.fail('The environment variable YOUTUBE_CAPTION_VIDEO_ID must be set for this test to be ran!')
    }

    const youtube = new YouTube(key, token)
    const track = await youtube.oauth.uploadCaption(captionVideoId, 'en_US', 'Main', captionTrack, false)

    expect(track.draft).to.equal(false)
    expect(track.name).to.equal('Main')
    expect(track.language).to.equal('en-US')
  })
})
