---
id: "Library_Exports.YouTube"
title: "Documentation"
sidebar_label: "YouTube"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).YouTube

The main class used to interact with the YouTube API. Use this.

## Constructors

### constructor

• **new YouTube**(`apiKey?`, `accessToken?`, `options?`, `language?`, `region?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `apiKey?` | `string` | `undefined` | Your YouTube Data API v3 key. Don't share this with anybody. |
| `accessToken?` | `string` | `undefined` | A Google OAuth 2.0 access token. Used for [`YouTube.oauth`](#oauth) methods. |
| `options` | [`YouTubeOptions`](../modules/Library_Exports#youtubeoptions) | `undefined` | Caching options. Recommended to change. |
| `language` | `string` | `'en_US'` | The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages). |
| `region` | `string` | `'US'` | The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions).. |

#### Defined in

[index.ts:94](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L94)

## Properties

### #auth

• `Private` **#auth**: [`Authorization`](../modules/Library_Exports#authorization) = `{}`

#### Defined in

[index.ts:69](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L69)

___

### language

• **language**: `string`

The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages).

#### Defined in

[index.ts:79](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L79)

___

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

Methods requiring an OAuth token.

#### Defined in

[index.ts:74](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L74)

___

### region

• **region**: `string`

The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions).

#### Defined in

[index.ts:84](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L84)

## Methods

### getCategories

▸ **getCategories**(): `Promise`<[`VideoCategory`](Library_Exports.VideoCategory)[]\>

Get the list of video categories in [`this.region`](#region)`.

#### Returns

`Promise`<[`VideoCategory`](Library_Exports.VideoCategory)[]\>

#### Defined in

[index.ts:366](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L366)

___

### getCategory

▸ **getCategory**<`T`\>(`categoryId`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`VideoCategory`](Library_Exports.VideoCategory)\>\>

Get a [`VideoCategory`](./Library_Exports.VideoCategory) object from the ID of a category.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryId` | `T` | The ID of the category. |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`VideoCategory`](Library_Exports.VideoCategory)\>\>

#### Defined in

[index.ts:241](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L241)

___

### getChannel

▸ **getChannel**<`T`\>(`channelResolvable`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Channel`](Library_Exports.Channel)\>, typeof [`Channel`](Library_Exports.Channel)\>\>

Get a [`Channel`](./Library_Exports.Channel) object from the URL, ID, search query, or handle of a channel.
**Beware**, support for old custom channel URLs is shoddy.
Consider migrating to [the new @ system.](https://support.google.com/youtube/answer/2657968?hl=en)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) \| [`ChannelResolvable`](../modules/Library_Exports#channelresolvable)[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `T` | The URL, ID, search query, or handle of the channel. |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) | The parts of the channel to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Channel`](Library_Exports.Channel)\>, typeof [`Channel`](Library_Exports.Channel)\>\>

#### Defined in

[index.ts:201](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L201)

___

### getChannelPlaylists

▸ **getChannelPlaylists**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

Get `maxPerPage * pages` of a [`Channel`](./Library_Exports.Channel)'s [`Playlist`](./Library_Exports.Playlist)s.
Used mostly internally with [`Channel.fetchPlaylists()`](./Library_Exports.Channel#fetchplaylists).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the playlists to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

An object containing page token information for future requests and **playlist objects**.

#### Defined in

[index.ts:312](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L312)

___

### getChannelSection

▸ **getChannelSection**<`T`\>(`sectionId`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`ChannelSection`](Library_Exports.ChannelSection)\>\>

Get a [`ChannelSection`](./Library_Exports.ChannelSection) object from the ID of a section.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sectionId` | `T` | - |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) | The parts of the channel section to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`ChannelSection`](Library_Exports.ChannelSection)\>\>

#### Defined in

[index.ts:250](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L250)

___

### getChannelSections

▸ **getChannelSections**(`channelResolvable`, `parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Gets the [`ChannelSection`](./Library_Exports.ChannelSection)s of a [`Channel`](./Library_Exports.Channel).
Used mostly internally with [`Channel.fetchSections`](./Library_Exports.Channel#fetchsections).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The Username, URL, or ID of the channel to get the sections from. |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) | The parts of the channel sections to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Partial channel section objects.

#### Defined in

[index.ts:357](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L357)

___

### getChannelSubscriptions

▸ **getChannelSubscriptions**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

Get `maxPerPage * pages` of a [`Channel`](./Library_Exports.Channel)'s [`Subscription`](./Library_Exports.Subscription)s.
Used mostly internally with [`Channel.fetchSubscriptions()`](./Library_Exports.Channel#fetchsubscriptions).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

An object containing page token information for future requests and **subscription objects**.

#### Defined in

[index.ts:328](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L328)

___

### getComment

▸ **getComment**<`T`\>(`commentId`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`Comment`](Library_Exports.Comment)\>\>

Get a [`Comment`](./Library_Exports.Comment) object from the ID of a comment.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `T` | The ID of the comment. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the comment to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`Comment`](Library_Exports.Comment)\>\>

#### Defined in

[index.ts:222](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L222)

___

### getCommentReplies

▸ **getCommentReplies**(`commentResolvable`, `pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

Get `maxPerPage * pages` replies to a [`Comment`](./Library_Exports.Comment).
Used mostly internally with [`Comment.fetchReplies`](./Library_Exports.Comment#fetchreplies).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentResolvable` | [`CommentResolvable`](../modules/Library_Exports#commentresolvable) | - |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the replies to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

An object containing page token information for future requests and **comment objects**.

#### Defined in

[index.ts:344](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L344)

___

### getLanguages

▸ **getLanguages**(): `Promise`<[`Language`](Library_Exports.Language)[]\>

Get a list of languages that YouTube supports.

#### Returns

`Promise`<[`Language`](Library_Exports.Language)[]\>

#### Defined in

[index.ts:373](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L373)

___

### getPlaylist

▸ **getPlaylist**<`T`\>(`playlistResolvable`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Playlist`](Library_Exports.Playlist)\>, typeof [`Playlist`](Library_Exports.Playlist)\>\>

Get a [`Playlist`](./Library_Exports.Playlist) object from the URL, ID, or search query of a playlist.
Meant mostly for getting by URL or ID.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) \| [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable)[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | `T` | The URL, ID, or search query of the playlist. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the playlist to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Playlist`](Library_Exports.Playlist)\>, typeof [`Playlist`](Library_Exports.Playlist)\>\>

#### Defined in

[index.ts:212](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L212)

___

### getPlaylistItems

▸ **getPlaylistItems**(`playlistResolvable`, `pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

Get `maxPerPage * pages` videos in a [`Playlist`](./Library_Exports.Playlist).
Used mostly internally with [`Playlist.fetchVideos()`](./Library_Exports.Playlist#fetchvideos).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The URL, ID, or Title of the playlist. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the videos to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

An object containing page token information for future requests and ***partial* video objects**.

#### Defined in

[index.ts:277](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L277)

___

### getRegions

▸ **getRegions**(): `Promise`<[`Region`](Library_Exports.Region)[]\>

Get a list of regions that YouTube supports.

#### Returns

`Promise`<[`Region`](Library_Exports.Region)[]\>

#### Defined in

[index.ts:380](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L380)

___

### getSubscription

▸ **getSubscription**<`T`\>(`subscriptionId`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`Subscription`](Library_Exports.Subscription)\>\>

Get a [`Subscription`](./Library_Exports.Subscription) object from the ID of a subscription.  
Fetching a subscription by ID is **CURRENTLY BROKEN** in the Public YouTube API,
see https://issuetracker.google.com/issues/288609601

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `string` \| `string`[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionId` | `T` | The ID of the subscription. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscription to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`Subscription`](Library_Exports.Subscription)\>\>

#### Defined in

[index.ts:233](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L233)

___

### getSubscriptionByChannels

▸ **getSubscriptionByChannels**(`subscriberResolvable`, `channelResolvable`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Get a [`Subscription`](./Library_Exports.Subscription) object from the subscriber and channel of a subscription.
Channels can be passed in the form of ID, URL, or search query.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriberResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | A resolvable channel that is the subscriber. |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | A resolvable channel that is the channel being subscribed to. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscription to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[index.ts:261](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L261)

___

### getVideo

▸ **getVideo**<`T`\>(`videoResolvable`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Video`](Library_Exports.Video)\>, typeof [`Video`](Library_Exports.Video)\>\>

Get a [`Video`](./Library_Exports.Video) object from the URL, ID, or search query of a video.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`VideoResolvable`](../modules/Library_Exports#videoresolvable) \| [`VideoResolvable`](../modules/Library_Exports#videoresolvable)[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `T` | The URL, ID, or search query of the video. |
| `parts?` | [`VideoParts`](../modules/Library_Exports#videoparts) | The parts of the video to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Video`](Library_Exports.Video)\>, typeof [`Video`](Library_Exports.Video)\>\>

#### Defined in

[index.ts:189](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L189)

___

### getVideoComments

▸ **getVideoComments**(`videoResolvable`, `pageOptions?`, `order?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

Get `maxPerPage * pages` [`Comment`](./Library_Exports.Comment)s from a [`Video`](./Library_Exports.Video).
Used mostly internally with [`Video.fetchComments()`](./Library_Exports.Video#fetchcomments).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The URL, ID, or Title of the video. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `order?` | ``"time"`` \| ``"relevance"`` | - |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | The parts of the comments to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

An object containing page token information for future requests and **comment objects**.

#### Defined in

[index.ts:294](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L294)

___

### hasAccessToken

▸ **hasAccessToken**(): `boolean`

#### Returns

`boolean`

#### Defined in

[index.ts:384](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L384)

___

### search

▸ **search**<`T`\>(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<`InstanceType`<`T`\>\>\>

Search supported entities on YouTube.

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SearchType`](../modules/Library_Exports#searchtype) = [`SearchType`](../modules/Library_Exports#searchtype) |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`GenericSearchOptions`](../modules/Library_Exports#genericsearchoptions)<`T`\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<`InstanceType`<`T`\>\>\>

#### Defined in

[index.ts:146](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L146)

___

### searchChannels

▸ **searchChannels**(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Channel`](Library_Exports.Channel)\>\>

Search channels on YouTube.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`EntitySearchOptions`](../modules/Library_Exports#entitysearchoptions)<typeof [`Channel`](Library_Exports.Channel)\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Channel`](Library_Exports.Channel)\>\>

#### Defined in

[index.ts:169](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L169)

___

### searchPlaylists

▸ **searchPlaylists**(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

Search playlists on YouTube.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`EntitySearchOptions`](../modules/Library_Exports#entitysearchoptions)<typeof [`Playlist`](Library_Exports.Playlist)\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

#### Defined in

[index.ts:180](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L180)

___

### searchVideos

▸ **searchVideos**(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

Search videos on YouTube.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`EntitySearchOptions`](../modules/Library_Exports#entitysearchoptions)<typeof [`Video`](Library_Exports.Video)\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Video`](Library_Exports.Video)\>\>

#### Defined in

[index.ts:158](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L158)

___

### setAuthorization

▸ **setAuthorization**(`authorization`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `authorization` | [`Authorization`](../modules/Library_Exports#authorization) |

#### Returns

`void`

#### Defined in

[index.ts:388](https://github.com/brandonbothell/popyt/blob/365a9e9/src/index.ts#L388)
