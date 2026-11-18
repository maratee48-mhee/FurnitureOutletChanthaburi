// Per-route <head> content in Thai. Shared by the running app (route changes) and the post-build prerender script.
import { categories } from '../data/categories.ts'
import { products } from '../data/products.ts'
import { SITE_URL } from '../data/site.ts'

export const BRAND = 'Furniture Outlet'
export const OG_IMAGE = `${SITE_URL}/og-default.jpg`

export type Meta = { title: string; description: string; path: string; noindex?: boolean }

const MAX_DESC = 155
const CTA = ' สอบถามทาง LINE @furnitureoutlet'
const fit = (s: string) => (s.length <= MAX_DESC ? s : s.slice(0, MAX_DESC - 1).trimEnd() + '…')

const HOME: Meta = {
  path: '/',
  title: `${BRAND} | เฟอร์นิเจอร์ครบ จบที่เดียว จันทบุรี`,
  description: fit('Furniture Outlet (Koncept เฟอร์นิเจอร์ เอาท์เล็ท) จันทบุรี เฟอร์นิเจอร์ชุดห้องนอน ห้องนั่งเล่น ชุดสำนักงาน ชุดอาหาร ตู้โชว์ และงานบิวท์อิน เลือกดูตามห้อง สอบถามทาง LINE'),
}

const PRIVATE: Record<string, Meta> = {
}

export function categoryMeta(id: string): Meta | undefined {
  const c = categories.find((x) => x.id === id)
  if (!c) return undefined
  const list = products[id] ?? []
  const prices = list.map((p) => p.price).filter((n) => n > 0)
  const from = prices.length ? ` ราคาเริ่มต้น ${Math.min(...prices).toLocaleString('en-US')} บาท` : ''
  const subs = c.sub.slice(0, 4).join(' ')
  const count = list.length ? ` ${list.length} รายการ` : ''
  const base = `${c.th} ที่ ${BRAND} จันทบุรี ${subs}${count}${from}`
  return {
    path: `/category/${id}`,
    title: `${c.th} จันทบุรี | ${BRAND}`,
    description: fit(base + (base.length + CTA.length <= MAX_DESC ? CTA : '')),
  }
}

export function pageMeta(pathname: string): Meta {
  const clean = pathname.replace(/\/+$/, '') || '/'
  if (PRIVATE[clean]) return PRIVATE[clean]
  const m = clean.match(/^\/category\/([^/]+)$/)
  return (m && categoryMeta(m[1])) || HOME
}

const set = (sel: string, make: () => HTMLElement, attrs: Record<string, string>) => {
  let el = document.head.querySelector<HTMLElement>(sel)
  if (!el) { el = make(); document.head.append(el) }
  for (const [k, v] of Object.entries(attrs)) el.setAttribute(k, v)
}
const meta = (key: 'name' | 'property', name: string, content: string) =>
  set(`meta[${key}="${name}"]`, () => document.createElement('meta'), { [key]: name, content })

// Keeps the live page's head in step with the route (the prerendered files already carry the same values).
export function applyMeta(m: Meta) {
  const url = SITE_URL + (m.path === '/' ? '/' : m.path)
  document.title = m.title
  meta('name', 'description', m.description)
  meta('name', 'robots', m.noindex ? 'noindex, nofollow' : 'index, follow')
  set('link[rel="canonical"]', () => document.createElement('link'), { rel: 'canonical', href: url })
  meta('property', 'og:type', 'website')
  meta('property', 'og:site_name', BRAND)
  meta('property', 'og:locale', 'th_TH')
  meta('property', 'og:title', m.title)
  meta('property', 'og:description', m.description)
  meta('property', 'og:url', url)
  meta('property', 'og:image', OG_IMAGE)
  meta('name', 'twitter:card', 'summary_large_image')
  meta('name', 'twitter:title', m.title)
  meta('name', 'twitter:description', m.description)
  meta('name', 'twitter:image', OG_IMAGE)
}
