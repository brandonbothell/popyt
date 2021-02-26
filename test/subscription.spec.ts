import 'mocha'
import { expect } from 'chai'
import { youtube } from './setup-instance'
import { Subscription } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

let channelId: string

describe('Subscriptions', () => {
  it('should set all available properties', async () => {
    const subscription = (await youtube.getChannelSubscriptions('UCacsMRrp9ql-vdgpn0zUIdQ', 1))[0]

    expect(subscription.full).to.equal(false)
    await subscription.fetch()

    expect(subscription.id).to.be.a('string')
    /* **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600 */
    // expect(subscription.activities).to.satisfy(a => a === 'all' || a === 'uploads')
    expect(subscription.channel).to.satisfy(c => typeof c.id === 'string' && typeof c.name === 'string')
    channelId = subscription.channel.id
    expect(subscription.dateSubscribed).to.be.an.instanceOf(Date)
    expect(subscription.description).to.be.a('string')
    /* **CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600 */
    // expect(subscription.full).to.equal(true)
    // expect(subscription.items).to.satisfy(i => typeof i.new === 'number' && typeof i.total === 'number')
    // expect(subscription.subscriber).to.satisfy(s => typeof s.id === 'string' && typeof s.name === 'string' && typeof s.description === 'string' && typeof s.thumbnails === 'object')
    expect(subscription.thumbnails).to.satisfy(t => typeof t.default === 'object' && typeof t.medium === 'object' && typeof t.high === 'object')
    expect(subscription.title).to.be.a('string')
  })

  it('should throw an error on invalid type', () => {
    let error: string = null

    try {
      new Subscription(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid subscription type: invalid')
  })

  it('should work with valid channels with subscriptions', async () => {
    const subscriptions = await youtube.getChannelSubscriptions('UCacsMRrp9ql-vdgpn0zUIdQ', 1)
    const allSubscriptions = await youtube.getChannelSubscriptions('UCacsMRrp9ql-vdgpn0zUIdQ')

    expect(subscriptions[0]).to.be.an.instanceOf(Subscription)
    expect(allSubscriptions.length).to.be.gte(subscriptions.length)
  })

  it('should work when fetching by channels', async () => {
    const subscription = await youtube.getSubscriptionByChannels('UCacsMRrp9ql-vdgpn0zUIdQ', channelId)

    expect(subscription.subscriber.id).to.equal('UCacsMRrp9ql-vdgpn0zUIdQ')
    expect(subscription.channel.id).to.equal(channelId)
  })
})
