import * as rp from 'request-promise';
import * as cheerio from 'cheerio';
import * as storage from 'node-persist';
import * as Promise from 'bluebird';

export function stringScraper(url: string, string: string, charLimit: number) : Promise<any> {

    // Validate parameter types
    if (typeof url !== 'string' || typeof string !== 'string') {
        return Promise.reject('Parameter type error');
    }
    
    // Validate character limit defined by param
    if (string.length < charLimit){
        return Promise.reject('Error: String must exceed ' + charLimit + ' characters');
    }

    // Fire up node-persist, TTL: 5 min
    storage.initSync({ttl: 2 * 60 * 5000});

    // Use Cached results if available
    const existingUrl = storage.getItemSync(url);
    if(existingUrl){
        return Promise.resolve(existingUrl.includes(string));
    }

    return rp(url)
        .then((html) => {
            
            // Get HTML body content using Cheerio
            const $ = cheerio.load(html);
            const text = $('body').text();

            // Cache scrape results with url as key
            storage.setItemSync(url, text);

            // Return boolean
            return text.includes(string);
            
        })
        .catch((err) => {
            throw err;
        });
   
}