"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A YouTube playlist.
 */
class Playlist {
    constructor(youtube, data) {
        this.youtube = youtube;
        this.data = data;
        this._init(data);
    }
    _init(data) {
        if (data.kind === 'youtube#playlist') {
            const playlist = data;
            this.id = playlist.id;
            this.tags = playlist.snippet.tags;
            this.length = playlist.contentDetails.itemCount;
            this.embedHtml = playlist.player.embedHtml;
        }
        else if (data.kind === 'youtube#searchResult') {
            this.id = data.id.playlistId;
        }
        else {
            throw new Error(`Invalid playlist type: ${data.kind}`);
        }
        this.title = data.snippet.title;
        this.creatorId = data.snippet.channelId;
        this.dateCreated = new Date(data.snippet.publishedAt);
        this.thumbnails = data.snippet.thumbnails;
        this.full = data.kind === 'youtube#playlist';
    }
    /**
     * Adds every video in this playlist to the `videos` property of this playlist.
     */
    fetchVideos(maxResults = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            this.videos = yield this.youtube.getPlaylistItems(this.id, maxResults);
            return this.videos;
        });
    }
    /**
     * Fetches this playlist and reassigns this object to the new playlist object.
     * Only useful if `this.full` is false, or if you want updated playlist info.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const playlist = yield this.youtube.getPlaylist(this.id);
            return Object.assign(this, playlist);
        });
    }
}
exports.Playlist = Playlist;
