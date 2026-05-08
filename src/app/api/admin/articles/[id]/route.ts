import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'
import { slugify }      from '@/lib/utils'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const article = await prisma.article.findUnique({ where: { id: Number(id) } })
    if (!article) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(article)
  } catch {
    return NextResponse.json({ error: 'DB non disponible' }, { status: 503 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const data    = await req.json()
    const article = await prisma.article.update({
      where: { id: Number(id) },
      data: {
        title:       data.title,
        slug:        slugify(data.title),
        excerpt:     data.excerpt,
        content:     data.content,
        category:    data.category,
        catLabel:    data.catLabel,
        image:       data.image ?? null,
        readTime:    data.readTime,
        published:   data.published,
        publishedAt: data.published ? (data.publishedAt ? new Date(data.publishedAt) : new Date()) : null,
      },
    })
    return NextResponse.json(article)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await prisma.article.delete({ where: { id: Number(id) } })
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
