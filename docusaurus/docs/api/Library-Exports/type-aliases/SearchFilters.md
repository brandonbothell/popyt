[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / SearchFilters

# Type Alias: SearchFilters\<T\>

> **SearchFilters**\<`T`\> = `object` & `T` *extends* *typeof* [`Video`](../classes/Video.md) ? [`VideoSearchOptions`](VideoSearchOptions.md) : `T` *extends* *typeof* [`Playlist`](../classes/Playlist.md) ? [`PlaylistSearchOptions`](PlaylistSearchOptions.md) : `T` *extends* *typeof* [`Channel`](../classes/Channel.md) ? [`ChannelSearchOptions`](ChannelSearchOptions.md) : `object`

Defined in: [types/RetrievalService.ts:98](https://github.com/brandonbothell/popyt/blob/534e5115ace99d29ee44af4839e9db8f769827fb/src/types/RetrievalService.ts#L98)

## Type Declaration

### order?

> `optional` **order?**: `"date"` \| `"rating"` \| `"relevance"` \| `"title"` \| `"videoCount"` \| `"viewCount"`

### types?

> `optional` **types?**: `T`[]

## Type Parameters

### T

`T` *extends* [`SearchType`](SearchType.md) = [`SearchType`](SearchType.md)
