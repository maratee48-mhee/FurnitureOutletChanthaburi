// The room line icon from the orbit home; markup lives in categories.ts.
export function RoomIcon({ icon, className }: { icon: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" stroke="currentColor" strokeWidth="2.5"
      strokeLinejoin="miter" aria-hidden="true" dangerouslySetInnerHTML={{ __html: icon }} />
  )
}
