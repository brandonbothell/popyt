import 'mocha'
import './setup-instance'
import { Request } from '../src/util'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

const request = new Request('https://www.googleapis.com/youtube/v3/')

describe('Requests', () => {
  it('should work consistently', async () => {
    const res = await request.get('videos', {
      params: {
        id: 'dQw4w9WgXcQ',
        part: 'snippet'
      }, auth: { apiKey } })

    const res2 = await request.get('videos', {
      params: {
        id: 'dQw4w9WgXcQ',
        part: 'snippet'
      }, auth: { apiKey } })

    expect(res.id).to.equal(res2.id)
  })

  it('should throw errors', async () => {
    const res = await request.get('videos', {
      params: {
        id: '',
        part: 'some'
      }, auth: { apiKey } }).catch(e => e.message)
    expect(res).to.be.oneOf([ 'some', '\'some\'' ])
  })
})
