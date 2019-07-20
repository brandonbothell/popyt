# Better YouTube API
Want to access data from the YouTube Data v3 API? Want a Node.js YouTube API wrapper with typings, promises, and caching? No problem! We've got ya covered. `npm i better-youtube-api`

[![GitHub issues](https://img.shields.io/github/issues/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/issues)
[![GitHub stars](https://img.shields.io/github/stars/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/stargazers)
[![GitHub license](https://img.shields.io/github/license/jasonhaxstuff/better-youtube-api.svg)](https://github.com/jasonhaxstuff/better-youtube-api/blob/master/LICENSE)
[![Coverage Status](https://coveralls.io/repos/github/jasonhaxstuff/better-youtube-api/badge.svg?branch=master)](https://coveralls.io/github/jasonhaxstuff/better-youtube-api?branch=master)
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

Note 1: By using `better-youtube-api`, you are agreeing to be bound to the [YouTube ToS](https://www.youtube.com/t/terms).

Note 2: This wrapper does not implement every feature of the YouTube API. With a single developer working on it, there just isn't time for everything to be implemented. Some of the objectively most-important features have been added. The limits imposed by the wrapper are not imposed by YouTube.

## Privacy Policy
`better-youtube-api` uses YouTube API services.  
No personal user information is stored by the client.  
Public channel/video/playlist/comment data is stored by the client for an amount of time editable by the user. This amount of time defaults to 10 minutes.  
The client stores public channel data explicitly and/or implicitly (requesting video stores the uploader's ID, etc.) requested by the user.  
Follows the [Google Privacy Policy](http://www.google.com/policies/privacy).  

