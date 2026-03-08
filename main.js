const { app, BrowserWindow, dialog, ipcMain, Menu } = require("electron");
const path = require("path");
const fs = require("fs");

let mainWindow = null;
let currentFilePath = null;

app.name = "VoidPage";

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    backgroundColor: "#050817",
    useContentSize: true,
    fullscreenable: true,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 14, y: 14 },
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "index.html"));

  // Hide the default application menu for a cleaner look.
  Menu.setApplicationMenu(null);

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

ipcMain.handle("file:open", async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog(mainWindow, {
    properties: ["openFile"],
    filters: [
      { name: "Markdown", extensions: ["md", "markdown"] },
      { name: "Text", extensions: ["txt"] },
      { name: "All Files", extensions: ["*"] },
    ],
  });

  if (canceled || !filePaths || filePaths.length === 0) {
    return { canceled: true };
  }

  const filePath = filePaths[0];
  const data = await fs.promises.readFile(filePath, "utf8");
  currentFilePath = filePath;

  return {
    canceled: false,
    filePath,
    content: data,
  };
});

ipcMain.handle("file:save", async (_event, { content, saveAs } = {}) => {
  let targetPath = currentFilePath;

  if (!targetPath || saveAs) {
    const { canceled, filePath } = await dialog.showSaveDialog(mainWindow, {
      defaultPath: currentFilePath || "untitled.md",
      filters: [
        { name: "Markdown", extensions: ["md", "markdown"] },
        { name: "Text", extensions: ["txt"] },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (canceled || !filePath) {
      return { canceled: true };
    }

    targetPath = filePath;
    currentFilePath = targetPath;
  }

  await fs.promises.writeFile(targetPath, content ?? "", "utf8");

  return {
    canceled: false,
    filePath: targetPath,
  };
});

