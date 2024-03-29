---
id: "index"
title: "Documentation"
sidebar_label: "Readme"
sidebar_position: 0
custom_edit_url: null
---

import CodeSandboxBlock from '@site/src/components/CodeSandboxBlock'

# Getting Started
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i popyt`

[![GitHub issues](https://img.shields.io/github/issues/brandonbothell/popyt.svg)](https://github.com/brandonbothell/popyt/issues)
[![GitHub stars](https://img.shields.io/github/stars/brandonbothell/popyt.svg)](https://github.com/brandonbothell/popyt/stargazers)
[![GitHub license](https://img.shields.io/github/license/brandonbothell/popyt.svg)](https://github.com/brandonbothell/popyt/blob/master/LICENSE)
[![Release coverage](https://codecov.io/gh/brandonbothell/popyt/branch/release/graph/badge.svg?token=OAV13MIW6S)](https://app.codecov.io/gh/brandonbothell/popyt/tree/release)
[![Actions status](https://github.com/brandonbothell/popyt/workflows/Test/badge.svg)](https://github.com/brandonbothell/popyt/actions)
[![DeepScan grade](https://deepscan.io/api/teams/21522/projects/24946/branches/772144/badge/grade.svg)](https://deepscan.io/dashboard#view=project&tid=21522&pid=24946&bid=772144)
[![Downloads](https://img.shields.io/npm/dt/popyt.svg)](https://www.npmjs.com/package/popyt)
[![Version](https://img.shields.io/npm/v/popyt.svg)](https://www.npmjs.com/package/popyt)

## Examples

:::tip QUESTION? CHECK THE DOCS

See the [main class documentation](./api/classes/Library_Exports.YouTube), the [tutorial](./tutorial/intro), or the [example project](https://github.com/brandonbothell/popyt-example) to get started.

:::

Here are some basic methods:

Instantiate the object:

<CodeSandboxBlock
  language="js"
  url="https://codesandbox.io/p/sandbox/fetch-videos-from-youtube-jmqlfq">
  {`const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey)`}
</CodeSandboxBlock>

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

Note: This wrapper does not implement every feature of the YouTube API. If you would like anything added, feel free to open an issue. The limits imposed by the wrapper are not imposed by YouTube.
