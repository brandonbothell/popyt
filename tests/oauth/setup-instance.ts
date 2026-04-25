import YouTube from '../../src'
import 'dotenv/config'

const apiKey = process.env.YOUTUBE_OAUTH_API_KEY
const accessToken = process.env.YOUTUBE_ACCESS_TOKEN

if (!apiKey) {
  throw new Error('No API key')
}

if (!accessToken) {
  throw new Error('No access token')
}

export const youtube = new YouTube(apiKey, accessToken)
