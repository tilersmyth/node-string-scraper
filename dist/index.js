"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rp = require("request-promise");
var cheerio = require("cheerio");
function stringScraper(url, string, charLimit) {
    return rp(url)
        .then(function (html) {
        // Validate parameter types
        if (typeof url !== 'string' || typeof string !== 'string') {
            throw 'Error: Parameter type error';
        }
        // Validate character limit defined by param
        if (string.length < charLimit) {
            throw 'Error: String must exceed ' + charLimit + ' characters';
        }
        var $ = cheerio.load(html);
        var text = $('body').text();
        return text.includes(string);
    })
        .catch(function (err) {
        throw err;
    });
}
exports.stringScraper = stringScraper;
