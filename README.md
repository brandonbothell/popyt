# popyt
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i popyt`

[![GitHub issues](https://img.shields.io/github/issues/jasonhaxstuff/popyt.svg)](https://github.com/jasonhaxstuff/popyt/issues)
[![GitHub stars](https://img.shields.io/github/stars/jasonhaxstuff/popyt.svg)](https://github.com/jasonhaxstuff/popyt/stargazers)
[![GitHub license](https://img.shields.io/github/license/jasonhaxstuff/popyt.svg)](https://github.com/jasonhaxstuff/popyt/blob/master/LICENSE)
[![Coverage status](https://coveralls.io/repos/github/jasonhaxstuff/popyt/badge.svg?branch=master)](https://coveralls.io/github/jasonhaxstuff/popyt?branch=master)
[![Actions status](https://github.com/jasonhaxstuff/popyt/workflows/CI/badge.svg)](https://github.com/jasonhaxstuff/popyt/actions)
[![Downloads](https://img.shields.io/npm/dt/popyt.svg)](https://www.npmjs.com/package/popyt)
[![Version](https://img.shields.io/npm/v/popyt.svg)](https://www.npmjs.com/package/popyt)

Check out [our website](https://bbothell.me/popyt)!

# Examples
First of all, I recommend that you check out [the documentation](https://bbothell.me/popyt/docs) for all of the methods and what they return. Here are some basic methods:

Instantiate the object:

```js
const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey)
```

Instantiate the object without caching:

```js
const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey, { cache: false })
```

Get a video by ID:

```js
const video = await youtube.getVideo('dQw4w9WgXcQ')
console.log(video)
```

### You can do the same thing with playlists, channels, and comments by replacing `Video` with any of them. ###

Get a video by URL:

```js
const video = await youtube.getVideo('https://youtube.com/watch?v=dQw4w9WgXcQ')
console.log(video)
```

Get a video by title (or similar title):

```js
const video = await youtube.getVideo('never gonna give you up')
console.log(video)
```

## Search videos:

```js
const videos = await youtube.searchVideos('never gonna give you up', 12)
console.log(videos) // array of 12 partial video objects
```

Note: This wrapper does not implement every feature of the YouTube API. With a single developer working on it, there just isn't time for everything to be implemented. Some of the objectively most-important features have been added. The limits imposed by the wrapper are not imposed by YouTube.

# Development
## Before committing:

* Run TSLint.
* Run `yarn coverage` or `npm run coverage` to check if you've added enough tests. It should display 100% statement, line, and branch coverage.
* Also, make sure that every test passes.
