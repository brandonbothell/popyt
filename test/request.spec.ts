import 'mocha'
import { expect } from 'chai'
import { request } from '../src/util'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Requests', () => {
  it('should work with and without / before subUrl', async () => {
    const res = await request.api('/videos', {
      id: 'dQw4w9WgXcQ',
      part: 'snippet',
      key: apiKey
    })
    const res2 = await request.api('videos', {
      id: 'dQw4w9WgXcQ',
      part: 'snippet',
      key: apiKey
    })

    expect(res.id).to.equal(res2.id)
  })

  it('should throw errors', async () => {
    const res = await request.api('videos', {}).catch(e => e.message)
    expect(res).to.equal('Required parameter: part')
  })
})
