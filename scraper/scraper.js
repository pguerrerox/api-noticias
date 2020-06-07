'use strict'
// DESC: runs the scrapers periodically...

// libraries
const sites = require('./aux/sites');
const scraperModule = require('./aux/scraperModule');

// main function...
async function scrapeAndSave(_sites){
  try{
    console.log('inicio...');
    _sites.forEach(site => {
      let params = site.params; 
      params.forEach(param => {
        console.log(`${site.site}/${param} - scraper started...`);
        scraperModule(site.baseUrl, param);
      });
    });
    console.log('working on the background...');
  }
  catch(err){
    console.log(err);
  }
}

function counter(time){
  let sec = time*1000*60;
  function plus1(){
    if(sec <= 0){
      sec = time*1000*60
    }
    console.log(`Time to next scraping: ${sec/60000} mins`);
    sec -= 1000*60
  }
  plus1();
  return setInterval(plus1, 1000*60)
}

function start(sites, time){
  scrapeAndSave(sites);
  counter(time)
  return setInterval(()=> scrapeAndSave(sites), time*1000*60)
}

// start function  call
start(sites, 5) //240min = 4hours...