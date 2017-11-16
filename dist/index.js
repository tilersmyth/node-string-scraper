"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var cheerio = require("cheerio");
var storage = require("node-persist");
var Promise = require("bluebird");
function stringScraper(url, string, identifier, charLimit, cache) {
    // Validate parameter types
    if (typeof url !== 'string' || typeof string !== 'string' || typeof identifier !== 'string' || typeof charLimit !== 'number' || typeof cache !== 'boolean') {
        return Promise.reject(new Error('Parameter type error'));
    }
    // Validate character limit defined by param
    if (string.length < charLimit) {
        return Promise.reject(new Error('String must exceed ' + charLimit + ' characters'));
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
            throw new Error('Identifier used to find content not found in page of provided url.');
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
        throw new Error(err);
    });
}
exports.stringScraper = stringScraper;
