import { Cache, Parser } from '../util'
import YouTube, { Channel, Comment, IDEntity, Playlist, Resolvable, ResolvableClass, ResolveReturn, Subscription, Video, VideoCategory } from '..'

/**
 * @ignore
 */
export class ResolutionService {
  constructor (private youtube: YouTube) {}

  public async resolve<T extends Resolvable<K> | Resolvable<K>[], K extends ResolvableClass> (input: T, type: K):
  Promise<ResolveReturn<T, K>> {

    // A single item can be fast-tracked
    if (!Array.isArray(input)) {
      if (typeof input !== 'string') return input as ResolveReturn<T, K>
      else return this.resolveStringToIdOrEntity(input, type) as Promise<ResolveReturn<T, K>>
    }

    // either the ID or the input if resolution failed
    const resolutions: (Resolvable<K> | Promise<Resolvable<K>>)[] = new Array(input.length).fill(undefined)
    const resolvableStrings: { [resolutionIndex: number]: string } = {} // could be ID, URL, or search query

    let preresolvedCount = 0

    for (let i = 0; i < input.length; i++) {
      const resolvable = input[i]

      if (typeof resolvable === 'string') resolvableStrings[i] = resolvable
      else {
        resolutions[i] = resolvable as Resolvable<K>
        preresolvedCount++
      }
    }

    // if all entities are known, we can return
    if (preresolvedCount === input.length) {
      return resolutions as ResolveReturn<T, K>
    }

    for (const resolutionIndex in resolvableStrings) {
      resolutions[resolutionIndex] = this.resolveStringToIdOrEntity(resolvableStrings[resolutionIndex], type)
    }

    return Promise.all(resolutions) as Promise<ResolveReturn<T, K>>
  }

  /**
   * @returns After attempting to parse the input as a URL, will return either an ID string or entity object depending on
   * whether or not the string contains an ID. Note that legacy custom channel URLs use searches, while
   * the new @ username URLs use fetches (much cheaper on quota).  
   * **Anything that isn't an ID, Entity, or Username URL returns the first result of a search query of `type`.**
   */
  public async resolveStringToIdOrEntity<T extends ResolvableClass> (input: string, type: T): Promise<Resolvable<T>> {
    // types that resolve only by class or ID
    if (type === VideoCategory || type === Comment || type === Subscription) {
      return input
    }

    if (this.youtube._shouldCache) {
      const cached = Cache.getResolution(type, input)
      if (cached) return cached
    }

    // The search query or ID parameter for later (used for setting legacy custom channel URL search query)
    let idOrSearchQuery = input
    let resolution: Resolvable<T>

    if (type === Channel && Parser.channelHandleRegex.test(input)) {
      // Try to search for the username (custom channel handles not implemented in API)
      // At some point this can be used to get directly by handle if YouTube ever gets their crap together
      idOrSearchQuery = input.slice(1)
      // Try to resolve as a URL
    } else if (Parser.youtubeUrlRegex.test(input)) {
      const resolvedUrl = await this.resolveUrl(input, type)

      // Legacy channel URLs are search queries for now until they are completely phased out
      if (resolvedUrl.searchQuery) idOrSearchQuery = resolvedUrl.searchQuery
      else resolution = resolvedUrl.resolution
    }

    // If it's different from the original input, then it's a search query
    // If we couldn't resolve as a URL then we want to try as an ID or search query
    if (idOrSearchQuery !== input || !resolution) {
      resolution = await this.resolveIdOrSearch(idOrSearchQuery, type)
    }

    // If there are no search results and it couldn't be parsed, fallback to original input
    if (!resolution) resolution = input

    if (this.youtube._shouldCache) this.youtube._cacheResolution(type, input, resolution)

    return resolution
  }

  public async resolveUrl<T extends ResolvableClass> (input: string, type: T):
  Promise<{ searchQuery?: string; resolution?: Resolvable<T> }> {
    const parsedUrl = Parser.parseUrl(input)

    if (!parsedUrl) return {}

    if (type !== Channel) return { resolution: parsedUrl[type.name.toLowerCase()]?.id }

    const parsedChannel = parsedUrl.channel

    if (parsedChannel?.searchQuery) {
      // Old custom channel URL (/channel/CustomUsername) support is shoddy
      // we have to search for the legacy username and hope for the best
      return { searchQuery: parsedChannel.searchQuery }
    } else if (parsedChannel?.username) {
      // The new usernames are the same, but maybe one day we can use this like:
      // const channel = await this.youtube._services.channel.getChannelByUsername(parsedChannel.username) as InstanceType<T>
      // if (channel) return { resolution: channel }
      return { searchQuery: parsedChannel.username }
    }

    return { resolution: parsedUrl[type.name.toLowerCase()]?.id }
  }

  public async resolveIdOrSearch<T extends ResolvableClass> (input: string, type: T) {
    if (type !== Channel && type !== Video && type !== Playlist) {
      return input
    }

    // Reasoning for these constraints: https://webapps.stackexchange.com/a/101153
    const isId = Parser[`${type.name.toLowerCase()}IdRegex`].test(input)

    if (isId) return input

    return this.youtube.search(input, {
      pageOptions: { maxPerPage: 1 },
      searchFilters: { types: [ type ] }
    }).then(result => result.items.length ? result.items[0] : undefined) as InstanceType<T>
  }

  public static toId (entityOrId: string | IDEntity) {
    return typeof entityOrId === 'string' ? entityOrId : entityOrId.id
  }
}
