'use strict'

// libraries
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// validator function
function validator(value){
  return new Promise((resolve, reject) => {
    this.constructor.findOne({uuid : value}, (err, result)=>{
      // console.log(Boolean(value));
      // console.log('-------------------');
      // console.log(Boolean(result));
      resolve(!(Boolean(value) == Boolean(result)))
    })
    // console.log(`ToSave: ${value.uuid} vs InDB: ${result.uuid}`);
  })
}
let validatorMessage = "ERROR: {PATH} already exist..."

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
    validate: ({validator: validator, message: validatorMessage})
  }
  // multimedia: String
})

module.exports = mongoose.model('Articulo', articuloSchema);