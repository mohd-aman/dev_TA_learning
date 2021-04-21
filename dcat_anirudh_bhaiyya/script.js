#!/usr/bin/env node
let fs = require('fs');

let cmd = process.argv.slice(2);

(function () {
    let options = [];
    let files = [];
    let str = "";
    for (let x in cmd) {
        if (cmd[x].startsWith('-') && cmd[x].length == 2) {
            options.push(cmd[x]);
        }
        else {
            files.push(cmd[x]);
        }
    }
    for (let x in files) {
        if (!fs.existsSync(files[x])) {
            console.log(files[x] + " does not exists!!!");
            return;
        }
    }
    for (let x in files) {
        str += fs.readFileSync(files[x].toString());
    }
    str = str.split('\n');
    if (options.includes('-s')) {
        str = str.map((ele, i) => {
            if ((ele === '' && str[i - 1] === '') || (ele === '\r' && ele === '\r')) {
                return null;
            }
            else {
                return ele;
            }
        });
        str = str.filter((ele) => ele != null);
    }
    if (options.includes('-b') && options.includes('-n')) {
        if (options.indexOf('-b') < options.indexOf('n')) {
            addNonEmptyNum(str);
        }
        else {
            addEmptyNum(str);
        }
    }
    else {
        if (options.includes('-n')) {
            addEmptyNum(str);
        }
        else if (options.includes('-b')) {
            addNonEmptyNum(str);
        }
    }
    console.log(str.join("\n"));
})();

function addNonEmptyNum(str) {
    let lineNumber = 1;
    for (x in str) {
        if (str[x] === '' || str[x] === '\r') {
            str[x] = str[x];
        }
        else {
            str[x] = lineNumber + " " + str[x];
            lineNumber++;
        }
    }
}

function addEmptyNum(str) {
    let lineNumber = 1;         
    for (x in str) {
        str[x] = lineNumber + " " + str[x];
        lineNumber++;
    }
}