let cheerio = require('cheerio');
let request = require('request');
let fs = require('fs');
let path = require('path');

request('https://github.com/topics',function(error,respnose,html){
    if(error){
        console.log(error);
        return;
    }
    extractData(html);
})

function extractData(data){
    let $ = cheerio.load(data);
    let topics = $('.no-underline.d-flex.flex-column.flex-justify-center');
    for(let i=0;i<topics.length;i++){
        let link = $(topics[i]).attr("href")
        let topicLink = 'https://github.com'+link;
        // console.log(link.split('/'));
        helper(topicLink);
    }
}

function helper(link){
    request(link,function(error,response,html){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(html);
        let topicName = $('.h1-mktg').text().trim();
        fs.mkdirSync(topicName);
        let repoNames = $('.border.rounded.color-shadow-small.color-bg-secondary.my-4 .text-bold');
        for(let i=0;i<8;i++){
            let repoName = $(repoNames[i]).text().trim();
            let goToLink = $(repoNames[i]).attr("href");
            if(goToLink!==undefined){
                helper2('https://github.com'+goToLink,topicName,repoName);
            }
            // console.log(goToLink);
            // 
        }
    })
}

function helper2(link,topicName,repoName){
    request(link,function(error,response,html){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(html);
        // console.log(link);
        let issueLink = 'https://github.com'+$('[data-tab-item="i1issues-tab"]').attr("href");
        // console.log(issueLink);
        helper3(issueLink,topicName,repoName);
    })
}

function helper3(link,topicName,repoName){
    request(link,function(error,response,html){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(html);
        let issueNames = $('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
        let issueStr = "";
        for(let i=0;i<issueNames.length;i++){
            let issueName = $(issueNames[i]).text();
            issueStr+=issueName+"\n";
        }
        let filePath = path.join(__dirname,topicName,repoName+".txt");
        fs.writeFileSync(filePath,issueStr)
    })
}