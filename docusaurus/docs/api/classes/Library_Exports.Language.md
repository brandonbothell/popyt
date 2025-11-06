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
| `data` | `Schema$I18nLanguage` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/language.ts:53](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L53)

## Properties

### data

• **data**: `any`

The raw data of this language.

#### Defined in

[entities/language.ts:36](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L36)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full language object.

#### Defined in

[entities/language.ts:31](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L31)

___

### hl

• **hl**: `string`

The language code that uniquely identifies the language.

#### Defined in

[entities/language.ts:46](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L46)

___

### id

• **id**: `string`

The ID of this language.

#### Defined in

[entities/language.ts:41](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L41)

___

### name

• **name**: `string`

The language's name.

#### Defined in

[entities/language.ts:51](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L51)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this language object.

#### Defined in

[entities/language.ts:26](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'i18nLanguages'`

The name of the endpoint used for this entity.

#### Defined in

[entities/language.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(hl,name))'`

The fields to request for this entity.

#### Defined in

[entities/language.ts:21](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/language.ts:16](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/language.ts#L16)
