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
const googleapis_1 = require("googleapis");
const entities_1 = require("./entities");
const util_1 = require("./util");
const axios_1 = require("axios");
__export(require("./entities"));
const youtube = googleapis_1.google.youtube('v3');
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
    searchVideos(searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: results } = yield youtube.search.list({
                q: searchTerm,
                maxResults,
                auth: this.token,
                part: 'snippet',
                type: 'video'
            });
            if (maxResults === 1) {
                return new entities_1.Video(this, results.items[0]);
            }
            let videos = [];
            for (let i = 0; i < results.items.length; i++) {
                videos.push(new entities_1.Video(this, results.items[i]));
            }
            return videos;
        });
    }
    getVideo(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: video } = yield youtube.videos.list({
                id,
                part: 'snippet,contentDetails',
                auth: this.token
            });
            if (video.items.length === 0) {
                Promise.reject('Video not found.');
            }
            return new entities_1.Video(this, video.items[0]);
        });
    }
    getVideoByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = util_1.parseUrl(url);
            if (!id.video) {
                return Promise.reject('Not a valid video url.');
            }
            const { data: video } = yield youtube.videos.list({
                id: id.video,
                part: 'snippet,contentDetails',
                auth: this.token
            });
            if (video.items.length === 0) {
                Promise.reject('Video not found.');
            }
            return new entities_1.Video(this, video.items[0]);
        });
    }
    searchChannels(searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            if (maxResults < 1) {
                throw new Error('Max results must be greater than 0.');
            }
            const { data: results } = yield youtube.search.list({
                q: searchTerm,
                maxResults,
                auth: this.token,
                part: 'snippet',
                type: 'channel'
            });
            if (maxResults === 1) {
                return new entities_1.Channel(this, results.items[0]);
            }
            let channels = [];
            for (let i = 0; i < results.items.length; i++) {
                channels.push(new entities_1.Channel(this, results.items[i]));
            }
            return channels;
        });
    }
    getChannel(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: channel } = yield youtube.channels.list({
                id,
                part: 'snippet,statistics,status,contentDetails',
                auth: this.token
            });
            if (channel.items.length === 0) {
                Promise.reject('Channel not found.');
            }
            return new entities_1.Channel(this, channel.items[0]);
        });
    }
    getChannelByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = util_1.parseUrl(url);
            if (!id.channel) {
                return Promise.reject('Not a valid channel url.');
            }
            const { data: channel } = yield youtube.channels.list({
                id: id.channel,
                part: 'snippet,statistics,status,contentDetails',
                auth: this.token
            });
            if (channel.items.length === 0) {
                Promise.reject('Channel not found.');
            }
            return new entities_1.Channel(this, channel.items[0]);
        });
    }
    /**
     * Gets the 50 latest videos from a channel.
     * @param id The ID of the channel.
     */
    getChannelVideos(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let videos = [];
            const { data: results } = yield axios_1.default.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${id}&order=date&key=${this.token}&maxResults=50`);
            if (results.items.length === 0) {
                Promise.reject('Channel not found.');
            }
            for (let i = 0; i < results.items.length; i++) {
                videos.push(new entities_1.Video(this, results.items[i]));
            }
            return videos;
        });
    }
    getPlaylist(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: playlist } = yield youtube.playlists.list({
                id,
                part: 'snippet,contentDetails,player',
                auth: this.token
            });
            if (playlist.items.length === 0) {
                Promise.reject('Playlist not found.');
            }
            return new entities_1.Playlist(this, playlist.items[0]);
        });
    }
    getPlaylistByUrl(url) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = util_1.parseUrl(url);
            if (!id.playlist) {
                return Promise.reject('Not a valid playlist url.');
            }
            const { data: playlist } = yield youtube.playlists.list({
                id: id.playlist,
                part: 'snippet,contentDetails,player',
                auth: this.token
            });
            if (playlist.items.length === 0) {
                Promise.reject('Playlist not found.');
            }
            return new entities_1.Playlist(this, playlist.items[0]);
        });
    }
    searchPlaylists(searchTerm, maxResults = 10) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: results } = yield youtube.search.list({
                q: searchTerm,
                maxResults,
                type: 'playlist',
                part: 'snippet',
                auth: this.token
            });
            if (maxResults === 1) {
                return new entities_1.Playlist(this, results.items[0]);
            }
            let playlists = [];
            for (let i = 0; i < results.items.length; i++) {
                playlists.push(new entities_1.Playlist(this, results.items[i]));
            }
            return playlists;
        });
    }
    getPlaylistItems(playlistId) {
        return __awaiter(this, void 0, void 0, function* () {
            let { data: results } = yield youtube.playlistItems.list({
                playlistId,
                part: 'snippet',
                auth: this.token,
                maxResults: 50
            });
            if (results.items.length === 0) {
                Promise.reject('Playlist not found.');
            }
            let oldRes;
            let videos = [];
            results.items.forEach(item => {
                videos.push(new entities_1.Video(this, item));
            });
            const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
                if (!results.nextPageToken || !oldRes.nextPageToken) {
                    clearInterval(interval);
                }
                let newResults;
                if (!oldRes) {
                    newResults = (yield youtube.playlistItems.list({
                        playlistId,
                        part: 'snippet',
                        auth: this.token,
                        maxResults: 50,
                        pageToken: results.nextPageToken
                    })).data;
                }
                else {
                    newResults = (yield youtube.playlistItems.list({
                        playlistId,
                        part: 'snippet',
                        auth: this.token,
                        maxResults: 50,
                        pageToken: oldRes.nextPageToken
                    })).data;
                }
                oldRes = newResults;
                newResults.items.forEach((item) => {
                    videos.push(new entities_1.Video(this, item));
                });
            }), 100);
            return videos;
        });
    }
}
exports.YouTube = YouTube;
//# sourceMappingURL=index.js.map