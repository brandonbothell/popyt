---
id: "Library_Exports.Playlist"
title: "Documentation"
sidebar_label: "Playlist"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Playlist

A YouTube playlist.

## Constructors

### constructor

• **new Playlist**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `false` |

#### Defined in

[entities/playlist.ts:112](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L112)

## Properties

### creatorId

• **creatorId**: `string`

The ID of the creator of the playlist.

#### Defined in

[entities/playlist.ts:69](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L69)

___

### data

• **data**: `any`

The raw data of this playlist.

#### Defined in

[entities/playlist.ts:35](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L35)

___

### dateCreated

• **dateCreated**: `Date`

The date the playlist was created.

#### Defined in

[entities/playlist.ts:79](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L79)

___

### description

• **description**: `string`

The description of the playlist.

#### Defined in

[entities/playlist.ts:55](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L55)

___

### embedHtml

• **embedHtml**: `string`

An \<iframe\> tag that embeds a player that will play the playlist.

#### Defined in

[entities/playlist.ts:100](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L100)

___

### full

• **full**: `boolean`

Whether or not this is a full playlist object.

#### Defined in

[entities/playlist.ts:40](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L40)

___

### id

• **id**: `string`

The ID of this playlist.

#### Defined in

[entities/playlist.ts:45](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L45)

___

### length

• **length**: `number`

The number of items in the playlist.

#### Defined in

[entities/playlist.ts:95](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L95)

___

### privacy

• **privacy**: ``"private"`` \| ``"public"`` \| ``"unlisted"``

Information on this playlist's privacy.

#### Defined in

[entities/playlist.ts:110](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L110)

___

### tags

• **tags**: `string`[]

The tags of the playlist.

#### Defined in

[entities/playlist.ts:105](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L105)

___

### thumbnails

• **thumbnails**: `Object`

The thumbnails for the playlist.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `high?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `maxres?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `medium?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `standard?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |

#### Defined in

[entities/playlist.ts:84](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L84)

___

### title

• **title**: `string`

The title of the playlist.

#### Defined in

[entities/playlist.ts:50](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L50)

___

### url

• **url**: `string`

The url of the playlist.

#### Defined in

[entities/playlist.ts:74](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L74)

___

### videos

• **videos**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>

The videos in the playlist. Only available after calling [`Playlist.fetchVideos()`](#fetchvideos).  
**These are partial**, meaning they are missing some data.
See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
like you would using a loop.

#### Defined in

[entities/playlist.ts:64](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L64)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this playlist.

#### Defined in

[entities/playlist.ts:30](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L30)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'playlists'`

The name of the endpoint used for this entity.

#### Defined in

[entities/playlist.ts:11](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L11)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/playlist.ts:21](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,player,status'`

The parts to request for this entity.

#### Defined in

[entities/playlist.ts:16](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L16)

## Methods

### addVideo

▸ **addVideo**(`videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Adds a [Video](./Library_Exports.Video) to the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The URL, ID, or search query of the video. |
| `position?` | `number` | The zero-based position to insert the video in. |
| `note?` | `string` | A note on the video. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/playlist.ts:201](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L201)

___

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the playlist.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:274](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L274)

___

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Fetches this playlist from the API and reassigns this object to the new playlist object.
Only useful if `this.full` is false, or if you want updated playlist info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[entities/playlist.ts:170](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L170)

___

### fetchVideos

▸ **fetchVideos**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

Fetches the videos in this playlist from the API and adds them to the `videos` property.  
**These are partial**, meaning they are missing some data.
See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
like you would using a loop.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

#### Defined in

[entities/playlist.ts:161](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L161)

___

### removeItem

▸ **removeItem**(`playlistItemId`): `Promise`<`void`\>

Removes a [Video](./Library_Exports.Video) from the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistItemId` | `string` | The playlist item ID (not the same as video ID; see [`Playlist.removeVideo()`](./Library_Exports.Playlist#removevideo)). |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:258](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L258)

___

### removeVideo

▸ **removeVideo**(`videoResolvable`): `Promise`<`void`\>

Removes a [Video](./Library_Exports.Video) from the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The URL, ID, or (not recommended) search query of the video. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:240](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L240)

___

### update

▸ **update**(`title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Edits the playlist.
Must be using an access token with correct scopes.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | `string` | A title for the playlist. |
| `description?` | `string` | A description of the playlist. |
| `privacy?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` | Whether the video is private, public, or unlisted. |
| `tags?` | `string`[] | Tags pertaining to the playlist. |
| `language?` | `string` | The language of the playlist's default title and description. |
| `localizations?` | `Object` | Translated titles and descriptions. |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[entities/playlist.ts:187](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L187)

___

### updateVideo

▸ **updateVideo**(`videoResolvable`, `position?`, `note?`, `itemId?`): `Promise`<[`Video`](Library_Exports.Video)\>

Updates a [Video](./Library_Exports.Video) in the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The URL, ID, or (not recommended) search query of the video. |
| `position?` | `number` | The zero-based position to move the video to. |
| `note?` | `string` | A new note on the video. |
| `itemId?` | `string` | The playlist item ID if you have it. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/playlist.ts:220](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/playlist.ts#L220)
