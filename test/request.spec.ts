import 'mocha'
import './setup-instance'
import path from 'path'
import { readFileSync } from 'fs'
import { Request } from '../src/util'
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

const request = new Request('https://www.googleapis.com/youtube/v3/', { apiKey })
const testRequest = new Request('https://apichallenges.herokuapp.com/mirror/request/')

describe('Requests', () => {
  it('should work consistently', async () => {
    const res = await request.get('videos', {
      params: {
        id: 'dQw4w9WgXcQ',
        part: 'snippet'
      }, authorizationOptions: { apiKey: true } })

    const res2 = await request.get('videos', {
      params: {
        id: 'dQw4w9WgXcQ',
        part: 'snippet'
      }, authorizationOptions: { apiKey: true } })

    expect(res.id).to.equal(res2.id)
  })

  it('should work with multipart requests', async () => {
    const testData = JSON.stringify({ testKey: 'testValue' })
    const result: string = await testRequest.multipartStreamPost('', {
      parts: [{
        data: testData
      }, {
        data: readFileSync(path.join(process.cwd(), 'package.json'))
      }],
      accept: 'application/json'
    }).then(result => result.messageDetails)

    expect(result.startsWith('POST https://apichallenges.herokuapp.com/mirror/request/')).to.equal(true)
    expect(result).to.include('Content-Type: multipart/form-data; boundary=--------------------------')
    expect(result).to.include(`Content-Disposition: form-data; name="0"\nContent-Type: application/json\n\n${testData}`)
    expect(result).to.include(`Content-Disposition: form-data; name="1"\nContent-Type: application/octet-stream\n\n${
      readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf8' })
    }`)
    expect(result.endsWith('--\n')).to.equal(true)
  })

  it('should throw errors', async () => {
    const res = await request.get('videos', {
      params: {
        id: '',
        part: 'some'
      }, authorizationOptions: { apiKey: true } }).catch(e => e.message)
    expect(res).to.be.oneOf([ 'some', '\'some\'' ])
  })
})
