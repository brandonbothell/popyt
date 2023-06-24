import { OutgoingMessage, IncomingMessage } from 'http'
import { RequestPart } from '../..'

/**
 * @ignore
 */
/* istanbul ignore next */
export class Handler {
  public static request = {
    default (request: OutgoingMessage, data?: any) {
      request.on('error', error => {
        throw error
      })

      if (data) {
        request.write(data)
      }

      request.end()
    },
    multipart (request: OutgoingMessage, parts: RequestPart[], boundary: string) {
      request.on('error', error => {
        throw error
      })

      for (let i = 0; i < parts.length; i++) {
        request.write(`--${boundary}\n`)
        request.write(`Content-Disposition: form-data; name="${i}"\n`)
        request.write(`Content-Type: ${parts[i].contentType}\n\n`)

        request.write(parts[i].data)
        request.write('\n')
      }

      request.write(`--${boundary}--`)
      request.end()
    }
  }

  public static response = {
    default (response: IncomingMessage,
      resolve: (value: Buffer | Record<string, any> | string) => void, reject: (reason: any) => void) {

      let data = ''

      response.setEncoding('utf8')

      response.on('data', chunk => {
        data += chunk
      })

      response.on('end', () => {
        // no content
        if (response.statusCode === 204) {
          return resolve(undefined)
        }

        if (response.headers['content-type'].startsWith('application/octet-stream')) {
          return resolve(Buffer.from(data))
        }

        if (response.headers['content-type'].startsWith('text/plain')) {
          return resolve(data)
        }

        // parse if 404 not found just in case there's an error with more info
        if (response.statusCode !== 404 && !response.headers['content-type'].startsWith('application/json')) {
          return reject(new Error(`Unexpected content type: ${response.headers['content-type']}\nData: ${data}`))
        }

        let parsed: any

        try {
          parsed = JSON.parse(data)
        } catch(err) {
          return reject(new Error(response.statusCode === 404 ? 'HTTP status code 404 Not Found' : 'Error parsing JSON response: ' + data))
        }

        if (parsed.error) {
          return reject(new Error(parsed.error.message))
        } else if (response.statusCode === 404) {
          return reject(new Error('HTTP status code 404 Not Found'))
        }

        return resolve(parsed)
      })

      response.on('error', error => {
        return reject(error)
      })
    }
  }
}
