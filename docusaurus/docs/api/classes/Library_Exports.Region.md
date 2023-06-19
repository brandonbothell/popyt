---
id: "Library_Exports.Region"
title: "Documentation"
sidebar_label: "Region"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Region

A region.

## Constructors

### constructor

• **new Region**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/region.ts:52](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L52)

## Properties

### data

• **data**: `any`

The raw data of this region.

#### Defined in

[entities/region.ts:35](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L35)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full region object.

#### Defined in

[entities/region.ts:30](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L30)

___

### gl

• **gl**: `string`

The country code that uniquely identifies the region.

#### Defined in

[entities/region.ts:45](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L45)

___

### id

• **id**: `string`

The ID of this region.

#### Defined in

[entities/region.ts:40](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L40)

___

### name

• **name**: `string`

The region's name.

#### Defined in

[entities/region.ts:50](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L50)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this region object.

#### Defined in

[entities/region.ts:25](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L25)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'i18nRegions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/region.ts:10](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L10)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(gl,name))'`

The fields to request for this entity.

#### Defined in

[entities/region.ts:20](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L20)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/region.ts:15](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/region.ts#L15)
