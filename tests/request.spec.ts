import 'mocha'
import './setup-instance'
import path from 'path'
import { readFileSync } from 'fs'
import { Request } from '../src/util'
// @ts-expect-error
import { expect } from 'chai'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

const request = new Request('https://www.googleapis.com/youtube/v3/', { apiKey })
const testRequest = new Request('https://httpbin.org/anything')

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
    const result: {
      args: any
      data: string
      files: any
      form: { [key: number]: string }
      headers: { [key: string]: string }
      json: any
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH'
      origin: string
      url: string
    } = await testRequest.multipartStreamPost('', {
      parts: [{
        data: testData
      }, {
        data: readFileSync(path.join(process.cwd(), 'package.json'))
      }],
      accept: 'application/json'
    })

    expect(result.url).to.equal('https://httpbin.org/anything')
    expect(result.method).to.equal('POST')
    expect(result.url).to.equal('https://httpbin.org/anything')
    expect(result.headers['Content-Type']).to.include('multipart/form-data; boundary=--------------------------')
    expect(JSON.stringify(result.form[0])).to.equal(JSON.stringify(testData))
    expect(result.form[1]).to.equal(readFileSync(path.join(process.cwd(), 'package.json'), { encoding: 'utf8' }))
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
