import { request as https, RequestOptions } from 'https'
import { OutgoingMessage } from 'http'
import { DefaultRequestOptions, Image, RequestPart, Authorization, HttpMethod } from '../..'
import { Parser } from './parser'
import { Handler } from './handler'

/**
 * @ignore
 */
/* istanbul ignore next */
export class Request {
  public baseUrl?: string

  private parser = new Parser(this)

  constructor (baseUrl?: string) {
    this.baseUrl = baseUrl
  }

  public get (subUrl: string, { auth, params }: DefaultRequestOptions = {}) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._get(url, { auth })
  }

  public post (subUrl: string, { auth, params, data }: DefaultRequestOptions & { data?: any } = {}) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._post(url, { auth, data })
  }

  public put (subUrl: string, { auth, params, data }: DefaultRequestOptions & { data?: any } = {}) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._put(url, { auth, data })
  }

  public delete (subUrl: string, { auth, params }: DefaultRequestOptions = {}) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._delete(url, { auth })
  }

  public imagePost (subUrl: string, { auth, params, image }: DefaultRequestOptions & { image: Image }) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._post(url, { auth, data: image.data, contentType: `image/${image.type}` })
  }

  public streamPut (subUrl: string, { auth, params, stream }: DefaultRequestOptions & { stream: Buffer }){
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._put(url, { auth, data: stream, contentType: 'application/octet-stream' })
  }

  public multipartStreamPost (subUrl: string, { auth, params, parts }: DefaultRequestOptions & { parts: RequestPart<Buffer | string>[] }) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    const boundary = this.parser.generateBoundary()

    if (parts.length < 2) {
      throw new Error('Multipart requests must have at least 2 parts.')
    }

    // First part is JSON, the rest are streams
    for (let i = 0; i < parts.length; i++) parts[i].contentType = i === 0 ? 'application/json' : 'application/octet-stream'

    return this._multipart(HttpMethod.POST, url, boundary, parts, auth)
  }

  public multipartImagePost (subUrl: string, { auth, params, parts, defaultImageType }: DefaultRequestOptions &
    { parts: RequestPart<string | Buffer>[]; defaultImageType?: 'jpeg' | 'png' | 'stream' }) {

    const url = this.parser.formUrl({ subUrl, params, auth })
    const boundary = this.parser.generateBoundary()

    if (parts.length < 2) {
      throw new Error('Multipart requests must have at least 2 parts.')
    }

    if (!parts[0].contentType) parts[0].contentType = 'application/json'

    for (let i = 1; i < parts.length; i++) {
      const contentType = parts[i].contentType

      if (defaultImageType && !contentType) {
        parts[i].contentType = defaultImageType === 'stream' ? 'application/octet-stream' : `image/${defaultImageType}`
      }

      if (!contentType.includes('/')) {
        parts[i].contentType = contentType === 'stream' ? 'application/octet-stream' : `image/${contentType}`
      }
    }

    return this._multipart(HttpMethod.POST, url, boundary, parts, auth)
  }

  public multipartStreamPut (subUrl: string, { auth, params, parts }: DefaultRequestOptions & { parts: RequestPart<Buffer | string>[] }) {
    const url = this.parser.formUrl({ subUrl, params, auth })
    const boundary = this.parser.generateBoundary()

    if (parts.length < 2) {
      throw new Error('Multipart requests must have at least 2 parts.')
    }

    for (let i = 0; i < parts.length; i++) parts[i].contentType = i === 0 ? 'application/json' : 'application/octet-stream'

    return this._multipart(HttpMethod.PUT, url, boundary, parts, auth)
  }

  /* ----- Private methods ----- */

  private request (options: RequestOptions, handler: (request: OutgoingMessage) => void): Promise<any> {
    return new Promise((resolve, reject) => handler(https(options, response => Handler.response.default(response, resolve, reject))))
  }

  /**
   * @param contentType Defaults to application/json
   */
  private _get (url: URL, { auth, contentType }: { auth?: Authorization; contentType?: string }) {
    const options = this.parser.formRequestOptions(url, 'GET', { contentType, accessToken: auth?.accessToken })
    return this.request(options, Handler.request.default)
  }

  private _post (url: URL, { auth, contentType, data }: { auth?: Authorization; contentType?: string; data: any }) {
    const options = this.parser.formRequestOptions(url, 'POST', { contentType, accessToken: auth?.accessToken })
    return this.request(options, req => Handler.request.default(req, data))
  }

  private _put (url: URL, { auth, contentType, data }: { auth?: Authorization; contentType?: string; data: any }) {
    const options = this.parser.formRequestOptions(url, 'PUT', { contentType, accessToken: auth?.accessToken })
    return this.request(options, request => Handler.request.default(request, data))
  }

  private _delete (url: URL, { auth, contentType }: { auth?: Authorization; contentType?: string }) {
    const options = this.parser.formRequestOptions(url, 'DELETE', { contentType, accessToken: auth?.accessToken })
    return this.request(options, Handler.request.default)
  }

  /**
   * @param boundary Parser.generateBoundary()
   */
  private _multipart (httpMethod: HttpMethod.PUT | HttpMethod.POST, url: URL, boundary: string, parts: RequestPart[], auth?: Authorization) {
    const method = HttpMethod[httpMethod] as keyof typeof HttpMethod
    const options = this.parser.formRequestOptions(url, method, { contentType: `multipart/form-data; boundary=${boundary}`, accessToken: auth?.accessToken })

    return this.request(options, request => Handler.request.multipart(request, parts, boundary))
  }
}

export default Request
