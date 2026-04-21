[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [OAuth](../README.md) / OAuthVideos

# Class: OAuthVideos

Defined in: [oauth/videos.ts:10](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L10)

## Constructors

### Constructor

> **new OAuthVideos**(`oauth`): `OAuthVideos`

Defined in: [oauth/videos.ts:11](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L11)

#### Parameters

##### oauth

[`OAuth`](OAuth.md)

#### Returns

`OAuthVideos`

## Properties

### oauth

> **oauth**: [`OAuth`](OAuth.md)

Defined in: [oauth/videos.ts:11](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L11)

## Methods

### deleteVideo()

> **deleteVideo**(`videoResolvable`): `Promise`\<`void`\>

Defined in: [oauth/videos.ts:116](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L116)

Deletes a [Video](../../Library-Exports/classes/Video#).

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video to delete.

#### Returns

`Promise`\<`void`\>

***

### getMyRatings()

> **getMyRatings**\<`T`\>(`videoResolvable`): `Promise`\<`T` *extends* `any`[] ? [`VideoRating`](../../Library-Exports/classes/VideoRating.md)[] : [`VideoRating`](../../Library-Exports/classes/VideoRating.md)\>

Defined in: [oauth/videos.ts:33](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L33)

Retrieve your rating on [Videos](../../Library-Exports/classes/Video#).

#### Type Parameters

##### T

`T` *extends* [`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md) \| [`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)[]

#### Parameters

##### videoResolvable

`T`

The video(s) to retrieve your rating from.

#### Returns

`Promise`\<`T` *extends* `any`[] ? [`VideoRating`](../../Library-Exports/classes/VideoRating.md)[] : [`VideoRating`](../../Library-Exports/classes/VideoRating.md)\>

***

### getVideoAbuseReportReasons()

> **getVideoAbuseReportReasons**(): `Promise`\<[`VideoAbuseReportReason`](../../Library-Exports/classes/VideoAbuseReportReason.md)[]\>

Defined in: [oauth/videos.ts:188](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L188)

Gets a list of [VideoAbuseReportReason](../../Library-Exports/classes/VideoAbuseReportReason#)s.

#### Returns

`Promise`\<[`VideoAbuseReportReason`](../../Library-Exports/classes/VideoAbuseReportReason.md)[]\>

***

### rateVideo()

> **rateVideo**(`videoResolvable`, `rating`): `Promise`\<`void`\>

Defined in: [oauth/videos.ts:18](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L18)

Like, dislike, or remove a rating from a [Video](../../Library-Exports/classes/Video#).

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video to rate.

##### rating

`"none"` \| `"like"` \| `"dislike"`

The rating to give the video.

#### Returns

`Promise`\<`void`\>

***

### reportAbuse()

> **reportAbuse**(`videoResolvable`, `reasonId`, `secondaryReasonId?`, `comments?`, `language?`): `Promise`\<`void`\>

Defined in: [oauth/videos.ts:87](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L87)

Report a [Video](../../Library-Exports/classes/Video#) for abuse.

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video to report.

##### reasonId

`string`

The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list))

##### secondaryReasonId?

`string`

An optional second reason for reporting.

##### comments?

`string`

Any additional information.

##### language?

`string`

The language that the reporter speaks.

#### Returns

`Promise`\<`void`\>

***

### setThumbnail()

> **setThumbnail**(`videoResolvable`, `image`): `Promise`\<\{ `default?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `high?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `maxres?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `medium?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `standard?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); \}\>

Defined in: [oauth/videos.ts:172](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L172)

Sets a new [Thumbnail](../../Library-Exports/type-aliases/Thumbnail) for a [Video](../../Library-Exports/classes/Video).

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video to set the thumbnail for.

##### image

[`Image`](../../Library-Exports/type-aliases/Image.md)

The image data and type to upload.

#### Returns

`Promise`\<\{ `default?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `high?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `maxres?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `medium?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); `standard?`: [`Thumbnail`](../../Library-Exports/type-aliases/Thumbnail.md); \}\>

***

### updateVideo()

> **updateVideo**(`video`): `Promise`\<[`Video`](../../Library-Exports/classes/Video.md)\>

Defined in: [oauth/videos.ts:132](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/oauth/videos.ts#L132)

Updates a [Video](../../Library-Exports/classes/Video#).  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### video

[`VideoUpdateResource`](../../Library-Exports/type-aliases/VideoUpdateResource.md)

The updated video object.

#### Returns

`Promise`\<[`Video`](../../Library-Exports/classes/Video.md)\>
