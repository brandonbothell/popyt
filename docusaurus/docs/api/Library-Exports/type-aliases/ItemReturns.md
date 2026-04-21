[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / ItemReturns

# Type Alias: ItemReturns\<T, K, M\>

> **ItemReturns**\<`T`, `K`, `M`\> = `M` *extends* `true` ? `InstanceType`\<`K`\> : `T` *extends* `any`[] ? `InstanceType`\<`K`\>[] : `InstanceType`\<`K`\>

Defined in: [types/RetrievalService.ts:13](https://github.com/brandonbothell/popyt/blob/28b3359c23f3ee4335c0cd8622d9ed35c5164361/src/types/RetrievalService.ts#L13)

## Type Parameters

### T

`T` *extends* `any` \| `any`[]

### K

`K` *extends* [`ItemTypes`](ItemTypes.md)

### M

`M` *extends* `boolean`
