import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'
import { slugify }               from '@/lib/utils'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    const rows = await tursoQuery('SELECT * FROM Box WHERE id=? LIMIT 1', [Number(id)])
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
    const products = JSON.stringify(d.products ?? [])
    await tursoExec(
      `UPDATE Box SET name=?,slug=?,description=?,skinType=?,skinLabel=?,tag=?,accroche=?,products=?,image=?,active=?,"order"=?,waMessage=?,updatedAt=CURRENT_TIMESTAMP WHERE id=?`,
      [d.name, slugify(d.name), d.description, d.skinType, d.skinLabel, d.tag, d.accroche, products, d.image ?? null, d.active ? 1 : 0, Number(d.order) || 0, d.waMessage, Number(id)]
    )
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  try {
    await tursoExec('DELETE FROM Box WHERE id=?', [Number(id)])
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
