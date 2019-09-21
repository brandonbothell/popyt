const cache: { [key: string]: CacheItem } = {}

export const Cache = {
  set,
  get,
  checkTTLs,
  _delete
}

function set (name: string | number, value: any, ttl: number) {
  cache[name] = { v: value, t: ttl }
}

function get (name: string | number): any {
  const item = cache[name]

  if (item === undefined || (item.t > 0 && new Date().getTime() >= item.t)) {
    _delete(name)
    return undefined
  }

  return cache[name].v
}

function checkTTLs () {
  for (const itemName in cache) {
    const item = cache[itemName]
    const time = new Date().getTime()

    if (item.t <= 0) {
      return
    }

    if (time >= item.t) {
      delete cache[itemName]
    }
  }
}

function _delete (name: string | number) {
  const item = cache[name]

  if (!item) {
    return
  }

  delete cache[name]
}

type CacheItem = {
  v: any
  t: number
}
