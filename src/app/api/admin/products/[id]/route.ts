import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'
import { slugify }      from '@/lib/utils'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const product = await prisma.product.findUnique({ where: { id: Number(id) } })
    if (!product) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(product)
  } catch {
    return NextResponse.json({ error: 'DB non disponible' }, { status: 503 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data    = await req.json()
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        name:        data.name,
        slug:        slugify(data.name),
        description: data.description,
        tagline:     data.tagline,
        category:    data.category,
        catLabel:    data.catLabel,
        price:       Number(data.price),
        oldPrice:    data.oldPrice ? Number(data.oldPrice) : null,
        stock:       Number(data.stock),
        stockStatus: data.stockStatus,
        image:       data.image ?? null,
        benefits:    JSON.stringify(data.benefits ?? []),
        badge:       data.badge ?? null,
        featured:    data.featured,
        active:      data.active,
        order:       Number(data.order) || 0,
      },
    })
    return NextResponse.json(product)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.product.delete({ where: { id: Number(id) } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
