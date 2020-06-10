import YouTube from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

export const youtube = new YouTube(apiKey)
