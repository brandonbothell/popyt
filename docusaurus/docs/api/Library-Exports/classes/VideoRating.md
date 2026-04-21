[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / VideoRating

# Class: VideoRating

Defined in: [entities/video-rating.ts:7](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L7)

A YouTube [Video](./Video) rating (like/dislike).

## Constructors

### Constructor

> **new VideoRating**(`youtube`, `data`, `full?`): `VideoRating`

Defined in: [entities/video-rating.ts:48](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L48)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$VideoRating`

##### full?

`boolean` = `true`

#### Returns

`VideoRating`

## Properties

### data

> **data**: `any`

Defined in: [entities/video-rating.ts:36](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L36)

The raw data of this channel section.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/video-rating.ts:31](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L31)

Whether or not this a full channel section object.

***

### rating

> **rating**: `"none"` \| `"like"` \| `"dislike"` \| `"unspecified"`

Defined in: [entities/video-rating.ts:46](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L46)

The rating left on this video.

***

### videoId

> **videoId**: `string`

Defined in: [entities/video-rating.ts:41](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L41)

The ID of the video this rating is for.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/video-rating.ts:26](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L26)

The YouTube object that created this channel section object.

***

### endpoint

> `static` **endpoint**: `string` = `'videos/getRating'`

Defined in: [entities/video-rating.ts:11](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L11)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(videoId,rating)'`

Defined in: [entities/video-rating.ts:21](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L21)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `''`

Defined in: [entities/video-rating.ts:16](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L16)

The parts to request for this entity.

## Methods

### fetch()

> **fetch**(): `Promise`\<`VideoRating`\>

Defined in: [entities/video-rating.ts:76](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/video-rating.ts#L76)

Fetches this video rating from the API and reassigns this object to the new rating object.
Only useful if you want updated rating info.

#### Returns

`Promise`\<`VideoRating`\>
