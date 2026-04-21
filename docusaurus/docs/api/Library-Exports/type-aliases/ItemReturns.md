[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / ItemReturns

# Type Alias: ItemReturns\<T, K, M\>

> **ItemReturns**\<`T`, `K`, `M`\> = `M` *extends* `true` ? `InstanceType`\<`K`\> : `T` *extends* `any`[] ? `InstanceType`\<`K`\>[] : `InstanceType`\<`K`\>

Defined in: [types/RetrievalService.ts:13](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/types/RetrievalService.ts#L13)

## Type Parameters

### T

`T` *extends* `any` \| `any`[]

### K

`K` *extends* [`ItemTypes`](ItemTypes.md)

### M

`M` *extends* `boolean`
