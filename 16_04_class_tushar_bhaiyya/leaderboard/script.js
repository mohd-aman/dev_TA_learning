let cheerio = require('cheerio');
let request = require('request');
let fs = require('fs');
let url = 'https://www.espncricinfo.com'; 
let statsArray = [];
let count = 0;

request('https://www.espncricinfo.com/series/ipl-2020-21-1210595',function(error,response,html){
    if(error){
        console.log(error);
        return;
    }
    let $ = cheerio.load(html);
    let aTags = $('.label.blue-text.blue-on-hover');
    let linkToAllMatches = url+aTags[0]["attribs"]["href"];
    // console.log(linkToAllMatches);
    getAllMatch(linkToAllMatches);
    
})

function getAllMatch(linkToAllMatches){
    request(linkToAllMatches,function(error,response,data){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(data);
        let matchesLink = $('[data-hover="Scorecard"]');
        for(let i=0;i<matchesLink.length;i++){
            count++;
            let linkToMatchDetail = url+matchesLink[i]["attribs"]["href"];
            // console.log(linkToMatchDetail);
            getMatchDetail(linkToMatchDetail);
        }
    })
}

function getMatchDetail(linkToMatchDetail){
    request(linkToMatchDetail,function(error,response,data){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(data);
        let batsmenTable = $('.table.batsman tbody');
        for(let i=0;i<batsmenTable.length;i++){
            // console.log($(batsmenTable[i]).text());
            let allRows = $(batsmenTable[i]).find('tr');
            for(let j=0;j<allRows.length;j++){
                let allCol = $(allRows[j]).find('td');
                if(allCol.length == 8){
                    let batsmanName = $(allCol[0]).text();
                    let runsScored = $(allCol[2]).text();
                    // console.log(batsmanName+"      ########     "+runsScored);
                    addToLeaderBoard(batsmanName,runsScored);
                }
            }
        }
        count--;
        if(count == 0){
            console.table(statsArray);
        }
    })
}

function addToLeaderBoard(batsmanName,runsScored){
    let exists = false;
    for(let i=0;i<statsArray.length;i++){
        if(statsArray[i].name == batsmanName){
            statsArray[i].runs+=Number(runsScored);
            exists = true;
            break;
        }
    }
    if(!exists){
        let batsmanObject = {
            name:batsmanName,
            runs:Number(runsScored)
        }
        statsArray.push(batsmanObject);
    }
}

