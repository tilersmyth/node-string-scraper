import { stringScraper } from './index';
import { expect } from 'chai';

describe('Scrape function', () => {

  //Test variables
  const sampleUrl = 'http://www.example.com/';
  const trueString = 'This domain is established to be used for illustrative examples in documents.';
  const falseString = 'This string does not exist on example.com';
  const badUrl = 'http://urldoesnotexist.com/';

  it('string exists on page of provided url', () => {    
    return stringScraper(sampleUrl, trueString, 1)
      .then((result:boolean) => {
        expect(result).be.true;
      })
      .catch((err:any) => {
        throw new Error('Test failed');
      });
  });

  it('string does not exist on page of provided url', () => {    
    return stringScraper(sampleUrl, falseString, 1)
      .then((result:boolean) => {
        expect(result).be.false;
      })
      .catch((err:any) => {
        throw new Error('Test failed');
      });
  });

  it('should throw invalid url error', () => {    
    return stringScraper(badUrl, trueString, 1)
      .catch((err:any) => {
        expect(err.error.code).to.equal('ENOTFOUND');
      });
  });

  it('should throw character count error', () => {    
    return stringScraper(sampleUrl, trueString, 100)
      .catch((err:any) => {
        expect(err).to.equal('Error: String must exceed 100 characters');
      });
  });

});