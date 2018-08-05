import { YouTube, Channel } from '.'
import { apiKey } from './config'

const youtube = new YouTube(apiKey)

run()

async function run () {
  const videos = await youtube.getChannelVideos('UC6mi9rp7vRYninucP61qOjg')

  console.log(JSON.stringify(videos[0], null, 2))
  console.log(videos.length)
}
