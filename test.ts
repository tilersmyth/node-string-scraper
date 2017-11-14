import { stringScraper } from './index';
import { expect } from 'chai';

describe('Scrape function', () => {

  //Test variables
  const sampleUrl = 'https://www.boston.com/weather/national-news/2017/09/06/here-are-4-maps-that-show-hurricane-irmas-path';
  const trueString = 'Hurricane Irma tore through the Caribbean on Wednesday';
  const falseString = 'This string does not exist on example.com';
  const badUrl = 'http://urldoesnotexist.com/';

  it('string exists on page of provided url', () => {    
    return stringScraper(sampleUrl, trueString, 'body', 1, false)
      .then((result:boolean) => {
        expect(result).be.true;
      })
      .catch((err:any) => {
        throw new Error('Test failed');
      });
  });

  it('string does not exist on page of provided url', () => {    
    return stringScraper(sampleUrl, falseString, 'body', 1, false)
      .then((result:boolean) => {
        expect(result).be.false;
      })
      .catch((err:any) => {
        throw new Error('Test failed');
      });
  });

  it('should throw invalid url error', () => {    
    return stringScraper(badUrl, trueString, 'body', 1, false)
      .catch((err:any) => {
        expect(err.error.code).to.equal('ENOTFOUND');
      });
  });

  it('should throw character count error', () => {    
    return stringScraper(sampleUrl, trueString, 'body', 100, false)
      .catch((err:any) => {
        expect(err).to.equal('Error: String must exceed 100 characters');
      });
  });

});