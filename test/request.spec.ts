import 'mocha'
import { Request } from '../src/util'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

const request = new Request('https://www.googleapis.com/youtube/v3')

describe('Requests', () => {
  it('should work with and without / before subUrl', async () => {
    const res = await request.api('/videos', {
      id: 'dQw4w9WgXcQ',
      part: 'snippet'
    }, apiKey)

    const res2 = await request.api('videos', {
      id: 'dQw4w9WgXcQ',
      part: 'snippet'
    }, apiKey)

    expect(res.id).to.equal(res2.id)
  })

  it('should throw errors', async () => {
    const res = await request.api('videos', { id: '', part: 'some' }, apiKey).catch(e => e.message)
    expect(res).to.be.oneOf([ 'some', '\'some\'' ])
  })
})
