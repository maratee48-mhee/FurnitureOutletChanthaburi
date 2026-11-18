import { useEffect, useState } from 'react'
import './FollowCue.css'

// floating "scroll down" pill; goes away once the social section is on screen
export function FollowCue() {
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const target = document.getElementById('social')
    if (!target) return
    const io = new IntersectionObserver(([e]) => setSeen(e.isIntersecting), { threshold: 0.2 })
    io.observe(target)
    return () => io.disconnect()
  }, [])

  return (
    <a className={`follow-cue${seen ? ' gone' : ''}`} href="#social" aria-hidden={seen} tabIndex={seen ? -1 : 0}>
      <span>Contact us<small>ติดต่อเรา</small></span>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6" /></svg>
    </a>
  )
}
