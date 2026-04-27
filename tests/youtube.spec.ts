import 'mocha'
import { Request } from '../src/util'
import YouTube from '../src'
// @ts-expect-error
import { expect } from 'chai'

const testRequest = new Request('https://httpbin.org/anything')

describe('YouTube instance', () => {
  it('should set authorization', async () => {
    const youtube = new YouTube('Totally An Api Key', 'Another API key', { request: testRequest })
    expect(youtube.hasAccessToken()).to.equal(true)

    let response = await testRequest.get('', {
      authorizationOptions: { accessToken: true },
      accept: 'application/json'
    })

    expect(response.headers['Authorization']).to.equal('Bearer Another API key')

    youtube.setAuthorization({ apiKey: 'Fakest API Key Ever' })
    response = await testRequest.get('', {
      authorizationOptions: { apiKey: true },
      accept: 'application/json'
    })

    expect(response.args['key']).to.equal('Fakest API Key Ever')
  })
})
