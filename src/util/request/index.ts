import { request as https, RequestOptions } from 'https'
import { OutgoingMessage } from 'http'
import { DefaultRequestOptions, Image, RequestPart,
  Authorization, HttpMethod, AuthorizationOptions } from '../..'
import { Parser } from './parser'
import { Handler } from './handler'

/**
 * @ignore
 */
export class Request {
  public baseUrl?: string

  #auth?: Authorization

  private parser = new Parser(this)

  constructor (baseUrl?: string, authorization?: Authorization) {
    this.baseUrl = baseUrl
    this.#auth = authorization
  }

  public get (subUrl: string, { authorizationOptions, params, accept }:
  DefaultRequestOptions = {}) {
    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._get(url, { auth, accept })
  }

  public post (subUrl: string,
    { authorizationOptions, params, accept, data, contentType }:
    DefaultRequestOptions & { data?: any; contentType?: string } = {}) {

    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._post(url, { auth, data, contentType, accept })
  }

  public put (subUrl: string,
    { authorizationOptions, params, accept, data, contentType }:
    DefaultRequestOptions & { data?: any; contentType?: string } = {}) {

    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._put(url, { auth, data, contentType, accept })
  }

  public delete (subUrl: string, { authorizationOptions, params, accept }:
  DefaultRequestOptions = {}) {
    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._delete(url, { auth, accept })
  }

  public imagePost (subUrl: string, { authorizationOptions, params, accept, image }:
  DefaultRequestOptions & { image: Image }) {
    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._post(url, {
      auth,
      data: image.data,
      contentType: `image/${image.type}`,
      accept
    })
  }

  public streamPut (subUrl: string, { authorizationOptions, params, accept, stream }:
  DefaultRequestOptions & { stream: Buffer }){
    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    return this._put(url, {
      auth,
      data: stream,
      contentType: 'application/octet-stream',
      accept
    })
  }

  public multipartStreamPost (subUrl: string,
    { authorizationOptions, params, accept, parts }:
    DefaultRequestOptions & { parts: RequestPart<Buffer | string>[] }) {

    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    const boundary = this.parser.generateBoundary()

    if (parts.length < 2) {
      throw new Error('Multipart requests must have at least 2 parts.')
    }

    // First part is JSON, the rest are streams
    for (let i = 0; i < parts.length; i++) {
      parts[i].contentType = i === 0 ? 'application/json' : 'application/octet-stream'
    }

    return this._multipart(HttpMethod.POST, url, boundary, parts, auth, accept)
  }

  public multipartImagePost (subUrl: string,
    { authorizationOptions, params, accept, parts, defaultImageType }:
    DefaultRequestOptions & {
      parts: RequestPart<string | Buffer>[]
      defaultImageType?: 'jpeg' | 'png' | 'stream'
    }) {

    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    const boundary = this.parser.generateBoundary()

    if (parts.length < 2) {
      throw new Error('Multipart requests must have at least 2 parts.')
    }

    if (!parts[0].contentType) parts[0].contentType = 'application/json'

    for (let i = 1; i < parts.length; i++) {
      const contentType = parts[i].contentType

      if (defaultImageType && !contentType) {
        parts[i].contentType = defaultImageType === 'stream' ?
          'application/octet-stream' :
          `image/${defaultImageType}`
      }

      if (!contentType.includes('/')) {
        parts[i].contentType = contentType === 'stream' ?
          'application/octet-stream' :
          `image/${contentType}`
      }
    }

    return this._multipart(HttpMethod.POST, url, boundary, parts, auth, accept)
  }

  public multipartStreamPut (subUrl: string,
    { authorizationOptions, params, accept, parts }:
    DefaultRequestOptions & { parts: RequestPart<Buffer | string>[] }) {

    const auth = this.getAuthorization(authorizationOptions)
    const url = this.parser.formUrl({ subUrl, params, auth })
    const boundary = this.parser.generateBoundary()

    if (parts.length < 2) {
      throw new Error('Multipart requests must have at least 2 parts.')
    }

    for (let i = 0; i < parts.length; i++) {
      parts[i].contentType = i === 0 ?
        'application/json' :
        'application/octet-stream'
    }

    return this._multipart(HttpMethod.PUT, url, boundary, parts, auth, accept)
  }

  /**
   * Only changes values that you manually include
   */
  public setAuthorization (authorization: Authorization) {
    this.#auth = { ...this.#auth, ...authorization }
  }

  public hasAccessToken () {
    return !!this.#auth?.accessToken
  }

  public hasApiKey () {
    return !!this.#auth?.apiKey
  }

  /* ----- Private methods ----- */

  private request (options: RequestOptions,
    handler: (request: OutgoingMessage) => void): Promise<any> {

    return new Promise((resolve, reject) =>
      handler(https(options, response =>
        Handler.response.default(response, resolve, reject))
      )
    )
  }

  /**
   * @param contentType Defaults to application/json
   */
  private _get (url: URL, { auth, contentType, accept }:
    { auth?: Authorization; contentType?: string; accept?: string }) {

    const options = this.parser.formRequestOptions(url, 'GET',
      { contentType, accessToken: auth?.accessToken, accept })
    return this.request(options, Handler.request.default)
  }

  private _post (url: URL, { auth, contentType, data, accept }:
    { auth?: Authorization; contentType?: string; data: any; accept?: string }) {

    const options = this.parser.formRequestOptions(url, 'POST',
      { contentType, accessToken: auth?.accessToken, accept })
    return this.request(options, req => Handler.request.default(req, data))
  }

  private _put (url: URL, { auth, contentType, data, accept }:
    { auth?: Authorization; contentType?: string; data: any; accept?: string }) {

    const options = this.parser.formRequestOptions(url, 'PUT',
      { contentType, accessToken: auth?.accessToken, accept })
    return this.request(options, request => Handler.request.default(request, data))
  }

  private _delete (url: URL, { auth, contentType, accept }:
    { auth?: Authorization; contentType?: string; accept?: string }) {

    const options = this.parser.formRequestOptions(url, 'DELETE',
      { contentType, accessToken: auth?.accessToken, accept })
    return this.request(options, Handler.request.default)
  }

  /**
   * @param boundary Parser.generateBoundary()
   */
  private _multipart (httpMethod: HttpMethod.PUT | HttpMethod.POST, url: URL,
    boundary: string, parts: RequestPart[], auth?: Authorization, accept?: string) {

    const method = HttpMethod[httpMethod] as keyof typeof HttpMethod
    const options = this.parser.formRequestOptions(url, method, {
      contentType: `multipart/form-data; boundary=${boundary}`,
      accessToken: auth?.accessToken,
      accept
    })

    return this.request(options,
      request => Handler.request.multipart(request, parts, boundary))
  }

  private getAuthorization (authorizationOptions?: AuthorizationOptions) {
    return {
      apiKey: authorizationOptions?.apiKey ? this.#auth?.apiKey : undefined,
      accessToken: authorizationOptions?.accessToken ? this.#auth?.accessToken : undefined
    }
  }
}

export default Request
