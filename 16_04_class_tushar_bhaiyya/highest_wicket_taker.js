let cheerio = require('cheerio');
let request = require('request');

request('https://www.espncricinfo.com/series/ipl-2020-21-1210595/delhi-capitals-vs-mumbai-indians-final-1237181/full-scorecard',function(error,response,html){
    if(error){
        console.log(error);
        return;
    }
    extractData(html);
})

function extractData(html){
    let $ = cheerio.load(html);
    let tables = $('.table.bowler');
    let mostWickets = 0;
    let NameOfMostWicketTacker="";
    for(let i=0;i<tables.length;i++){
        let rows = $(tables[i]).find('tr');
        for(let j=0;j<rows.length;j++){
            let row = $(rows[j]).find('td');
            let wicket = $(row[4]).text();
            if(wicket>mostWickets){
                mostWickets = wicket;
                NameOfMostWicketTacker = $(row[0]).text();
            }
        }
    }
    console.log(NameOfMostWicketTacker+" "+mostWickets);
}