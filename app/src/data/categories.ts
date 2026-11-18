// One entry per box — edit here to change text, order, links or icons.
export type Category = {
  id: string
  label: string // short Thai label on the card front
  th: string // full Thai name on the detail side
  en: string
  sub: string[]
  href: string
  icon: string // inner SVG markup, 64x64 viewBox
  photo: string // Unsplash photo base URL — stand-in until real showroom photos
  credit: string // photographer, shown on the hero
}

const BASE = 'https://www.furniture-outletshop.com/'
const fill = 'fill="currentColor"'
const link = (path: string) => BASE + encodeURI(path)

export const categories: Category[] = [
  { id: 'bedroom', label: 'ชุดห้องนอน', th: 'ชุดห้องนอน', en: 'Bedroom', sub: ['ตู้เสื้อผ้า', 'ตู้ลิ้นชัก', 'เตียง', 'ชุดห้องนอน', 'ตู้ข้างเตียง', 'ที่นอน', 'ตู้เสื้อผ้าเหล็ก', 'โต๊ะเครื่องแป้ง'],
    photo: 'https://images.unsplash.com/photo-1600210491305-7396500b5b31', credit: 'Collov Home Design',
    href: link('ห้องนอน/64112a8fc6227700139b30c4'),
    icon: `<path d="M10 16v34M54 32v18"/><rect x="10" y="34" width="44" height="8"/><rect x="14" y="27" width="12" height="7" ${fill}/>` },
  { id: 'living', label: 'ห้องนั่งเล่น', th: 'ห้องนั่งเล่น', en: 'Living Room', sub: ['โซฟา', 'ตู้เก็บของ', 'โต๊ะกลาง', 'ตู้รองเท้า', 'เก้าอี้พักผ่อน'],
    photo: 'https://images.unsplash.com/photo-1636206508343-a6c955887476', credit: 'nuddle',
    href: link('ห้องนั่งเล่น/64112a96c6227700139b30d2'),
    icon: `<rect x="18" y="12" width="28" height="22"/><rect x="6" y="26" width="12" height="22"/><rect x="46" y="26" width="12" height="22"/><rect x="18" y="34" width="28" height="14" ${fill}/><path d="M10 48v6M54 48v6"/>` },
  { id: 'office', label: 'ชุดสำนักงาน', th: 'ชุดสำนักงาน', en: 'Office Furniture', sub: ['เก้าอี้สำนักงาน', 'เก้าอี้เกมมิ่ง', 'โต๊ะทำงาน', 'ตู้เซฟ', 'ตู้เก็บของสำนักงาน', 'ตู้เอกสารเหล็ก', 'ชุดโต๊ะทำงาน', 'โต๊ะประชุม', 'เคาน์เตอร์ต้อนรับ', 'พาร์ทิชั่นสำนักงาน'],
    photo: 'https://images.unsplash.com/photo-1596022326953-84f20bfebb77', credit: 'Sven Brandsma',
    href: link('ห้องทำงาน/64112a9c6202f50013e07db0'),
    icon: `<rect x="12" y="8" width="22" height="13"/><rect x="16" y="12" width="14" height="5" ${fill}/><path d="M23 21v4M6 26h52M10 26v28M54 26v28"/><rect x="40" y="26" width="14" height="18"/><path d="M44 35h6"/>` },
  { id: 'dining', label: 'ชุดอาหาร', th: 'ชุดอาหาร', en: 'Dining Room', sub: ['ชุดโต๊ะอาหาร', 'ห้องครัวขนาดกะทัดรัดและครัวสำเร็จรูป', 'เก้าอี้ทานอาหาร', 'เก้าอี้บาร์', 'ชุดอาหารไม้จริง'],
    photo: 'https://images.unsplash.com/photo-1745794621090-d856c53b0cc2', credit: 'Clay Banks',
    href: link('ห้องอาหารและห้องครัว/64112aa16202f50013e07dbe'),
    icon: `<rect x="12" y="26" width="40" height="6" ${fill}/><path d="M16 32v22M48 32v22M6 18v36M6 42h8M58 18v36M58 42h-8"/>` },
  { id: 'storage', label: 'ชุดชั้นวางและตู้โชว์', th: 'ชุดชั้นวางและตู้โชว์', en: 'Sideboard & Showcase', sub: ['ชุดวางทีวี', 'ตู้โชว์', 'ตู้พระ', 'Color Box', 'ตู้โชว์กระจก'],
    photo: 'https://images.unsplash.com/photo-1652517209166-f17a2742a5fe', credit: 'Allison Saeng',
    href: link('ห้องเก็บของ/64112aa76202f50013e07dcc'),
    icon: `<rect x="12" y="8" width="40" height="44"/><path d="M32 8v44M12 24h40M12 38h40"/><rect x="17" y="15" width="10" height="9" ${fill}/><rect x="38" y="12" width="8" height="12" ${fill}/><rect x="20" y="30" width="7" height="8" ${fill}/><rect x="37" y="29" width="9" height="9" ${fill}/><path d="M16 52v6M48 52v6"/>` },
  { id: 'outdoor', label: 'ชุดสนาม', th: 'ชุดสนาม', en: 'Out Door', sub: ['เฟอร์นิเจอร์นอกบ้าน', 'เฟอร์นิเจอร์สวน'],
    photo: 'https://images.unsplash.com/photo-1719324923613-ff0884b031ed', credit: 'Tile Merchant Ireland',
    href: link('บริเวณนอกบ้านและสวน/64112aac6202f50013e07de6'),
    icon: `<path d="M6 28C10 14 21 8 32 8s22 6 26 20z"/><path d="M32 8c-5 5-8 12-8 20h16c0-8-3-15-8-20z" ${fill}/><path d="M32 28v26M22 54h20"/>` },
{ id: 'builtin', label: 'ชุด Built-in', th: 'ชุด Built-in', en: 'Built-in Furniture', sub: ['ห้องเสื้อผ้า', 'ห้องครัว', 'ห้องรับแขก', 'ห้องประชุม/สำนักงาน', 'คลินิก/โรงพยาบาล'],
photo: 'https://images.unsplash.com/photo-1672137233327-37b0c1049e77', credit: 'Billy Jo Catbagan',
href: BASE,
icon: `<rect x="10" y="8" width="44" height="46"/><path d="M32 8v46M10 18h44"/><path d="M27 30v8M37 30v8"/><path d="M14 54v4M50 54v4"/>` },
]
