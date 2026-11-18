// The public address of the site. CHANGE THIS ONCE THE FINAL DOMAIN IS CHOSEN (or set VITE_SITE_URL at build time).
// Canonical links, Open Graph URLs, the sitemap and the structured data all derive from it.
const env = (import.meta.env?.VITE_SITE_URL ?? (globalThis as { process?: { env: Record<string, string | undefined> } }).process?.env.VITE_SITE_URL) as string | undefined

export const SITE_URL = (env || 'https://furniture-outlet-web.vercel.app').replace(/\/+$/, '')
