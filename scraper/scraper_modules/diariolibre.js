'use strict'

// libraries
const Xray = require('x-ray');

// helpers
const filters = require('../aux/filters');
const cb = require('../aux/callback');

// xray init
const xray = new Xray({
  filters: {
    twitterfy: filters.twitterfy
  }
});

function scraper(baseurl, param) {
  // baseurl (string) = https://www.diariolibre.com/cronologia/ver/meta/
  // param (string) = politica

  let site = baseurl.match(/(\/\/www.)(.+)(.com)/)[2];
  let url = String(baseurl + param);

  xray(url, 'article.article',
    [{
      link: 'div > div > div > div > a@href',
      content: xray('div > div > div > div > a@href',
        xray('section.section-detail', {
          title: 'div > div > div > div > h1',
          author: 'div > div > div > div > div > span > a',
          date: 'div > div > div > div > div > span > label',
          subcategory: 'div > div > div > div > div > a:last-child',
          // multimedia: 'div > div > div > div > div > div > div > div > figure > div > img',
          summary: 'div > div > div > div > div > div > div.paragraph | twitterfy:240',
          related_links: xray('div > div > div > div > div > div > div > div > div > div > section.categoryList', [
            'section.categoryList > article > a@href'
          ])
        }))
    }])
    ((err, data) => cb(err, data, site, param))
}

// scraper('https://www.diariolibre.com/cronologia/ver/meta/', 'politica');
module.exports = scraper;