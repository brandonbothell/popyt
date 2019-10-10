import 'mocha'
import { assert } from 'chai'
import YouTube from '../src'

require('dotenv').config()
const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Banners', () => {
  it('should work with a valid channel url', async () => {
    const youtube = new YouTube(apiKey)
    const banners = await youtube.getChannelBanners('https://www.youtube.com/channel/UC8qU4aFe81jzG1attsyQ5wQ')
    assert(banners.hasOwnProperty('bannerImageUrl'))
  })

  it('should work with a valid channel id', async () => {
    const youtube = new YouTube(apiKey)
    const banners = await youtube.getChannelBanners('UC8qU4aFe81jzG1attsyQ5wQ')
    assert(banners.hasOwnProperty('bannerImageUrl'))
  })

  it('should work with fetching', async () => {
    const youtube = new YouTube(apiKey)
    const channel = await youtube.getChannel('UC8qU4aFe81jzG1attsyQ5wQ')
    await channel.fetchBanners()
    assert(channel.banners.hasOwnProperty('bannerImageUrl'))
  })
})
