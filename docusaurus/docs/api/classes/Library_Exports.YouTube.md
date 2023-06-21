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

• **new YouTube**(`token?`, `accessToken?`, `options?`, `language?`, `region?`)

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `token?` | `string` | `undefined` | Your YouTube Data API v3 token. Don't share this with anybody. It could be an API key or an OAuth 2.0 token. |
| `accessToken?` | `string` | `undefined` | A Google OAuth 2.0 access token. Used for [`YouTube.oauth`](#oauth) methods. |
| `options` | [`YouTubeOptions`](../modules/Library_Exports#youtubeoptions) | `undefined` | Caching options. Recommended to change. |
| `language` | `string` | `'en_US'` | The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages). |
| `region` | `string` | `'US'` | The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions).. |

#### Defined in

[index.ts:87](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L87)

## Properties

### accessToken

• **accessToken**: `string`

#### Defined in

[index.ts:61](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L61)

___

### language

• **language**: `string`

The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages).

#### Defined in

[index.ts:71](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L71)

___

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

Methods requiring an OAuth token.

#### Defined in

[index.ts:66](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L66)

___

### region

• **region**: `string`

The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions).

#### Defined in

[index.ts:76](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L76)

___

### token

• **token**: `string`

#### Defined in

[index.ts:59](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L59)

## Methods

### getCategories

▸ **getCategories**(): `Promise`<[`VideoCategory`](Library_Exports.VideoCategory)[]\>

Get the list of video categories in [`this.region`](#region)`.

#### Returns

`Promise`<[`VideoCategory`](Library_Exports.VideoCategory)[]\>

#### Defined in

[index.ts:343](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L343)

___

### getCategory

▸ **getCategory**(`categoryId`): `Promise`<[`VideoCategory`](Library_Exports.VideoCategory)\>

Get a [`VideoCategory`](./Library_Exports.VideoCategory) object from the ID of a category.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryId` | `string` \| `string`[] | The ID of the category. |

#### Returns

`Promise`<[`VideoCategory`](Library_Exports.VideoCategory)\>

#### Defined in

[index.ts:220](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L220)

___

### getChannel

▸ **getChannel**<`T`\>(`channelResolvable`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Channel`](Library_Exports.Channel)\>, typeof [`Channel`](Library_Exports.Channel)\>\>

Get a [`Channel`](./Library_Exports.Channel) object from the URL, ID, or search query of a channel.
**Beware**, support for old custom channel URLs is shoddy.
Consider migrating to [the new @ system.](https://support.google.com/youtube/answer/2657968?hl=en)

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) \| [`ChannelResolvable`](../modules/Library_Exports#channelresolvable)[] |

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `T` | The URL, ID, or search query of the channel. |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) | The parts of the channel to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`ResolveReturn`<`T`, typeof [`Channel`](Library_Exports.Channel)\>, typeof [`Channel`](Library_Exports.Channel)\>\>

#### Defined in

[index.ts:182](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L182)

___

### getChannelPlaylists

▸ **getChannelPlaylists**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Get `maxPerPage * pages` of a [`Channel`](./Library_Exports.Channel)'s [`Playlist`](./Library_Exports.Playlist)s.
Used mostly internally with [`Channel.fetchPlaylists()`](./Library_Exports.Channel#fetchplaylists).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the playlists to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Partial playlist objects.

#### Defined in

[index.ts:289](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L289)

___

### getChannelSection

▸ **getChannelSection**(`sectionId`, `parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Get a [`ChannelSection`](./Library_Exports.ChannelSection) object from the ID of a section.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sectionId` | `string` \| `string`[] | - |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) | The parts of the channel section to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[index.ts:229](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L229)

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

[index.ts:334](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L334)

___

### getChannelSubscriptions

▸ **getChannelSubscriptions**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Get `maxPerPage * pages` of a [`Channel`](./Library_Exports.Channel)'s [`Subscription`](./Library_Exports.Subscription)s.
Used mostly internally with [`Channel.fetchSubscriptions()`](./Library_Exports.Channel#fetchsubscriptions).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Partial subscription objects.

#### Defined in

[index.ts:305](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L305)

___

### getComment

▸ **getComment**<`T`\>(`commentId`, `parts?`): `Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`YTComment`](Library_Exports.YTComment)\>\>

Get a [`Comment`](./Library_Exports.YTComment) object from the ID of a comment.

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

`Promise`<[`ItemReturns`](../modules/Library_Exports#itemreturns)<`T`, typeof [`YTComment`](Library_Exports.YTComment)\>\>

#### Defined in

[index.ts:203](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L203)

___

### getCommentReplies

▸ **getCommentReplies**(`commentResolvable`, `pageOptions?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Get `maxPerPage * pages` replies to a [`Comment`](./Library_Exports.YTComment).
Used mostly internally with [`Comment.fetchReplies`](./Library_Exports.YTComment#fetchreplies).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentResolvable` | [`CommentResolvable`](../modules/Library_Exports#commentresolvable) | - |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the replies to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Partial comment objects.

#### Defined in

[index.ts:321](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L321)

___

### getLanguages

▸ **getLanguages**(): `Promise`<[`Language`](Library_Exports.Language)[]\>

Get a list of languages that YouTube supports.

#### Returns

`Promise`<[`Language`](Library_Exports.Language)[]\>

#### Defined in

[index.ts:350](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L350)

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

[index.ts:193](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L193)

___

### getPlaylistItems

▸ **getPlaylistItems**(`playlistResolvable`, `pageOptions?`, `parts?`): `Promise`<[`Video`](Library_Exports.Video)[]\>

Get `maxPerPage * pages` videos in a [`Playlist`](./Library_Exports.Playlist).
Used mostly internally with [`Playlist.fetchVideos()`](./Library_Exports.Playlist#fetchvideos).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The URL, ID, or Title of the playlist. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the videos to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)[]\>

Partial video objects.

#### Defined in

[index.ts:257](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L257)

___

### getRegions

▸ **getRegions**(): `Promise`<[`Region`](Library_Exports.Region)[]\>

Get a list of regions that YouTube supports.

#### Returns

`Promise`<[`Region`](Library_Exports.Region)[]\>

#### Defined in

[index.ts:357](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L357)

___

### getSubscription

▸ **getSubscription**(`subscriptionId`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Get a [`Subscription`](./Library_Exports.Subscription) object from the ID of a subscription.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionId` | `string` \| `string`[] | The ID of the subscription. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscription to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[index.ts:212](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L212)

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

[index.ts:240](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L240)

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

[index.ts:170](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L170)

___

### getVideoComments

▸ **getVideoComments**(`videoResolvable`, `pageOptions?`, `order?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Get `maxPerPage * pages` [`Comment`](./Library_Exports.YTComment)s from a [`Video`](./Library_Exports.Video).
Used mostly internally with [`Video.fetchComments()`](./Library_Exports.Video#fetchcomments).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The URL, ID, or Title of the video. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `order?` | ``"time"`` \| ``"relevance"`` | - |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | The parts of the comments to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Partial comment objects.

#### Defined in

[index.ts:273](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L273)

___

### search

▸ **search**<`T`\>(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<`T`\>\>

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

`Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<`T`\>\>

#### Defined in

[index.ts:128](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L128)

___

### searchChannels

▸ **searchChannels**(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<typeof [`Channel`](Library_Exports.Channel)\>\>

Search channels on YouTube.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`EntitySearchOptions`](../modules/Library_Exports#entitysearchoptions)<typeof [`Channel`](Library_Exports.Channel)\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<typeof [`Channel`](Library_Exports.Channel)\>\>

#### Defined in

[index.ts:150](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L150)

___

### searchPlaylists

▸ **searchPlaylists**(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<typeof [`Playlist`](Library_Exports.Playlist)\>\>

Search playlists on YouTube.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`EntitySearchOptions`](../modules/Library_Exports#entitysearchoptions)<typeof [`Playlist`](Library_Exports.Playlist)\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<typeof [`Playlist`](Library_Exports.Playlist)\>\>

#### Defined in

[index.ts:161](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L161)

___

### searchVideos

▸ **searchVideos**(`searchTerm`, `searchOptions?`): `Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<typeof [`Video`](Library_Exports.Video)\>\>

Search videos on YouTube.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `searchTerm` | `string` | What to search for on YouTube. |
| `searchOptions?` | [`EntitySearchOptions`](../modules/Library_Exports#entitysearchoptions)<typeof [`Video`](Library_Exports.Video)\> | Options related to the search including search filters, the number of pages, maximum number of results per page, and starting page token. Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like. |

#### Returns

`Promise`<[`PaginatedItemsReturns`](../modules/Library_Exports#paginateditemsreturns)<typeof [`Video`](Library_Exports.Video)\>\>

#### Defined in

[index.ts:139](https://github.com/brandonbothell/popyt/blob/536c688/src/index.ts#L139)
