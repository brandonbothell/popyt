import { URL } from 'url'
import { RequestOptions } from 'http'
import { SearchParams, Authorization, HttpMethod } from '../..'
import Request from '.'

/**
 * @ignore
 */
/* istanbul ignore next */
export class Parser {
  constructor (private request: Request) {}

  public searchParamsToString (params: SearchParams) {
    return Object.entries(params).map(entry => `${entry[0]}=${entry[1]}`).join('&')
  }

  public formUrl ({ subUrl, params, auth }: { subUrl: string; params?: SearchParams; auth?: Authorization }) {
    const parsed = subUrl ? new URL(subUrl, this.request.baseUrl) : new URL(this.request.baseUrl)

    if (auth?.apiKey && !auth.accessToken) params = { ...params, key: auth.apiKey } // if we have an access token (OAuth), there's no need for an API key.
    if (params) parsed.search = this.searchParamsToString(params)

    return parsed
  }

  /**
   * Content type defaults to **application/json**
   */
  public formRequestOptions (url: URL, httpMethod: keyof typeof HttpMethod, { contentType = 'application/json', accessToken }:
  { contentType?: string; accessToken?: string }): RequestOptions {

    const options: RequestOptions = {
      hostname: url.hostname,
      port: url.port ? url.port : 443,
      path: url.pathname + url.search,
      method: httpMethod,
      headers: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        'Content-Type': contentType, Accept: 'application/json'
      }
    }

    if (accessToken) options.headers['Authorization'] = `Bearer ${accessToken}`

    return options
  }

  public generateBoundary () {
    let boundary = '--------------------------'

    for (let i = 0; i < 10; i++) {
      boundary += Math.floor(Math.random() * 100).toString(16)
    }

    return boundary
  }
}
