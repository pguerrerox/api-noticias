'use strict'

// libraries
const fs = require('fs');

// helpers
const sites = require('./aux/sites');
// const goScrape = require('./aux/goScrape');
// const saveData = require('./aux/saveData');

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

// scrapeAndSave(sites, 1);

// const testing = async () => {
//   console.log('arrancamos');
//   goScrape(sites);
//   await console.log('donre');
//   await saveData(sites);
//   console.log('files saved to DB');
// }

const start = async (x) => {
  try{
    await require('./aux/goScrape')(x);
    await require('./aux/saveData')(x);
  }
  catch(err){
    console.log(err);
  }
}

start(sites);
