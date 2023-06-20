import 'mocha'
import { expect } from 'chai'
import { YTComment } from '../src'
import { youtube } from './setup-instance'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Comments', () => {
  it('should work with valid videos with comments and replies', async () => {
    YTComment.part = 'id'

    const comments = await youtube.getVideoComments('Lq1D8PFnjWY', { maxPerPage: 1 })

    expect(comments[0]).to.be.an.instanceOf(YTComment)
    expect(comments[0].replies.length).to.be.greaterThan(0)
    expect(comments[0].replies[0].parentCommentId).to.equal(comments[0].id)
  })

  // Youtube has REMOVED the discussion tab from channels
  it('shouldn\'t work with valid channels with comments', async () => {
    expect(await youtube.getChannelComments('UC6mi9rp7vRYninucP61qOjg').catch(error => {
      return error.message
    })).to.include('The API server failed to successfully process the request.')
  })

  it('should work with fetching from a video object', async () => {
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    const comments = await video.fetchComments({ pages: 1 })

    expect(comments[0]).to.be.an.instanceOf(YTComment)
    expect(video.comments[0].id).to.equal(comments[0].id)
  })

  // Youtube has REMOVED the discussion tab from channels
  it('should not work with fetching from a channel object', async () => {
    const channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])

    expect(await channel.fetchComments(1, [ 'id' ]).catch(error => {
      return error.message
    })).to.include('The API server failed to successfully process the request.')
  })

  it('should not work with valid videos with comments disabled', async () => {
    expect(await youtube.getVideoComments('24EWkH5ipdw').catch(error => {
      return error.message
    }))
      .to.equal('The video identified by the <code><a href="/youtube/v3/docs/commentThreads/list#videoId">videoId</a></code> parameter has disabled comments.')
  })

  it('should not work with invalid videos', async () => {
    expect(await youtube.getVideoComments('JSFSFDKFaVeryFakeVideoID').catch(error => {
      return error.message
    })).to.equal('The video identified by the <code><a href="/youtube/v3/docs/commentThreads/list#videoId">videoId</a></code> parameter could not be found.')
  })

  it('should return an array with a length of <= maxPerPage', async () => {
    expect((await youtube.getVideoComments('Lq1D8PFnjWY', { maxPerPage: 1 }, [ 'id' ])).length).to.be.lessThan(2)
  })

  it('should work with fetching replies', async () => {
    expect(await ((await youtube.getVideoComments('Lq1D8PFnjWY', { maxPerPage: 1 }, [ 'id' ]))[0].fetchReplies())).to.be.an.instanceOf(Array)
  })

  it('should be individually gettable', async () => {
    expect(await youtube.getComment('Ugyv3oMTx4CLRXS-9BZ4AaABAg')).to.be.an.instanceOf(YTComment)
  })

  it('should have the ID of its video', async () => {
    const video = await youtube.getVideo('Lq1D8PFnjWY', [ 'id' ])
    const comments = await video.fetchComments({ maxPerPage: 1 }, [ 'snippet' ])

    expect(comments[0].videoId).to.equal('Lq1D8PFnjWY')
    // expect(comments[0].channelId).to.equal('UC6mi9rp7vRYninucP61qOjg')
    expect(comments[0].channelId).to.equal(undefined) // broken in the API!
  })

  it('should have a correct URL', async () => {
    const videoComment = (await (await youtube.getVideo('Lq1D8PFnjWY', [ 'id' ])).fetchComments())[0]
    // const channelComment = (await (await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])).fetchComments())[0]

    if (!videoComment) {
      expect.fail('Failed to find a comment to test')
    }

    expect(videoComment.url).to.equal('https://youtube.com/watch?v=Lq1D8PFnjWY&lc=' + videoComment.id)
    // expect(channelComment.url).to.equal('https://youtube.com/channel/UC6mi9rp7vRYninucP61qOjg/discussion?lc=' + channelComment.id)
  })
})
