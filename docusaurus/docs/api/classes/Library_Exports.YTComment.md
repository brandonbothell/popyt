---
id: "Library_Exports.YTComment"
title: "Documentation"
sidebar_label: "YTComment"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).YTComment

## Constructors

### constructor

• **new YTComment**(`youtube`, `data`, `full?`, `replies?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |
| `replies?` | `any`[] | `undefined` |

#### Defined in

[entities/comment.ts:133](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L133)

## Properties

### author

• **author**: `Object`

The comment's author.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `avatar` | `string` | The author's avatar URL. |
| `channelId` | `string` | The author's channel ID. |
| `channelUrl` | `string` | The author's channel URL. |
| `username` | `string` | The author's YouTube username. May not be unique. |

#### Defined in

[entities/comment.ts:44](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L44)

___

### channelId

• `Optional` **channelId**: `string`

The ID of the channel that uploaded the video this comment is on, if any.

#### Defined in

[entities/comment.ts:114](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L114)

___

### data

• **data**: `any`

The raw data from the YouTube API of the comment.

#### Defined in

[entities/comment.ts:29](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L29)

___

### dateEdited

• **dateEdited**: `Date`

Either the date the comment was last edited, or the date it was
posted.

#### Defined in

[entities/comment.ts:109](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L109)

___

### datePublished

• **datePublished**: `Date`

The date the comment was published.

#### Defined in

[entities/comment.ts:103](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L103)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full comment object.

#### Defined in

[entities/comment.ts:39](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L39)

___

### id

• **id**: `string`

The comment's unique YouTube ID.

#### Defined in

[entities/comment.ts:34](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L34)

___

### likes

• **likes**: `number`

The number of likes the comment has received.

#### Defined in

[entities/comment.ts:93](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L93)

___

### parentCommentId

• `Optional` **parentCommentId**: `string`

If this comment is a reply, then this is the ID of the comment it is replying to.

#### Defined in

[entities/comment.ts:124](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L124)

___

### popular

• **popular**: `boolean`

Either YouTube thinks it's popular, or it has at least 100 likes.

#### Defined in

[entities/comment.ts:88](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L88)

___

### rateable

• **rateable**: `boolean`

Whether or not you can like/dislike the comment.

#### Defined in

[entities/comment.ts:83](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L83)

___

### replies

• **replies**: [`YTComment`](Library_Exports.YTComment)[]

Replies directed to the comment. If the comment was fetched from a video,
then this will be partially filled. You'll need to use [[Comment.fetchReplies]]
to get all of the replies, though.

#### Defined in

[entities/comment.ts:131](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L131)

___

### text

• **text**: `Object`

The comment's content.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `displayed` | `string` | What YouTube displays to the user viewing the comment. |
| `original` | `string` | The comment's plain text. |

#### Defined in

[entities/comment.ts:69](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L69)

___

### url

• `Optional` **url**: `string`

The url of the comment.

#### Defined in

[entities/comment.ts:98](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L98)

___

### videoId

• `Optional` **videoId**: `string`

The ID of the video that this comment is on, if any.

#### Defined in

[entities/comment.ts:119](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L119)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object used to create the comment.

#### Defined in

[entities/comment.ts:24](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L24)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'comments'`

The name of the endpoint used for this entity.

#### Defined in

[entities/comment.ts:8](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L8)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/comment.ts:18](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L18)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/comment.ts:13](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L13)

## Methods

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the comment.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/comment.ts:245](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L245)

___

### edit

▸ **edit**(`text`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Edits the comment.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The new text of the comment. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[entities/comment.ts:205](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L205)

___

### fetchReplies

▸ **fetchReplies**(`pages?`, `parts?`): `Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

Fetches replies to the comment.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pages?` | `number` | The number of pages of comments to fetch. Defaults to 1. Set <1 to fetch all items. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | - |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)[]\>

#### Defined in

[entities/comment.ts:194](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L194)

___

### markAsSpam

▸ **markAsSpam**(): `Promise`<`void`\>

Marks the comment as spam.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/comment.ts:224](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L224)

___

### reply

▸ **reply**(`text`): `Promise`<[`YTComment`](Library_Exports.YTComment)\>

Replies to the comment.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text of the reply. |

#### Returns

`Promise`<[`YTComment`](Library_Exports.YTComment)\>

#### Defined in

[entities/comment.ts:215](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L215)

___

### setModerationStatus

▸ **setModerationStatus**(`status?`, `banAuthor?`): `Promise`<`void`\>

Sets the comment's moderation status.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `status?` | ``"rejected"`` \| ``"heldForReview"`` \| ``"published"`` | `undefined` | The status to set the comment to. |
| `banAuthor` | `boolean` | `false` | Whether or not to ban the author of the comment from commenting again. Defaults to false. |

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/comment.ts:236](https://github.com/brandonbothell/popyt/blob/3a8e552/src/entities/comment.ts#L236)
