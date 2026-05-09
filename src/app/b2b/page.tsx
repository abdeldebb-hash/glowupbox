import type { Metadata } from 'next'
import { tursoQuery }  from '@/lib/turso'
import { B2BClient }   from './B2BClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:       'Cadeaux Entreprise K-Beauty — Offres B2B Glow Up Box Maroc',
  description: 'Coffrets K-Beauty pour cadeaux d\'entreprise au Maroc. Fin d\'année, incentives, team building. Commandes à partir de 5 coffrets. Devis sur WhatsApp.',
  alternates:  { canonical: 'https://www.glowup-box.com/b2b' },
  openGraph: {
    title:       'Cadeaux Entreprise K-Beauty | Glow Up Box B2B',
    description: 'Coffrets K-Beauty personnalisés pour vos collaboratrices. Livraison Maroc.',
    url:         'https://www.glowup-box.com/b2b',
  },
}

export default async function B2BPage() {
  const rows = await tursoQuery('SELECT key, value FROM Option').catch(() => [])
  const opts: Record<string, string> = {}
  rows.forEach(r => { opts[String(r.key)] = String(r.value) })

  return (
    <B2BClient
      title={opts.b2b_title    || undefined}
      subtitle={opts.b2b_subtitle || undefined}
    />
  )
}
