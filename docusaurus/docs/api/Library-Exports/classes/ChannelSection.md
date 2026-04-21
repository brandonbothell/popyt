[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / ChannelSection

# Class: ChannelSection

Defined in: [entities/channel-section.ts:8](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L8)

A YouTube [Channel](./Channel#) section.

## Constructors

### Constructor

> **new ChannelSection**(`youtube`, `data`, `full?`): `ChannelSection`

Defined in: [entities/channel-section.ts:91](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L91)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$ChannelSection`

##### full?

`boolean` = `true`

#### Returns

`ChannelSection`

## Properties

### channelId

> **channelId**: `string`

Defined in: [entities/channel-section.ts:52](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L52)

The ID of the channel that created this channel section.

***

### channelIds?

> `optional` **channelIds?**: `string`[]

Defined in: [entities/channel-section.ts:67](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L67)

The IDs of the channels in this channel section. Undefined if there aren't any.

***

### channels?

> `optional` **channels?**: [`Channel`](Channel.md)[]

Defined in: [entities/channel-section.ts:77](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L77)

The channels in the channel section. Only available after calling [ChannelSection.fetchChannels](./ChannelSection#fetchchannels).

***

### data

> **data**: `any`

Defined in: [entities/channel-section.ts:37](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L37)

The raw data of this channel section.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/channel-section.ts:32](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L32)

Whether or not this a full channel section object.

***

### id

> **id**: `string`

Defined in: [entities/channel-section.ts:89](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L89)

The ID of this channel section.

***

### name

> **name**: `string`

Defined in: [entities/channel-section.ts:42](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L42)

The name of this channel section.

***

### playlistIds?

> `optional` **playlistIds?**: `string`[]

Defined in: [entities/channel-section.ts:62](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L62)

The IDs of the playlists in this channel section. Undefined if there aren't any.

***

### playlists?

> `optional` **playlists?**: [`Playlist`](Playlist.md)[]

Defined in: [entities/channel-section.ts:72](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L72)

The playlists in the channel section. Only available after calling [ChannelSection.fetchPlaylists](./ChannelSection#fetchplaylists).

***

### position

> **position**: `number`

Defined in: [entities/channel-section.ts:57](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L57)

The zero-based position of this channel section on the channel page.

***

### subscriptions?

> `optional` **subscriptions?**: [`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>

Defined in: [entities/channel-section.ts:84](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L84)

The subscriptions in the channel section.  
Only valid if `ChannelSection.type` is `subscriptions`.
Only available after calling [ChannelSection.fetchChannels()](./ChannelSection#fetchchannels).

***

### type

> **type**: `"subscriptions"` \| `"likes"` \| `"allplaylists"` \| `"completedevents"` \| `"likedplaylists"` \| `"liveevents"` \| `"multiplechannels"` \| `"multipleplaylists"` \| `"popularuploads"` \| `"postedplaylists"` \| `"postedvideos"` \| `"recentactivity"` \| `"recentposts"` \| `"recentuploads"` \| `"singleplaylist"` \| `"upcomingevents"`

Defined in: [entities/channel-section.ts:47](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L47)

The type of this channel section.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/channel-section.ts:27](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L27)

The YouTube object that created this channel section object.

***

### endpoint

> `static` **endpoint**: `string` = `'channelSections'`

Defined in: [entities/channel-section.ts:12](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L12)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(kind,id,contentDetails,snippet)'`

Defined in: [entities/channel-section.ts:22](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L22)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'contentDetails,snippet'`

Defined in: [entities/channel-section.ts:17](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L17)

The parts to request for this entity.

## Methods

### fetch()

> **fetch**(`parts?`): `Promise`\<`ChannelSection`\>

Defined in: [entities/channel-section.ts:125](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L125)

Fetches this channel section from the API and reassigns this object to the new channel section object.
Only useful if `this.full` is false, or if you want updated channel section info.

#### Parameters

##### parts?

[`ChannelSectionParts`](../type-aliases/ChannelSectionParts.md)

#### Returns

`Promise`\<`ChannelSection`\>

***

### fetchChannels()

> **fetchChannels**(`parts?`): `Promise`\<[`Channel`](Channel.md)[]\>

Defined in: [entities/channel-section.ts:150](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L150)

Fetches the channel section's channels from the API and assigns them to the [ChannelSection.channels](./ChannelSection#channels) property.

#### Parameters

##### parts?

[`ChannelParts`](../type-aliases/ChannelParts.md)

#### Returns

`Promise`\<[`Channel`](Channel.md)[]\>

***

### fetchPlaylists()

> **fetchPlaylists**(`pageOptions?`, `parts?`): `Promise`\<[`Playlist`](Playlist.md)[]\>

Defined in: [entities/channel-section.ts:133](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L133)

Fetches the channel section's playlists from the API and assigns them to the [ChannelSection.playlists](./ChannelSection#playlists) property.

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

##### parts?

[`PlaylistParts`](../type-aliases/PlaylistParts.md)

#### Returns

`Promise`\<[`Playlist`](Playlist.md)[]\>

***

### fetchSubscriptions()

> **fetchSubscriptions**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>\>

Defined in: [entities/channel-section.ts:165](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/entities/channel-section.ts#L165)

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

##### parts?

[`SubscriptionParts`](../type-aliases/SubscriptionParts.md)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Subscription`](Subscription.md)\>\>
