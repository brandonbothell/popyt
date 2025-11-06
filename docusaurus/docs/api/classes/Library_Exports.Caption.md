---
id: "Library_Exports.Caption"
title: "Documentation"
sidebar_label: "Caption"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Caption

A caption track.

## Constructors

### constructor

• **new Caption**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `Schema$Caption` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/caption.ts:109](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L109)

## Properties

### audioType

• **audioType**: ``"unknown"`` \| ``"commentary"`` \| ``"descriptive"`` \| ``"primary"``

Whether the audio is a commentary/descriptive (alternate audio tracks), the primary audio track, or unknown.

#### Defined in

[entities/caption.ts:71](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L71)

___

### autoSynced

• **autoSynced**: `boolean`

Whether or not this caption track has been autosynced to the audio by YouTube.

#### Defined in

[entities/caption.ts:96](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L96)

___

### closedCaptions

• **closedCaptions**: `boolean`

Whether or not this caption track is for the deaf/hard of hearing.

#### Defined in

[entities/caption.ts:76](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L76)

___

### data

• **data**: `any`

The raw data of this caption track.

#### Defined in

[entities/caption.ts:36](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L36)

___

### draft

• **draft**: `boolean`

Whether or not this caption track is a draft. If so, it won't be shown to users.

#### Defined in

[entities/caption.ts:91](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L91)

___

### easyReader

• **easyReader**: `boolean`

Whether or not this caption track is written at a third-grade level (for language learners).

#### Defined in

[entities/caption.ts:86](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L86)

___

### failureReason

• `Optional` **failureReason**: ``"processingFailed"`` \| ``"unknownFormat"`` \| ``"unsupportedFormat"``

If [Caption.status](./Library_Exports.Caption#status) is `failed`, then this is populated with the reason failure.

#### Defined in

[entities/caption.ts:107](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L107)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full caption track object.

#### Defined in

[entities/caption.ts:31](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L31)

___

### id

• **id**: `string`

The ID of this caption track.

#### Defined in

[entities/caption.ts:41](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L41)

___

### kind

• **kind**: ``"standard"`` \| ``"ASR"`` \| ``"forced"``

The kind of caption track this is (automatic speech recognition, forced due to foreign language, or standard).

#### Defined in

[entities/caption.ts:56](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L56)

___

### language

• **language**: `string`

The language that this caption track is written in.

#### Defined in

[entities/caption.ts:61](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L61)

___

### large

• **large**: `boolean`

Whether or not this caption track uses large text for the vision-impaired.

#### Defined in

[entities/caption.ts:81](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L81)

___

### lastUpdated

• **lastUpdated**: `Date`

When this caption track was last updated.

#### Defined in

[entities/caption.ts:51](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L51)

___

### name

• **name**: `string`

The name of this caption track.

#### Defined in

[entities/caption.ts:66](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L66)

___

### status

• **status**: ``"failed"`` \| ``"serving"`` \| ``"syncing"``

The processing status of the caption track.

#### Defined in

[entities/caption.ts:101](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L101)

___

### videoId

• **videoId**: `string`

The ID of the [Video](./Library_Exports.Video#) that this caption track is for.

#### Defined in

[entities/caption.ts:46](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L46)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this caption track object.

#### Defined in

[entities/caption.ts:26](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'i18nRegions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/caption.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet)'`

The fields to request for this entity.

#### Defined in

[entities/caption.ts:21](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/caption.ts:16](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L16)

## Methods

### delete

▸ **delete**(): `Promise`\<`void`\>

Deletes the caption.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

#### Defined in

[entities/caption.ts:180](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L180)

___

### download

▸ **download**(`format?`, `language?`): `Promise`\<`Buffer`\>

Downloads this caption's track.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `format?` | ``"sbv"`` \| ``"scc"`` \| ``"srt"`` \| ``"ttml"`` \| ``"vtt"`` | The file format to download the track in. |
| `language?` | `string` | The language to download the track in. |

#### Returns

`Promise`\<`Buffer`\>

#### Defined in

[entities/caption.ts:172](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L172)

___

### fetch

▸ **fetch**(): `Promise`\<[`Caption`](Library_Exports.Caption)\>

Fetches this caption from the API and reassigns this object to the new caption object.
Only useful if `this.full` is false, or if you want updated caption info.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[entities/caption.ts:150](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L150)

___

### update

▸ **update**(`track?`, `draft?`): `Promise`\<[`Caption`](Library_Exports.Caption)\>

Updates this caption.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `track?` | `Buffer` | `undefined` | The modified caption track to upload. |
| `draft` | `boolean` | `null` | Whether or not the track is a draft. |

#### Returns

`Promise`\<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[entities/caption.ts:161](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/caption.ts#L161)
