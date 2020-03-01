'use strict'

// libraries
let crypto = require('crypto');

module.exports = function getHash(x){
  let hash = crypto.createHash('sha1');
  return hash.update(x).digest('base64');
}