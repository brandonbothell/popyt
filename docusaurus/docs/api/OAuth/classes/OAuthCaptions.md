[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [OAuth](../README.md) / OAuthCaptions

# Class: OAuthCaptions

Defined in: [oauth/captions.ts:11](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L11)

## Constructors

### Constructor

> **new OAuthCaptions**(`oauth`): `OAuthCaptions`

Defined in: [oauth/captions.ts:12](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L12)

#### Parameters

##### oauth

[`OAuth`](OAuth.md)

#### Returns

`OAuthCaptions`

## Properties

### oauth

> **oauth**: [`OAuth`](OAuth.md)

Defined in: [oauth/captions.ts:12](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L12)

## Methods

### deleteCaption()

> **deleteCaption**(`id`): `Promise`\<`void`\>

Defined in: [oauth/captions.ts:170](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L170)

Deletes a [Caption](../../Library-Exports/classes/Caption#) track.

#### Parameters

##### id

`string`

The ID of the caption track to delete.

#### Returns

`Promise`\<`void`\>

***

### downloadCaption()

> **downloadCaption**(`id`, `format?`, `language?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [oauth/captions.ts:145](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L145)

Downloads a [Caption](../../Library-Exports/classes/Caption#) track.

#### Parameters

##### id

`string`

The ID of the caption track to download.

##### format?

`"sbv"` \| `"scc"` \| `"srt"` \| `"ttml"` \| `"vtt"`

The file format to download the track in.

##### language?

`string`

The language to download the track in.

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

***

### getCaption()

> **getCaption**(`videoResolvable`, `captionId`): `Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)\>

Defined in: [oauth/captions.ts:20](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L20)

Get a [Caption](../../Library-Exports/classes/Caption#) object
from the URL, ID, or search query of its video and the ID of the caption.

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The Title, URL, or ID of the video to get the caption from.

##### captionId

`string`

The ID of the caption.

#### Returns

`Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)\>

***

### getCaptions()

> **getCaptions**(`videoResolvable`): `Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)[]\>

Defined in: [oauth/captions.ts:45](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L45)

Gets the [Caption](../../Library-Exports/classes/Caption#)s of a [Video](../../Library-Exports/classes/Video#). Used mostly internally with [Video.fetchCaptions](../../Library-Exports/classes/Video#fetchcaptions).

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The Title, URL, or ID of the video to get the captions from.

#### Returns

`Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)[]\>

***

### updateCaption()

> **updateCaption**(`id`, `track?`, `draft?`): `Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)\>

Defined in: [oauth/captions.ts:101](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L101)

Edits a [Caption](../../Library-Exports/classes/Caption#) track.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

##### id

`string`

The ID of the caption track to edit.

##### track?

`Buffer`

The caption track to upload.

##### draft?

`boolean` = `null`

Whether or not the caption track is a draft. If it is, it isn't visible to users.

#### Returns

`Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)\>

***

### uploadCaption()

> **uploadCaption**(`videoResolvable`, `language`, `name`, `track`, `draft?`): `Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)\>

Defined in: [oauth/captions.ts:69](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/oauth/captions.ts#L69)

Uploads a [Caption](../../Library-Exports/classes/Caption#) track for a [Video](../../Library-Exports/classes/Video#).

#### Parameters

##### videoResolvable

[`VideoResolvable`](../../Library-Exports/type-aliases/VideoResolvable.md)

The video to add the caption track to.

##### language

`string`

The language that the caption track is in.

##### name

`string`

The name of the caption track.

##### track

`Buffer`

The caption track to upload.

##### draft?

`boolean` = `false`

Whether or not the caption track is a draft. If it is, it isn't visible to users.

#### Returns

`Promise`\<[`Caption`](../../Library-Exports/classes/Caption.md)\>
