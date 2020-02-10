'use strict'
// DESC
// module exports a function that will run all the scrapers after trigger (timer or watcher)
// options: timer, watcher, sync or async

// libraries
const diff = require('diff');
const puppeteer = require('puppeteer');

// helpers
const sites = require('./sites');

fireEmAll(sites);
// main function...
async function fireEmAll(_sites){
  console.log(`inicio...`);

  try {
    _sites.forEach(site => {
      let params = site.param;
      params.forEach( async param => {
        let test = 1;
        let baseUrl = site.baseUrl;
        let oldData = await puppeRequest(baseUrl, param);
        return compareFunc(oldData, test, site, baseUrl, param)
      })
    })
  }
  catch (err){
    console.log(err);
  }
}

// comparator func
async function compareFunc(_oldData, testNo, _site, _url, _param) {
  console.log(`comparando...${_url}${_param}`);

  try{
    let newData = await puppeRequest(_url, _param);

    // difference calc
    let diffx = diff.diffChars(_oldData, newData);
    let total = diffx.filter((x) => !x.added && !x.removed).reduce((acc, obj) => (acc + obj.count), 0);
    let changed = diffx.filter((x) => x.added == true || x.removed == true).reduce((acc, obj) => (acc + obj.count), 0);
    let result = Math.round((changed/total)*100);
    
    console.log(`TEST: ${testNo}`);
    if (result > 25){
      console.log(`llamando scraper para... ${_url}${_param}`);
      goScraper(_site);
      _oldData = newData;
    }
    else{
      console.log(`no es necesario scrapear... ${_url}${_param}, tratar luego`);
      console.log("===============");
      testNo++;
    }
    return setTimeout(() => compareFunc(_oldData, testNo, _site, _url, _param), 1000 * 10)
  }
  catch (err){
    console.error(err);
  }
}

// headless/request
async function puppeRequest(_url, _param){
  console.log(`chequeando...${_url}${_param}`);

  let fullUrl = String(_url+_param);
  try{
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(fullUrl);
    await page.waitForSelector('body', {timeout: 2000});

    const body = await page.evaluate(() => {
      return document.querySelector('body').innerHTML;
    });
    console.log(body.slice(0,1500));
    await browser.close();
    return body.slice(0,2000)
  }
  catch(err){
    console.log(err);
  }
}

// goScraper(), call the scraper_modules for the sites and params define on the sites.js helper...
const goScraper = function (_site) {
  console.log(`llamando scraper...${_site.baseUrl}${_site.param}`)
  // scraper_modules
  // let scraperModule = require(`../scraper_modules/${_site.site}`);
  // let baseUrl = _site.baseUrl;
  // let param = _site.param;
  // console.log(`scraping...${baseUrl}${param}`);
  // return scraperModule(baseUrl, param);
}


// module.exports = final;