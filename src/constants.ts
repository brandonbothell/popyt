export const CommentThreadData: {
  id?: string,
  snippet: {
    channelId: string,
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
