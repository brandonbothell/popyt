[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [OAuth](../README.md) / OAuth

# Class: OAuth

Defined in: [oauth/index.ts:23](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L23)

All methods requiring an OAuth access token.
Use [`YouTube.oauth`](../../Library-Exports/classes/YouTube#oauth) to access these methods.

## Constructors

### Constructor

> **new OAuth**(`youtube`): `OAuth`

Defined in: [oauth/index.ts:56](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L56)

#### Parameters

##### youtube

[`YouTube`](../../Library-Exports/classes/YouTube.md)

The [YouTube](../../Library-Exports/classes/YouTube) object to retrieve the token from.

#### Returns

`OAuth`

## Properties

### captions

> **captions**: [`OAuthCaptions`](OAuthCaptions.md)

Defined in: [oauth/index.ts:50](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L50)

All OAuth methods related to [captions](../../Library-Exports/classes/Caption).

***

### channels

> **channels**: [`OAuthChannels`](OAuthChannels.md)

Defined in: [oauth/index.ts:45](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L45)

All OAuth methods related to [channels](../../Library-Exports/classes/Channel).

***

### comments

> **comments**: [`OAuthComments`](OAuthComments.md)

Defined in: [oauth/index.ts:29](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L29)

All OAuth methods related to [comments](../../Library-Exports/classes/Comment).

***

### playlists

> **playlists**: [`OAuthPlaylists`](OAuthPlaylists.md)

Defined in: [oauth/index.ts:40](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L40)

All OAuth methods related to
[playlists](../../Library-Exports/classes/Playlist)/playlist items.

***

### videos

> **videos**: [`OAuthVideos`](OAuthVideos.md)

Defined in: [oauth/index.ts:34](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L34)

All OAuth methods related to [videos](../../Library-Exports/classes/Video)/video ratings.

***

### youtube

> **youtube**: [`YouTube`](../../Library-Exports/classes/YouTube.md)

Defined in: [oauth/index.ts:24](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L24)

## Methods

### getMe()

> **getMe**(`parts?`): `Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

Defined in: [oauth/index.ts:72](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L72)

Gets the authorized user's [Channel](../../Library-Exports/classes/Channel#).

#### Parameters

##### parts?

[`ChannelParts`](../../Library-Exports/type-aliases/ChannelParts.md)

#### Returns

`Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

***

### getMyChannelSections()

> **getMyChannelSections**(`parts?`): `Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)[]\>

Defined in: [oauth/index.ts:134](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L134)

Gets the authorized user's [ChannelSection](../../Library-Exports/classes/ChannelSection)s.

#### Parameters

##### parts?

[`ChannelSectionParts`](../../Library-Exports/type-aliases/ChannelSectionParts.md)

#### Returns

`Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)[]\>

***

### getMyPlaylists()

> **getMyPlaylists**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../../Library-Exports/type-aliases/PaginatedResponse.md)\<[`Playlist`](../../Library-Exports/classes/Playlist.md)\>\>

Defined in: [oauth/index.ts:122](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L122)

Gets the authorized user's [Playlist](../../Library-Exports/classes/Playlist#)s.

#### Parameters

##### pageOptions?

[`PageOptions`](../../Library-Exports/type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch
Fetches the maximum allowed by the API by default.
Set to a value {'<='}0 to fetch all.

##### parts?

[`PlaylistParts`](../../Library-Exports/type-aliases/PlaylistParts.md)

#### Returns

`Promise`\<[`PaginatedResponse`](../../Library-Exports/type-aliases/PaginatedResponse.md)\<[`Playlist`](../../Library-Exports/classes/Playlist.md)\>\>

***

### getMySubscriptions()

> **getMySubscriptions**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../../Library-Exports/type-aliases/PaginatedResponse.md)\<[`Subscription`](../../Library-Exports/classes/Subscription.md)\>\>

Defined in: [oauth/index.ts:105](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L105)

Gets the authorized user's [Subscription](../../Library-Exports/classes/Subscription#)s.

#### Parameters

##### pageOptions?

[`PageOptions`](../../Library-Exports/type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch
Fetches the maximum allowed by the API by default.
Set to a value {'<='}0 to fetch all.

##### parts?

[`SubscriptionParts`](../../Library-Exports/type-aliases/SubscriptionParts.md)

#### Returns

`Promise`\<[`PaginatedResponse`](../../Library-Exports/type-aliases/PaginatedResponse.md)\<[`Subscription`](../../Library-Exports/classes/Subscription.md)\>\>

***

### getMyUploads()

> **getMyUploads**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../../Library-Exports/type-aliases/PaginatedResponse.md)\<[`Video`](../../Library-Exports/classes/Video.md)\>\>

Defined in: [oauth/index.ts:88](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/index.ts#L88)

Gets the authorized user's uploads.  
These are **partial [Video](../../Library-Exports/classes/Video) objects**,
meaning they are missing some data. See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](../../Library-Exports/classes/YouTube#getvideo) to
fetch the full objects while not spamming your quota like you would using a loop.

#### Parameters

##### pageOptions?

[`PageOptions`](../../Library-Exports/type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`PlaylistItemParts`](../../Library-Exports/type-aliases/PlaylistItemParts.md)

The parts of the videos to fetch.

#### Returns

`Promise`\<[`PaginatedResponse`](../../Library-Exports/type-aliases/PaginatedResponse.md)\<[`Video`](../../Library-Exports/classes/Video.md)\>\>
