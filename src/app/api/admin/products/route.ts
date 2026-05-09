import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'
import { slugify }               from '@/lib/utils'

export async function GET() {
  try {
    const rows = await tursoQuery('SELECT * FROM Product WHERE active=1 ORDER BY "order" ASC')
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const d = await req.json()
    await tursoExec(
      `INSERT INTO Product (name,slug,description,tagline,category,catLabel,price,oldPrice,stock,stockStatus,image,benefits,badge,featured,active,"order",updatedAt)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
      [d.name, slugify(d.name), d.description ?? '', d.tagline ?? '', d.category ?? '', d.catLabel ?? '', Number(d.price) || 0, d.oldPrice ? Number(d.oldPrice) : null, Number(d.stock) || 0, d.stockStatus ?? 'ok', d.image ?? null, JSON.stringify(d.benefits ?? []), d.badge ?? null, d.featured ? 1 : 0, d.active ? 1 : 0, Number(d.order) || 0]
    )
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
