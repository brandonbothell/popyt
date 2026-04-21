[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Video

# Class: Video

Defined in: [entities/video.ts:11](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L11)

A YouTube video.

## Constructors

### Constructor

> **new Video**(`youtube`, `data`, `full?`): `Video`

Defined in: [entities/video.ts:201](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L201)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$Video` \| `Schema$PlaylistItem` \| `Schema$SearchResult`

##### full?

`boolean` = `false`

#### Returns

`Video`

## Properties

### captions

> **captions**: [`Caption`](Caption.md)[]

Defined in: [entities/video.ts:184](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L184)

The caption data associated with this video. Only available after running [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).

***

### category

> **category**: `string`

Defined in: [entities/video.ts:164](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L164)

The video category associated with the video.

***

### channel

> **channel**: `object`

Defined in: [entities/video.ts:90](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L90)

Information on the channel that uploaded the video.

#### id

> **id**: `string`

#### name

> **name**: `string`

***

### commentCount

> **commentCount**: `number`

Defined in: [entities/video.ts:152](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L152)

The number of comments on the video.

***

### comments

> **comments**: [`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>

Defined in: [entities/video.ts:147](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L147)

The video's comments. Only defined when [Video.fetchComments](./Library_Exports.Video#fetchComments) is called.

***

### data

> **data**: `any`

Defined in: [entities/video.ts:39](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L39)

The raw data of the video.

***

### datePublished

> **datePublished**: `Date`

Defined in: [entities/video.ts:80](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L80)

The date the video was published.

***

### dateRecorded

> **dateRecorded**: `Date`

Defined in: [entities/video.ts:85](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L85)

The date the video was recorded. This is specified by the uploader.

***

### description

> **description**: `string`

Defined in: [entities/video.ts:59](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L59)

The description of the video.

***

### dislikes

> **dislikes**: `number`

Defined in: [entities/video.ts:128](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L128)

The number of dislikes the video has.

***

### full

> **full**: `boolean`

Defined in: [entities/video.ts:44](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L44)

Whether or not this is a full video object (would it be the same if we ran [Video.fetch](./Library_Exports.Video#fetch) under the same conditions as last time?).

***

### id

> **id**: `string`

Defined in: [entities/video.ts:49](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L49)

The ID of the video.

***

### kids

> **kids**: `object`

Defined in: [entities/video.ts:169](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L169)

Properties to do with videos made for children.

#### madeForKids

> **madeForKids**: `boolean`

Whether or not the video was made for children.

#### selfDeclaredMadeForKids

> **selfDeclaredMadeForKids**: `boolean`

Whether or not the poster of the video marked it as made for kids.

***

### license

> **license**: `"creativeCommon"` \| `"youtube"`

Defined in: [entities/video.ts:194](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L194)

The license this video falls under.

***

### likes

> **likes**: `number`

Defined in: [entities/video.ts:123](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L123)

The number of likes the video has.

***

### liveStatus

> **liveStatus**: `false` \| `"live"` \| `"upcoming"`

Defined in: [entities/video.ts:159](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L159)

If this is a ongoing livestream, this is `live`.
If this is an upcoming livestream, this is `upcoming`.
If this is not a livestream, this is `false`.

***

### localizations

> **localizations**: `object`

Defined in: [entities/video.ts:199](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L199)

The localized titles and descriptions of this video, if any.

#### Index Signature

\[`language`: `string`\]: `object`

***

### minutes

> **minutes**: `number`

Defined in: [entities/video.ts:103](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L103)

The minutes of the video.

***

### note

> **note**: `string`

Defined in: [entities/video.ts:189](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L189)

If this video was fetched from a playlist, this can be populated with a user-created note about the video.

***

### private

> **private**: `boolean`

Defined in: [entities/video.ts:142](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L142)

Whether or not this video COULD BE private. True if the video might
be private, as you cannot check if playlist items are private.

I would recommend that you try and fetch the video and catch an error
if it is from a playlist & marked as private.

***

### seconds

> **seconds**: `number`

Defined in: [entities/video.ts:108](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L108)

The seconds of the video.

***

### shortUrl

> **shortUrl**: `string`

Defined in: [entities/video.ts:118](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L118)

The short url of the video, i.e. https://youtu.be/id

***

### tags

> **tags**: `string`[]

Defined in: [entities/video.ts:75](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L75)

The tags of the video.

***

### thumbnails

> **thumbnails**: `object`

Defined in: [entities/video.ts:64](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L64)

The thumbnails of the video.

#### default?

> `optional` **default?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### high?

> `optional` **high?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### maxres?

> `optional` **maxres?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### medium?

> `optional` **medium?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### standard?

> `optional` **standard?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

***

### title

> **title**: `string`

Defined in: [entities/video.ts:54](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L54)

The title of the video.

***

### url

> **url**: `string`

Defined in: [entities/video.ts:113](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L113)

The url of the video.

***

### views

> **views**: `number`

Defined in: [entities/video.ts:133](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L133)

The number of views the video has.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/video.ts:34](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L34)

YouTube object that created the video.

***

### endpoint

> `static` **endpoint**: `string` = `'videos'`

Defined in: [entities/video.ts:15](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L15)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string`

Defined in: [entities/video.ts:26](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L26)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'contentDetails,localizations,recordingDetails,snippet,statistics,status'`

Defined in: [entities/video.ts:20](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L20)

The parts to request for this entity.

## Methods

### delete()

> **delete**(): `Promise`\<`void`\>

Defined in: [entities/video.ts:381](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L381)

Deletes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### dislike()

> **dislike**(): `Promise`\<`void`\>

Defined in: [entities/video.ts:353](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L353)

Dislikes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### fetch()

> **fetch**(`parts?`): `Promise`\<`Video`\>

Defined in: [entities/video.ts:315](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L315)

Fetches this video from the API and reassigns this object to the new video object.
Only useful if `this.full` is false, or if you want updated video info.

#### Parameters

##### parts?

[`VideoParts`](../type-aliases/VideoParts.md)

#### Returns

`Promise`\<`Video`\>

***

### fetchCaptions()

> **fetchCaptions**(): `Promise`\<[`Caption`](Caption.md)[]\>

Defined in: [entities/video.ts:411](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L411)

Fetches the captions for the video from the API.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<[`Caption`](Caption.md)[]\>

***

### fetchComments()

> **fetchComments**(`pageOptions?`, `order?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>\>

Defined in: [entities/video.ts:327](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L327)

Fetches the video's comments from the API and assigns them to [Video.comments](./Library_Exports.Video#comments).

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value <=0 to fetch all.

##### order?

`"time"` \| `"relevance"`

##### parts?

[`CommentThreadParts`](../type-aliases/CommentThreadParts.md)

The parts of the object to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<[`Comment`](Comment.md)\>\>

***

### getRating()

> **getRating**(): `Promise`\<`"none"` \| `"like"` \| `"dislike"` \| `"unspecified"`\>

Defined in: [entities/video.ts:336](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L336)

Gets the user's rating on the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`"none"` \| `"like"` \| `"dislike"` \| `"unspecified"`\>

***

### like()

> **like**(): `Promise`\<`void`\>

Defined in: [entities/video.ts:345](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L345)

Likes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### postComment()

> **postComment**(`text`): `Promise`\<[`Comment`](Comment.md)\>

Defined in: [entities/video.ts:302](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L302)

Posts a comment to the video.
Must be using an access token with correct scopes.

#### Parameters

##### text

`string`

The text of the comment.

#### Returns

`Promise`\<[`Comment`](Comment.md)\>

***

### reportAbuse()

> **reportAbuse**(`reasonId`, `secondaryReasonId?`, `comments?`, `language?`): `Promise`\<`void`\>

Defined in: [entities/video.ts:373](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L373)

Reports the video for abuse.
Must be using an access token with correct scopes.

#### Parameters

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

> **setThumbnail**(`image`): `Promise`\<\{ `default?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `high?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `maxres?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `medium?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `standard?`: [`Thumbnail`](../type-aliases/Thumbnail.md); \}\>

Defined in: [entities/video.ts:402](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L402)

Sets a new thumbnail for a video.
Must be using an access token with correct scopes.

#### Parameters

##### image

The image data and type to upload.

###### data

`Buffer`

###### type

`"jpeg"` \| `"png"`

#### Returns

`Promise`\<\{ `default?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `high?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `maxres?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `medium?`: [`Thumbnail`](../type-aliases/Thumbnail.md); `standard?`: [`Thumbnail`](../type-aliases/Thumbnail.md); \}\>

***

### unrate()

> **unrate**(): `Promise`\<`void`\>

Defined in: [entities/video.ts:361](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L361)

Removes the user's like/dislike on the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### update()

> **update**(`video`): `Promise`\<`Video`\>

Defined in: [entities/video.ts:392](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L392)

Edits the video.
Must be using an access token with correct scopes.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### video

`Omit`\<[`VideoUpdateResource`](../type-aliases/VideoUpdateResource.md), `"id"`\>

The updated video object.

#### Returns

`Promise`\<`Video`\>

***

### uploadCaption()

> **uploadCaption**(`language`, `name`, `track`, `draft?`): `Promise`\<[`Caption`](Caption.md)\>

Defined in: [entities/video.ts:424](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/video.ts#L424)

Uploads a caption track for a video.
Must be using an access token with correct scopes.

#### Parameters

##### language

`string`

The language of the track.

##### name

`string`

The name of the track.

##### track

`Buffer`

The caption track to upload.

##### draft?

`boolean` = `false`

Whether or not the track is a draft.

#### Returns

`Promise`\<[`Caption`](Caption.md)\>
