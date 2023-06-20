import 'mocha'
import { expect } from 'chai'
import { Channel, Playlist, Subscription, ChannelSection } from '../src'
import { youtube } from './setup-instance'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Channels', () => {
  it('should reject if the channel isn\'t found', async () => {
    expect(await youtube.getChannel('UCQWERTRTRWEaVeryFakeChannelID').catch(error => {
      return error
    })).to.equal('Item not found')
  })

  it('should work with proper IDs', async () => {
    expect(await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'id', 'contentDetails', 'brandingSettings' ])).to.be.an.instanceOf(Channel)
  })

  it('should work with proper URLs', async () => {
    expect(await youtube.getChannel('https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ', [ 'id' ])).to.be.an.instanceOf(Channel)
  })

  it('should work with single searching', async () => {
    expect(await youtube.getChannel('youtube', [ 'id' ])).to.be.an.instanceOf(Channel)
  })

  it('should work with fetching', async () => {
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'id' ])
    expect(await channel.fetch([ 'id' ])).to.be.an.instanceOf(Channel)
  })

  it('should work with fetching videos', async () => {
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'contentDetails' ])
    expect(await channel.fetchVideos([ 'id' ])).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching pages of playlists', async () => {
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'id' ])
    expect((await channel.fetchPlaylists({ pages: 2 }, [ 'id' ])).length).to.equal(100)
  })

  it('should work with fetching playlists', async () => {
    const channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])
    expect((await channel.fetchPlaylists(undefined, [ 'id' ]))[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with fetching pages of subscriptions', async () => {
    const channel = await youtube.getChannel('UCg4XK-l40KZD7fLi12pJ1YA', [ 'id' ])
    expect((await channel.fetchSubscriptions({ pages: 1 }, [ 'id' ]))[0]).to.be.an.instanceOf(Subscription)
  })

  it('should work with fetching sections', async () => {
    const channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])
    expect((await channel.fetchSections([ 'id' ]))[0]).to.be.an.instanceOf(ChannelSection)
  })

  it('should contain branding properties', async () => {
    const channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'brandingSettings' ])
    expect(channel.keywords.length).to.be.greaterThan(0)
  })
})
