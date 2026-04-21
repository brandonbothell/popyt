[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / YouTube

# Class: YouTube

Defined in: [index.ts:18](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L18)

The main class used to interact with the YouTube API. Use this.

## Constructors

### Constructor

> **new YouTube**(`apiKey?`, `accessToken?`, `options?`, `language?`, `region?`): `YouTube`

Defined in: [index.ts:84](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L84)

#### Parameters

##### apiKey?

`string`

Your YouTube Data API v3 key. Don't share this with anybody.

##### accessToken?

`string`

A Google OAuth 2.0 access token. Used for [`YouTube.oauth`](#oauth) methods.

##### options?

[`YouTubeOptions`](../type-aliases/YouTubeOptions.md) = `...`

Caching options. Recommended to change.

##### language?

`string` = `'en_US'`

The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages).

##### region?

`string` = `'US'`

The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions)..

#### Returns

`YouTube`

## Properties

### language

> **language**: `string`

Defined in: [index.ts:69](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L69)

The language for the API to respond in. See [`YouTube.getLanguages()`](#getlanguages).

***

### oauth

> **oauth**: [`OAuth`](../../OAuth/classes/OAuth.md)

Defined in: [index.ts:64](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L64)

Methods requiring an OAuth token.

***

### region

> **region**: `string`

Defined in: [index.ts:74](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L74)

The region for the API cater responses to. See [`YouTube.getRegions()`](#getregions).

## Methods

### getCategories()

> **getCategories**(): `Promise`\<[`VideoCategory`](VideoCategory.md)[]\>

Defined in: [index.ts:401](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L401)

Get the list of video categories in [`this.region`](#region)`.

#### Returns

`Promise`\<[`VideoCategory`](VideoCategory.md)[]\>

***

### getCategory()

> **getCategory**\<`T`\>(`categoryId`): `Promise`\<`T` *extends* `any`[] ? [`VideoCategory`](VideoCategory.md)[] : [`VideoCategory`](VideoCategory.md)\>

Defined in: [index.ts:265](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L265)

Get a [`VideoCategory`](./VideoCategory) object from the ID of a category.

#### Type Parameters

##### T

`T` *extends* `string` \| `string`[]

#### Parameters

##### categoryId

`T`

The ID of the category.

#### Returns

`Promise`\<`T` *extends* `any`[] ? [`VideoCategory`](VideoCategory.md)[] : [`VideoCategory`](VideoCategory.md)\>

***

### getChannel()

> **getChannel**\<`T`\>(`channelResolvable`, `parts?`): `Promise`\<`ResolveReturn`\<`T`, *typeof* [`Channel`](Channel.md)\> *extends* `any`[] ? [`Channel`](Channel.md)[] : [`Channel`](Channel.md)\>

Defined in: [index.ts:225](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L225)

Get a [`Channel`](./Channel) object from the URL, ID, search query, or handle of a channel.
**Beware**, support for old custom channel URLs is shoddy.
Consider migrating to [the new @ system.](https://support.google.com/youtube/answer/2657968?hl=en)

#### Type Parameters

##### T

`T` *extends* [`ChannelResolvable`](../type-aliases/ChannelResolvable.md) \| [`ChannelResolvable`](../type-aliases/ChannelResolvable.md)[]

#### Parameters

##### channelResolvable

`T`

The URL, ID, search query, or handle of the channel.

##### parts?

[`ChannelParts`](../type-aliases/ChannelParts.md)

The parts of the channel to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<`ResolveReturn`\<`T`, *typeof* [`Channel`](Channel.md)\> *extends* `any`[] ? [`Channel`](Channel.md)[] : [`Channel`](Channel.md)\>

***

### getChannelPlaylists()

> **getChannelPlaylists**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>\>

Defined in: [index.ts:347](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L347)

Get `maxPerPage * pages` of a [`Channel`](./Channel)'s [`Playlist`](./Playlist)s.
Used mostly internally with [`Channel.fetchPlaylists()`](./Channel#fetchplaylists).

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../type-aliases/ChannelResolvable.md)

The Username, URL, or ID of the channel.

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`PlaylistParts`](../type-aliases/PlaylistParts.md)

The parts of the playlists to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>\>

An object containing page token information for future requests and **playlist objects**.

***

### getChannelSection()

> **getChannelSection**\<`T`\>(`sectionId`, `parts?`): `Promise`\<`T` *extends* `any`[] ? [`ChannelSection`](ChannelSection.md)[] : [`ChannelSection`](ChannelSection.md)\>

Defined in: [index.ts:274](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L274)

Get a [`ChannelSection`](./ChannelSection) object from the ID of a section.

#### Type Parameters

##### T

`T` *extends* `string` \| `string`[]

#### Parameters

##### sectionId

`T`

The ID of the section.

##### parts?

[`ChannelSectionParts`](../type-aliases/ChannelSectionParts.md)

The parts of the channel section to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<`T` *extends* `any`[] ? [`ChannelSection`](ChannelSection.md)[] : [`ChannelSection`](ChannelSection.md)\>

***

### getChannelSections()

> **getChannelSections**(`channelResolvable`, `parts?`): `Promise`\<[`ChannelSection`](ChannelSection.md)[]\>

Defined in: [index.ts:392](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L392)

Gets the [`ChannelSection`](./ChannelSection)s of a [`Channel`](./Channel).
Used mostly internally with [`Channel.fetchSections`](./Channel#fetchsections).

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../type-aliases/ChannelResolvable.md)

The Username, URL, or ID of the channel to get the sections from.

##### parts?

[`ChannelSectionParts`](../type-aliases/ChannelSectionParts.md)

The parts of the channel sections to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`ChannelSection`](ChannelSection.md)[]\>

Partial channel section objects.

***

### getChannelSubscriptions()

> **getChannelSubscriptions**(`channelResolvable`, `pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>\>

Defined in: [index.ts:363](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L363)

Get `maxPerPage * pages` of a [`Channel`](./Channel)'s [`Subscription`](./Subscription)s.
Used mostly internally with [`Channel.fetchSubscriptions()`](./Channel#fetchsubscriptions).

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../type-aliases/ChannelResolvable.md)

The Username, URL, or ID of the channel.

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`SubscriptionParts`](../type-aliases/SubscriptionParts.md)

The parts of the subscriptions to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>\>

An object containing page token information for future requests and **subscription objects**.

***

### getComment()

> **getComment**\<`T`\>(`commentId`, `parts?`): `Promise`\<`T` *extends* `any`[] ? [`Comment`](Comment.md)[] : [`Comment`](Comment.md)\>

Defined in: [index.ts:246](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L246)

Get a [`Comment`](./Comment) object from the ID of a comment.

#### Type Parameters

##### T

`T` *extends* `string` \| `string`[]

#### Parameters

##### commentId

`T`

The ID of the comment.

##### parts?

[`CommentParts`](../type-aliases/CommentParts.md)

The parts of the comment to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<`T` *extends* `any`[] ? [`Comment`](Comment.md)[] : [`Comment`](Comment.md)\>

***

### getCommentReplies()

> **getCommentReplies**(`commentResolvable`, `pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>\>

Defined in: [index.ts:379](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L379)

Get `maxPerPage * pages` replies to a [`Comment`](./Comment).
Used mostly internally with [`Comment.fetchReplies`](./Comment#fetchreplies).

#### Parameters

##### commentResolvable

[`CommentResolvable`](../type-aliases/CommentResolvable.md)

The ID or URL of the comment to get replies from.

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`CommentParts`](../type-aliases/CommentParts.md)

The parts of the replies to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>\>

An object containing page token information for future requests and **comment objects**.

***

### getLanguages()

> **getLanguages**(): `Promise`\<[`Language`](Language.md)[]\>

Defined in: [index.ts:408](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L408)

Get a list of languages that YouTube supports.

#### Returns

`Promise`\<[`Language`](Language.md)[]\>

***

### getPlaylist()

> **getPlaylist**\<`T`\>(`playlistResolvable`, `parts?`): `Promise`\<`ResolveReturn`\<`T`, *typeof* [`Playlist`](Playlist.md)\> *extends* `any`[] ? [`Playlist`](Playlist.md)[] : [`Playlist`](Playlist.md)\>

Defined in: [index.ts:236](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L236)

Get a [`Playlist`](./Playlist) object from the URL, ID, or search query of a playlist.
Meant mostly for getting by URL or ID.

#### Type Parameters

##### T

`T` *extends* [`PlaylistResolvable`](../type-aliases/PlaylistResolvable.md) \| [`PlaylistResolvable`](../type-aliases/PlaylistResolvable.md)[]

#### Parameters

##### playlistResolvable

`T`

The URL, ID, or search query of the playlist.

##### parts?

[`PlaylistParts`](../type-aliases/PlaylistParts.md)

The parts of the playlist to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<`ResolveReturn`\<`T`, *typeof* [`Playlist`](Playlist.md)\> *extends* `any`[] ? [`Playlist`](Playlist.md)[] : [`Playlist`](Playlist.md)\>

***

### getPlaylistItems()

> **getPlaylistItems**(`playlistResolvable`, `pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>\>

Defined in: [index.ts:312](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L312)

Get `maxPerPage * pages` videos in a [`Playlist`](./Playlist).
Used mostly internally with [`Playlist.fetchVideos()`](./Playlist#fetchvideos).

#### Parameters

##### playlistResolvable

[`PlaylistResolvable`](../type-aliases/PlaylistResolvable.md)

The URL, ID, or Title of the playlist.

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`PlaylistItemParts`](../type-aliases/PlaylistItemParts.md)

The parts of the videos to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>\>

An object containing page token information for future requests and ***partial* video objects**.

***

### getRegions()

> **getRegions**(): `Promise`\<[`Region`](Region.md)[]\>

Defined in: [index.ts:415](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L415)

Get a list of regions that YouTube supports.

#### Returns

`Promise`\<[`Region`](Region.md)[]\>

***

### getSubscription()

> **getSubscription**\<`T`\>(`subscriptionId`, `parts?`): `Promise`\<`T` *extends* `any`[] ? [`Subscription`](Subscription.md)[] : [`Subscription`](Subscription.md)\>

Defined in: [index.ts:257](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L257)

Get a [`Subscription`](./Subscription) object from the ID of a subscription.  
Fetching a subscription by ID is **CURRENTLY BROKEN** in the Public YouTube API,
see https://issuetracker.google.com/issues/288609601

#### Type Parameters

##### T

`T` *extends* `string` \| `string`[]

#### Parameters

##### subscriptionId

`T`

The ID of the subscription.

##### parts?

[`SubscriptionParts`](../type-aliases/SubscriptionParts.md)

The parts of the subscription to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<`T` *extends* `any`[] ? [`Subscription`](Subscription.md)[] : [`Subscription`](Subscription.md)\>

***

### getSubscriptionByChannels()

> **getSubscriptionByChannels**(`subscriberResolvable`, `channelResolvable`, `parts?`): `Promise`\<[`Subscription`](Subscription.md)\>

Defined in: [index.ts:285](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L285)

Get a [`Subscription`](./Subscription) object from the subscriber and channel of a subscription.
Channels can be passed in the form of ID, URL, or search query.

#### Parameters

##### subscriberResolvable

[`ChannelResolvable`](../type-aliases/ChannelResolvable.md)

A resolvable channel that is the subscriber.

##### channelResolvable

[`ChannelResolvable`](../type-aliases/ChannelResolvable.md)

A resolvable channel that is the channel being subscribed to.

##### parts?

[`SubscriptionParts`](../type-aliases/SubscriptionParts.md)

The parts of the subscription to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`Subscription`](Subscription.md)\>

***

### getVideo()

> **getVideo**\<`T`\>(`videoResolvable`, `parts?`): `Promise`\<`ResolveReturn`\<`T`, *typeof* [`Video`](Video.md)\> *extends* `any`[] ? [`Video`](Video.md)[] : [`Video`](Video.md)\>

Defined in: [index.ts:213](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L213)

Get a [`Video`](./Video) object from the URL, ID, or search query of a video.

#### Type Parameters

##### T

`T` *extends* [`VideoResolvable`](../type-aliases/VideoResolvable.md) \| [`VideoResolvable`](../type-aliases/VideoResolvable.md)[]

#### Parameters

##### videoResolvable

`T`

The URL, ID, or search query of the video.

##### parts?

[`VideoParts`](../type-aliases/VideoParts.md)

The parts of the video to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<`ResolveReturn`\<`T`, *typeof* [`Video`](Video.md)\> *extends* `any`[] ? [`Video`](Video.md)[] : [`Video`](Video.md)\>

***

### getVideoComments()

> **getVideoComments**(`videoResolvable`, `pageOptions?`, `order?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>\>

Defined in: [index.ts:329](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L329)

Get `maxPerPage * pages` [`Comment`](./Comment)s from a [`Video`](./Video).
Used mostly internally with [`Video.fetchComments()`](./Video#fetchcomments).

#### Parameters

##### videoResolvable

[`VideoResolvable`](../type-aliases/VideoResolvable.md)

The URL, ID, or Title of the video.

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### order?

`"time"` \| `"relevance"`

##### parts?

[`CommentThreadParts`](../type-aliases/CommentThreadParts.md)

The parts of the comments to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>\>

An object containing page token information for future requests and **comment objects**.

***

### hasAccessToken()

> **hasAccessToken**(): `boolean`

Defined in: [index.ts:419](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L419)

#### Returns

`boolean`

***

### search()

> **search**\<`T`\>(`searchTerm`, `searchOptions?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<`InstanceType`\<`T`\>\>\>

Defined in: [index.ts:167](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L167)

Search supported entities on YouTube.

#### Type Parameters

##### T

`T` *extends* [`SearchType`](../type-aliases/SearchType.md) = [`SearchType`](../type-aliases/SearchType.md)

#### Parameters

##### searchTerm

`string`

What to search for on YouTube.

##### searchOptions?

[`GenericSearchOptions`](../type-aliases/GenericSearchOptions.md)\<`T`\>

Options related to the search including search filters,
the number of pages, maximum number of results per page, and starting page token.
Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<`InstanceType`\<`T`\>\>\>

***

### searchChannels()

> **searchChannels**(`searchTerm`, `searchOptions?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Channel`](Channel.md)\>\>

Defined in: [index.ts:190](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L190)

Search channels on YouTube.

#### Parameters

##### searchTerm

`string`

What to search for on YouTube.

##### searchOptions?

[`EntitySearchOptions`](../type-aliases/EntitySearchOptions.md)\<*typeof* [`Channel`](Channel.md)\>

Options related to the search including search filters,
the number of pages, maximum number of results per page, and starting page token.
Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Channel`](Channel.md)\>\>

***

### searchPlaylists()

> **searchPlaylists**(`searchTerm`, `searchOptions?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>\>

Defined in: [index.ts:201](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L201)

Search playlists on YouTube.

#### Parameters

##### searchTerm

`string`

What to search for on YouTube.

##### searchOptions?

[`EntitySearchOptions`](../type-aliases/EntitySearchOptions.md)\<*typeof* [`Playlist`](Playlist.md)\>

Options related to the search including search filters,
the number of pages, maximum number of results per page, and starting page token.
Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>\>

***

### searchVideos()

> **searchVideos**(`searchTerm`, `searchOptions?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>\>

Defined in: [index.ts:179](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L179)

Search videos on YouTube.

#### Parameters

##### searchTerm

`string`

What to search for on YouTube.

##### searchOptions?

[`EntitySearchOptions`](../type-aliases/EntitySearchOptions.md)\<*typeof* [`Video`](Video.md)\>

Options related to the search including search filters,
the number of pages, maximum number of results per page, and starting page token.
Defaults to the maximum 50 items per page, as well as 1 page. Increase pages as high as you'd like.

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Video`](Video.md)\>\>

***

### setAuthorization()

> **setAuthorization**(`authorization`): `void`

Defined in: [index.ts:423](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/index.ts#L423)

#### Parameters

##### authorization

[`Authorization`](../type-aliases/Authorization.md)

#### Returns

`void`
