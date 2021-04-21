let cheerio = require('cheerio');
let request = require('request');

request('https://www.espncricinfo.com/series/ipl-2021-1249214/kolkata-knight-riders-vs-mumbai-indians-5th-match-1254062/full-scorecard',function (error,response,html){
    if(error){
        console.log(error);
        return;
    }
    extractHtml(html);
});

function extractHtml(html){
    let $ = cheerio.load(html);
    let teams = $('.match-info.match-info-MATCH .team');
    for(let i=0;i<teams.length;i++){
        let teamName = $(teams[i]).find('.name').text();
        console.log(teamName);
    }
}

