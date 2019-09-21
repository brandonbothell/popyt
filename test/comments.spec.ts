import 'mocha'
import { expect } from 'chai'
import YouTube, { YTComment } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Comments', () => {
  it('should work with valid videos with comments and replies', async () => {
    const youtube = new YouTube(apiKey)
    const comments = await youtube.getVideoComments('Lq1D8PFnjWY')

    expect(comments[0]).to.be.an.instanceOf(YTComment)
    expect(comments.find(comment => comment.text.displayed.startsWith('comment')).replies[0]).to.be.an.instanceOf(YTComment)
  })

  it('should work with fetching from a video object', async () => {
    const youtube = new YouTube(apiKey)
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    const comments = await video.fetchComments()

    expect(comments[0]).to.be.an.instanceOf(YTComment)
    expect(video.comments[0].id).to.equal(comments[0].id)
  })

  it('should not work with valid videos with comments disabled', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getVideoComments('24EWkH5ipdw').catch(error => { return error })).to.equal('Items not found')
  })

  it('should not work with invalid videos', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getVideoComments('0').catch(error => { return error })).to.equal('Items not found')
  })

  it('should return an array with a length of <= maxResults', async () => {
    const youtube = new YouTube(apiKey)
    expect((await youtube.getVideoComments('Lq1D8PFnjWY', 1)).length).to.be.lessThan(2)
  })

  it('should work with fetching replies', async () => {
    const youtube = new YouTube(apiKey)
    expect(await ((await youtube.getVideoComments('Lq1D8PFnjWY', 1))[0].fetchReplies())).to.be.an.instanceOf(Array)
  })

  it('should be individually gettable', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getComment('Uggw2qPdnUEfcHgCoAEC')).to.be.an.instanceOf(YTComment)
  })

  it('should have a parent ID of its video', async () => {
    const youtube = new YouTube(apiKey)
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    const comments = await video.fetchComments(1)

    expect(comments[0].parentId).to.equal('Lq1D8PFnjWY')
  })
})
