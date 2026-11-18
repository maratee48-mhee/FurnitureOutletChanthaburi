import { CONTACT } from './contact.ts'

const mapsSearch = (q: string) => 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(q)

export type Branch = { name: string; address: string; href: string; mapQuery: string; photos?: string[]; phone?: string; facebook?: string; website?: string }

// One entry per branch. Add the address and a direct Google Maps link (href) when they are known.
export const branches: Branch[] = [
  { name: 'Koncept เฟอร์นิเจอร์ เอาท์เล็ท(เมืองจันทบุรี)', address: CONTACT.address, href: CONTACT.mapHref, mapQuery: CONTACT.mapCoords, photos: ['/image.jpg', '/shop-2/image.jpg'], phone: CONTACT.phoneLabel },
  {
    name: 'Koncept Furniture เขาไร่ยา,จันทบุรี',
    address: 'เลขที่ 230/1 ท่าช้าง เทศบาลเมืองท่าช้าง เมือง จันทบุรี 22000',
    href: mapsSearch('M38W+V2 ตำบลแสลง อำเภอเมืองจันทบุรี จันทบุรี'),
    mapQuery: 'M38W+V2 ตำบลแสลง อำเภอเมืองจันทบุรี จันทบุรี',
    photos: ['/khao-raiya/image.jpg', '/khao-raiya-2/image.jpg'],
    phone: '039-471-234',
    website: 'https://www.furniture-outletshop.com/',
  },
  {
    name: 'Koncept Furniture สระแก้ว',
    address: 'เลขที่ 108 หมู่ 11 ตำบลผักขะ อำเภอวัฒนานคร สระแก้ว 27160',
    href: mapsSearch('PCGW+7X ตำบลผักขะ อำเภอวัฒนานคร สระแก้ว'),
    mapQuery: 'PCGW+7X ตำบลผักขะ อำเภอวัฒนานคร สระแก้ว',
    photos: ['/sakaeo-1/image.jpg', '/sakaeo-2/image.jpg'],
    phone: '037-247-247',
    facebook: 'https://www.facebook.com/FURNITUREOUTLETSAKAEO/',
  },
]
