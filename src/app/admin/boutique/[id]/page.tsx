import { notFound }   from 'next/navigation'
import { tursoQuery }  from '@/lib/turso'
import { ProductForm } from '../ProductForm'

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await tursoQuery('SELECT * FROM Product WHERE id=? LIMIT 1', [Number(id)]).catch(() => [])
  if (!rows.length) notFound()
  const p = rows[0]

  const product = {
    id:          Number(p.id),
    name:        String(p.name),
    slug:        String(p.slug),
    description: String(p.description),
    tagline:     String(p.tagline ?? ''),
    category:    String(p.category),
    catLabel:    String(p.catLabel ?? ''),
    price:       Number(p.price),
    oldPrice:    p.oldPrice ? Number(p.oldPrice) : null,
    stock:       Number(p.stock ?? 0),
    stockStatus: String(p.stockStatus ?? 'ok'),
    image:       p.image ? String(p.image) : null,
    benefits:    String(p.benefits ?? '[]'),
    badge:       p.badge ? String(p.badge) : null,
    featured:    Number(p.featured) === 1,
    active:      Number(p.active) === 1,
    order:       Number(p.order ?? 0),
    createdAt:   new Date(String(p.createdAt)),
    updatedAt:   new Date(String(p.updatedAt)),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ProductForm product={product as any} />
}
