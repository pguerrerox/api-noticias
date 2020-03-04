'use strict'
// DESC: module exports a function that scrape "diariolibre" website...

// libraries
const Xray = require('x-ray');
const filters = require('../aux/filters');

// xray init
const xray = new Xray({
  filters: {
    twitterfy: filters.twitterfy,
    clean: filters.clean
  }
});

// main function...
module.exports = function moduleFunc(_url, _callback, _site, _param) {
  xray(_url, 'article.article',
    [{
      link: 'div > div > div > div > a@href',
      content: xray('div > div > div > div > a@href',
        xray('section.section-detail', {
          title: 'div > div > div > div > h1',
          author: 'div > div > div > div > div > span > a',
          // date: 'div > div > div > div > div > span > label',
          subcategory: 'div > div > div > div > div > a:last-child',
          // multimedia: 'div > div > div > div > div > div > div > div > figure > div > img',
          summary: 'div > div > div > div > div > div > div.paragraph | twitterfy:240',
          related_links: xray('div > div > div > div > div > div > div > div > div > div > section.categoryList', [
            'section.categoryList > article > a@href'
          ])
        }))
    }])
    ((err, data) => _callback(err, data, _site, _param))
}