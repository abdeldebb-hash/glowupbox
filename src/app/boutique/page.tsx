import { prisma }          from '@/lib/db'
import { BoutiqueClient }  from './BoutiqueClient'
import type { ProductData } from './BoutiqueClient'

export const dynamic = 'force-dynamic'

async function getData() {
  try {
    const [products, boxes] = await Promise.all([
      prisma.product.findMany({ where: { active: true }, orderBy: { order: 'asc' } }),
      prisma.box.findMany({ where: { active: true }, orderBy: { order: 'asc' }, take: 3 }),
    ])

    const mappedProducts: ProductData[] = products.map(p => ({
      id:         p.id,
      img:        p.image ?? '/images/acc-ice-roller.jpg',
      cat:        p.category,
      catLabel:   p.catLabel || p.category,
      name:       p.name,
      desc:       p.description,
      price:      p.price,
      oldPrice:   p.oldPrice,
      rating:     4.9,
      reviews:    48,
      badge:      p.badge,
      featured:   p.featured,
      stock:      p.stockStatus,
      stockLabel: p.stockStatus === 'ok' ? 'En stock' : p.stockStatus === 'low' ? 'Stock limité' : 'Épuisé',
      benefits:   (() => { try { return JSON.parse(p.benefits) as string[] } catch { return [] } })(),
    }))

    const crossBoxes = boxes.map(b => ({
      img:  b.image ?? '/images/peau-sensible.jpg',
      cat:  b.skinLabel,
      name: b.name,
      slug: b.slug,
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
