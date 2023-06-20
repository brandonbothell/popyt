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

[oauth.ts:39](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L39)

## Properties

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

#### Defined in

[oauth.ts:33](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L33)

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

[oauth.ts:639](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L639)

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

[oauth.ts:452](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L452)

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

[oauth.ts:372](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L372)

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

[oauth.ts:834](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L834)

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

[oauth.ts:703](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L703)

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

[oauth.ts:197](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L197)

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

[oauth.ts:436](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L436)

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

[oauth.ts:512](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L512)

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

[oauth.ts:300](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L300)

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

[oauth.ts:810](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L810)

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

[oauth.ts:134](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L134)

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

[oauth.ts:714](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L714)

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

[oauth.ts:732](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L732)

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

[oauth.ts:56](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L56)

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

[oauth.ts:80](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L80)

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

[oauth.ts:248](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L248)

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

[oauth.ts:68](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L68)

___

### getVideoAbuseReportReasons

▸ **getVideoAbuseReportReasons**(): `Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

Gets a list of [[VideoAbuseReportReason]]s.
Last tested 05/18/2020 11:48. PASSING

#### Returns

`Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

#### Defined in

[oauth.ts:843](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L843)

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

[oauth.ts:161](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L161)

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

[oauth.ts:93](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L93)

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

[oauth.ts:236](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L236)

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

[oauth.ts:118](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L118)

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

[oauth.ts:273](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L273)

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

[oauth.ts:565](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L565)

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

[oauth.ts:589](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L589)

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

[oauth.ts:173](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L173)

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

[oauth.ts:353](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L353)

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

[oauth.ts:208](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L208)

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

[oauth.ts:609](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L609)

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

[oauth.ts:225](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L225)

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

[oauth.ts:780](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L780)

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

[oauth.ts:525](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L525)

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

[oauth.ts:546](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L546)

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

[oauth.ts:676](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L676)

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

[oauth.ts:407](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L407)

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

[oauth.ts:485](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L485)

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

[oauth.ts:314](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L314)

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

[oauth.ts:754](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L754)

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

[oauth.ts:623](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/oauth.ts#L623)
