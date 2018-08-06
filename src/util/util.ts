import { parse } from 'url'

export function parseUrl (url: string): { video: string, playlist: string, channel: string } {
  const parsed = parse(url, true)
  switch (parsed.hostname) {
    case 'www.youtube.com':
    case 'youtube.com':
    case 'm.youtube.com': {
      const idRegex = /^[a-zA-Z0-9-_]+$/

      if (parsed.pathname === '/watch') {
        if (!idRegex.test(parsed.query.v as string)) {
          return { video: null, playlist: null, channel: null }
        }

        const response: { video: string, playlist: string, channel: string } = { video: parsed.query.v as string, playlist: null, channel: null }

        if (parsed.query.list) {
          response.playlist = parsed.query.list as string
        }

        return response
      } else if (parsed.pathname === '/playlist') {
        if (!idRegex.test(parsed.query.list as string)) {
          return { video: null, playlist: null, channel: null }
        }

        return { playlist: parsed.query.list as string, video: null, channel: null }
      } else if (parsed.pathname.startsWith('/channel/')) {
        const id = parsed.pathname.replace('/channel/', '')

        if (!idRegex.test(id)) {
          return { video: null, playlist: null, channel: null }
        }

        return { channel: id, video: null, playlist: null }
      }

      return { video: null, playlist: null, channel: null }
    }
    case 'youtu.be':
      return { video: /^\/[a-zA-Z0-9-_]+$/.test(parsed.pathname) ? parsed.pathname.slice(1) : null, playlist: null, channel: null }
    default:
      return { video: null, playlist: null, channel: null }
  }
}
