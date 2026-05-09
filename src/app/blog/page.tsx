import { tursoQuery }      from '@/lib/turso'
import { BlogClient }      from './BlogClient'
import type { ArticleData } from './BlogClient'

export const dynamic = 'force-dynamic'

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
