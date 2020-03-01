'use strict'
// DESC: module exports a function that will read the scrapers produced files and save each article 
// to the mongoDB, also it will avoid saving duplicates.

// libraries
const fs = require('fs');

// helpers
const articuloModel = require('../models/article_model');
// const sites = require('./aux/sites');
// const testModel = require('./models/test_model');

// mongoose
// let mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

// database
// let db = mongoose.connection;
// db.on('error', console.error.bind(console, 'connection error'));
// db.once('open', function () {
//   console.log('Connected...')
// });


// FIXED LOOP THROUGH OBJECT>>>>


// main function...
// _sites: array of objects
function saveToDB(_site, _param){
  console.log(`${_site}/${_param} - saving to DB`);
  
  // _sites.forEach(function (elem) {
  //   let dataFile = JSON.parse(fs.readFileSync(`../../data/${elem.site}_${elem.params}.json`, 'utf8'));
  //   for (let i = 0; i < dataFile.length; i++) {
  //     let element = dataFile[i];
  //     let articulo = new articuloModel({
  //       link: element.link,
  //       content: {
  //         title: element.content.title,
  //         author: element.content.author,
  //         // date: element.content.date,
  //         subcategory: element.content.subcategory,
  //         summary: element.content.summary,
  //         related_links: element.content.related_links
  //       },
  //       source: element.source,
  //       category: element.category,
  //       uuid: element.uuid,
  //     })
  //     articulo.save((err) => {
  //       if (!err) {
  //         console.log('done?')
  //       } else {
  //         console.error(err.message);
  //       }
  //     })
  //   }
  // })
}

module.exports = saveToDB;