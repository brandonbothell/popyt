import 'mocha'
import { expect } from 'chai'
import YouTube, { Channel, Playlist } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Channels', () => {
  it('should reject if the channel isn\'t found', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getChannel('').catch(error => { return error })).to.equal('Item not found')
  })

  it('should work with proper IDs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')).to.be.an.instanceOf(Channel)
  })

  it('should work with proper URLs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getChannelByUrl('https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ')).to.be.an.instanceOf(Channel)
  })

  it('shouldn\'t work with invalid URLs', async () => {
    const youtube = new YouTube(apiKey)
    expect(await youtube.getChannelByUrl('https://youtube.com/channel').catch(e => e)).to.equal('Not a valid channel url')
  })

  it('should work with fetching', async () => {
    const youtube = new YouTube(apiKey)
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')

    expect(await channel.fetch()).to.be.an.instanceOf(Channel)
  })

  it('should work with fetching videos', async () => {
    const youtube = new YouTube(apiKey)
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')

    expect(await channel.fetchVideos()).to.be.an.instanceOf(Playlist)
  })

  it('should have a negative subscriber count if it is hidden', async () => {
    const youtube = new YouTube(apiKey)
    const channel = await youtube.getChannel('UCacsMRrp9ql-vdgpn0zUIdQ')

    expect(channel.subCount).to.be.lessThan(0)
  })

  it('should contain branding properties', async () => {
    const youtube = new YouTube(apiKey)
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')

    expect(channel.banners).to.haveOwnProperty('bannerImageUrl')
    expect(channel.keywords.length).to.be.greaterThan(0)
    expect(channel.featuredChannels.length).to.be.greaterThan(0)
  })
})
