[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Caption

# Class: Caption

Defined in: [entities/caption.ts:7](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L7)

A caption track.

## Constructors

### Constructor

> **new Caption**(`youtube`, `data`, `full?`): `Caption`

Defined in: [entities/caption.ts:109](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L109)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$Caption`

##### full?

`boolean` = `true`

#### Returns

`Caption`

## Properties

### audioType

> **audioType**: `"unknown"` \| `"commentary"` \| `"descriptive"` \| `"primary"`

Defined in: [entities/caption.ts:71](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L71)

Whether the audio is a commentary/descriptive (alternate audio tracks), the primary audio track, or unknown.

***

### autoSynced

> **autoSynced**: `boolean`

Defined in: [entities/caption.ts:96](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L96)

Whether or not this caption track has been autosynced to the audio by YouTube.

***

### closedCaptions

> **closedCaptions**: `boolean`

Defined in: [entities/caption.ts:76](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L76)

Whether or not this caption track is for the deaf/hard of hearing.

***

### data

> **data**: `any`

Defined in: [entities/caption.ts:36](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L36)

The raw data of this caption track.

***

### draft

> **draft**: `boolean`

Defined in: [entities/caption.ts:91](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L91)

Whether or not this caption track is a draft. If so, it won't be shown to users.

***

### easyReader

> **easyReader**: `boolean`

Defined in: [entities/caption.ts:86](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L86)

Whether or not this caption track is written at a third-grade level (for language learners).

***

### failureReason?

> `optional` **failureReason?**: `"processingFailed"` \| `"unknownFormat"` \| `"unsupportedFormat"`

Defined in: [entities/caption.ts:107](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L107)

If [Caption.status](./Caption#status) is `failed`, then this is populated with the reason failure.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/caption.ts:31](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L31)

Whether or not this is a full caption track object.

***

### id

> **id**: `string`

Defined in: [entities/caption.ts:41](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L41)

The ID of this caption track.

***

### kind

> **kind**: `"standard"` \| `"ASR"` \| `"forced"`

Defined in: [entities/caption.ts:56](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L56)

The kind of caption track this is (automatic speech recognition, forced due to foreign language, or standard).

***

### language

> **language**: `string`

Defined in: [entities/caption.ts:61](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L61)

The language that this caption track is written in.

***

### large

> **large**: `boolean`

Defined in: [entities/caption.ts:81](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L81)

Whether or not this caption track uses large text for the vision-impaired.

***

### lastUpdated

> **lastUpdated**: `Date`

Defined in: [entities/caption.ts:51](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L51)

When this caption track was last updated.

***

### name

> **name**: `string`

Defined in: [entities/caption.ts:66](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L66)

The name of this caption track.

***

### status

> **status**: `"failed"` \| `"serving"` \| `"syncing"`

Defined in: [entities/caption.ts:101](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L101)

The processing status of the caption track.

***

### videoId

> **videoId**: `string`

Defined in: [entities/caption.ts:46](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L46)

The ID of the [Video](./Video#) that this caption track is for.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/caption.ts:26](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L26)

The YouTube object that created this caption track object.

***

### endpoint

> `static` **endpoint**: `string` = `'i18nRegions'`

Defined in: [entities/caption.ts:11](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L11)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(kind,id,snippet)'`

Defined in: [entities/caption.ts:21](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L21)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'snippet'`

Defined in: [entities/caption.ts:16](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L16)

The parts to request for this entity.

## Methods

### delete()

> **delete**(): `Promise`\<`void`\>

Defined in: [entities/caption.ts:180](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L180)

Deletes the caption.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`void`\>

***

### download()

> **download**(`format?`, `language?`): `Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

Defined in: [entities/caption.ts:172](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L172)

Downloads this caption's track.
Must be using an access token with correct scopes.

#### Parameters

##### format?

`"sbv"` \| `"scc"` \| `"srt"` \| `"ttml"` \| `"vtt"`

The file format to download the track in.

##### language?

`string`

The language to download the track in.

#### Returns

`Promise`\<`Buffer`\<`ArrayBufferLike`\>\>

***

### fetch()

> **fetch**(): `Promise`\<`Caption`\>

Defined in: [entities/caption.ts:150](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L150)

Fetches this caption from the API and reassigns this object to the new caption object.
Only useful if `this.full` is false, or if you want updated caption info.
Must be using an access token with correct scopes.

#### Returns

`Promise`\<`Caption`\>

***

### update()

> **update**(`track?`, `draft?`): `Promise`\<`Caption`\>

Defined in: [entities/caption.ts:161](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/caption.ts#L161)

Updates this caption.
Must be using an access token with correct scopes.

#### Parameters

##### track?

`Buffer`

The modified caption track to upload.

##### draft?

`boolean` = `null`

Whether or not the track is a draft.

#### Returns

`Promise`\<`Caption`\>
