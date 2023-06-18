---
sidebar_position: 1
---

# Tutorial Intro

Let's discover **Popyt in less than 5 minutes**.

## Getting started

Get started by [creating a new Node.JS project](https://docs.npmjs.com/cli/v9/commands/npm-init#examples) and running `npm install popyt`.  
Check out the **[RunKit](https://runkit.com/brandonbothell/fetch-a-video)** for a quick example
that you can run online and copy-paste.

### What you'll need

- A [YouTube Data v3](https://developers.google.com/youtube/v3/getting-started) API key:
  - Complete steps 1-4 and copy your API key.

## Retrieving public data

Retrieve public data from YouTube by directly using the YouTube class. Instantiate the class like this:

```js
const { YouTube } = require('popyt')
const youtube = new YouTube('api_key')
```

:::danger TAKE CARE

It is not recommended to place an API key directly in your code. Instead, use an environment variable.

:::

Here are a few examples of retrieving data, but check the documentation for everything else:

Get a video by ID:
<font size="2.5"><b><a href="https://runkit.com/brandonbothell/fetch-a-video">Try this on RunKit</a></b></font>

```js
const video = await youtube.getVideo('dQw4w9WgXcQ')
console.log(video.title)
```

You can do the same thing with playlists, channels, and comments by replacing Video with any of them.  

Get a video by URL:

```js
const video = await youtube.getVideo('https://youtube.com/watch?v=dQw4w9WgXcQ')
console.log(video.title)
```

Get a video by title (or similar title):

```js
const video = await youtube.getVideo('never gonna give you up')
console.log(video.title)
```

Search videos:

```js
const search = await youtube.searchVideos('never gonna give you up', 12)
console.log(search.results.map(v => v.title).join('\n')) // array of 12 partial video objects
```

## Retrieving private data

<!--- (See [working with OAuth](../tutorial-extras/working-with-oauth).) -->
