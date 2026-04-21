[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / Subscription

# Class: Subscription

Defined in: [entities/subscription.ts:9](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L9)

A YouTube subscription.

## Constructors

### Constructor

> **new Subscription**(`youtube`, `data`, `full?`): `Subscription`

Defined in: [entities/subscription.ts:139](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L139)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$Subscription`

##### full?

`boolean` = `true`

#### Returns

`Subscription`

## Properties

### activities

> **activities**: `"all"` \| `"uploads"`

Defined in: [entities/subscription.ts:137](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L137)

The activities that the user has subscribed to.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

***

### channel

> **channel**: `object`

Defined in: [entities/subscription.ts:56](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L56)

Information on the [Channel](./Library_Exports.Channel#) that the user subscribed to.

#### id

> **id**: `string`

The ID of the channel.

#### name

> **name**: `string`

The name of the channel.

***

### data

> **data**: `any`

Defined in: [entities/subscription.ts:41](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L41)

The raw data of this subscription.

***

### dateSubscribed

> **dateSubscribed**: `Date`

Defined in: [entities/subscription.ts:51](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L51)

The date that the user subscribed to the channel on.

***

### description

> **description**: `string`

Defined in: [entities/subscription.ts:76](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L76)

The details of the subscription.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/subscription.ts:36](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L36)

Whether or not this is a full subscription object.

***

### id

> **id**: `string`

Defined in: [entities/subscription.ts:46](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L46)

The ID of this subscription.

***

### items

> **items**: `object`

Defined in: [entities/subscription.ts:121](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L121)

Statistics on the items that the subscription points to.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### new

> **new**: `number`

The number of new items in the subscription.

#### total

> **total**: `number`

The total number of items that the subscription points to.

***

### subscriber

> **subscriber**: `object`

Defined in: [entities/subscription.ts:82](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L82)

Information on the user that subscribed to the channel.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### description?

> `optional` **description?**: `string`

The user's description.

#### id

> **id**: `string`

The user's ID.

#### name?

> `optional` **name?**: `string`

The user's username.

#### thumbnails?

> `optional` **thumbnails?**: `object`

Thumbnail images for the user's channel.

##### thumbnails.default?

> `optional` **default?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

##### thumbnails.high?

> `optional` **high?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

##### thumbnails.medium?

> `optional` **medium?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

***

### thumbnails

> **thumbnails**: `object`

Defined in: [entities/subscription.ts:111](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L111)

Thumbnail images for the subscription.

#### default?

> `optional` **default?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### high?

> `optional` **high?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

#### medium?

> `optional` **medium?**: [`Thumbnail`](../type-aliases/Thumbnail.md)

***

### title

> **title**: `string`

Defined in: [entities/subscription.ts:71](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L71)

The title of the subscription.

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/subscription.ts:31](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L31)

The YouTube object that created this subscription object.

***

### endpoint

> `static` **endpoint**: `string` = `'subscriptions'`

Defined in: [entities/subscription.ts:13](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L13)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string`

Defined in: [entities/subscription.ts:23](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L23)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'contentDetails,snippet,subscriberSnippet'`

Defined in: [entities/subscription.ts:18](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L18)

The parts to request for this entity.

## Methods

### fetch()

> **fetch**(`parts?`): `Promise`\<`Subscription`\>

Defined in: [entities/subscription.ts:194](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L194)

Fetches this subscription from the API and reassigns this object to the new subscription object.
Only useful if `this.full` is false, or if you want updated subscription info.  
**CURRENTLY NOT WORKING** unless the subscriber and channel properties are populated,
see https://issuetracker.google.com/issues/288609601

#### Parameters

##### parts?

[`SubscriptionParts`](../type-aliases/SubscriptionParts.md)

#### Returns

`Promise`\<`Subscription`\>

***

### getChannel()

> **getChannel**(`parts?`): `Promise`\<[`Channel`](Channel.md)\>

Defined in: [entities/subscription.ts:207](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L207)

#### Parameters

##### parts?

[`ChannelParts`](../type-aliases/ChannelParts.md)

#### Returns

`Promise`\<[`Channel`](Channel.md)\>

***

### getSubscriber()

> **getSubscriber**(`parts?`): `Promise`\<[`Channel`](Channel.md)\>

Defined in: [entities/subscription.ts:212](https://github.com/brandonbothell/popyt/blob/c844ccc6eb54053a0787030e23d6e19a0eb28735/src/entities/subscription.ts#L212)

#### Parameters

##### parts?

[`ChannelParts`](../type-aliases/ChannelParts.md)

#### Returns

`Promise`\<[`Channel`](Channel.md)\>
