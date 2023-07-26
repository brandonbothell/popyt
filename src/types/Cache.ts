/**
 * @ignore
 * v = Value  
 * t = Time to live  
 * p = Parts string (sorted!)
 */
export type CacheItem<T = any> = {
  v: T
  t: number
}
