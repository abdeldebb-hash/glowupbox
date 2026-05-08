'use client'

import { useState, FormEvent } from 'react'
import { useRouter }           from 'next/navigation'
import { Loader2, ArrowLeft, Save, Eye } from 'lucide-react'
import { ImageUpload }   from '../components/ImageUpload'
import type { Article }  from '@prisma/client'

interface Props { article?: Article }

const CATEGORIES = [
  { value: 'routine',         label: 'Routine skincare' },
  { value: 'types-peau',      label: 'Types de peau' },
  { value: 'ingredients',     label: 'Ingrédients' },
  { value: 'conseils-beaute', label: 'Conseils beauté' },
  { value: 'avant-apres',     label: 'Avant / Après' },
  { value: 'kbeauty',         label: 'K-Beauty' },
]

export function ArticleForm({ article }: Props) {
  const router = useRouter()
  const isEdit = !!article

  const [form, setForm] = useState({
    title:     article?.title     ?? '',
    excerpt:   article?.excerpt   ?? '',
    content:   article?.content   ?? '',
    category:  article?.category  ?? 'routine',
    catLabel:  article?.catLabel  ?? '',
    readTime:  article?.readTime  ?? '5 min',
    image:     article?.image     ?? '',
    published: article?.published ?? false,
  })

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  function set(key: string, value: unknown) { setForm(prev => ({ ...prev, [key]: value })) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const url    = isEdit ? `/api/admin/articles/${article.id}` : '/api/admin/articles'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error((await res.json()).error)
      setSuccess(true)
      setTimeout(() => router.push('/admin/blog'), 800)
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/admin/blog')}
            className="p-2 rounded-xl border border-gray-200 text-[#4A4A6A] hover:border-[#E91E8C] hover:text-[#E91E8C] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl">
            {isEdit ? 'Modifier l\'article' : 'Nouvel article'}
          </h1>
        </div>

        {error   && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">✓ Enregistré !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Informations</h2>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Titre *</label>
              <input required value={form.title} onChange={e => set('title', e.target.value)}
                placeholder="Ex: Comment construire une routine en 3 étapes"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Catégorie</label>
                <select value={form.category} onChange={e => set('category', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all bg-white">
                  {CATEGORIES.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Temps de lecture</label>
                <input value={form.readTime} onChange={e => set('readTime', e.target.value)}
                  placeholder="Ex: 5 min"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Extrait (résumé) *</label>
              <textarea required value={form.excerpt} onChange={e => set('excerpt', e.target.value)}
                rows={2} placeholder="Résumé court affiché dans la grille blog..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all resize-none" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-3">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Contenu de l'article</h2>
            <p className="text-[#4A4A6A]/60 text-xs">Chaque ligne = un paragraphe. Utilisez des titres avec ## pour les sections.</p>
            <textarea required value={form.content} onChange={e => set('content', e.target.value)}
              rows={14} placeholder="## Introduction&#10;&#10;Votre contenu ici...&#10;&#10;## Section 1&#10;&#10;..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all resize-y font-mono leading-relaxed" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">Image de couverture</h2>
            <ImageUpload value={form.image} onChange={v => set('image', v)} label="Photo de l'article" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <label className="flex items-center gap-3 cursor-pointer">
              <div className={`relative w-12 h-6 rounded-full transition-colors ${form.published ? 'bg-[#E91E8C]' : 'bg-gray-200'}`}
                onClick={() => set('published', !form.published)}>
                <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.published ? 'translate-x-6' : 'translate-x-0.5'}`} />
              </div>
              <div>
                <p className="text-[#1A1A2E] text-sm font-semibold flex items-center gap-1.5">
                  <Eye className="w-4 h-4 text-[#E91E8C]" /> Publier l'article
                </p>
                <p className="text-[#4A4A6A]/60 text-xs">Visible sur le blog si activé</p>
              </div>
            </label>
          </div>

          <div className="flex gap-3 justify-end pb-8">
            <button type="button" onClick={() => router.push('/admin/blog')}
              className="px-6 py-3 rounded-xl border border-gray-200 text-[#4A4A6A] text-sm font-semibold hover:border-gray-300 transition-all">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60 transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? 'Enregistrement...' : form.published ? 'Publier' : 'Enregistrer brouillon'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
