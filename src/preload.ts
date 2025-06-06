// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
  searchArchive: (search: string) =>
    ipcRenderer.invoke("search-archive", search),
  searchKunde: (search: string) => ipcRenderer.invoke("search-kunde", search),
  getKunde: (kundennummer: string) =>
    ipcRenderer.invoke("get-kunde", kundennummer),
});
