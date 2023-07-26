import 'mocha'
import { Channel, Playlist, Subscription, ChannelSection, PaginatedResponse } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Channels', () => {
  it('should reject if the channel isn\'t found', async () => {
    expect(await youtube.getChannel('UCQWERTRTRWEaVeryFakeChannelID').catch(error => error.message)).to.equal('Item not found')
  })

  it('should work with multiple different resolutions at once', async () => {
    const result = await youtube.getChannel([ 'UCBR8-60-B28hp2BmDPdntcQ', 'youtube.com/c/UC6mi9rp7vRYninucP61qOjg', 'gaming shorts' ], [ 'id' ])

    expect(result.length).to.equal(3)
    expect(result[0]).to.be.an.instanceOf(Channel)
  })

  it('should work with proper IDs', async () => {
    expect(await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ', [ 'id', 'contentDetails', 'brandingSettings' ])).to.be.an.instanceOf(Channel)
  })

  it('should work with proper URLs', async () => {
    expect(await youtube.getChannel('https://www.youtube.com/channel/UCBR8-60-B28hp2BmDPdntcQ', [ 'id' ])).to.be.an.instanceOf(Channel)
  })

  it('should work with proper usernames', async () => {
    expect(await youtube.getChannel('@brandonbothell', [ 'id' ]))
      .to.be.an.instanceOf(Channel)
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
    expect((await channel.fetchPlaylists({ pages: 2 }, [ 'id' ]))
      .items.length).to.equal(100)
  })

  it('should work with fetching playlists', async () => {
    const channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])
    expect((await channel.fetchPlaylists(undefined, [ 'id', 'contentDetails' ]))
      .items[0]).to.be.an.instanceOf(Playlist)
  })

  it('should work with caching playlists', async () => {
    const channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])
    let playlist: Playlist | Promise<PaginatedResponse<Playlist>> =
      channel.fetchPlaylists(undefined, [ 'contentDetails' ])
    const time = new Date().getTime()

    playlist = (await playlist).items[0]

    expect(new Date().getTime() - time).to.be.lessThan(50)
    expect(playlist).to.be.an.instanceOf(Playlist)
    expect(playlist.length).to.be.a('number')
  })

  it('should work with fetching pages of subscriptions', async () => {
    const channel = await youtube.getChannel('UCg4XK-l40KZD7fLi12pJ1YA', [ 'id' ])
    expect((await channel.fetchSubscriptions({ pages: 1 }, [ 'id' ]))
      .items[0]).to.be.an.instanceOf(Subscription)
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
