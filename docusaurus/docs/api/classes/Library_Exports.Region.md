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
| `data` | `Schema$I18nRegion` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/region.ts:53](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L53)

## Properties

### data

• **data**: `any`

The raw data of this region.

#### Defined in

[entities/region.ts:36](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L36)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full region object.

#### Defined in

[entities/region.ts:31](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L31)

___

### gl

• **gl**: `string`

The country code that uniquely identifies the region.

#### Defined in

[entities/region.ts:46](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L46)

___

### id

• **id**: `string`

The ID of this region.

#### Defined in

[entities/region.ts:41](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L41)

___

### name

• **name**: `string`

The region's name.

#### Defined in

[entities/region.ts:51](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L51)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this region object.

#### Defined in

[entities/region.ts:26](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'i18nRegions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/region.ts:11](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(gl,name))'`

The fields to request for this entity.

#### Defined in

[entities/region.ts:21](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/region.ts:16](https://github.com/brandonbothell/popyt/blob/b03ac36/src/entities/region.ts#L16)
