'use strict'
// DESC: module exports a function that will read the scrapers produced files and save each article 
// to the mongoDB, also it will avoid saving duplicates.

// libraries
const fs = require('fs');
const path = require('path');

// helpers
const articuloModel = require('../models/article_model');
const testModel = require('../models/test_model');

// mongoose
let mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

// database
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connected...')
});

// main function...
function saveToDB(_site, _param){
  console.log(`${_site}/${_param} - saving to DB`);

  let pathToJSON = path.join(__dirname, '..','..', 'data');
  fs.readFile(`${pathToJSON}/${_site}_${_param}.json`, 'utf8', (err, data) => {
    let dataFile = JSON.parse(data);
    if(!err){
      for (let i = 0; i < dataFile.length; i++) {
        let element = dataFile[i];
        let articulo = new articuloModel({
        // let articulo = new testModel({
          link: element.link,
          content: {
            title: element.content.title,
            author: element.content.author,
            date: element.content.date,
            subcategory: element.content.subcategory,
            summary: element.content.summary,
            related_links: element.content.related_links
          },
          source: element.source,
          category: element.category,
          uuid: element.uuid,
        });
        articulo.save((err) => {
          if (err) {
            throw err;
          }
        });
      }
      console.log(`Done with, ${_site}_${_param}`);
    }
    else {
      throw err
    }
  })
}

saveToDB('diariolibre', 'cultura');