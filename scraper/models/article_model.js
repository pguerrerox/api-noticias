'use strict'

// libraries
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// schema
let articuloSchema = new Schema({
  link: String,
  content: {
    title: String,
    author: String,
    date: Date,
    subcategory: String,
    summary: String,
    related_links: Array
  },
  source: String,
  category: String,
  uuid: {
    type: String,
    validate: {
      validator: function(value){
        return new Promise((resolve, reject) => {
          let result = this.constructor.findOne({uuid : value})
          .then(() => {
            if(!result){resolve(true)}
            else {resolve(false)}
          })
        })
      }
    }
  }
  // multimedia: String
})

module.exports = mongoose.model('Articulo', articuloSchema);