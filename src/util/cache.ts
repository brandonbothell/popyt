import { AuthorizationOptions, ItemTypes, PaginatedInstance, PaginatedRequestParams, PaginatedResponse } from '..'

/**
 * @ignore
 */
export class Cache {
  private static map: Map<string, CacheItem> = new Map()
  private static itemsMap: Map<string, CacheItem<InstanceType<ItemTypes>>[]> = new Map()
  private static pagesMap: Map<string, CacheItem<PaginatedResponse<PaginatedInstance>>[]> = new Map()

  public static set (key: string, value: any, ttl: number) {
    Cache.map.set(key, { v: value, t: ttl })
  }

  public static get (key: string): any {
    const item = Cache.map.get(key)

    if (!item || (item.t > 0 && new Date().getTime() >= item.t)) {
      Cache._delete(key)
      return undefined
    }

    return item.v
  }

  public static setItem (type: ItemTypes, name: string, parts: string[] | undefined,
    value: InstanceType<ItemTypes>, ttl: number) {
    const key = `${type.name.toLowerCase()}/${name}`
    const cachedItems = Cache.itemsMap.get(key) ?? []

    cachedItems.push({
      v: value,
      t: ttl,
      p: parts ? parts?.sort()?.join(',') : type.part
    })
    Cache.itemsMap.set(key, cachedItems)
  }

  public static getItem (type: ItemTypes, name: string, parts?: string[]):
  InstanceType<ItemTypes> {
    const key = `${type.name.toLowerCase()}/${name}`
    const cachedItems = Cache.itemsMap.get(key)
    const item = cachedItems?.find(parts ?
      item => item.p?.startsWith(parts.sort().join(',')) :
      item => item.p === type.part
    )

    if (!item) return undefined
    if (item.t > 0 && new Date().getTime() >= item.t) {
      Cache._deleteItem(key, item.p)
      return undefined
    }

    return item.v
  }

  public static setPage (endpoint: string, page: number,
    options: PaginatedRequestParams, auth: AuthorizationOptions | undefined,
    value: PaginatedResponse<PaginatedInstance>, ttl: number) {

    const key = `${endpoint}/${JSON.stringify({ ...options, pageToken: undefined })}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`
    const toCache = Cache.pagesMap.get(key) ?? []

    if (page > toCache.length - 1) toCache.length = page + 1
    toCache[page] = { v: value, t: ttl }

    Cache.pagesMap.set(key, toCache)
  }

  public static getPage<T extends PaginatedInstance = PaginatedInstance> (
    endpoint: string, page: number, options: PaginatedRequestParams,
    auth: AuthorizationOptions | undefined):
  PaginatedResponse<T> {
    const key = `${endpoint}/${JSON.stringify({ ...options, pageToken: undefined })}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`
    const pages = Cache.pagesMap.get(key)
    const item = pages ? page > pages.length - 1 ? undefined : pages[page] : undefined

    if (!item) return undefined

    if (item.t > 0 && new Date().getTime() >= item.t) {
      Cache._deletePage(endpoint, page, options, auth)
      return undefined
    }

    return item.v as PaginatedResponse<T>
  }

  public static getPages<T extends PaginatedInstance = PaginatedInstance> (
    endpoint: string, options: PaginatedRequestParams,
    auth: AuthorizationOptions | undefined):
  PaginatedResponse<T>[] {
    const key = `${endpoint}/${JSON.stringify({ ...options, pageToken: undefined })}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`
    const pages = Cache.pagesMap.get(key)

    if (!pages) {
      return undefined
    }

    const toReturn: PaginatedResponse<T>[] = new Array(pages.length)

    for (let page = 0; page < pages.length; page++) {
      const item = pages[page]

      if (!item) continue
      if (item.t > 0 && new Date().getTime() >= item.t) {
        Cache._deletePage(endpoint, page, options, auth)
        return undefined
      }

      toReturn[page] = item.v as PaginatedResponse<T>
    }

    return toReturn
  }

  public static checkTTLs () {
    const time = new Date().getTime()

    for (const [ key, value ] of Cache.map.entries()) {
      const timeToDelete = value.t

      if (timeToDelete > 0 && time >= timeToDelete) {
        Cache.map.delete(key)
      }
    }

    for (const [ key, items ] of Cache.itemsMap.entries()) {
      for (const item of items) {
        const timeToDelete = item.t

        if (timeToDelete > 0 && time >= timeToDelete) {
          Cache._deleteItem(key, item.p)
        }
      }
    }

    for (let [ key, pages ] of Cache.pagesMap.entries()) {
      for (let page = 0; page < pages.length; page++) {
        if (!pages[page]) continue

        const timeToDelete = pages[page].t

        if (timeToDelete > 0 && time >= timeToDelete) {
          pages = Cache._deletePageByKey(key, page)
          page--
        }
      }
    }
  }

  public static _delete (key: string) {
    Cache.map.delete(key)
  }

  public static _deleteItem (key: string, parts?: string) {
    const cachedItems = Cache.itemsMap.get(key)
    const index = cachedItems?.findIndex(item => item.p === parts)

    if (index === undefined || index < 0) return

    cachedItems.splice(index, 1)

    if (cachedItems.length === 0) {
      Cache.itemsMap.delete(key)
    } else {
      Cache.itemsMap.set(key, cachedItems)
    }

    return cachedItems
  }

  /**
   * @returns Pages left in the key
   */
  public static _deletePageByKey (key: string, page: number) {
    const pages = Cache.pagesMap.get(key)

    if (page > pages.length - 1) return pages

    pages.splice(page, 1)

    if (pages.length === 0) {
      Cache.pagesMap.delete(key)
    } else {
      Cache.pagesMap.set(key, pages)
    }

    return pages
  }

  /**
   * @returns Pages left in the key
   */
  public static _deletePage (endpoint: string, page: number,
    options: PaginatedRequestParams, auth: AuthorizationOptions | undefined) {
    const key = `${endpoint}/${JSON.stringify(options)}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`
    return Cache._deletePageByKey(key, page)
  }
}

/**
 * @ignore
 * v = Value  
 * t = Time to live  
 * p = Parts string (sorted!)
 */
type CacheItem<T = any> = {
  v: T
  t: number
  p?: string
}
