import 'mocha'
import { Comment, Video } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

let video: Video

describe('Comments', () => {
  it('should work with valid videos with comments and replies', async () => {
    Comment.part = 'id'

    const comments = (await youtube.getVideoComments('Lq1D8PFnjWY', { maxPerPage: 1 })).items

    expect(comments[0]).to.be.an.instanceOf(Comment)
    expect(comments[0].replies.items.length).to.be.greaterThan(0)
    expect(comments[0].replies.items[0].parentCommentId).to.equal(comments[0].id)
  })

  it('should work with fetching from a video object', async () => {
    video = await youtube.getVideo('Lq1D8PFnjWY')
    const comments = (await video.fetchComments({ pages: 1 })).items

    expect(comments[0]).to.be.an.instanceOf(Comment)
    expect(video.comments.items[0].id).to.equal(comments[0].id)
  })

  it('should not work with valid videos with comments disabled', async () => {
    expect(await youtube.getVideoComments('24EWkH5ipdw').catch(error => error.message))
      .to.equal('The video identified by the <code><a href="/youtube/v3/docs/commentThreads/list#videoId">videoId</a></code> parameter has disabled comments.')
  })

  it('should not work with invalid videos', async () => {
    expect(await youtube.getVideoComments('JSFSFDKFaVeryFakeVideoID').catch(error => error.message))
      .to.equal('The video identified by the <code><a href="/youtube/v3/docs/commentThreads/list#videoId">videoId</a></code> parameter could not be found.')
  })

  it('should return an array with a length of <= maxPerPage', async () => {
    expect((await youtube.getVideoComments(video, { maxPerPage: 1 }, undefined, [ 'id' ])).items.length).to.be.lessThan(2)
  })

  it('should work with fetching replies', async () => {
    expect((await (
      await youtube.getVideoComments(video, { maxPerPage: 1 }, undefined, [ 'id' ])
    ).items[0].fetchReplies()).items).to.be.an.instanceOf(Array)
  })

  it('should be individually gettable', async () => {
    expect(await youtube.getComment('Ugyv3oMTx4CLRXS-9BZ4AaABAg')).to.be.an.instanceOf(Comment)
  })

  it('should have the ID of its video', async () => {
    const comment = (await video.fetchComments({ maxPerPage: 1 }, 'relevance', [ 'snippet' ])).items[0]

    expect(comment.videoId).to.equal(video.id)
    expect(comment.channelId).to.equal('UC6mi9rp7vRYninucP61qOjg')
  })

  it('should have a correct URL', async () => {
    const videoComment = (await video.fetchComments()).items[0]

    if (!videoComment) {
      expect.fail('Failed to find a comment to test')
    }

    expect(videoComment.url).to.equal('https://youtube.com/watch?v=Lq1D8PFnjWY&lc=' + videoComment.id)
  })
})
