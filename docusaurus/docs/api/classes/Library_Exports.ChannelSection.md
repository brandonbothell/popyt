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

[entities/channel-section.ts:83](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L83)

## Properties

### channelId

• **channelId**: `string`

The ID of the channel that created this channel section.

#### Defined in

[entities/channel-section.ts:51](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L51)

___

### channelIds

• `Optional` **channelIds**: `string`[]

The IDs of the channels in this channel section. Undefined if there aren't any.

#### Defined in

[entities/channel-section.ts:66](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L66)

___

### channels

• `Optional` **channels**: [`Channel`](Library_Exports.Channel)[]

The channels in the channel section. Only available after calling [ChannelSection.fetchChannels](./Library_Exports.ChannelSection#fetchChannels).

#### Defined in

[entities/channel-section.ts:76](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L76)

___

### data

• **data**: `any`

The raw data of this channel section.

#### Defined in

[entities/channel-section.ts:36](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L36)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full channel section object.

#### Defined in

[entities/channel-section.ts:31](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L31)

___

### id

• **id**: `string`

The ID of this channel section.

#### Defined in

[entities/channel-section.ts:81](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L81)

___

### name

• **name**: `string`

The name of this channel section.

#### Defined in

[entities/channel-section.ts:41](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L41)

___

### playlistIds

• `Optional` **playlistIds**: `string`[]

The IDs of the playlists in this channel section. Undefined if there aren't any.

#### Defined in

[entities/channel-section.ts:61](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L61)

___

### playlists

• `Optional` **playlists**: [`Playlist`](Library_Exports.Playlist)[]

The playlists in the channel section. Only available after calling [ChannelSection.fetchPlaylists](./Library_Exports.ChannelSection#fetchPlaylists).

#### Defined in

[entities/channel-section.ts:71](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L71)

___

### position

• **position**: `number`

The zero-based position of this channel section on the channel page.

#### Defined in

[entities/channel-section.ts:56](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L56)

___

### type

• **type**: [`ChannelSectionType`](../modules/Library_Exports#channelsectiontype)

The type of this channel section.

#### Defined in

[entities/channel-section.ts:46](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L46)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this channel section object.

#### Defined in

[entities/channel-section.ts:26](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'channelSections'`

The name of the endpoint used for this entity.

#### Defined in

[entities/channel-section.ts:11](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,contentDetails,localizations,snippet,targeting)'`

The fields to request for this entity.

#### Defined in

[entities/channel-section.ts:21](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,localizations,targeting'`

The parts to request for this entity.

#### Defined in

[entities/channel-section.ts:16](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L16)

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

[entities/channel-section.ts:121](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L121)

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

[entities/channel-section.ts:147](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L147)

___

### fetchPlaylists

▸ **fetchPlaylists**(`parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Fetches the channel section's playlists from the API and assigns them to the [ChannelSection.playlists](./Library_Exports.ChannelSection#playlists) property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

#### Defined in

[entities/channel-section.ts:129](https://github.com/brandonbothell/popyt/blob/da3305c/src/entities/channel-section.ts#L129)
