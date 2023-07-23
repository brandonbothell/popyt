---
id: "Library_Exports.Channel"
title: "Documentation"
sidebar_label: "Channel"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Channel

A YouTube channel.

## Constructors

### constructor

• **new Channel**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `false` |

#### Defined in

[entities/channel.ts:170](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L170)

## Properties

### about

• **about**: `string`

The description of this channel.

#### Defined in

[entities/channel.ts:52](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L52)

___

### banner

• **banner**: `string`

The URL to the image used to generate YouTube banner images for
this channel across all platforms.

#### Defined in

[entities/channel.ts:139](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L139)

___

### country

• **country**: `string`

The country this channel is based in.

#### Defined in

[entities/channel.ts:62](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L62)

___

### customUrl

• **customUrl**: `string`

This channel's custom URL, if they have one.

#### Defined in

[entities/channel.ts:72](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L72)

___

### data

• **data**: `any`

The raw data of this channel.

#### Defined in

[entities/channel.ts:42](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L42)

___

### dateCreated

• **dateCreated**: `Date`

The date this channel was created.

#### Defined in

[entities/channel.ts:88](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L88)

___

### featuredChannels

• **featuredChannels**: `string`[]

The URLs of all of this channel's featured channels. This property is broken for some channels.

#### Defined in

[entities/channel.ts:118](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L118)

___

### full

• **full**: `boolean`

Whether or not this a full channel object.

#### Defined in

[entities/channel.ts:37](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L37)

___

### id

• **id**: `string`

The ID of this channel.

#### Defined in

[entities/channel.ts:57](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L57)

___

### keywords

• **keywords**: `string`[]

This channel's keywords.

#### Defined in

[entities/channel.ts:103](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L103)

___

### kids

• **kids**: `Object`

Properties to do with videos made for children.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `madeForKids` | `boolean` | Whether or not the channel is made for children. |
| `selfDeclaredMadeForKids` | `boolean` | Whether or not the owner of the channel marked it as made for kids. |

#### Defined in

[entities/channel.ts:158](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L158)

___

### language

• **language**: `string`

The default language for this channel's uploads.

#### Defined in

[entities/channel.ts:93](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L93)

___

### liveStatus

• **liveStatus**: ``false`` \| ``"live"`` \| ``"upcoming"``

Only set if the channel is a search result.

If the channel has an ongoing livestream, this is `live`.
If the channel has an upcoming livestream, this is `upcoming`.
If the channel has neither an ongoing nor upcoming livestream, this is `false`.

#### Defined in

[entities/channel.ts:153](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L153)

___

### localizations

• **localizations**: `Object`

The localized titles and descriptions of this channel, if any.

#### Index signature

▪ [language: `string`]: { `description`: `string` ; `title`: `string`  }

#### Defined in

[entities/channel.ts:144](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L144)

___

### name

• **name**: `string`

The name of this channel.

#### Defined in

[entities/channel.ts:47](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L47)

___

### playlists

• **playlists**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>

The channel's playlists. Only defined when [Channel.fetchPlaylists](./Library_Exports.Channel#fetchPlaylists) is called.

#### Defined in

[entities/channel.ts:123](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L123)

___

### profilePictures

• **profilePictures**: `Object`

This channel's profile pictures.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `high?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `maxres?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `medium?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `standard?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |

#### Defined in

[entities/channel.ts:77](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L77)

___

### sections

• **sections**: [`ChannelSection`](Library_Exports.ChannelSection)[]

The channel's sections. Only defined when [Channel.fetchSections](./Library_Exports.Channel#fetchSections) is called.

#### Defined in

[entities/channel.ts:133](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L133)

___

### subCount

• **subCount**: `number`

The number of subscribers this channel has. `-1` if the subcount is hidden.

#### Defined in

[entities/channel.ts:113](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L113)

___

### subscriptions

• **subscriptions**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>

The channel's subscriptions. Only defined when [Channel.fetchSubscriptions](./Library_Exports.Channel#fetchSubscriptions) is called.

#### Defined in

[entities/channel.ts:128](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L128)

___

### url

• **url**: `string`

The url of the channel.

#### Defined in

[entities/channel.ts:67](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L67)

___

### videos

• **videos**: [`Playlist`](Library_Exports.Playlist)

The channel's uploads. Only available after calling [Channel.fetchVideos](./Library_Exports.Channel#fetchVideos)

#### Defined in

[entities/channel.ts:108](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L108)

___

### views

• **views**: `number`

This channel's view count.

#### Defined in

[entities/channel.ts:98](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L98)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this channel object.

#### Defined in

[entities/channel.ts:32](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L32)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'channels'`

The name of the endpoint used for this entity.

#### Defined in

[entities/channel.ts:11](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L11)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/channel.ts:21](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,statistics,status,brandingSettings,localizations'`

The parts to request for this entity.

#### Defined in

[entities/channel.ts:16](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L16)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Fetches this channel from the API and reassigns this object to the new channel object.
Only useful if `this.full` is false, or if you want updated channel info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/channel.ts:258](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L258)

___

### fetchPlaylists

▸ **fetchPlaylists**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

Fetches the channel's playlists from the API and assigns them to [Channel.playlists](./Library_Exports.Channel#playlists).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Playlist`](Library_Exports.Playlist)\>\>

#### Defined in

[entities/channel.ts:284](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L284)

___

### fetchSections

▸ **fetchSections**(`parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Fetches the channel's sections from the API and assigns them to [Channel.sections](./Library_Exports.Channel#sections).

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

#### Defined in

[entities/channel.ts:304](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L304)

___

### fetchSubscriptions

▸ **fetchSubscriptions**(`pageOptions?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

Fetches the channel's subscriptions from the API and assigns them to [Channel.subscriptions](./Library_Exports.Channel#subscriptions).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Subscription`](Library_Exports.Subscription)\>\>

#### Defined in

[entities/channel.ts:296](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L296)

___

### fetchVideos

▸ **fetchVideos**(`parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Fetches the channel's playlist of uploads from the API and assigns it to the [Channel.videos](./Library_Exports.Channel#videos) property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[entities/channel.ts:266](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L266)

___

### setBanner

▸ **setBanner**(`image`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Uploads and sets the channel's banner.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `image` | `Object` |
| `image.data` | `Buffer` |
| `image.type` | ``"jpeg"`` \| ``"png"`` |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/channel.ts:395](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L395)

___

### setMadeForKids

▸ **setMadeForKids**(`madeForKids`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Sets whether or not the channel is made for kids.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `madeForKids` | `boolean` |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/channel.ts:369](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L369)

___

### setWatermark

▸ **setWatermark**(`type`, `offset`, `duration`, `image`): `Promise`<`void`\>

Sets the channel's watermark.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"fromStart"`` \| ``"fromEnd"`` |
| `offset` | `number` |
| `duration` | `number` |
| `image` | [`Image`](../modules/Library_Exports#image) |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/channel.ts:378](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L378)

___

### subscribe

▸ **subscribe**(): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Subscribes to the channel.
Must be using an access token with correct scopes.

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[entities/channel.ts:313](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L313)

___

### unsetWatermark

▸ **unsetWatermark**(): `Promise`<`void`\>

Unsets the channel's watermark.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/channel.ts:387](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L387)

___

### unsubscribe

▸ **unsubscribe**(`subscriptionResolvable?`, `myId?`): `Promise`<`void`\>

Unsubscribes from the channel.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `subscriptionResolvable?` | [`SubscriptionResolvable`](../modules/Library_Exports#subscriptionresolvable) | The ID or object of the subscription to remove, if you have it. |
| `myId?` | `string` | The ID of the authorized channel, if you have it. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/channel.ts:323](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L323)

___

### updateBranding

▸ **updateBranding**(`branding`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Updates the channel's branding settings.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `branding` | [`ChannelBrandingSettings`](../modules/Library_Exports#channelbrandingsettings) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/channel.ts:339](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L339)

___

### updateLocalizations

▸ **updateLocalizations**(`localizations`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Updates the channel's localizations.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `localizations` | `Object` |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/channel.ts:354](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/channel.ts#L354)
