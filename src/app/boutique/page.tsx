import { tursoQuery }           from '@/lib/turso'
import { BoutiqueClient }       from './BoutiqueClient'
import type { ProductData }     from './BoutiqueClient'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const [products, boxes] = await Promise.all([
      tursoQuery('SELECT * FROM Product WHERE active=1 ORDER BY "order" ASC'),
      tursoQuery('SELECT * FROM Box WHERE active=1 ORDER BY "order" ASC LIMIT 3'),
    ])

    const mappedProducts: ProductData[] = products.map(p => ({
      id:         Number(p.id),
      img:        p.image ? String(p.image) : '/images/acc-ice-roller.jpg',
      cat:        String(p.category),
      catLabel:   String(p.catLabel || p.category),
      name:       String(p.name),
      desc:       String(p.description),
      price:      Number(p.price),
      oldPrice:   p.oldPrice ? Number(p.oldPrice) : null,
      rating:     4.9,
      reviews:    48,
      badge:      p.badge ? String(p.badge) : null,
      featured:   Number(p.featured) === 1,
      stock:      String(p.stockStatus),
      stockLabel: p.stockStatus === 'ok' ? 'En stock' : p.stockStatus === 'low' ? 'Stock limité' : 'Épuisé',
      benefits:   (() => { try { return JSON.parse(String(p.benefits)) as string[] } catch { return [] } })(),
    }))

    const crossBoxes = boxes.map(b => ({
      img:  b.image ? String(b.image) : '/images/peau-sensible.jpg',
      cat:  String(b.skinLabel),
      name: String(b.name),
      slug: String(b.slug),
    }))

    return { products: mappedProducts, crossBoxes }
  } catch {
    return { products: [], crossBoxes: [] }
  }
}

export default async function BoutiquePage() {
  const { products, crossBoxes } = await getData()
  return <BoutiqueClient products={products} crossBoxes={crossBoxes} />
}
