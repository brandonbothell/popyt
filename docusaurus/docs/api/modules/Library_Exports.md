---
id: "Library_Exports"
title: "Documentation"
sidebar_label: "Library Exports"
sidebar_position: 0
custom_edit_url: null
---

## Classes

- [Caption](../classes/Library_Exports.Caption)
- [Channel](../classes/Library_Exports.Channel)
- [ChannelSection](../classes/Library_Exports.ChannelSection)
- [Comment](../classes/Library_Exports.Comment)
- [Language](../classes/Library_Exports.Language)
- [Playlist](../classes/Library_Exports.Playlist)
- [Region](../classes/Library_Exports.Region)
- [Subscription](../classes/Library_Exports.Subscription)
- [Video](../classes/Library_Exports.Video)
- [VideoAbuseReportReason](../classes/Library_Exports.VideoAbuseReportReason)
- [VideoCategory](../classes/Library_Exports.VideoCategory)
- [VideoRating](../classes/Library_Exports.VideoRating)
- [YouTube](../classes/Library_Exports.YouTube)

## Interfaces

- [IDEntity](../interfaces/Library_Exports.IDEntity)

## References

### default

Renames and re-exports [YouTube](../classes/Library_Exports.YouTube)

## Type Aliases

### Authorization

Ƭ **Authorization**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `accessToken?` | `string` |
| `apiKey?` | `string` |

#### Defined in

[types/Util.ts:44](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Util.ts#L44)

___

### Banners

Ƭ **Banners**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `bannerImageUrl` | `string` |
| `bannerMobileExtraHdImageUrl` | `string` |
| `bannerMobileHdImageUrl` | `string` |
| `bannerMobileImageUrl` | `string` |
| `bannerMobileLowImageUrl` | `string` |
| `bannerMobileMediumImageUrl` | `string` |
| `bannerTabletExtraHdImageUrl` | `string` |
| `bannerTabletHdImageUrl` | `string` |
| `bannerTabletImageUrl` | `string` |
| `bannerTabletLowImageUrl` | `string` |
| `bannerTvHighImageUrl` | `string` |
| `bannerTvImageUrl` | `string` |
| `bannerTvLowImageUrl` | `string` |
| `bannerTvMediumImageUrl` | `string` |

#### Defined in

[types/Banners.ts:1](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Banners.ts#L1)

___

### ChannelBrandingSettings

Ƭ **ChannelBrandingSettings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | \{ `country?`: `string` ; `defaultLanguage?`: `string` ; `defaultTab?`: `string` ; `description?`: `string` ; `featuredChannelsTitle?`: `string` ; `featuredChannelsUrls?`: `string`[] ; `keywords?`: `string` ; `moderateComments?`: `boolean` ; `profileColor?`: `string` ; `showBrowseView?`: `boolean` ; `showRelatedChannels?`: `boolean` ; `trackingAnalyticsAccountId?`: `string` ; `unsubscribedTrailer?`: `string`  } |
| `channel.country?` | `string` |
| `channel.defaultLanguage?` | `string` |
| `channel.defaultTab?` | `string` |
| `channel.description?` | `string` |
| `channel.featuredChannelsTitle?` | `string` |
| `channel.featuredChannelsUrls?` | `string`[] |
| `channel.keywords?` | `string` |
| `channel.moderateComments?` | `boolean` |
| `channel.profileColor?` | `string` |
| `channel.showBrowseView?` | `boolean` |
| `channel.showRelatedChannels?` | `boolean` |
| `channel.trackingAnalyticsAccountId?` | `string` |
| `channel.unsubscribedTrailer?` | `string` |
| `image?` | \{ `bannerExternalUrl?`: `string` ; `trackingImageUrl?`: `string` ; `watchIconImageUrl?`: `string`  } |
| `image.bannerExternalUrl?` | `string` |
| `image.trackingImageUrl?` | `string` |
| `image.watchIconImageUrl?` | `string` |

#### Defined in

[types/BrandingSettings.ts:1](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/BrandingSettings.ts#L1)

___

### ChannelParts

Ƭ **ChannelParts**: (``"auditDetails"`` \| ``"brandingSettings"`` \| ``"contentDetails"`` \| ``"contentOwnerDetails"`` \| ``"id"`` \| ``"localizations"`` \| ``"snippet"`` \| ``"statistics"`` \| ``"status"`` \| ``"topicDetails"``)[]

#### Defined in

[types/Parts.ts:17](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L17)

___

### ChannelResolvable

Ƭ **ChannelResolvable**: `string` \| [`Channel`](../classes/Library_Exports.Channel)

A URL, ID, search query, or object of a channel.

#### Defined in

[types/Resolutions.ts:37](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L37)

___

### ChannelSearchOptions

Ƭ **ChannelSearchOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelType?` | ``"any"`` \| ``"show"`` | Filter by TV shows |

#### Defined in

[types/RetrievalService.ts:147](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L147)

___

### ChannelSectionParts

Ƭ **ChannelSectionParts**: (``"contentDetails"`` \| ``"id"`` \| ``"localizations"`` \| ``"snippet"`` \| ``"targeting"``)[]

#### Defined in

[types/Parts.ts:36](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L36)

___

### ChannelSectionType

Ƭ **ChannelSectionType**: ``"allPlaylists"`` \| ``"completedEvents"`` \| ``"likedPlaylists"`` \| ``"likes"`` \| ``"liveEvents"`` \| ``"multipleChannels"`` \| ``"multiplePlaylists"`` \| ``"popularUploads"`` \| ``"postedPlaylists"`` \| ``"postedVideos"`` \| ``"recentActivity"`` \| ``"recentPosts"`` \| ``"recentUploads"`` \| ``"singlePlaylist"`` \| ``"subscriptions"`` \| ``"upcomingEvents"``

#### Defined in

[types/ChannelSectionType.ts:1](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/ChannelSectionType.ts#L1)

___

### CommentParts

Ƭ **CommentParts**: (``"id"`` \| ``"snippet"``)[]

#### Defined in

[types/Parts.ts:32](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L32)

___

### CommentResolvable

Ƭ **CommentResolvable**: `string` \| [`Comment`](../classes/Library_Exports.Comment)

An ID or object of a comment.

#### Defined in

[types/Resolutions.ts:47](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L47)

___

### CommentThreadParts

Ƭ **CommentThreadParts**: (``"id"`` \| ``"replies"`` \| ``"snippet"``)[]

#### Defined in

[types/Parts.ts:40](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L40)

___

### EntitySearchOptions

Ƭ **EntitySearchOptions**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SearchType`](Library_Exports#searchtype) = [`SearchType`](Library_Exports#searchtype) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](Library_Exports#pageoptions) |
| `searchFilters?` | `Omit`\<[`SearchFilters`](Library_Exports#searchfilters)\<`T`\>, ``"types"``\> |

#### Defined in

[types/RetrievalService.ts:111](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L111)

___

### GenericSearchOptions

Ƭ **GenericSearchOptions**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SearchType`](Library_Exports#searchtype) = [`SearchType`](Library_Exports#searchtype) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](Library_Exports#pageoptions) |
| `searchFilters?` | [`SearchFilters`](Library_Exports#searchfilters)\<`T`\> |

#### Defined in

[types/RetrievalService.ts:106](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L106)

___

### Image

Ƭ **Image**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `data` | `Buffer` |
| `type` | ``"jpeg"`` \| ``"png"`` |

#### Defined in

[types/Util.ts:46](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Util.ts#L46)

___

### ItemReturns

Ƭ **ItemReturns**\<`T`, `K`, `M`\>: `M` extends ``true`` ? `InstanceType`\<`K`\> : `T` extends `any`[] ? `InstanceType`\<`K`\>[] : `InstanceType`\<`K`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `any` \| `any`[] |
| `K` | extends [`ItemTypes`](Library_Exports#itemtypes) |
| `M` | extends `boolean` |

#### Defined in

[types/RetrievalService.ts:13](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L13)

___

### ItemTypes

Ƭ **ItemTypes**: typeof [`GETTABLE_CLASSES`](Library_Exports#gettable_classes)[`number`]

#### Defined in

[types/RetrievalService.ts:11](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L11)

___

### PageOptions

Ƭ **PageOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `maxPerPage?` | `number` |
| `pageToken?` | `string` |
| `pages?` | `number` |

#### Defined in

[types/RetrievalService.ts:82](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L82)

___

### PaginatedInstance

Ƭ **PaginatedInstance**: `InstanceType`\<[`PaginatedType`](Library_Exports#paginatedtype)\>

#### Defined in

[types/RetrievalService.ts:44](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L44)

___

### PaginatedResponse

Ƭ **PaginatedResponse**\<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaginatedInstance`](Library_Exports#paginatedinstance) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `items` | `T`[] |
| `nextPageToken?` | `string` |
| `prevPageToken?` | `string` |

#### Defined in

[types/RetrievalService.ts:88](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L88)

___

### PaginatedType

Ƭ **PaginatedType**: typeof `PAGINATED_CLASSES`[`number`]

#### Defined in

[types/RetrievalService.ts:42](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L42)

___

### PlaylistItemParts

Ƭ **PlaylistItemParts**: (``"contentDetails"`` \| ``"id"`` \| ``"snippet"`` \| ``"status"``)[]

#### Defined in

[types/Parts.ts:38](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L38)

___

### PlaylistParts

Ƭ **PlaylistParts**: (``"contentDetails"`` \| ``"id"`` \| ``"localizations"`` \| ``"player"`` \| ``"snippet"`` \| ``"status"``)[]

#### Defined in

[types/Parts.ts:30](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L30)

___

### PlaylistResolvable

Ƭ **PlaylistResolvable**: `string` \| [`Playlist`](../classes/Library_Exports.Playlist)

A URL, ID, search query, or object of a playlist.

#### Defined in

[types/Resolutions.ts:32](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L32)

___

### PlaylistSearchOptions

Ƭ **PlaylistSearchOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | [`ChannelResolvable`](Library_Exports#channelresolvable) |

#### Defined in

[types/RetrievalService.ts:143](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L143)

___

### ResolutionMap

Ƭ **ResolutionMap**\<`T`\>: `Map`\<`T`, `Map`\<`string`, `CacheItem`\<[`Resolvable`](Library_Exports#resolvable)\<`T`\>\>\>\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends `ResolvableClass` = `ResolvableClass` |

#### Defined in

[types/Resolutions.ts:10](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L10)

___

### Resolvable

Ƭ **Resolvable**\<`T`\>: `string` \| `InstanceType`\<`T`\>

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`PaginatedType`](Library_Exports#paginatedtype) |

#### Defined in

[types/Resolutions.ts:8](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L8)

___

### SearchFilters

Ƭ **SearchFilters**\<`T`\>: \{ `order?`: ``"date"`` \| ``"rating"`` \| ``"relevance"`` \| ``"title"`` \| ``"videoCount"`` \| ``"viewCount"`` ; `types?`: `T`[]  } & `T` extends typeof [`Video`](../classes/Library_Exports.Video) ? [`VideoSearchOptions`](Library_Exports#videosearchoptions) : `T` extends typeof [`Playlist`](../classes/Library_Exports.Playlist) ? [`PlaylistSearchOptions`](Library_Exports#playlistsearchoptions) : `T` extends typeof [`Channel`](../classes/Library_Exports.Channel) ? [`ChannelSearchOptions`](Library_Exports#channelsearchoptions) : {}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SearchType`](Library_Exports#searchtype) = [`SearchType`](Library_Exports#searchtype) |

#### Defined in

[types/RetrievalService.ts:98](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L98)

___

### SearchType

Ƭ **SearchType**: typeof [`Video`](../classes/Library_Exports.Video) \| typeof [`Playlist`](../classes/Library_Exports.Playlist) \| typeof [`Channel`](../classes/Library_Exports.Channel)

#### Defined in

[types/RetrievalService.ts:96](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L96)

___

### SubscriptionParts

Ƭ **SubscriptionParts**: (``"contentDetails"`` \| ``"id"`` \| ``"snippet"`` \| ``"subscriberSnippet"``)[]

#### Defined in

[types/Parts.ts:34](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L34)

___

### SubscriptionResolvable

Ƭ **SubscriptionResolvable**: `string` \| [`Subscription`](../classes/Library_Exports.Subscription)

An ID or object of a subscription.

#### Defined in

[types/Resolutions.ts:52](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L52)

___

### Thumbnail

Ƭ **Thumbnail**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `height?` | `number` |
| `url?` | `string` |
| `width?` | `number` |

#### Defined in

[types/Thumbnail.ts:1](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Thumbnail.ts#L1)

___

### VideoCategoryResolvable

Ƭ **VideoCategoryResolvable**: `string` \| [`VideoCategory`](../classes/Library_Exports.VideoCategory)

An ID or object of a video category.

#### Defined in

[types/Resolutions.ts:42](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L42)

___

### VideoParts

Ƭ **VideoParts**: (``"contentDetails"`` \| ``"fileDetails"`` \| ``"id"`` \| ``"liveStreamingDetails"`` \| ``"localizations"`` \| ``"player"`` \| ``"processingDetails"`` \| ``"recordingDetails"`` \| ``"snippet"`` \| ``"statistics"`` \| ``"status"`` \| ``"suggestions"`` \| ``"topicDetails"``)[]

#### Defined in

[types/Parts.ts:1](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Parts.ts#L1)

___

### VideoResolvable

Ƭ **VideoResolvable**: `string` \| [`Video`](../classes/Library_Exports.Video)

A URL, ID, search query, or object of a video.

#### Defined in

[types/Resolutions.ts:27](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/Resolutions.ts#L27)

___

### VideoSearchOptions

Ƭ **VideoSearchOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channel?` | [`ChannelResolvable`](Library_Exports#channelresolvable) | - |
| `eventType?` | ``"completed"`` \| ``"live"`` \| ``"upcoming"`` | - |
| `location?` | `string` | Latitude and longitude coordinates in the format (37.42307,-122.08427). |
| `locationRadius?` | `string` | Units are m, km, ft, and mi. E.g. 5km. No larger than 1000km |
| `videoCaption?` | ``"any"`` \| ``"closedCaption"`` \| ``"none"`` | - |
| `videoCategory?` | [`VideoCategoryResolvable`](Library_Exports#videocategoryresolvable) | - |
| `videoEmbeddable?` | `boolean` | - |
| `videoType?` | ``"any"`` \| ``"episode"`` \| ``"movie"`` | - |

#### Defined in

[types/RetrievalService.ts:123](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L123)

___

### VideoUpdateResource

Ƭ **VideoUpdateResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `localizations?` | \{ `[key: string]`: \{ `description`: `string` ; `title`: `string`  };  } |
| `recordingDetails?` | \{ `recordingDate?`: `Date` \| `string`  } |
| `recordingDetails.recordingDate?` | `Date` \| `string` |
| `snippet?` | \{ `categoryId`: `string` ; `defaultLanguage?`: `string` ; `description?`: `string` ; `tags?`: `string`[] \| `string` ; `title`: `string`  } |
| `snippet.categoryId` | `string` |
| `snippet.defaultLanguage?` | `string` |
| `snippet.description?` | `string` |
| `snippet.tags?` | `string`[] \| `string` |
| `snippet.title` | `string` |
| `status?` | \{ `embeddable?`: `boolean` ; `license?`: ``"creativeCommon"`` \| ``"youtube"`` ; `privacyStatus?`: ``"private"`` \| ``"public"`` \| ``"unlisted"`` ; `publicStatsViewable?`: `boolean` ; `publishAt?`: `Date` \| `string` ; `selfDeclaredMadeForKids?`: `boolean`  } |
| `status.embeddable?` | `boolean` |
| `status.license?` | ``"creativeCommon"`` \| ``"youtube"`` |
| `status.privacyStatus?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` |
| `status.publicStatsViewable?` | `boolean` |
| `status.publishAt?` | `Date` \| `string` |
| `status.selfDeclaredMadeForKids?` | `boolean` |

#### Defined in

[types/VideoUpdateResource.ts:1](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/VideoUpdateResource.ts#L1)

___

### YouTubeOptions

Ƭ **YouTubeOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `cache?` | `boolean` | Whether or not to cache entities. |
| `cacheCheckInterval?` | `number` | How often to check for and delete expired cached items in seconds. |
| `cacheSearches?` | `boolean` | Whether or not we should cache searches |
| `cacheTTL?` | `number` | How long to cache entities in seconds (0 = unlimited). |
| `request?` | `Request` | A custom internal request object to use instead of the default one. |

#### Defined in

[index.ts:429](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/index.ts#L429)

## Variables

### GETTABLE\_CLASSES

• `Const` **GETTABLE\_CLASSES**: (typeof [`Video`](../classes/Library_Exports.Video) \| typeof [`Playlist`](../classes/Library_Exports.Playlist) \| typeof [`Channel`](../classes/Library_Exports.Channel) \| typeof [`VideoCategory`](../classes/Library_Exports.VideoCategory) \| typeof [`Comment`](../classes/Library_Exports.Comment) \| typeof [`Subscription`](../classes/Library_Exports.Subscription) \| typeof [`Caption`](../classes/Library_Exports.Caption) \| typeof [`ChannelSection`](../classes/Library_Exports.ChannelSection) \| typeof [`VideoRating`](../classes/Library_Exports.VideoRating))[]

#### Defined in

[types/RetrievalService.ts:7](https://github.com/brandonbothell/popyt/blob/85eb6fd/src/types/RetrievalService.ts#L7)
