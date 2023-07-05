---
id: "OAuth.OAuth"
title: "Documentation"
sidebar_label: "OAuth"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuth

All methods requiring an OAuth access token.
Use `YouTube.oauth` to access these methods.

## Constructors

### constructor

• **new OAuth**(`youtube`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | The [YouTube](./Library_Exports.YouTube) object to retrieve the token from. |

#### Defined in

[oauth/index.ts:56](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L56)

## Properties

### captions

• **captions**: [`OAuthCaptions`](OAuth.OAuthCaptions)

All OAuth methods related to [captions](./Library_Exports.Caption).

#### Defined in

[oauth/index.ts:50](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L50)

___

### channels

• **channels**: [`OAuthChannels`](OAuth.OAuthChannels)

All OAuth methods related to [channels](./Library_Exports.Channel).

#### Defined in

[oauth/index.ts:45](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L45)

___

### comments

• **comments**: [`OAuthComments`](OAuth.OAuthComments)

All OAuth methods related to [comments](./Library_Exports.Comment).

#### Defined in

[oauth/index.ts:29](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L29)

___

### playlists

• **playlists**: [`OAuthPlaylists`](OAuth.OAuthPlaylists)

All OAuth methods related to
[playlists](./Library_Exports.Playlist)/playlist items.

#### Defined in

[oauth/index.ts:40](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L40)

___

### videos

• **videos**: [`OAuthVideos`](OAuth.OAuthVideos)

All OAuth methods related to [videos](./Library_Exports.Video)/video ratings.

#### Defined in

[oauth/index.ts:34](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L34)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

#### Defined in

[oauth/index.ts:24](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L24)

## Methods

### getMe

▸ **getMe**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Gets the authorized user's [Channel](./Library_Exports.Channel#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth/index.ts:73](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L73)

___

### getMyChannelSections

▸ **getMyChannelSections**(`parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Gets the authorized user's [ChannelSection](./Library_Exports.ChannelSection)s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

#### Defined in

[oauth/index.ts:137](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L137)

___

### getMyPlaylists

▸ **getMyPlaylists**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

Gets the authorized user's [Playlist](./Library_Exports.Playlist#)s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch Fetches the maximum allowed by the API by default. Set to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | - |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

#### Defined in

[oauth/index.ts:125](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L125)

___

### getMySubscriptions

▸ **getMySubscriptions**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

Gets the authorized user's [Subscription](./Library_Exports.Subscription#)s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch Fetches the maximum allowed by the API by default. Set to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | - |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

#### Defined in

[oauth/index.ts:108](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L108)

___

### getMyUploads

▸ **getMyUploads**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

Gets the authorized user's uploads.  
These are **partial [Video](./Library_Exports.Video) objects**,
meaning they are missing some data. See the properties they include [here](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation).
Use [`YouTube.getVideo(playlist.videos)`](./Library_Exports.YouTube#getvideo) to
fetch the full objects while not spamming your quota like you would using a loop.  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the videos to fetch. |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

#### Defined in

[oauth/index.ts:90](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/oauth/index.ts#L90)
