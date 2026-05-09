import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'
import { slugify }               from '@/lib/utils'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const rows = await tursoQuery('SELECT * FROM Article WHERE id=? LIMIT 1', [Number(id)])
    if (!rows.length) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    return NextResponse.json(rows[0])
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 })
  }
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const d = await req.json()
    await tursoExec(
      `UPDATE Article SET title=?,slug=?,excerpt=?,content=?,category=?,catLabel=?,image=?,readTime=?,published=?,publishedAt=?,updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
      [d.title, slugify(d.title), d.excerpt, d.content, d.category, d.catLabel, d.image ?? null, d.readTime, d.published ? 1 : 0, d.published ? (d.publishedAt ?? new Date().toISOString()) : null, Number(id)]
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await tursoExec('DELETE FROM Article WHERE id=?', [Number(id)])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
