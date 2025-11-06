---
id: "Library_Exports.Comment"
title: "Documentation"
sidebar_label: "Comment"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Comment

## Constructors

### constructor

• **new Comment**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `Schema$Comment` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/comment.ts:141](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L141)

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

[entities/comment.ts:46](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L46)

___

### channelId

• `Optional` **channelId**: `string`

The ID of the channel that uploaded the video this comment is on, if any.  
**Currently broken**, [see here](https://issuetracker.google.com/issues/288239809).

#### Defined in

[entities/comment.ts:117](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L117)

___

### data

• **data**: `any`

The raw data from the YouTube API of the comment.

#### Defined in

[entities/comment.ts:31](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L31)

___

### dateEdited

• **dateEdited**: `Date`

Either the date the comment was last edited, or the date it was
posted.

#### Defined in

[entities/comment.ts:111](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L111)

___

### datePublished

• **datePublished**: `Date`

The date the comment was published.

#### Defined in

[entities/comment.ts:105](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L105)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full comment object.

#### Defined in

[entities/comment.ts:41](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L41)

___

### id

• **id**: `string`

The comment's unique YouTube ID.

#### Defined in

[entities/comment.ts:36](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L36)

___

### likes

• **likes**: `number`

The number of likes the comment has received.

#### Defined in

[entities/comment.ts:95](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L95)

___

### parentCommentId

• `Optional` **parentCommentId**: `string`

If this comment is a reply, then this is the ID of the comment it is replying to.

#### Defined in

[entities/comment.ts:127](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L127)

___

### popular

• **popular**: `boolean`

Either YouTube thinks it's popular, or it has at least 100 likes.

#### Defined in

[entities/comment.ts:90](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L90)

___

### rateable

• **rateable**: `boolean`

Whether or not you can like/dislike the comment.

#### Defined in

[entities/comment.ts:85](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L85)

___

### replies

• **replies**: [`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)\<[`Comment`](Library_Exports.Comment)\>

Replies directed to the comment. If the comment was fetched from a video,
then this will be partially filled. You'll need to use [Comment.fetchReplies](./Library_Exports.Comment#fetchReplies)
to get all of the replies, though.

#### Defined in

[entities/comment.ts:134](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L134)

___

### replyCount

• `Optional` **replyCount**: `number`

If this comment was fetched from a video, then this is the number of replies on it.

#### Defined in

[entities/comment.ts:139](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L139)

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

[entities/comment.ts:71](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L71)

___

### url

• `Optional` **url**: `string`

The url of the comment.

#### Defined in

[entities/comment.ts:100](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L100)

___

### videoId

• `Optional` **videoId**: `string`

The ID of the video that this comment is on, if any.

#### Defined in

[entities/comment.ts:122](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L122)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object used to create the comment.

#### Defined in

[entities/comment.ts:26](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'comments'`

The name of the endpoint used for this entity.

#### Defined in

[entities/comment.ts:9](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L9)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/comment.ts:19](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L19)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/comment.ts:14](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L14)

## Methods

### delete

▸ **delete**(): `Promise`\<`void`\>

Deletes the comment.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

#### Defined in

[entities/comment.ts:262](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L262)

___

### edit

▸ **edit**(`text`): `Promise`\<[`Comment`](Library_Exports.Comment)\>

Edits the comment.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The new text of the comment. |

#### Returns

`Promise`\<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[entities/comment.ts:225](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L225)

___

### fetchReplies

▸ **fetchReplies**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)\<[`Comment`](Library_Exports.Comment)\>\>

Fetches replies to the comment from the API.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `pageOptions?` | [`PageOptions`](../modules/Library_Exports#pageoptions) | The number of pages and maximum number of items per page. Fetches the maximum number of items allowed by the API per page by default. Set pages to a value <=0 to fetch all. |
| `parts?` | [`CommentParts`](../modules/Library_Exports#commentparts) | The parts of the object to fetch (saves quota if you aren't using certain properties!) |

#### Returns

`Promise`\<[`PaginatedResponse`](../modules/Library_Exports#paginatedresponse)\<[`Comment`](Library_Exports.Comment)\>\>

#### Defined in

[entities/comment.ts:215](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L215)

___

### markAsSpam

▸ **markAsSpam**(): `Promise`\<`void`\>

Marks the comment as spam.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

#### Defined in

[entities/comment.ts:243](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L243)

___

### reply

▸ **reply**(`text`): `Promise`\<[`Comment`](Library_Exports.Comment)\>

Replies to the comment.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text of the reply. |

#### Returns

`Promise`\<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[entities/comment.ts:235](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L235)

___

### setModerationStatus

▸ **setModerationStatus**(`status?`, `banAuthor?`): `Promise`\<`void`\>

Sets the comment's moderation status.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `status?` | ``"rejected"`` \| ``"heldForReview"`` \| ``"published"`` | `undefined` | The status to set the comment to. |
| `banAuthor` | `boolean` | `false` | Whether or not to ban the author of the comment from commenting again. Defaults to false. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[entities/comment.ts:254](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/comment.ts#L254)
