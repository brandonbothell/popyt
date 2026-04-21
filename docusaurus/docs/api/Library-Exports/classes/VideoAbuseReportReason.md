[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / VideoAbuseReportReason

# Class: VideoAbuseReportReason

Defined in: [entities/video-abuse-report-reason.ts:7](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L7)

A YouTube [Video](./Video#) abuse report reason.

## Constructors

### Constructor

> **new VideoAbuseReportReason**(`youtube`, `data`, `full?`): `VideoAbuseReportReason`

Defined in: [entities/video-abuse-report-reason.ts:53](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L53)

#### Parameters

##### youtube

[`YouTube`](YouTube.md)

##### data

`Schema$VideoAbuseReportReason`

##### full?

`boolean` = `true`

#### Returns

`VideoAbuseReportReason`

## Properties

### data

> **data**: `any`

Defined in: [entities/video-abuse-report-reason.ts:36](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L36)

The raw data of this reason.

***

### full

> **full**: `boolean` = `true`

Defined in: [entities/video-abuse-report-reason.ts:31](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L31)

Whether or not this is a full reason object.

***

### id

> **id**: `string`

Defined in: [entities/video-abuse-report-reason.ts:41](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L41)

The ID of this reason.

***

### label

> **label**: `string`

Defined in: [entities/video-abuse-report-reason.ts:46](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L46)

The label text of this reason.

***

### secondaryReasons

> **secondaryReasons**: `object`[]

Defined in: [entities/video-abuse-report-reason.ts:51](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L51)

A list of secondary reasons associated with the reason, if any are available.

#### id?

> `optional` **id?**: `string`

#### label?

> `optional` **label?**: `string`

***

### youtube

> **youtube**: [`YouTube`](YouTube.md)

Defined in: [entities/video-abuse-report-reason.ts:26](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L26)

The YouTube object that created this reason object.

***

### endpoint

> `static` **endpoint**: `string` = `'videoAbuseReportReasons'`

Defined in: [entities/video-abuse-report-reason.ts:11](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L11)

The name of the endpoint used for this entity.

***

### fields

> `static` **fields**: `string` = `'items(kind,id,snippet(label,secondaryReasons))'`

Defined in: [entities/video-abuse-report-reason.ts:21](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L21)

The fields to request for this entity.

***

### part

> `static` **part**: `string` = `'snippet'`

Defined in: [entities/video-abuse-report-reason.ts:16](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/entities/video-abuse-report-reason.ts#L16)

The parts to request for this entity.
