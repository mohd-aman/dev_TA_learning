// let cheerio = require('cheerio');
// let request = require('request');
const puppeteer = require('puppeteer');
const id = "jafov95470@hype68.com";
const pass = "20110073355";

let companyName = process.argv.slice(2)[0];
let jobId = process.argv.slice(2)[1];
let jobLink = process.argv.slice(2)[2];

let msg = `Hey There ! I am Mohd Aman , a third year student pursuing B.tech from GGSIPU and Currenty looking for internship roles , My key skills are - Strong Problem Solving, C, C++, Java OOPs, DBMS.
I have completed 730+ questions on leetcode.
It will be great If you can refer me for this role 
Job id - ${jobId}
Link- ${jobLink}
Thank You`;
(async () => {
  const browser = await puppeteer.launch({
      headless:false,
      defaultViewport: null,
    args: ["--start-maximized"],
    });
    let page = await browser.newPage();
    await page.goto('https://www.linkedin.com/');
//   await page.screenshot({ path: 'example.png' });
// await page.pdf({ path: 'hn.pdf', format: 'a4' });
// Get the "viewport" of the page, as reported by the page.
    await page.waitForSelector('[autocomplete="username"]');
    await page.type('[autocomplete="username"]',id);
    await page.waitForSelector('[autocomplete="current-password"]');
    await page.type('[autocomplete="current-password"]',pass);
    await page.waitForTimeout(5000);
    await page.click('[data-tracking-control-name="homepage-basic_signin-form_submit-button"]');
    await page.waitForTimeout(5000);
    if(await page.$('.card-layout') !== null){
        page.click('[data-cie-control-urn="checkpoint_remember_me_save_info_no"]');
    }
    if(await page.$('.cp-card-new')!==null){
        page.click('.secondary-action');
    }
    await page.waitForSelector('[data-link-to="mynetwork"]');
    await page.click('[data-link-to="mynetwork"]');
    await page.waitForSelector('.ember-view.mn-community-summary__link.link-without-hover-state');
    let connectionButton = await page.$('.ember-view.mn-community-summary__link.link-without-hover-state');
    await connectionButton.click();
    await page.waitForSelector('[data-control-name="search_with_filters"]');
    await page.click('[data-control-name="search_with_filters"]');
    await page.waitForTimeout(3000);
    await page.waitForSelector('.search-global-typeahead__input.always-show-placeholder');
    await page.click('.search-global-typeahead__input.always-show-placeholder');
    await page.type('.search-global-typeahead__input.always-show-placeholder',companyName)
    await page.keyboard.press('Enter');
    await page.waitForSelector('.entity-result__title .app-aware-link');
    let connections = await page.$$('.entity-result__title .app-aware-link');
    let connectionLinks = [];
    console.log(connections.length);
    for(let i=0;i<connections.length;i++){
        let link = await page.evaluate(function(elem){return elem.getAttribute("href");},connections[i]);
        connectionLinks.push(link);
    }
    console.log(connectionLinks);
    
    // await sendMessage(connectionlinks,page);
    // await browser.close();
})();


async function sendMessage(links,page){
    for(let i=0;i<links.length;i++){
        await page.goto(links[i]);
        await page.waitForSelector('.message-anywhere-button.pvs-profile-actions__action.artdeco-button');
        await page.click('.message-anywhere-button.pvs-profile-actions__action.artdeco-button');
        await page.waitForTimeout(3000);
        if(await page.$('.msg-s-message-list.full-width.scrollable')===null){
            await page.waitForSelector('.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate');
            await page.type('.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate',msg);
            await page.waitForSelector('.msg-form__send-button.artdeco-button.artdeco-button--1');
            await page.waitForTimeout(5000);
            await page.click('.msg-form__send-button.artdeco-button.artdeco-button--1');
        }
    }
}