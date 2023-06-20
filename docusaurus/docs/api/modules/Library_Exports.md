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
- [Language](../classes/Library_Exports.Language)
- [Playlist](../classes/Library_Exports.Playlist)
- [Region](../classes/Library_Exports.Region)
- [Subscription](../classes/Library_Exports.Subscription)
- [Video](../classes/Library_Exports.Video)
- [VideoAbuseReportReason](../classes/Library_Exports.VideoAbuseReportReason)
- [VideoCategory](../classes/Library_Exports.VideoCategory)
- [YTComment](../classes/Library_Exports.YTComment)
- [YouTube](../classes/Library_Exports.YouTube)

## References

### default

Renames and re-exports [YouTube](../classes/Library_Exports.YouTube)

## Type Aliases

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

[types/Banners.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Banners.ts#L1)

___

### ChannelBrandingSettings

Ƭ **ChannelBrandingSettings**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | { `country?`: `string` ; `defaultLanguage?`: `string` ; `defaultTab?`: `string` ; `description?`: `string` ; `featuredChannelsTitle?`: `string` ; `featuredChannelsUrls?`: `string`[] ; `keywords?`: `string` ; `moderateComments?`: `boolean` ; `profileColor?`: `string` ; `showBrowseView?`: `boolean` ; `showRelatedChannels?`: `boolean` ; `trackingAnalyticsAccountId?`: `string` ; `unsubscribedTrailer?`: `string`  } |
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
| `image?` | { `bannerExternalUrl?`: `string` ; `trackingImageUrl?`: `string` ; `watchIconImageUrl?`: `string`  } |
| `image.bannerExternalUrl?` | `string` |
| `image.trackingImageUrl?` | `string` |
| `image.watchIconImageUrl?` | `string` |

#### Defined in

[types/BrandingSettings.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/BrandingSettings.ts#L1)

___

### ChannelParts

Ƭ **ChannelParts**: (``"auditDetails"`` \| ``"brandingSettings"`` \| ``"contentDetails"`` \| ``"contentOwnerDetails"`` \| ``"id"`` \| ``"localizations"`` \| ``"snippet"`` \| ``"statistics"`` \| ``"status"`` \| ``"topicDetails"``)[]

#### Defined in

[types/Parts.ts:17](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L17)

___

### ChannelSearchOptions

Ƭ **ChannelSearchOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelType?` | ``"any"`` \| ``"show"`` | Filter by TV shows |

#### Defined in

[types/GetPaginatedItems.ts:98](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L98)

___

### ChannelSectionParts

Ƭ **ChannelSectionParts**: (``"contentDetails"`` \| ``"id"`` \| ``"localizations"`` \| ``"snippet"`` \| ``"targeting"``)[]

#### Defined in

[types/Parts.ts:36](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L36)

___

### ChannelSectionType

Ƭ **ChannelSectionType**: ``"allPlaylists"`` \| ``"completedEvents"`` \| ``"likedPlaylists"`` \| ``"likes"`` \| ``"liveEvents"`` \| ``"multipleChannels"`` \| ``"multiplePlaylists"`` \| ``"popularUploads"`` \| ``"postedPlaylists"`` \| ``"postedVideos"`` \| ``"recentActivity"`` \| ``"recentPosts"`` \| ``"recentUploads"`` \| ``"singlePlaylist"`` \| ``"subscriptions"`` \| ``"upcomingEvents"``

#### Defined in

[types/ChannelSectionType.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/ChannelSectionType.ts#L1)

___

### CommentParts

Ƭ **CommentParts**: (``"id"`` \| ``"snippet"``)[]

#### Defined in

[types/Parts.ts:32](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L32)

___

### CommentThreadParts

Ƭ **CommentThreadParts**: (``"id"`` \| ``"replies"`` \| ``"snippet"``)[]

#### Defined in

[types/Parts.ts:40](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L40)

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

[types/GetPaginatedItems.ts:35](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L35)

___

### PaginatedType

Ƭ **PaginatedType**: typeof [`VideoCategory`](../classes/Library_Exports.VideoCategory) \| typeof [`VideoAbuseReportReason`](../classes/Library_Exports.VideoAbuseReportReason) \| typeof [`Language`](../classes/Library_Exports.Language) \| typeof [`Region`](../classes/Library_Exports.Region) \| typeof [`Video`](../classes/Library_Exports.Video) \| typeof [`YTComment`](../classes/Library_Exports.YTComment) \| typeof [`Caption`](../classes/Library_Exports.Caption) \| typeof [`Playlist`](../classes/Library_Exports.Playlist) \| typeof [`Subscription`](../classes/Library_Exports.Subscription) \| typeof [`ChannelSection`](../classes/Library_Exports.ChannelSection) \| typeof [`Channel`](../classes/Library_Exports.Channel)

#### Defined in

[types/GetPaginatedItems.ts:21](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L21)

___

### ParsedUrl

Ƭ **ParsedUrl**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channel?` | { `id?`: `string` ; `username?`: `string`  } |
| `channel.id?` | `string` |
| `channel.username?` | `string` |
| `playlist?` | { `id?`: `string`  } |
| `playlist.id?` | `string` |
| `video?` | { `id?`: `string`  } |
| `video.id?` | `string` |

#### Defined in

[types/Util.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Util.ts#L1)

___

### PlaylistItemParts

Ƭ **PlaylistItemParts**: (``"contentDetails"`` \| ``"id"`` \| ``"snippet"`` \| ``"status"``)[]

#### Defined in

[types/Parts.ts:38](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L38)

___

### PlaylistParts

Ƭ **PlaylistParts**: (``"contentDetails"`` \| ``"id"`` \| ``"localizations"`` \| ``"player"`` \| ``"snippet"`` \| ``"status"``)[]

#### Defined in

[types/Parts.ts:30](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L30)

___

### PlaylistSearchOptions

Ƭ **PlaylistSearchOptions**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `channelId?` | `string` |

#### Defined in

[types/GetPaginatedItems.ts:94](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L94)

___

### SearchFilters

Ƭ **SearchFilters**<`T`\>: { `fields?`: `string` ; `types?`: `T`[]  } & `T` extends typeof [`Video`](../classes/Library_Exports.Video) ? [`VideoSearchOptions`](Library_Exports#videosearchoptions) : `T` extends typeof [`Playlist`](../classes/Library_Exports.Playlist) ? [`PlaylistSearchOptions`](Library_Exports#playlistsearchoptions) : `T` extends typeof [`Channel`](../classes/Library_Exports.Channel) ? [`ChannelSearchOptions`](Library_Exports#channelsearchoptions) : {}

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SearchType`](Library_Exports#searchtype) = [`SearchType`](Library_Exports#searchtype) |

#### Defined in

[types/GetPaginatedItems.ts:54](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L54)

___

### SearchOptions

Ƭ **SearchOptions**<`T`\>: `Object`

#### Type parameters

| Name | Type |
| :------ | :------ |
| `T` | extends [`SearchType`](Library_Exports#searchtype) = [`SearchType`](Library_Exports#searchtype) |

#### Type declaration

| Name | Type |
| :------ | :------ |
| `pageOptions?` | [`PageOptions`](Library_Exports#pageoptions) |
| `searchFilters?` | [`SearchFilters`](Library_Exports#searchfilters)<`T`\> |

#### Defined in

[types/GetPaginatedItems.ts:62](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L62)

___

### SearchType

Ƭ **SearchType**: typeof [`Video`](../classes/Library_Exports.Video) \| typeof [`Playlist`](../classes/Library_Exports.Playlist) \| typeof [`Channel`](../classes/Library_Exports.Channel)

#### Defined in

[types/GetPaginatedItems.ts:52](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L52)

___

### SubscriptionParts

Ƭ **SubscriptionParts**: (``"contentDetails"`` \| ``"id"`` \| ``"snippet"`` \| ``"subscriberSnippet"``)[]

#### Defined in

[types/Parts.ts:34](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L34)

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

[types/Thumbnail.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Thumbnail.ts#L1)

___

### VideoParts

Ƭ **VideoParts**: (``"contentDetails"`` \| ``"fileDetails"`` \| ``"id"`` \| ``"liveStreamingDetails"`` \| ``"localizations"`` \| ``"player"`` \| ``"processingDetails"`` \| ``"recordingDetails"`` \| ``"snippet"`` \| ``"statistics"`` \| ``"status"`` \| ``"suggestions"`` \| ``"topicDetails"``)[]

#### Defined in

[types/Parts.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/Parts.ts#L1)

___

### VideoSearchOptions

Ƭ **VideoSearchOptions**: `Object`

#### Type declaration

| Name | Type | Description |
| :------ | :------ | :------ |
| `channelId?` | `string` | - |
| `eventType?` | ``"completed"`` \| ``"live"`` \| ``"upcoming"`` | - |
| `location?` | `string` | Latitude and longitude coordinates in the format (37.42307,-122.08427). |
| `locationRadius?` | `string` | Units are m, km, ft, and mi. E.g. 5km. No larger than 1000km |
| `videoCaption?` | ``"any"`` \| ``"closedCaption"`` \| ``"none"`` | - |
| `videoCategoryId?` | `string` | - |
| `videoEmbeddable?` | `boolean` | - |
| `videoType?` | ``"any"`` \| ``"episode"`` \| ``"movie"`` | - |

#### Defined in

[types/GetPaginatedItems.ts:74](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/GetPaginatedItems.ts#L74)

___

### VideoUpdateResource

Ƭ **VideoUpdateResource**: `Object`

#### Type declaration

| Name | Type |
| :------ | :------ |
| `id` | `string` |
| `localizations?` | { `[key: string]`: { `description`: `string` ; `title`: `string`  };  } |
| `recordingDetails?` | { `recordingDate?`: `Date` \| `string`  } |
| `recordingDetails.recordingDate?` | `Date` \| `string` |
| `snippet?` | { `categoryId`: `string` ; `defaultLanguage?`: `string` ; `description?`: `string` ; `tags?`: `string`[] \| `string` ; `title`: `string`  } |
| `snippet.categoryId` | `string` |
| `snippet.defaultLanguage?` | `string` |
| `snippet.description?` | `string` |
| `snippet.tags?` | `string`[] \| `string` |
| `snippet.title` | `string` |
| `status?` | { `embeddable?`: `boolean` ; `license?`: `string` ; `privacyStatus?`: ``"private"`` \| ``"public"`` \| ``"unlisted"`` ; `publicStatsViewable?`: `boolean` ; `publishAt?`: `Date` \| `string` ; `selfDeclaredMadeForKids?`: `boolean`  } |
| `status.embeddable?` | `boolean` |
| `status.license?` | `string` |
| `status.privacyStatus?` | ``"private"`` \| ``"public"`` \| ``"unlisted"`` |
| `status.publicStatsViewable?` | `boolean` |
| `status.publishAt?` | `Date` \| `string` |
| `status.selfDeclaredMadeForKids?` | `boolean` |

#### Defined in

[types/VideoUpdateResource.ts:1](https://github.com/brandonbothell/popyt/blob/a8ee514/src/types/VideoUpdateResource.ts#L1)

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

#### Defined in

[index.ts:372](https://github.com/brandonbothell/popyt/blob/a8ee514/src/index.ts#L372)
