"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
const entities_1 = require("./entities");
const util_1 = require("./util");
__export(require("./entities"));
/**
 * The main class used to interact with the YouTube API. Use this.
 */
class YouTube {
    /**
     *
     * @param token Your YouTube Data API v3 token. Don't share this with anybody.
     */
    constructor(token) {
        this.token = token;
    }
    /**
     * Search videos on YouTube.
     * @param searchTerm What to search for on YouTube.
     * @param maxResults The maximum amount of results to find. Defaults to 10.
     */
    searchVideos(searchTerm, maxResults = 10) {
        return this.search('video', searchTerm, maxResults);
    }
    /**
     * Search channels on YouTube.
     * @param searchTerm What to search for on YouTube.
     * @param maxResults The maximum amount of results to find. Defaults to 10.
     */
    searchChannels(searchTerm, maxResults = 10) {
        return this.search('channel', searchTerm, maxResults);
    }
    /**
     * Search playlists on YouTube.
     * @param searchTerm What to search for on YouTube.
     * @param maxResults The maximum amount of results to find. Defaults to 10.
     */
    searchPlaylists(searchTerm, maxResults = 10) {
        return this.search('playlist', searchTerm, maxResults);
    }
    /**
     * Get a video object from the ID of a video.
     * @param id The ID of the video.
     */
    getVideo(id) {
        return this.getItemById('video', id);
    }
    /**
     * Get a channel object from the ID of a channel.
     * @param id The ID of the channel.
     */
    getChannel(id) {
        return this.getItemById('channel', id);
    }
    /**
     * Get a playlist object from the ID of a playlist.
     * @param id The ID of the playlist.
     */
    getPlaylist(id) {
        return this.getItemById('playlist', id);
    }
    /**
     * Get a comment object from the ID of a comment.
     * @param id The ID of the comment.
     */
    getComment(id) {
        return this.getItemById('comment', id);
    }
    /**
     * Get a video object from the url of a video.
     * @param url The url of the video.
     */
    getVideoByUrl(url) {
        const id = util_1.parseUrl(url);
        if (!id.video) {
            return Promise.reject('Not a valid video url');
        }
        return this.getItemById('video', id.video);
    }
    /**
     * Get a channel object from the url of a channel.
     * @param url The url of the channel.
     */
    getChannelByUrl(url) {
        const id = util_1.parseUrl(url);
        if (!id.channel) {
            return Promise.reject('Not a valid channel url');
        }
        return this.getItemById('channel', id.channel);
    }
    /**
     * Get a playlist object from the url of a playlist.
     * @param url The url of the playlist.
     */
    getPlaylistByUrl(url) {
        const id = util_1.parseUrl(url);
        if (!id.playlist) {
            return Promise.reject('Not a valid playlist url');
        }
        return this.getItemById('playlist', id.playlist);
    }
    /**
     * Get `maxResults` videos in a playlist. Used mostly internally with `Playlist#fetchVideos`.
     * @param playlistId The ID of the playlist.
     * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
     */
    getPlaylistItems(playlistId, maxResults = -1) {
        return this.getPaginatedItems('playlistItems', playlistId, maxResults);
    }
    /**
     * Get `maxResults` comments on a video. Used mostly internally with `Video#fetchComments`.
     * Can only get the last 100 comments on a video, due to a bug with the YouTube API.
     * @param videoId The ID of the video.
     * @param maxResults The maximum amount of comments to get from the video. If <= 0 or not included, returns all comments on the video.
     */
    getVideoComments(videoId, maxResults = -1) {
        return this.getPaginatedItems('commentThreads', videoId, maxResults);
    }
    /**
     * Get `maxResults` replies to a comment. Used mostly internally with `Comment#fetchReplies`.
     * @param commentId The ID of the comment to get replies from.
     * @param maxResults The maximum amount of replies to get. Gets all replies if <= 0 or not included.
     */
    getCommentReplies(commentId, maxResults = -1) {
        return this.getPaginatedItems('comments', commentId, maxResults);
    }
    search(type, searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (maxResults < 1 || maxResults > 50) {
                return Promise.reject('Max results must be greater than 0 and less than or equal to 50');
            }
            const results = yield util_1.request.api('search', {
                q: encodeURIComponent(searchTerm),
                maxResults,
                key: this.token,
                part: 'snippet',
                type
            });
            const items = [];
            results.items.forEach(item => {
                switch (type) {
                    case 'video':
                        items.push(new entities_1.Video(this, item));
                        break;
                    case 'channel':
                        items.push(new entities_1.Channel(this, item));
                        break;
                    case 'playlist':
                        items.push(new entities_1.Playlist(this, item));
                        break;
                    default:
                        throw new Error('Type must be a video, channel, or playlist');
                }
            });
            return items;
        });
    }
    getItemById(type, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            if (type === 'video') {
                result = yield util_1.request.api('videos', {
                    id,
                    part: 'snippet,contentDetails,statistics,status',
                    key: this.token
                });
            }
            else if (type === 'channel') {
                result = yield util_1.request.api('channels', {
                    id,
                    part: 'snippet,contentDetails,statistics,status',
                    key: this.token
                });
            }
            else if (type === 'playlist') {
                result = yield util_1.request.api('playlists', {
                    id,
                    part: 'snippet,contentDetails,player',
                    key: this.token
                });
            }
            else if (type === 'comment') {
                result = yield util_1.request.api('comments', {
                    id,
                    part: 'snippet',
                    key: this.token
                });
            }
            if (result.items.length === 0) {
                return Promise.reject('Item not found');
            }
            switch (type) {
                case 'video':
                    return new entities_1.Video(this, result.items[0]);
                case 'playlist':
                    return new entities_1.Playlist(this, result.items[0]);
                case 'channel':
                    return new entities_1.Channel(this, result.items[0]);
                case 'comment':
                    return new entities_1.YTComment(this, result.items[0]);
                default:
                    throw new Error('Type must be a video, channel, or playlist');
            }
        });
    }
    getPaginatedItems(type, id, maxResults = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            let full;
            let items = [];
            if (maxResults <= 0) {
                full = true;
            }
            else {
                full = false;
            }
            let max;
            if (type === 'playlistItems') {
                max = 50;
            }
            else if (type === 'commentThreads' || type === 'comments') {
                max = 100;
            }
            else {
                return Promise.reject('Unknown item type ' + type);
            }
            if (maxResults > max) {
                return Promise.reject(`Max results must be ${max} or below`);
            }
            const options = {
                part: 'snippet',
                key: this.token,
                maxResults: full ? max : maxResults
            };
            switch (type) {
                case 'playlistItems':
                    options.playlistId = id;
                    break;
                case 'commentThreads':
                    options.videoId = id;
                    options.part += ',replies';
                    options.textFormat = 'plainText';
                    break;
                case 'comments':
                    options.parentId = id;
                    break;
            }
            const results = yield util_1.request.api(type, options).catch(error => {
                return Promise.reject('Items not found');
            });
            if (results.items.length === 0) {
                return Promise.reject('Items not found');
            }
            const totalResults = results.pageInfo.totalResults;
            const perPage = results.pageInfo.resultsPerPage;
            const pages = Math.floor(totalResults / perPage);
            results.items.forEach(item => {
                let comment;
                switch (type) {
                    case 'playlistItems':
                        items.push(new entities_1.Video(this, item));
                        break;
                    case 'commentThreads':
                        comment = new entities_1.YTComment(this, item.snippet.topLevelComment);
                        items.push(comment);
                        break;
                    case 'comments':
                        items.push(new entities_1.YTComment(this, item));
                        break;
                }
                if (item.replies) {
                    item.replies.comments.forEach(reply => {
                        const created = new entities_1.YTComment(this, reply);
                        comment.replies.push(created);
                    });
                }
            });
            if (!full || pages === 0) {
                return items;
            }
            let oldRes = results;
            options.pageToken = oldRes.nextPageToken;
            for (let i = 1; i < pages; i++) {
                const newResults = yield util_1.request.api(type, options);
                oldRes = newResults;
                newResults.items.forEach(item => {
                    let comment;
                    switch (type) {
                        case 'playlistItems':
                            items.push(new entities_1.Video(this, item));
                            break;
                        case 'commentThreads':
                            comment = new entities_1.YTComment(this, item.snippet.topLevelComment);
                            items.push(comment);
                            break;
                        case 'comments':
                            items.push(new entities_1.YTComment(this, item));
                            break;
                    }
                    if (item.replies) {
                        item.replies.comments.forEach(reply => {
                            const created = new entities_1.YTComment(this, reply);
                            comment.replies.push(created);
                        });
                    }
                });
            }
            return items;
        });
    }
}
exports.YouTube = YouTube;
