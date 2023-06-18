---
id: "Library_Exports.VideoAbuseReportReason"
title: "Documentation"
sidebar_label: "VideoAbuseReportReason"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).VideoAbuseReportReason

A YouTube [[Video]] abuse report reason.

## Constructors

### constructor

• **new VideoAbuseReportReason**(`youtube`, `data`, `full?`)

#### Parameters

| Name | Type | Default value |
| :------ | :------ | :------ |
| `youtube` | [`YouTube`](Library_Exports.YouTube) | `undefined` |
| `data` | `any` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/video-abuse-report-reason.ts:55](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L55)

## Properties

### data

• **data**: `any`

The raw data of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:38](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L38)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full reason object.

#### Defined in

[entities/video-abuse-report-reason.ts:33](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L33)

___

### id

• **id**: `string`

The ID of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:43](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L43)

___

### label

• **label**: `string`

The label text of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:48](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L48)

___

### secondaryReasons

• **secondaryReasons**: { `id`: `string` ; `label`: `string`  }[]

A list of secondary reasons associated with the reason, if any are available.

#### Defined in

[entities/video-abuse-report-reason.ts:53](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L53)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this reason object.

#### Defined in

[entities/video-abuse-report-reason.ts:28](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L28)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videoAbuseReportReasons'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:13](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L13)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(label,secondaryReasons))'`

The fields to request for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:23](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L23)

___

### part

▪ `Static` **part**: `string` = `'id,snippet'`

The parts to request for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:18](https://github.com/brandonbothell/popyt/blob/39a0f6f/src/entities/video-abuse-report-reason.ts#L18)
