const electron = require("electron");

const app = electron.app;
const browserWindow = electron.BrowserWindow;

function createWindow(){
    const mainWindow = new browserWindow({
        width:800,
        height:600,
        webPreferences:{
            nodeIntegration:true
        }
    })
    mainWindow.loadFile("./public/index.html").then(function(){
        mainWindow.webContents.openDevTools();
        mainWindow.maximize();
        mainWindow.removeMenu();
    });
}

app.whenReady().then(function(){
    createWindow();
});
