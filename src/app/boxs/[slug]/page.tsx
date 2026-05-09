import { notFound }         from 'next/navigation'
import { tursoQuery }        from '@/lib/turso'
import { BoxDetailClient }   from '../BoxDetailClient'
import type { BoxDetail }    from '../BoxDetailClient'
import type { Metadata }     from 'next'

export const dynamic = 'force-dynamic'

const BASE = 'https://www.glowup-box.com'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const rows = await tursoQuery('SELECT * FROM Box WHERE slug=? LIMIT 1', [slug])
  if (!rows.length) return {}
  const b = rows[0]
  const title       = `Box ${String(b.name)} — ${String(b.skinLabel)}`
  const description = `${String(b.description).slice(0, 140)} — Coffret K-Beauty personnalisé, bilan peau gratuit.`
  const image       = b.image ? String(b.image) : `${BASE}/images/hero-bg.jpg`
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/boxs/${slug}` },
    openGraph:  { title, description, url: `${BASE}/boxs/${slug}`, images: [{ url: image, alt: title }] },
  }
}

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

  const box = mapBox(rows[0] as Record<string, unknown>)

  const productSchema = {
    '@context':   'https://schema.org',
    '@type':      'Product',
    name:         box.name,
    description:  box.description,
    image:        box.image ?? `${BASE}/images/hero-bg.jpg`,
    brand:        { '@type': 'Brand', name: 'Glow Up Box' },
    offers: {
      '@type':       'Offer',
      availability:  'https://schema.org/InStock',
      priceCurrency: 'MAD',
      seller:        { '@type': 'Organization', name: 'Glow Up Box' },
    },
    audience: { '@type': 'PeopleAudience', audienceType: box.skinLabel },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }} />
      <BoxDetailClient
        box={box}
        related={related.map(r => mapBox(r as Record<string, unknown>))}
      />
    </>
  )
}
