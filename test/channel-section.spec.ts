import 'mocha'
import { ChannelSection, Channel, Playlist } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

let sections: ChannelSection[]

describe('Channel sections', () => {
  let channel: Channel

  it('should set all available properties', async () => {
    channel = await youtube.getChannel('UC6mi9rp7vRYninucP61qOjg', [ 'id' ])
    sections = await youtube.getChannelSections(channel.id)

    sections.forEach(section => {
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
    sections = await youtube.getChannelSections(channel)
    const section = sections.find(s => s.channelIds)
    const antiSection = sections.find(s => !s.channelIds)

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
    if (!sections) throw new Error('No channel section object to test with')

    const section = sections.find(s => s.playlistIds || s.type === 'allplaylists')
    const antiSection = sections.find(s => !s.playlistIds && s.type !== 'allplaylists')

    if (!section || !antiSection) {
      expect.fail('Not enough data to fully test function behavior')
    }

    await section.fetchPlaylists(undefined, [ 'id' ])
    await antiSection.fetchPlaylists(undefined, [ 'id' ])

    expect(section.playlists![0]).to.be.an.instanceOf(Playlist)
    expect(antiSection.playlists).to.equal(undefined)
  })

  it('should work when fetching by channel section objects', async () => {
    if (!sections?.length) throw new Error('No channel section object to test with')
    const section = await youtube.getChannelSection(sections[0].id)

    expect(section.id).to.equal(sections[0].id)
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
