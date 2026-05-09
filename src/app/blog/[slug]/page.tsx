import { notFound }      from 'next/navigation'
import { tursoQuery }    from '@/lib/turso'
import ArticleClient    from './ArticleClient'
import type { Article } from './ArticleClient'
import type { Metadata } from 'next'

export const dynamic = 'force-dynamic'

const BASE = 'https://www.glowup-box.com'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const rows = await tursoQuery('SELECT * FROM Article WHERE slug=? AND published=1 LIMIT 1', [slug])
  if (!rows.length) return {}
  const a           = rows[0]
  const title       = String(a.title)
  const description = String(a.excerpt).slice(0, 155)
  const image       = a.image ? String(a.image) : `${BASE}/images/hero-bg.jpg`
  return {
    title,
    description,
    alternates: { canonical: `${BASE}/blog/${slug}` },
    openGraph: {
      title,
      description,
      type:          'article',
      url:           `${BASE}/blog/${slug}`,
      images:        [{ url: image, alt: title }],
      publishedTime: a.publishedAt ? String(a.publishedAt) : undefined,
    },
  }
}

function mapArticle(a: Record<string, unknown>): Article {
  return {
    id:          Number(a.id),
    title:       String(a.title),
    slug:        String(a.slug),
    excerpt:     String(a.excerpt),
    content:     String(a.content),
    category:    String(a.category),
    catLabel:    String(a.catLabel ?? a.category),
    image:       a.image ? String(a.image) : null,
    readTime:    String(a.readTime ?? '5 min'),
    publishedAt: a.publishedAt ? String(a.publishedAt) : null,
    createdAt:   String(a.createdAt),
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const rows = await tursoQuery('SELECT * FROM Article WHERE slug=? AND published=1 LIMIT 1', [slug])
  if (!rows.length) notFound()

  const article = mapArticle(rows[0] as Record<string, unknown>)

  const relatedRows = await tursoQuery(
    'SELECT * FROM Article WHERE published=1 AND category=? AND slug!=? ORDER BY publishedAt DESC LIMIT 3',
    [article.category, slug]
  )
  const related = relatedRows.map(r => mapArticle(r as Record<string, unknown>))

  const articleSchema = {
    '@context':       'https://schema.org',
    '@type':          'Article',
    headline:         article.title,
    description:      article.excerpt,
    image:            article.image ?? `${BASE}/images/hero-bg.jpg`,
    datePublished:    article.publishedAt ?? article.createdAt,
    author:           { '@type': 'Organization', name: 'Glow Up Box' },
    publisher:        { '@type': 'Organization', name: 'Glow Up Box', logo: { '@type': 'ImageObject', url: `${BASE}/images/hero-bg.jpg` } },
    mainEntityOfPage: { '@type': 'WebPage', '@id': `${BASE}/blog/${slug}` },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <ArticleClient article={article} related={related} />
    </>
  )
}
