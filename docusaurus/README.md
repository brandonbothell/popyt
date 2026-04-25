import CodeBlock from '@theme/CodeBlock'
import SearchBar from '@theme/SearchBar'

# Popyt

Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i popyt`

[![40+ stars on GitHub](https://img.shields.io/github/stars/brandonbothell/popyt)](https://github.com/brandonbothell/popyt/stargazers)
[![0 dependencies](https://badgen.net/bundlephobia/dependency-count/popyt?label=dependencies)](https://bundlephobia.com/package/popyt)
[![Permissive license](https://badgen.brandonsbench.net/npm/license/popyt?icon=unlicense&label=)](https://github.com/brandonbothell/popyt/blob/master/LICENSE)
[![Open an issue on GitHub](https://badgen.brandonsbench.net/github/open-issues/brandonbothell/popyt?icon=github)](https://github.com/brandonbothell/popyt/issues)
[![Automated testing](https://github.com/brandonbothell/popyt/workflows/Development/badge.svg)](https://github.com/brandonbothell/popyt/actions)
[![90%+ test coverage](https://badgen.brandonsbench.net/codecov/github/brandonbothell/popyt/release?icon=codecov)](https://app.codecov.io/gh/brandonbothell/popyt/tree/release)
[![DeepScan grade: good](https://badgen.brandonsbench.net/deepscan/grade/team/21522/project/24946/branch/772144?icon=deepscan)](https://deepscan.io/dashboard#view=project&tid=21522&pid=24946&bid=772144)
[![Trending on NPM](https://badgen.brandonsbench.net/npm/dw/popyt?icon=npm)](https://www.npmjs.com/package/popyt)
[![Available on NPM](https://badgen.brandonsbench.net/npm/v/popyt?icon=npm&label=)](https://www.npmjs.com/package/popyt)
[![Less than 750 kilobytes (100kB minified)](https://badgen.net/packagephobia/install/popyt?label=size)](https://bundlephobia.com/package/popyt)
[![200+ packages use Popyt to access the YouTube API](https://badgen.brandonsbench.net/github/dependents-repo/brandonbothell/popyt?label=projects%20using%20popyt)](https://github.com/brandonbothell/popyt/network/dependents)
[![5000 lines of code and counting](https://badgen.brandonsbench.net/deepscan/lines/team/21522/project/24946/branch/772144?label=lines%20of%20code)](https://ghloc.vercel.app/brandonbothell/popyt?branch=master&locsPath=%5B%22src%22%5D)
[![Written in TypeScript](https://badgen.brandonsbench.net/npm/types/popyt?icon=typescript)](https://popyt.brandonsbench.net/docs/api/Library-Exports/classes/YouTube)

### Ask the AI assistant below, try out the [5-minute tutorial](https://popyt.brandonsbench.net/docs/tutorial/intro), or clone the [example project](https://github.com/brandonbothell/popyt-example).

<SearchBar />
<br />
:::tip[QUESTION? CHECK THE DOCS]
### What you'll need

- A [YouTube Data v3](https://developers.google.com/youtube/v3/getting-started) API key:
  - Complete steps 1-4 on the page linked above and copy your API key.
:::

***

```bash npm2yarn
npm install popyt
```

## Examples

See the [main class documentation](./api/Library-Exports/classes/YouTube), the [tutorial](./tutorial/intro), or the [example project](https://github.com/brandonbothell/popyt-example) to get started.

Here are some basic methods:

Instantiate the object:

<CodeBlock
  language="js"
  url="https://codesandbox.io/p/sandbox/fetch-videos-from-youtube-jmqlfq">
  {`const { YouTube } = require('popyt')
const youtube = new YouTube(apiKey)`}
</CodeBlock>

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

Note: This wrapper does not implement every feature of the YouTube API. If you would like anything added, [feel free to open a pull request or an issue](https://github.com/brandonbothell/popyt). The limits imposed by the wrapper are not imposed by YouTube.
