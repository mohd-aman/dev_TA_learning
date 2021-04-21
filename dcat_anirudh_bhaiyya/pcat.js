#!/usr/bin/env node
let fs = require('fs');
let input = process.argv.slice(2);

(function(){
    let files = [];
    let options = [];
    for(let x in input){
        if(input[x].startsWith('-') && input[x].length == 2){
            options.push(input[x]);
        }
        else{
            if(!fs.existsSync(input[x])){
                console.log(input[x]+" Does not Exist!!!");
                return;
            }
            else{
                files.push(input[x]);
            }
        }
    }
    console.log(files);
    console.log(options);
    let fileData = "";
    for(let i in files){
        fileData+=fs.readFileSync(files[i]);
    }
    fileData = fileData.split('\n');
    console.log(fileData);
    if(options.includes('-s')){
        fileData = removeAdjacentLineBreak(fileData);
    }
    console.log(fileData);
    if(options.includes('-n') && options.includes('-b')){
        if(options.indexOf('-b')<options.indexOf('-n')){
            addNumOnlyNonSpace(fileData);
        }
        else{
            addNum(fileData);
        }
    }
    else if(options.includes('-n')){
        addNum(fileData);
    }
    else if(options.includes('-b')){
        addNumOnlyNonSpace(fileData);
    }
    fileData = fileData.join('\n');
    console.log(fileData);
})();


function removeAdjacentLineBreak(fileData){
    let modifiedData;
    console.log(fileDataArray);
    for(let i =0;i<fileDataArray.length-1;i++){
        if((fileData[i] == '' && fileData[i+1] == '') ||(fileData[i] == '\r' && fileData[i+1] == '\r' )){
           continue; 
        }
        else{
            modifiedData.push(fileDataArray[i]);
        }
    }
    return modifiedData;
}


function addNum(fileData){
    let lineNumber = 1; 
    for(x in fileData){
        fileData[x] = lineNumber+" "+fileData[x];    
        lineNumber++;
    }
}


function addNumOnlyNonSpace(fileData){
    lineNumber = 1;
    for(x in fileData){
        if(fileData[x] == '' || fileData[x] == '\r'){
            fileData[x] = fileData[x];
        }
        else{
            fileData[x] = lineNumber+" "+fileData[x];
            lineNumber++;
        }
    }
}