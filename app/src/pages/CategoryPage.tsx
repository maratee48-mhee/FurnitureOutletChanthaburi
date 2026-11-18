import { ThemeToggle } from '../components/ThemeToggle'
import { CategoryMenu } from '../components/CategoryMenu'
import { ContactFab } from '../components/ContactFab'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router'
import { categories } from '../data/categories'
import { products, PRICES_AS_OF } from '../data/products'
import { CONTACT } from '../data/contact'
import { Arrow } from '../components/Arrow'
import { BannerSlider } from '../components/BannerSlider'
import { ProductCard } from '../components/ProductCard'
import { RoomIcon } from '../components/RoomIcon'
import { HouseHero } from '../components/HouseHero'
import './CategoryPage.css'

const LINE = CONTACT.lineHref
const TEL = CONTACT.phoneHref
// LINE-member promo banner (QR links to the same LINE page); slides on every room page
const MEMBER = { img: '/products/member-line-red/image.png', name: 'สมัครสมาชิก รับส่วนลด 3% — แอด LINE @furnitureoutlet', href: CONTACT.lineHref }
// 0% instalment banner (Krungsri, SCB, Krungthai, Bangkok Bank, Kasikorn); slides next to MEMBER on every room page
const INSTALMENT = { img: '/products/installment-0/image.webp', name: 'ผ่อน 0% นาน 10 เดือน ผ่านบัตรเครดิต กรุงศรี ไทยพาณิชย์ กรุงไทย กรุงเทพ กสิกรไทย', href: CONTACT.lineHref }

export function CategoryPage() {
  const { id } = useParams()
  const i = categories.findIndex((c) => c.id === id)
  const c = categories[i]
  const [filter, setFilter] = useState<string | null>(null)
  const [scrolled, setScrolled] = useState(false)
  const heroRef = useRef<HTMLElement>(null)
  const listRef = useRef<HTMLElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const chipsRef = useRef<HTMLDivElement>(null)
  const [atStart, setAtStart] = useState(true)
  const [atEnd, setAtEnd] = useState(true)
  // arrow buttons appear only when the chip row is wider than the screen
  const edges = () => {
    const el = chipsRef.current
    if (!el) return
    setAtStart(el.scrollLeft < 4)
    setAtEnd(el.scrollLeft + el.clientWidth > el.scrollWidth - 4)
  }
  const nudge = (d: number) => chipsRef.current?.scrollBy({ left: d * chipsRef.current.clientWidth * 0.7, behavior: 'smooth' })
  useEffect(() => { edges(); addEventListener('resize', edges); return () => removeEventListener('resize', edges) })

  const items = products[id ?? ''] ?? []
  // Built-in: the two ad banners (first in the data) slide on top; the rest are shown as cards under the title
  const banners = items.slice(0, 2)
  const works = items.slice(2)
  // chips come from the category's sub-categories; counts match on each product's sub
  const chips = useMemo(
    () => (c?.sub ?? []).map((label) => ({ label, n: items.filter((p) => p.sub === label).length })),
    [items, c],
  )
  const active = chips.find((f) => f.label === filter && f.n > 0)
  const shown = active ? items.filter((p) => p.sub === active.label) : items

  useEffect(() => { setFilter(null) }, [id])

  // hide the scroll cue once the visitor starts scrolling
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])

  // stroke-draw the room icon: normalise every shape to length 1
  useEffect(() => {
    heroRef.current?.querySelectorAll('.hero-icon :is(path,rect)').forEach((el) => el.setAttribute('pathLength', '1'))
  }, [id])

  // cards rise in once as they enter; content stays visible without JS
  useEffect(() => {
    const grid = gridRef.current
    if (!grid || matchMedia('(prefers-reduced-motion: reduce)').matches) return
    // only cards not yet shown (cards kept across a filter change keep their 'in' class); stagger follows the real column count
    const cols = getComputedStyle(grid).gridTemplateColumns.split(' ').length
    const cards = [...grid.querySelectorAll<HTMLElement>('.card:not(.in)')]
    cards.forEach((el) => el.classList.add('pending'))
    const io = new IntersectionObserver((es) => es.forEach((e) => {
      if (!e.isIntersecting) return
      const el = e.target as HTMLElement
      el.style.setProperty('--i', String([...grid.children].indexOf(el) % cols))
      el.classList.replace('pending', 'in'); io.unobserve(el)
    }), { rootMargin: '0px 0px -8% 0px' })
    cards.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [id, filter])

  if (!c) return <Navigate to="/" replace />
  const prev = categories[(i + categories.length - 1) % categories.length]
  const next = categories[(i + 1) % categories.length]

  return (
    <div className="room" key={c.id}>
      <section className="hero" ref={heroRef} aria-labelledby="room-title">
        <HouseHero current={c.id} />
        <div className="hero-scrim" />

        <header className="hero-bar">
          <Link to="/" viewTransition className="hero-back">
            <Arrow dir="left" />
            <span>ทุกห้อง<small>All rooms</small></span>
          </Link>
          <Link to="/" viewTransition className="hero-brand" aria-label="Furniture Outlet — หน้าแรก">
            <span lang="en">Furniture Outlet</span>
          </Link>
          <div className="hero-actions">
            <CategoryMenu currentId={c.id} />
            <ThemeToggle className="menu-btn" />
          </div>
        </header>

        <h1 id="room-title" className="hero-sr">{c.th} <span lang="en">{c.en}</span></h1>

        <button type="button" className={scrolled ? 'hero-cue gone' : 'hero-cue'}
          onClick={() => listRef.current?.scrollIntoView({
            behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          })}>
          <span className="cue-ring"><Arrow dir="down" /></span>
          <span className="cue-text">เลื่อนดูสินค้า<small lang="en">Scroll</small></span>
        </button>

      </section>

      {c.id === 'builtin' ? (
        <>
          <section className="shelf shelf-banners" ref={listRef} aria-label="แบนเนอร์ Built-in">
            <BannerSlider slides={[...banners, MEMBER, INSTALMENT]} label="แบนเนอร์ Built-in" />
          </section>
          <section className="shelf shelf-works" aria-labelledby="shelf-title">
            <div className="shelf-head"><h2 id="shelf-title">Built-in ที่เราทำ</h2></div>
            <div className="grid" ref={gridRef}>
              {works.map((p) => <ProductCard key={p.img} p={p} icon={c.icon} category={c.th} />)}
            </div>
          </section>
        </>
      ) : (
        <>
        <section className="shelf shelf-banners" ref={listRef} aria-label="โปรโมชันสมาชิก LINE">
          <BannerSlider slides={[MEMBER, INSTALMENT]} label="โปรโมชัน" />
        </section>
        <section className="shelf shelf-works" aria-labelledby="shelf-title">
          <div className="shelf-head">
            <h2 id="shelf-title">สินค้าทั้งหมด</h2>
            {items.length > 0 && <p>{items.length} รายการ · ราคา ณ {PRICES_AS_OF} จากโปสเตอร์ร้าน</p>}
          </div>

          {items.length > 0 && chips.length > 0 && (
            <div className={'chips-wrap' + (atStart ? ' at-start' : '') + (atEnd ? ' at-end' : '')}>
              <button type="button" className="chips-nav chips-prev" aria-label="เลื่อนไปทางซ้าย" tabIndex={-1} onClick={() => nudge(-1)}><Arrow dir="left" /></button>
              <div className="chips" role="group" aria-label="กรองตามประเภท" ref={chipsRef} onScroll={edges}>
                <button type="button" aria-pressed={!active} onClick={() => setFilter(null)}>
                  ทั้งหมด <span>{items.length}</span>
                </button>
                {chips.map((f) => f.n > 0 ? (
                  <button type="button" key={f.label} aria-pressed={active?.label === f.label} onClick={() => setFilter(f.label)}>
                    {f.label} <span>{f.n}</span>
                  </button>
                ) : (
                  <a key={f.label} href={c.href} target="_blank" rel="noopener" title="ดูที่เว็บไซต์ร้าน">
                    {f.label} <Arrow dir="out" />
                  </a>
                ))}
              </div>
              <button type="button" className="chips-nav chips-next" aria-label="เลื่อนไปทางขวา" tabIndex={-1} onClick={() => nudge(1)}><Arrow dir="right" /></button>
            </div>
          )}

          {items.length > 0 ? (
            <>
              <div className="grid" ref={gridRef}>
                {shown.map((p) => <ProductCard key={p.img} p={p} icon={c.icon} category={c.th} />)}
              </div>
            </>
          ) : (
            <div className="empty">
              <RoomIcon icon={c.icon} className="empty-icon" />
              <h3>ยังไม่มีสินค้าออนไลน์ในหมวดนี้</h3>
              <p>สินค้า{c.th}มีให้ดูที่หน้าร้าน ทักไลน์มาถามรุ่นและราคาได้เลย</p>
              <div className="chips empty-subs" role="group" aria-label="ประเภทสินค้าในหมวดนี้ (เปิดเว็บไซต์ร้าน)">
                {c.sub.map((s) => (
                  <a key={s} href={c.href} target="_blank" rel="noopener" title="ดูที่เว็บไซต์ร้าน">{s} <Arrow dir="out" /></a>
                ))}
              </div>
            </div>
          )}
        </section>
        </>
      )}

      <section className="contact" aria-labelledby="contact-title">
        <h2 id="contact-title">Furniture Outlet ครบจบที่เดียว</h2>
        <p lang="en">Ask about stock, delivery and today’s price</p>
        <div className="contact-actions">
          <a className="btn btn-white" href={LINE} target="_blank" rel="noopener">LINE {CONTACT.lineId}</a>
          <a className="btn btn-line" href={TEL}>โทร {CONTACT.phoneLabel}</a>
          <a className="btn btn-line" href={CONTACT.facebook} target="_blank" rel="noopener">Facebook</a>
        </div>
      </section>

      <nav className="rooms" aria-label="ห้องอื่น">
        <Link to={`/category/${prev.id}`} viewTransition className="rooms-prev" aria-label={`ห้องก่อนหน้า: ${prev.th}`}>
          <b><Arrow dir="left" />{prev.th}</b><i lang="en">{prev.en}</i>
        </Link>
        <Link to={`/category/${next.id}`} viewTransition className="rooms-next" aria-label={`ห้องถัดไป: ${next.th}`}>
          <b>{next.th}<Arrow dir="right" /></b><i lang="en">{next.en}</i>
        </Link>
      </nav>
      <ContactFab />
    </div>
  )
}
