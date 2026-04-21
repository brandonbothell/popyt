[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Comment

# Class: Comment

Defined in: [entities/comment.ts:5](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L5)

## Constructors

### Constructor

> **new Comment**(`youtube`, `data`, `full?`): `Comment`

Defined in: [entities/comment.ts:141](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L141)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$Comment`

##### full?

`boolean` = `true`

#### Returns

`Comment`

## Properties

### author

> **author**: `object`

Defined in: [entities/comment.ts:46](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L46)

The comment's author.

#### avatar

> **avatar**: `string`

The author's avatar URL.

#### channelId

> **channelId**: `string`

The author's channel ID.

#### channelUrl

> **channelUrl**: `string`

The author's channel URL.

#### username

> **username**: `string`

The author's YouTube username. May not be unique.

***

### channelId?

> `optional` **channelId?**: `string`

Defined in: [entities/comment.ts:117](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L117)

The ID of the channel that uploaded the video this comment is on, if any.  
**Currently broken**, [see here](https://issuetracker.google.com/issues/288239809).

***

### data

> **data**: `any`

Defined in: [entities/comment.ts:31](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L31)

The raw data from the YouTube API of the comment.

***

### dateEdited

> **dateEdited**: `Date`

Defined in: [entities/comment.ts:111](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L111)

Either the date the comment was last edited, or the date it was
posted.

***

### datePublished

> **datePublished**: `Date`

Defined in: [entities/comment.ts:105](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L105)

The date the comment was published.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/comment.ts:41](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L41)

Whether or not this a full comment object.

***

### id

> **id**: `string`

Defined in: [entities/comment.ts:36](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L36)

The comment's unique YouTube ID.

***

### likes

> **likes**: `number`

Defined in: [entities/comment.ts:95](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L95)

The number of likes the comment has received.

***

### parentCommentId?

> `optional` **parentCommentId?**: `string`

Defined in: [entities/comment.ts:127](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L127)

If this comment is a reply, then this is the ID of the comment it is replying to.

***

### popular

> **popular**: `boolean`

Defined in: [entities/comment.ts:90](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L90)

Either YouTube thinks it's popular, or it has at least 100 likes.

***

### rateable

> **rateable**: `boolean`

Defined in: [entities/comment.ts:85](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L85)

Whether or not you can like/dislike the comment.

***

### replies

> **replies**: [`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<`Comment`\>

Defined in: [entities/comment.ts:134](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L134)

Replies directed to the comment. If the comment was fetched from a video,
then this will be partially filled. You'll need to use [Comment.fetchReplies](./Comment#fetchreplies)
to get all of the replies, though.

***

### replyCount?

> `optional` **replyCount?**: `number`

Defined in: [entities/comment.ts:139](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L139)

If this comment was fetched from a video, then this is the number of replies on it.

***

### text

> **text**: `object`

Defined in: [entities/comment.ts:71](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L71)

The comment's content.

#### displayed

> **displayed**: `string`

What YouTube displays to the user viewing the comment.

#### original

> **original**: `string`

The comment's plain text.

***

### url?

> `optional` **url?**: `string`

Defined in: [entities/comment.ts:100](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L100)

The url of the comment.

***

### videoId?

> `optional` **videoId?**: `string`

Defined in: [entities/comment.ts:122](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L122)

The ID of the video that this comment is on, if any.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/comment.ts:26](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L26)

The YouTube object used to create the comment.

***

### endpoint

> `static` **endpoint**: `string` = `'comments'`

Defined in: [entities/comment.ts:9](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L9)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string`

Defined in: [entities/comment.ts:19](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L19)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'snippet'`

Defined in: [entities/comment.ts:14](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L14)

The parts to request for this entity.

## Methods

### delete()

> **delete**(): `Promise`\<`void`\>

Defined in: [entities/comment.ts:262](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L262)

Deletes the comment.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### edit()

> **edit**(`text`): `Promise`\<`Comment`\>

Defined in: [entities/comment.ts:225](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L225)

Edits the comment.
Must be using an access token with correct scopes.

#### Parameters

##### text

`string`

The new text of the comment.

#### Returns

`Promise`\<`Comment`\>

***

### fetchReplies()

> **fetchReplies**(`pageOptions?`, `parts?`): `Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<`Comment`\>\>

Defined in: [entities/comment.ts:215](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L215)

Fetches replies to the comment from the API.

#### Parameters

##### pageOptions?

[`PageOptions`](../type-aliases/PageOptions.md)

The number of pages and maximum number of items per page.
Fetches the maximum number of items allowed by the API per page by default.  
Set pages to a value {'<='}0 to fetch all.

##### parts?

[`CommentParts`](../type-aliases/CommentParts.md)

The parts of the object to fetch (saves quota if you aren't using certain properties!)

#### Returns

`Promise`\<[`PaginatedResponse`](../type-aliases/PaginatedResponse.md)\<`Comment`\>\>

***

### markAsSpam()

> **markAsSpam**(): `Promise`\<`void`\>

Defined in: [entities/comment.ts:243](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L243)

Marks the comment as spam.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### reply()

> **reply**(`text`): `Promise`\<`Comment`\>

Defined in: [entities/comment.ts:235](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L235)

Replies to the comment.
Must be using an access token with correct scopes.

#### Parameters

##### text

`string`

The text of the reply.

#### Returns

`Promise`\<`Comment`\>

***

### setModerationStatus()

> **setModerationStatus**(`status?`, `banAuthor?`): `Promise`\<`void`\>

Defined in: [entities/comment.ts:254](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/comment.ts#L254)

Sets the comment's moderation status.
Must be using an access token with correct scopes.

#### Parameters

##### status?

`"rejected"` \| `"heldForReview"` \| `"published"`

The status to set the comment to.

##### banAuthor?

`boolean` = `false`

Whether or not to ban the author of the comment from commenting again.
Defaults to false.

#### Returns

`Promise`\<`void`\>
