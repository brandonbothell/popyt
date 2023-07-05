import 'mocha'
import { Comment } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */

let comment: Comment
let commentId: string
let reply: Comment
let commentReplyId: string

describe('OAuth comments', () => {
  it('should post comments', async () => {
    const text = `testing ${new Date()}`
    const uploads = (await youtube.oauth.getMyUploads()).items
    comment = await youtube.oauth.comments.postComment(
      text, uploads[0].channel.id, uploads[0].id)
    commentId = comment.id

    expect(comment.datePublished.getDay()).to.equal(new Date().getDay())
  })

  it('should edit comments', async () => {
    const text = `testing ${new Date()}`
    await comment.edit(text)
    expect(comment.text.original).to.equal(text)
  })

  it('should post comment replies', async () => {
    const text = `testing ${new Date()}`
    reply = await comment.reply(text)
    commentReplyId = reply.id

    expect(reply.parentCommentId).to.equal(commentId)
  })

  it('should edit comment replies', async () => {
    const text = `testing ${new Date()}`
    await reply.edit(text)

    expect(reply.text.original).to.equal(text)
  })

  it('should delete comments', async () => {
    await comment.delete()
  })
})
