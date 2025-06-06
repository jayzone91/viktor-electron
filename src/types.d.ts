import type { ArchiveResult } from "./ipc/archive";

export {};

declare global {
  interface Window {
    electronAPI: {
      searchArchive: (search: string) => Promise<ArchiveResult[]>;
    };
  }
}
