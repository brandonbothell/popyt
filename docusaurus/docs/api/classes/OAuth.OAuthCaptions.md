---
id: "OAuth.OAuthCaptions"
title: "Documentation"
sidebar_label: "OAuthCaptions"
custom_edit_url: null
---

[OAuth](../modules/OAuth).OAuthCaptions

## Constructors

### constructor

• **new OAuthCaptions**(`oauth`)

#### Parameters

| Name | Type |
| :------ | :------ |
| `oauth` | [`OAuth`](OAuth.OAuth) |

#### Defined in

[oauth/captions.ts:12](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L12)

## Properties

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

#### Defined in

[oauth/captions.ts:12](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L12)

## Methods

### deleteCaption

▸ **deleteCaption**(`id`): `Promise`\<`void`\>

Deletes a [Caption](./Library_Exports.Caption#) track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to delete. |

#### Returns

`Promise`\<`void`\>

#### Defined in

[oauth/captions.ts:170](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L170)

___

### downloadCaption

▸ **downloadCaption**(`id`, `format?`, `language?`): `Promise`\<`Buffer`\>

Downloads a [Caption](./Library_Exports.Caption#) track.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to download. |
| `format?` | ``"sbv"`` \| ``"scc"`` \| ``"srt"`` \| ``"ttml"`` \| ``"vtt"`` | The file format to download the track in. |
| `language?` | `string` | The language to download the track in. |

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[oauth/captions.ts:145](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L145)

___

### getCaption

▸ **getCaption**(`videoResolvable`, `captionId`): `Promise`\<[`Caption`](Library_Exports.Caption)\>

Get a [Caption](./Library_Exports.Caption#) object
from the URL, ID, or search query of its video and the ID of the caption.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The Title, URL, or ID of the video to get the caption from. |
| `captionId` | `string` | The ID of the caption. |

#### Returns

`Promise`\<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth/captions.ts:20](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L20)

___

### getCaptions

▸ **getCaptions**(`videoResolvable`): `Promise`\<[`Caption`](Library_Exports.Caption)[]\>

Gets the [Caption](./Library_Exports.Caption#)s of a [Video](./Library_Exports.Video#). Used mostly internally with [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The Title, URL, or ID of the video to get the captions from. |

#### Returns

`Promise`\<[`Caption`](Library_Exports.Caption)[]\>

#### Defined in

[oauth/captions.ts:45](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L45)

___

### updateCaption

▸ **updateCaption**(`id`, `track?`, `draft?`): `Promise`\<[`Caption`](Library_Exports.Caption)\>

Edits a [Caption](./Library_Exports.Caption#) track.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` | `undefined` | The ID of the caption track to edit. |
| `track?` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `null` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`\<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth/captions.ts:101](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L101)

___

### uploadCaption

▸ **uploadCaption**(`videoResolvable`, `language`, `name`, `track`, `draft?`): `Promise`\<[`Caption`](Library_Exports.Caption)\>

Uploads a [Caption](./Library_Exports.Caption#) track for a [Video](./Library_Exports.Video#).

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | `undefined` | The video to add the caption track to. |
| `language` | `string` | `undefined` | The language that the caption track is in. |
| `name` | `string` | `undefined` | The name of the caption track. |
| `track` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `false` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`\<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth/captions.ts:69](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/oauth/captions.ts#L69)
