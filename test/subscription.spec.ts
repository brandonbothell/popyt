import 'mocha'
import { Subscription, Channel } from '../src'
import { youtube } from './setup-instance'
import { expect } from 'chai'

let subscribedToChannel: Channel | undefined
let testSubscription: Subscription | undefined

describe('Subscriptions', () => {
  it('should set all available properties', async () => {
    testSubscription = (await youtube.getChannelSubscriptions('UC-bUmR394K0xQBPJifDgXww', { maxPerPage: 1 })).items[0]
    let subscriber = await testSubscription.getSubscriber([ 'id' ])
    subscribedToChannel = await testSubscription.getChannel([ 'id' ])

    subscribedToChannel = await testSubscription.getChannel()
    subscriber = await testSubscription.getSubscriber()

    expect(testSubscription.id).to.be.a('string')
    expect(testSubscription.subscriber.id).to.equal(subscriber?.id)
    expect(testSubscription.activities).to.satisfy(a => a === 'all' || a === 'uploads')
    expect(testSubscription.channel).to.satisfy(c => typeof c.id === 'string' && typeof c.name === 'string')
    expect(testSubscription.dateSubscribed).to.be.an.instanceOf(Date)
    expect(testSubscription.description).to.be.a('string')
    expect(testSubscription.full).to.equal(true)
    expect(testSubscription.items).to.satisfy(i => typeof i.new === 'number' && typeof i.total === 'number')
    expect(testSubscription.subscriber)
      .to.satisfy(s => typeof s.id === 'string' && typeof s.name === 'string' && typeof s.description === 'string' && typeof s.thumbnails === 'object')
    expect(testSubscription.thumbnails).to.satisfy(t => typeof t.default === 'object' && typeof t.medium === 'object' && typeof t.high === 'object')
    expect(testSubscription.title).to.be.a('string')
  })

  it('should throw an error on invalid type', () => {
    let error = ''

    try {
      new Subscription(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid subscription type: invalid')
  })

  let channel: Channel

  it('should work with a valid channel ID', async () => {
    channel = await youtube.getChannel('UC-bUmR394K0xQBPJifDgXww')
    const subscriptions = await youtube.getChannelSubscriptions(channel.id, { maxPerPage: 1 }, [ 'id' ])
    const allSubscriptions = await youtube.getChannelSubscriptions('UC-bUmR394K0xQBPJifDgXww', undefined, [ 'id' ])

    expect(subscriptions.items[0]).to.be.an.instanceOf(Subscription)
    expect(allSubscriptions.items.length).to.be.gte(subscriptions.items.length)
  })

  it('should work with a channel object', async () => {
    const subscriptions = await youtube.getChannelSubscriptions(channel, { maxPerPage: 1 }, [ 'id' ])
    expect(subscriptions.items[0]).to.be.an.instanceOf(Subscription)
  })

  it('should work when fetching by channels IDs', async () => {
    if (!subscribedToChannel) throw new Error('No channel object to test with')
    const subscription = await youtube.getSubscriptionByChannels('UC-bUmR394K0xQBPJifDgXww', subscribedToChannel.id, [ 'snippet' ])

    expect(subscription.subscriber.id).to.equal('UC-bUmR394K0xQBPJifDgXww')
    expect(subscription.channel.id).to.equal(subscribedToChannel.id)
  })

  it('should work when fetching by channel objects', async () => {
    if (!subscribedToChannel) throw new Error('No channel object to test with')
    const subscription = await youtube.getSubscriptionByChannels(channel, subscribedToChannel, [ 'snippet' ])

    expect(subscription.subscriber.id).to.equal('UC-bUmR394K0xQBPJifDgXww')
    expect(subscription.channel.id).to.equal(subscribedToChannel.id)
  })

  // See https://issuetracker.google.com/issues/288609601
  it('should fail when fetching directly with an API key', async () => {
    if (!testSubscription) throw new Error('No subscription object to test with')
    const error = await youtube.getSubscription(testSubscription.id).catch(error => error.message)

    // expect(subscription.id).to.equal(testSubscription.id)
    expect(error).to.equal('Invalid Credentials')
  })
})
