'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Loader2, Save } from 'lucide-react'

const FIELDS = [
  { key: 'hero_title',    label: 'Hero — Titre principal',      type: 'text',     placeholder: 'Votre peau mérite le meilleur...' },
  { key: 'hero_subtitle', label: 'Hero — Sous-titre',           type: 'textarea', placeholder: 'Bilan peau gratuit, Box personnalisée...' },
  { key: 'hero_cta1',     label: 'Hero — Bouton principal',     type: 'text',     placeholder: 'Bilan gratuit' },
  { key: 'hero_cta2',     label: 'Hero — Bouton secondaire',    type: 'text',     placeholder: 'Voir les Boxs' },
  { key: 'about_tagline', label: 'À Propos — Accroche',         type: 'text',     placeholder: 'Notre histoire, votre beauté' },
  { key: 'about_story',   label: 'À Propos — Histoire',         type: 'textarea', placeholder: 'En 2022...' },
  { key: 'about_founder', label: 'Nom de la fondatrice',        type: 'text',     placeholder: 'Salma Benali' },
  { key: 'about_role',    label: 'Rôle de la fondatrice',       type: 'text',     placeholder: 'Fondatrice & Experte K-Beauty' },
  { key: 'about_bio',     label: 'Bio fondatrice',              type: 'textarea', placeholder: 'Passionnée de cosmétologie coréenne...' },
  { key: 'b2b_title',     label: 'B2B — Titre hero',            type: 'text',     placeholder: 'Fini les cadeaux génériques' },
  { key: 'b2b_subtitle',  label: 'B2B — Sous-titre',            type: 'textarea', placeholder: 'Offrez à vos collaboratrices...' },
  { key: 'meta_desc',     label: 'Meta description (SEO)',      type: 'textarea', placeholder: 'Glow Up Box — K-Beauty Maroc...' },
]

type FormData = Record<string, string>

export default function ContenuPage() {
  const [data,    setData]    = useState<FormData>({})
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  useEffect(() => {
    fetch('/api/admin/options')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true); setError(''); setSuccess(false)
    try {
      const res = await fetch('/api/admin/options', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      if (!res.ok) throw new Error('Erreur')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) { setError(String(e)) } finally { setSaving(false) }
  }

  if (loading) return (
    <div className="ml-64 flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-[#E91E8C]" />
    </div>
  )

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">Contenu des pages</h1>
          <p className="text-[#4A4A6A] text-sm">Modifiez les textes qui s'affichent sur votre site</p>
        </div>

        {error   && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">✓ Contenu mis à jour !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {[
            { section: 'Page d\'accueil', fields: FIELDS.slice(0, 4) },
            { section: 'À Propos',        fields: FIELDS.slice(4, 9) },
            { section: 'B2B',             fields: FIELDS.slice(9, 11) },
            { section: 'SEO',             fields: FIELDS.slice(11) },
          ].map(group => (
            <div key={group.section} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">{group.section}</h2>
              {group.fields.map(f => (
                <div key={f.key}>
                  <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">{f.label}</label>
                  {f.type === 'textarea' ? (
                    <textarea
                      value={data[f.key] ?? ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                      rows={3} placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all resize-none" />
                  ) : (
                    <input
                      value={data[f.key] ?? ''} onChange={e => setData(d => ({ ...d, [f.key]: e.target.value }))}
                      placeholder={f.placeholder}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all" />
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="flex justify-end pb-8">
            <button type="submit" disabled={saving}
              className="px-8 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60 transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Sauvegarde...' : 'Enregistrer les textes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
