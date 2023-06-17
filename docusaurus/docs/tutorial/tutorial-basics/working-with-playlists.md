---
sidebar_position: 1
---

# Working with Playlists
Playlists are lists of videos and a some metadata including a title, description, etc. They have some unique behaviors, especially pertaining to the completeness of videos fetched from these objects.

## Initialize your YouTube object
```js
const { YouTube } = require('popyt')
const youtube = new YouTube('api_key')
```

:::danger TAKE CARE

It is not recommended to place an API key directly in your code. Instead, use an environment variable.

:::

## Fetch your first playlist
```js
const playlistById = youtube.getPlaylist('PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI')
const playlistByUrl = youtube.getPlaylist('https://www.youtube.com/watch?v=AyOqGRjVtls&list=PLOnQsl0GcqfbrO4-KsJQp7ecp5T16frBI')
const playlistByTitleSearch = youtube.getPlaylist('Never Gonna Give You Up Parodies')

console.log(`Playlist title: ${playlistById.title}`)
console.log(`Playlist length: ${playlistById.length} videos`)
```

:::tip CHILD OBJECTS MUST BE FETCHED EXPLICITLY

To save your quota, Popyt doesn't fetch child objects of classes automatically. Instead, you can fetch them as you need them using convienent methods right on the class objects, or with the main YouTube class methods.

:::

## Fetch a playlist's videos
:::tip VALUES AREN'T GUARANTEED

Playlists are unique because they contain [playlist items](https://developers.google.com/youtube/v3/docs/playlistItems) rather than videos.

:::

```js
const videos = await playlist.fetchVideos() // or use .then()

console.log(`Title of first video: ${playlist.videos[0].title}`) // available through the original object
console.log(`Title of last video: ${videos[videos.length - 1].title}`) // or from the return value of the method
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
