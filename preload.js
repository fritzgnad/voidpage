const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("zenWriter", {
  newFile: async () => {
    return ipcRenderer.invoke("file:new");
  },
  openFile: async () => {
    return ipcRenderer.invoke("file:open");
  },
  saveFile: async (content, options = {}) => {
    return ipcRenderer.invoke("file:save", {
      content,
      saveAs: Boolean(options.saveAs),
    });
  },
});

