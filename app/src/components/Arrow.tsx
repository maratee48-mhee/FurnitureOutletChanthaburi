// One authored arrow for every direction cue on the category page.
const paths = {
  left: 'M15 5l-7 7 7 7',
  right: 'M9 5l7 7-7 7',
  down: 'M12 5v14M6 13l6 6 6-6',
  out: 'M8 16L16 8M9 8h7v7', // opens elsewhere
}

export function Arrow({ dir, className = 'arrow' }: { dir: keyof typeof paths; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true">
      <path d={paths[dir]} />
    </svg>
  )
}
