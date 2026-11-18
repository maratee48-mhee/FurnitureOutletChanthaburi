import { useState } from 'react'
import type { CSSProperties } from 'react'
import { links } from './contactLinks'
import './ContactFab.css'

// floating contact buttons for the room pages; the main button hides / shows the rest
export function ContactFab() {
  const [open, setOpen] = useState(false)
  return (
    <aside className={'fab' + (open ? ' open' : '')} aria-label="ติดต่อเรา">
      <ul className="fab-list" id="fab-list" aria-hidden={!open}>
        {links.map((l, i) => (
          <li key={l.key} style={{ '--i': i } as CSSProperties}>
            <a className={'fab-btn fab-' + l.key} href={l.href} aria-label={l.label} tabIndex={open ? 0 : -1}
              {...(l.key === 'phone' ? {} : { target: '_blank', rel: 'noopener' })}>
              <svg viewBox="0 0 24 24" aria-hidden="true">{l.icon}</svg>
              <span className="fab-tip">{l.label}</span>
            </a>
          </li>
        ))}
      </ul>
      <button type="button" className="fab-main" onClick={() => setOpen(!open)}
        aria-expanded={open} aria-controls="fab-list">
        <span className="fab-tip fab-tip-main">{open ? 'ซ่อน' : 'ติดต่อเรา'}</span>
        <svg viewBox="0 0 24 24" aria-hidden="true">
          {open ? <path d="M6 6l12 12M18 6L6 18" /> : <path d="M4 5h16v11H9l-5 4z" />}
        </svg>
      </button>
    </aside>
  )
}
