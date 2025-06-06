import { app, BrowserWindow, ipcMain } from "electron";
import started from "electron-squirrel-startup";
import * as mysql from "mysql2/promise";
import path from "node:path";

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(
      path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`)
    );
  }

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.

export type ArchiveResult = {
  id: number;
  title: string;
  body: string;
};

const conn = mysql.createConnection({
  host: import.meta.env.VITE_MYSQL_HOST,
  user: import.meta.env.VITE_MYSQL_USER,
  password: import.meta.env.VITE_MYSQL_PASSWORD,
  database: import.meta.env.VITE_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

ipcMain.handle("search-archive", async (_event, search: string) => {
  const [results, fields] = await (
    await conn
  ).execute("SELECT * FROM pdfs WHERE body LIKE ? OR title LIKE ?;", [
    `%${search}%`,
    `%${search}%`,
  ]);
  console.log(results);
  console.log(fields);
  return results;
});
