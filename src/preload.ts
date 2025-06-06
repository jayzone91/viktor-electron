import { CategoryService } from "./databaseService";
// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge } from "electron";

contextBridge.exposeInMainWorld("database", {
  searchService: async (search: string) => CategoryService.searchArchiv(search),
});
