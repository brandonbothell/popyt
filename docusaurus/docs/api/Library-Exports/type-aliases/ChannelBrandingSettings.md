[**popyt**](../../README.md)

***

[popyt](../../modules.md) / [Library Exports](../README.md) / ChannelBrandingSettings

# Type Alias: ChannelBrandingSettings

> **ChannelBrandingSettings** = `object`

Defined in: [types/BrandingSettings.ts:1](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/types/BrandingSettings.ts#L1)

## Properties

### channel?

> `optional` **channel?**: `object`

Defined in: [types/BrandingSettings.ts:2](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/types/BrandingSettings.ts#L2)

#### country?

> `optional` **country?**: `string`

The country this channel is based in.

#### defaultLanguage?

> `optional` **defaultLanguage?**: `string`

The default language for this channel's uploads.

#### defaultTab?

> `optional` **defaultTab?**: `string`

The content tab that users see by default.

#### description?

> `optional` **description?**: `string`

The description of this channel.

#### featuredChannelsTitle?

> `optional` **featuredChannelsTitle?**: `string`

The title that displays above the featured channels

#### featuredChannelsUrls?

> `optional` **featuredChannelsUrls?**: `string`[]

The IDs of all of this channel's featured channels.

#### keywords?

> `optional` **keywords?**: `string`

This channel's keywords.

#### moderateComments?

> `optional` **moderateComments?**: `boolean`

Whether or not comments need to be approved before being visible.

#### profileColor?

> `optional` **profileColor?**: `string`

A color that matches well with the channel.

#### showBrowseView?

> `optional` **showBrowseView?**: `boolean`

Whether or not to show content in a browse view (as opposed to an activity feed).

#### showRelatedChannels?

> `optional` **showRelatedChannels?**: `boolean`

Whether or not to show related channels in the sidebar.

#### trackingAnalyticsAccountId?

> `optional` **trackingAnalyticsAccountId?**: `string`

The ID of a Google Analytics account used to measure channel traffic.

#### unsubscribedTrailer?

> `optional` **unsubscribedTrailer?**: `string`

The ID of a video to highlight to unsubsribed viewers.

***

### image?

> `optional` **image?**: `object`

Defined in: [types/BrandingSettings.ts:68](https://github.com/brandonbothell/popyt/blob/e69f67439a91b94c7cfd4e3ab9a1fdc4a716cdcf/src/types/BrandingSettings.ts#L68)

#### bannerExternalUrl?

> `optional` **bannerExternalUrl?**: `string`

The URL of a banner (obtained from [OAuth.uploadChannelBanner](../../OAuth/classes/OAuthChannels#uploadchannelbanner)) to use for the channel.

#### trackingImageUrl?

> `optional` **trackingImageUrl?**: `string`

The URL for a 1px by 1px tracking image that can be used to collect stats.

#### watchIconImageUrl?

> `optional` **watchIconImageUrl?**: `string`

The URL for a 25 pixel high image with a width {'<='}170 pixels that appears above the player.
