import { parse } from 'url'
import { ISODuration, ParsedUrl } from '../types'

/**
 * @ignore
 */
export class Parser {
  public static parseUrl (url: string): ParsedUrl {
    url = url.startsWith('https://www.') ? url :
      (url.startsWith('www.') ? `https://${url}` :
        (url.startsWith('https://') ? `${url.substring(0, 8)}www.${url.substring(8)}` : `https://www.${url}`))

    const parsed = parse(url, true)

    switch (parsed.hostname) {
      case 'www.youtube.com':
      case 'youtube.com':
      case 'm.youtube.com': {
        const idRegex = /^[a-zA-Z0-9-_]+$/

        if (parsed.pathname.endsWith('/')) {
          parsed.pathname = parsed.pathname.substring(0, parsed.pathname.length - 1)
        }

        if (parsed.pathname === '/watch') {
          if (!parsed.query.v || !idRegex.test(parsed.query.v as string)) {
            return {}
          }

          const toReturn: ParsedUrl = { video: { id: parsed.query.v as string } }

          if (parsed.query.list) {
            toReturn.playlist = { id: parsed.query.list as string }
          }

          return toReturn
        } else if (parsed.pathname === '/playlist') {
          if (!parsed.query.list || !idRegex.test(parsed.query.list as string)) {
            return {}
          }

          return { playlist: { id: parsed.query.list as string } }
        } else if (parsed.pathname.startsWith('/channel/') || parsed.pathname.startsWith('/c/')) {
          const id = parsed.pathname.replace('/channel/', '').replace('/c/', '')

          if (!id || !idRegex.test(id)) {
            return {}
          }

          return { channel: { id } }
        } else if (parsed.pathname.startsWith('/@')) {
          const username = parsed.pathname.replace('/@', '')

          if (!username || !idRegex.test(username)) {
            return {}
          }

          return { channel: { username: username } }
        }

        return {}
      }
      case 'www.youtu.be':
      case 'youtu.be':
        const isValidId = /^\/[a-zA-Z0-9-_]+$/.test(parsed.pathname)
        return isValidId ? { video: { id: parsed.pathname.slice(1) } } : {}
      default:
        return {}
    }
  }

  public static parseIsoDuration (duration: string): ISODuration {
    const numbers = '\\d+(?:[\\.,]\\d{0,3})?'
    const weekPattern = `(${numbers}W)`
    const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`
    const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`
    const iso8601 = `P(?:${weekPattern}|${datePattern}(?:${timePattern})?)`
    const timeArray = [ 'weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds' ]
    const pattern = new RegExp(iso8601)

    return duration.match(pattern).slice(1).reduce((prev, current, index) => {
      prev[timeArray[index]] = parseFloat(current) || 0
      return prev
    }, { weeks: 0, years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 })
  }
}
