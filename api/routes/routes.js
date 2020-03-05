'use strict';

// require controller
let controller = require('../controllers/controller');

let routes = function(app){
  app.get('/', function(req, res){
    console.log('get: /');
    res.send({server: 'Dimelo papa, API online...'})
  }),
  app.get('/allarticles', controller.allArticulo)
  app.get('/site/:site', controller.site)
  app.get('/category/:category', controller.category)
  app.get('/:site/:category', controller.site_category)
}

module.exports = routes;