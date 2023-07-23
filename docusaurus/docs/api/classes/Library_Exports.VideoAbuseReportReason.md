---
id: "Library_Exports.VideoAbuseReportReason"
title: "Documentation"
sidebar_label: "VideoAbuseReportReason"
custom_edit_url: null
---

[Library Exports](../modules/Library_Exports).VideoAbuseReportReason

A YouTube [Video](./Library_Exports.Video#) abuse report reason.

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

[entities/video-abuse-report-reason.ts:52](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L52)

## Properties

### data

• **data**: `any`

The raw data of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:35](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L35)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full reason object.

#### Defined in

[entities/video-abuse-report-reason.ts:30](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L30)

___

### id

• **id**: `string`

The ID of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:40](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L40)

___

### label

• **label**: `string`

The label text of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:45](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L45)

___

### secondaryReasons

• **secondaryReasons**: { `id`: `string` ; `label`: `string`  }[]

A list of secondary reasons associated with the reason, if any are available.

#### Defined in

[entities/video-abuse-report-reason.ts:50](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L50)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this reason object.

#### Defined in

[entities/video-abuse-report-reason.ts:25](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L25)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videoAbuseReportReasons'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:10](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L10)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(label,secondaryReasons))'`

The fields to request for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:20](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L20)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:15](https://github.com/brandonbothell/popyt/blob/67eb608/src/entities/video-abuse-report-reason.ts#L15)
