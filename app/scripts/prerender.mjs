// Post-build step: writes a crawler-ready copy of dist/index.html for / and every /category/<id>
// (own title, description, canonical, social tags, JSON-LD and a text fallback inside #root), plus sitemap.xml and robots.txt.
// React replaces the fallback when it mounts. Run from the app folder after `vite build`; it imports the same .ts data modules as the app.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { loadEnv } from 'vite'

Object.assign(process.env, loadEnv('production', process.cwd(), 'VITE_')) // so VITE_SITE_URL from .env files is honoured too

const { SITE_URL } = await import('../src/data/site.ts')
const { categories } = await import('../src/data/categories.ts')
const { products } = await import('../src/data/products.ts')
const { CONTACT } = await import('../src/data/contact.ts')
const { branches } = await import('../src/data/branches.ts')
const { pageMeta, categoryMeta, BRAND, OG_IMAGE } = await import('../src/lib/seo.ts')

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const intl = (label) => '+66-' + label.replace(/^0/, '') // 039-303-304 -> +66-39-303-304
const abs = (path) => SITE_URL + path
const ld = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`

// ---- structured data -------------------------------------------------------------------------
const [lat, lng] = CONTACT.mapCoords.split(',').map(Number)

const store = () => ({
  '@context': 'https://schema.org',
  '@type': 'FurnitureStore',
  name: BRAND,
  alternateName: 'Koncept เฟอร์นิเจอร์ เอาท์เล็ท',
  url: abs('/'),
  logo: abs('/logo.png'),
  image: OG_IMAGE,
  telephone: intl(CONTACT.phoneLabel),
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'วัดใหม่ 27/8 ถ.ท่าหลวง ต.วัดใหม่',
    addressLocality: 'อ.เมือง',
    addressRegion: 'จันทบุรี',
    postalCode: '22000',
    addressCountry: 'TH',
  },
  geo: { '@type': 'GeoCoordinates', latitude: lat, longitude: lng },
  sameAs: [CONTACT.facebook, CONTACT.tiktok, CONTACT.lineHref],
  // only what src/data/branches.ts holds: no opening hours, no coordinates
  department: branches.slice(1).map((b) => ({
    '@type': 'FurnitureStore',
    name: b.name,
    address: { '@type': 'PostalAddress', streetAddress: b.address, addressCountry: 'TH' },
    ...(b.phone && { telephone: intl(b.phone) }),
    ...(b.website || b.facebook ? { url: b.website || b.facebook } : {}),
  })),
})

const categoryLd = (c, m, list) => [
  {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: BRAND, item: abs('/') },
      { '@type': 'ListItem', position: 2, name: c.th, item: abs(m.path) },
    ],
  },
  {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: c.th,
    url: abs(m.path),
    description: m.description,
    inLanguage: 'th',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: list.length,
      // no Offer markup: many items have no price
      itemListElement: list.map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.name, image: abs(p.img) })),
    },
  },
]

// ---- head + fallback -------------------------------------------------------------------------
const headFor = (m, jsonLd) => {
  const url = abs(m.path === '/' ? '/' : m.path)
  return [
    `<title>${esc(m.title)}</title>`,
    `<meta name="description" content="${esc(m.description)}" />`,
    `<meta name="robots" content="index, follow" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${BRAND}" />`,
    `<meta property="og:locale" content="th_TH" />`,
    `<meta property="og:title" content="${esc(m.title)}" />`,
    `<meta property="og:description" content="${esc(m.description)}" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:image" content="${OG_IMAGE}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(m.title)}" />`,
    `<meta name="twitter:description" content="${esc(m.description)}" />`,
    `<meta name="twitter:image" content="${OG_IMAGE}" />`,
    ...jsonLd.map(ld),
  ].join('\n    ')
}

// Visually hidden (so nothing flashes before React mounts) but present in the raw HTML for crawlers and no-JS readers.
const HIDE = 'position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap'
const fallbackFor = (h1, text, items) =>
  `<main style="${HIDE}"><h1>${esc(h1)}</h1><p>${esc(text)}</p>` +
  (items.length ? `<ul>${items.map((p) => `<li>${esc(p.name)}${p.price > 0 ? ` ${p.price.toLocaleString('en-US')} บาท` : ''}</li>`).join('')}</ul>` : '') +
  `</main>`

// ---- write files -----------------------------------------------------------------------------
const template = readFileSync('dist/index.html', 'utf8')
if (!template.includes('<!--seo:start-->') || !template.includes('<div id="root"></div>')) throw new Error('dist/index.html is missing the seo markers or #root')

const render = (m, jsonLd, fallback) =>
  template
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => `<!--seo:start-->\n    ${headFor(m, jsonLd)}\n    <!--seo:end-->`)
    .replace('<div id="root"></div>', () => `<div id="root">${fallback}</div>`)

const write = (file, html) => {
  mkdirSync(file.replace(/[^/]*$/, ''), { recursive: true })
  writeFileSync(file, html)
}

const home = pageMeta('/')
write('dist/index.html', render(home, [store()], fallbackFor('Furniture Outlet จันทบุรี', home.description, categories.map((c) => ({ name: c.th, price: 0 })))))

for (const c of categories) {
  const m = categoryMeta(c.id)
  const list = products[c.id] ?? []
  write(`dist/category/${c.id}/index.html`, render(m, categoryLd(c, m, list), fallbackFor(c.th, m.description, list)))
}

const day = new Date().toISOString().slice(0, 10)
const urls = ['/', ...categories.map((c) => `/category/${c.id}`)]
// category entries carry <image:image> for each product picture (Google Images discovery)
const imageTags = (id) =>
  (products[id] ?? []).map((p) => `\n    <image:image><image:loc>${esc(abs(p.img))}</image:loc><image:title>${esc(p.name)}</image:title></image:image>`).join('')
const entry = (u) => `  <url><loc>${abs(u)}</loc><lastmod>${day}</lastmod>${u.startsWith('/category/') ? imageTags(u.split('/')[2]) : ''}</url>`
writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">\n${urls.map(entry).join('\n')}\n</urlset>\n`,
)
writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${abs('/sitemap.xml')}\n`)

for (const [path, m] of [['/', home], ...categories.map((c) => [`/category/${c.id}`, categoryMeta(c.id)])]) {
  if (m.title.length > 60 || m.description.length > 155) console.warn(`seo: ${path} title ${m.title.length} / description ${m.description.length} chars`)
}
console.log(`prerender: ${urls.length} pages, sitemap.xml, robots.txt (${SITE_URL})`)
