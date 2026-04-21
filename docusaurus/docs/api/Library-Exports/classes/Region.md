[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Region

# Class: Region

Defined in: [entities/region.ts:7](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L7)

A region.

## Constructors

### Constructor

> **new Region**(`youtube`, `data`, `full?`): `Region`

Defined in: [entities/region.ts:53](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L53)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$I18nRegion`

##### full?

`boolean` = `true`

#### Returns

`Region`

## Properties

### data

> **data**: `any`

Defined in: [entities/region.ts:36](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L36)

The raw data of this region.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/region.ts:31](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L31)

Whether or not this is a full region object.

***

### gl

> **gl**: `string`

Defined in: [entities/region.ts:46](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L46)

The country code that uniquely identifies the region.

***

### id

> **id**: `string`

Defined in: [entities/region.ts:41](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L41)

The ID of this region.

***

### name

> **name**: `string`

Defined in: [entities/region.ts:51](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L51)

The region's name.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/region.ts:26](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L26)

The YouTube object that created this region object.

***

### endpoint

> `static` **endpoint**: `string` = `'i18nRegions'`

Defined in: [entities/region.ts:11](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L11)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(kind,id,snippet(gl,name))'`

Defined in: [entities/region.ts:21](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L21)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'snippet'`

Defined in: [entities/region.ts:16](https://github.com/brandonbothell/popyt/blob/d2c7d6853da78c625d9181889723f4cfa4f59197/src/entities/region.ts#L16)

The parts to request for this entity.
