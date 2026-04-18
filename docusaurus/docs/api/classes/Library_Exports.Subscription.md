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
| `data` | `Schema$Subscription` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/subscription.ts:139](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L139)

## Properties

### activities

• **activities**: ``"all"`` \| ``"uploads"``

The activities that the user has subscribed to.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Defined in

[entities/subscription.ts:137](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L137)

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

[entities/subscription.ts:56](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L56)

___

### data

• **data**: `any`

The raw data of this subscription.

#### Defined in

[entities/subscription.ts:41](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L41)

___

### dateSubscribed

• **dateSubscribed**: `Date`

The date that the user subscribed to the channel on.

#### Defined in

[entities/subscription.ts:51](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L51)

___

### description

• **description**: `string`

The details of the subscription.

#### Defined in

[entities/subscription.ts:76](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L76)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full subscription object.

#### Defined in

[entities/subscription.ts:36](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L36)

___

### id

• **id**: `string`

The ID of this subscription.

#### Defined in

[entities/subscription.ts:46](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L46)

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

[entities/subscription.ts:121](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L121)

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
| `thumbnails?` | \{ `default?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high?`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium?`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  } | Thumbnail images for the user's channel. |
| `thumbnails.default?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |
| `thumbnails.high?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |
| `thumbnails.medium?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |

#### Defined in

[entities/subscription.ts:82](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L82)

___

### thumbnails

• **thumbnails**: `Object`

Thumbnail images for the subscription.

#### Type declaration

| Name | Type |
| :------ | :------ |
| `default?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `high?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |
| `medium?` | [`Thumbnail`](../modules/Library_Exports#thumbnail) |

#### Defined in

[entities/subscription.ts:111](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L111)

___

### title

• **title**: `string`

The title of the subscription.

#### Defined in

[entities/subscription.ts:71](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L71)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this subscription object.

#### Defined in

[entities/subscription.ts:31](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L31)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'subscriptions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/subscription.ts:13](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L13)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/subscription.ts:23](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L23)

___

### part

▪ `Static` **part**: `string` = `'contentDetails,snippet,subscriberSnippet'`

The parts to request for this entity.

#### Defined in

[entities/subscription.ts:18](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L18)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`\<[`Subscription`](Library_Exports.Subscription)\>

Fetches this subscription from the API and reassigns this object to the new subscription object.
Only useful if `this.full` is false, or if you want updated subscription info.  
**CURRENTLY NOT WORKING** unless the subscriber and channel properties are populated,
see https://issuetracker.google.com/issues/288609601

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) |

#### Returns

`Promise`\<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[entities/subscription.ts:194](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L194)

___

### getChannel

▸ **getChannel**(`parts?`): `Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/subscription.ts:207](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L207)

___

### getSubscriber

▸ **getSubscriber**(`parts?`): `Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`ChannelParts`](../modules/Library_Exports#channelparts) |

#### Returns

`Promise`\<[`Channel`](Library_Exports.Channel)\>

#### Defined in

[entities/subscription.ts:212](https://github.com/brandonbothell/popyt/blob/9c8a38f/src/entities/subscription.ts#L212)
