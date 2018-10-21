"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = require("https");
const url_1 = require("url");
exports.request = {
    api: (subUrl, params) => {
        let url = 'https://www.googleapis.com/youtube/v3' + (subUrl.startsWith('/') ? subUrl : '/' + subUrl);
        for (let param in params) {
            url += (!url.includes('?') ? '?' : '&') + param + '=' + params[param];
        }
        return get(url);
    }
};
function get(url) {
    const options = parseUrlToOptions(url, 'GET');
    return req(options, req => {
        req.on('error', error => {
            throw error;
        });
        req.end();
    });
}
function post(url, data) {
    const options = parseUrlToOptions(url, 'POST');
    return req(options, req => {
        req.on('error', error => {
            throw error;
        });
        req.write(data);
        req.end();
    });
}
function put(url, data) {
    const options = parseUrlToOptions(url, 'PUT');
    return req(options, req => {
        req.on('error', error => {
            throw error;
        });
        req.write(data);
        req.end();
    });
}
function parseUrlToOptions(url, type) {
    const parsed = url_1.parse(url);
    return {
        hostname: parsed.hostname,
        port: parsed.port ? parsed.port : 443,
        path: parsed.path,
        method: type,
        headers: {
            'Content-Type': 'application/json'
        }
    };
}
function req(options, reqFunction) {
    return new Promise((resolve, reject) => {
        const cb = (res) => {
            let data = '';
            res.setEncoding('utf8');
            res.on('data', chunk => {
                data += chunk;
            });
            res.on('end', () => {
                const parsed = JSON.parse(data);
                if (parsed.error) {
                    return reject(new Error(parsed.error.message));
                }
                resolve(parsed);
            });
            res.on('error', error => {
                reject(error);
            });
        };
        reqFunction(https_1.request(options, cb));
    });
}
