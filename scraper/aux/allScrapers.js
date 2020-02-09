'use strict'
// DESC
// module exports a function that will run all the scrapers after trigger (timer or watcher)
// options: timer, watcher, sync or async

// libraries
const diff = require('diff');
const puppeteer = require('puppeteer');

// helpers
const sites = require('./sites');

// goScraper(), call the scraper_modules for the sites and params define on the sites.js helper...
const goScraper = function (_sites) {
  // scraper_modules
  let scraperModule = require(`../scraper_modules/${site.site}`);
  let baseUrl = site.baseUrl;
  let param = site.param;
  console.log(`Scraping...${site.site}-${param}`);
  scraperModule(baseUrl, param);
  // _sites.forEach(site => {
  //   params.forEach(param => {
  //   })
  // });
}

// headless/request
async function puppeRequest(_site){
  // let url = _site.site;
  // console.log(url);
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`${_site.baseUrl}${_site.param}`);
    await page.waitForSelector('body', {timeout: 2000});

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });
    // console.log(body);
    await browser.close();
    return body
  }
  catch(err){
    console.log(err);
  }
}

// comparator func
async function compareFunc(_oldData, testNo, _site) {
  try{
    let newData = await puppeRequest(_site);

    // difference calc
    let diffx = diff.diffChars(_oldData, newData);
    let total = diffx.filter((x) => !x.added && !x.removed).reduce((acc, obj) => (acc + obj.count), 0);
    let changed = diffx.filter((x) => x.added == true || x.removed == true).reduce((acc, obj) => (acc + obj.count), 0);
    let result = Math.round((changed/total)*100);
    
    // console.log(`TEST: ${testNo}`);
    if (result > 25){
      // console.log('scraped-now');
      goScraper(_site);
      _oldData = newData;
    }
    // console.log('do-not-scraped');
    // console.log("===============");
    testNo++;
    return setTimeout(() => compareFunc(_oldData, testNo), 1000 * 15)
  }
  catch (err){
    console.error(err);
  }
}

// export
async function final(_sites){
  try {
    _sites.forEach(site => {
      let params = site.param;

      params.forEach( async param => {
        console.log(`Chequeando...${site.site}-${param}`)
        let oldData = await puppeRequest(site);
        let test = 1;
        return await compareFunc(oldData, test+1, site)
      })
    })
  }
  catch (err){
    console.log(err);
  }
}
// final(sites);

module.exports = final;