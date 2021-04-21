const fs = require("fs");
const path = require("path");
let extensions = require('./typeExports');
let input = process.argv.slice(2)[0];
let folderPath = input;
let extFolderPath = path.join(input,'Others');

function sortFolder(folderPath){
    let content = fs.readdirSync(folderPath);
    for(let i=0;i<content.length;i++){
        let extensionName = path.extname(content[i]);
        let extensionFolderExist = checkFolder(extensionName,folderPath);
        if(extensionFolderExist){
            moveFile(content[i],folderPath);
        }
        else{
            createFolder();
            moveFile(content[i],folderPath);
        }
        extFolderPath = path.join(input,'Others');
    }
}

function checkFolder(extension,folderPath){
    for(let key in extensions){
        if(extensions[key].includes(extension)){
            extFolderPath = path.join(folderPath,key);
            break;
        }
    }
    return fs.existsSync(extFolderPath);
}

function moveFile(fileName,folderPath){
    let sourceFilePath = path.join(folderPath,fileName);
    let destianationPath = path.join(extFolderPath,fileName);
    fs.copyFileSync(sourceFilePath,destianationPath);
    fs.unlinkSync(sourceFilePath);
}

function createFolder(){
    fs.mkdirSync(extFolderPath);
}

sortFolder(folderPath);