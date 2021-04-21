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
    let batsmenName = $('.table.batsman td a');
    for(let i=0;i<batsmenName.length;i++){
        let batsmanName = $(batsmenName[i]);
        let batsmanProfileLink = "https://www.espncricinfo.com/"+batsmanName.attr("href");
        // console.log(batsmanProfileLink);
        let dateOfBirth = getDateOfBirth(batsmanProfileLink,batsmanName.text());
        // console.log("Name -> " + batsmanName.text() + "\nDOB -> "+ dateOfBirth);        
    }
}

function getDateOfBirth(link,name){
    request(link,function(error,response,data){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(data);
        let DOB = $($('.player-card-description.gray-900')[1]).text();
        console.log('Name-> '+name+'\nDOB -> '+DOB);
    })
}