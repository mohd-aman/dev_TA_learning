let cheerio = require('cheerio');
let request = require('request');
const puppeteer = require('puppeteer');
const id = "jafov95470@hype68.com";
const pass = "20110073355";
let jobId = "#####NO####ID###TESTING########";
let jobLink = "####NO###LINK####TESTING#####"
let msg = `Hey There ! I am Mohd Aman , a third year student pursuing B.tech from GGSIPU and Currenty looking for internship roles , My key skills are - Strong Problem Solving, C, C++, Java OOPs, DBMS.
It will be great If you can refer me for this role 
Job id - ${jobId}
Link- ${jobLink} Thank You`;
let companyNames = process.argv.slice(2);
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
    //code for searching for company 
    // for(let i=0;i<companyNames.length;i++){
    //     await page.waitForSelector('.search-global-typeahead__input.always-show-placeholder');
    //     if(i>0){
    //         await page.focus('.search-global-typeahead__input.always-show-placeholder');
    //         await page.keyboard.down('Control');
    //         await page.keyboard.press('A');
    //         await page.keyboard.up('Control');
    //         await page.keyboard.press('Backspace');
    //     }
    //     await page.type('.search-global-typeahead__input.always-show-placeholder',companyNames[i]);
    //     await page.keyboard.press('Enter');
    //     await page.waitForTimeout(10000);
    // }
    let links = ['https://www.linkedin.com/in/shantanu-11/','https://www.linkedin.com/in/mohd-aman/'];
    for(let i=0;i<links.length;i++){
    await page.goto(links[i]);
    await page.waitForSelector('.message-anywhere-button.pvs-profile-actions__action.artdeco-button');
    await page.click('.message-anywhere-button.pvs-profile-actions__action.artdeco-button');
    await page.waitForSelector('.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate');
    await page.type('.msg-form__contenteditable.t-14.t-black--light.t-normal.flex-grow-1.full-height.notranslate',msg);
    await page.waitForSelector('.msg-form__send-button.artdeco-button.artdeco-button--1');
    await page.waitForTimeout(5000);
    await page.click('.msg-form__send-button.artdeco-button.artdeco-button--1');
}

//   await browser.close();
})();
