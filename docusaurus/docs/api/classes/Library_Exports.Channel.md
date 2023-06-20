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

[entities/channel.ts:167](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L167)

## Properties

### about

• **about**: `string`

The description of this channel.

#### Defined in

[entities/channel.ts:48](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L48)

___

### commentCount

• **commentCount**: `number`

This channel's comment count.

**`Deprecated`**

See https://developers.google.com/youtube/v3/docs/channels#statistics.commentCount

#### Defined in

[entities/channel.ts:115](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L115)

___

### comments

• **comments**: [`YTComment`](Library_Exports.YTComment)[]

The channel's comments. Only defined when [[Channel.fetchComments]] is called.

#### Defined in

[entities/channel.ts:120](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L120)

___

### country

• **country**: `string`

The country this channel is based in.

#### Defined in

[entities/channel.ts:58](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L58)

___

### customUrl

• **customUrl**: `string`

This channel's custom URL, if they have one.

#### Defined in

[entities/channel.ts:68](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L68)

___

### data

• **data**: `any`

The raw data of this channel.

#### Defined in

[entities/channel.ts:38](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L38)

___

### dateCreated

• **dateCreated**: `Date`

The date this channel was created.

#### Defined in

[entities/channel.ts:84](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L84)

___

### featuredChannels

• **featuredChannels**: `string`[]

The URLs of all of this channel's featured channels. This property is broken for some channels.

#### Defined in

[entities/channel.ts:126](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L126)

___

### full

• **full**: `boolean`

Whether or not this a full channel object.

#### Defined in

[entities/channel.ts:33](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L33)

___

### id

• **id**: `string`

The ID of this channel.

#### Defined in

[entities/channel.ts:53](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L53)

___

### keywords

• **keywords**: `string`[]

This channel's keywords.

#### Defined in

[entities/channel.ts:99](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L99)

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

[entities/channel.ts:155](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L155)

___

### language

• **language**: `string`

The default language for this channel's uploads.

#### Defined in

[entities/channel.ts:89](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L89)

___

### liveStatus

• **liveStatus**: ``false`` \| ``"live"`` \| ``"upcoming"``

Only set if the channel is a search result.

If the channel has an ongoing livestream, this is `live`.
If the channel has an upcoming livestream, this is `upcoming`.
If the channel has neither an ongoing nor upcoming livestream, this is `false`.

#### Defined in

[entities/channel.ts:150](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L150)

___

### name

• **name**: `string`

The name of this channel.

#### Defined in

[entities/channel.ts:43](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L43)

___

### playlists

• **playlists**: [`Playlist`](Library_Exports.Playlist)[]

The channel's playlists. Only defined when [[Channel.fetchPlaylists]] is called.

#### Defined in

[entities/channel.ts:131](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L131)

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

[entities/channel.ts:73](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L73)

___

### sections

• **sections**: [`ChannelSection`](Library_Exports.ChannelSection)[]

The channel's sections. Only defined when [[Channel.fetchSections]] is called.

#### Defined in

[entities/channel.ts:141](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L141)

___

### subCount

• **subCount**: `number`

The number of subscribers this channel has. `-1` if the subcount is hidden.

#### Defined in

[entities/channel.ts:109](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L109)

___

### subscriptions

• **subscriptions**: [`Subscription`](Library_Exports.Subscription)[]

The channel's subscriptions. Only defined when [[Channel.fetchSubscriptions]] is called.

#### Defined in

[entities/channel.ts:136](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L136)

___

### url

• **url**: `string`

The url of the channel.

#### Defined in

[entities/channel.ts:63](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L63)

___

### videos

• **videos**: [`Playlist`](Library_Exports.Playlist)

The channel's uploads. Only available after calling [[Channel.fetchVideos]]

#### Defined in

[entities/channel.ts:104](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L104)

___

### views

• **views**: `number`

This channel's view count.

#### Defined in

[entities/channel.ts:94](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L94)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this channel object.

#### Defined in

[entities/channel.ts:28](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L28)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'channels'`

The name of the endpoint used for this entity.

#### Defined in

[entities/channel.ts:11](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L11)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/channel.ts:21](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,statistics,status,brandingSettings'`

The parts to request for this entity.

#### Defined in

[entities/channel.ts:16](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L16)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Fetches this channel and reassigns this object to the new channel object.
Only useful if `this.full` is false, or if you want updated channel info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/channel.ts:281](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L281)

___

### fetchComments

▸ **fetchComments**(`pages?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

**`Deprecated`**

See https://support.google.com/youtube/thread/130882091?hl=en&msgid=131295194
Fetches the channel's discussion tab comments and assigns them to [[Channel.comments]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pages?` | `number` | The number of pages of comments to fetch. Defaults to 1. Set <1 to fetch all items. |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | - |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

#### Defined in

[entities/channel.ts:306](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L306)

___

### fetchPlaylists

▸ **fetchPlaylists**(`pageOptions?`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Fetches the channel's playlists and assigns them to [[Channel.playlists]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

#### Defined in

[entities/channel.ts:318](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L318)

___

### fetchSections

▸ **fetchSections**(`parts?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

Fetches the channel's sections and assigns them to [[Channel.sections]].

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelSectionParts`](../modules/Library_Exports#channelsectionparts) |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)[]\>

#### Defined in

[entities/channel.ts:339](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L339)

___

### fetchSubscriptions

▸ **fetchSubscriptions**(`pageOptions?`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Fetches the channel's subscriptions and assigns them to [[Channel.subscriptions]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

#### Defined in

[entities/channel.ts:331](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L331)

___

### fetchVideos

▸ **fetchVideos**(`parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Fetches the channel's playlist of uploads and assigns it to the [[Channel.videos]] property.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[entities/channel.ts:289](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L289)

___

### postComment

▸ **postComment**(`text`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Posts a comment on the channel's discussion tab.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text of the comment. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[entities/channel.ts:265](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L265)

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

[entities/channel.ts:412](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L412)

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

[entities/channel.ts:385](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L385)

___

### setWatermark

▸ **setWatermark**(`type`, `offset`, `duration`, `image`, `imageType`): `Promise`<`void`\>

Sets the channel's watermark.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type |
| :------ | :------ |
| `type` | ``"fromStart"`` \| ``"fromEnd"`` |
| `offset` | `number` |
| `duration` | `number` |
| `image` | `Buffer` |
| `imageType` | ``"jpeg"`` \| ``"png"`` |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/channel.ts:394](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L394)

___

### subscribe

▸ **subscribe**(): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Subscribes to the channel.
Must be using an access token with correct scopes.

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[entities/channel.ts:349](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L349)

___

### unsetWatermark

▸ **unsetWatermark**(): `Promise`<`void`\>

Unsets the channel's watermark.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/channel.ts:403](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L403)

___

### unsubscribe

▸ **unsubscribe**(): `Promise`<`void`\>

Unsubscribes from the channel.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/channel.ts:358](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L358)

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

[entities/channel.ts:367](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L367)

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

[entities/channel.ts:376](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/channel.ts#L376)
