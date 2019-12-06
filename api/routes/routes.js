'use strict';

let routes = function(app){
  // require controller

  app.route('/')
    .get(function(req, res){
      res.send('Dimelo papa, API online...')
    })

}

module.exports = routes;