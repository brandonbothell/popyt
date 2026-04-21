[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Channel

# Class: Channel

Defined in: [entities/channel.ts:9](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L9)

A YouTube channel.

## Constructors

### Constructor

> **new Channel**(`youtube`, `data`, `full?`): `Channel`

Defined in: [entities/channel.ts:173](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L173)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$SearchResult` \| `Schema$Channel`

##### full?

`boolean` = `false`

#### Returns

`Channel`

## Properties

### about

> **about**: `string`

Defined in: [entities/channel.ts:55](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L55)

The description of this channel.

***

### banner

> **banner**: `string`

Defined in: [entities/channel.ts:142](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L142)

The URL to the image used to generate YouTube banner images for
this channel across all platforms.

***

### country

> **country**: `string`

Defined in: [entities/channel.ts:65](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L65)

The country this channel is based in.

***

### customUrl

> **customUrl**: `string`

Defined in: [entities/channel.ts:75](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L75)

This channel's custom URL, if they have one.

***

### data

> **data**: `any`

Defined in: [entities/channel.ts:45](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L45)

The raw data of this channel.

***

### dateCreated

> **dateCreated**: `Date`

Defined in: [entities/channel.ts:91](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L91)

The date this channel was created.

***

### featuredChannels

> **featuredChannels**: `string`[]

Defined in: [entities/channel.ts:121](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L121)

The URLs of all of this channel's featured channels. This property is broken for some channels.

***

### full

> **full**: `boolean`

Defined in: [entities/channel.ts:40](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L40)

Whether or not this a full channel object.

***

### id

> **id**: `string`

Defined in: [entities/channel.ts:60](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L60)

The ID of this channel.

***

### keywords

> **keywords**: `string`[]

Defined in: [entities/channel.ts:106](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L106)

This channel's keywords.

***

### kids

> **kids**: `object`

Defined in: [entities/channel.ts:161](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L161)

Properties to do with videos made for children.

#### madeForKids

> **madeForKids**: `boolean`

Whether or not the channel is made for children.

#### selfDeclaredMadeForKids

> **selfDeclaredMadeForKids**: `boolean`

Whether or not the owner of the channel marked it as made for kids.

***

### language

> **language**: `string`

Defined in: [entities/channel.ts:96](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L96)

The default language for this channel's uploads.

***

### liveStatus

> **liveStatus**: `false` \| `"live"` \| `"upcoming"`

Defined in: [entities/channel.ts:156](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L156)

Only set if the channel is a search result.

If the channel has an ongoing livestream, this is `live`.
If the channel has an upcoming livestream, this is `upcoming`.
If the channel has neither an ongoing nor upcoming livestream, this is `false`.

***

### localizations

> **localizations**: `object`

Defined in: [entities/channel.ts:147](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L147)

The localized titles and descriptions of this channel, if any.

#### Index Signature

\[`language`: `string`\]: `Schema$ChannelLocalization`

***

### name

> **name**: `string`

Defined in: [entities/channel.ts:50](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L50)

The name of this channel.

***

### playlists

> **playlists**: [`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>

Defined in: [entities/channel.ts:126](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L126)

The channel's playlists. Only defined when [Channel.fetchPlaylists](./Channel#fetchplaylists) is called.

***

### profilePictures

> **profilePictures**: `object`

Defined in: [entities/channel.ts:80](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L80)

This channel's profile pictures.

#### default?

> `optional` **default?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### high?

> `optional` **high?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### maxres?

> `optional` **maxres?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### medium?

> `optional` **medium?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### standard?

> `optional` **standard?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

***

### sections

> **sections**: [`ChannelSection`](ChannelSection.md)[]

Defined in: [entities/channel.ts:136](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L136)

The channel's sections. Only defined when [Channel.fetchSections](./Channel#fetchsections) is called.

***

### subCount

> **subCount**: `number`

Defined in: [entities/channel.ts:116](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L116)

The number of subscribers this channel has. `-1` if the subcount is hidden.

***

### subscriptions

> **subscriptions**: [`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>

Defined in: [entities/channel.ts:131](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L131)

The channel's subscriptions. Only defined when [Channel.fetchSubscriptions](./Channel#fetchsubscriptions) is called.

***

### url

> **url**: `string`

Defined in: [entities/channel.ts:70](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L70)

The url of the channel.

***

### videos

> **videos**: [`Playlist`](Playlist.md)

Defined in: [entities/channel.ts:111](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L111)

The channel's uploads. Only available after calling [Channel.fetchVideos](./Channel#fetchvideos)

***

### views

> **views**: `number`

Defined in: [entities/channel.ts:101](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L101)

This channel's view count.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/channel.ts:35](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L35)

The YouTube object that created this channel object.

***

### endpoint

> `static` **endpoint**: `string` = `'channels'`

Defined in: [entities/channel.ts:13](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L13)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string`

Defined in: [entities/channel.ts:24](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L24)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'brandingSettings,contentDetails,localizations,snippet,statistics,status'`

Defined in: [entities/channel.ts:18](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L18)

The parts to request for this entity.

## Methods

### fetch()

> **fetch**(`parts?`): `Promise`\<`Channel`\>

Defined in: [entities/channel.ts:264](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L264)

Fetches this channel from the API and reassigns this object to the new channel object.
Only useful if `this.full` is false, or if you want updated channel info.

#### Parameters

##### parts?

[`ChannelParts`](../type-aliases/ChannelParts.md)

#### Returns

`Promise`\<`Channel`\>

***

### fetchPlaylists()

> **fetchPlaylists**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>\>

Defined in: [entities/channel.ts:290](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L290)

Fetches the channel's playlists from the API and assigns them to [Channel.playlists](./Channel#playlists).

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`PlaylistParts`](../type-aliases/PlaylistParts.md)

The parts of the object to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Playlist`](Playlist.md)\>\>

***

### fetchSections()

> **fetchSections**(`parts?`): `Promise`\<[`ChannelSection`](ChannelSection.md)[]\>

Defined in: [entities/channel.ts:310](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L310)

Fetches the channel's sections from the API and assigns them to [Channel.sections](./Channel#sections).

#### Parameters

##### parts?

[`ChannelSectionParts`](../type-aliases/ChannelSectionParts.md)

#### Returns

`Promise`\<[`ChannelSection`](ChannelSection.md)[]\>

***

### fetchSubscriptions()

> **fetchSubscriptions**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>\>

Defined in: [entities/channel.ts:302](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L302)

Fetches the channel's subscriptions from the API and assigns them to [Channel.subscriptions](./Channel#subscriptions).

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`SubscriptionParts`](../type-aliases/SubscriptionParts.md)

The parts of the object to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>\>

***

### fetchVideos()

> **fetchVideos**(`parts?`): `Promise`\<[`Playlist`](Playlist.md)\>

Defined in: [entities/channel.ts:272](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L272)

Fetches the channel's playlist of uploads from the API and assigns it to the [Channel.videos](./Channel#videos) property.

#### Parameters

##### parts?

[`PlaylistParts`](../type-aliases/PlaylistParts.md)

#### Returns

`Promise`\<[`Playlist`](Playlist.md)\>

***

### setBanner()

> **setBanner**(`image`): `Promise`\<`Channel`\>

Defined in: [entities/channel.ts:401](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L401)

Uploads and sets the channel's banner.
Must be using an access token with correct scopes.

#### Parameters

##### image

###### data

`Buffer`

###### type

`"jpeg"` \| `"png"`

#### Returns

`Promise`\<`Channel`\>

***

### setMadeForKids()

> **setMadeForKids**(`madeForKids`): `Promise`\<`Channel`\>

Defined in: [entities/channel.ts:375](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L375)

Sets whether or not the channel is made for kids.
Must be using an access token with correct scopes.

#### Parameters

##### madeForKids

`boolean`

#### Returns

`Promise`\<`Channel`\>

***

### setWatermark()

> **setWatermark**(`type`, `offset`, `duration`, `image`): `Promise`\<`void`\>

Defined in: [entities/channel.ts:384](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L384)

Sets the channel's watermark.
Must be using an access token with correct scopes.

#### Parameters

##### type

`"fromStart"` \| `"fromEnd"`

##### offset

`number`

##### duration

`number`

##### image

[`Image`](../type-aliases/Image.md)

#### Returns

`Promise`\<`void`\>

***

### subscribe()

> **subscribe**(): `Promise`\<[`Subscription`](Subscription.md)\>

Defined in: [entities/channel.ts:319](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L319)

Subscribes to the channel.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<[`Subscription`](Subscription.md)\>

***

### unsetWatermark()

> **unsetWatermark**(): `Promise`\<`void`\>

Defined in: [entities/channel.ts:393](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L393)

Unsets the channel's watermark.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### unsubscribe()

> **unsubscribe**(`subscriptionResolvable?`, `myId?`): `Promise`\<`void`\>

Defined in: [entities/channel.ts:329](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L329)

Unsubscribes from the channel.
Must be using an access token with correct scopes.

#### Parameters

##### subscriptionResolvable?

[`SubscriptionResolvable`](../type-aliases/SubscriptionResolvable.md)

The ID or object of the subscription to remove, if you have it.

##### myId?

`string`

The ID of the authorized channel, if you have it.

#### Returns

`Promise`\<`void`\>

***

### updateBranding()

> **updateBranding**(`branding`): `Promise`\<`Channel`\>

Defined in: [entities/channel.ts:345](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L345)

Updates the channel's branding settings.
Must be using an access token with correct scopes.

#### Parameters

##### branding

[`ChannelBrandingSettings`](../type-aliases/ChannelBrandingSettings.md)

#### Returns

`Promise`\<`Channel`\>

***

### updateLocalizations()

> **updateLocalizations**(`localizations`): `Promise`\<`Channel`\>

Defined in: [entities/channel.ts:360](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/channel.ts#L360)

Updates the channel's localizations.
Must be using an access token with correct scopes.

#### Parameters

##### localizations

#### Returns

`Promise`\<`Channel`\>
