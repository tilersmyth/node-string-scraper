import * as rp from 'request-promise';
import * as cheerio from 'cheerio';

export function stringScrape(url: string, string: string, charLimit: number):any {

   return rp(url)
    .then((html) => {

        // Validate parameter types
        if (typeof url !== 'string' || typeof string !== 'string') {
            throw 'Error: Parameter type error';
        }
        
        // Validate character limit defined by param
        if (string.length < charLimit){
            throw 'Error: String must exceed ' + charLimit + ' characters';
        }
        
        const $ = cheerio.load(html);
        const text = $('body').text();
        return text.includes(string);
        
    })
    .catch((err) => {
        throw err;
    });
   
}