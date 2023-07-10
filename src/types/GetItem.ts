import { Video, Channel, Playlist, Comment, Subscription, VideoCategory, ChannelSection, Caption } from '..'

export const GETTABLE_CLASSES = [ Video, Channel, Playlist, Comment, Subscription, VideoCategory, ChannelSection, Caption ]

export type ItemTypes = typeof GETTABLE_CLASSES[number]

export type ItemReturns<T extends any | any[], K extends ItemTypes, M extends boolean> =
    M extends true ? InstanceType<K> :
    T extends any[] ? InstanceType<K>[] : InstanceType<K>
