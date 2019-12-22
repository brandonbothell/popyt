/**
 * @ignore
 */
export class Cache {
  private static cache: { [key: string]: CacheItem } = {}

  public static set (name: string | number, value: any, ttl: number) {
    this.cache[name] = { v: value, t: ttl }
  }

  public static get (name: string | number): any {
    const item = this.cache[name]

    if (item === undefined || (item.t > 0 && new Date().getTime() >= item.t)) {
      this._delete(name)
      return undefined
    }

    return this.cache[name].v
  }

  public static checkTTLs () {
    for (const itemName in this.cache) {
      const item = this.cache[itemName]
      const time = new Date().getTime()

      if (item.t <= 0) {
        return
      }

      if (time >= item.t) {
        delete this.cache[itemName]
      }
    }
  }

  public static _delete (name: string | number) {
    const item = this.cache[name]

    if (!item) {
      return
    }

    delete this.cache[name]
  }
}

/**
 * @ignore
 */
type CacheItem = {
  v: any
  t: number
}
