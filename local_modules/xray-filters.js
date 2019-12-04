'use strict';

const filters = {
  twitterfy: function(text,end){
    return typeof text === 'string' ? text.slice(0, end).concat('...') : text
  },
  clean: function(text){
    return typeof text === 'string' ? text.trim() : text
  }
}

module.exports = filters;