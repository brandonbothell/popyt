import 'mocha'
import { Request } from '../src/util'
import YouTube from '../src'
import { expect } from 'chai'

const testRequest = new Request('https://apichallenges.herokuapp.com/mirror/request/')

describe('YouTube instance', () => {
  it('should set authorization', async () => {
    const youtube = new YouTube('Totally An Api Key', 'Another API key', { request: testRequest })
    expect(youtube.hasAccessToken()).to.equal(true)

    let response = await youtube._request.get('', {
      authorizationOptions: { accessToken: true },
      accept: 'application/json'
    })

    expect(response.messageDetails.includes('Authorization: Bearer Another API key\n'))

    youtube.setAuthorization({ apiKey: 'Fakest API Key Ever' })
    response = await youtube._request.get('', {
      authorizationOptions: { apiKey: true },
      accept: 'application/json'
    })

    expect(response.messageDetails.includes('key: Fakest API Key Ever\n'))
  })
})
