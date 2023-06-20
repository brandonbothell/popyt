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

[oauth.ts:38](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L38)

## Properties

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

#### Defined in

[oauth.ts:32](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L32)

## Methods

### addChannelSection

▸ **addChannelSection**(`type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Adds a [[ChannelSection]] to the authorized user's [[Channel]].  
Last tested 05/24/2020 10:11. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `type` | [`ChannelSectionType`](../modules/Library_Exports#channelsectiontype) | The type of channel section. |
| `name?` | `string` | The name of the channel section. |
| `position?` | `number` | The position of the channel section on the channel homepage. |
| `playlistsResolvable?` | (`string` \| [`Playlist`](Library_Exports.Playlist))[] | Any playlists in the channel section. |
| `channelsResolvable?` | (`string` \| [`Channel`](Library_Exports.Channel))[] | Any channels in the channel section. |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth.ts:636](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L636)

___

### addPlaylistItem

▸ **addPlaylistItem**(`playlistResolvable`, `videoResolvable`, `position?`, `note?`): `Promise`<[`Video`](Library_Exports.Video)\>

Adds a [[Video]] to a [[Playlist]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | `string` \| [`Playlist`](Library_Exports.Playlist) | The playlist to add the video to. |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The video to add to the playlist. |
| `position?` | `number` | The position to add the video in. Defaults to the end. |
| `note?` | `string` | A user-generated note on the video. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

A partial video object.

#### Defined in

[oauth.ts:449](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L449)

___

### createPlaylist

▸ **createPlaylist**(`title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Creates a [[Playlist]].  
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

[oauth.ts:369](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L369)

___

### deleteCaption

▸ **deleteCaption**(`id`): `Promise`<`void`\>

Deletes a [[Caption]] track.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:831](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L831)

___

### deleteChannelSection

▸ **deleteChannelSection**(`id`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Deletes a [[ChannelSection]].
Last tested 05/24/2020 10:11. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the channel section. |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth.ts:700](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L700)

___

### deleteComment

▸ **deleteComment**(`id`): `Promise`<`void`\>

Deletes a [[YTComment]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the comment to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:194](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L194)

___

### deletePlaylist

▸ **deletePlaylist**(`playlistResolvable`): `Promise`<`void`\>

Deletes a [[Playlist]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | `string` \| [`Playlist`](Library_Exports.Playlist) | The playlist to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:433](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L433)

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

[oauth.ts:509](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L509)

___

### deleteVideo

▸ **deleteVideo**(`videoResolvable`): `Promise`<`void`\>

Deletes a [[Video]].
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The video to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:297](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L297)

___

### downloadCaption

▸ **downloadCaption**(`id`, `format?`, `language?`): `Promise`<`Buffer`\>

Downloads a [[Caption]] track.  
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

[oauth.ts:807](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L807)

___

### editComment

▸ **editComment**(`commentId`, `text`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Edit a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
Last tested 07/05/2021 17:40. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment. |
| `text` | `string` | The new text content of the comment. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[oauth.ts:133](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L133)

___

### getCaption

▸ **getCaption**(`videoResolvable`, `captionId`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Get a [[Caption]] object from the ID of the caption.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The Title, URL, or ID of the video to get the caption from. |
| `captionId` | `string` | The ID of the caption. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth.ts:711](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L711)

___

### getCaptions

▸ **getCaptions**(`videoResolvable`): `Promise`<[`Caption`](Library_Exports.Caption)[]\>

Gets the [[Caption]]s of a [[Video]]. Used mostly internally with [[Video.fetchCaptions]].  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The Title, URL, or ID of the video to get the captions from. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)[]\>

#### Defined in

[oauth.ts:729](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L729)

___

### getMe

▸ **getMe**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Gets the authorized user's [[Channel]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:55](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L55)

___

### getMyPlaylists

▸ **getMyPlaylists**(`maxPerPage?`, `parts?`): `Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

Gets the authorized user's [[Playlist]]s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxPerPage?` | `number` | The maximum number of playlists to fetch per page. Fetches the maximum allowed by the API by default. Set to a value <=0 to fetch all. |
| `parts?` | [`PlaylistParts`](../modules/Library_Exports#playlistparts) | - |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)[]\>

#### Defined in

[oauth.ts:79](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L79)

___

### getMyRatings

▸ **getMyRatings**(`videoResolvables`): `Promise`<{ `rating`: ``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"`` ; `videoId`: `string`  }[]\>

Retrieve your rating on a [[Video]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvables` | (`string` \| [`Video`](Library_Exports.Video))[] | The video(s) to retrieve your rating from. |

#### Returns

`Promise`<{ `rating`: ``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"`` ; `videoId`: `string`  }[]\>

#### Defined in

[oauth.ts:245](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L245)

___

### getMySubscriptions

▸ **getMySubscriptions**(`maxPerPage?`, `parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

Gets the authorized user's [[Subscription]]s.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `maxPerPage?` | `number` | The maximum number of subscriptions to fetch per page. Fetches the maximum allowed by the API by default. Set to a value <=0 to fetch all. |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) | - |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)[]\>

#### Defined in

[oauth.ts:67](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L67)

___

### getVideoAbuseReportReasons

▸ **getVideoAbuseReportReasons**(): `Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

Gets a list of [[VideoAbuseReportReason]]s.
Last tested 05/18/2020 11:48. PASSING

#### Returns

`Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

#### Defined in

[oauth.ts:840](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L840)

___

### markCommentAsSpam

▸ **markCommentAsSpam**(`commentId`): `Promise`<`void`\>

Marks a [[YTComment]] as spam.  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to mark as spam. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:158](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L158)

___

### postComment

▸ **postComment**(`text`, `channelResolvable`, `videoResolvable?`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Post a [[Comment]] on a [[Video]] or [[Channel]] discussion.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text content of the comment. |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to post the comment on. |
| `videoResolvable?` | `string` | The video of the channel to post the comment on. If falsey, the comment will be posted to the channel discussion. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[oauth.ts:92](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L92)

___

### rateVideo

▸ **rateVideo**(`videoResolvable`, `rating`): `Promise`<`void`\>

Like, dislike, or remove a rating from a [[Video]].
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The video to rate. |
| `rating` | ``"none"`` \| ``"like"`` \| ``"dislike"`` | The rating to give the video. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:233](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L233)

___

### replyToComment

▸ **replyToComment**(`commentId`, `text`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Replies to a [[YTComment]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to reply to. |
| `text` | `string` | The text to reply with. Required for [[YTComment.url]] to be correct. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[oauth.ts:117](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L117)

___

### reportAbuse

▸ **reportAbuse**(`videoResolvable`, `reasonId`, `secondaryReasonId?`, `comments?`, `language?`): `Promise`<`void`\>

Report a [[Video]] for abuse.  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The video to report. |
| `reasonId` | `string` | The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list)) |
| `secondaryReasonId?` | `string` | An optional second reason for reporting. |
| `comments?` | `string` | Any additional information. |
| `language?` | `string` | The language that the reporter speaks. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:270](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L270)

___

### setChannelMadeForKids

▸ **setChannelMadeForKids**(`channelResolvable`, `madeForKids`): `Promise`<[`Channel`](Library_Exports.Channel)\>

Sets a channel as made for kids or not made for kids.  
Last tested 05/20/2020 02:58. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to update. |
| `madeForKids` | `boolean` | Whether or not the channel is made for kids. |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:562](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L562)

___

### setChannelWatermark

▸ **setChannelWatermark**(`channelResolvable`, `type`, `offset`, `duration`, `image`, `imageType`): `Promise`<`void`\>

Sets a channel's watermark.  
Last tested 05/19/2020 18:07. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to set the watermark for. |
| `type` | ``"fromStart"`` \| ``"fromEnd"`` | The timing type of the watermark. |
| `offset` | `number` | The offset, in milliseconds, from the start/end of the video to display the watermark from. |
| `duration` | `number` | The duration, in millseconds, to display the watermark for. |
| `image` | `Buffer` | The watermark image. |
| `imageType` | ``"jpeg"`` \| ``"png"`` | - |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:586](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L586)

___

### setCommentModerationStatus

▸ **setCommentModerationStatus**(`commentId`, `moderationStatus`, `banAuthor?`): `Promise`<`void`\>

Sets the moderation status of a [[YTComment]]  
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

[oauth.ts:170](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L170)

___

### setThumbnail

▸ **setThumbnail**(`videoResolvable`, `image`): `Promise`<{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `maxres?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `standard?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  }\>

Sets a new [[Thumbnail]] for a [[Video]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The video to set the thumbnail for. |
| `image` | `Object` | The image data and type to upload. |
| `image.data` | `Buffer` | - |
| `image.type` | ``"jpeg"`` \| ``"png"`` | - |

#### Returns

`Promise`<{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `maxres?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `standard?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  }\>

#### Defined in

[oauth.ts:350](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L350)

___

### subscribeToChannel

▸ **subscribeToChannel**(`channelResolvable`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Subscribe to a [[Channel]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to subscribe to. |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

A partial subscription object.

#### Defined in

[oauth.ts:205](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L205)

___

### unsetChannelWatermark

▸ **unsetChannelWatermark**(`channelResolvable`): `Promise`<`void`\>

Unsets a channel's watermark.  
Last tested 05/18/2020 18:23. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to unset the watermark from. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:606](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L606)

___

### unsubscribeFromChannel

▸ **unsubscribeFromChannel**(`subscriptionId`): `Promise`<`void`\>

Unsubscribe from a [[Channel]].  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `subscriptionId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth.ts:222](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L222)

___

### updateCaption

▸ **updateCaption**(`id`, `track?`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Edits a [[Caption]] track.  
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

[oauth.ts:777](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L777)

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
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to update the branding settings of. |
| `brandingSettings` | [`ChannelBrandingSettings`](../modules/Library_Exports#channelbrandingsettings) | The new branding settings. |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:522](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L522)

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
| `channelResolvable` | `string` \| [`Channel`](Library_Exports.Channel) | The channel to update the localizations of. |
| `localizations` | `Object` | The new localizations. |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[oauth.ts:543](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L543)

___

### updateChannelSection

▸ **updateChannelSection**(`id`, `type`, `name?`, `position?`, `playlistsResolvable?`, `channelsResolvable?`): `Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

Updates a [[ChannelSection]].
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
| `playlistsResolvable?` | (`string` \| [`Playlist`](Library_Exports.Playlist))[] | Any playlists in the channel section. |
| `channelsResolvable?` | (`string` \| [`Channel`](Library_Exports.Channel))[] | Any channels in the channel section. |

#### Returns

`Promise`<[`ChannelSection`](Library_Exports.ChannelSection)\>

#### Defined in

[oauth.ts:673](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L673)

___

### updatePlaylist

▸ **updatePlaylist**(`playlistResolvable`, `title`, `description?`, `privacy?`, `tags?`, `language?`, `localizations?`): `Promise`<[`Playlist`](Library_Exports.Playlist)\>

Updates a [[Playlist]].  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `playlistResolvable` | `string` \| [`Playlist`](Library_Exports.Playlist) | The playlist to update. |
| `title` | `string` | A title for the playlist. |
| `description?` | `string` | A description of the playlist. |
| `privacy?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` | Whether the video is private, public, or unlisted. |
| `tags?` | `string`[] | Tags pertaining to the playlist. |
| `language?` | `string` | The language of the playlist's default title and description. |
| `localizations?` | `Object` | Translated titles and descriptions. |

#### Returns

`Promise`<[`Playlist`](Library_Exports.Playlist)\>

#### Defined in

[oauth.ts:404](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L404)

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
| `playlistResolvable` | `string` \| [`Playlist`](Library_Exports.Playlist) | The playlist that the video is in. |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | The video that's in the playlist. |
| `position?` | `number` | The position to change the playlist item's to. |
| `note?` | `string` | The note to change the playlist item's to. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

A partial video object.

#### Defined in

[oauth.ts:482](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L482)

___

### updateVideo

▸ **updateVideo**(`video`): `Promise`<[`Video`](Library_Exports.Video)\>

Updates a [[Video]].  
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

[oauth.ts:311](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L311)

___

### uploadCaption

▸ **uploadCaption**(`videoResolvable`, `language`, `name`, `track`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Uploads a [[Caption]] track for a [[Video]].  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoResolvable` | `string` \| [`Video`](Library_Exports.Video) | `undefined` | The video to add the caption track to. |
| `language` | `string` | `undefined` | The language that the caption track is in. |
| `name` | `string` | `undefined` | The name of the caption track. |
| `track` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `false` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth.ts:751](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L751)

___

### uploadChannelBanner

▸ **uploadChannelBanner**(`image`): `Promise`<`string`\>

Uploads a channel banner.  
Last tested 05/20/2020 03:17. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Object` | The channel banner to upload. |
| `image.data` | `Buffer` | - |
| `image.type` | ``"jpeg"`` \| ``"png"`` | - |

#### Returns

`Promise`<`string`\>

The URL of the uploaded banner, used as
[[BrandingSettings.image.bannerExternalUrl]] in [[OAuth.updateChannelBranding]]

#### Defined in

[oauth.ts:620](https://github.com/brandonbothell/popyt/blob/eaea722/src/oauth.ts#L620)
