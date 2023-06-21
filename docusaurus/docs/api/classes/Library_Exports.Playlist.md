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

[entities/playlist.ts:103](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L103)

## Properties

### creatorId

• **creatorId**: `string`

The ID of the creator of the playlist.

#### Defined in

[entities/playlist.ts:65](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L65)

___

### data

• **data**: `any`

The raw data of this playlist.

#### Defined in

[entities/playlist.ts:31](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L31)

___

### dateCreated

• **dateCreated**: `Date`

The date the playlist was created.

#### Defined in

[entities/playlist.ts:75](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L75)

___

### description

• **description**: `string`

The description of the playlist.

#### Defined in

[entities/playlist.ts:51](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L51)

___

### embedHtml

• **embedHtml**: `string`

An \<iframe\> tag that embeds a player that will play the playlist.

#### Defined in

[entities/playlist.ts:96](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L96)

___

### full

• **full**: `boolean`

Whether or not this is a full playlist object.

#### Defined in

[entities/playlist.ts:36](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L36)

___

### id

• **id**: `string`

The ID of this playlist.

#### Defined in

[entities/playlist.ts:41](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L41)

___

### length

• **length**: `number`

The number of items in the playlist.

#### Defined in

[entities/playlist.ts:91](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L91)

___

### tags

• **tags**: `string`[]

The tags of the playlist.

#### Defined in

[entities/playlist.ts:101](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L101)

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

[entities/playlist.ts:80](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L80)

___

### title

• **title**: `string`

The title of the playlist.

#### Defined in

[entities/playlist.ts:46](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L46)

___

### url

• **url**: `string`

The url of the playlist.

#### Defined in

[entities/playlist.ts:70](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L70)

___

### videos

• **videos**: [`Video`](Library_Exports.Video)[]

The videos in the playlist. Only available after calling `[Playlist.fetchVideos()](#fetchvideos)`.  
**These are partial**, meaning they are missing some data.
See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
like you would using a loop.

#### Defined in

[entities/playlist.ts:60](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L60)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this playlist.

#### Defined in

[entities/playlist.ts:26](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'playlists'`

The name of the endpoint used for this entity.

#### Defined in

[entities/playlist.ts:11](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(tags,title,description,channelId,publishedAt,thumbnails),contentDetails(itemCount),player(embedHtml))'`

The fields to request for this entity.

#### Defined in

[entities/playlist.ts:21](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,player'`

The parts to request for this entity.

#### Defined in

[entities/playlist.ts:16](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L16)

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

[entities/playlist.ts:196](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L196)

___

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the playlist.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/playlist.ts:267](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L267)

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

[entities/playlist.ts:164](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L164)

___

### fetchVideos

▸ **fetchVideos**(`pageOptions?`, `parts?`): `Promise`<[`Video`](Library_Exports.Video)[]\>

Fetches the videos in this playlist from the API and adds them to the `videos` property.  
**These are partial**, meaning they are missing some data.
See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [YouTube.getVideo(playlist.videos)](./Library_Exports.YouTube#getvideo) to fetch the full objects while not spamming your quota
like you would using a loop.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)[]\>

#### Defined in

[entities/playlist.ts:155](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L155)

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

[entities/playlist.ts:250](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L250)

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

[entities/playlist.ts:232](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L232)

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

[entities/playlist.ts:182](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L182)

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

[entities/playlist.ts:218](https://github.com/brandonbothell/popyt/blob/99c3131/src/entities/playlist.ts#L218)
