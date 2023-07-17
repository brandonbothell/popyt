---
id: "Library_Exports.Subscription"
title: "Documentation"
sidebar_label: "Subscription"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).Subscription

A YouTube subscription.

## Constructors

### constructor

• **new Subscription**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/subscription.ts:138](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L138)

## Properties

### activities

• **activities**: ``"all"`` \| ``"uploads"``

The activities that the user has subscribed to.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Defined in

[entities/subscription.ts:136](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L136)

___

### channel

• **channel**: `Object`

Information on the [Channel](./Library_Exports.Channel#) that the user subscribed to.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the channel. |
| `name` | `string` | The name of the channel. |

#### Defined in

[entities/subscription.ts:55](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L55)

___

### data

• **data**: `any`

The raw data of this subscription.

#### Defined in

[entities/subscription.ts:40](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L40)

___

### dateSubscribed

• **dateSubscribed**: `Date`

The date that the user subscribed to the channel on.

#### Defined in

[entities/subscription.ts:50](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L50)

___

### description

• **description**: `string`

The details of the subscription.

#### Defined in

[entities/subscription.ts:75](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L75)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full subscription object.

#### Defined in

[entities/subscription.ts:35](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L35)

___

### id

• **id**: `string`

The ID of this subscription.

#### Defined in

[entities/subscription.ts:45](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L45)

___

### items

• **items**: `Object`

Statistics on the items that the subscription points to.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `new` | `number` | The number of new items in the subscription. |
| `total` | `number` | The total number of items that the subscription points to. |

#### Defined in

[entities/subscription.ts:120](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L120)

___

### subscriber

• **subscriber**: `Object`

Information on the user that subscribed to the channel.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description?` | `string` | The user's description. |
| `id` | `string` | The user's ID. |
| `name?` | `string` | The user's username. |
| `thumbnails?` | { `default`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  } | Thumbnail images for the user's channel. |
| `thumbnails.default` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |
| `thumbnails.high` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |
| `thumbnails.medium` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |

#### Defined in

[entities/subscription.ts:81](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L81)

___

### thumbnails

• **thumbnails**: `Object`

Thumbnail images for the subscription.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `high` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `medium` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |

#### Defined in

[entities/subscription.ts:110](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L110)

___

### title

• **title**: `string`

The title of the subscription.

#### Defined in

[entities/subscription.ts:70](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L70)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this subscription object.

#### Defined in

[entities/subscription.ts:30](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L30)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'subscriptions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/subscription.ts:12](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L12)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/subscription.ts:22](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L22)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,subscriberSnippet'`

The parts to request for this entity.

#### Defined in

[entities/subscription.ts:17](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L17)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Fetches this subscription from the API and reassigns this object to the new subscription object.
Only useful if `this.full` is false, or if you want updated subscription info.  
**CURRENTLY NOT WORKING** unless the subscriber and channel properties are populated, see https://issuetracker.google.com/issues/288609601

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[entities/subscription.ts:192](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L192)

___

### getChannel

▸ **getChannel**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/subscription.ts:203](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L203)

___

### getSubscriber

▸ **getSubscriber**(`parts?`): `Promise`<[`Channel`](Library_Exports.Channel)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/subscription.ts:208](https://github.com/brandonbothell/popyt/blob/f59765a/src/entities/subscription.ts#L208)
