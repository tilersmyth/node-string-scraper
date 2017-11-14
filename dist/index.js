"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var cheerio = require("cheerio");
var storage = require("node-persist");
var Promise = require("bluebird");
function stringScraper(url, string, identifier, charLimit, cache) {
    // Validate parameter types
    if (typeof url !== 'string' || typeof string !== 'string') {
        return Promise.reject('Parameter type error');
    }
    // Validate character limit defined by param
    if (string.length < charLimit) {
        return Promise.reject('Error: String must exceed ' + charLimit + ' characters');
    }
    // Remove white space from string
    var trimString = string.replace(/\s+/g, '');
    //If cache option is truthy
    if (cache) {
        // Fire up node-persist, TTL: 5 min
        storage.initSync({ ttl: 2 * 60 * 5000 });
        // Use Cached results if available
        var existingScrape = storage.getItemSync(url);
        if (existingScrape) {
            return Promise.resolve(existingScrape.includes(trimString));
        }
    }
    return rp(url)
        .then(function (html) {
        // Get HTML body content using Cheerio
        var $ = cheerio.load(html);
        //Identifier not found on page
        if ($('html').find(identifier).length === 0) {
            //throw new Error('not_found');
            var error = new Error('Identifier used to find content not found.');
            error.name = 'not_found';
            throw error;
        }
        var scrape = $(identifier).text();
        var trimScrape = scrape.replace(/\s+/g, '');
        // Cache scrape results with url as key
        if (cache) {
            storage.setItemSync(url, trimScrape);
        }
        // Return boolean
        return trimScrape.includes(trimString);
    })
        .catch(function (err) {
        throw err;
    });
}
exports.stringScraper = stringScraper;
