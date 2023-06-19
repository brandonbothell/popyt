---
id: "Library_Exports.Language"
title: "Documentation"
sidebar_label: "Language"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Language

A language.

## Constructors

### constructor

• **new Language**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/language.ts:52](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L52)

## Properties

### data

• **data**: `any`

The raw data of this language.

#### Defined in

[entities/language.ts:35](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L35)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full language object.

#### Defined in

[entities/language.ts:30](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L30)

___

### hl

• **hl**: `string`

The language code that uniquely identifies the language.

#### Defined in

[entities/language.ts:45](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L45)

___

### id

• **id**: `string`

The ID of this language.

#### Defined in

[entities/language.ts:40](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L40)

___

### name

• **name**: `string`

The language's name.

#### Defined in

[entities/language.ts:50](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L50)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this language object.

#### Defined in

[entities/language.ts:25](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L25)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'i18nLanguages'`

The name of the endpoint used for this entity.

#### Defined in

[entities/language.ts:10](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L10)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(hl,name))'`

The fields to request for this entity.

#### Defined in

[entities/language.ts:20](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L20)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/language.ts:15](https://github.com/brandonbothell/popyt/blob/f2a9a66/src/entities/language.ts#L15)
