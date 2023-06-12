import { request as https } from 'https'
import { IncomingMessage, RequestOptions, OutgoingMessage } from 'http'
import { URL } from 'url'

/**
 * @ignore
 */
/* istanbul ignore next */
export class Request {
  public baseUrl?: string

  constructor (baseUrl?: string) {
    this.baseUrl = baseUrl
  }

  public api (subUrl: string, params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    return this.get(url, accessToken)
  }

  public post (subUrl: string, params?: Object, data?: any, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    return this._post(url, data, accessToken)
  }

  public put (subUrl: string, params?: Object, data?: any, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    return this._put(url, data, accessToken)
  }

  public delete (subUrl: string, params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    return this._delete(url, accessToken)
  }

  public imagePost (subUrl: string, image: Buffer, imageType: 'jpeg' | 'png', params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    return this._post(url, image, accessToken, `image/${imageType}`)
  }

  public streamPut (subUrl: string, stream: Buffer, params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    return this._put(url, stream, accessToken, 'application/octet-stream')
  }

  public multipartStreamPost (subUrl: string, data: any, extraData: Buffer, params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    const boundary = this.generateBoundary()

    return this._postMultipart(url, data, extraData, accessToken, 'application/json', 'application/octet-stream', boundary)
  }

  public multipartImagePost (subUrl: string, data: any, image: Buffer, imageType: 'jpeg' | 'png', params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    const boundary = this.generateBoundary()

    return this._postMultipart(url, data, image, accessToken, 'application/json', `image/${imageType}`, boundary)
  }

  public multipartStreamPut (subUrl: string, data: any, extraData: Buffer, params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.formUrl(subUrl, params, token, accessToken)
    const boundary = this.generateBoundary()

    return this._putMultipart(url, data, extraData, accessToken, 'application/json', 'application/octet-stream', boundary)
  }

  private get (url: string, token?: string, contentType: string = 'application/json'): Promise<any> {
    const options = this.parseUrlToOptions(url, 'GET', contentType)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req))
  }

  private _post (url: string, data: any, token: string, contentType: string = 'application/json'): Promise<any> {
    const options = this.parseUrlToOptions(url, 'POST', contentType)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req, data))
  }

  private _put (url: string, data: any, token: string, contentType: string = 'application/json'): Promise<any> {
    const options = this.parseUrlToOptions(url, 'PUT', contentType)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req, data))
  }

  private _delete (url: string, token: string, contentType: string = 'application/json'): Promise<any> {
    const options = this.parseUrlToOptions(url, 'DELETE', contentType)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req))
  }

  private _postMultipart (url: string, data: any, extraData: Buffer, token: string, contentType: string, extraType: string, boundary: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'POST', `multipart/form-data; boundary=${boundary}`)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallbackMultipart(req, [ { data, type: contentType }, { data: extraData, type: extraType } ], boundary))
  }

  private _putMultipart (url: string, data: any, extraData: Buffer, token: string, contentType: string, extraType: string, boundary: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'PUT', `multipart/form-data; boundary=${boundary}`)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallbackMultipart(req, [ { data, type: contentType }, { data: extraData, type: extraType } ], boundary))
  }

  private formUrl (subUrl: string, params?: object, token?: string, accessToken?: string) {
    return this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) + (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
  }

  private parseUrlToOptions (url: string, type: 'POST' | 'PUT' | 'GET' | 'DELETE', contentType: string): RequestOptions {
    const parsed = new URL(url)

    return {
      hostname: parsed.hostname,
      port: parsed.port ? parsed.port : 443,
      path: parsed.pathname + parsed.search,
      method: type,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': contentType
      }
    }
  }

  private generateBoundary () {
    let boundary = '--------------------------'

    for (let i = 0; i < 24; i++) {
      boundary += Math.floor(Math.random() * 10).toString(16)
    }

    return boundary
  }

  private req (options: RequestOptions, reqFunction: (req: OutgoingMessage) => void) {
    return new Promise((resolve, reject) => {
      const cb = (res: IncomingMessage) => {
        let data = ''

        res.setEncoding('utf8')

        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          // no content
          if (res.statusCode === 204) {
            return resolve(undefined)
          }

          if (res.headers['content-type'].startsWith('application/octet-stream')) {
            return resolve(Buffer.from(data))
          }

          if (res.statusCode !== 404 && !res.headers['content-type'].startsWith('application/json')) {
            return reject('Unexpected content type: ' + res.headers['content-type'] + '\nData: ' + data)
          }

          let parsed: any

          try {
            parsed = JSON.parse(data)
          } catch(err) {
            return reject(new Error(res.statusCode === 404 ? 'Not found' : 'Error parsing JSON response: ' + data))
          }

          if (parsed.error) {
            return reject(new Error(parsed.error.message))
          } else if (res.statusCode === 404) {
            return reject('Not found')
          }

          return resolve(parsed)
        })

        res.on('error', error => {
          return reject(error)
        })
      }

      reqFunction(https(options, cb))
    })
  }

  private reqCallback (req: OutgoingMessage, data?: any) {
    req.on('error', error => {
      throw error
    })

    if (data) {
      req.write(data)
    }

    req.end()
  }

  private reqCallbackMultipart (req: OutgoingMessage, data: { type: string; data: any }[], boundary: string) {
    req.on('error', error => {
      throw error
    })

    for (let i = 0; i < data.length; i++) {
      req.write(`--${boundary}\n`)
      req.write(`Content-Disposition: form-data; name="${i}"\n`)
      req.write(`Content-Type: ${data[i].type}\n\n`)

      req.write(data[i].data)
      req.write('\n')
    }

    req.write(`--${boundary}--`)
    req.end()
  }

  private parseParams (params: Object) {
    if (!params) {
      return ''
    }

    let url = ''

    for (let param in params) {
      url += (!url.includes('?') ? '?' : '&') + param + '=' + params[param]
    }

    return url
  }
}
