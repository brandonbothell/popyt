import 'mocha'
import { expect } from 'chai'
import { youtube } from './cache.spec'
import { VideoCategory, Channel } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Video categories', () => {
  it('should set all available properties', async () => {
    const category = (await youtube.getCategories('US', false))[0]

    expect(category.full).to.equal(true)
    await category.fetch()

    expect(category.id).to.be.a('string')
    expect(category.channelId).to.be.a('string')
    expect(category.title).to.be.a('string')
    expect(category.assignable).to.be.a('boolean')
  })

  it('should throw an error on invalid type', () => {
    let error: string = null

    try {
      // tslint:disable-next-line:no-unused-expression
      new VideoCategory(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid video category type: invalid')
  })

  it('should work with fetching categories directly', async () => {
    const category = (await youtube.getCategories('US', true))[0]
    expect(category.id).to.be.a('string')
  })

  it('should work with fetching categories\' channels', async () => {
    const category = (await youtube.getCategories())[0]
    expect(await category.getChannel()).to.be.an.instanceOf(Channel)
  })
})
