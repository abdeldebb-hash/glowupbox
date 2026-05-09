import { NextResponse } from 'next/server'
import { tursoQuery, tursoExec } from '@/lib/turso'

export async function GET() {
  try {
    const rows = await tursoQuery('SELECT key, value FROM Option')
    const map: Record<string, string> = {}
    rows.forEach(r => { map[r.key as string] = r.value as string })
    return NextResponse.json(map)
  } catch (e) {
    return NextResponse.json({}, { status: 503 })
  }
}

export async function PUT(req: Request) {
  try {
    const data = await req.json() as Record<string, string>
    for (const [key, value] of Object.entries(data)) {
      await tursoExec(
        'INSERT INTO Option (key,value,updatedAt) VALUES (?,?,CURRENT_TIMESTAMP) ON CONFLICT(key) DO UPDATE SET value=excluded.value,updatedAt=CURRENT_TIMESTAMP',
        [key, value]
      )
    }
    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: String(e) }, { status: 500 })
  }
}
