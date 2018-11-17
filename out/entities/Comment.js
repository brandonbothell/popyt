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
class YTComment {
    constructor(youtube, data) {
        this.youtube = youtube;
        this.data = data;
        this._init(data);
    }
    _init(data) {
        if (data.kind !== 'youtube#comment') {
            throw new Error(`Invalid comment type: ${data.kind}`);
        }
        const comment = data;
        this.id = comment.id;
        this.author = {
            username: comment.snippet.authorDisplayName,
            avatar: comment.snippet.authorProfileImageUrl,
            channelId: comment.snippet.authorChannelId.value,
            channelUrl: comment.snippet.authorChannelUrl
        };
        this.text = {
            displayed: comment.snippet.textDisplay,
            original: comment.snippet.textOriginal
        };
        this.rateable = comment.canRate;
        this.popular = comment.viewerRating === 'like' ? true : comment.likeCount >= 100;
        this.likes = comment.likeCount;
        this.datePublished = comment.publishedAt;
        this.dateEdited = comment.updatedAt;
        this.parentId = comment.parentId ? comment.parentId : comment.videoId;
        this.replies = [];
    }
    /**
     * Fetches replies to the comment.
     * @param maxResults The maximum amount of replies to fetch. Fetches all comments if not included
     * or less than 0.
     */
    fetchReplies(maxResults = -1) {
        return __awaiter(this, void 0, void 0, function* () {
            this.replies = yield this.youtube.getCommentReplies(this.id, maxResults);
            return this.replies;
        });
    }
}
exports.YTComment = YTComment;

//# sourceMappingURL=Comment.js.map
