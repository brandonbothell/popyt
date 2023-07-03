/**
 * @ignore
 */
export type ParsedUrl = {
  video?: { id?: string }
  playlist?: { id?: string }
  channel?: { id?: string; username?: string; searchQuery?: string }
}

/**
 * @ignore
 */
export type SearchParams = { [key: string]: string | number | boolean }

/**
 * @ignore
 */
export type RequestPart<T = any> = { data: T; contentType?: string }

/**
 * @ignore
 */
export type DefaultRequestOptions = {
  authorizationOptions?: AuthorizationOptions
  params?: SearchParams
  accept?: string
}

export enum HttpMethod {
  GET,
  PUT,
  POST,
  DELETE
}

export type Authorization = { apiKey?: string; accessToken?: string }
export type AuthorizationOptions = { apiKey?: boolean; accessToken?: boolean }

export type Image = { type: 'jpeg' | 'png'; data: Buffer }
