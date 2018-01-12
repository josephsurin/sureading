const electron = require('electron');
const { app, BrowserWindow } = electron;
const ipc = electron.ipcMain;

const Store = require('electron-store');
const store = new Store();


require('electron-reload')(__dirname);

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ width: 800, height: 600, webPreferences: {
        experimentalFeatures: true
    } });
    mainWindow.loadURL('file://'+__dirname+'/app/index.html');
});

ipc.on('invokeRefresh', ()=> {
    mainWindow.reload();
});