/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_MYSQL_HOST: string;
  readonly VITE_MYSQL_USER: string;
  readonly VITE_MYSQL_PASSWORD: string;
  readonly VITE_MYSQL_DATABASE: string;

  readonly VITE_SAGE_HOST: string;
  readonly VITE_SAGE_USER: string;
  readonly VITE_SAGE_PASSWORD: string;
  readonly VITE_SAGE_DATABASE: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
