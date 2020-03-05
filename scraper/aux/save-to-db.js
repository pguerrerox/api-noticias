'use strict'
// DESC: module exports a function that will read the scrapers produced files and save each article 
// to the mongoDB, also it will avoid saving duplicates.

// libraries
const fs = require('fs');
const path = require('path');

// helpers
const articuloModel = require('../models/article_model');
// const testModel = require('../models/test_model');

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

// database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connected...')
});

// main function...
module.exports = function saveToDB(_site, _param){
  console.log(`${_site}/${_param} - saving to DB`);

  let pathToJSON = path.join(__dirname, '..','..', 'data');
  fs.readFile(`${pathToJSON}/${_site}_${_param}.json`, 'utf8', (err, data) => {
    if(!err){
      let dataFile = JSON.parse(data);
      dataFile.forEach( (x) => {
        let articulo = new articuloModel({
          link: x.link,
          content: {
            title: x.content.title,
            author: x.content.author,
            date: x.content.date,
            subcategory: x.content.subcategory,
            summary: x.content.summary,
            related_links: x.content.related_links
          },
          source: x.source,
          category: x.category,
          uuid: x.uuid,
        });
        articulo.save((err) => {
          if (err) {
            if(err.errors['uuid']){
              return console.log(
                {
                  message: err.errors['uuid'].properties.message,
                  value: err.errors['uuid'].properties.value
                }
              );
            } else {
              console.log(err.message)
            }
          }
        });
      })
    }
    else {
      throw err
    }
  })
}
// saveToDB('diariolibre', 'cultura');