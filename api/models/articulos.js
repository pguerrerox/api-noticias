'use strict';

let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let ArticuloSchema = new Schema({
  link: String,
  content: {
    title: String,
    author: String,
    date: Date,
    subcategory: String,
    summary: String,
    related_links: {
      type: Array,
      default: undefined
    }
  },
  multimedia: String
})

module.exports = mongoose.model('Articulo', ArticuloSchema);