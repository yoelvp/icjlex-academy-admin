/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL_API_V1: string
  readonly VITE_JWT_SECRET_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
