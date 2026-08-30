/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly BREVO_API_KEY: string;
  readonly BREVO_LIST_ID: string;
  readonly GA_MEASUREMENT_ID: string;
  readonly META_PIXEL_ID: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface Window {
  gtag?: (...args: unknown[]) => void;
  fbq?: (...args: unknown[]) => void;
}
