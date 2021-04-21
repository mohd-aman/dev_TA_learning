let cheerio = require('cheerio');
let request = require('request');


getOpenings("https://breakinghierarchy.com/category/jobs/fresher/");

function getOpenings(jobLink){
    request(jobLink,function(error,response,data){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(data);
        let jobOpeningLinks = $('.col-md-8.archive-post-wrap .row .col-ms-7.col-sm-7 h2 a');
        for(let i=0;i<jobOpeningLinks.length;i++){
            // console.log(url+$(jobOpeningLinks[i]).attr("href"));
            getDetail($(jobOpeningLinks[i]).attr("href"));
        }
    })
}

function getDetail(jobDescription){
    // console.log(jobDescription);
    request(jobDescription,function(error,response,data){
        if(error){
            console.log(error);
            return;
        }
        let $ = cheerio.load(data);
        let detail = $('.single-post-wrap.entry-content ul');
        let companyName = $('.col-md-12 h1').text().split(' ')[0];
        console.log("#####------>        "+companyName);
        for(let i=0;i<detail.length;i++){
            let description = 
            console.log($(detail[i]).text())+"\n";
        }
        console.log("------------------------------------------------------------------------------------");
        
        // console.log(detail.text());
    })
}
console.log("Hello Aman");
