"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
//import * as request from 'request';
var rp = require("request-promise");
var cheerio = require("cheerio");
function stringScrape(url, string, charLimit) {
    return rp(url)
        .then(function (html) {
        if (typeof url !== 'string' || typeof string !== 'string') {
            throw new Error('Parameter type error');
        }
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
exports.stringScrape = stringScrape;
