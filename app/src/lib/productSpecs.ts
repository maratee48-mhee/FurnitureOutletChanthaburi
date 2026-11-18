// Size and colour come from the product data when set; otherwise they are read from the product name. Anything missing is null.
const SIZE = /\d+(?:\.\d+)?(?:\s*[xX×*]\s*\d+(?:\.\d+)?)*\s*(?:ฟุต|ซม\.?|เมตร|ที่นั่ง)/
const COLOR = /สี[ก-๛]+/

export function productSpecs(p: { name: string; size?: string; color?: string }) {
  return {
    size: p.size || p.name.match(SIZE)?.[0].replace(/\s+/g, ' ') || null,
    color: p.color || p.name.match(COLOR)?.[0] || null,
  }
}
