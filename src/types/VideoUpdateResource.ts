type VideoUpdateResource = {
  id: string
  snippet?: {
    title: string
    categoryId: string
    defaultLanguage?: string
    description?: string
    tags?: string[] | string
  }
  status?: {
    embeddable?: boolean
    license?: string
    privacyStatus?: 'private' | 'public' | 'unlisted'
    publicStatsViewable?: boolean
    publishAt?: Date | string
    selfDeclaredMadeForKids?: boolean
  }
  recordingDetails?: {
    recordingDate?: Date | string
  }
  localizations?: {
    [key: string]: {
      title: string
      description: string
    }
  }
}
