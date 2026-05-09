import Link           from 'next/link'
import { tursoQuery } from '@/lib/turso'
import { Plus, Pencil, Eye, EyeOff } from 'lucide-react'
import { DeleteBtn }  from './DeleteBtn'

async function getBoxes() {
  try {
    const rows = await tursoQuery('SELECT * FROM Box ORDER BY "order" ASC')
    return rows.map(b => ({
      id:        Number(b.id),
      name:      String(b.name),
      slug:      String(b.slug),
      image:     b.image ? String(b.image) : null,
      skinType:  String(b.skinType),
      skinLabel: String(b.skinLabel ?? ''),
      products:  String(b.products ?? '[]'),
      active:    Number(b.active) === 1,
      order:     Number(b.order ?? 0),
    }))
  } catch { return [] }
}

export default async function AdminBoxsPage() {
  const boxes = await getBoxes()

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">Boxs K-Beauty</h1>
            <p className="text-[#4A4A6A] text-sm">{boxes.length} box{boxes.length > 1 ? 's' : ''} au catalogue</p>
          </div>
          <Link href="/admin/boxs/new"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:-translate-y-0.5"
            style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
            <Plus className="w-4 h-4" /> Nouvelle box
          </Link>
        </div>

        {boxes.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center">
            <p className="text-[#4A4A6A] text-sm mb-4">Aucune box pour l&apos;instant</p>
            <Link href="/admin/boxs/new" className="text-[#E91E8C] text-sm font-semibold hover:underline">
              Créer la première box →
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50">
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Box</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Type de peau</th>
                  <th className="text-left px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Produits</th>
                  <th className="text-center px-5 py-3.5 text-[11px] font-bold uppercase tracking-wider text-[#4A4A6A]">Statut</th>
                  <th className="px-5 py-3.5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {boxes.map(box => {
                  const products = (() => { try { return JSON.parse(box.products) } catch { return [] } })()
                  return (
                    <tr key={box.id} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          {box.image ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={box.image} alt={box.name} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          ) : (
                            <div className="w-10 h-10 rounded-lg bg-[rgba(233,30,140,.08)] flex items-center justify-center flex-shrink-0">
                              <span className="text-[#E91E8C] text-lg">✦</span>
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-[#1A1A2E] text-sm">{box.name}</p>
                            <p className="text-[#4A4A6A]/60 text-xs">{box.slug}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-4">
                        <span className="inline-block bg-[rgba(233,30,140,.08)] text-[#E91E8C] text-xs font-semibold px-2.5 py-1 rounded-lg">
                          {box.skinLabel || box.skinType}
                        </span>
                      </td>
                      <td className="px-5 py-4 text-[#4A4A6A] text-sm">{products.length} produit{products.length > 1 ? 's' : ''}</td>
                      <td className="px-5 py-4 text-center">
                        {box.active
                          ? <span className="inline-flex items-center gap-1 text-green-700 bg-green-50 text-xs font-semibold px-2.5 py-1 rounded-lg"><Eye className="w-3 h-3" /> Visible</span>
                          : <span className="inline-flex items-center gap-1 text-gray-500 bg-gray-100 text-xs font-semibold px-2.5 py-1 rounded-lg"><EyeOff className="w-3 h-3" /> Masquée</span>
                        }
                      </td>
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-2 justify-end">
                          <Link href={`/admin/boxs/${box.id}`}
                            className="p-2 rounded-lg text-[#4A4A6A] hover:text-[#E91E8C] hover:bg-[rgba(233,30,140,.06)] transition-all" title="Modifier">
                            <Pencil className="w-4 h-4" />
                          </Link>
                          <DeleteBtn id={box.id} endpoint="/api/admin/boxes" label={box.name} />
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
