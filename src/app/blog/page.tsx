import { tursoQuery }       from '@/lib/turso'
import { BlogClient }       from './BlogClient'
import type { ArticleData } from './BlogClient'
import type { Metadata }    from 'next'

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title:       'Blog K-Beauty — Conseils Routines & Ingrédients Coréens',
  description: 'Conseils beauté K-Beauty en français : routines coréennes, ingrédients actifs, types de peau, avant/après. Par l\'équipe Glow Up Box Maroc.',
  alternates:  { canonical: 'https://www.glowup-box.com/blog' },
  openGraph: {
    title:       'Blog K-Beauty | Glow Up Box',
    description: 'Routines, ingrédients et conseils K-Beauty pour le marché marocain.',
    url:         'https://www.glowup-box.com/blog',
  },
}

function formatDate(d: string): string {
  return new Date(d).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function getArticles(): Promise<ArticleData[]> {
  try {
    const rows = await tursoQuery('SELECT * FROM Article WHERE published=1 ORDER BY publishedAt DESC')
    return rows.map((a, i) => ({
      id:       Number(a.id),
      slug:     String(a.slug),
      cat:      String(a.category),
      catLabel: String(a.catLabel || a.category),
      title:    String(a.title),
      excerpt:  String(a.excerpt),
      date:     a.publishedAt ? formatDate(String(a.publishedAt)) : formatDate(String(a.createdAt)),
      readTime: String(a.readTime),
      img:      a.image ? String(a.image) : '/images/peau-sensible.jpg',
      featured: i === 0,
    }))
  } catch {
    return []
  }
}

export default async function BlogPage() {
  const articles = await getArticles()
  return <BlogClient articles={articles} />
}
