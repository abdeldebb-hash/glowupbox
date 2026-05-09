import type { Metadata } from 'next'
import { tursoQuery }    from '@/lib/turso'
import { AProposClient } from './AProposClient'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:       'À Propos — Salma Benali, Fondatrice & Experte K-Beauty Maroc',
  description: 'Découvrez l\'histoire de Glow Up Box : fondée par Salma Benali, experte K-Beauty depuis 2019. 200+ clientes satisfaites, 4.9 étoiles, conseil peau gratuit au Maroc.',
  alternates:  { canonical: 'https://www.glowup-box.com/a-propos' },
  openGraph: {
    title:       'Notre Histoire | Glow Up Box',
    description: 'Glow Up Box, la K-Beauty authentique pour le marché marocain.',
    url:         'https://www.glowup-box.com/a-propos',
  },
}

export default async function AProposPage() {
  const rows = await tursoQuery('SELECT key, value FROM Option').catch(() => [])
  const opts: Record<string, string> = {}
  rows.forEach(r => { opts[String(r.key)] = String(r.value) })

  return (
    <AProposClient
      founder={opts.about_founder || undefined}
      role={opts.about_role       || undefined}
      bio={opts.about_bio         || undefined}
      story={opts.about_story     || undefined}
    />
  )
}
