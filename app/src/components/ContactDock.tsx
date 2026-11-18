import { ThemeToggle } from './ThemeToggle'
import './ContactDock.css'

// Home page: the light/dark switch sits top-right; contact links live in the floating ContactFab, as on the room pages.
export function ContactDock() {
  return (
    <aside className="dock" aria-label="การแสดงผล">
      <ThemeToggle className="dock-btn" />
    </aside>
  )
}
