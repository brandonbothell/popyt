export type VideoParts = (
  'contentDetails' |
  'fileDetails' |
  'id' |
  'liveStreamingDetails' |
  'localizations' |
  'player' |
  'processingDetails' |
  'recordingDetails' |
  'snippet' |
  'statistics' |
  'status' |
  'suggestions' |
  'topicDetails'
)[]

export type ChannelParts = (
  'auditDetails' |
  'brandingSettings' |
  'contentDetails' |
  'contentOwnerDetails' |
  'id' |
  'localizations' |
  'snippet' |
  'statistics' |
  'status' |
  'topicDetails'
)[]

export type PlaylistParts = ('contentDetails' | 'id' | 'localizations' | 'player' | 'snippet' | 'status')[]

export type CommentParts = ('id' | 'snippet')[]

export type SubscriptionParts = ('contentDetails' | 'id' | 'snippet' | 'subscriberSnippet')[]

export type ChannelSectionParts = ('contentDetails' | 'id' | 'localizations' | 'snippet' | 'targeting')[]

export type PlaylistItemParts = ('contentDetails' | 'id' | 'snippet' | 'status')[]

export type CommentThreadParts = ('id' | 'replies' | 'snippet')[]
