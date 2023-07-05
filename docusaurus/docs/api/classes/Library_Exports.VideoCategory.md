---
id: "Library_Exports.VideoCategory"
title: "Documentation"
sidebar_label: "VideoCategory"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).VideoCategory

A YouTube [Video](./Library_Exports.Video#) category.

## Constructors

### constructor

• **new VideoCategory**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/video-category.ts:57](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L57)

## Properties

### assignable

• **assignable**: `boolean`

Whether or not videos can be associated with the category.

#### Defined in

[entities/video-category.ts:55](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L55)

___

### channelId

• **channelId**: `string`

The [Channel](./Library_Exports.Channel#) that created the category.

#### Defined in

[entities/video-category.ts:45](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L45)

___

### data

• **data**: `any`

The raw data of this category.

#### Defined in

[entities/video-category.ts:35](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L35)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full category object.

#### Defined in

[entities/video-category.ts:30](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L30)

___

### id

• **id**: `string`

The ID of this category.

#### Defined in

[entities/video-category.ts:40](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L40)

___

### title

• **title**: `string`

The category's title.

#### Defined in

[entities/video-category.ts:50](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L50)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this category object.

#### Defined in

[entities/video-category.ts:25](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L25)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videoCategories'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video-category.ts:10](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L10)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(channelId,title,assignable))'`

The fields to request for this entity.

#### Defined in

[entities/video-category.ts:20](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L20)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/video-category.ts:15](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L15)

## Methods

### fetch

▸ **fetch**(): `Promise`<[`VideoCategory`](Library_Exports.VideoCategory)\>

Fetches this category from the API and reassigns this object to the new category object.
Only useful if `this.full` is false, or if you want updated category info.

#### Returns

`Promise`<[`VideoCategory`](Library_Exports.VideoCategory)\>

#### Defined in

[entities/video-category.ts:87](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L87)

___

### getChannel

▸ **getChannel**(): `Promise`<[`Channel`](Library_Exports.Channel)\>

Fetches the channel associated with this category from the API.

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/video-category.ts:95](https://github.com/brandonbothell/popyt/blob/1e16df9/src/entities/video-category.ts#L95)
