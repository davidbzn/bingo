const { app, BrowserWindow, Menu, ipcMain } = require('electron')
const templateMenu = require('./templateMenu');
const config = require('./config');

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

    let delay =  config.getDelaySaved();

    if(delayWindow == null){
        delayWindow = new BrowserWindow({
            width: 500,
            height: 235,
            title: ':: Alteração Delay ::',
            alwaysOnTop: true,
            autoHideMenuBar: true,
            resizable: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        delayWindow.on('closed', ()=> {
            delayWindow = null;
        });
    }
    delayWindow.loadURL(`file://${__dirname}/../delay.html?delay=${delay}`);
});

userWindow = null;
ipcMain.on('show-user', ()=>{

    if(userWindow == null){
        userWindow = new BrowserWindow({
            width: 1024,
            height: 768,
            title: ':: USUÁRIOS ::',
            alwaysOnTop: true,
            autoHideMenuBar: true,
            resizable: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        userWindow.on('closed', ()=> {
            userWindow = null;
        });
    }
    userWindow.loadURL(`file://${__dirname}/../user.html`);
});

cardWindow = null;
ipcMain.on('show-card', ()=>{

    if(cardWindow == null){
        cardWindow = new BrowserWindow({
            width: 1024,
            height: 768,
            title: ':: CARTELAS ::',
            alwaysOnTop: true,
            autoHideMenuBar: true,
            resizable: true,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        cardWindow.on('closed', ()=> {
            cardWindow = null;
        });
    }
    cardWindow.loadURL(`file://${__dirname}/../card.html`);
});

ipcMain.on('altera-delay', (event, novoDelay) => {
    config.alteraDelay(novoDelay);
    delayWindow.close();
    mainWindow.send('novo-delay', novoDelay);
});
