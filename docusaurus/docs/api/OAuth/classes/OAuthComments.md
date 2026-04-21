[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [OAuth](../README.md) / OAuthComments

# Class: OAuthComments

Defined in: [oauth/comments.ts:10](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L10)

## Constructors

### Constructor

> **new OAuthComments**(`oauth`): `OAuthComments`

Defined in: [oauth/comments.ts:11](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L11)

#### Parameters

##### oauth

[`OAuth`](OAuth.md)

#### Returns

`OAuthComments`

## Properties

### oauth

> **oauth**: [`OAuth`](OAuth.md)

Defined in: [oauth/comments.ts:11](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L11)

## Methods

### deleteComment()

> **deleteComment**(`commentId`): `Promise`\<`void`\>

Defined in: [oauth/comments.ts:126](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L126)

Deletes a [Comment](../../Library-Exports/classes/Comment#).

#### Parameters

##### commentId

`string`

The ID of the comment to delete.

#### Returns

`Promise`\<`void`\>

***

### editComment()

> **editComment**(`commentId`, `text`): `Promise`\<[`Comment`](../../Library-Exports/classes/Comment.md)\>

Defined in: [oauth/comments.ts:65](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L65)

Edit a [Comment](../../Library-Exports/classes/Comment#) on a [Video](../../Library-Exports/classes/Video#) or [Channel](../../Library-Exports/classes/Channel#) discussion.

#### Parameters

##### commentId

`string`

The ID of the comment.

##### text

`string`

The new text content of the comment.

#### Returns

`Promise`\<[`Comment`](../../Library-Exports/classes/Comment.md)\>

***

### markCommentAsSpam()

> **markCommentAsSpam**(`commentId`): `Promise`\<`void`\>

Defined in: [oauth/comments.ts:86](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L86)

Marks a [Comment](../../Library-Exports/classes/Comment#) as spam.

#### Parameters

##### commentId

`string`

The ID of the comment to mark as spam.

#### Returns

`Promise`\<`void`\>

***

### postComment()

> **postComment**(`text`, `channelResolvable`, `videoResolvable`): `Promise`\<[`Comment`](../../Library-Exports/classes/Comment.md)\>

Defined in: [oauth/comments.ts:20](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L20)

Post a [Comment](../../Library-Exports/classes/Comment#) on a [Video](../../Library-Exports/classes/Video#) or [Channel](../../Library-Exports/classes/Channel#) discussion.

#### Parameters

##### text

`string`

The text content of the comment.

##### channelResolvable

[`ChannelResolvable`](../../Library-Exports/type-aliases/ChannelResolvable.md)

The channel to post the comment on.

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video of the channel to post the comment on.
If falsey, the comment will be posted to the channel discussion.

#### Returns

`Promise`\<[`Comment`](../../Library-Exports/classes/Comment.md)\>

***

### replyToComment()

> **replyToComment**(`commentId`, `text`): `Promise`\<[`Comment`](../../Library-Exports/classes/Comment.md)\>

Defined in: [oauth/comments.ts:46](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L46)

Replies to a [Comment](../../Library-Exports/classes/Comment#).

#### Parameters

##### commentId

`string`

The ID of the comment to reply to.

##### text

`string`

The text to reply with.
Required for [Comment.url](../../Library-Exports/classes/Comment#url) to be correct.

#### Returns

`Promise`\<[`Comment`](../../Library-Exports/classes/Comment.md)\>

***

### setCommentModerationStatus()

> **setCommentModerationStatus**(`commentId`, `moderationStatus`, `banAuthor?`): `Promise`\<`void`\>

Defined in: [oauth/comments.ts:100](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/oauth/comments.ts#L100)

Sets the moderation status of a [Comment](../../Library-Exports/classes/Comment#)

#### Parameters

##### commentId

`string`

The ID of the comment to set the moderation status of.

##### moderationStatus

`"rejected"` \| `"heldForReview"` \| `"published"`

The moderation status to set the comment to.

##### banAuthor?

`boolean`

Whether or not to ban the author from making future comments.

#### Returns

`Promise`\<`void`\>
