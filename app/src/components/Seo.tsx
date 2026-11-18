import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router'
import { applyMeta, pageMeta } from '../lib/seo'

// Renders nothing; keeps title, description, canonical and social tags in step with the current route.
export function Seo() {
  const { pathname } = useLocation()
  const first = useRef(true)
  useEffect(() => {
    // the prerendered JSON-LD belongs to the page that was loaded; once the visitor navigates it no longer describes the page
    if (!first.current) document.head.querySelectorAll('script[type="application/ld+json"]').forEach((el) => el.remove())
    first.current = false
    applyMeta(pageMeta(pathname))
  }, [pathname])
  return null
}
