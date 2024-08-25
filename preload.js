const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('cloppy', {
  minimize: () => ipcRenderer.send('minimize-window'),
  close: () => ipcRenderer.send('close-window'),
  onClipboardHistoryUpdate: (callback) => {
    ipcRenderer.on('update-clipboard-history', (event, data) => callback(data));
  },
  setClipboardText: (text) => ipcRenderer.invoke('set-clipboard-text', text),
  removeFromClipboardHistory: (text) => ipcRenderer.invoke('remove-from-clipboard-history', text),
});
