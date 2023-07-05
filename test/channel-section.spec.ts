import 'mocha'
import { ChannelSection, Channel, Playlist, Subscription } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Channel sections', () => {
  let channel: Channel

  it('should set all available properties', async () => {
    channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])
    await channel.fetchSections()

    channel.sections.forEach(section => {
      expect(section.full).to.equal(true)

      expect(section.id).to.be.a('string')
      expect(section.channelId).to.be.a('string')
      expect(section.position).to.be.a('number').and.gte(0)
      expect(section.type).to.be.a('string')

      if (section.name) expect(section.name).to.be.a('string')
      if (section.channelIds) expect(section.channelIds).to.be.an('array')
      if (section.playlistIds) expect(section.playlistIds).to.be.an('array')
    })
  })

  it('should fetch channels', async () => {
    const section = channel.sections.find(s => s.channelIds)
    const antiSection = channel.sections.find(s => !s.channelIds)

    if (!section || !antiSection) {
      expect.fail('Not enough data to fully test function behavior')
    }

    await section.fetch()

    await section.fetchChannels([ 'id' ])
    await antiSection.fetchChannels([ 'id' ])

    expect(section.channels![0]).to.be.an.instanceOf(Channel)
    expect(antiSection.channels).to.equal(undefined)
  })

  it('should fetch playlists', async () => {
    if (!channel?.sections) expect.fail('No channel/sections to test with')

    const section = channel.sections.find(s => s.playlistIds || s.type === 'allplaylists')
    const antiSection = channel.sections.find(s => !s.playlistIds && s.type !== 'allplaylists')

    if (!section || !antiSection) {
      expect.fail('Not enough data to fully test function behavior')
    }

    await section.fetchPlaylists(undefined, [ 'id' ])
    await antiSection.fetchPlaylists(undefined, [ 'id' ])

    expect(section.playlists![0]).to.be.an.instanceOf(Playlist)
    expect(antiSection.playlists).to.equal(undefined)
  })

  it('should fetch subscriptions', async () => {
    const subsChannel = await youtube.getChannel('UCtLzXn558vm61TEdF2uJXwg', [ 'id' ])
    await subsChannel.fetchSections()

    const section = subsChannel.sections.find(s => s.type === 'subscriptions')
    const antiSection = subsChannel.sections.find(s => s.type !== 'subscriptions')

    if (!section || !antiSection) {
      expect.fail('Not enough data to fully test function behavior')
    }

    await section.fetchSubscriptions(undefined, [ 'id' ])
    await antiSection.fetchSubscriptions(undefined, [ 'id' ])

    expect(section.subscriptions?.items[0]).to.be.an.instanceOf(Subscription)
    expect(antiSection.subscriptions).to.equal(undefined)
  })

  it('should work when fetching by channel section objects', async () => {
    if (!channel?.sections?.length) throw new Error('No channel section object to test with')
    const section = await youtube.getChannelSection(channel.sections[0].id)

    expect(section.id).to.equal(channel.sections[0].id)
  })

  it('should throw an error on invalid type', () => {
    let error = ''

    try {
      new ChannelSection(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid channel section type: invalid')
  })
})
