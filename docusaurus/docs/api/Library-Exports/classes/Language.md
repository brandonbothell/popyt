[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Language

# Class: Language

Defined in: [entities/language.ts:7](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L7)

A language.

## Constructors

### Constructor

> **new Language**(`youtube`, `data`, `full?`): `Language`

Defined in: [entities/language.ts:53](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L53)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$I18nLanguage`

##### full?

`boolean` = `true`

#### Returns

`Language`

## Properties

### data

> **data**: `any`

Defined in: [entities/language.ts:36](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L36)

The raw data of this language.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/language.ts:31](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L31)

Whether or not this is a full language object.

***

### hl

> **hl**: `string`

Defined in: [entities/language.ts:46](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L46)

The language code that uniquely identifies the language.

***

### id

> **id**: `string`

Defined in: [entities/language.ts:41](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L41)

The ID of this language.

***

### name

> **name**: `string`

Defined in: [entities/language.ts:51](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L51)

The language's name.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/language.ts:26](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L26)

The YouTube object that created this language object.

***

### endpoint

> `static` **endpoint**: `string` = `'i18nLanguages'`

Defined in: [entities/language.ts:11](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L11)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(kind,id,snippet(hl,name))'`

Defined in: [entities/language.ts:21](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L21)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'snippet'`

Defined in: [entities/language.ts:16](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/entities/language.ts#L16)

The parts to request for this entity.
