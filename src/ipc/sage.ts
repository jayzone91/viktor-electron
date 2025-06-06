import { ipcMain } from "electron";
import * as sql from "mssql";

const config = {
  user: import.meta.env.VITE_SAGE_USER,
  password: import.meta.env.VITE_SAGE_PASSWORD,
  server: import.meta.env.VITE_SAGE_HOST,
  database: import.meta.env.VITE_SAGE_DATABASE,
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

async function getPool(): Promise<sql.ConnectionPool> {
  const pool = await sql.connect(config);
  return pool;
}

export type SearchResult = {
  SG_Adressen_PK: number;
  Suchbegriff?: string;
  KundNr?: string;
  LiefNr?: string;
  Homepage?: string;
  Telefon1?: string;
  Telefon2?: string;
  Mobiltelefon1?: string;
  Mobiltelefon2?: string;
  EMail1?: string;
  EMail2?: string;
  KundUmsatz?: number;
  LiefUmsatz?: number;
};

export type UserSearch = {
  Name?: string;
  Vorname?: string;
};

export function registerSageHandler() {
  ipcMain.handle("search-kunde", async (_event, search: string) => {
    const regex = /^(\\d|[+]49)/;
    const isReverse = regex.test(search);
    const conn = await getPool();
    let query = "";
    if (isReverse) {
      query = `
			SELECT SG_Adressen_PK, Suchbegriff,  KundNr, LiefNr, Homepage, Telefon1, Telefon2, Mobiltelefon1, Mobiltelefon2, EMail1, EMail2, KundUmsatz, LiefUmsatz 
			FROM sg_adressen WHERE 
			REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
			LIKE '%@search%' 
			OR 
			REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Telefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
			LIKE '%@search%' 
			OR 
			REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon1, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
			LIKE '%@search%' 
			OR 
			REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(Mobiltelefon2, ' ',''),'/',''),'-',''),'+49','0'),'(',''),')',''),',','')
			LIKE '%@search%'`;
    } else {
      query = `SELECT 
		SG_Adressen_PK, 
		Suchbegriff,  
		KundNr, 
		LiefNr, 
		Homepage, 
		Telefon1, 
		Telefon2, 
		Mobiltelefon1, 
		Mobiltelefon2, 
		EMail1, 
		EMail2, 
		KundUmsatz, 
		LiefUmsatz 
		FROM sg_adressen 
		WHERE Suchbegriff LIKE @search 
		OR KundNr LIKE @search 
		OR LiefNr LIKE @search;`;
    }
    const result = await conn.request().input("saerch", search).query(query);
    return result.recordset;
  });

  ipcMain.handle("get-kunde", async (_event, kundennummer: string) => {
    const conn = await getPool();
    const result = await conn
      .request()
      .input("kundennummer", kundennummer)
      .query(
        "SELECT Name, Vorname FROM sg_adressen WHERE KundNr LIKE '@kundennummer';"
      );
    return result.recordset[0];
  });
}
