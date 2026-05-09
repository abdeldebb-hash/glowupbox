import { notFound }         from 'next/navigation'
import { tursoQuery }        from '@/lib/turso'
import { BoxDetailClient }   from '../BoxDetailClient'
import type { BoxDetail }    from '../BoxDetailClient'

export const dynamic = 'force-dynamic'

function mapBox(b: Record<string, unknown>): BoxDetail {
  return {
    id:          Number(b.id),
    name:        String(b.name),
    slug:        String(b.slug),
    description: String(b.description),
    skinType:    String(b.skinType),
    skinLabel:   String(b.skinLabel),
    tag:         String(b.tag ?? ''),
    accroche:    String(b.accroche ?? ''),
    products:    (() => { try { return JSON.parse(String(b.products)) as string[] } catch { return [] } })(),
    image:       b.image ? String(b.image) : null,
    waMessage:   String(b.waMessage ?? ''),
  }
}

export default async function BoxDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const rows    = await tursoQuery('SELECT * FROM Box WHERE slug=? LIMIT 1', [slug])
  if (!rows.length) notFound()

  const related = await tursoQuery(
    'SELECT * FROM Box WHERE active=1 AND slug!=? ORDER BY "order" ASC LIMIT 3',
    [slug]
  )

  return (
    <BoxDetailClient
      box={mapBox(rows[0] as Record<string, unknown>)}
      related={related.map(r => mapBox(r as Record<string, unknown>))}
    />
  )
}
