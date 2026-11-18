import { useEffect, useId, useRef, useState } from 'react'
import { Link } from 'react-router'
import { categories } from '../data/categories'
import { RoomIcon } from './RoomIcon'

// Grid button in the room-page header; opens a panel that lists every room.
export function CategoryMenu({ currentId }: { currentId: string }) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const button = useRef<HTMLButtonElement>(null)
  const panelId = useId()

  // outside click closes; on open, focus moves to the current room
  useEffect(() => {
    if (!open) return
    const off = (e: PointerEvent) => { if (!root.current?.contains(e.target as Node)) setOpen(false) }
    document.addEventListener('pointerdown', off)
    root.current?.querySelector<HTMLElement>('[aria-current="page"]')?.focus()
    return () => document.removeEventListener('pointerdown', off)
  }, [open])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { setOpen(false); button.current?.focus(); return }
    const k = e.key === 'ArrowDown' ? 1 : e.key === 'ArrowUp' ? -1 : 0
    if (!k && e.key !== 'Home' && e.key !== 'End') return
    e.preventDefault()
    const list = [...(root.current?.querySelectorAll<HTMLElement>('.menu-item') ?? [])]
    const at = list.indexOf(document.activeElement as HTMLElement)
    list[e.key === 'Home' ? 0 : e.key === 'End' ? list.length - 1 : (at + k + list.length) % list.length]?.focus()
  }

  return (
    <div className="menu" ref={root} onKeyDown={onKeyDown}>
      <button type="button" ref={button} className="menu-btn" aria-label="เลือกห้อง" title="เลือกห้อง"
        aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((o) => !o)}>
        <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="4" width="6.5" height="6.5" rx="1" /><rect x="4" y="13.5" width="6.5" height="6.5" rx="1" /><rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1" /></svg>
      </button>
      {open && (
        <div className="menu-panel" id={panelId}>
          <Link to="/" viewTransition className="menu-item menu-home" onClick={() => setOpen(false)}>
            <span>หน้าแรก / ทุกห้อง<small lang="en">Home · All rooms</small></span>
          </Link>
          <ul>
            {categories.map((c) => (
              <li key={c.id}>
                <Link to={`/category/${c.id}`} viewTransition className="menu-item" aria-current={c.id === currentId ? 'page' : undefined}
                  onClick={() => setOpen(false)}>
                  <RoomIcon icon={c.icon} className="menu-icon" />
                  <span>{c.th}<small lang="en">{c.en}</small></span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}
