[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Playlist

# Class: Playlist

Defined in: [entities/playlist.ts:9](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L9)

A YouTube playlist.

## Constructors

### Constructor

> **new Playlist**(`youtube`, `data`, `full?`): `Playlist`

Defined in: [entities/playlist.ts:114](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L114)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$SearchResult` \| `Schema$Playlist`

##### full?

`boolean` = `false`

#### Returns

`Playlist`

## Properties

### creatorId

> **creatorId**: `string`

Defined in: [entities/playlist.ts:71](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L71)

The ID of the creator of the playlist.

***

### data

> **data**: `any`

Defined in: [entities/playlist.ts:37](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L37)

The raw data of this playlist.

***

### dateCreated

> **dateCreated**: `Date`

Defined in: [entities/playlist.ts:81](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L81)

The date the playlist was created.

***

### description

> **description**: `string`

Defined in: [entities/playlist.ts:57](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L57)

The description of the playlist.

***

### embedHtml

> **embedHtml**: `string`

Defined in: [entities/playlist.ts:102](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L102)

An \<iframe\> tag that embeds a player that will play the playlist.

***

### full

> **full**: `boolean`

Defined in: [entities/playlist.ts:42](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L42)

Whether or not this is a full playlist object.

***

### id

> **id**: `string`

Defined in: [entities/playlist.ts:47](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L47)

The ID of this playlist.

***

### length

> **length**: `number`

Defined in: [entities/playlist.ts:97](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L97)

The number of items in the playlist.

***

### privacy

> **privacy**: `"private"` \| `"public"` \| `"unlisted"`

Defined in: [entities/playlist.ts:112](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L112)

Information on this playlist's privacy.

***

### tags

> **tags**: `string`[]

Defined in: [entities/playlist.ts:107](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L107)

The tags of the playlist.

***

### thumbnails

> **thumbnails**: `object`

Defined in: [entities/playlist.ts:86](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L86)

The thumbnails for the playlist.

#### default?

> `optional` **default?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### high?

> `optional` **high?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### maxres?

> `optional` **maxres?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### medium?

> `optional` **medium?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### standard?

> `optional` **standard?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

***

### title

> **title**: `string`

Defined in: [entities/playlist.ts:52](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L52)

The title of the playlist.

***

### url

> **url**: `string`

Defined in: [entities/playlist.ts:76](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L76)

The url of the playlist.

***

### videos

> **videos**: [`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>

Defined in: [entities/playlist.ts:66](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L66)

The videos in the playlist. Only available after calling [`Playlist.fetchVideos()`](#fetchvideos).  
**These are partial**, meaning they are missing some data.
See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
like you would using a loop.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/playlist.ts:32](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L32)

The YouTube object that created this playlist.

***

### endpoint

> `static` **endpoint**: `string` = `'playlists'`

Defined in: [entities/playlist.ts:13](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L13)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string`

Defined in: [entities/playlist.ts:23](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L23)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'contentDetails,player,snippet,status'`

Defined in: [entities/playlist.ts:18](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L18)

The parts to request for this entity.

## Methods

### addVideo()

> **addVideo**(`videoResolvable`, `position?`, `note?`): `Promise`\<[`Video`](Video.md)\>

Defined in: [entities/playlist.ts:204](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L204)

Adds a [Video](./Library_Exports.Video) to the playlist.
Must be using an access token with correct scopes.

#### Parameters

##### videoResolvable

[`VideoResolvable`](../type-aliases/VideoResolvable.md)

The URL, ID, or search query of the video.

##### position?

`number`

The zero-based position to insert the video in.

##### note?

`string`

A note on the video.

#### Returns

`Promise`\<[`Video`](Video.md)\>

***

### delete()

> **delete**(): `Promise`\<`void`\>

Defined in: [entities/playlist.ts:283](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L283)

Deletes the playlist.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### fetch()

> **fetch**(`parts?`): `Promise`\<`Playlist`\>

Defined in: [entities/playlist.ts:173](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L173)

Fetches this playlist from the API and reassigns this object to the new playlist object.
Only useful if `this.full` is false, or if you want updated playlist info.

#### Parameters

##### parts?

[`PlaylistParts`](../type-aliases/PlaylistParts.md)

#### Returns

`Promise`\<`Playlist`\>

***

### fetchVideos()

> **fetchVideos**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>\>

Defined in: [entities/playlist.ts:164](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L164)

Fetches the videos in this playlist from the API and adds them to the `videos` property.  
**These are partial**, meaning they are missing some data.
See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
like you would using a loop.

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value <=0 to fetch all.

##### parts?

[`PlaylistItemParts`](../type-aliases/PlaylistItemParts.md)

The parts of the object to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>\>

***

### removeItem()

> **removeItem**(`playlistItemId`): `Promise`\<`void`\>

Defined in: [entities/playlist.ts:267](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L267)

Removes a [Video](./Library_Exports.Video) from the playlist.
Must be using an access token with correct scopes.

#### Parameters

##### playlistItemId

`string`

The playlist item ID (not the same as video ID; see [`Playlist.removeVideo()`](./Library_Exports.Playlist#removevideo)).

#### Returns

`Promise`\<`void`\>

***

### removeVideo()

> **removeVideo**(`videoResolvable`): `Promise`\<`void`\>

Defined in: [entities/playlist.ts:243](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L243)

Removes a [Video](./Library_Exports.Video) from the playlist.
Must be using an access token with correct scopes.

#### Parameters

##### videoResolvable

[`VideoResolvable`](../type-aliases/VideoResolvable.md)

The URL, ID, or (not recommended) search query of the video.

#### Returns

`Promise`\<`void`\>

***

### update()

> **update**(`title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`\<`Playlist`\>

Defined in: [entities/playlist.ts:190](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L190)

Edits the playlist.
Must be using an access token with correct scopes.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### title

`string`

A title for the playlist.

##### description?

`string`

A description of the playlist.

##### privacy?

`"private"` \| `"public"` \| `"unlisted"`

Whether the video is private, public, or unlisted.

##### tags?

`string`[]

Tags pertaining to the playlist.

##### language?

`string`

The language of the playlist's default title and description.

##### localizations?

Translated titles and descriptions.

#### Returns

`Promise`\<`Playlist`\>

***

### updateVideo()

> **updateVideo**(`videoResolvable`, `position?`, `note?`, `itemId?`): `Promise`\<[`Video`](Video.md)\>

Defined in: [entities/playlist.ts:223](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/playlist.ts#L223)

Updates a [Video](./Library_Exports.Video) in the playlist.
Must be using an access token with correct scopes.

#### Parameters

##### videoResolvable

[`VideoResolvable`](../type-aliases/VideoResolvable.md)

The URL, ID, or (not recommended) search query of the video.

##### position?

`number`

The zero-based position to move the video to.

##### note?

`string`

A new note on the video.

##### itemId?

`string`

The playlist item ID if you have it.

#### Returns

`Promise`\<[`Video`](Video.md)\>
