import type { ArchiveResult } from "./ipc/archive";
import type { SearchResult, UserSearch } from "./ipc/sage";

export {};

declare global {
  interface Window {
    electronAPI: {
      searchArchive: (search: string) => Promise<ArchiveResult[]>;
      getKunde: (kundennummer: string) => Promise<UserSearch>;
      searchKunde: (search: string) => Promise<SearchResult[]>;
    };
  }
}
