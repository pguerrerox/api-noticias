'use strict'

// express
const express = require('express');
let app = express();
let port = process.env.PORT || 3000;
app.listen(port, function(){
  console.log(`App running on port: ${port}`);
})

// routes
let routes = require('./api/routes/routes');
routes(app);
