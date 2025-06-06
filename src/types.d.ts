import type { ArchiveResult } from "./main";

export {};

declare global {
  interface Window {
    electronAPI: {
      searchArchive: (search: string) => Promise<ArchiveResult[]>;
    };
  }
}
