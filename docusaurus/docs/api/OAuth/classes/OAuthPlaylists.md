[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [OAuth](../README.md) / OAuthPlaylists

# Class: OAuthPlaylists

Defined in: [oauth/playlists.ts:10](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L10)

## Constructors

### Constructor

> **new OAuthPlaylists**(`oauth`): `OAuthPlaylists`

Defined in: [oauth/playlists.ts:11](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L11)

#### Parameters

##### oauth

[`OAuth`](OAuth.md)

#### Returns

`OAuthPlaylists`

## Properties

### oauth

> **oauth**: [`OAuth`](OAuth.md)

Defined in: [oauth/playlists.ts:11](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L11)

## Methods

### addPlaylistItem()

> **addPlaylistItem**(`playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`\<[`Video`](../../Library-Exports/classes/Video.md)\>

Defined in: [oauth/playlists.ts:113](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L113)

Adds a [Video](../../Library-Exports/classes/Video#) to a [Playlist](../../Library-Exports/classes/Playlist#).

#### Parameters

##### playlistResolvable

[`PlaylistResolvable`](../../Library-Exports/type-aliases/PlaylistResolvable.md)

The playlist to add the video to.

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video to add to the playlist.

##### position?

`number`

The position to add the video in. Defaults to the end.

##### note?

`string`

A user-generated note on the video.

#### Returns

`Promise`\<[`Video`](../../Library-Exports/classes/Video.md)\>

A partial video object.

***

### createPlaylist()

> **createPlaylist**(`title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`\<[`Playlist`](../../Library-Exports/classes/Playlist.md)\>

Defined in: [oauth/playlists.ts:22](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L22)

Creates a [Playlist](../../Library-Exports/classes/Playlist#).

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

`Promise`\<[`Playlist`](../../Library-Exports/classes/Playlist.md)\>

***

### deletePlaylist()

> **deletePlaylist**(`playlistResolvable`): `Promise`\<`void`\>

Defined in: [oauth/playlists.ts:95](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L95)

Deletes a [Playlist](../../Library-Exports/classes/Playlist#).

#### Parameters

##### playlistResolvable

[`PlaylistResolvable`](../../Library-Exports/type-aliases/PlaylistResolvable.md)

The playlist to delete.

#### Returns

`Promise`\<`void`\>

***

### deletePlaylistItem()

> **deletePlaylistItem**(`id`): `Promise`\<`void`\>

Defined in: [oauth/playlists.ts:183](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L183)

Deletes a playlist item.

#### Parameters

##### id

`string`

The ID of the playlist item to delete.

#### Returns

`Promise`\<`void`\>

***

### updatePlaylist()

> **updatePlaylist**(`playlistResolvable`, `title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`\<[`Playlist`](../../Library-Exports/classes/Playlist.md)\>

Defined in: [oauth/playlists.ts:61](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L61)

Updates a [Playlist](../../Library-Exports/classes/Playlist#).  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### playlistResolvable

[`PlaylistResolvable`](../../Library-Exports/type-aliases/PlaylistResolvable.md)

The playlist to update.

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

`Promise`\<[`Playlist`](../../Library-Exports/classes/Playlist.md)\>

***

### updatePlaylistItem()

> **updatePlaylistItem**(`id`, `playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`\<[`Video`](../../Library-Exports/classes/Video.md)\>

Defined in: [oauth/playlists.ts:151](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/playlists.ts#L151)

Edits a playlist item.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### id

`string`

The ID of the playlist item to edit.

##### playlistResolvable

[`PlaylistResolvable`](../../Library-Exports/type-aliases/PlaylistResolvable.md)

The playlist that the video is in.

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video that's in the playlist.

##### position?

`number`

The position to change the playlist item's to.

##### note?

`string`

The note to change the playlist item's to.

#### Returns

`Promise`\<[`Video`](../../Library-Exports/classes/Video.md)\>

A partial video object.
