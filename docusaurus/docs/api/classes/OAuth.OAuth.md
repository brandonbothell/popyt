---
id: "OAuth.OAuth"
title: "Documentation"
sidebar_label: "OAuth"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuth

All methods requiring an OAuth access token.
Use `YouTube.oauth` to access these methods.

## Constructors

### constructor

• **new OAuth**(`youtube`)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | The YouTube object to retrieve the token from. |

#### Defined in

[oauth.ts:24](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L24)

## Properties

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

#### Defined in

[oauth.ts:18](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L18)

## Methods

### addChannelSection

▸ **addChannelSection**(`type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Adds a [ChannelSection](./Library_Exports.ChannelSection#) to the authorized user's [Channel](./Library_Exports.Channel#).  
Last tested 05/24/2020 10:11. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ChannelSectionType`](../modules/Library_Exports#channelsectiontype) | The type of channel section. |
| `name?` | `string` | The name of the channel section. |
| `position?` | `number` | The position of the channel section on the channel homepage. |
| `playlistsResolvable?` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable)[] | Any playlists in the channel section. |
| `channelsResolvable?` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable)[] | Any channels in the channel section. |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth.ts:723](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L723)

___

### addPlaylistItem

▸ **addPlaylistItem**(`playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Adds a [Video](./Library_Exports.Video#) to a [Playlist](./Library_Exports.Playlist#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist to add the video to. |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video to add to the playlist. |
| `position?` | `number` | The position to add the video in. Defaults to the end. |
| `note?` | `string` | A user-generated note on the video. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

A partial video object.

#### Defined in

[oauth.ts:491](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L491)

___

### createPlaylist

▸ **createPlaylist**(`title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Creates a [Playlist](./Library_Exports.Playlist#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `title` | `string` | A title for the playlist. |
| `description?` | `string` | A description of the playlist. |
| `privacy?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` | Whether the video is private, public, or unlisted. |
| `tags?` | `string`[] | Tags pertaining to the playlist. |
| `language?` | `string` | The language of the playlist's default title and description. |
| `localizations?` | `Object` | Translated titles and descriptions. |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[oauth.ts:397](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L397)

___

### deleteCaption

▸ **deleteCaption**(`id`): `Promise`<`void`\>

Deletes a [Caption](./Library_Exports.Caption#) track.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:967](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L967)

___

### deleteChannelSection

▸ **deleteChannelSection**(`id`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Deletes a [ChannelSection](./Library_Exports.ChannelSection#).
Last tested 05/24/2020 10:11. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the channel section. |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth.ts:805](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L805)

___

### deleteComment

▸ **deleteComment**(`commentId`): `Promise`<`void`\>

Deletes a [Comment](./Library_Exports.Comment#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `commentId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:192](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L192)

___

### deletePlaylist

▸ **deletePlaylist**(`playlistResolvable`): `Promise`<`void`\>

Deletes a [Playlist](./Library_Exports.Playlist#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:472](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L472)

___

### deletePlaylistItem

▸ **deletePlaylistItem**(`id`): `Promise`<`void`\>

Deletes a playlist item.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the playlist item to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:563](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L563)

___

### deleteVideo

▸ **deleteVideo**(`videoResolvable`): `Promise`<`void`\>

Deletes a [Video](./Library_Exports.Video#).
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:314](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L314)

___

### downloadCaption

▸ **downloadCaption**(`id`, `format?`, `language?`): `Promise`<`Buffer`\>

Downloads a [Caption](./Library_Exports.Caption#) track.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to download. |
| `format?` | ``"sbv"`` \| ``"scc"`` \| ``"srt"`` \| ``"ttml"`` \| ``"vtt"`` | The file format to download the track in. |
| `language?` | `string` | The language to download the track in. |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[oauth.ts:943](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L943)

___

### editComment

▸ **editComment**(`commentId`, `text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Edit a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
Last tested 07/05/2021 17:40. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment. |
| `text` | `string` | The new text content of the comment. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[oauth.ts:128](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L128)

___

### getCaption

▸ **getCaption**(`videoResolvable`, `captionId`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Get a [Caption](./Library_Exports.Caption#) object from the ID of the caption.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The Title, URL, or ID of the video to get the caption from. |
| `captionId` | `string` | The ID of the caption. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth.ts:819](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L819)

___

### getCaptions

▸ **getCaptions**(`videoResolvable`): `Promise`<[`Caption`](Library_Exports.Caption)[]\>

Gets the [Caption](./Library_Exports.Caption#)s of a [Video](./Library_Exports.Video#). Used mostly internally with [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The Title, URL, or ID of the video to get the captions from. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)[]\>

#### Defined in

[oauth.ts:840](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L840)

___

### getMe

▸ **getMe**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Gets the authorized user's [Channel](./Library_Exports.Channel#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:41](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L41)

___

### getMyPlaylists

▸ **getMyPlaylists**(`maxPerPage?`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Gets the authorized user's [Playlist](./Library_Exports.Playlist#)s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxPerPage?` | `number` | The maximum number of playlists to fetch per page. Fetches the maximum allowed by the API by default. Set to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | - |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

#### Defined in

[oauth.ts:67](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L67)

___

### getMyRatings

▸ **getMyRatings**(`videoResolvables`): `Promise`<{ `rating`: ``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"`` ; `videoId`: `string`  }[]\>

Retrieve your rating on [Videos](./Library_Exports.Video#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvables` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable)[] | The video(s) to retrieve your rating from. |

#### Returns

`Promise`<{ `rating`: ``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"`` ; `videoId`: `string`  }[]\>

#### Defined in

[oauth.ts:256](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L256)

___

### getMySubscriptions

▸ **getMySubscriptions**(`maxPerPage?`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Gets the authorized user's [Subscription](./Library_Exports.Subscription#)s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxPerPage?` | `number` | The maximum number of subscriptions to fetch per page. Fetches the maximum allowed by the API by default. Set to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | - |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

#### Defined in

[oauth.ts:53](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L53)

___

### getVideoAbuseReportReasons

▸ **getVideoAbuseReportReasons**(): `Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

Gets a list of [VideoAbuseReportReason](./Library_Exports.VideoAbuseReportReason#)s.
Last tested 05/18/2020 11:48. PASSING

#### Returns

`Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

#### Defined in

[oauth.ts:976](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L976)

___

### markCommentAsSpam

▸ **markCommentAsSpam**(`commentId`): `Promise`<`void`\>

Marks a [Comment](./Library_Exports.Comment#) as spam.  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to mark as spam. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:150](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L150)

___

### postComment

▸ **postComment**(`text`, `channelResolvable`, `videoResolvable`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Post a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text content of the comment. |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to post the comment on. |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video of the channel to post the comment on. If falsey, the comment will be posted to the channel discussion. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[oauth.ts:82](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L82)

___

### rateVideo

▸ **rateVideo**(`videoResolvable`, `rating`): `Promise`<`void`\>

Like, dislike, or remove a rating from a [Video](./Library_Exports.Video#).
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video to rate. |
| `rating` | ``"none"`` \| ``"like"`` \| ``"dislike"`` | The rating to give the video. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:241](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L241)

___

### replyToComment

▸ **replyToComment**(`commentId`, `text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Replies to a [Comment](./Library_Exports.Comment#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to reply to. |
| `text` | `string` | The text to reply with. Required for [Comment.url](./Library_Exports.Comment#url) to be correct. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[oauth.ts:108](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L108)

___

### reportAbuse

▸ **reportAbuse**(`videoResolvable`, `reasonId`, `secondaryReasonId?`, `comments?`, `language?`): `Promise`<`void`\>

Report a [Video](./Library_Exports.Video#) for abuse.  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video to report. |
| `reasonId` | `string` | The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list)) |
| `secondaryReasonId?` | `string` | An optional second reason for reporting. |
| `comments?` | `string` | Any additional information. |
| `language?` | `string` | The language that the reporter speaks. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:284](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L284)

___

### setChannelMadeForKids

▸ **setChannelMadeForKids**(`channelResolvable`, `madeForKids`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Sets a channel as made for kids or not made for kids.  
Last tested 05/20/2020 02:58. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to update. |
| `madeForKids` | `boolean` | Whether or not the channel is made for kids. |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:629](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L629)

___

### setChannelWatermark

▸ **setChannelWatermark**(`channelResolvable`, `type`, `offset`, `duration`, `image`): `Promise`<`void`\>

Sets a channel's watermark.  
Last tested 05/19/2020 18:07. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to set the watermark for. |
| `type` | ``"fromStart"`` \| ``"fromEnd"`` | The timing type of the watermark. |
| `offset` | `number` | The offset, in milliseconds, from the start/end of the video to display the watermark from. |
| `duration` | `number` | The duration, in millseconds, to display the watermark for. |
| `image` | [`Image`](../modules/Library_Exports#image) | The watermark image. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:657](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L657)

___

### setCommentModerationStatus

▸ **setCommentModerationStatus**(`commentId`, `moderationStatus`, `banAuthor?`): `Promise`<`void`\>

Sets the moderation status of a [Comment](./Library_Exports.Comment#)  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to set the moderation status of. |
| `moderationStatus` | ``"rejected"`` \| ``"heldForReview"`` \| ``"published"`` | The moderation status to set the comment to. |
| `banAuthor?` | `boolean` | Whether or not to ban the author from making future comments. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:165](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L165)

___

### setThumbnail

▸ **setThumbnail**(`videoResolvable`, `image`): `Promise`<{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `maxres?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `standard?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  }\>

Sets a new [Thumbnail](../modules/Library_Exports#thumbnail) for a [Video](./Library_Exports.Video).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video to set the thumbnail for. |
| `image` | [`Image`](../modules/Library_Exports#image) | The image data and type to upload. |

#### Returns

`Promise`<{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `maxres?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `standard?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  }\>

#### Defined in

[oauth.ts:374](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L374)

___

### subscribeToChannel

▸ **subscribeToChannel**(`channelResolvable`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Subscribe to a [Channel](./Library_Exports.Channel#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to subscribe to. |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

A partial subscription object.

#### Defined in

[oauth.ts:206](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L206)

___

### unsetChannelWatermark

▸ **unsetChannelWatermark**(`channelResolvable`): `Promise`<`void`\>

Unsets a channel's watermark.  
Last tested 05/18/2020 18:23. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to unset the watermark from. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:686](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L686)

___

### unsubscribeFromChannel

▸ **unsubscribeFromChannel**(`subscriptionId`): `Promise`<`void`\>

Unsubscribe from a [Channel](./Library_Exports.Channel#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:227](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L227)

___

### updateCaption

▸ **updateCaption**(`id`, `track?`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Edits a [Caption](./Library_Exports.Caption#) track.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` | `undefined` | The ID of the caption track to edit. |
| `track?` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `null` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth.ts:898](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L898)

___

### updateChannelBranding

▸ **updateChannelBranding**(`channelResolvable`, `brandingSettings`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Updates a channel's branding settings.
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to update the branding settings of. |
| `brandingSettings` | [`ChannelBrandingSettings`](../modules/Library_Exports#channelbrandingsettings) | The new branding settings. |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:579](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L579)

___

### updateChannelLocalizations

▸ **updateChannelLocalizations**(`channelResolvable`, `localizations`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Updates a channel's localizations.
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/20/2020 02:58. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to update the localizations of. |
| `localizations` | `Object` | The new localizations. |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:604](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L604)

___

### updateChannelSection

▸ **updateChannelSection**(`id`, `type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Updates a [ChannelSection](./Library_Exports.ChannelSection#).
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/24/2020 10:11. PASSING

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

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth.ts:769](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L769)

___

### updatePlaylist

▸ **updatePlaylist**(`playlistResolvable`, `title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Updates a [Playlist](./Library_Exports.Playlist#).  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist to update. |
| `title` | `string` | A title for the playlist. |
| `description?` | `string` | A description of the playlist. |
| `privacy?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` | Whether the video is private, public, or unlisted. |
| `tags?` | `string`[] | Tags pertaining to the playlist. |
| `language?` | `string` | The language of the playlist's default title and description. |
| `localizations?` | `Object` | Translated titles and descriptions. |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[oauth.ts:437](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L437)

___

### updatePlaylistItem

▸ **updatePlaylistItem**(`id`, `playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Edits a playlist item.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the playlist item to edit. |
| `playlistResolvable` | [`PlaylistResolvable`](../modules/Library_Exports#playlistresolvable) | The playlist that the video is in. |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video that's in the playlist. |
| `position?` | `number` | The position to change the playlist item's to. |
| `note?` | `string` | The note to change the playlist item's to. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

A partial video object.

#### Defined in

[oauth.ts:530](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L530)

___

### updateVideo

▸ **updateVideo**(`video`): `Promise`<[`Video`](Library_Exports.Video)\>

Updates a [Video](./Library_Exports.Video#).  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `video` | [`VideoUpdateResource`](../modules/Library_Exports#videoupdateresource) | The updated video object. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[oauth.ts:331](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L331)

___

### uploadCaption

▸ **uploadCaption**(`videoResolvable`, `language`, `name`, `track`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Uploads a [Caption](./Library_Exports.Caption#) track for a [Video](./Library_Exports.Video#).  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | `undefined` | The video to add the caption track to. |
| `language` | `string` | `undefined` | The language that the caption track is in. |
| `name` | `string` | `undefined` | The name of the caption track. |
| `track` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `false` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth.ts:865](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L865)

___

### uploadChannelBanner

▸ **uploadChannelBanner**(`image`): `Promise`<`string`\>

Uploads a channel banner.  
Last tested 05/20/2020 03:17. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | [`Image`](../modules/Library_Exports#image) | The channel banner to upload. |

#### Returns

`Promise`<`string`\>

The URL of the uploaded banner, used as
[`BrandingSettings.image.bannerExternalUrl`](../modules/Library_Exports#channelbrandingsettings)
in [`OAuth.updateChannelBranding()`](#updatechannelbranding)

#### Defined in

[oauth.ts:704](https://github.com/brandonbothell/popyt/blob/b4e3354/src/oauth.ts#L704)
