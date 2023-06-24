import 'mocha'
import { Comment } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

describe('Replies', () => {
  let comment: Comment

  it('should work with valid comments with replies', async () => {
    comment = await youtube.getComment('Ugyv3oMTx4CLRXS-9BZ4AaABAg', [ 'id' ])
    const replies = (await youtube.getCommentReplies(comment)).items
    expect(replies[0]).to.be.instanceOf(Comment)
  })

  it('should return an empty array with invalid comments/comments with no replies', async () => {
    expect((await youtube.getCommentReplies('0')).items.length).to.equal(0)
  })

  it('should return an array with a length of <= maxPerPage', async () => {
    expect((await youtube.getCommentReplies(comment.id, { maxPerPage: 1 })).items.length).to.be.lessThan(2)
  })

  it('should have the ID of the comment it replied to', async () => {
    if (!comment) throw new Error('No comment to test on')
    const replies = (await comment.fetchReplies({ maxPerPage: 1 })).items
    expect(replies[0].parentCommentId).to.equal(comment.id)
  })
})
