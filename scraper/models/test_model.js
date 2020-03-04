'use strict'

// libraries
let mongoose = require('mongoose');
let Schema = mongoose.Schema;

function validateFunc(val){
  if(val == '1111'){
    return false
  } else {
    return true
  }
}
let validatorMessage = "Problem with {PATH}-{VALUE}, validation failed..."

// schema
let testSchema = new Schema({
  link: String,
  uuid: {
    type: Number,
    validate: [validateFunc, validatorMessage]
  },
})

module.exports = mongoose.model('Test', testSchema);


// testing code for SAVE-TO-DB.js
let testData = [
  {
    link: 'www.link.com.do',
    uuid: 1241
  },
  {
    link: 'www.link.com.do',
    uuid: 1111
  }
]
function testing(x){
  x.forEach(elem => {
    let testDoc = new testModel({
      link: elem.link,
      uuid: elem.uuid
    });
    testDoc.save( (err) => {
      if(err){
        console.log(err.message);
      } else {
        console.log('Data saved...');
      }
    })
  });
}
// testing(testData);