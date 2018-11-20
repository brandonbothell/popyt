# Better YouTube API
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings and promises? No problem! We've got ya covered. `npm i better-youtube-api`

# Examples
First of all, I recommend that you check out [the documentation](https://jasonhaxstuff.github.io/better-youtube-api/) for all of the methods and what they return. Here are some basic methods:

Instantiate the object:

```js
const { YouTube } = require('better-youtube-api')
const youtube = new YouTube(apiKey)
```

Get a video by ID:

```js
const video = await youtube.getVideo('dQw4w9WgXcQ')
console.log(video)
```

Get a video by URL:

```js
const video = await youtube.getVideoByUrl('https://youtube.com/watch?v=dQw4w9WgXcQ')
console.log(video)
```

You can do the same thing with playlists, channels, and comments by replacing `Video` with either one.
