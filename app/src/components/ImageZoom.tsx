import { useEffect, useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'

const LEVELS = [1, 2, 3] // 1 = fit the screen, uncropped
const SMALL = 600 // pictures with a longer side than this keep the full-size view; smaller ones are never enlarged past MAX_UP
const MAX_UP = 1.5
const icon = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, 'aria-hidden': true }

// The product picture as a button; opens a full-screen, zoomable view of the same image.
// The viewer is a nested modal <dialog>, so Esc closes only it and focus returns to the picture button.
export function ImageZoom({ src, label, children }: { src: string; label: string; children: ReactNode }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const view = useRef<HTMLDivElement>(null)
  const img = useRef<HTMLImageElement>(null)
  const [z, setZ] = useState(0)
  const [fit, setFit] = useState({ w: 0, h: 0 })
  const [maxZ, setMaxZ] = useState(LEVELS.length - 1)
  const [nat, setNat] = useState<{ w: number; h: number } | null>(null)
  const centre = useRef({ x: 0.5, y: 0.5 })
  const drag = useRef<{ x: number; y: number; left: number; top: number; moved: boolean } | null>(null)

  useEffect(() => {
    const i = new Image()
    i.onload = () => setNat({ w: i.naturalWidth, h: i.naturalHeight })
    i.src = src
  }, [src])

  const small = nat !== null && Math.max(nat.w, nat.h) < SMALL
  const cap = small ? ({ '--cap-w': `${nat.w * MAX_UP}px`, '--cap-h': `${nat.h * MAX_UP}px` } as CSSProperties) : undefined

  // rendered size at "fit" (never past MAX_UP x natural for small pictures) and the highest zoom level that stays within it
  const measure = () => {
    const v = view.current, im = img.current
    if (!v || !im || !im.naturalWidth) return null
    let w = Math.min(v.clientWidth, (v.clientHeight * im.naturalWidth) / im.naturalHeight)
    let max = LEVELS.length - 1
    if (Math.max(im.naturalWidth, im.naturalHeight) < SMALL) {
      w = Math.min(w, im.naturalWidth * MAX_UP)
      max = LEVELS.reduce((m, l, i) => (w * l <= im.naturalWidth * MAX_UP + 0.5 ? i : m), 0)
    }
    return { w, h: (w * im.naturalHeight) / im.naturalWidth, max }
  }

  const open = () => {
    setZ(0)
    dialog.current?.showModal()
    setMaxZ(measure()?.max ?? LEVELS.length - 1)
  }

  const level = (n: number) => {
    const v = view.current, im = img.current
    if (!v || !im || n < 0 || n > maxZ) return
    if (z === 0) { // rendered size at "fit", so zoomed sizes are multiples of it
      const m = measure()
      if (!m) return
      setFit({ w: m.w, h: m.h })
      centre.current = { x: 0.5, y: 0.5 }
    } else {
      centre.current = { x: (v.scrollLeft + v.clientWidth / 2) / v.scrollWidth, y: (v.scrollTop + v.clientHeight / 2) / v.scrollHeight }
    }
    setZ(n)
  }

  // keep the same point in the middle of the view after the size changes
  useLayoutEffect(() => {
    const v = view.current
    if (!v) return
    v.scrollLeft = centre.current.x * v.scrollWidth - v.clientWidth / 2
    v.scrollTop = centre.current.y * v.scrollHeight - v.clientHeight / 2
  }, [z])

  const size = z > 0 ? { width: fit.w * LEVELS[z], height: fit.h * LEVELS[z] } : undefined

  return (
    <>
      <button type="button" className="pd-zoom" style={cap} aria-haspopup="dialog" aria-label={`ขยายรูป ${label}`} onClick={open}>
        {children}
        <span className="pd-zoom-hint" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="18" height="18" {...icon}><circle cx="10.5" cy="10.5" r="6.5" /><path d="M15.5 15.5L21 21M10.5 8v5M8 10.5h5" /></svg>
        </span>
      </button>

      <dialog ref={dialog} className="zoom" style={cap} aria-label={`ขยายรูป ${label}`}
        onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close() }}
        onKeyDown={(e) => { if (e.key === '+' || e.key === '=') level(z + 1); if (e.key === '-') level(z - 1) }}>
        <div className={z > 0 ? 'zoom-view zoomed' : 'zoom-view'} ref={view} tabIndex={0}
          onClick={(e) => { if (e.target === e.currentTarget) dialog.current?.close() }}
          onPointerDown={(e) => {
            const v = view.current
            if (!v || z === 0 || e.pointerType === 'touch') return // touch pans natively
            drag.current = { x: e.clientX, y: e.clientY, left: v.scrollLeft, top: v.scrollTop, moved: false }
            v.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            const d = drag.current, v = view.current
            if (!d || !v) return
            const dx = e.clientX - d.x, dy = e.clientY - d.y
            if (Math.abs(dx) + Math.abs(dy) > 4) d.moved = true
            v.scrollLeft = d.left - dx; v.scrollTop = d.top - dy
          }}
          onPointerUp={() => { setTimeout(() => { drag.current = null }) }}>
          <img ref={img} src={src} alt={label} style={size} draggable={false}
            onClick={() => { if (!drag.current?.moved) level(z === 0 ? 1 : 0) }} />
        </div>

        <button type="button" className="zoom-btn zoom-close" aria-label="ปิดรูปขยาย" onClick={() => dialog.current?.close()}>
          <svg viewBox="0 0 24 24" width="20" height="20" {...icon}><path d="M6 6l12 12M18 6L6 18" /></svg>
        </button>
        <div className="zoom-bar" role="group" aria-label="ซูมรูป">
          <button type="button" className="zoom-btn" aria-label="ซูมออก" disabled={z === 0} onClick={() => level(z - 1)}>
            <svg viewBox="0 0 24 24" width="20" height="20" {...icon}><path d="M6 12h12" /></svg>
          </button>
          <output aria-live="polite">{LEVELS[z]}×</output>
          <button type="button" className="zoom-btn" aria-label="ซูมเข้า" disabled={z >= maxZ} onClick={() => level(z + 1)}>
            <svg viewBox="0 0 24 24" width="20" height="20" {...icon}><path d="M6 12h12M12 6v12" /></svg>
          </button>
        </div>
      </dialog>
    </>
  )
}
