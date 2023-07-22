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
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/caption.ts:108](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L108)

## Properties

### audioType

• **audioType**: ``"unknown"`` \| ``"commentary"`` \| ``"descriptive"`` \| ``"primary"``

Whether the audio is a commentary/descriptive (alternate audio tracks), the primary audio track, or unknown.

#### Defined in

[entities/caption.ts:70](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L70)

___

### autoSynced

• **autoSynced**: `boolean`

Whether or not this caption track has been autosynced to the audio by YouTube.

#### Defined in

[entities/caption.ts:95](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L95)

___

### closedCaptions

• **closedCaptions**: `boolean`

Whether or not this caption track is for the deaf/hard of hearing.

#### Defined in

[entities/caption.ts:75](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L75)

___

### data

• **data**: `any`

The raw data of this caption track.

#### Defined in

[entities/caption.ts:35](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L35)

___

### draft

• **draft**: `boolean`

Whether or not this caption track is a draft. If so, it won't be shown to users.

#### Defined in

[entities/caption.ts:90](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L90)

___

### easyReader

• **easyReader**: `boolean`

Whether or not this caption track is written at a third-grade level (for language learners).

#### Defined in

[entities/caption.ts:85](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L85)

___

### failureReason

• `Optional` **failureReason**: ``"processingFailed"`` \| ``"unknownFormat"`` \| ``"unsupportedFormat"``

If [Caption.status](./Library_Exports.Caption#status) is `failed`, then this is populated with the reason failure.

#### Defined in

[entities/caption.ts:106](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L106)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full caption track object.

#### Defined in

[entities/caption.ts:30](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L30)

___

### id

• **id**: `string`

The ID of this caption track.

#### Defined in

[entities/caption.ts:40](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L40)

___

### kind

• **kind**: ``"standard"`` \| ``"ASR"`` \| ``"forced"``

The kind of caption track this is (automatic speech recognition, forced due to foreign language, or standard).

#### Defined in

[entities/caption.ts:55](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L55)

___

### language

• **language**: `string`

The language that this caption track is written in.

#### Defined in

[entities/caption.ts:60](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L60)

___

### large

• **large**: `boolean`

Whether or not this caption track uses large text for the vision-impaired.

#### Defined in

[entities/caption.ts:80](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L80)

___

### lastUpdated

• **lastUpdated**: `Date`

When this caption track was last updated.

#### Defined in

[entities/caption.ts:50](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L50)

___

### name

• **name**: `string`

The name of this caption track.

#### Defined in

[entities/caption.ts:65](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L65)

___

### status

• **status**: ``"failed"`` \| ``"serving"`` \| ``"syncing"``

The processing status of the caption track.

#### Defined in

[entities/caption.ts:100](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L100)

___

### videoId

• **videoId**: `string`

The ID of the [Video](./Library_Exports.Video#) that this caption track is for.

#### Defined in

[entities/caption.ts:45](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L45)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this caption track object.

#### Defined in

[entities/caption.ts:25](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L25)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'i18nRegions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/caption.ts:10](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L10)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet)'`

The fields to request for this entity.

#### Defined in

[entities/caption.ts:20](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L20)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/caption.ts:15](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L15)

## Methods

### delete

▸ **delete**(): `Promise`<`void`\>

Deletes the caption.
Must be using an access token with correct scopes.

#### Returns

`Promise`<`void`\>

#### Defined in

[entities/caption.ts:179](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L179)

___

### download

▸ **download**(`format?`, `language?`): `Promise`<`Buffer`\>

Downloads this caption's track.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `format?` | ``"sbv"`` \| ``"scc"`` \| ``"srt"`` \| ``"ttml"`` \| ``"vtt"`` | The file format to download the track in. |
| `language?` | `string` | The language to download the track in. |

#### Returns

`Promise`<`Buffer`\>

#### Defined in

[entities/caption.ts:171](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L171)

___

### fetch

▸ **fetch**(): `Promise`<[`Caption`](Library_Exports.Caption)\>

Fetches this caption from the API and reassigns this object to the new caption object.
Only useful if `this.full` is false, or if you want updated caption info.
Must be using an access token with correct scopes.

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[entities/caption.ts:149](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L149)

___

### update

▸ **update**(`track?`, `draft?`): `Promise`<[`Caption`](Library_Exports.Caption)\>

Updates this caption.
Must be using an access token with correct scopes.

#### Parameters

| Name | Type | Default value | Description |
| :------ | :------ | :------ | :------ |
| `track?` | `Buffer` | `undefined` | The modified caption track to upload. |
| `draft` | `boolean` | `null` | Whether or not the track is a draft. |

#### Returns

`Promise`<[`Caption`](Library_Exports.Caption)\>

#### Defined in

[entities/caption.ts:160](https://github.com/brandonbothell/popyt/blob/beeaffb/src/entities/caption.ts#L160)
