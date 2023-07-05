import 'mocha'
import { readFileSync } from 'fs'
import { Channel } from '../../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

/**
 * To test: https://developers.google.com/oauthplayground/#step1&apisSelect=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.force-ssl%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.readonly%2Chttps%3A%2F%2Fwww.googleapis.com%2Fauth%2Fyoutube.upload&url=https%3A%2F%2F&content_type=application%2Fjson&http_method=GET&useDefaultOauthCred=unchecked&oauthEndpointSelect=Google&oauthAuthEndpointValue=https%3A%2F%2Faccounts.google.com%2Fo%2Foauth2%2Fv2%2Fauth&oauthTokenEndpointValue=https%3A%2F%2Foauth2.googleapis.com%2Ftoken&includeCredentials=unchecked&accessTokenType=bearer&autoRefreshToken=unchecked&accessType=offline&prompt=consent&response_type=code&wrapLines=on
 */

let sectionId: string

describe('OAuth channels', () => {
  let channel: Channel

  it('should (un)subscribe to channels', async () => {
    channel = await youtube.getChannel('UCBR8-60-B28hp2BmDPdntcQ')
    const subscription = await channel.subscribe()

    expect(subscription.channel.id).to.equal(channel.id)

    await channel.unsubscribe(subscription.id)
  })

  it('should set channel watermarks', async () => {
    channel = await youtube.oauth.getMe()

    await channel.setWatermark('fromStart', 3000, 10000,
      { data: readFileSync('./test/data/watermark.png'), type: 'png' })
  })

  it('should unset channel watermarks', async () => {
    await channel.unsetWatermark()
  })

  it('should update channel localizations', async () => {
    if (!channel) channel = await youtube.oauth.getMe()
    await channel.updateLocalizations({
      // eslint-disable-next-line @typescript-eslint/naming-convention
      de_DE: { title: 'brandon bothell', description: 'das ist sehr interresant' }
    })

    expect(channel.localizations?.de_DE?.title).to.equal('brandon bothell')
    expect(channel.localizations?.de_DE?.description).to.equal('das ist sehr interresant')
  })

  it('should update a channel\'s made for kids status', async () => {
    await channel.setMadeForKids(false)
    expect(channel.kids.selfDeclaredMadeForKids).to.equal(false)
  })

  it('should upload and set channel banners', async () => {
    await channel.setBanner(
      { type: 'png', data: readFileSync('./test/data/banner.png') })

    expect(channel.banner).to.be.a('string')
  })

  it('should work with adding channel sections', async () => {
    const section = await youtube.oauth.channels.addChannelSection(
      'multipleChannels', 'Testing woot', undefined, undefined,
      [ 'UC-lHJZR3Gqxm24_Vd_AJ5Yw', 'UCS5Oz6CHmeoF7vSad0qqXfw' ])
    sectionId = section.id

    expect(section.type).to.equal('multiplechannels')
    expect(section.name).to.equal('Testing woot')
    expect(section.channelId).to.equal(channel.id)
    expect(section.channelIds).to.contain('UC-lHJZR3Gqxm24_Vd_AJ5Yw')
      .and.contain('UCS5Oz6CHmeoF7vSad0qqXfw')
  })

  it('should work with updating channel sections', async () => {
    const section = await youtube.oauth.channels.updateChannelSection(sectionId,
      'multiplePlaylists', 'Test...', 1,
      [ 'PLnN8TpQ0Wd0ljBDpST59rMvl7pFmDXU74', 'PLnN8TpQ0Wd0lN-T7dZEyijkjA4A8spMq6' ])
    sectionId = section.id

    expect(section.type).to.equal('multipleplaylists')
    expect(section.name).to.equal('Test...')
    expect(section.position).to.equal(1)
    expect(section.playlistIds).to.contain('PLnN8TpQ0Wd0ljBDpST59rMvl7pFmDXU74')
      .and.contain('PLnN8TpQ0Wd0lN-T7dZEyijkjA4A8spMq6')
  })

  it('should work with deleting channel sections', async () => {
    await youtube.oauth.channels.deleteChannelSection(sectionId)
  })
})
