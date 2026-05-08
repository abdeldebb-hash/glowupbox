import { notFound }   from 'next/navigation'
import { prisma }     from '@/lib/db'
import { ArticleForm } from '../ArticleForm'

export default async function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let article = null
  try { article = await prisma.article.findUnique({ where: { id: Number(id) } }) } catch {}
  if (!article) notFound()
  return <ArticleForm article={article} />
}
