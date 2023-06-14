import YouTube from '../src'
import { config as dotenv } from 'dotenv'

dotenv()

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

export const youtube = new YouTube(apiKey)
