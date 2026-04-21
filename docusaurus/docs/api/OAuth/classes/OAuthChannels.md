[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [OAuth](../README.md) / OAuthChannels

# Class: OAuthChannels

Defined in: [oauth/channels.ts:10](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L10)

## Constructors

### Constructor

> **new OAuthChannels**(`oauth`): `OAuthChannels`

Defined in: [oauth/channels.ts:11](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L11)

#### Parameters

##### oauth

[`OAuth`](OAuth.md)

#### Returns

`OAuthChannels`

## Properties

### oauth

> **oauth**: [`OAuth`](OAuth.md)

Defined in: [oauth/channels.ts:11](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L11)

## Methods

### addChannelSection()

> **addChannelSection**(`type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)\>

Defined in: [oauth/channels.ts:159](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L159)

Adds a [ChannelSection](../../Library-Exports/classes/ChannelSection#) to the authorized user's [Channel](../../Library-Exports/classes/Channel#).

#### Parameters

##### type

[`ChannelSectionType`](../../Library-Exports/type-aliases/ChannelSectionType.md)

The type of channel section.

##### name?

`string`

The name of the channel section.

##### position?

`number`

The position of the channel section on the channel homepage.

##### playlistsResolvable?

[`PlaylistResolvable`](../../Library-Exports/type-aliases/PlaylistResolvable.md)[]

Any playlists in the channel section.

##### channelsResolvable?

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)[]

Any channels in the channel section.

#### Returns

`Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)\>

***

### deleteChannelSection()

> **deleteChannelSection**(`id`): `Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)\>

Defined in: [oauth/channels.ts:245](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L245)

Deletes a [ChannelSection](../../Library-Exports/classes/ChannelSection#).

#### Parameters

##### id

`string`

The ID of the channel section.

#### Returns

`Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)\>

***

### setChannelMadeForKids()

> **setChannelMadeForKids**(`channelResolvable`, `madeForKids`): `Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

Defined in: [oauth/channels.ts:69](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L69)

Sets a channel as made for kids or not made for kids.

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to update.

##### madeForKids

`boolean`

Whether or not the channel is made for kids.

#### Returns

`Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

***

### setChannelWatermark()

> **setChannelWatermark**(`channelResolvable`, `type`, `offset`, `duration`, `image`): `Promise`\<`void`\>

Defined in: [oauth/channels.ts:96](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L96)

Sets a channel's watermark.

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to set the watermark for.

##### type

`"fromStart"` \| `"fromEnd"`

The timing type of the watermark.

##### offset

`number`

The offset, in milliseconds, from the start/end of the video to display the watermark from.

##### duration

`number`

The duration, in millseconds, to display the watermark for.

##### image

[`Image`](../../Library-Exports/type-aliases/Image.md)

The watermark image.

#### Returns

`Promise`\<`void`\>

***

### subscribeToChannel()

> **subscribeToChannel**(`channelResolvable`): `Promise`\<[`Subscription`](../../Library-Exports/classes/Subscription.md)\>

Defined in: [oauth/channels.ts:258](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L258)

Subscribe to a [Channel](../../Library-Exports/classes/Channel#).

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to subscribe to.

#### Returns

`Promise`\<[`Subscription`](../../Library-Exports/classes/Subscription.md)\>

A partial subscription object.

***

### unsetChannelWatermark()

> **unsetChannelWatermark**(`channelResolvable`): `Promise`\<`void`\>

Defined in: [oauth/channels.ts:124](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L124)

Unsets a channel's watermark.

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to unset the watermark from.

#### Returns

`Promise`\<`void`\>

***

### unsubscribeFromChannel()

> **unsubscribeFromChannel**(`subscriptionId`): `Promise`\<`void`\>

Defined in: [oauth/channels.ts:278](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L278)

Unsubscribe from a [Channel](../../Library-Exports/classes/Channel#).

#### Parameters

##### subscriptionId

`string`

The subscription to unsubscribe from.

#### Returns

`Promise`\<`void`\>

***

### updateChannelBranding()

> **updateChannelBranding**(`channelResolvable`, `brandingSettings`): `Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

Defined in: [oauth/channels.ts:20](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L20)

Updates a channel's branding settings.
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to update the branding settings of.

##### brandingSettings

[`ChannelBrandingSettings`](../../Library-Exports/type-aliases/ChannelBrandingSettings.md)

The new branding settings.

#### Returns

`Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

***

### updateChannelLocalizations()

> **updateChannelLocalizations**(`channelResolvable`, `localizations`): `Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

Defined in: [oauth/channels.ts:45](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L45)

Updates a channel's localizations.
**CURRENTLY BROKEN in the API**
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to update the localizations of.

##### localizations

The new localizations.

#### Returns

`Promise`\<[`Channel`](../../Library-Exports/classes/Channel.md)\>

***

### updateChannelSection()

> **updateChannelSection**(`id`, `type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)\>

Defined in: [oauth/channels.ts:210](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L210)

Updates a [ChannelSection](../../Library-Exports/classes/ChannelSection#).
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### id

`string`

The ID of the channel section.

##### type

[`ChannelSectionType`](../../Library-Exports/type-aliases/ChannelSectionType.md)

The type of channel section.

##### name?

`string`

The name of the channel section.

##### position?

`number`

The position of the channel section on the channel homepage.

##### playlistsResolvable?

[`PlaylistResolvable`](../../Library-Exports/type-aliases/PlaylistResolvable.md)[]

Any playlists in the channel section.

##### channelsResolvable?

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)[]

Any channels in the channel section.

#### Returns

`Promise`\<[`ChannelSection`](../../Library-Exports/classes/ChannelSection.md)\>

***

### uploadChannelBanner()

> **uploadChannelBanner**(`image`): `Promise`\<`string`\>

Defined in: [oauth/channels.ts:141](https://github.com/brandonbothell/popyt/blob/93878bc88162f334b5d65b1ec85a2c04f4be86f0/src/oauth/channels.ts#L141)

Uploads a channel banner.

#### Parameters

##### image

[`Image`](../../Library-Exports/type-aliases/Image.md)

The channel banner to upload.

#### Returns

`Promise`\<`string`\>

The URL of the uploaded banner, used as
[`BrandingSettings.image.bannerExternalUrl`](../../Library-Exports/type-aliases/ChannelBrandingSettings#bannerexternalurl)
in [`OAuth.updateChannelBranding()`](#updatechannelbranding)
