import { prisma }      from '@/lib/db'
import { BlogClient } from './BlogClient'
import type { ArticleData } from './BlogClient'

export const dynamic = 'force-dynamic'

function formatDate(date: Date): string {
  return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
}

async function getArticles(): Promise<ArticleData[]> {
  try {
    const rows = await prisma.article.findMany({
      where:   { published: true },
      orderBy: { publishedAt: 'desc' },
    })
    return rows.map((a, i) => ({
      id:       a.id,
      slug:     a.slug,
      cat:      a.category,
      catLabel: a.catLabel || a.category,
      title:    a.title,
      excerpt:  a.excerpt,
      date:     a.publishedAt ? formatDate(a.publishedAt) : formatDate(a.createdAt),
      readTime: a.readTime,
      img:      a.image ?? '/images/peau-sensible.jpg',
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
