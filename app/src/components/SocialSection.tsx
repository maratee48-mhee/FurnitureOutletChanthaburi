import { useEffect, useRef, useState } from 'react'
import { CONTACT } from '../data/contact'
import './SocialSection.css'

const tiktokUser = CONTACT.tiktok.split('/@')[1]
const fbSrc = 'https://www.facebook.com/plugins/page.php?' + new URLSearchParams({
  href: CONTACT.facebook, tabs: 'timeline', width: '340', height: '560',
  small_header: 'false', adapt_container_width: 'true', hide_cover: 'false', show_facepile: 'false',
})

const TRIES = 3, WAIT = 5000

export function SocialSection() {
  const tiktokRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)
  const [failed, setFailed] = useState(false)

  // TikTok's embed.js only scans the page once when it loads, so re-add it on every mount.
  // TikTok's embed server intermittently answers "overload-protect triggered" (503): the iframe
  // never talks back, so reload it a few times and then fall back to a plain link card.
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://www.tiktok.com/embed.js'; s.async = true
    document.body.appendChild(s)

    let alive = false, tries = 1
    const onMessage = (e: MessageEvent) => { if (e.origin === 'https://www.tiktok.com') { alive = true; setReady(true) } }
    window.addEventListener('message', onMessage)
    const timer = setInterval(() => {
      if (alive) return clearInterval(timer)
      if (tries >= TRIES) { clearInterval(timer); setFailed(true); return }
      tries++
      const frame = tiktokRef.current?.querySelector('iframe')
      if (frame) frame.src = frame.src
    }, WAIT)

    return () => { s.remove(); clearInterval(timer); window.removeEventListener('message', onMessage) }
  }, [])

  return (
    <section className="social" id="social" aria-label="Social">
      <div className="social-tiktok" ref={tiktokRef}>
        <blockquote className="tiktok-embed" hidden={failed} cite={CONTACT.tiktok} data-unique-id={tiktokUser} data-embed-type="creator">
          <section><a target="_blank" rel="noopener" href={CONTACT.tiktok}>@{tiktokUser}</a></section>
        </blockquote>
        {!ready && (
          <a className="social-tiktok-card" href={CONTACT.tiktok} target="_blank" rel="noopener">
            <b>TikTok</b>
            <span>@{tiktokUser}</span>
            <em>เปิด TikTok</em>
          </a>
        )}
      </div>
      <iframe className="social-fb" title="Furniture Outlet on Facebook" src={fbSrc}
        loading="lazy" allow="encrypted-media" />
    </section>
  )
}
