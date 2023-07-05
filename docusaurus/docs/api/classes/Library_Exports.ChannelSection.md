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
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/channel-section.ts:90](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L90)

## Properties

### channelId

• **channelId**: `string`

The ID of the channel that created this channel section.

#### Defined in

[entities/channel-section.ts:51](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L51)

___

### channelIds

• `Optional` **channelIds**: `string`[]

The IDs of the channels in this channel section. Undefined if there aren't any.

#### Defined in

[entities/channel-section.ts:66](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L66)

___

### channels

• `Optional` **channels**: [`Channel`](Library_Exports.Channel)[]

The channels in the channel section. Only available after calling [ChannelSection.fetchChannels](./Library_Exports.ChannelSection#fetchChannels).

#### Defined in

[entities/channel-section.ts:76](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L76)

___

### data

• **data**: `any`

The raw data of this channel section.

#### Defined in

[entities/channel-section.ts:36](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L36)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full channel section object.

#### Defined in

[entities/channel-section.ts:31](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L31)

___

### id

• **id**: `string`

The ID of this channel section.

#### Defined in

[entities/channel-section.ts:88](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L88)

___

### name

• **name**: `string`

The name of this channel section.

#### Defined in

[entities/channel-section.ts:41](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L41)

___

### playlistIds

• `Optional` **playlistIds**: `string`[]

The IDs of the playlists in this channel section. Undefined if there aren't any.

#### Defined in

[entities/channel-section.ts:61](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L61)

___

### playlists

• `Optional` **playlists**: [`Playlist`](Library_Exports.Playlist)[]

The playlists in the channel section. Only available after calling [ChannelSection.fetchPlaylists](./Library_Exports.ChannelSection#fetchPlaylists).

#### Defined in

[entities/channel-section.ts:71](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L71)

___

### position

• **position**: `number`

The zero-based position of this channel section on the channel page.

#### Defined in

[entities/channel-section.ts:56](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L56)

___

### subscriptions

• `Optional` **subscriptions**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>

The subscriptions in the channel section.  
Only valid if `ChannelSection.type` is `subscriptions`.
Only available after calling [ChannelSection.fetchChannels()](./Library_Exports.ChannelSection#fetchChannels).

#### Defined in

[entities/channel-section.ts:83](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L83)

___

### type

• **type**: ``"subscriptions"`` \| ``"likes"`` \| ``"allplaylists"`` \| ``"completedevents"`` \| ``"likedplaylists"`` \| ``"liveevents"`` \| ``"multiplechannels"`` \| ``"multipleplaylists"`` \| ``"popularuploads"`` \| ``"postedplaylists"`` \| ``"postedvideos"`` \| ``"recentactivity"`` \| ``"recentposts"`` \| ``"recentuploads"`` \| ``"singleplaylist"`` \| ``"upcomingevents"``

The type of this channel section.

#### Defined in

[entities/channel-section.ts:46](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L46)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this channel section object.

#### Defined in

[entities/channel-section.ts:26](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'channelSections'`

The name of the endpoint used for this entity.

#### Defined in

[entities/channel-section.ts:11](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,contentDetails,snippet)'`

The fields to request for this entity.

#### Defined in

[entities/channel-section.ts:21](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails'`

The parts to request for this entity.

#### Defined in

[entities/channel-section.ts:16](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L16)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Fetches this channel section from the API and reassigns this object to the new channel section object.
Only useful if `this.full` is false, or if you want updated channel section info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[entities/channel-section.ts:124](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L124)

___

### fetchChannels

▸ **fetchChannels**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)[]\>

Fetches the channel section's channels from the API and assigns them to the [ChannelSection.channels](./Library_Exports.ChannelSection#channels) property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)[]\>

#### Defined in

[entities/channel-section.ts:149](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L149)

___

### fetchPlaylists

▸ **fetchPlaylists**(`pageOptions?`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Fetches the channel section's playlists from the API and assigns them to the [ChannelSection.playlists](./Library_Exports.ChannelSection#playlists) property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

#### Defined in

[entities/channel-section.ts:132](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L132)

___

### fetchSubscriptions

▸ **fetchSubscriptions**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

#### Defined in

[entities/channel-section.ts:164](https://github.com/brandonbothell/popyt/blob/57ea7b2/src/entities/channel-section.ts#L164)
