/**
 * @ignore
 */
export const CommentThreadData: {
  id?: string,
  snippet: {
    channelId: string,
    videoId?: string,
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
export const SubscriptionData: {
  snippet: {
    resourceId: {
      kind: 'youtube#channel',
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
