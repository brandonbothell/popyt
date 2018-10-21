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
    search(type, searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (maxResults < 1 || maxResults > 50) {
                return Promise.reject('Max results must be greater than 0 and less than or equal to 50');
            }
            const results = yield util_1.request.api('search', {
                q: searchTerm,
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
            if (result.items.length === 0) {
                return Promise.reject('Item not found');
            }
            return result.items[0];
        });
    }
    /**
     * Search videos on YouTube.
     * @param searchTerm What to search for on YouTube.
     * @param maxResults The maximum amount of results to find. Defaults to 10.
     */
    searchVideos(searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.search('video', searchTerm, maxResults);
        });
    }
    /**
     * Search channels on YouTube.
     * @param searchTerm What to search for on YouTube.
     * @param maxResults The maximum amount of results to find. Defaults to 10.
     */
    searchChannels(searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.search('channel', searchTerm, maxResults);
        });
    }
    /**
     * Search playlists on YouTube.
     * @param searchTerm What to search for on YouTube.
     * @param maxResults The maximum amount of results to find. Defaults to 10.
     */
    searchPlaylists(searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.search('playlist', searchTerm, maxResults);
        });
    }
    /**
     * Get a video object from the ID of a video.
     * @param id The ID of the video.
     */
    getVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new entities_1.Video(this, yield this.getItemById('video', id));
        });
    }
    /**
     * Get a channel object from the ID of a channel.
     * @param id The ID of the channel.
     */
    getChannel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new entities_1.Channel(this, yield this.getItemById('channel', id));
        });
    }
    /**
     * Get a playlist object from the ID of a playlist.
     * @param id The ID of the playlist.
     */
    getPlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return new entities_1.Playlist(this, yield this.getItemById('playlist', id));
        });
    }
    /**
     * Get a video object from the url of a video.
     * @param url The url of the video.
     */
    getVideoByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = util_1.parseUrl(url);
            if (!id.video) {
                return Promise.reject('Not a valid video url');
            }
            return new entities_1.Video(this, yield this.getItemById('video', id.video));
        });
    }
    /**
     * Get a channel object from the url of a channel.
     * @param url The url of the channel.
     */
    getChannelByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = util_1.parseUrl(url);
            if (!id.channel) {
                return Promise.reject('Not a valid channel url');
            }
            return new entities_1.Channel(this, yield this.getItemById('channel', id.channel));
        });
    }
    /**
     * Get a playlist object from the url of a playlist.
     * @param url The url of the playlist.
     */
    getPlaylistByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = util_1.parseUrl(url);
            if (!id.playlist) {
                return Promise.reject('Not a valid playlist url');
            }
            return new entities_1.Playlist(this, yield this.getItemById('playlist', id.playlist));
        });
    }
    /**
     * Get `maxResults` videos in a playlist. Used mostly internally with `Playlist#getVideos`.
     * @param playlistId The ID of the playlist.
     * @param maxResults The maximum amount of videos to get from the playlist. If <= 0 or not included, returns all videos in the playlist.
     */
    getPlaylistItems(playlistId, maxResults = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            let full;
            let videos = [];
            if (maxResults <= 0) {
                full = true;
            }
            else {
                full = false;
            }
            if (maxResults > 50) {
                return Promise.reject('Max results must be 50 or below');
            }
            const results = yield util_1.request.api('playlistItems', {
                playlistId,
                part: 'snippet',
                key: this.token,
                maxResults: full ? 50 : maxResults
            }).catch(() => {
                return Promise.reject('Playlist not found');
            });
            const totalResults = results.pageInfo.totalResults;
            const perPage = 50;
            const pages = Math.floor(totalResults / perPage);
            results.items.forEach(item => {
                videos.push(new entities_1.Video(this, item));
            });
            if (!full || pages === 0) {
                return videos;
            }
            let oldRes = results;
            for (let i = 1; i < pages; i++) {
                const newResults = yield util_1.request.api('playlistItems', {
                    playlistId,
                    part: 'snippet',
                    key: this.token,
                    maxResults: 50,
                    pageToken: oldRes.nextPageToken
                });
                oldRes = newResults;
                newResults.items.forEach(item => {
                    videos.push(new entities_1.Video(this, item));
                });
            }
            return videos;
        });
    }
}
exports.YouTube = YouTube;
