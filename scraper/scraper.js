'use strict'
// DESC: starts the scraper function periodically with a time interval...

// libraries
const sites = require('./aux/sites');
const startScrapers = require('./aux/startScrapers');

// main function...
// function scrapeAndSave(_sites, _timeInterval){
//   setInterval( async ()=>{
//     try{
//       console.log('arrancamos');
//       await goScrape(_sites);
//       console.log('websites scraped, files created');
//       await saveData(_sites);
//       console.log('files saved to DB');
//     }
//     catch(err){
//       console.log(err);
//     }
//   }, _timeInterval*(1000*60));
// }

startScrapers(sites);