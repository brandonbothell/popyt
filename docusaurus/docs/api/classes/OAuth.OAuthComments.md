---
id: "OAuth.OAuthComments"
title: "Documentation"
sidebar_label: "OAuthComments"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuthComments

## Constructors

### constructor

• **new OAuthComments**(`oauth`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oauth` | [`OAuth`](OAuth.OAuth) |

#### Defined in

[oauth/comments.ts:10](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L10)

## Properties

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

#### Defined in

[oauth/comments.ts:10](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L10)

## Methods

### deleteComment

▸ **deleteComment**(`commentId`): `Promise`<`void`\>

Deletes a [Comment](./Library_Exports.Comment#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type |
| :------ | :------ |
| `commentId` | `string` |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth/comments.ts:131](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L131)

___

### editComment

▸ **editComment**(`commentId`, `text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Edit a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
Last tested 07/05/2021 17:40. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment. |
| `text` | `string` | The new text content of the comment. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[oauth/comments.ts:67](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L67)

___

### markCommentAsSpam

▸ **markCommentAsSpam**(`commentId`): `Promise`<`void`\>

Marks a [Comment](./Library_Exports.Comment#) as spam.  
Last tested NEVER

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to mark as spam. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth/comments.ts:89](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L89)

___

### postComment

▸ **postComment**(`text`, `channelResolvable`, `videoResolvable`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Post a [Comment](./Library_Exports.Comment#) on a [Video](./Library_Exports.Video#) or [Channel](./Library_Exports.Channel#) discussion.  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `text` | `string` | The text content of the comment. |
| `channelResolvable` | [`ChannelResolvable`](../modules/Library_Exports#channelresolvable) | The channel to post the comment on. |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The video of the channel to post the comment on. If falsey, the comment will be posted to the channel discussion. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[oauth/comments.ts:20](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L20)

___

### replyToComment

▸ **replyToComment**(`commentId`, `text`): `Promise`<[`Comment`](Library_Exports.Comment)\>

Replies to a [Comment](./Library_Exports.Comment#).  
Last tested 05/18/2020 11:48. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `commentId` | `string` | The ID of the comment to reply to. |
| `text` | `string` | The text to reply with. Required for [Comment.url](./Library_Exports.Comment#url) to be correct. |

#### Returns

`Promise`<[`Comment`](Library_Exports.Comment)\>

#### Defined in

[oauth/comments.ts:47](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L47)

___

### setCommentModerationStatus

▸ **setCommentModerationStatus**(`commentId`, `moderationStatus`, `banAuthor?`): `Promise`<`void`\>

Sets the moderation status of a [Comment](./Library_Exports.Comment#)  
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

[oauth/comments.ts:104](https://github.com/brandonbothell/popyt/blob/1e16df9/src/oauth/comments.ts#L104)
