import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'
import { slugify }               from '@/lib/utils'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const rows = await tursoQuery('SELECT * FROM Product WHERE id=? LIMIT 1', [Number(id)])
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
      `UPDATE Product SET name=?,slug=?,description=?,tagline=?,category=?,catLabel=?,price=?,oldPrice=?,stock=?,stockStatus=?,image=?,benefits=?,badge=?,featured=?,active=?,"order"=?,updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
      [d.name, slugify(d.name), d.description, d.tagline, d.category, d.catLabel, Number(d.price), d.oldPrice ? Number(d.oldPrice) : null, Number(d.stock), d.stockStatus, d.image ?? null, JSON.stringify(d.benefits ?? []), d.badge ?? null, d.featured ? 1 : 0, d.active ? 1 : 0, Number(d.order) || 0, Number(id)]
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await tursoExec('DELETE FROM Product WHERE id=?', [Number(id)])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
