import React, { useState } from "react";
import type { ArchiveResult } from "./main";

export default function App() {
  const [search, setSearch] = useState<string | null>(null);
  const [results, setResults] = useState<ArchiveResult[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const searchArchive = async () => {
    if (search == null) return;
    if (search.length < 3) return;
    setLoading(true);
    const res = await window.electronAPI.searchArchive(search);
    setResults(res);
    setLoading(false);
  };

  return (
    <div>
      <input
        type="text"
        defaultValue={search ?? undefined}
        disabled={loading}
        onChange={(e) => setSearch(e.target.value)}
      />
      <button onClick={searchArchive} disabled={loading}>
        {loading ? "Sucht..." : "Suchen"}
      </button>
      <ul>
        {results &&
          !loading &&
          results.map((x) => <li key={x.id}>{x.title}</li>)}
      </ul>
    </div>
  );
}
