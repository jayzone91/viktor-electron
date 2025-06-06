import { ipcMain } from "electron";
import { createConnection } from "mysql2/promise";

export type ArchiveResult = {
  id: number;
  title: string;
  body: string;
};

const conn = createConnection({
  host: import.meta.env.VITE_MYSQL_HOST,
  user: import.meta.env.VITE_MYSQL_USER,
  password: import.meta.env.VITE_MYSQL_PASSWORD,
  database: import.meta.env.VITE_MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export function registerArchiveHandler() {
  ipcMain.handle("search-archive", async (_event, search: string) => {
    const [results] = await (
      await conn
    ).execute("SELECT * FROM pdfs WHERE body LIKE ? OR title LIKE ?;", [
      `%${search}%`,
      `%${search}%`,
    ]);
    console.log(results);

    return results;
  });
}
