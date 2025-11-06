---
id: "Library_Exports.VideoRating"
title: "Documentation"
sidebar_label: "VideoRating"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).VideoRating

A YouTube [Video](./Library_Exports.Video) rating (like/dislike).

## Constructors

### constructor

• **new VideoRating**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `Schema$VideoRating` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/video-rating.ts:48](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L48)

## Properties

### data

• **data**: `any`

The raw data of this channel section.

#### Defined in

[entities/video-rating.ts:36](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L36)

___

### full

• **full**: `boolean` = `true`

Whether or not this a full channel section object.

#### Defined in

[entities/video-rating.ts:31](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L31)

___

### rating

• **rating**: ``"none"`` \| ``"like"`` \| ``"dislike"`` \| ``"unspecified"``

The rating left on this video.

#### Defined in

[entities/video-rating.ts:46](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L46)

___

### videoId

• **videoId**: `string`

The ID of the video this rating is for.

#### Defined in

[entities/video-rating.ts:41](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L41)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this channel section object.

#### Defined in

[entities/video-rating.ts:26](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videos/getRating'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video-rating.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(videoId,rating)'`

The fields to request for this entity.

#### Defined in

[entities/video-rating.ts:21](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L21)

___

### part

▪ `Static` **part**: `string` = `''`

The parts to request for this entity.

#### Defined in

[entities/video-rating.ts:16](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L16)

## Methods

### fetch

▸ **fetch**(): `Promise`\<[`VideoRating`](Library_Exports.VideoRating)\>

Fetches this video rating from the API and reassigns this object to the new rating object.
Only useful if you want updated rating info.

#### Returns

`Promise`\<[`VideoRating`](Library_Exports.VideoRating)\>

#### Defined in

[entities/video-rating.ts:76](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-rating.ts#L76)
