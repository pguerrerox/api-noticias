'use stric';

// mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useUnifiedTopology: true });

// database
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function () {
  console.log('Connected...');
});

// model
let articulo = require('../../scraper/models/article_model');

// get all articles
exports.allArticulo = function(req, res, next){
  console.log('get: '+req.path);
  articulo.find({}, (err, data)=>{
    if(err){return next(err)}
    res.json(data);
  });
}

// get articles of given site
exports.site = function(req, res){
  console.log('get: '+req.path);
  articulo.find({source: req.params.site}, (err, data)=>{
    if(err){throw err}
    if(data.length){
      res.json(data);
    }else{
      console.log('no data');
      res.json({data: 'there\'s no data'})
    }
  });
}

// get articles of given caregory
exports.category = function(req, res){
  console.log('get: '+req.path);
  articulo.find({category: req.params.category}, (err, data)=>{
    if(err){throw err};
    if(data.length){
      res.json(data)
    }else{
      res.json({data: 'there\'s no data'})
    }
  })
}

// get articles of fiven /site/category
exports.site_category = function(req, res){
  console.log('get: '+req.path);
  articulo.find({source: req.params.site, category: req.params.category}, (err, data)=>{
    if(err){throw err}
    if(data.length){
      res.json(data)
    }else{
      res.json({data: 'there\'s no data'})
    }
    
  })
}