import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'
import { categories } from '../data/categories'
import { phaseAt, type Phase } from '../lib/daytime'
import './HouseHero.css'

// Cut-away house that sits behind every room page's hero. Each room in the picture is a link to its
// category, so visitors can switch rooms without going back to the orbit. Four pixel-aligned photos
// (dawn, day, evening, night) follow the visitor's clock.

const greeting = (p: Phase, h: number) =>
  p === 'dawn' ? 'อรุณสวัสดิ์' : p === 'eve' ? 'ยามเย็น' : p === 'night' ? 'คืนนี้' : h < 12 ? 'สวัสดีตอนเช้า' : 'สวัสดีตอนบ่าย'
const src = (p: Phase, w: number) => `/house/${p}-${w}.webp`

type Anchor = 'end' | 'start' | 'top'
type Room = { id: string; shape: { poly: string } | { x: number; y: number; w: number; h: number; r?: number }; dot: [number, number]; lead: string; tag: [number, number, Anchor] }

// Geometry in the photo's own 2000 x 1116 frame; tag positions are % of that frame.
const ROOMS: Room[] = [
  { id: 'office', shape: { poly: '742,118 486,388 998,388' }, dot: [650, 300], lead: 'M650 300 L470 200 L408 186', tag: [20.4, 16.7, 'end'] },
  { id: 'living', shape: { x: 486, y: 416, w: 514, h: 250 }, dot: [560, 560], lead: 'M560 560 L440 470 L400 458', tag: [20, 41, 'end'] },
  { id: 'bedroom', shape: { x: 1016, y: 416, w: 452, h: 250 }, dot: [1225, 610], lead: 'M1225 610 L1520 430 L1582 418', tag: [79.1, 37.5, 'start'] },
  { id: 'dining', shape: { x: 486, y: 700, w: 510, h: 266 }, dot: [760, 880], lead: 'M760 880 L620 990', tag: [31, 88.7, 'top'] },
  { id: 'storage', shape: { x: 1016, y: 700, w: 450, h: 266 }, dot: [1140, 860], lead: 'M1140 860 L1380 990', tag: [69, 88.7, 'top'] },
  { id: 'builtin', shape: { x: 192, y: 660, w: 256, h: 306 }, dot: [310, 800], lead: 'M310 800 L310 990', tag: [15.5, 88.7, 'top'] },
  { id: 'outdoor', shape: { x: 1500, y: 662, w: 380, h: 318, r: 60 }, dot: [1655, 860], lead: 'M1655 860 L1740 640 L1772 622', tag: [88.6, 55.7, 'start'] },
]
const SHIFT: Record<Anchor, string> = { end: 'translate(-100%, -50%)', start: 'translate(0, -50%)', top: 'translate(-50%, 0)' }

const LAMPS: [number, number, number][] = [[612, 518, 95], [747, 462, 70], [1096, 560, 80], [1322, 560, 80], [700, 290, 70], [760, 772, 110], [1071, 818, 60], [1300, 800, 90], [265, 790, 70]]
const BULBS: [number, number][] = [[1535, 725], [1580, 735], [1625, 742], [1670, 748], [1715, 745], [1760, 738], [1800, 728]]
const STARS: [number, number, number][] = [[60, 60, 2.4], [170, 150, 1.8], [290, 40, 2.6], [350, 230, 1.8], [120, 260, 2], [520, 40, 2], [980, 30, 2.2], [1180, 60, 1.8], [1560, 70, 2.4], [1640, 250, 1.8], [1880, 90, 2.6], [1940, 300, 1.8], [1820, 380, 2], [1600, 400, 1.6], [40, 380, 1.8]]
const FLIES: [number, number][] = [[120, 1020], [420, 1060], [900, 1040], [1350, 1080], [1900, 1000], [1950, 800], [60, 760], [1560, 1090]]

export function HouseHero({ current }: { current: string }) {
  const [now, setNow] = useState(() => new Date())
  // fog reveal plays on every arrival: from the home ring, and when switching rooms from the house or menu
  const [fog, setFog] = useState(true)
  const [hover, setHover] = useState<string | null>(null)
  const phase = phaseAt(now)
  const cur = categories.find((c) => c.id === current)

  useEffect(() => {
    const iv = setInterval(() => setNow(new Date()), 30_000)
    const t = setTimeout(() => setFog(false), 3600)
    return () => { clearInterval(iv); clearTimeout(t) }
  }, [])

  // Portrait screens: the house fills the full height and pans sideways. Start (and glide) to the current room.
  const pan = useRef<HTMLDivElement>(null)
  const panned = useRef(false)
  const [swiped, setSwiped] = useState(false)
  useLayoutEffect(() => {
    const el = pan.current
    const room = ROOMS.find((r) => r.id === current)
    if (!el || !room || el.scrollWidth <= el.clientWidth + 1) return
    const left = (room.dot[0] / 2000) * el.scrollWidth - el.clientWidth / 2
    el.scrollTo({ left, behavior: panned.current ? 'smooth' : 'instant' })
    panned.current = true
  }, [current])

  const cls = (id: string) => [hover === id && 'on', current === id && 'cur'].filter(Boolean).join(' ')

  return (
    <div className={`house ${phase}`}>
      <div className="house-pan" ref={pan} onTouchStart={() => setSwiped(true)} onWheel={() => setSwiped(true)}>
      <div className="house-stage">
        <div className={fog ? 'house-photo push' : 'house-photo'}>
          <img key={phase} className="house-img" src={src(phase, 1600)} fetchPriority="high"
            srcSet={[800, 1600, 2752].map((w) => `${src(phase, w)} ${w}w`).join(', ')} sizes="max(100vw, 180svh)"
            alt="บ้านแบบผ่าครึ่ง เห็นทุกห้อง เลือกห้องเพื่อดูสินค้าหมวดนั้น" />
          <svg className="house-fx" viewBox="0 0 2000 1116" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <filter id="hh-soft" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18" /></filter>
              <filter id="hh-dot" x="-200%" y="-200%" width="500%" height="500%"><feGaussianBlur stdDeviation="2.5" /></filter>
              <radialGradient id="hh-lamp"><stop offset="0" stopColor="#ffe2a0" stopOpacity=".9" /><stop offset=".4" stopColor="#ffc66e" stopOpacity=".35" /><stop offset="1" stopColor="#ffb24d" stopOpacity="0" /></radialGradient>
              <radialGradient id="hh-sun"><stop offset="0" stopColor="#fff1c2" stopOpacity=".85" /><stop offset=".35" stopColor="#ffc070" stopOpacity=".35" /><stop offset="1" stopColor="#ff9a4d" stopOpacity="0" /></radialGradient>
            </defs>
            {phase === 'day' && (
              <g>
                <g className="hh-drift" style={{ animationDuration: '110s', animationDelay: '-40s' }}><ellipse className="hh-cloud" cx="0" cy="120" rx="170" ry="38" /></g>
                <g className="hh-drift" style={{ animationDuration: '150s', animationDelay: '-100s' }}><ellipse className="hh-cloud" cx="0" cy="230" rx="210" ry="40" /></g>
                <g className="hh-drift" style={{ animationDuration: '130s', animationDelay: '-15s' }}><ellipse className="hh-cloud" cx="0" cy="60" rx="130" ry="28" /></g>
              </g>
            )}
            {phase === 'dawn' && (
              <g>
                <g className="hh-mist-a"><ellipse className="hh-mist" cx="300" cy="690" rx="360" ry="46" /><ellipse className="hh-mist" cx="1750" cy="640" rx="320" ry="42" /><ellipse className="hh-mist" cx="1000" cy="1030" rx="700" ry="40" /></g>
                <g className="hh-mist-b"><ellipse className="hh-mist" cx="180" cy="1000" rx="300" ry="36" /><ellipse className="hh-mist" cx="1850" cy="980" rx="280" ry="38" /><ellipse className="hh-mist" cx="1700" cy="520" rx="260" ry="30" /></g>
              </g>
            )}
            {phase === 'eve' && <circle className="hh-sunglow" cx="1890" cy="430" r="260" />}
            {(phase === 'eve' || phase === 'night') && (
              <g>
                {LAMPS.map(([x, y, r], i) => <circle key={i} className="hh-lamp" cx={x} cy={y} r={r} style={{ animationDelay: `${-i * 0.6}s` }} />)}
                {BULBS.map(([x, y], i) => <circle key={i} className="hh-bulb" cx={x} cy={y} r="16" style={{ animationDelay: `${-i * 0.5}s` }} />)}
              </g>
            )}
            {phase === 'night' && (
              <g>
                {STARS.map(([x, y, r], i) => <circle key={i} className="hh-star" cx={x} cy={y} r={r} style={{ animationDelay: `${-i * 0.37}s` }} />)}
                {FLIES.map(([x, y], i) => <circle key={i} className="hh-fly" cx={x} cy={y} r="4" style={{ animationDelay: `${-i * 0.7}s` }} />)}
              </g>
            )}
            {[0, -2, -4].map((d) => <circle key={d} className="hh-smoke" cx="1380" cy="60" r="16" style={{ animationDelay: `${d}s` }} />)}
          </svg>
        </div>

        <svg className="house-links" viewBox="0 0 2000 1116" preserveAspectRatio="none">
          {ROOMS.map((r) => (
            <Link key={r.id} to={`/category/${r.id}`} viewTransition className={`hh-room ${cls(r.id)}`}
              aria-label={categories.find((c) => c.id === r.id)?.th}
              onMouseEnter={() => setHover(r.id)} onMouseLeave={() => setHover(null)}
              onFocus={() => setHover(r.id)} onBlur={() => setHover(null)}>
              {'poly' in r.shape
                ? <polygon className="hh-hit" points={r.shape.poly} />
                : <rect className="hh-hit" x={r.shape.x} y={r.shape.y} width={r.shape.w} height={r.shape.h} rx={r.shape.r ?? 6} />}
            </Link>
          ))}
          {ROOMS.map((r, i) => (
            <g key={r.id} aria-hidden="true">
              <path className={`hh-lead ${cls(r.id)}`} d={r.lead} style={{ animationDelay: `${(fog ? 2.0 : 0.3) + i * 0.15}s` }} />
              <circle className="hh-dot" cx={r.dot[0]} cy={r.dot[1]} r="9" />
            </g>
          ))}
        </svg>

        {ROOMS.map((r, i) => {
          const c = categories.find((x) => x.id === r.id)!
          return (
            <Link key={r.id} to={`/category/${r.id}`} viewTransition tabIndex={-1} aria-hidden="true"
              className={`hh-tag ${cls(r.id)}`}
              style={{ left: `${r.tag[0]}%`, top: `${r.tag[1]}%`, transform: SHIFT[r.tag[2]], animationDelay: `${(fog ? 2.4 : 0.5) + i * 0.15}s` }}
              onMouseEnter={() => setHover(r.id)} onMouseLeave={() => setHover(null)}>
              <b>{c.th}</b><i lang="en">{c.en}</i>
            </Link>
          )
        })}
      </div>
      </div>

      <Clock />
      <p className={swiped ? 'hh-swipe gone' : 'hh-swipe'} aria-hidden="true">
        <svg viewBox="0 0 24 24"><path d="M9 6l-6 6 6 6M15 6l6 6-6 6" /></svg>ปัดซ้าย–ขวาเพื่อดูห้องอื่น
      </p>

      {fog && cur && (
        <div className="hh-fog" aria-hidden="true">
          <div className="hh-fog-base" />
          <div className="hh-fog-half l"><i style={{ left: '0%', top: '5%', width: '70%', height: '45%' }} /><i style={{ left: '20%', top: '30%', width: '85%', height: '50%' }} /><i style={{ left: '-10%', top: '55%', width: '80%', height: '50%' }} /><i style={{ left: '35%', top: '10%', width: '70%', height: '40%' }} /><i style={{ left: '40%', top: '60%', width: '70%', height: '40%' }} /></div>
          <div className="hh-fog-half r"><i style={{ right: '0%', top: '8%', width: '70%', height: '45%' }} /><i style={{ right: '20%', top: '32%', width: '85%', height: '48%' }} /><i style={{ right: '-10%', top: '58%', width: '80%', height: '48%' }} /><i style={{ right: '35%', top: '12%', width: '70%', height: '40%' }} /><i style={{ right: '40%', top: '62%', width: '70%', height: '40%' }} /></div>
          <div className="hh-fog-title"><b>{cur.th}</b><i lang="en">{cur.en}</i></div>
        </div>
      )}
    </div>
  )
}

const pad = (n: number) => String(n).padStart(2, '0')

// Live clock chip: ticks on the second boundary, in its own component so only it re-renders each second.
function Clock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const tick = () => { const d = new Date(); setNow(d); t = setTimeout(tick, 1000 - d.getMilliseconds()) }
    t = setTimeout(tick, 1000 - new Date().getMilliseconds())
    return () => clearTimeout(t)
  }, [])
  const phase = phaseAt(now)
  const hm = `${pad(now.getHours())}:${pad(now.getMinutes())}`
  return (
    <p className="hh-clock" aria-label={`ตอนนี้ ${hm} น.`}>
      {phase === 'night'
        ? <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>
        : <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>}
      <b>{hm}<small>:{pad(now.getSeconds())}</small> น.</b><span>{greeting(phase, now.getHours())}</span>
    </p>
  )
}
