let cheerio = require('cheerio');
let request = require('request');

request("https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/ball-by-ball-commentary",cb);

function cb(error,response,html){
    if(error){
        console.log(error);
        return;
    }
    else{
        extractData(html);
    }
}

function extractData(html){
    let $ = cheerio.load(html);
    let commentaries = $('.d-flex.match-comment-padder.align-items-center .col-14.col-md-15.col-lg-14 p');
    let lastBallCommentary = $(commentaries[0]);
    console.log(lastBallCommentary.text());
}