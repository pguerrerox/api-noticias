'use strict'

//libraries
const Xray = require('x-ray');
const Filters = require('../filters');

//xray init
const xray = new Xray({
  filters:{
    twitterfy: Filters.twitterfy,
    clean: Filters.clean,
  }
});

const scraper = function (baseurl, param){
  // baseurl (string) = https://www.listindiario.com/buscar?find=
  // param (string) = politica

  let site = baseurl.match(/(\/\/www.)(.+)(.com)/)[2];
  let url = String(baseurl+param);
  xray(url, 'div#users > ul > li',
  [{
    link: 'div > div > a@href',
    content: xray('div > div > a@href', 
    xray('div.content > div#content1',{
      title : 'div > article > h1 |  clean',
      author: 'div > article > div.article-body-author',
      date: 'div.art_sly_1 > span | clean',
      subcategory: 'div > article > h3.art_pretitulo | clean',
      //  multimedia: '',
      summary: 'div > article > div#ArticleBody | twitterfy:240 | clean',
      related_links: xray('div.content > div#content1 > div.panel > div.panel-body',[
        'a@href'
      ])
    }))
  }])
  .write(`data/${site}.json`)
}

module.exports = scraper;