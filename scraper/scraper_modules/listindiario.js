'use strict'
// DESC: module exports a function that scrape "listindiario" website...

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
  xray(_url, 'div#users > ul > li',
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
    ((err, data) => _callback(err, data, _site, _param))
}