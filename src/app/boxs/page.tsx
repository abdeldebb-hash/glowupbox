import { tursoQuery }   from '@/lib/turso'
import { BoxesClient }  from './BoxesClient'
import type { BoxData } from './BoxesClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:       'Nos Coffrets K-Beauty — Boxs Personnalisées par Type de Peau',
  description: 'Découvrez nos coffrets K-Beauty personnalisés : peau sensible, grasse, mixte, sèche, terne ou anti-âge. Bilan peau gratuit avant chaque commande. Livraison Maroc.',
  alternates:  { canonical: 'https://www.glowup-box.com/boxs' },
  openGraph: {
    title:       'Nos Coffrets K-Beauty | Glow Up Box',
    description: 'Boxs K-Beauty personnalisées selon votre type de peau. Bilan gratuit inclus.',
    url:         'https://www.glowup-box.com/boxs',
  },
}

async function getBoxes(): Promise<BoxData[]> {
  try {
    const rows = await tursoQuery('SELECT * FROM Box WHERE active=1 ORDER BY "order" ASC')
    return rows.map(b => ({
      id:          Number(b.id),
      name:        String(b.name),
      slug:        String(b.slug),
      skinType:    String(b.skinType),
      skinLabel:   String(b.skinLabel),
      description: String(b.description),
      products:    (() => { try { return JSON.parse(String(b.products)) as string[] } catch { return [] } })(),
      img:         b.image ? String(b.image) : '/images/peau-sensible.jpg',
      waMessage:   String(b.waMessage),
    }))
  } catch {
    return []
  }
}

export default async function BoxsPage() {
  const boxes = await getBoxes()
  return <BoxesClient boxes={boxes} />
}
