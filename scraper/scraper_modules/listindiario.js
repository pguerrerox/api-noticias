'use strict'

// libraries
const Xray = require('x-ray');

// helpers
const filters = require('../aux/filters');
const cb = require('../aux/callback');

// xray init
const xray = new Xray({
  filters: {
    twitterfy: filters.twitterfy, clean: filters.clean,
  }
});

let localCounter = 1;

async function scraper(baseurl, param, iteration) {
  // baseurl (string) = https://www.listindiario.com/buscar?find=
  // param (string) = politica

  let site = baseurl.match(/(\/\/www.)(.+)(.com)/)[2];
  let url = String(baseurl + param);

  console.log(`${iteration}.${localCounter} - Starting scraper... ${site}/${param}`);
  await xray(url, 'div#users > ul > li',
    [{
      link: 'div > div > a@href',
      content: xray('div > div > a@href',
        xray('div.content > div#content1', {
          title: 'div > article > h1 |  clean',
          author: 'div > article > div.article-body-author',
          date: 'div.art_sly_1 > span | clean',
          subcategory: 'div > article > h3.art_pretitulo | clean',
          //  multimedia: '',
          summary: 'div > article > div#ArticleBody | twitterfy:240 | clean',
          related_links: xray('div.content > div#content1 > div.panel > div.panel-body', [
            'a@href'
          ])
        }))
    }])
    ((err, data) => cb(err, data, site, param));
    console.log(`${iteration}.${localCounter} - Scraper done... ${site}/${param}`);
    localCounter ++;
}

// scraper("https://www.listindiario.com/buscar?find=","politica")
module.exports = scraper;