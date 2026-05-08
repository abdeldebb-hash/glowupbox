import { NextResponse } from 'next/server'
import { prisma }       from '@/lib/db'
import { slugify }      from '@/lib/utils'

export async function GET() {
  try {
    const articles = await prisma.article.findMany({ orderBy: { createdAt: 'desc' } })
    return NextResponse.json(articles)
  } catch {
    return NextResponse.json({ error: 'DB non disponible' }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const data    = await req.json()
    const article = await prisma.article.create({
      data: {
        title:       data.title,
        slug:        slugify(data.title),
        excerpt:     data.excerpt     ?? '',
        content:     data.content     ?? '',
        category:    data.category    ?? '',
        catLabel:    data.catLabel    ?? '',
        image:       data.image       ?? null,
        readTime:    data.readTime    ?? '5 min',
        published:   data.published   ?? false,
        publishedAt: data.published ? new Date() : null,
      },
    })
    return NextResponse.json(article, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
