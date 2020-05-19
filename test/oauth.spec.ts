import 'mocha'
import { expect } from 'chai'
import { YouTube, VideoAbuseReportReason } from '../src'
import { readFileSync } from 'fs'

const key = process.env.YOUTUBE_API_KEY
const token = process.env.YOUTUBE_ACCESS_TOKEN
const thumbnailVideoId = process.env.YOUTUBE_THUMBNAIL_VIDEO_ID

if (!key) {
  throw new Error('No API key')
}

if (!token) {
  throw new Error('No access token')
}

let channelId: string

let commentId: string
let commentReplyId: string

let playlistId: string
let playlistItemId: string

describe('OAuth', () => {
  it('should fetch my channel', async () => {
    const youtube = new YouTube(key, token)
    const channel = await youtube.oauth.getMe()
    channelId = channel.id

    expect(channel.id).to.be.a('string')
  }).timeout(8000)

  it('should fetch my subscriptions', async () => {
    const youtube = new YouTube(key, token)
    const subscription = (await youtube.oauth.getMySubscriptions(1))[0]

    expect(subscription.id).to.be.a('string')
  }).timeout(8000)

  it('should fetch my playlists', async () => {
    const youtube = new YouTube(key, token)
    const playlist = (await youtube.oauth.getMyPlaylists(1))[0]

    expect(playlist.id).to.be.a('string')
  }).timeout(8000)

  it('should post comments', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.postComment(text, channelId)
    commentId = comment.id

    expect(comment.parentId).to.equal(channelId)
  }).timeout(8000)

  it('should edit comments', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.editComment(text, commentId)

    expect(comment.text.original).to.equal(text)
  }).timeout(8000)

  it('should post comment replies', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.replyToComment(commentId, text)
    commentReplyId = comment.id

    expect(comment.parentId).to.equal(commentId)
  }).timeout(8000)

  it('should edit comment replies', async () => {
    const youtube = new YouTube(key, token)
    const text = `testing ${new Date()}`
    const comment = await youtube.oauth.editCommentReply(commentReplyId, text)

    expect(comment.text.original).to.equal(text)
  }).timeout(8000)

  it('should delete comments', async () => {
    const youtube = new YouTube(key, token)
    await youtube.oauth.deleteComment(commentId)
  })

  it('should (un)subscribe to channels', async () => {
    const youtube = new YouTube(key, token)
    const channel = 'UCBR8-60-B28hp2BmDPdntcQ'
    const subscription = await youtube.oauth.subscribeToChannel(channel)

    expect(subscription.channel.id).to.equal(channel)

    await youtube.oauth.unsubscribeFromChannel(subscription.id)
  }).timeout(8000)

  it('should rate videos', async () => {
    const youtube = new YouTube(key, token)

    await youtube.oauth.rateVideo('E6UTz_Doic8', 'like')
    await youtube.oauth.rateVideo('E6UTz_Doic8', 'none')
  }).timeout(8000)

  it('should retrieve ratings on videos', async () => {
    const youtube = new YouTube(key, token)
    const rating = (await youtube.oauth.getMyRatings([ 'E6UTz_Doic8' ]))[0].rating

    expect(rating).to.equal('none')
  }).timeout(8000)

  it('should set thumbnails', async () => {
    if (!thumbnailVideoId) {
      expect(false).to.equal('The environment variable YOUTUBE_THUMBNAIL_VIDEO_ID must be set for this test to be ran!')
    }

    const image = readFileSync('./test/data/image.jpg')

    const youtube = new YouTube(key, token)
    const thumbnails = await youtube.oauth.setThumbnail(thumbnailVideoId, { type: 'jpeg', data: image })

    expect(thumbnails.default.url).to.be.a('string')
  }).timeout(8000)

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
    let error: string = null

    try {
      // tslint:disable-next-line:no-unused-expression
      new VideoAbuseReportReason(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid video abuse report reason type: invalid')
  })

  it('should work with creating playlists', async () => {
    const youtube = new YouTube(key, token)
    const playlist = await youtube.oauth.createPlaylist('Some playlist', 'An awesome playlist!', 'unlisted', [ 'awesome', 'cool' ], 'en_US',
      // eslint-disable-next-line camelcase
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

    if (!channelId) {
      channelId = (await youtube.oauth.getMe()).id
    }

    await youtube.oauth.setChannelWatermark(channelId, 'fromStart', 3000, 10000, readFileSync('./test/data/watermark.png'), 'png')
  })

  it('should unset channel watermarks', async () => {
    const youtube = new YouTube(key, token)

    if (!channelId) {
      channelId = (await youtube.oauth.getMe()).id
    }

    await youtube.oauth.unsetChannelWatermark(channelId)
  })
})
