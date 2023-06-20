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

[entities/subscription.ts:139](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L139)

## Properties

### activities

• **activities**: ``"all"`` \| ``"uploads"``

The activities that the user has subscribed to.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Defined in

[entities/subscription.ts:137](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L137)

___

### channel

• **channel**: `Object`

Information on the [[Channel]] that the user subscribed to.

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `id` | `string` | The ID of the channel. |
| `name` | `string` | The name of the channel. |

#### Defined in

[entities/subscription.ts:53](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L53)

___

### data

• **data**: `any`

The raw data of this subscription.

#### Defined in

[entities/subscription.ts:38](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L38)

___

### dateSubscribed

• **dateSubscribed**: `Date`

The date that the user subscribed to the channel on.

#### Defined in

[entities/subscription.ts:48](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L48)

___

### description

• **description**: `string`

The details of the subscription.

#### Defined in

[entities/subscription.ts:73](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L73)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full subscription object.

#### Defined in

[entities/subscription.ts:33](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L33)

___

### id

• **id**: `string`

The ID of this subscription.

#### Defined in

[entities/subscription.ts:43](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L43)

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

[entities/subscription.ts:120](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L120)

___

### subscriber

• **subscriber**: `Object`

Information on the user that subscribed to the channel.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `description` | `string` | The user's description. |
| `id` | `string` | The user's ID. |
| `name` | `string` | The user's username. |
| `thumbnails` | { `default`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `high`: [`Thumbnail`](../modules/Library_Exports#thumbnail) ; `medium`: [`Thumbnail`](../modules/Library_Exports#thumbnail)  } | Thumbnail images for the user's channel. |
| `thumbnails.default` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |
| `thumbnails.high` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |
| `thumbnails.medium` | [`Thumbnail`](../modules/Library_Exports#thumbnail) | - |

#### Defined in

[entities/subscription.ts:80](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L80)

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

[entities/subscription.ts:109](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L109)

___

### title

• **title**: `string`

The title of the subscription.

#### Defined in

[entities/subscription.ts:68](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L68)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this subscription object.

#### Defined in

[entities/subscription.ts:28](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L28)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'subscriptions'`

The name of the endpoint used for this entity.

#### Defined in

[entities/subscription.ts:12](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L12)

___

### fields

▪ `Static` **fields**: `string`

The fields to request for this entity.

#### Defined in

[entities/subscription.ts:22](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L22)

___

### part

▪ `Static` **part**: `string` = `'snippet,contentDetails,subscriberSnippet'`

The parts to request for this entity.

#### Defined in

[entities/subscription.ts:17](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L17)

## Methods

### fetch

▸ **fetch**(`parts?`): `Promise`<[`Subscription`](Library_Exports.Subscription)\>

Fetches this subscription and reassigns this object to the new subscription object.
Only useful if `this.full` is false, or if you want updated subscription info.  
**CURRENTLY NOT WORKING**, see https://issuetracker.google.com/issues/181152600

#### Parameters

| Name | Type |
| :------ | :------ |
| `parts?` | [`SubscriptionParts`](../modules/Library_Exports#subscriptionparts) |

#### Returns

`Promise`<[`Subscription`](Library_Exports.Subscription)\>

#### Defined in

[entities/subscription.ts:200](https://github.com/brandonbothell/popyt/blob/eaea722/src/entities/subscription.ts#L200)
