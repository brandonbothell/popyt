import { URL } from 'url'
import { ISODuration, ParsedUrl } from '../types'

/**
 * @ignore
 */
export class Parser {
  public static readonly youtubeUrlRegex = new RegExp(/^(https?:\/\/|https?:\/\/)?([a-z0-9]+\.)*(youtube\.com|youtu\.be)(:[0-9]{1,5})?(\/.*)?$/i)
  public static readonly channelIdRegex = new RegExp(/^(?:UC|HC)[a-z0-9-_]{22}$/i)
  public static readonly usernameRegex = new RegExp(/^@[a-z0-9_\-.]{3,30}$/i)
  public static readonly idRegex = new RegExp(/^[a-z0-9-_]+$/i)

  /**
   * @returns False if parsing the URL failed
   */
  public static parseUrl (url: string): ParsedUrl | false {
    if (!/^https?:\/\//i.test(url)) {
      url = `https://${url}`
    }

    let parsed: URL

    try {
      parsed = new URL(url)
    } catch (_) {
      return false
    }

    switch (parsed.hostname) {
      case 'www.youtube.com':
      case 'youtube.com':
      case 'm.youtube.com':
        if (parsed.pathname.endsWith('/')) {
          parsed.pathname = parsed.pathname.substring(0, parsed.pathname.length - 1)
        }

        const toReturn: ParsedUrl = {}

        if (parsed.pathname === '/watch') {
          const videoId = parsed.searchParams.get('v')
          const playlistId = parsed.searchParams.get('list')

          if (videoId && Parser.idRegex.test(videoId)) toReturn.video = { id: videoId }
          if (playlistId && Parser.idRegex.test(playlistId)) toReturn.playlist = { id: playlistId }
        } else if (parsed.pathname === '/playlist') {
          const playlistId = parsed.searchParams.get('list')

          if (playlistId && Parser.idRegex.test(playlistId)) toReturn.playlist = { id: playlistId }
        } else if (parsed.pathname.startsWith('/channel/') || parsed.pathname.startsWith('/c/')) {
          const channelId = parsed.pathname.replace('/channel/', '').replace('/c/', '')

          if (channelId && Parser.channelIdRegex.test(channelId)) toReturn.channel = { id: channelId }
          // legacy custom channel URL
          else if (channelId) toReturn.channel = { searchQuery: channelId }
        // custom channel handle
        } else if (parsed.pathname.startsWith('/@')) {
          const channelUsername = parsed.pathname.replace('/', '')

          if (channelUsername && Parser.usernameRegex.test(channelUsername)) toReturn.channel = { username: channelUsername.slice(1) }
        }

        return toReturn
      case 'www.youtu.be':
      case 'youtu.be':
        const isValidId = Parser.idRegex.test(parsed.pathname.slice(1))
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
