"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const url_1 = require("url");
const numbers = '\\d+(?:[\\.,]\\d{0,3})?';
const weekPattern = `(${numbers}W)`;
const datePattern = `(${numbers}Y)?(${numbers}M)?(${numbers}D)?`;
const timePattern = `T(${numbers}H)?(${numbers}M)?(${numbers}S)?`;
const iso8601 = `P(?:${weekPattern}|${datePattern}(?:${timePattern})?)`;
const timeArray = ['weeks', 'years', 'months', 'days', 'hours', 'minutes', 'seconds'];
const pattern = new RegExp(iso8601);
function parseUrl(url) {
    const parsed = url_1.parse(url, true);
    switch (parsed.hostname) {
        case 'www.youtube.com':
        case 'youtube.com':
        case 'm.youtube.com': {
            const idRegex = /^[a-zA-Z0-9-_]+$/;
            if (parsed.pathname === '/watch') {
                if (!idRegex.test(parsed.query.v)) {
                    return { video: null, playlist: null, channel: null };
                }
                const response = { video: parsed.query.v, playlist: null, channel: null };
                if (parsed.query.list) {
                    response.playlist = parsed.query.list;
                }
                return response;
            }
            else if (parsed.pathname === '/playlist') {
                if (!idRegex.test(parsed.query.list)) {
                    return { video: null, playlist: null, channel: null };
                }
                return { playlist: parsed.query.list, video: null, channel: null };
            }
            else if (parsed.pathname.startsWith('/channel/')) {
                const id = parsed.pathname.replace('/channel/', '');
                if (!idRegex.test(id)) {
                    return { video: null, playlist: null, channel: null };
                }
                return { channel: id, video: null, playlist: null };
            }
            return { video: null, playlist: null, channel: null };
        }
        case 'youtu.be':
            return { video: /^\/[a-zA-Z0-9-_]+$/.test(parsed.pathname) ? parsed.pathname.slice(1) : null, playlist: null, channel: null };
        default:
            return { video: null, playlist: null, channel: null };
    }
}
exports.parseUrl = parseUrl;
function parseIsoDuration(duration) {
    return duration.match(pattern).slice(1).reduce((prev, current, index) => {
        prev[timeArray[index]] = parseFloat(current) || 0;
        return prev;
    }, { weeks: 0, years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 });
}
exports.parseIsoDuration = parseIsoDuration;
