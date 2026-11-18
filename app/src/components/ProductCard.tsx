import { useRef, useState } from 'react'
import type { Product } from '../data/products'
import { CONTACT } from '../data/contact'
import { productSpecs } from '../lib/productSpecs'
import { ImageZoom } from './ImageZoom'
import { RoomIcon } from './RoomIcon'

const baht = (n: number) => n.toLocaleString('th-TH')
const thumb = (src: string) => src.replace(/\.\w+$/, '.t.webp')

export function ProductCard({ p, icon, category }: { p: Product; icon: string; category: string }) {
  const [broken, setBroken] = useState(false)
  const [copied, setCopied] = useState(false)
  const [at, setAt] = useState(0) // which photo the pop-up shows
  const dialog = useRef<HTMLDialogElement>(null)
  const off = p.was ? Math.round((1 - p.price / p.was) * 100) : 0
  const { size, color } = productSpecs(p)
  const message = `สอบถามเพิ่มเติมเกี่ยวกับ ${p.name}`

  // LINE can pre-fill the chat box; Messenger cannot, so copy the text first and let the customer paste it.
  const lineHref = `https://line.me/R/oaMessage/${CONTACT.lineId}/?${encodeURIComponent(message)}`
  const copyForMessenger = () => {
    navigator.clipboard?.writeText(message).then(() => setCopied(true), () => {})
  }
  const pic = broken
    ? <RoomIcon icon={icon} className="card-fallback" />
    : <img src={p.img} alt={`${p.name} - ${category}`} width="600" height="600" loading="lazy" decoding="async" onError={() => setBroken(true)} />

  // jobs with several photos: the pop-up shows one at a time, picked from a thumbnail strip
  const pics = [p.img, ...(p.more ?? [])]
  const big = at === 0
    ? pic
    : <img key={pics[at]} src={pics[at]} alt={`${p.name} รูปที่ ${at + 1} - ${category}`} width="600" height="600" decoding="async" />

  return (
    <article className="card">
      <button type="button" className="card-main" aria-haspopup="dialog"
        onClick={() => { setCopied(false); setAt(0); dialog.current?.showModal() }}>
        <span className="card-pic">
          {pic}
          {off > 0 && <span className="card-off">-{off}%</span>}
          {pics.length > 1 && <span className="card-count">{pics.length} รูป</span>}
        </span>
        <span className="card-body">
          <span className="card-name">{p.name}</span>
          {p.price > 0 && (
            <span className="card-price">
              <b>{baht(p.price)} ฿</b>
              {p.was && <s aria-label={`ราคาปกติ ${baht(p.was)} บาท`}>{baht(p.was)} ฿</s>}
            </span>
          )}
        </span>
      </button>

      <dialog ref={dialog} className="pd" aria-labelledby={'pd-' + p.img}
        onClick={(e) => { if (e.target === dialog.current) dialog.current.close() }}>
        <button type="button" className="pd-close" aria-label="ปิด" onClick={() => dialog.current?.close()}>
          <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2"
            strokeLinecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className={pics.length > 1 ? 'pd-pic pd-gallery' : 'pd-pic'}>
          {broken && at === 0 ? pic : <ImageZoom src={pics[at]} label={p.name}>{big}</ImageZoom>}
          {pics.length > 1 && (
            <div className="pd-thumbs" role="group" aria-label={`รูปทั้งหมด ${pics.length} รูป`}>
              {pics.map((src, i) => (
                <button type="button" key={src} aria-pressed={i === at} aria-label={`รูปที่ ${i + 1} จาก ${pics.length}`} onClick={() => setAt(i)}>
                  <img src={thumb(src)} alt="" width="56" height="56" loading="lazy" decoding="async" />
                </button>
              ))}
            </div>
          )}
        </div>
        <div className="pd-info">
          <h2 id={'pd-' + p.img} className="pd-name">{p.name}</h2>
          <dl className="pd-specs">
            <div><dt>ขนาด</dt><dd>{size ?? '-'}</dd></div>
            <div><dt>สี</dt><dd>{color ?? '-'}</dd></div>
            <div>
              <dt>ราคา</dt>
              <dd className="pd-price">
                {p.price > 0 ? <><b>{baht(p.price)} ฿</b>{p.was && <s>{baht(p.was)} ฿</s>}</> : '-'}
              </dd>
            </div>
          </dl>
          <div className="pd-ask">
            <p>สนใจสินค้านี้ ทักถามร้านได้เลย</p>
            <a className="ask ask-line" href={lineHref} target="_blank" rel="noopener">สอบถามทาง LINE</a>
            <a className="ask ask-fb" href={CONTACT.messenger} target="_blank" rel="noopener" onClick={copyForMessenger}>
              สอบถามทาง Facebook
            </a>
            {copied && <span className="ask-hint" role="status">คัดลอกข้อความแล้ว วางในแชทได้เลย</span>}
          </div>
        </div>
      </dialog>
    </article>
  )
}
