[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / VideoCategory

# Class: VideoCategory

Defined in: [entities/video-category.ts:7](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L7)

A YouTube [Video](./Video#) category.

## Constructors

### Constructor

> **new VideoCategory**(`youtube`, `data`, `full?`): `VideoCategory`

Defined in: [entities/video-category.ts:58](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L58)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$VideoCategory`

##### full?

`boolean` = `true`

#### Returns

`VideoCategory`

## Properties

### assignable

> **assignable**: `boolean`

Defined in: [entities/video-category.ts:56](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L56)

Whether or not videos can be associated with the category.

***

### channelId

> **channelId**: `string`

Defined in: [entities/video-category.ts:46](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L46)

The [Channel](./Channel#) that created the category.

***

### data

> **data**: `any`

Defined in: [entities/video-category.ts:36](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L36)

The raw data of this category.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/video-category.ts:31](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L31)

Whether or not this is a full category object.

***

### id

> **id**: `string`

Defined in: [entities/video-category.ts:41](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L41)

The ID of this category.

***

### title

> **title**: `string`

Defined in: [entities/video-category.ts:51](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L51)

The category's title.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/video-category.ts:26](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L26)

The YouTube object that created this category object.

***

### endpoint

> `static` **endpoint**: `string` = `'videoCategories'`

Defined in: [entities/video-category.ts:11](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L11)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(kind,id,snippet(channelId,title,assignable))'`

Defined in: [entities/video-category.ts:21](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L21)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'snippet'`

Defined in: [entities/video-category.ts:16](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L16)

The parts to request for this entity.

## Methods

### fetch()

> **fetch**(): `Promise`\<`VideoCategory`\>

Defined in: [entities/video-category.ts:88](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L88)

Fetches this category from the API and reassigns this object to the new category object.
Only useful if `this.full` is false, or if you want updated category info.

#### Returns

`Promise`\<`VideoCategory`\>

***

### getChannel()

> **getChannel**(): `Promise`\<[`Channel`](Channel.md)\>

Defined in: [entities/video-category.ts:96](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-category.ts#L96)

Fetches the channel associated with this category from the API.

#### Returns

`Promise`\<[`Channel`](Channel.md)\>
