import { Video, Channel, Playlist, YTComment, Subscription, VideoCategory, ChannelSection, Caption } from '..'

const GETTABLE_CLASSES = [ Video, Channel, Playlist, YTComment, Subscription, VideoCategory, ChannelSection, Caption ]

export type ItemTypes = typeof GETTABLE_CLASSES[number]

export type ItemReturns<T extends string | string[], K extends ItemTypes> = T extends string[] ? InstanceType<K>[] : InstanceType<K>
