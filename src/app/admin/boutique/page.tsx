import Link           from 'next/link'
import { tursoQuery } from '@/lib/turso'
import { Plus, Pencil, Eye, EyeOff, Star } from 'lucide-react'
import { DeleteBtn }  from '../boxs/DeleteBtn'

async function getProducts() {
  try {
    const rows = await tursoQuery('SELECT * FROM Product ORDER BY "order" ASC')
    return rows.map(p => ({
      id:          Number(p.id),
      name:        String(p.name),
      slug:        String(p.slug),
      image:       p.image ? String(p.image) : null,
      category:    String(p.category),
      catLabel:    String(p.catLabel ?? ''),
      price:       Number(p.price),
      oldPrice:    p.oldPrice ? Number(p.oldPrice) : null,
      stockStatus: String(p.stockStatus ?? 'ok'),
      featured:    Number(p.featured) === 1,
      active:      Number(p.active) === 1,
    }))
  } catch { return [] }
}

export default async function AdminBoutiquePage() {
  const products = await getProducts()

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">Boutique</h1>
            <p className="text-[#4A4A6A] text-sm">{products.length} accessoire{products.length > 1 ? 's' : ''} au catalogue</p>
          </div>
          <Link href="/admin/boutique/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
            <Plus className="w-4 h-4" /> Nouvel accessoire
          </Link>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-[#4A4A6A] text-sm mb-4">Aucun accessoire pour l&apos;instant</p>
            <Link href="/admin/boutique/new" className="text-[#E91E8C] text-sm font-semibold hover:underline">
              Ajouter le premier accessoire →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Produit</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Catégorie</th>
                  <th className="text-right px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Prix</th>
                  <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Stock</th>
                  <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Statut</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {products.map(p => (
                  <tr key={p.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {p.image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                        ) : (
                          <div className="w-10 h-10 rounded-lg bg-[rgba(233,30,140,.08)] flex-shrink-0" />
                        )}
                        <div>
                          <div className="flex items-center gap-1.5">
                            <p className="font-semibold text-[#1A1A2E] text-sm">{p.name}</p>
                            {p.featured && <Star className="w-3 h-3 text-[#FFB347] fill-[#FFB347]" />}
                          </div>
                          <p className="text-[#4A4A6A]/60 text-xs">{p.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-[#4A4A6A] text-sm">{p.catLabel || p.category}</td>
                    <td className="px-5 py-4 text-right">
                      <span className="font-playfair font-bold text-[#E91E8C] text-base">{p.price} DH</span>
                      {p.oldPrice && <span className="text-[#4A4A6A]/40 text-xs line-through ml-1">{p.oldPrice} DH</span>}
                    </td>
                    <td className="px-5 py-4 text-center">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
                        p.stockStatus === 'ok' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-600'
                      }`}>
                        {p.stockStatus === 'ok' ? 'En stock' : 'Stock limité'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-center">
                      {p.active
                        ? <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 text-xs font-semibold px-2.5 py-1 rounded-lg"><Eye className="w-3 h-3" /> Visible</span>
                        : <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 text-xs font-semibold px-2.5 py-1 rounded-lg"><EyeOff className="w-3 h-3" /> Masqué</span>
                      }
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2 justify-end">
                        <Link href={`/admin/boutique/${p.id}`}
                          className="p-2 rounded-lg text-[#4A4A6A] hover:text-[#E91E8C] hover:bg-[rgba(233,30,140,.06)] transition-all">
                          <Pencil className="w-4 h-4" />
                        </Link>
                        <DeleteBtn id={p.id} endpoint="/api/admin/products" label={p.name} />
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
