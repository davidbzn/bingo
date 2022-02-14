const { app, BrowserWindow, Menu } = require('electron')
const templateMenu = require('./templateMenu');

const createWindow = () => {
    const win = new BrowserWindow({
      width: 1024,
      height: 768
    })
  
    win.loadFile('index.html')
}

app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    let template = templateMenu.geraMenuPrincipal();
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})