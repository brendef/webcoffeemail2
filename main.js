// Imports
const electron = require ('electron')
const url = require('url')
const path = require('path')

const { app, BrowserWindow, Menu } = electron

// Create Windows
let mainWindow

// Listen For App To Be Ready
app.on('ready', () => {
  mainWindow = new BrowserWindow({})
  // Load HTML Into Window
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, './pages/login/login.html'),
    protocol: 'file:',
    slashes: true
  }))
  // Build Menu From template
  // const loginMenu = Menu.buildFromTemplate(loginMenuTemplate)
  // // Set Menu
  // Menu.setApplicationMenu(loginMenu)
})

// Create Menu Template
const loginMenuTemplate = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Quit',
        accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
        click() {
          app.quit()
        }
      }
    ]
  }
]
