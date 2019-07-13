# Better YouTube API
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i better-youtube-api`

[![GitHub issues](https://img.shields.io/github/issues/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/issues)
[![GitHub stars](https://img.shields.io/github/stars/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/stargazers)
[![GitHub license](https://img.shields.io/github/license/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/blob/master/LICENSE)
[![TravisCI test](https://travis-ci.com/jasonhaxstuff/better-youtube-api.svg?branch=master)](https://travis-ci.com/jasonhaxstuff/better-youtube-api)

# Examples
First of all, I recommend that you check out [the documentation](https://jasonhaxstuff.github.io/better-youtube-api/) for all of the methods and what they return. Here are some basic methods:

Instantiate the object:

```js
const { YouTube } = require('better-youtube-api')
const youtube = new YouTube(apiKey)
```

Instantiate the object without caching:

```js
const { YouTube } = require('better-youtube-api')
const youtube = new YouTube(apiKey, { cache: false })
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
