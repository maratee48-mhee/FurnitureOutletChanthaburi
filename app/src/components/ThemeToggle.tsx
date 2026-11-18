import { useSyncExternalStore } from 'react'
import { subscribeTheme, toggleTheme } from '../lib/daytime'
import './ThemeToggle.css'

const read = () => document.documentElement.dataset.theme === 'dark'

// Sun/moon button beside the login icon. Shows the mode you would switch to.
export function ThemeToggle({ className }: { className: string }) {
  const dark = useSyncExternalStore(subscribeTheme, read, () => false)
  const label = dark ? 'เปลี่ยนเป็นโหมดสว่าง' : 'เปลี่ยนเป็นโหมดมืด'
  return (
    <button type="button" className={`theme-toggle ${className}`} onClick={toggleTheme} aria-label={label} title={label}>
      {dark
        ? <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4.5" /><path d="M12 2v2.5M12 19.5V22M2 12h2.5M19.5 12H22M4.9 4.9l1.8 1.8M17.3 17.3l1.8 1.8M4.9 19.1l1.8-1.8M17.3 6.7l1.8-1.8" /></svg>
        : <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z" /></svg>}
    </button>
  )
}
