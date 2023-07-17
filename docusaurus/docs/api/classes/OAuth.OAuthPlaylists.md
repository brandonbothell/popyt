---
id: "OAuth.OAuthPlaylists"
title: "Documentation"
sidebar_label: "OAuthPlaylists"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuthPlaylists

## Constructors

### constructor

• **new OAuthPlaylists**(`oauth`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oauth` | [`OAuth`](OAuth.OAuth) |

#### Defined in

[oauth/playlists.ts:10](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L10)

## Properties

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

#### Defined in

[oauth/playlists.ts:10](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L10)

## Methods

### addPlaylistItem

▸ **addPlaylistItem**(`playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Adds a [Video](./Library_Exports.Video#) to a [Playlist](./Library_Exports.Playlist#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist to add the video to. |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video to add to the playlist. |
| `position?` | `number` | The position to add the video in. Defaults to the end. |
| `note?` | `string` | A user-generated note on the video. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

A partial video object.

#### Defined in

[oauth/playlists.ts:116](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L116)

___

### createPlaylist

▸ **createPlaylist**(`title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Creates a [Playlist](./Library_Exports.Playlist#).  
Last tested 05/18/2020 11:48. PASSING

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

[oauth/playlists.ts:22](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L22)

___

### deletePlaylist

▸ **deletePlaylist**(`playlistResolvable`): `Promise`<`void`\>

Deletes a [Playlist](./Library_Exports.Playlist#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth/playlists.ts:97](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L97)

___

### deletePlaylistItem

▸ **deletePlaylistItem**(`id`): `Promise`<`void`\>

Deletes a playlist item.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the playlist item to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth/playlists.ts:188](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L188)

___

### updatePlaylist

▸ **updatePlaylist**(`playlistResolvable`, `title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Updates a [Playlist](./Library_Exports.Playlist#).  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist to update. |
| `title` | `string` | A title for the playlist. |
| `description?` | `string` | A description of the playlist. |
| `privacy?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` | Whether the video is private, public, or unlisted. |
| `tags?` | `string`[] | Tags pertaining to the playlist. |
| `language?` | `string` | The language of the playlist's default title and description. |
| `localizations?` | `Object` | Translated titles and descriptions. |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[oauth/playlists.ts:62](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L62)

___

### updatePlaylistItem

▸ **updatePlaylistItem**(`id`, `playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Edits a playlist item.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the playlist item to edit. |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist that the video is in. |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video that's in the playlist. |
| `position?` | `number` | The position to change the playlist item's to. |
| `note?` | `string` | The note to change the playlist item's to. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

A partial video object.

#### Defined in

[oauth/playlists.ts:155](https://github.com/brandonbothell/popyt/blob/f59765a/src/oauth/playlists.ts#L155)
