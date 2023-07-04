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

[oauth/captions.ts:10](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L10)

## Properties

### oauth

• **oauth**: [`OAuth`](OAuth.OAuth)

#### Defined in

[oauth/captions.ts:10](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L10)

## Methods

### deleteCaption

▸ **deleteCaption**(`id`): `Promise`<`void`\>

Deletes a [Caption](./Library_Exports.Caption#) track.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to delete. |

#### Returns

`Promise`<`void`\>

#### Defined in

[oauth/captions.ts:166](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L166)

___

### downloadCaption

▸ **downloadCaption**(`id`, `format?`, `language?`): `Promise`<`Buffer`\>

Downloads a [Caption](./Library_Exports.Caption#) track.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the caption track to download. |
| `format?` | ``"sbv"`` \| ``"scc"`` \| ``"srt"`` \| ``"ttml"`` \| ``"vtt"`` | The file format to download the track in. |
| `language?` | `string` | The language to download the track in. |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[oauth/captions.ts:142](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L142)

___

### getCaption

▸ **getCaption**(`videoResolvable`, `captionId`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Get a [Caption](./Library_Exports.Caption#) object from the ID of the caption.  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The Title, URL, or ID of the video to get the caption from. |
| `captionId` | `string` | The ID of the caption. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth/captions.ts:18](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L18)

___

### getCaptions

▸ **getCaptions**(`videoResolvable`): `Promise`<[`Caption`](Library_Exports.Caption)[]\>

Gets the [Caption](./Library_Exports.Caption#)s of a [Video](./Library_Exports.Video#). Used mostly internally with [Video.fetchCaptions](./Library_Exports.Video#fetchCaptions).  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | The Title, URL, or ID of the video to get the captions from. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)[]\>

#### Defined in

[oauth/captions.ts:39](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L39)

___

### updateCaption

▸ **updateCaption**(`id`, `track?`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Edits a [Caption](./Library_Exports.Caption#) track.  
**If your request does not specify a value for a property that already has a value,
the property's existing value will be deleted.**  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `id` | `string` | `undefined` | The ID of the caption track to edit. |
| `track?` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `null` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth/captions.ts:97](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L97)

___

### uploadCaption

▸ **uploadCaption**(`videoResolvable`, `language`, `name`, `track`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Uploads a [Caption](./Library_Exports.Caption#) track for a [Video](./Library_Exports.Video#).  
Last tested 06/11/2020 04:50. PASSING

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `videoResolvable` | [`VideoResolvable`](../modules/Library_Exports#videoresolvable) | `undefined` | The video to add the caption track to. |
| `language` | `string` | `undefined` | The language that the caption track is in. |
| `name` | `string` | `undefined` | The name of the caption track. |
| `track` | `Buffer` | `undefined` | The caption track to upload. |
| `draft` | `boolean` | `false` | Whether or not the caption track is a draft. If it is, it isn't visible to users. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[oauth/captions.ts:64](https://github.com/brandonbothell/popyt/blob/a9cf019/src/oauth/captions.ts#L64)
