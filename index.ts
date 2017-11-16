import * as rp from 'request-promise';
import * as cheerio from 'cheerio';
import * as storage from 'node-persist';
import * as Promise from 'bluebird';

export function stringScraper(url: string, string: string, identifier: string, charLimit: number, cache: boolean) : Promise<any> { 

    // Validate parameter types
    if (typeof url !== 'string' || typeof string !== 'string' || typeof identifier !== 'string' || typeof charLimit !== 'number' || typeof cache !== 'boolean') {
        return Promise.reject(new Error('Parameter type error'));
    }
    
    // Validate character limit defined by param
    if (string.length < charLimit){
        return Promise.reject(new Error('String must exceed ' + charLimit + ' characters'));

    }

    // Remove white space from string
    const trimString = string.replace(/\s+/g, '');

    //If cache option is truthy
    if(cache){

        // Fire up node-persist, TTL: 5 min
        storage.initSync({ttl: 2 * 60 * 5000});

        // Use Cached results if available
        const existingScrape = storage.getItemSync(url);
        if(existingScrape){
            return Promise.resolve(existingScrape.includes(trimString));
        }

    }

    return rp(url)
        .then((html) => {
            
            // Get HTML body content using Cheerio
            const $ = cheerio.load(html);

            //Identifier not found on page
            if($('html').find(identifier).length === 0){
                throw new Error('Identifier used to find content not found in page of provided url.')
            }

            const scrape = $(identifier).text();
            const trimScrape = scrape.replace(/\s+/g, '');

            // Cache scrape results with url as key
            if(cache){
                storage.setItemSync(url, trimScrape);
            }

            // Return boolean
            return trimScrape.includes(trimString);
            
        })
        .catch((err) => {
            throw new Error(err)
        });
   
}