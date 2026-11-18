import { useRef, useState } from 'react'
import { branches } from '../data/branches'
import './AddressSection.css'

const embedSrc = (q: string) => 'https://www.google.com/maps?output=embed&q=' + encodeURIComponent(q).replace(/%2C/g, ',')

export function AddressSection() {
  const [mapQuery, setMapQuery] = useState(branches[0].mapQuery)
  const sectionRef = useRef<HTMLElement>(null)
  const keep = useRef<{ el: Element | Window; top: number } | null>(null)

  // Switching the map reloads the embedded iframe, which can drag the page down. Remember the scroll position and put it back.
  const restoreScroll = () => {
    const k = keep.current
    if (k) k.el.scrollTo({ top: k.top, behavior: 'instant' as ScrollBehavior })
  }
  const selectBranch = (q: string) => {
    if (q === mapQuery) return
    let el: Element | Window = window
    for (let p = sectionRef.current?.parentElement; p; p = p.parentElement) {
      const o = getComputedStyle(p).overflowY
      if ((o === 'auto' || o === 'scroll') && p.scrollHeight > p.clientHeight) { el = p; break }
    }
    keep.current = { el, top: el instanceof Window ? el.scrollY : el.scrollTop }
    setMapQuery(q)
    requestAnimationFrame(restoreScroll)
    setTimeout(restoreScroll, 300)
    setTimeout(restoreScroll, 1000)
    setTimeout(() => { keep.current = null }, 1500)
  }
  const current = branches.find((b) => b.mapQuery === mapQuery)
  const photos = current?.photos
  return (
    <section className="address" aria-label="Find us" ref={sectionRef} style={{ overflowAnchor: 'none' }}>
      <div className="address-text">
        <h2>Find Us</h2>
        <ul className="branch-list">
          {branches.map((b) => {
            const active = mapQuery === b.mapQuery
            return (
              <li key={b.name} className={active ? 'is-active' : undefined}>
                <h3 className="branch-name">{b.name}</h3>
                {b.address && <p className="branch-addr" lang="th">{b.address}</p>}
                <div className="branch-actions">
                  <button type="button" className="map-pin-btn" aria-pressed={active}
                    onClick={() => selectBranch(b.mapQuery)}>
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21z" />
                      <circle cx="12" cy="9.5" r="2.5" />
                    </svg>
                    ดูหมุดบนแผนที่
                  </button>
                  <a className="address-cta" href={b.href} target="_blank" rel="noopener">
                    เปิดใน Google Maps ↗
                  </a>
                </div>
                {(b.phone || b.website || b.facebook) && (
                  <p className="branch-extra">
                    {b.phone && <a href={'tel:' + b.phone.replace(/-/g, '')}>โทร {b.phone}</a>}
                    {b.website && <a href={b.website} target="_blank" rel="noopener">เว็บไซต์ ↗</a>}
                    {b.facebook && <a href={b.facebook} target="_blank" rel="noopener">Facebook ↗</a>}
                  </p>
                )}
              </li>
            )
          })}
        </ul>
      </div>
      <div className="address-side">
        <iframe className="address-map" title="Shop location map" src={embedSrc(mapQuery)}
        loading="lazy" referrerPolicy="no-referrer-when-downgrade" onLoad={restoreScroll} />
        {photos && (
          <div className="shop-photos">
            {photos.map((src, i) => (
              <img key={src} src={src} alt={current?.name + ' รูปที่ ' + (i + 1)} loading="lazy" />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
