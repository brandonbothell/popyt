---
id: "Library_Exports.Video"
title: "Documentation"
sidebar_label: "Video"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Video

A YouTube video.

## Constructors

### constructor

• **new Video**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `false` |

#### Defined in

[entities/video.ts:199](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L199)

## Properties

### captions

• **captions**: [`Caption`](Library_Exports.Caption)[]

The caption data associated with this video. Only available after running [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).

#### Defined in

[entities/video.ts:182](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L182)

___

### category

• **category**: `string`

The video category associated with the video.

#### Defined in

[entities/video.ts:162](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L162)

___

### channel

• **channel**: `Object`

Information on the channel that uploaded the video.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `name` | `string` |

#### Defined in

[entities/video.ts:88](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L88)

___

### commentCount

• **commentCount**: `number`

The number of comments on the video.

#### Defined in

[entities/video.ts:150](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L150)

___

### comments

• **comments**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>

The video's comments. Only defined when [Video.fetchComments](./Library_Exports.Video#fetchComments) is called.

#### Defined in

[entities/video.ts:145](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L145)

___

### data

• **data**: `any`

The raw data of the video.

#### Defined in

[entities/video.ts:37](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L37)

___

### datePublished

• **datePublished**: `Date`

The date the video was published.

#### Defined in

[entities/video.ts:78](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L78)

___

### dateRecorded

• **dateRecorded**: `Date`

The date the video was recorded. This is specified by the uploader.

#### Defined in

[entities/video.ts:83](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L83)

___

### description

• **description**: `string`

The description of the video.

#### Defined in

[entities/video.ts:57](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L57)

___

### dislikes

• **dislikes**: `number`

The number of dislikes the video has.

#### Defined in

[entities/video.ts:126](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L126)

___

### full

• **full**: `boolean`

Whether or not this is a full video object (would it be the same if we ran [Video.fetch](./Library_Exports.Video#fetch) under the same conditions as last time?).

#### Defined in

[entities/video.ts:42](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L42)

___

### id

• **id**: `string`

The ID of the video.

#### Defined in

[entities/video.ts:47](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L47)

___

### kids

• **kids**: `Object`

Properties to do with videos made for children.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `madeForKids` | `boolean` | Whether or not the video was made for children. |
| `selfDeclaredMadeForKids` | `boolean` | Whether or not the poster of the video marked it as made for kids. |

#### Defined in

[entities/video.ts:167](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L167)

___

### license

• **license**: ``"creativeCommon"`` \| ``"youtube"``

The license this video falls under.

#### Defined in

[entities/video.ts:192](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L192)

___

### likes

• **likes**: `number`

The number of likes the video has.

#### Defined in

[entities/video.ts:121](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L121)

___

### liveStatus

• **liveStatus**: ``false`` \| ``"live"`` \| ``"upcoming"``

If this is a ongoing livestream, this is `live`.
If this is an upcoming livestream, this is `upcoming`.
If this is not a livestream, this is `false`.

#### Defined in

[entities/video.ts:157](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L157)

___

### localizations

• **localizations**: `Object`

The localized titles and descriptions of this video, if any.

#### Index signature

▪ [language: `string`]: { `description`: `string` ; `title`: `string`  }

#### Defined in

[entities/video.ts:197](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L197)

___

### minutes

• **minutes**: `number`

The minutes of the video.

#### Defined in

[entities/video.ts:101](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L101)

___

### note

• **note**: `string`

If this video was fetched from a playlist, this can be populated with a user-created note about the video.

#### Defined in

[entities/video.ts:187](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L187)

___

### private

• **private**: `boolean`

Whether or not this video COULD BE private. True if the video might
be private, as you cannot check if playlist items are private.

I would recommend that you try and fetch the video and catch an error
if it is from a playlist & marked as private.

#### Defined in

[entities/video.ts:140](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L140)

___

### seconds

• **seconds**: `number`

The seconds of the video.

#### Defined in

[entities/video.ts:106](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L106)

___

### shortUrl

• **shortUrl**: `string`

The short url of the video, i.e. https://youtu.be/id

#### Defined in

[entities/video.ts:116](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L116)

___

### tags

• **tags**: `string`[]

The tags of the video.

#### Defined in

[entities/video.ts:73](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L73)

___

### thumbnails

• **thumbnails**: `Object`

The thumbnails of the video.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `high?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `maxres?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `medium?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `standard?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |

#### Defined in

[entities/video.ts:62](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L62)

___

### title

• **title**: `string`

The title of the video.

#### Defined in

[entities/video.ts:52](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L52)

___

### url

• **url**: `string`

The url of the video.

#### Defined in

[entities/video.ts:111](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L111)

___

### views

• **views**: `number`

The number of views the video has.

#### Defined in

[entities/video.ts:131](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L131)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

YouTube object that created the video.

#### Defined in

[entities/video.ts:32](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L32)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videos'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video.ts:14](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L14)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/video.ts:24](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L24)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,statistics,status,recordingDetails,localizations'`

The parts to request for this entity.

#### Defined in

[entities/video.ts:19](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L19)

## Methods

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:358](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L358)

___

### dislike

▸ **dislike**(): `Promise`<`void`\>

Dislikes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:330](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L330)

___

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Video`](Library_Exports.Video)\>

Fetches this video from the API and reassigns this object to the new video object.
Only useful if `this.full` is false, or if you want updated video info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`VideoParts`](../modules/Library_Exports#videoparts) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/video.ts:292](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L292)

___

### fetchCaptions

▸ **fetchCaptions**(): `Promise`<[`Caption`](Library_Exports.Caption)[]\>

Fetches the captions for the video from the API.
Must be using an access token with correct scopes.

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)[]\>

#### Defined in

[entities/video.ts:388](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L388)

___

### fetchComments

▸ **fetchComments**(`pageOptions?`, `order?`, `parts?`): `Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

Fetches the video's comments from the API and assigns them to [Video.comments](./Library_Exports.Video#comments).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `order?` | ``"time"`` \| ``"relevance"`` | - |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)<[`Comment`](Library_Exports.Comment)\>\>

#### Defined in

[entities/video.ts:304](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L304)

___

### getRating

▸ **getRating**(): `Promise`<``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"``\>

Gets the user's rating on the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"``\>

#### Defined in

[entities/video.ts:313](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L313)

___

### like

▸ **like**(): `Promise`<`void`\>

Likes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:322](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L322)

___

### postComment

▸ **postComment**(`text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Posts a comment to the video.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text of the comment. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[entities/video.ts:279](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L279)

___

### reportAbuse

▸ **reportAbuse**(`reasonId`, `secondaryReasonId?`, `comments?`, `language?`): `Promise`<`void`\>

Reports the video for abuse.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `reasonId` | `string` | The reason for reporting. (IDs can be found [here](https://developers.google.com/youtube/v3/docs/videoAbuseReportReasons/list)) |
| `secondaryReasonId?` | `string` | An optional second reason for reporting. |
| `comments?` | `string` | Any additional information. |
| `language?` | `string` | The language that the reporter speaks. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:350](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L350)

___

### setThumbnail

▸ **setThumbnail**(`image`): `Promise`<{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `maxres?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `standard?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  }\>

Sets a new thumbnail for a video.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `image` | `Object` | The image data and type to upload. |
| `image.data` | `Buffer` | - |
| `image.type` | ``"jpeg"`` \| ``"png"`` | - |

#### Returns

`Promise`<{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `maxres?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `standard?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  }\>

#### Defined in

[entities/video.ts:379](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L379)

___

### unrate

▸ **unrate**(): `Promise`<`void`\>

Removes the user's like/dislike on the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:338](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L338)

___

### update

▸ **update**(`video`): `Promise`<[`Video`](Library_Exports.Video)\>

Edits the video.
Must be using an access token with correct scopes.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `video` | `Omit`<[`VideoUpdateResource`](../modules/Library_Exports#videoupdateresource), ``"id"``\> | The updated video object. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/video.ts:369](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L369)

___

### uploadCaption

▸ **uploadCaption**(`language`, `name`, `track`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Uploads a caption track for a video.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `language` | `string` | `undefined` | The language of the track. |
| `name` | `string` | `undefined` | The name of the track. |
| `track` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `false` | Whether or not the track is a draft. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[entities/video.ts:401](https://github.com/brandonbothell/popyt/blob/365a9e9/src/entities/video.ts#L401)
