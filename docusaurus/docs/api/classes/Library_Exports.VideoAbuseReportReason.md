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
| `data` | `Schema$VideoAbuseReportReason` | `undefined` |
| `full` | `boolean` | `true` |

#### Defined in

[entities/video-abuse-report-reason.ts:53](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L53)

## Properties

### data

• **data**: `any`

The raw data of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:36](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L36)

___

### full

• **full**: `boolean` = `true`

Whether or not this is a full reason object.

#### Defined in

[entities/video-abuse-report-reason.ts:31](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L31)

___

### id

• **id**: `string`

The ID of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:41](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L41)

___

### label

• **label**: `string`

The label text of this reason.

#### Defined in

[entities/video-abuse-report-reason.ts:46](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L46)

___

### secondaryReasons

• **secondaryReasons**: \{ `id?`: `string` ; `label?`: `string`  }[]

A list of secondary reasons associated with the reason, if any are available.

#### Defined in

[entities/video-abuse-report-reason.ts:51](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L51)

___

### youtube

• **youtube**: [`YouTube`](Library_Exports.YouTube)

The YouTube object that created this reason object.

#### Defined in

[entities/video-abuse-report-reason.ts:26](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L26)

___

### endpoint

▪ `Static` **endpoint**: `string` = `'videoAbuseReportReasons'`

The name of the endpoint used for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L11)

___

### fields

▪ `Static` **fields**: `string` = `'items(kind,id,snippet(label,secondaryReasons))'`

The fields to request for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:21](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L21)

___

### part

▪ `Static` **part**: `string` = `'snippet'`

The parts to request for this entity.

#### Defined in

[entities/video-abuse-report-reason.ts:16](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/entities/video-abuse-report-reason.ts#L16)
