import { request as https } from 'https'
import { IncomingMessage, RequestOptions, OutgoingMessage } from 'http'
import { parse as parseUrl } from 'url'

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
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this.get(url, accessToken)
  }

  public post (subUrl: string, params?: Object, data?: any, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._post(url, data, accessToken)
  }

  public put (subUrl: string, params?: Object, data?: any, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._put(url, data, accessToken)
  }

  public delete (subUrl: string, params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._delete(url, accessToken)
  }

  public imagePost (subUrl: string, image: Buffer, imageType: 'jpeg' | 'png', params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._post(url, image, accessToken, `image/${imageType}`)
  }

  public multipartPost (subUrl: string, data: any, image: Buffer, imageType: 'jpeg' | 'png', params?: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')

    let boundary = '--------------------------'

    for (let i = 0; i < 24; i++) {
      boundary += Math.floor(Math.random() * 10).toString(16)
    }

    return this._postMultipart(url, data, image, accessToken, 'application/json', `image/${imageType}`, boundary)
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

  private _postMultipart (url: string, data: any, image: Buffer, token: string, contentType: string, imageType: string, boundary: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'POST', `multipart/form-data; boundary=${boundary}`)

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallbackMultipart(req, [ { data, type: contentType }, { data: image, type: imageType } ], boundary))
  }

  private parseUrlToOptions (url: string, type: 'POST' | 'PUT' | 'GET' | 'DELETE', contentType: string): RequestOptions {
    const parsed = parseUrl(url)

    return {
      hostname: parsed.hostname,
      port: parsed.port ? parsed.port : 443,
      path: parsed.path,
      method: type,
      headers: {
        'Content-Type': contentType
      }
    }
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
          if (res.statusCode === 404) {
            return reject(new Error('Not found'))
          }

          // no content
          if (res.statusCode === 204) {
            return resolve()
          }

          let parsed: any

          try {
            parsed = JSON.parse(data)
          } catch(err) {
            return reject('Error parsing JSON response: ' + data)
          }

          if (parsed.error) {
            return reject(new Error(parsed.error.message))
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
