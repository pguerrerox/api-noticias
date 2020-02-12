'use strict'
// DESC
// module exports a function that will run all the scrapers after a trigger (timer or watcher)
// options_wanted: timer and watchDog.

// helpers
const sites = require('./sites');

// main function...
function timedScrapers(_sites, _timeInterval){
  console.log('inicio...');
  let iteration = 1;

  _sites.forEach(site => {
    let params = site.params;

    params.forEach(async param => {
      return setInterval(async () => {
        console.log(`${iteration}- Calling scraper... ${site.site}/${param}`)
        await goScraper(site.site, site.baseUrl, param);
        iteration ++
      }, _timeInterval)
    })
  })
}

// goScraper(), call the scraper_modules for the sites and params define on the sites.js helper...
const goScraper = async function (_site, _baseUrl, _param) {

  // importing scraper_modules
  let scraperModule = await require(`../scraper_modules/${_site}`);
  
  return await scraperModule(_baseUrl, _param);
}

// timedScrapers(sites, 10000);
module.exports = timedScrapers;

// comparator func
// async function comparisonFunc(_previousState, _url, _iteration){
//   try{
//     let currentState = await puppeRequest(_url);
//     // difference calc
//     let diffx = diff.diffChars(_previousState, currentState);
//     let total = diffx.filter((x) => !x.added && !x.removed).reduce((acc, obj) => (acc + obj.count), 0);
//     let changed = diffx.filter((x) => x.added == true || x.removed == true).reduce((acc, obj) => (acc + obj.count), 0);
//     let result = Math.round((changed/total)*100);
//     return {
//       "diff": result,
//       "state": currentState}
//   }
//   catch(err){
//     console.log(err)
//   }
// }

// async function comparisonFuncOld(_oldData, testNo, _site, _url, _param) {
//   try{
//     let newData = await puppeRequest(_url, _param);
//     // difference calc
//     let diffx = diff.diffChars(_oldData, newData);
//     let total = diffx.filter((x) => !x.added && !x.removed).reduce((acc, obj) => (acc + obj.count), 0);
//     let changed = diffx.filter((x) => x.added == true || x.removed == true).reduce((acc, obj) => (acc + obj.count), 0);
//     let result = Math.round((changed/total)*100);
//     console.log(`TEST: ${testNo}`);
//     if (result > 25){
//       console.log(`llamando scraper para... ${_url}${_param}`);
//       goScraper(_site);
//       _oldData = newData;
//     }
//     else{
//       console.log(`no es necesario scrapear... ${_url}${_param}, tratar luego`);
//       console.log("===============");
//       testNo++;
//     }
//     return setTimeout(() => compareFunc(_oldData, testNo, _site, _url, _param), 1000 * 10)
//   }
//   catch (err){
//     console.error(err);
//   }
// }

// headless/request
// async function puppeRequest(_url){
//   try{
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     await page.goto(_url);
//     await page.waitForSelector('body', {timeout: 2000});
//     const body = await page.evaluate(() => {
//       return document.querySelector('body').innerHTML;
//     });
//     await browser.close();
//     return crypto(body)
//   }
//   catch(err){
//     console.log(err);
//   }
// }