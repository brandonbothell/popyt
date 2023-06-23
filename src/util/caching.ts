/**
 * @ignore
 */
export class Cache {
  private static map: Map<string, CacheItem> = new Map()

  public static set (name: string, value: any, ttl: number) {
    Cache.map.set(name, { v: value, t: ttl })
  }

  public static get (name: string): any {
    const item = Cache.map.get(name)

    if (!item || (item.t > 0 && new Date().getTime() >= item.t)) {
      Cache._delete(name)
      return undefined
    }

    return item.v
  }

  public static checkTTLs () {
    const time = new Date().getTime()

    for (const [ name, value ] of Cache.map.entries()) {
      const timeToDelete = value.t

      if (timeToDelete > 0 && time >= timeToDelete) {
        Cache.map.delete(name)
      }
    }
  }

  public static _delete (name: string) {
    Cache.map.delete(name)
  }
}

/**
 * @ignore
 */
type CacheItem = {
  v: any
  t: number
}
