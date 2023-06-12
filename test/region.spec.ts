import 'mocha'
import { expect } from 'chai'
import { youtube } from './setup-instance'
import { Region } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Regions', () => {
  it('should set all available properties', async () => {
    let region = (await youtube.getRegions())[0]

    expect(region.full).to.equal(true)
    expect(region.id).to.be.a('string')
    expect(region.gl).to.be.a('string')
    expect(region.name).to.be.a('string')
  })

  it('should throw an error on invalid type', () => {
    let error = ''

    try {
      new Region(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid region type: invalid')
  })
})
