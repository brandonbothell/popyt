---
id: "OAuth.OAuthVideos"
title: "Documentation"
sidebar_label: "OAuthVideos"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuthVideos

## Constructors

### constructor

• **new OAuthVideos**(`oauth`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oauth` | [`OAuth`](OAuth.OAuth) |

#### Defined in

[oauth/videos.ts:10](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L10)

## Properties

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

#### Defined in

[oauth/videos.ts:10](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L10)

## Methods

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

[oauth/videos.ts:91](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L91)

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

[oauth/videos.ts:33](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L33)

___

### getVideoAbuseReportReasons

▸ **getVideoAbuseReportReasons**(): `Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

Gets a list of [VideoAbuseReportReason](./Library_Exports.VideoAbuseReportReason#)s.
Last tested 05/18/2020 11:48. PASSING

#### Returns

`Promise`<[`VideoAbuseReportReason`](Library_Exports.VideoAbuseReportReason)[]\>

#### Defined in

[oauth/videos.ts:166](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L166)

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

[oauth/videos.ts:18](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L18)

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

[oauth/videos.ts:61](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L61)

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

[oauth/videos.ts:149](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L149)

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

[oauth/videos.ts:108](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/videos.ts#L108)
