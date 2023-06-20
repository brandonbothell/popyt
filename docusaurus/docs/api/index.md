---
id: "index"
title: "Documentation"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

import RunkitCodeBlock from '@site/src/components/RunkitCodeBlock'

# Getting Started
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i popyt`

[![GitHub issues](https://img.shields.io/github/issues/jasonhaxstuff/popyt.svg)](https://github.com/jasonhaxstuff/popyt/issues)
[![GitHub stars](https://img.shields.io/github/stars/jasonhaxstuff/popyt.svg)](https://github.com/jasonhaxstuff/popyt/stargazers)
[![GitHub license](https://img.shields.io/github/license/jasonhaxstuff/popyt.svg)](https://github.com/jasonhaxstuff/popyt/blob/master/LICENSE)
[![Coverage status](https://codecov.io/gh/brandonbothell/popyt/branch/master/graph/badge.svg?token=OAV13MIW6S)](https://codecov.io/gh/brandonbothell/popyt)
[![Actions status](https://github.com/jasonhaxstuff/popyt/workflows/Test/badge.svg)](https://github.com/jasonhaxstuff/popyt/actions)
[![DeepScan grade](https://deepscan.io/api/teams/13038/projects/16072/branches/335663/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=13038&pid=16072&bid=335663)
[![Downloads](https://img.shields.io/npm/dt/popyt.svg)](https://www.npmjs.com/package/popyt)
[![Version](https://img.shields.io/npm/v/popyt.svg)](https://www.npmjs.com/package/popyt)

## Examples

:::tip QUESTION? CHECK THE DOCS

See the [main class documentation](./api/classes/Library_Exports.YouTube)
or the [tutorial](./tutorial/intro) to get started.

:::

Here are some basic methods:

Instantiate the object:

<RunkitCodeBlock
  language="js"
  runkitUrl="https://runkit.com/brandonbothell/fetch-a-video">
  {`const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey)`}
</RunkitCodeBlock>

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
const videos = await youtube.searchVideos('never gonna give you up')
console.log(videos.map(v => v.title).join('\n')) // titles of 50 beautiful videos
```

Note: This wrapper does not implement every feature of the YouTube API. If you would like anything added, feel free to open an issue. The limits imposed by the wrapper are not imposed by YouTube.

## Development/Contributing

Before committing:
* Run `yarn lint`.
* Run `yarn coverage` or `npm run coverage` to check if you've added enough tests. It should display 100% statement, line, and branch coverage.
* Also, make sure that every test passes.
