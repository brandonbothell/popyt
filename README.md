# Popyt
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i popyt`

[![40+ stars on GitHub](https://img.shields.io/github/stars/brandonbothell/popyt)](https://github.com/brandonbothell/popyt/stargazers)
[![Permissive license](https://img.shields.io/github/license/brandonbothell/popyt)](https://github.com/brandonbothell/popyt/blob/master/LICENSE)
[![90%+ test coverage](https://codecov.io/gh/brandonbothell/popyt/branch/release/graph/badge.svg?token=OAV13MIW6S)](https://app.codecov.io/gh/brandonbothell/popyt/tree/release)
[![Automated testing](https://github.com/brandonbothell/popyt/workflows/Test/badge.svg)](https://github.com/brandonbothell/popyt/actions)
[![DeepScan grade: good](https://deepscan.io/api/teams/21522/projects/24946/branches/772144/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21522&pid=24946&bid=772144)
[![5k+ downloads](https://img.shields.io/npm/dt/popyt)](https://www.npmjs.com/package/popyt)
[![Available on NPM](https://img.shields.io/npm/v/popyt)](https://www.npmjs.com/package/popyt)
[![<100kb](https://badgen.net/bundlephobia/min/popyt)](https://bundlephobia.com/package/popyt)
[![Zero Dependencies](https://badgen.net/bundlephobia/dependency-count/popyt)](https://bundlephobia.com/package/popyt)
[![Open an issue on GitHub](https://img.shields.io/github/issues/brandonbothell/popyt)](https://github.com/brandonbothell/popyt/issues)

# Examples
### Look at the [documentation](https://popyt.brandonsbench.net/docs/api), or:
### Try out the [5-minute tutorial](https://popyt.brandonsbench.net/docs/tutorial/intro) or the [example project](https://github.com/brandonbothell/popyt-example).
Here are some basic methods ([try it on CodeSandbox](https://codesandbox.io/p/sandbox/fetch-videos-from-youtube-jmqlfq)):

Instantiate the object:

```js
const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey)
```

Instantiate the object without caching:

```js
const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey, undefined, { cache: false })
```

Get a video by ID:

```js
const video = await youtube.getVideo('dQw4w9WgXcQ')
console.log(video)
```

You can do the same thing with playlists, channels, and comments by replacing `Video` with any of them.  

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

Search videos:

```js
const search = await youtube.searchVideos('never gonna give you up')
console.log(search.items.map(v => v.title).join('\n')) // titles of 50 beautiful videos
```

Note: This wrapper does not implement every feature of the YouTube API. If you would like anything added, feel free to open a PR or an issue. The limits imposed by the wrapper are not imposed by YouTube.
