const { app, BrowserWindow, ipcMain, globalShortcut, clipboard } = require('electron/main');
const path = require('path');

let clipboardHistory = [];


function addToClipboardHistory(text) {
  if (text === '') {
    return;
  }

  clipboardHistory = clipboardHistory.filter(item => item !== text);

  clipboardHistory.unshift(text);

  if (clipboardHistory.length > 10) {
    clipboardHistory.pop();
  }

  mainWindow.webContents.send('update-clipboard-history', clipboardHistory);
}

let mainWindow;

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 480,
    height: 600,
    icon: path.join(`${__dirname}/assets/icon.png`),
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      enableRemoteModule: false,
      nodeIntegration: false,
    },
    frame: false,
    resizable: false,
  });

  mainWindow.loadFile('index.html');
};

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });

  setInterval(() => {
    const currentText = clipboard.readText();
    if (clipboardHistory[0] !== currentText) {
      addToClipboardHistory(currentText);
    }
  }, 1000);
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    globalShortcut.unregisterAll();
    app.quit();
  }
});

ipcMain.on('minimize-window', () => {
  if (mainWindow) {
    mainWindow.minimize();
  }
});

ipcMain.on('close-window', () => {
  if (mainWindow) {
    mainWindow.close();
  }
});

ipcMain.handle('set-clipboard-text', (event, text) => {
  clipboard.writeText(text);
  return true;
});

ipcMain.handle('remove-from-clipboard-history', (event, text) => {
  clipboardHistory = clipboardHistory.filter(item => item !== text);

  if (clipboard.readText() === text) {
    clipboard.writeText('');
  }

  mainWindow.webContents.send('update-clipboard-history', clipboardHistory);
});
