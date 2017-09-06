"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("./index");
var chai_1 = require("chai");
describe('Scrape function', function () {
    //Test variables
    var sampleUrl = 'http://www.example.com/';
    var trueString = 'This domain is established to be used for illustrative examples in documents.';
    var falseString = 'This string does not exist on example.com';
    var badUrl = 'http://urldoesnotexist.com/';
    it('string exists on page of provided url', function () {
        return index_1.stringScrape(sampleUrl, trueString, 1)
            .then(function (result) {
            chai_1.expect(result).be.true;
        })
            .catch(function (err) {
            throw new Error('Test failed');
        });
    });
    it('string does not exist on page of provided url', function () {
        return index_1.stringScrape(sampleUrl, falseString, 1)
            .then(function (result) {
            chai_1.expect(result).be.false;
        })
            .catch(function (err) {
            throw new Error('Test failed');
        });
    });
    it('should throw invalid url error', function () {
        return index_1.stringScrape(badUrl, trueString, 1)
            .catch(function (err) {
            chai_1.expect(err.error.code).to.equal('ENOTFOUND');
        });
    });
    it('should throw character count error', function () {
        return index_1.stringScrape(sampleUrl, trueString, 100)
            .catch(function (err) {
            console.log(err);
            chai_1.expect(err).to.equal('Error: String must exceed 100 characters');
        });
    });
});
