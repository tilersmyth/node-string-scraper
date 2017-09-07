# String-scraper

String-scraper is a NodeJS module that checks if a string exists within the contents of a URL. Boolean returned via Bluebird promise.

```js
const stringScraper = require('string-scraper')

const url = 'http://www.example.com/';
const string = 'This domain is established to be used for illustrative examples in documents.';
const charMin = 50;

stringScraper(url, string, charMin)
    .then((result) => {
        return result;
    })
    .catch((err) => {
        console.log(err);
    });

```

## Installation
```shell
npm install string-scraper
```

## Testing
To run the tests, download the repo, then within the string-scraper directory, run:
```shell
npm test
```