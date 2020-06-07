# api-noticias

API dedicated to scrape and serve news from different sites.

## Functionality

There are two independent parts to this software, the scraper and the API.

### Scraping

1. The scraper module gets the desire information from the specify website (see How to use section)
2. The information is processed and some fields will be added
3. Every scraped article will be save to a mongoDB database (duplicates will not be saved). 

### API

1. The API will get the articles from the database, previously populated by the scraper side of the software
2. The API will respond to requests on some routes:
  - `/` - the server status
  - `/allarticles` - all the articles on the database
  - `/site/:site` - all articles from a specific site
  - `/category/:category` - all articles of one category
  - `/:site/:category` - all articles from a given site and a given category

## Installing

- clone repo
- run `npm install`

## How to use

### Scraping

- This software can scrape pre-defined sites. 
  - To specify a site an object key needs to be created on `/scraper/aux/sites.js`
```javasxript
  {
    "site": site name,
    "baseUrl": sites url,
    "params": array of sites categories
  }
```
  - For the same site, a module with the x-ray logic most be created on `/scraper/scraper_modules/`
  - The scrapers will run on a time interval set passed as an parameter to the start function; found inside `/scraper/scraper.js`

### API

- Just make sure the scraper works, this is simple enough.
- To define new routes and logic...
  - routes are define at `/api/routes/routes.js`
  - logic are define at `/api/controllers/controller.js`, using mongoose's query.

## Challenges
- running scrapers after a change on the target url..
- adjust the promises to run and wait..

##TODO
- route-controller for date period
- api auth
- 

## Built With
* [node.js](https://nodejs.org/) - JS on the server
* [express](https://expressjs.com/) - Web framework for Nodejs
* [x-ray](https://www.npmjs.com/package/x-ray) - The next web scraper
* [mongoDB](https://www.mongodb.com/) - noSQL database
* [mongoose](https://mongoosejs.com/) - Elegant `mongodb` object modeling for `node.js`
* [nodemon](https://github.com/remy/nodemon) - Monitor for any changes in your node.js application and automatically restart the server

## Authors
* **Pedro Guerrero** - *Initial work* - [pguerrerox](https://github.com/pguerrerox)

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details
