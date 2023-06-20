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

[entities/playlist.ts:100](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L100)

## Properties

### creatorId

• **creatorId**: `string`

The ID of the creator of the playlist.

#### Defined in

[entities/playlist.ts:62](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L62)

___

### data

• **data**: `any`

The raw data of this playlist.

#### Defined in

[entities/playlist.ts:32](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L32)

___

### dateCreated

• **dateCreated**: `Date`

The date the playlist was created.

#### Defined in

[entities/playlist.ts:72](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L72)

___

### description

• **description**: `string`

The description of the playlist.

#### Defined in

[entities/playlist.ts:52](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L52)

___

### embedHtml

• **embedHtml**: `string`

An \<iframe\> tag that embeds a player that will play the playlist.

#### Defined in

[entities/playlist.ts:93](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L93)

___

### full

• **full**: `boolean`

Whether or not this is a full playlist object.

#### Defined in

[entities/playlist.ts:37](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L37)

___

### id

• **id**: `string`

The ID of this playlist.

#### Defined in

[entities/playlist.ts:42](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L42)

___

### length

• **length**: `number`

The number of items in the playlist.

#### Defined in

[entities/playlist.ts:88](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L88)

___

### tags

• **tags**: `string`[]

The tags of the playlist.

#### Defined in

[entities/playlist.ts:98](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L98)

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

[entities/playlist.ts:77](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L77)

___

### title

• **title**: `string`

The title of the playlist.

#### Defined in

[entities/playlist.ts:47](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L47)

___

### url

• **url**: `string`

The url of the playlist.

#### Defined in

[entities/playlist.ts:67](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L67)

___

### videos

• **videos**: [`Video`](Library_Exports.Video)[]

The videos in the playlist. Only available after calling [[Playlist.fetchVideos]].

#### Defined in

[entities/playlist.ts:57](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L57)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this playlist.

#### Defined in

[entities/playlist.ts:27](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L27)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'playlists'`

The name of the endpoint used for this entity.

#### Defined in

[entities/playlist.ts:12](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L12)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(tags,title,description,channelId,publishedAt,thumbnails),contentDetails(itemCount),player(embedHtml))'`

The fields to request for this entity.

#### Defined in

[entities/playlist.ts:22](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L22)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,player'`

The parts to request for this entity.

#### Defined in

[entities/playlist.ts:17](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L17)

## Methods

### addVideo

▸ **addVideo**(`videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Adds a [[Video]] to the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The URL, ID, or Title of the video. |
| `position?` | `number` | The zero-based position to insert the video in. |
| `note?` | `string` | A note on the video. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/playlist.ts:186](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L186)

___

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the playlist.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:257](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L257)

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

[entities/playlist.ts:154](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L154)

___

### fetchVideos

▸ **fetchVideos**(`pages?`, `parts?`): `Promise`<[`Video`](Library_Exports.Video)[]\>

Adds videos in this playlist to the `videos` property of this playlist.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pages?` | `number` | The number of pages of videos to fetch. Defaults to 1. Set <1 to fetch all items. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | - |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)[]\>

#### Defined in

[entities/playlist.ts:145](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L145)

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

[entities/playlist.ts:240](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L240)

___

### removeVideo

▸ **removeVideo**(`videoResolvable`): `Promise`<`void`\>

Removes a [[Video]] from the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` | The URL, ID, or Title of the video. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:222](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L222)

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

[entities/playlist.ts:172](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L172)

___

### updateVideo

▸ **updateVideo**(`videoResolvable`, `position?`, `note?`, `itemId?`): `Promise`<[`Video`](Library_Exports.Video)\>

Updates a [[Video]] in the playlist.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The URL, ID, or Title of the video. |
| `position?` | `number` | The zero-based position to move the video to. |
| `note?` | `string` | A new note on the video. |
| `itemId?` | `string` | The playlist item ID if you have it. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/playlist.ts:208](https://github.com/brandonbothell/popyt/blob/a8ee514/src/entities/playlist.ts#L208)
