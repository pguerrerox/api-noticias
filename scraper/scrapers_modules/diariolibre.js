'use strict'

//libraries
const Xray = require('x-ray');
const Filters = require('../filters');

// xray init
const xray = new Xray({
  filters:{
    twitterfy: Filters.twitterfy
  }
});

const scraper = function (baseurl, param) {
  // baseurl (string) = https://www.diariolibre.com/cronologia/ver/meta/
  // param (string) = politica

  let site = baseurl.match(/(\/\/www.)(.+)(.com)/)[2];
  let url = String(baseurl+param);
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
  .write(`data/${site}.json`)
}

module.exports = scraper;
