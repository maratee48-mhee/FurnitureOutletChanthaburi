// The visitor's own clock drives both the house hero's scene and the site-wide light/dark theme.
// 05:00-06:30 dawn, 06:30-17:00 day, 17:00-18:30 evening, 18:30-05:00 night (dark theme).
// index.html runs the same rule inline before first paint, so keep the two in step.

export type Phase = 'dawn' | 'day' | 'eve' | 'night'

export const phaseAt = (d: Date): Phase => {
  const m = d.getHours() * 60 + d.getMinutes()
  return m < 300 ? 'night' : m < 390 ? 'dawn' : m < 1020 ? 'day' : m < 1110 ? 'eve' : 'night'
}

export const themeAt = (d: Date) => (phaseAt(d) === 'night' ? 'dark' : 'light')

const GROUND = { light: '#f6f2ee', dark: '#3c3d41' }
type Theme = 'light' | 'dark'

// The sun/moon button can pin a theme; it is remembered in this browser only. Without a pin the clock decides.
const KEY = 'fo-theme'
const pinned = (): Theme | null => {
  try { const v = localStorage.getItem(KEY); return v === 'light' || v === 'dark' ? v : null } catch { return null }
}
export const currentTheme = (): Theme => pinned() ?? themeAt(new Date())

const listeners = new Set<() => void>()
export const subscribeTheme = (fn: () => void) => { listeners.add(fn); return () => { listeners.delete(fn) } }

function apply() {
  const theme = currentTheme()
  const root = document.documentElement
  if (root.dataset.theme !== theme) { root.dataset.theme = theme; listeners.forEach((fn) => fn()) }
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', GROUND[theme])
}

/** Flip light/dark. Picking what the clock would choose anyway clears the pin, so the site follows the time again. */
export function toggleTheme() {
  const next: Theme = currentTheme() === 'dark' ? 'light' : 'dark'
  try {
    if (next === themeAt(new Date())) localStorage.removeItem(KEY)
    else localStorage.setItem(KEY, next)
  } catch { /* storage blocked: still switch for this visit */ }
  const root = document.documentElement
  root.dataset.theme = next
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', GROUND[next])
  listeners.forEach((fn) => fn())
}

/** Sets the theme now and re-checks every 30 s, so an open tab turns dark at 18:30 and light at 05:00. */
export function startThemeClock() {
  apply()
  setInterval(apply, 30_000)
  document.addEventListener('visibilitychange', () => { if (!document.hidden) apply() })
}
