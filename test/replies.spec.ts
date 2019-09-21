import 'mocha'
import { expect } from 'chai'
import YouTube, { YTComment } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Replies', () => {
  it('should work with valid comments with replies', async () => {
    const youtube = new YouTube(apiKey)

    const replies = await youtube.getCommentReplies('Ugyv3oMTx4CLRXS-9BZ4AaABAg')
    expect(replies[0]).to.be.instanceOf(YTComment)

    return {}
  }).timeout(3000)

  it('should not work with invalid comments/comments with no replies', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getCommentReplies('0').catch(error => { return error })).to.equal('Items not found')
  })

  it('should return an array with a length of <= maxResults', async () => {
    const youtube = new YouTube(apiKey)
    expect((await youtube.getCommentReplies('Ugyv3oMTx4CLRXS-9BZ4AaABAg', 1)).length).to.be.lessThan(2)
  })

  it('should have a parent ID of the comment it replied to', async () => {
    const youtube = new YouTube(apiKey)
    const comment = await youtube.getComment('Ugyv3oMTx4CLRXS-9BZ4AaABAg')
    const replies = await comment.fetchReplies(1)

    expect(replies[0].parentId).to.equal('Ugyv3oMTx4CLRXS-9BZ4AaABAg')
  }).timeout(8000)
})
