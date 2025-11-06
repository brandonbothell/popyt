---
id: "Library_Exports.ChannelSection"
title: "Documentation"
sidebar_label: "ChannelSection"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).ChannelSection

A YouTube [Channel](./Library_Exports.Channel#) section.

## Constructors

### constructor

• **new ChannelSection**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `Schema$ChannelSection` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/channel-section.ts:91](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L91)

## Properties

### channelId

• **channelId**: `string`

The ID of the channel that created this channel section.

#### Defined in

[entities/channel-section.ts:52](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L52)

___

### channelIds

• `Optional` **channelIds**: `string`[]

The IDs of the channels in this channel section. Undefined if there aren't any.

#### Defined in

[entities/channel-section.ts:67](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L67)

___

### channels

• `Optional` **channels**: [`Channel`](Library_Exports.Channel)[]

The channels in the channel section. Only available after calling [ChannelSection.fetchChannels](./Library_Exports.ChannelSection#fetchChannels).

#### Defined in

[entities/channel-section.ts:77](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L77)

___

### data

• **data**: `any`

The raw data of this channel section.

#### Defined in

[entities/channel-section.ts:37](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L37)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full channel section object.

#### Defined in

[entities/channel-section.ts:32](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L32)

___

### id

• **id**: `string`

The ID of this channel section.

#### Defined in

[entities/channel-section.ts:89](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L89)

___

### name

• **name**: `string`

The name of this channel section.

#### Defined in

[entities/channel-section.ts:42](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L42)

___

### playlistIds

• `Optional` **playlistIds**: `string`[]

The IDs of the playlists in this channel section. Undefined if there aren't any.

#### Defined in

[entities/channel-section.ts:62](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L62)

___

### playlists

• `Optional` **playlists**: [`Playlist`](Library_Exports.Playlist)[]

The playlists in the channel section. Only available after calling [ChannelSection.fetchPlaylists](./Library_Exports.ChannelSection#fetchPlaylists).

#### Defined in

[entities/channel-section.ts:72](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L72)

___

### position

• **position**: `number`

The zero-based position of this channel section on the channel page.

#### Defined in

[entities/channel-section.ts:57](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L57)

___

### subscriptions

• `Optional` **subscriptions**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)\<[`Subscription`](Library_Exports.Subscription)\>

The subscriptions in the channel section.  
Only valid if `ChannelSection.type` is `subscriptions`.
Only available after calling [ChannelSection.fetchChannels()](./Library_Exports.ChannelSection#fetchChannels).

#### Defined in

[entities/channel-section.ts:84](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L84)

___

### type

• **type**: ``"subscriptions"`` \| ``"likes"`` \| ``"allplaylists"`` \| ``"completedevents"`` \| ``"likedplaylists"`` \| ``"liveevents"`` \| ``"multiplechannels"`` \| ``"multipleplaylists"`` \| ``"popularuploads"`` \| ``"postedplaylists"`` \| ``"postedvideos"`` \| ``"recentactivity"`` \| ``"recentposts"`` \| ``"recentuploads"`` \| ``"singleplaylist"`` \| ``"upcomingevents"``

The type of this channel section.

#### Defined in

[entities/channel-section.ts:47](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L47)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this channel section object.

#### Defined in

[entities/channel-section.ts:27](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L27)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'channelSections'`

The name of the endpoint used for this entity.

#### Defined in

[entities/channel-section.ts:12](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L12)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,contentDetails,snippet)'`

The fields to request for this entity.

#### Defined in

[entities/channel-section.ts:22](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L22)

___

### part

▪ `Static` **part**: `string` = `'contentDetails,snippet'`

The parts to request for this entity.

#### Defined in

[entities/channel-section.ts:17](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L17)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

Fetches this channel section from the API and reassigns this object to the new channel section object.
Only useful if `this.full` is false, or if you want updated channel section info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) |

#### Returns

`Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[entities/channel-section.ts:125](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L125)

___

### fetchChannels

▸ **fetchChannels**(`parts?`): `Promise`\<[`Channel`](Library_Exports.Channel)[]\>

Fetches the channel section's channels from the API and assigns them to the [ChannelSection.channels](./Library_Exports.ChannelSection#channels) property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`\<[`Channel`](Library_Exports.Channel)[]\>

#### Defined in

[entities/channel-section.ts:150](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L150)

___

### fetchPlaylists

▸ **fetchPlaylists**(`pageOptions?`, `parts?`): `Promise`\<[`Playlist`](Library_Exports.Playlist)[]\>

Fetches the channel section's playlists from the API and assigns them to the [ChannelSection.playlists](./Library_Exports.ChannelSection#playlists) property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`\<[`Playlist`](Library_Exports.Playlist)[]\>

#### Defined in

[entities/channel-section.ts:133](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L133)

___

### fetchSubscriptions

▸ **fetchSubscriptions**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)\<[`Subscription`](Library_Exports.Subscription)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) |

#### Returns

`Promise`\<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)\<[`Subscription`](Library_Exports.Subscription)\>\>

#### Defined in

[entities/channel-section.ts:165](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/channel-section.ts#L165)
