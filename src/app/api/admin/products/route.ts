import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'
import { slugify }      from '@/lib/utils'

export async function GET() {
  try {
    const products = await prisma.product.findMany({ orderBy: { order: 'asc' } })
    return NextResponse.json(products)
  } catch {
    return NextResponse.json({ error: 'DB non disponible' }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const data    = await req.json()
    const product = await prisma.product.create({
      data: {
        name:        data.name,
        slug:        slugify(data.name),
        description: data.description ?? '',
        tagline:     data.tagline     ?? '',
        category:    data.category    ?? '',
        catLabel:    data.catLabel    ?? '',
        price:       Number(data.price) || 0,
        oldPrice:    data.oldPrice ? Number(data.oldPrice) : null,
        stock:       Number(data.stock) || 0,
        stockStatus: data.stockStatus ?? 'ok',
        image:       data.image       ?? null,
        benefits:    JSON.stringify(data.benefits ?? []),
        badge:       data.badge       ?? null,
        featured:    data.featured    ?? false,
        active:      data.active      ?? true,
        order:       Number(data.order) || 0,
      },
    })
    return NextResponse.json(product, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
