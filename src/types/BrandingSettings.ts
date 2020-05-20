export type BrandingSettings = {
  channel?: {
    /**
     * The country this channel is based in.
     */
    country?: string

    /**
     * The description of this channel.
     */
    description?: string

    /**
     * The default language for this channel's uploads.
     */
    defaultLanguage?: string

    /**
     * The content tab that users see by default.
     */
    defaultTab?: string

    /**
     * The title that displays above the featured channels
     */
    featuredChannelsTitle?: string

    /**
     * The IDs of all of this channel's featured channels.
     */
    featuredChannelsUrls?: string[]

    /**
     * This channel's keywords.
     */
    keywords?: string

    /**
     * Whether or not comments need to be approved before being visible.
     */
    moderateComments?: boolean

    /**
     * A color that matches well with the channel.
     */
    profileColor?: string

    /**
     * Whether or not to show related channels in the sidebar.
     */
    showRelatedChannels?: boolean

    /**
     * Whether or not to show content in a browse view (as opposed to an activity feed).
     */
    showBrowseView?: boolean

    /**
     * The ID of a Google Analytics account used to measure channel traffic.
     */
    trackingAnalyticsAccountId?: string

    /**
     * The ID of a video to highlight to unsubsribed viewers.
     */
    unsubscribedTrailer?: string
  }
  image?: {
    /**
     * The URL of a banner to use for the channel.
     */
    bannerExternalUrl?: string

    /**
     * The URL for a 1px by 1px tracking image that can be used to collect stats.
     */
    trackingImageUrl?: string

    /**
     * The URL for a 25 pixel high image with a width <=170 pixels that appears above the player.
     */
    watchIconImageUrl?: string
  }
}
