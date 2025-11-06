---
id: "OAuth.OAuthChannels"
title: "Documentation"
sidebar_label: "OAuthChannels"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuthChannels

## Constructors

### constructor

• **new OAuthChannels**(`oauth`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oauth` | [`OAuth`](OAuth.OAuth) |

#### Defined in

[oauth/channels.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L11)

## Properties

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

#### Defined in

[oauth/channels.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L11)

## Methods

### addChannelSection

▸ **addChannelSection**(`type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

Adds a [ChannelSection](./Library_Exports.ChannelSection#) to the authorized user's [Channel](./Library_Exports.Channel#).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ChannelSectionType`](../modules/Library_Exports#channelsectiontype) | The type of channel section. |
| `name?` | `string` | The name of the channel section. |
| `position?` | `number` | The position of the channel section on the channel homepage. |
| `playlistsResolvable?` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable)[] | Any playlists in the channel section. |
| `channelsResolvable?` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable)[] | Any channels in the channel section. |

#### Returns

`Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth/channels.ts:159](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L159)

___

### deleteChannelSection

▸ **deleteChannelSection**(`id`): `Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

Deletes a [ChannelSection](./Library_Exports.ChannelSection#).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the channel section. |

#### Returns

`Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth/channels.ts:249](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L249)

___

### setChannelMadeForKids

▸ **setChannelMadeForKids**(`channelResolvable`, `madeForKids`): `Promise`\<[`Channel`](Library_Exports.Channel)\>

Sets a channel as made for kids or not made for kids.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to update. |
| `madeForKids` | `boolean` | Whether or not the channel is made for kids. |

#### Returns

`Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth/channels.ts:69](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L69)

___

### setChannelWatermark

▸ **setChannelWatermark**(`channelResolvable`, `type`, `offset`, `duration`, `image`): `Promise`\<`void`\>

Sets a channel's watermark.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to set the watermark for. |
| `type` | ``"fromStart"`` \| ``"fromEnd"`` | The timing type of the watermark. |
| `offset` | `number` | The offset, in milliseconds, from the start/end of the video to display the watermark from. |
| `duration` | `number` | The duration, in millseconds, to display the watermark for. |
| `image` | [`Image`](../modules/Library_Exports#image) | The watermark image. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[oauth/channels.ts:96](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L96)

___

### subscribeToChannel

▸ **subscribeToChannel**(`channelResolvable`): `Promise`\<[`Subscription`](Library_Exports.Subscription)\>

Subscribe to a [Channel](./Library_Exports.Channel#).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to subscribe to. |

#### Returns

`Promise`\<[`Subscription`](Library_Exports.Subscription)\>

A partial subscription object.

#### Defined in

[oauth/channels.ts:262](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L262)

___

### unsetChannelWatermark

▸ **unsetChannelWatermark**(`channelResolvable`): `Promise`\<`void`\>

Unsets a channel's watermark.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to unset the watermark from. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[oauth/channels.ts:124](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L124)

___

### unsubscribeFromChannel

▸ **unsubscribeFromChannel**(`subscriptionId`): `Promise`\<`void`\>

Unsubscribe from a [Channel](./Library_Exports.Channel#).

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `string` |

#### Returns

`Promise`\<`void`\>

#### Defined in

[oauth/channels.ts:282](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L282)

___

### updateChannelBranding

▸ **updateChannelBranding**(`channelResolvable`, `brandingSettings`): `Promise`\<[`Channel`](Library_Exports.Channel)\>

Updates a channel's branding settings.
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to update the branding settings of. |
| `brandingSettings` | [`ChannelBrandingSettings`](../modules/Library_Exports#channelbrandingsettings) | The new branding settings. |

#### Returns

`Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth/channels.ts:20](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L20)

___

### updateChannelLocalizations

▸ **updateChannelLocalizations**(`channelResolvable`, `localizations`): `Promise`\<[`Channel`](Library_Exports.Channel)\>

Updates a channel's localizations.
**CURRENTLY BROKEN in the API**
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to update the localizations of. |
| `localizations` | `Object` | The new localizations. |

#### Returns

`Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth/channels.ts:45](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L45)

___

### updateChannelSection

▸ **updateChannelSection**(`id`, `type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

Updates a [ChannelSection](./Library_Exports.ChannelSection#).
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the channel section. |
| `type` | [`ChannelSectionType`](../modules/Library_Exports#channelsectiontype) | The type of channel section. |
| `name?` | `string` | The name of the channel section. |
| `position?` | `number` | The position of the channel section on the channel homepage. |
| `playlistsResolvable?` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable)[] | Any playlists in the channel section. |
| `channelsResolvable?` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable)[] | Any channels in the channel section. |

#### Returns

`Promise`\<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth/channels.ts:214](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L214)

___

### uploadChannelBanner

▸ **uploadChannelBanner**(`image`): `Promise`\<`string`\>

Uploads a channel banner.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | [`Image`](../modules/Library_Exports#image) | The channel banner to upload. |

#### Returns

`Promise`\<`string`\>

The URL of the uploaded banner, used as
[`BrandingSettings.image.bannerExternalUrl`](../modules/Library_Exports#channelbrandingsettings)
in [`OAuth.updateChannelBranding()`](#updatechannelbranding)

#### Defined in

[oauth/channels.ts:141](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/channels.ts#L141)
