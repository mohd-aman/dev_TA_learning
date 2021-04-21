let fs = require('fs');
let request = require('request');
let cheerio = require('cheerio');

let path = require('path');
request('https://github.com/topics',getTopicLinks);
let bUrl = 'https://github.com/';
function getTopicLinks(err,res,html)
{
    if(err)
    {
        console.log(err);
    }
    else{
    let $ = cheerio.load(html);
    let links = $('.no-underline.d-flex.flex-column.flex-justify-center');
    for(let i=0;i<links.length;i++)
    {
        let topicLink = bUrl+$(links[i]).attr('href');
        // console.log(topicLink);
        TopicsPage(topicLink);

    }
}

}
function TopicsPage(link)
{
    request(link,getTopicInfo);
    function getTopicInfo(err, res,html)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
        let $ = cheerio.load(html);
        let topicName =$('.h1-mktg').text().trim(); 
        
        // console.log(topicName);
        fs.mkdirSync(topicName);
        //forgot to include a remember
        let repoNames = $('a.text-bold');
        // console.log(repoNames.length);
        for(let i=0;i<8;i++)
        {
            
            let repoName = $(repoNames[i]).text().trim();
            // console.log(repoName);
            
            let repoLink =bUrl+$(repoNames[i]).attr('href')+'/issues';
            // console.log(repoLink);
            getIssues(topicName,repoLink,repoName);
         
        }

    }
}
}
function getIssues(topicName,repoLink,repoName)
{
    request(repoLink,cb);
    function cb(err,res,html)
    { 
        if(err)
        {
            console.log(err);
        }
        else
        {
        let issueStr='';
        let $ = cheerio.load(html);
        let issueNames = $('.Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title');
        for(let j=0;j<issueNames.length;j++)
        {
            let issueName = $(issueNames[j]).text();
            // console.log(issueName);
            console.log(topicName);
            issueStr+= issueName+"\n";

        }
        let filePath = path.join(__dirname,topicName,repoName+".txt");
        // console.log(filePath);
        fs.writeFileSync(filePath,issueStr)
        }
    }
}


//batsmen homework with team

// Breakdown : 1) Topics Link 2) Topic name +link of repo  3) Folder k andar repo ki pdf/json uske andar saare issues