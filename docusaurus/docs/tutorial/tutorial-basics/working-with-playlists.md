---
sidebar_position: 1
---
import CodeSandboxBlock, { CodeSandboxText } from '@site/src/components/CodeSandboxBlock'

# Working with Playlists
Playlists are lists of videos and a some metadata including a title, description, etc. They have some unique behaviors, especially pertaining to the completeness of videos fetched from these objects.

## Getting started
If you haven't already, check out [the introduction](../intro).  
Check out the <b><a href='https://runkit.com/brandonbothell/fetch-a-playlist' target='_blank'><CodeSandboxText /></a></b> for a quick **example
that you can run online and download**.

## Fetch your first playlist

<CodeSandboxBlock
  language="js"
  url="https://runkit.com/brandonbothell/fetch-a-playlist">
{`const playlistById = youtube.getPlaylist('PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI')
const playlistByUrl = youtube.getPlaylist('https://www.youtube.com/playlist?list=PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI')
const playlistByTitleSearch = youtube.getPlaylist('Never Gonna Give You Up Parodies')
\n
console.log(\`Playlist title: $\{playlistById.title}\`)
console.log(\`Playlist length: $\{playlistById.length} videos\`)`}
</CodeSandboxBlock>

:::tip CHILD OBJECTS MUST BE FETCHED EXPLICITLY

To save your quota, Popyt doesn't fetch child objects of classes automatically.
Instead, you can fetch them as you need them using convenient methods right on the class objects or the main YouTube class methods.

:::

## Fetch a playlist's videos
:::caution PROPERTIES AREN'T GUARANTEED

Playlists are unique because they contain [playlist items](https://developers.google.com/youtube/v3/docs/playlistItems#resource-representation) rather than videos.

:::

```js
const videos = await playlist.fetchVideos() // or use .then()

console.log(`First video: ${playlist.videos[0].title}`) // available through the original object
console.log(`Last video: ${videos[videos.length - 1].title}`) // or from the return value of the method
```

Playlist items contain less information than videos, but since they are similar, these types have been merged in Popyt. Search results have similar behavior.

```js
const video = playlist.videos[0]

console.log(video.full) // false
console.log(video.commentCount) // undefined

await video.fetch()

console.log(video.full) // true
console.log(video.commentCount) // the number of comments on the video
```
