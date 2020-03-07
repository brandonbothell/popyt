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

  public api (subUrl: string, params: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this.get(url, accessToken)
  }

  public post (subUrl: string, params: Object, data: any, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._post(url, data, accessToken)
  }

  public put (subUrl: string, params: Object, data: any, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._put(url, data, accessToken)
  }

  public delete (subUrl: string, params: Object, token?: string, accessToken?: string): Promise<any> {
    const url = this.baseUrl + (subUrl.startsWith('/') ? '' : '/') + subUrl + this.parseParams(params) +
                (!accessToken ? (params ? `&key=${token}` : `?key=${token}`) : '')
    return this._delete(url, accessToken)
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

  private _delete (url: string, token: string): Promise<any> {
    const options = this.parseUrlToOptions(url, 'DELETE')

    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`
    }

    return this.req(options, req => this.reqCallback(req))
  }

  private parseUrlToOptions (url: string, type: 'POST' | 'PUT' | 'GET' | 'DELETE'): RequestOptions {
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

          // no content
          if (res.statusCode === 204) {
            return resolve()
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
