'use strict'

// libraries
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema
let testSchema = new Schema({
  link: String,
})

module.exports = mongoose.model('Test', testSchema);