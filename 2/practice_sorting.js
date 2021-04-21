let fs = require('fs');
let path = require('path');
let extensions = require('./typeExports')
let folderPath = process.argv.slice(2)[0];
let extFolderPath = path.join(folderPath,'Others');

console.log(folderPath);

let files = fs.readdirSync(folderPath);

for(let i=0;i<files.length;i++){
    let extensionName = path.extname(files[i]);
    // console.log(extensionName);
    let extensionFolderExist = checkFolder(extensionName,folderPath);
    if(extensionFolderExist){
        moveFile(files[i],folderPath);
    }
    else{
        createFolder();
        moveFile(files[i],folderPath);
    }
    extFolderPath = path.join(folderPath,'Others');
}

function checkFolder(extensionName,folderPath){
    for(let key in extensions){
        if(extensions[key].includes(extensionName)){
            extFolderPath = path.join(folderPath,key);
            break;
        }
    }
    return fs.existsSync(extFolderPath);
}

function createFolder(){
    fs.mkdirSync(extFolderPath);
}

function moveFile(fileName,folderPath){
    let sourcePath = path.join(folderPath,fileName);
    let destinationPath = path.join(extFolderPath,fileName);
    fs.copyFileSync(sourcePath,destinationPath);
    fs.unlinkSync(sourcePath);
}

