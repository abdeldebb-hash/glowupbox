import { NextResponse } from 'next/server'
import { tursoExec }    from '@/lib/turso'

export async function POST() {
  const migrations = [
    'ALTER TABLE Box ADD COLUMN price INTEGER',
    'ALTER TABLE Box ADD COLUMN oldPrice INTEGER',
    'ALTER TABLE Box ADD COLUMN badgePromo TEXT',
    'ALTER TABLE Box ADD COLUMN showPrice INTEGER DEFAULT 0',
  ]
  const results = []
  for (const sql of migrations) {
    try {
      await tursoExec(sql)
      results.push({ sql, ok: true })
    } catch (e) {
      results.push({ sql, ok: false, note: String(e).includes('duplicate') || String(e).includes('already exists') ? 'already exists' : String(e) })
    }
  }
  return NextResponse.json({ results })
}
