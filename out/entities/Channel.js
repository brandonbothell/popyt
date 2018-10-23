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
 * A YouTube channel.
 */
class Channel {
    constructor(youtube, data) {
        this.youtube = youtube;
        this.data = data;
        this._init(data);
    }
    _init(data) {
        if (data.kind === 'youtube#channel' && data.status.isLinked) {
            const channel = data;
            this.id = channel.id;
            this.country = channel.snippet.country;
            this.language = channel.snippet.defaultLanguage;
            this.views = Number(channel.statistics.viewCount);
            this.comments = Number(channel.statistics.commentCount);
            if (!channel.statistics.hiddenSubscriberCount) {
                this.subCount = Number(channel.statistics.subscriberCount);
            }
            else {
                this.subCount = -1;
            }
        }
        else if (data.kind === 'youtube#searchResult') {
            this.id = data.id.channelId;
        }
        else {
            throw new Error(`Invalid channel type: ${data.kind}`);
        }
        this.url = `https://youtube.com/channel/${this.id}`;
        this.profilePictures = data.snippet.thumbnails;
        this.dateCreated = new Date(data.snippet.publishedAt);
        this.name = data.snippet.title;
        this.about = data.snippet.description;
        this.full = data.kind === 'youtube#channel';
    }
    /**
     * Fetches this channel and reassigns this object to the new channel object.
     * Only useful if `this.full` is false, or if you want updated channel info.
     */
    fetch() {
        return __awaiter(this, void 0, void 0, function* () {
            const channel = yield this.youtube.getChannel(this.id);
            return Object.assign(this, channel);
        });
    }
    /**
     * Fetches the channel's videos and assigns them to the `Channel#videos` property.
     */
    fetchVideos() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(this.data.contentDetails)) {
                yield this.fetch();
            }
            const videos = yield this.youtube.getPlaylist(this.data.contentDetails.relatedPlaylists.uploads);
            this.videos = videos;
            return this.videos;
        });
    }
}
exports.Channel = Channel;
