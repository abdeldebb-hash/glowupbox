import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'
import { slugify }               from '@/lib/utils'

export async function GET() {
  try {
    const rows = await tursoQuery('SELECT * FROM Article ORDER BY createdAt DESC')
    return NextResponse.json(rows)
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 503 })
  }
}

export async function POST(req: Request) {
  try {
    const d = await req.json()
    await tursoExec(
      `INSERT INTO Article (title,slug,excerpt,content,category,catLabel,image,readTime,published,publishedAt,updatedAt)
       VALUES (?,?,?,?,?,?,?,?,?,?,CURRENT_TIMESTAMP)`,
      [d.title, slugify(d.title), d.excerpt ?? '', d.content ?? '', d.category ?? '', d.catLabel ?? '', d.image ?? null, d.readTime ?? '5 min', d.published ? 1 : 0, d.published ? new Date().toISOString() : null]
    )
    return NextResponse.json({ ok: true }, { status: 201 })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
