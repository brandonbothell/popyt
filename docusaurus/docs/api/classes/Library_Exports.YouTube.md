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
| `accessToken?` | `string` | `undefined` | A Google OAuth 2.0 access token. Used for [[YouTube.oauth]] methods. |
| `options` | [`YouTubeOptions`](../modules/Library_Exports#youtubeoptions) | `undefined` | Caching options. Recommended to change. |
| `language` | `string` | `'en_US'` | The language for the API to respond in. See [[YouTube.getLanguages]]. |
| `region` | `string` | `'US'` | The region for the API cater responses to. See [[YouTube.getRegions]]. |

#### Defined in

[index.ts:72](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L72)

## Properties

### accessToken

• **accessToken**: `string`

#### Defined in

[index.ts:46](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L46)

___

### language

• **language**: `string`

The language for the API to respond in. See [[YouTube.getLanguages]].

#### Defined in

[index.ts:56](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L56)

___

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

Methods requiring an OAuth token.

#### Defined in

[index.ts:51](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L51)

___

### region

• **region**: `string`

The region for the API cater responses to. See [[YouTube.getRegions]].

#### Defined in

[index.ts:61](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L61)

___

### token

• **token**: `string`

#### Defined in

[index.ts:44](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L44)

## Methods

### getCategories

▸ **getCategories**(): `Promise`<[`VideoCategory`](Library_Exports.VideoCategory)[]\>

Get the list of categories in `this.region`.

#### Returns

`Promise`<[`VideoCategory`](Library_Exports.VideoCategory)[]\>

#### Defined in

[index.ts:342](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L342)

___

### getCategory

▸ **getCategory**(`categoryId`): `Promise`<[`VideoCategory`](Library_Exports.VideoCategory)\>

Get a [[VideoCategory]] object from the ID of a category.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `categoryId` | `string` | The ID of the category. |

#### Returns

`Promise`<[`VideoCategory`](Library_Exports.VideoCategory)\>

#### Defined in

[index.ts:210](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L210)

___

### getChannel

▸ **getChannel**(`channelResolvable`, `parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Get a [[Channel]] object from the Username, URL or ID of a channel.
Meant mostly for getting by URL or ID.  
**Beware**, custom channel URLs may not work.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The Username, URL or ID of the channel. |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) | The parts of the channel to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[index.ts:172](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L172)

___

### getChannelComments

▸ **getChannelComments**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

**`Deprecated`**

See https://support.google.com/youtube/thread/130882091?hl=en&msgid=131295194

Get `maxPerPage * pages` [[YTComment]]s from a [[Channel]]'s discussion tab. Used mostly internally with [[Channel.fetchComments]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | The parts of the comments to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Partial comment objects.

#### Defined in

[index.ts:277](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L277)

___

### getChannelPlaylists

▸ **getChannelPlaylists**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Get `maxPerPage * pages` of a [[Channel]]'s [[Playlist]]s. Used mostly internally with [[Channel.fetchPlaylists]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the playlists to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Partial playlist objects.

#### Defined in

[index.ts:292](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L292)

___

### getChannelSection

▸ **getChannelSection**(`sectionId`, `parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Get a [[ChannelSection]] object from the ID of a section.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `sectionId` | `string` | - |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) | The parts of the channel section to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[index.ts:219](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L219)

___

### getChannelSections

▸ **getChannelSections**(`channelResolvable`, `parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Gets the [[ChannelSection]]s of a [[Channel]]. Used mostly internally with [[Channel.fetchSections]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The Username, URL, or ID of the channel to get the sections from. |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) | The parts of the channel sections to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Partial channel section objects.

#### Defined in

[index.ts:333](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L333)

___

### getChannelSubscriptions

▸ **getChannelSubscriptions**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Get `maxPerPage * pages` of a [[Channel]]'s [[Subscription]]s. Used mostly internally with [[Channel.fetchSubscriptions]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The Username, URL, or ID of the channel. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Partial subscription objects.

#### Defined in

[index.ts:307](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L307)

___

### getComment

▸ **getComment**(`commentId`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Get a [[Comment]] object from the ID of a comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the comment to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[index.ts:193](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L193)

___

### getCommentReplies

▸ **getCommentReplies**(`commentId`, `pageOptions?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Get `maxPerPage * pages` replies to a [[YTComment]]. Used mostly internally with [[Comment.fetchReplies]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to get replies from. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the replies to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Partial comment objects.

#### Defined in

[index.ts:322](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L322)

___

### getLanguages

▸ **getLanguages**(): `Promise`<[`Language`](Library_Exports.Language)[]\>

Get a list of languages that YouTube supports.

#### Returns

`Promise`<[`Language`](Library_Exports.Language)[]\>

#### Defined in

[index.ts:349](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L349)

___

### getPlaylist

▸ **getPlaylist**(`playlistResolvable`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Get a [[Playlist]] object from the URL, ID, or Title of a playlist.
Meant mostly for getting by URL or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | `string` \| [`Playlist`](Library_Exports.Playlist) | The URL, ID, or Title of the playlist. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the playlist to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[index.ts:183](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L183)

___

### getPlaylistItems

▸ **getPlaylistItems**(`playlistResolvable`, `pageOptions?`, `parts?`): `Promise`<[`Video`](Library_Exports.Video)[]\>

Get `maxPerPage * pages` videos in a [[Playlist]]. Used mostly internally with [[Playlist.fetchVideos]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | `string` \| [`Playlist`](Library_Exports.Playlist) | The URL, ID, or Title of the playlist. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistItemParts`](../modules/Library_Exports#playlistitemparts) | The parts of the videos to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)[]\>

Partial video objects.

#### Defined in

[index.ts:245](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L245)

___

### getRegions

▸ **getRegions**(): `Promise`<[`Region`](Library_Exports.Region)[]\>

Get a list of regions that YouTube supports.

#### Returns

`Promise`<[`Region`](Library_Exports.Region)[]\>

#### Defined in

[index.ts:356](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L356)

___

### getSubscription

▸ **getSubscription**(`subscriptionId`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Get a [[Subscription]] object from the ID of a subscription.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionId` | `string` | The ID of the subscription. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscription to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[index.ts:202](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L202)

___

### getSubscriptionByChannels

▸ **getSubscriptionByChannels**(`subscriberResolvable`, `channelResolvable`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Get a [[Subscription]] object from the subscriber and channel of a subscription.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriberResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | A resolvable channel that is the subscriber. |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | A resolvable channel that is the channel being subscribed to. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the subscription to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[index.ts:229](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L229)

___

### getVideo

▸ **getVideo**(`videoResolvable`, `parts?`): `Promise`<[`Video`](Library_Exports.Video)\>

Get a [[Video]] object from the URL, ID, or Title of a video.
Meant mostly for getting by URL or ID.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The URL, ID, or Title of the video. |
| `parts?` | [`VideoParts`](../modules/Library_Exports#videoparts) | The parts of the video to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[index.ts:160](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L160)

___

### getVideoComments

▸ **getVideoComments**(`videoResolvable`, `pageOptions?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Get `maxPerPage * pages` [[YTComment]]s from a [[Video]]. Used mostly internally with [[Video.fetchComments]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The URL, ID, or Title of the video. |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | The parts of the comments to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Partial comment objects.

#### Defined in

[index.ts:260](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L260)

___

### search

▸ **search**(`types`, `searchTerm`, `maxResults?`, `pageToken?`, `fields?`): `Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: ([`Video`](Library_Exports.Video) \| [`Channel`](Library_Exports.Channel) \| [`Playlist`](Library_Exports.Playlist))[]  }\>

Search supported entities on YouTube.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `types` | (typeof [`Video`](Library_Exports.Video) \| typeof [`Channel`](Library_Exports.Channel) \| typeof [`Playlist`](Library_Exports.Playlist))[] | `undefined` | An array of types to search for. May be a single type or multiple types. |
| `searchTerm` | `string` | `undefined` | What to search for on YouTube. |
| `maxResults` | `number` | `10` | The maximum amount of results to find. Defaults to 10. Max 50. |
| `pageToken?` | `string` | `undefined` | The page token to start at. Provide this if you have received it as output from a call to a search method. |
| `fields?` | `string` | `undefined` | The fields to include in the response. Includes all by default. |

#### Returns

`Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: ([`Video`](Library_Exports.Video) \| [`Channel`](Library_Exports.Channel) \| [`Playlist`](Library_Exports.Playlist))[]  }\>

#### Defined in

[index.ts:114](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L114)

___

### searchChannels

▸ **searchChannels**(`searchTerm`, `maxResults?`, `pageToken?`): `Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: [`Channel`](Library_Exports.Channel)[]  }\>

Search channels on YouTube.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `searchTerm` | `string` | `undefined` | What to search for on YouTube. |
| `maxResults` | `number` | `10` | The maximum amount of results to find. Defaults to 10. Max 50. |
| `pageToken?` | `string` | `undefined` | The page token to start at. Provide this if you have received it as output from a call to a search method. |

#### Returns

`Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: [`Channel`](Library_Exports.Channel)[]  }\>

#### Defined in

[index.ts:140](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L140)

___

### searchPlaylists

▸ **searchPlaylists**(`searchTerm`, `maxResults?`, `pageToken?`): `Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: [`Playlist`](Library_Exports.Playlist)[]  }\>

Search playlists on YouTube.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `searchTerm` | `string` | `undefined` | What to search for on YouTube. |
| `maxResults` | `number` | `10` | The maximum amount of results to find. Defaults to 10. Max 50. |
| `pageToken?` | `string` | `undefined` | The page token to start at. Provide this if you have received it as output from a call to a search method. |

#### Returns

`Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: [`Playlist`](Library_Exports.Playlist)[]  }\>

#### Defined in

[index.ts:150](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L150)

___

### searchVideos

▸ **searchVideos**(`searchTerm`, `maxResults?`, `pageToken?`, `category?`, `channelId?`, `onlyEmbeddable?`, `eventType?`, `type?`): `Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: [`Video`](Library_Exports.Video)[]  }\>

Search videos on YouTube.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `searchTerm` | `string` | `undefined` | What to search for on YouTube. |
| `maxResults` | `number` | `10` | The maximum amount of results to find. Defaults to 10. Max 50. |
| `pageToken?` | `string` | `undefined` | The page token to start at. Provide this if you have received it as output from a call to a search method. |
| `category?` | `string` | `undefined` | The category ID that you want to specifically search for. |
| `channelId?` | `string` | `undefined` | The channel ID that you want to specifically search for. |
| `onlyEmbeddable` | `boolean` | `false` | Whether or not to return only embeddable videos. |
| `eventType?` | ``"live"`` \| ``"upcoming"`` \| ``"completed"`` | `undefined` | The type of event you want to search for. Searches for everything by default. |
| `type` | ``"any"`` \| ``"episode"`` \| ``"movie"`` | `'any'` | - |

#### Returns

`Promise`<{ `nextPageToken`: `string` ; `prevPageToken`: `string` ; `results`: [`Video`](Library_Exports.Video)[]  }\>

#### Defined in

[index.ts:128](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/index.ts#L128)
