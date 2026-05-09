import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'
import { slugify }               from '@/lib/utils'

export async function GET() {
  try {
    const rows = await tursoQuery('SELECT * FROM Box WHERE active=1 ORDER BY "order" ASC')
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const d = await req.json()
    const products = JSON.stringify(d.products ?? [])
    await tursoExec(
      `INSERT INTO Box (name,slug,description,skinType,skinLabel,tag,accroche,products,image,active,"order",waMessage,updatedAt)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
      [d.name, slugify(d.name), d.description ?? '', d.skinType ?? '', d.skinLabel ?? '', d.tag ?? '', d.accroche ?? '', products, d.image ?? null, d.active ? 1 : 0, d.order ?? 0, d.waMessage ?? '']
    )
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
