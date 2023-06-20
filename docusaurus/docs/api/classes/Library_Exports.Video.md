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

[entities/video.ts:178](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L178)

## Properties

### captions

• **captions**: [`Caption`](Library_Exports.Caption)[]

The caption data associated with this video. Only available after running [[Video.fetchCaptions]].

#### Defined in

[entities/video.ts:176](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L176)

___

### category

• **category**: `string`

The video category associated with the video.

#### Defined in

[entities/video.ts:156](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L156)

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

[entities/video.ts:82](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L82)

___

### commentCount

• **commentCount**: `number`

The number of comments on the video.

#### Defined in

[entities/video.ts:144](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L144)

___

### comments

• **comments**: [`YTComment`](Library_Exports.YTComment)[]

The video's comments. Only defined when [[Video.fetchComments]] is called.

#### Defined in

[entities/video.ts:139](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L139)

___

### data

• **data**: `any`

The raw data of the video.

#### Defined in

[entities/video.ts:36](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L36)

___

### datePublished

• **datePublished**: `Date`

The date the video was published.

#### Defined in

[entities/video.ts:77](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L77)

___

### description

• **description**: `string`

The description of the video.

#### Defined in

[entities/video.ts:56](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L56)

___

### dislikes

• **dislikes**: `number`

The number of dislikes the video has.

#### Defined in

[entities/video.ts:120](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L120)

___

### full

• **full**: `boolean`

Whether or not this is a full video object (would it be the same if we ran [[Video.fetch]] under the same conditions as last time?).

#### Defined in

[entities/video.ts:41](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L41)

___

### id

• **id**: `string`

The ID of the video.

#### Defined in

[entities/video.ts:46](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L46)

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

[entities/video.ts:161](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L161)

___

### likes

• **likes**: `number`

The number of likes the video has.

#### Defined in

[entities/video.ts:115](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L115)

___

### liveStatus

• **liveStatus**: ``false`` \| ``"live"`` \| ``"upcoming"``

If this is a ongoing livestream, this is `live`.
If this is an upcoming livestream, this is `upcoming`.
If this is not a livestream, this is `false`.

#### Defined in

[entities/video.ts:151](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L151)

___

### minutes

• **minutes**: `number`

The minutes of the video.

#### Defined in

[entities/video.ts:95](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L95)

___

### private

• **private**: `boolean`

Whether or not this video COULD BE private. True if the video might
be private, as you cannot check if playlist items are private.

I would recommend that you try and fetch the video and catch an error
if it is from a playlist & marked as private.

#### Defined in

[entities/video.ts:134](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L134)

___

### seconds

• **seconds**: `number`

The seconds of the video.

#### Defined in

[entities/video.ts:100](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L100)

___

### shortUrl

• **shortUrl**: `string`

The short url of the video, i.e. https://youtu.be/id

#### Defined in

[entities/video.ts:110](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L110)

___

### tags

• **tags**: `string`[]

The tags of the video.

#### Defined in

[entities/video.ts:72](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L72)

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

[entities/video.ts:61](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L61)

___

### title

• **title**: `string`

The title of the video.

#### Defined in

[entities/video.ts:51](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L51)

___

### url

• **url**: `string`

The url of the video.

#### Defined in

[entities/video.ts:105](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L105)

___

### views

• **views**: `number`

The number of views the video has.

#### Defined in

[entities/video.ts:125](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L125)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

YouTube object that created the video.

#### Defined in

[entities/video.ts:31](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L31)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videos'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video.ts:14](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L14)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/video.ts:24](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L24)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,statistics,status'`

The parts to request for this entity.

#### Defined in

[entities/video.ts:19](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L19)

## Methods

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:344](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L344)

___

### dislike

▸ **dislike**(): `Promise`<`void`\>

Dislikes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:313](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L313)

___

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Video`](Library_Exports.Video)\>

Fetches this video and reassigns this object to the new video object.
Only useful if `this.full` is false, or if you want updated video info.

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`VideoParts`](../modules/Library_Exports#videoparts) |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/video.ts:272](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L272)

___

### fetchCaptions

▸ **fetchCaptions**(): `Promise`<[`Caption`](Library_Exports.Caption)[]\>

Fetches the captions for the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)[]\>

#### Defined in

[entities/video.ts:377](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L377)

___

### fetchComments

▸ **fetchComments**(`pageOptions?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Fetches the video's comments and assigns them to [[Video.comments]].

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentThreadParts`](../modules/Library_Exports#commentthreadparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

#### Defined in

[entities/video.ts:284](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L284)

___

### getRating

▸ **getRating**(): `Promise`<``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"``\>

Gets the user's rating on the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"``\>

#### Defined in

[entities/video.ts:294](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L294)

___

### like

▸ **like**(): `Promise`<`void`\>

Likes the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:304](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L304)

___

### postComment

▸ **postComment**(`text`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Posts a comment to the video.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text of the comment. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[entities/video.ts:256](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L256)

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

[entities/video.ts:335](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L335)

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

[entities/video.ts:367](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L367)

___

### unrate

▸ **unrate**(): `Promise`<`void`\>

Removes the user's like/dislike on the video.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/video.ts:322](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L322)

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
| `video` | [`VideoUpdateResource`](../modules/Library_Exports#videoupdateresource) | The updated video object. |

#### Returns

`Promise`<[`Video`](Library_Exports.Video)\>

#### Defined in

[entities/video.ts:356](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L356)

___

### updateCaption

▸ **updateCaption**(`track`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Updates a caption track of a video.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `track` | `Buffer` | `undefined` | The modified caption track to upload. |
| `draft` | `boolean` | `null` | Whether or not the track is a draft. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[entities/video.ts:403](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L403)

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

[entities/video.ts:391](https://github.com/brandonbothell/popyt/blob/96fc0a8/src/entities/video.ts#L391)
