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
    const comments = await youtube.getVideoComments('Lq1D8PFnjWY', 1)

    expect(comments[0]).to.be.an.instanceOf(YTComment)
  })

  it('should work with valid channels with comments', async () => {
    const youtube = new YouTube(apiKey)
    const comments = await youtube.getChannelComments('UC6mi9rp7vRYninucP61qOjg', 1)

    expect(comments[0]).to.be.an.instanceOf(YTComment)
  })

  it('should work with fetching from a video object', async () => {
    const youtube = new YouTube(apiKey)
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    const comments = await video.fetchComments(1)

    expect(comments[0]).to.be.an.instanceOf(YTComment)
    expect(video.comments[0].id).to.equal(comments[0].id)
  })

  it('should work with fetching from a channel object', async () => {
    const youtube = new YouTube(apiKey)
    const channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg')
    const comments = await channel.fetchComments(1)

    expect(comments[0]).to.be.an.instanceOf(YTComment)
    expect(channel.comments[0].id).to.equal(comments[0].id)
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
    expect(await youtube.getComment('Ugyv3oMTx4CLRXS-9BZ4AaABAg')).to.be.an.instanceOf(YTComment)
  })

  it('should have a parent ID of its video', async () => {
    const youtube = new YouTube(apiKey)
    const video = await youtube.getVideo('Lq1D8PFnjWY')
    const comments = await video.fetchComments(1)

    expect(comments[0].parentId).to.equal('Lq1D8PFnjWY')
  })

  it('should have a correct URL', async () => {
    const youtube = new YouTube(apiKey)
    const videoComment = (await (await youtube.getVideo('Lq1D8PFnjWY')).fetchComments()).find(c => c.id === 'Ugyv3oMTx4CLRXS-9BZ4AaABAg')
    const channelComment = (await (await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg')).fetchComments()).find(c => c.id === 'UgjH7gcaETIe4HgCoAEC')

    expect(videoComment.url).to.equal('https://youtube.com/watch?v=Lq1D8PFnjWY&lc=Ugyv3oMTx4CLRXS-9BZ4AaABAg')
    expect(channelComment.url).to.equal('https://youtube.com/channel/UC6mi9rp7vRYninucP61qOjg/discussion?lc=UgjH7gcaETIe4HgCoAEC')
  }).timeout(8000)
})
