import 'mocha'
import { expect } from 'chai'
import { youtube } from './setup-instance'
import { Caption } from '../src'

const apiKey = process.env.YOUTUBE_API_KEY

if (!apiKey) {
  throw new Error('No API key')
}

describe('Captions', () => {
  it('should set all available properties', async () => {
    const caption = new Caption(null, {
      kind: 'youtube#caption',
      id: 'ntWkkGS08UHTMx0fznJZWEzbapg-mRyAFgHHbWSPj7dbvy48tY7fdA==',
      snippet: {
        videoId: 'veryrealvideoid4234',
        lastUpdated: '2020-06-11T08:50:55.734000Z',
        trackKind: 'standard',
        language: 'en-US',
        name: 'Main',
        audioTrackType: 'unknown',
        isCC: false,
        isLarge: false,
        isEasyReader: false,
        isDraft: false,
        isAutoSynced: false,
        status: 'serving'
      }
    })

    expect(caption.id).to.be.a('string')
    expect(caption.videoId).to.be.a('string')
    expect(caption.kind).to.be.a('string')
    expect(caption.language).to.be.a('string')
    expect(caption.name).to.be.a('string')
    expect(caption.audioType).to.be.a('string')
    expect(caption.status).to.be.a('string')

    expect(caption.full).to.be.a('boolean')
    expect(caption.closedCaptions).to.be.a('boolean')
    expect(caption.large).to.be.a('boolean')
    expect(caption.easyReader).to.be.a('boolean')
    expect(caption.draft).to.be.a('boolean')
    expect(caption.autoSynced).to.be.a('boolean')

    expect(caption.lastUpdated).to.be.an.instanceOf(Date)
  })

  it('should throw an error on invalid type', () => {
    let error: string = null

    try {
      new Caption(youtube, { kind: 'invalid' })
    } catch (err) {
      error = err.message
    }

    expect(error).to.equal('Invalid caption type: invalid')
  })
})
