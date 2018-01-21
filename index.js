const electron = require('electron');
const { app, BrowserWindow } = electron;
const ipc = electron.ipcMain;
const Store = require('electron-store');
const store = new Store();

require('electron-debug')({showDevTools: true})
require('electron-reload')(__dirname);

let mainWindow;

app.on('ready', () => {
    mainWindow = new BrowserWindow({ frame: false, width: 800, height: 600, webPreferences: {
        webSecurity: false
    } });
    mainWindow.setMenu(null);
    mainWindow.loadURL('file://'+__dirname+'/app/index.html');
});