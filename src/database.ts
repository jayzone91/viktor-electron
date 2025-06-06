import { app, dialog, ipcMain } from "electron";
import mysql from "mysql2";

export const setupDatabase = () => {
  const connection = mysql.createConnection({
    host: import.meta.env.VITE_MYSQL_HOST,
    user: import.meta.env.VITE_MYSQL_HOST,
    password: import.meta.env.VITE_MYSQL_PASSWORD,
    database: import.meta.env.VITE_MYSQL_DATABASE,
  });

  connection.connect((error) => {
    if (error) {
      console.error("Database connection failed: ", error);
      dialog.showErrorBox("Database connection failed", error.message);
      app.quit();
    } else {
      console.log("Database connected successfully");
    }
  });

  ipcMain.on(
    "execute-query",
    async (event, query: string, values: unknown[], requestId: string) => {
      connection.query(query, values, (error, results) => {
        if (error) {
          event.reply(requestId, {
            error: error.message || "Unknown error",
          });
        }
        event.reply(requestId, results);
      });
    }
  );
};
