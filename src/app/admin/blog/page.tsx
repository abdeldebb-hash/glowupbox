import Link           from 'next/link'
import { tursoQuery } from '@/lib/turso'
import { Plus, Pencil, Globe, EyeOff, Clock } from 'lucide-react'
import { DeleteBtn }  from '../boxs/DeleteBtn'

async function getArticles() {
  try {
    const rows = await tursoQuery('SELECT * FROM Article ORDER BY createdAt DESC')
    return rows.map(a => ({
      id:        Number(a.id),
      title:     String(a.title),
      excerpt:   String(a.excerpt),
      image:     a.image ? String(a.image) : null,
      category:  String(a.category),
      catLabel:  String(a.catLabel ?? ''),
      readTime:  String(a.readTime ?? '5 min'),
      published: Number(a.published) === 1,
    }))
  } catch { return [] }
}

export default async function AdminBlogPage() {
  const articles = await getArticles()

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">Blog</h1>
            <p className="text-[#4A4A6A] text-sm">{articles.length} article{articles.length > 1 ? 's' : ''}</p>
          </div>
          <Link href="/admin/blog/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
            <Plus className="w-4 h-4" /> Nouvel article
          </Link>
        </div>

        {articles.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-[#4A4A6A] text-sm mb-4">Aucun article pour l&apos;instant</p>
            <Link href="/admin/blog/new" className="text-[#E91E8C] text-sm font-semibold hover:underline">
              Rédiger le premier article →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Article</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Catégorie</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Lecture</th>
                  <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Statut</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {articles.map(a => (
                  <tr key={a.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {a.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={a.image} alt={a.title} className="w-12 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-12 h-10 rounded-lg bg-[rgba(233,30,140,.06)] flex-shrink-0" />
                        )}
                        <div>
                          <p className="font-semibold text-[#1A1A2E] text-sm line-clamp-1">{a.title}</p>
                          <p className="text-[#4A4A6A]/60 text-xs line-clamp-1">{a.excerpt}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <span className="bg-[rgba(233,30,140,.08)] text-[#E91E8C] text-xs font-semibold px-2.5 py-1 rounded-lg">
                        {a.catLabel || a.category}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-1 text-[#4A4A6A] text-sm">
                        <Clock className="w-3 h-3" /> {a.readTime}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {a.published
                        ? <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 text-xs font-semibold px-2.5 py-1 rounded-lg"><Globe className="w-3 h-3" /> Publié</span>
                        : <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 text-xs font-semibold px-2.5 py-1 rounded-lg"><EyeOff className="w-3 h-3" /> Brouillon</span>
                      }
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/blog/${a.id}`}
                          className="p-2 rounded-lg text-[#4A4A6A] hover:text-[#E91E8C] hover:bg-[rgba(233,30,140,.06)] transition-all">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteBtn id={a.id} endpoint="/api/admin/articles" label={a.title} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
