import 'mocha'
import { expect } from 'chai'
import { youtube } from './cache.spec'
import { Language } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Languages', () => {
  it('should set all available properties', async () => {
    let language = (await youtube.getLanguages())[0]

    expect(language.full).to.equal(true)
    expect(language.id).to.be.a('string')
    expect(language.hl).to.be.a('string')
    expect(language.name).to.be.a('string')
  })

  it('should throw an error on invalid type', () => {
    let error: string = null

    try {
      new Language(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid language type: invalid')
  })
})
