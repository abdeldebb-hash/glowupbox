import { notFound }    from 'next/navigation'
import { tursoQuery }  from '@/lib/turso'
import { ArticleForm } from '../ArticleForm'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const rows = await tursoQuery('SELECT * FROM Article WHERE id=? LIMIT 1', [Number(id)]).catch(() => [])
  if (!rows.length) notFound()
  const a = rows[0]

  const article = {
    id:          Number(a.id),
    title:       String(a.title),
    slug:        String(a.slug),
    excerpt:     String(a.excerpt),
    content:     String(a.content),
    category:    String(a.category),
    catLabel:    String(a.catLabel ?? ''),
    image:       a.image ? String(a.image) : null,
    published:   Number(a.published) === 1,
    publishedAt: a.publishedAt ? new Date(String(a.publishedAt)) : null,
    readTime:    String(a.readTime ?? '5 min'),
    createdAt:   new Date(String(a.createdAt)),
    updatedAt:   new Date(String(a.updatedAt)),
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return <ArticleForm article={article as any} />
}
