import type { MouseEvent, Ref } from 'react'
import type { Category } from '../data/categories'
import { RoomIcon } from './RoomIcon'
import './Box.css'

type Props = {
  item: Category
  on: boolean
  onClick: (e: MouseEvent<HTMLAnchorElement>) => void
  ref: Ref<HTMLAnchorElement>
}

export function Box({ item, on, onClick, ref }: Props) {
  return (
    <a ref={ref} className={on ? 'box on' : 'box'} href={`/category/${item.id}`}
      aria-label={`${item.th} — ${item.en}`} onClick={onClick}>
      <span className="face">
        <span className="front">
          <RoomIcon icon={item.icon} />
          <b>{item.label}</b>
          <i>{item.en}</i>
        </span>
        <span className="back">
          <b>{item.th}</b>
          <i>{item.en}</i>
          <span className="subs">{item.sub.map((s) => <span key={s}>{s}</span>)}</span>
          <em>ดูสินค้า →</em>
        </span>
      </span>
    </a>
  )
}
