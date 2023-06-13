import { ChannelBrandingSettings, ChannelSectionType } from '.'

/**
 * @ignore
 */
export const COMMENT_THREAD_DATA: {
  id?: string
  snippet: {
    channelId: string
    videoId?: string
    topLevelComment: {
      snippet: {
        textOriginal: string
      }
    }
  }
} = {
  snippet: {
    channelId: undefined,
    topLevelComment: {
      snippet: {
        textOriginal: undefined
      }
    }
  }
}

/**
 * @ignore
 */
export const SUBSCRIPTION_DATA: {
  snippet: {
    resourceId: {
      kind: 'youtube#channel'
      channelId: string
    }
  }
} = {
  snippet: {
    resourceId: {
      kind: 'youtube#channel',
      channelId: undefined
    }
  }
}

/**
 * @ignore
 */
export const PLAYLIST_DATA: {
  id?: string
  snippet: {
    title: string
    description?: string
    tags?: string[] | string
    defaultLanguage?: string
  }
  status?: {
    privacyStatus?: 'private' | 'public' | 'unlisted'
  }
  localizations?: {[language: string]: { title: string; description: string }}
} = {
  snippet: {
    title: undefined
  }
}

/**
 * @ignore
 */
export const PLAYLIST_ITEM_DATA: {
  id?: string
  snippet: {
    playlistId: string
    resourceId: {
      kind: string
      videoId: string
    }
    position?: number
  }
  contentDetails?: {
    note?: string
  }
} = {
  snippet: {
    playlistId: undefined,
    resourceId: {
      kind: 'youtube#video',
      videoId: undefined
    }
  }
}

/**
 * @ignore
 */
export const COMMENT_DATA: {
  id?: string
  snippet: {
    textOriginal: string
    parentId?: string
  }
} = {
  snippet: {
    textOriginal: undefined
  }
}

/**
 * @ignore
 */
export const WATERMARK_DATA: {
  timing: {
    type: string
    offsetMs: number
    durationMs: number
  }
} = {
  timing: {
    type: undefined,
    offsetMs: undefined,
    durationMs: undefined
  }
}

/**
 * @ignore
 */
export const CHANNEL_DATA: {
  id: string
  brandingSettings?: ChannelBrandingSettings
  localizations?: {
    [key: string]: {
      title: string
      description: string
    }
  }
  status?: {
    selfDeclaredMadeForKids?: boolean
  }
} = {
  id: undefined
}

/**
 * @ignore
 */
export const CHANNEL_SECTION_DATA: {
  id?: string
  snippet: {
    type: ChannelSectionType
    title?: string
    position?: number
  }
  contentDetails?: {
    playlists?: string[]
    channels?: string[]
  }
} = {
  snippet: {
    type: undefined
  }
}

/**
 * @ignore
 */
export const CAPTION_DATA: {
  id?: string
  snippet?: {
    videoId?: string
    language?: string
    name?: string
    isDraft?: boolean
  }
} = {}
