"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var chai_1 = require("chai");
describe('Scrape function', function () {
    //Test variables
    var sampleUrl = 'https://www.boston.com/weather/national-news/2017/09/06/here-are-4-maps-that-show-hurricane-irmas-path';
    var trueString = 'Hurricane Irma tore through the Caribbean on Wednesday';
    var falseString = 'This string does not exist on example.com';
    var badUrl = 'http://urldoesnotexist.com/';
    it('string exists on page of provided url', function () {
        return index_1.stringScraper(sampleUrl, trueString, 'body', 1, false)
            .then(function (result) {
            chai_1.expect(result).be.true;
        })
            .catch(function (err) {
            throw new Error('Test failed');
        });
    });
    it('string does not exist on page of provided url', function () {
        return index_1.stringScraper(sampleUrl, falseString, 'body', 1, false)
            .then(function (result) {
            chai_1.expect(result).be.false;
        })
            .catch(function (err) {
            throw new Error('Test failed');
        });
    });
    it('should throw invalid url error', function () {
        return index_1.stringScraper(badUrl, trueString, 'body', 1, false)
            .catch(function (err) {
            chai_1.expect(err.error.code).to.equal('ENOTFOUND');
        });
    });
    it('should throw character count error', function () {
        return index_1.stringScraper(sampleUrl, trueString, 'body', 100, false)
            .catch(function (err) {
            chai_1.expect(err).to.equal('Error: String must exceed 100 characters');
        });
    });
});
