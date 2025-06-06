/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MYSQL_HOST: string;
  readonly VITE_MYSQL_USER: string;
  readonly VITE_MYSQL_PASSWORD: string;
  readonly VITE_MYSQL_DATABASE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
