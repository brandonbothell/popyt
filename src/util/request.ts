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

  public api (subUrl: string, params: Object, token: string, type: 'key' | 'oauth'): Promise<any> {
    const url = (this.baseUrl || '') + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (type === 'key' ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this.get(url, type === 'oauth' ? token : undefined)
  }

  public post (subUrl: string, params: Object, token: string, data: any): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params)
    return this._post(url, data, token)
  }

  public put (subUrl: string, params: Object, token: string, data: any): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params)
    return this._put(url, data, token)
  }

  private get (url: string, token?: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'GET')

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req))
  }

  private _post (url: string, data: any, token: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'POST')

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req, data))
  }

  private _put (url: string, data: any, token: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'PUT')

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req, data))
  }

  private parseUrlToOptions (url: string, type: 'POST' | 'PUT' | 'GET'): RequestOptions {
    const parsed = parseUrl(url)

    return {
      hostname: parsed.hostname,
      port: parsed.port ? parsed.port : 443,
      path: parsed.path,
      method: type,
      headers: {
        'Content-Type': 'application/json'
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

          const parsed = JSON.parse(data)

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

  private parseParams (params: Object) {
    let url = ''

    for (let param in params) {
      url += (!url.includes('?') ? '?' : '&') + param + '=' + params[param]
    }

    return url
  }
}
