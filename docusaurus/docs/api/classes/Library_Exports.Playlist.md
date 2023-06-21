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

[entities/playlist.ts:99](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L99)

## Properties

### creatorId

• **creatorId**: `string`

The ID of the creator of the playlist.

#### Defined in

[entities/playlist.ts:61](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L61)

___

### data

• **data**: `any`

The raw data of this playlist.

#### Defined in

[entities/playlist.ts:31](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L31)

___

### dateCreated

• **dateCreated**: `Date`

The date the playlist was created.

#### Defined in

[entities/playlist.ts:71](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L71)

___

### description

• **description**: `string`

The description of the playlist.

#### Defined in

[entities/playlist.ts:51](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L51)

___

### embedHtml

• **embedHtml**: `string`

An \<iframe\> tag that embeds a player that will play the playlist.

#### Defined in

[entities/playlist.ts:92](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L92)

___

### full

• **full**: `boolean`

Whether or not this is a full playlist object.

#### Defined in

[entities/playlist.ts:36](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L36)

___

### id

• **id**: `string`

The ID of this playlist.

#### Defined in

[entities/playlist.ts:41](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L41)

___

### length

• **length**: `number`

The number of items in the playlist.

#### Defined in

[entities/playlist.ts:87](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L87)

___

### tags

• **tags**: `string`[]

The tags of the playlist.

#### Defined in

[entities/playlist.ts:97](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L97)

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

[entities/playlist.ts:76](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L76)

___

### title

• **title**: `string`

The title of the playlist.

#### Defined in

[entities/playlist.ts:46](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L46)

___

### url

• **url**: `string`

The url of the playlist.

#### Defined in

[entities/playlist.ts:66](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L66)

___

### videos

• **videos**: [`Video`](Library_Exports.Video)[]

The videos in the playlist. Only available after calling [[Playlist.fetchVideos]].

#### Defined in

[entities/playlist.ts:56](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L56)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this playlist.

#### Defined in

[entities/playlist.ts:26](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'playlists'`

The name of the endpoint used for this entity.

#### Defined in

[entities/playlist.ts:11](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(tags,title,description,channelId,publishedAt,thumbnails),contentDetails(itemCount),player(embedHtml))'`

The fields to request for this entity.

#### Defined in

[entities/playlist.ts:21](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,player'`

The parts to request for this entity.

#### Defined in

[entities/playlist.ts:16](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L16)

## Methods

### addVideo

▸ **addVideo**(`videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Adds a [[Video]] to the playlist.
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

[entities/playlist.ts:188](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L188)

___

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the playlist.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:259](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L259)

___

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Fetches this playlist and reassigns this object to the new playlist object.
Only useful if `this.full` is false, or if you want updated playlist info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[entities/playlist.ts:156](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L156)

___

### fetchVideos

▸ **fetchVideos**(`pageOptions?`, `parts?`): `Promise`<[`Video`](Library_Exports.Video)[]\>

Adds videos in this playlist to the `videos` property of this playlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)[]\>

#### Defined in

[entities/playlist.ts:147](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L147)

___

### removeItem

▸ **removeItem**(`playlistItemId`): `Promise`<`void`\>

Removes a [[Video]] from the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistItemId` | `string` | The playlist item ID (not the same as video id. See [[Playlist.removeVideo]]). |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:242](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L242)

___

### removeVideo

▸ **removeVideo**(`videoResolvable`): `Promise`<`void`\>

Removes a [[Video]] from the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The URL, ID, or (not recommended) search query of the video. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:224](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L224)

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

[entities/playlist.ts:174](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L174)

___

### updateVideo

▸ **updateVideo**(`videoResolvable`, `position?`, `note?`, `itemId?`): `Promise`<[`Video`](Library_Exports.Video)\>

Updates a [[Video]] in the playlist.
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

[entities/playlist.ts:210](https://github.com/brandonbothell/popyt/blob/2cfe584/src/entities/playlist.ts#L210)
