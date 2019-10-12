import { parse } from 'url'
import { ISODuration } from '../types'

export function parseUrl (url: string): { video: string, playlist: string, channel: string } {
  url = url.startsWith('https://www.') ? url :
    (url.startsWith('www.') ? `https://${url}` :
      (url.startsWith('https://') ? `${url.substring(0, 8)}www.${url.substring(8)}` : `https://www.${url}`))

  const parsed = parse(url, true)

  switch (parsed.hostname) {
    case 'www.youtube.com':
    case 'youtube.com':
    case 'm.youtube.com': {
      const idRegex = /^[a-zA-Z0-9-_]+$/

      if (parsed.pathname === '/watch') {
        if (!parsed.query.v || !idRegex.test(parsed.query.v as string)) {
          return { video: null, playlist: null, channel: null }
        }

        const response: { video: string, playlist: string, channel: string } = { video: parsed.query.v as string, playlist: null, channel: null }

        if (parsed.query.list) {
          response.playlist = parsed.query.list as string
        }

        return response
      } else if (parsed.pathname === '/playlist') {
        if (!parsed.query.list || !idRegex.test(parsed.query.list as string)) {
          return { video: null, playlist: null, channel: null }
        }

        return { playlist: parsed.query.list as string, video: null, channel: null }
      } else if (parsed.pathname.startsWith('/channel/') || parsed.pathname.startsWith('/c/')) {
        const id = parsed.pathname.replace('/channel/', '').replace('/c/', '')

        if (!id || !idRegex.test(id)) {
          return { video: null, playlist: null, channel: null }
        }

        return { channel: id, video: null, playlist: null }
      }

      return { video: null, playlist: null, channel: null }
    }
    case 'www.youtu.be':
    case 'youtu.be':
      return { video: /^\/[a-zA-Z0-9-_]+$/.test(parsed.pathname) ? parsed.pathname.slice(1) : null, playlist: null, channel: null }
    default:
      return { video: null, playlist: null, channel: null }
  }
}

export function parseIsoDuration (duration: string): ISODuration {
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
