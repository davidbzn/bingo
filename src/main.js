const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const templateMenu = require('./templateMenu');

let mainWindow = null;

const createWindow = () => {
    mainWindow = new BrowserWindow({
        width: 1024,
        height: 768,
        title: ':: Bingo ::',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    })
  
    mainWindow.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    let template = templateMenu.geraMenuPrincipal(mainWindow);
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

delayWindow = null;
ipcMain.on('show-delay', ()=>{
    if(delayWindow == null){
        delayWindow = new BrowserWindow({
            width: 500,
            height: 250,
            alwaysOnTop: true,
            autoHideMenuBar: true,
            resizable: false
        });

        delayWindow.on('closed', ()=> {
            delayWindow = null;
        });
    }
    console.log(__dirname);
    delayWindow.loadURL(`file://${__dirname}/../delay.html`);
});
