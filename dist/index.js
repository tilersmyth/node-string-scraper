"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var cheerio = require("cheerio");
var storage = require("node-persist");
var Promise = require("bluebird");
function stringScraper(url, string, charLimit) {
    // Validate parameter types
    if (typeof url !== 'string' || typeof string !== 'string') {
        return Promise.reject('Parameter type error');
    }
    // Validate character limit defined by param
    if (string.length < charLimit) {
        return Promise.reject('Error: String must exceed ' + charLimit + ' characters');
    }
    // Fire up node-persist
    storage.initSync({ ttl: 2 * 60 * 1000 });
    // Use Cached results if available
    var existingUrl = storage.getItemSync(url);
    if (existingUrl) {
        console.log('CACHE');
        return Promise.resolve(existingUrl.includes(string));
    }
    return rp(url)
        .then(function (html) {
        console.log('NO CACHE');
        // Get HTML body content using Cheerio
        var $ = cheerio.load(html);
        var text = $('body').text();
        // Cache scrape results with url as key
        storage.setItemSync(url, text);
        // Return boolean
        return text.includes(string);
    })
        .catch(function (err) {
        throw err;
    });
}
exports.stringScraper = stringScraper;
