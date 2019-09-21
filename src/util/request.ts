import { request as https } from 'https'
import { IncomingMessage, RequestOptions, OutgoingMessage } from 'http'
import { parse as parseUrl } from 'url'

export const request = {
  api: (subUrl: string, params: Object): Promise<any> => {
    const url = 'https://www.googleapis.com/youtube/v3' + (subUrl.startsWith('/') ? subUrl : '/' + subUrl) + parseParams(params)
    return get(url)
  }
}

/**
 * @ignore
 */
/* istanbul ignore next */
function get (url: string): Promise<any> {
  const options = parseUrlToOptions(url, 'GET')

  return req(options, req => {
    req.on('error', error => {
      throw error
    })

    req.end()
  })
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
function parseParams (params: Object) {
  let url = ''

  for (let param in params) {
    url += (!url.includes('?') ? '?' : '&') + param + '=' + params[param]
  }

  return url
}
