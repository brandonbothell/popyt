import { request as https } from 'https'
import { IncomingMessage, RequestOptions, OutgoingMessage } from 'http'
import { parse as parseUrl } from 'url'

export const request = {
  api: (subUrl: string, params: Object, token: string, type: 'key' | 'oauth'): Promise<any> => {
    /* istanbul ignore next */
    const url = 'https://www.googleapis.com/youtube/v3' + (subUrl.startsWith('/') ? '' : '/') + subUrl + parseParams(params) +
                (type === 'key' ? (params ? `&key=${token}` : `?key=${token}`) : '')
    /* istanbul ignore next */
    return get(url, type === 'oauth' ? token : undefined)
  },
  post: (subUrl: string, params: Object, token: string, data: any): Promise<any> => {
    /* istanbul ignore next */
    const url = 'https://www.googleapis.com/youtube/v3' + (subUrl.startsWith('/') ? '' : '/') + subUrl + parseParams(params)
    return post(url, data, token)
  },
  put: (subUrl: string, params: Object, token: string, data: any): Promise<any> => {
    /* istanbul ignore next */
    const url = 'https://www.googleapis.com/youtube/v3' + (subUrl.startsWith('/') ? '' : '/') + subUrl + parseParams(params)
    return put(url, data, token)
  }
}

/**
 * @ignore
 */
/* istanbul ignore next */
function get (url: string, token?: string): Promise<any> {
  const options = parseUrlToOptions(url, 'GET')

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  return req(options, req => reqCallback(req))
}

/**
 * @ignore
 */
/* istanbul ignore next */
function post (url: string, data: any, token: string): Promise<any> {
  const options = parseUrlToOptions(url, 'POST')

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  return req(options, req => reqCallback(req, data))
}

/**
 * @ignore
 */
/* istanbul ignore next */
function put (url: string, data: any, token: string): Promise<any> {
  const options = parseUrlToOptions(url, 'PUT')

  if (token) {
    options.headers['Authorization'] = `Bearer ${token}`
  }

  return req(options, req => reqCallback(req, data))
}

/**
 * @ignore
 */
/* istanbul ignore next */
function parseUrlToOptions (url: string, type: 'POST' | 'PUT' | 'GET'): RequestOptions {
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

/**
 * @ignore
 */
/* istanbul ignore next */
function req (options: RequestOptions, reqFunction: (req: OutgoingMessage) => void) {
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

/**
 * @ignore
 */
/* istanbul ignore next */
function reqCallback (req: OutgoingMessage, data?: any) {
  req.on('error', error => {
    throw error
  })

  if (data) {
    req.write(data)
  }

  req.end()
}

/**
 * @ignore
 */
/* istanbul ignore next */
function parseParams (params: Object) {
  let url = ''

  for (let param in params) {
    url += (!url.includes('?') ? '?' : '&') + param + '=' + params[param]
  }

  return url
}
