const fs = require("fs");
const path = require("path");
let extensions = require("./typeExports");
let input = process.argv.slice(2)[0];
let folderPath = input;
let extFolderPath= path.join(input,'Others');

function checkFolder(extension , folderPath) {
  // .mp3
  // folderPath ( "./Downloads/Audio" )
  // check if extension is matching with any folderName
  // .jpg => Images
  // "./Downloads"
  for (let key in extensions) {
    // "Images" \\ "Audio" ......
    if ( extensions[key].includes(extension)) {
      // string interpolation
      extFolderPath =path.join(folderPath,key);
      break;
    }
  }
  // "./Downloads/Images"
  return fs.existsSync(extFolderPath);
}
function moveFile(fileName , folderPath) {
  // copy file
  let sourceFilePath =path.join(folderPath,fileName); // "./Downloads/abc.txt"
  let destinationFilePath =path.join(extFolderPath,fileName); // "./Downloads/Documents/abc.txt"
  fs.copyFileSync(sourceFilePath , destinationFilePath);

  // delete file
  fs.unlinkSync(sourceFilePath);
}
function createFolder() {
  console.log(extFolderPath);
  fs.mkdirSync(extFolderPath);
}

function sortFolder(folderPath) {
  // get content of folderPath
  let content = fs.readdirSync(folderPath);
  for (let i = 0; i < content.length; i++) {
    // get extension of each file "./Downloads/Misc"
      let extensionName = path.extname(content[i]);
      console.log(extensionName);
      let extensionFolderExist = checkFolder(extensionName , folderPath);
      if (extensionFolderExist) {
        moveFile(content[i] , folderPath);
      } else {
        createFolder();
        moveFile(content[i] , folderPath);
      }
      extFolderPath=path.join(input,'Others');
  }
}

sortFolder(folderPath);