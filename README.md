# Better YouTube API
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i better-youtube-api`

[![GitHub issues](https://img.shields.io/github/issues/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/issues)
[![GitHub stars](https://img.shields.io/github/stars/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/stargazers)
[![GitHub license](https://img.shields.io/github/license/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/jasonhaxstuff/better-youtube-api/badge.svg?branch=master)](https://coveralls.io/github/jasonhaxstuff/better-youtube-api?branch=master)
[![Actions Status](https://github.com/jasonhaxstuff/better-youtube-api/workflows/CI/badge.svg)](https://github.com/jasonhaxstuff/better-youtube-api/actions)
[![Downloads](https://img.shields.io/npm/dt/better-youtube-api.svg)](https://www.npmjs.com/package/better-youtube-api)

Check out [our website](https://bbothell.me/better-youtube-api)!

# Examples
First of all, I recommend that you check out [the documentation](https://bbothell.me/better-youtube-api/docs) for all of the methods and what they return. Here are some basic methods:

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

Note: This wrapper does not implement every feature of the YouTube API. With a single developer working on it, there just isn't time for everything to be implemented. Some of the objectively most-important features have been added. The limits imposed by the wrapper are not imposed by YouTube.
