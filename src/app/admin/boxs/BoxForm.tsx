'use client'

import { useState, FormEvent } from 'react'
import { useRouter }           from 'next/navigation'
import { Loader2, ArrowLeft, Save } from 'lucide-react'
import { ImageUpload }  from '../components/ImageUpload'
import { TagsInput }    from '../components/TagsInput'
import type { Box }     from '@prisma/client'

interface Props { box?: Box }

const SKIN_TYPES = [
  { value: 'sensible',  label: 'Peau sensible' },
  { value: 'terne',     label: 'Peau terne' },
  { value: 'grasse',    label: 'Peau grasse / mixte' },
  { value: 'seche',     label: 'Peau sèche' },
  { value: 'mixte',     label: 'Peau mixte' },
  { value: 'anti-age',  label: 'Anti-âge' },
]

export function BoxForm({ box }: Props) {
  const router  = useRouter()
  const isEdit  = !!box

  const [form, setForm] = useState({
    name:        box?.name        ?? '',
    description: box?.description ?? '',
    skinType:    box?.skinType    ?? 'sensible',
    skinLabel:   box?.skinLabel   ?? '',
    tag:         box?.tag         ?? '',
    accroche:    box?.accroche    ?? '',
    image:       box?.image       ?? '',
    active:      box?.active      ?? true,
    order:       box?.order       ?? 0,
    waMessage:   box?.waMessage   ?? '',
    products:    (() => { try { return JSON.parse(box?.products ?? '[]') as string[] } catch { return [] } })(),
  })

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  function set(key: string, value: unknown) {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const url    = isEdit ? `/api/admin/boxes/${box.id}` : '/api/admin/boxes'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(form),
      })
      if (!res.ok) throw new Error((await res.json()).error)
      setSuccess(true)
      setTimeout(() => router.push('/admin/boxs'), 800)
    } catch (e) {
      setError(String(e))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/admin/boxs')}
            className="p-2 rounded-xl border border-gray-200 text-[#4A4A6A] hover:border-[#E91E8C] hover:text-[#E91E8C] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl">
              {isEdit ? `Modifier "${box.name}"` : 'Nouvelle box'}
            </h1>
            <p className="text-[#4A4A6A] text-sm">Les modifications sont visibles immédiatement sur le site</p>
          </div>
        </div>

        {error   && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">✓ Enregistré avec succès !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Infos principales */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Informations principales</h2>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Nom de la box *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="Ex: Douceur Coréenne"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Type de peau *</label>
                <select value={form.skinType} onChange={e => set('skinType', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] transition-all bg-white">
                  {SKIN_TYPES.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Label affiché</label>
                <input value={form.skinLabel} onChange={e => set('skinLabel', e.target.value)}
                  placeholder="Ex: Peau sensible"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Accroche (titre court)</label>
              <input value={form.accroche} onChange={e => set('accroche', e.target.value)}
                placeholder="Ex: Apaiser et réparer sans agresser"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] transition-all" />
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Description *</label>
              <textarea required value={form.description} onChange={e => set('description', e.target.value)}
                rows={3} placeholder="Description complète de la box..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all resize-none" />
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Tag (badges héro)</label>
              <input value={form.tag} onChange={e => set('tag', e.target.value)}
                placeholder="Ex: Peau grasse · Peau mixte · Imperfections"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] transition-all" />
            </div>
          </div>

          {/* Produits inclus */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">Produits inclus</h2>
            <TagsInput value={form.products} onChange={v => set('products', v)}
              label="Produits" placeholder="Ex: Nettoyant centella..." />
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">Image</h2>
            <ImageUpload value={form.image} onChange={v => set('image', v)} label="Photo de la box" />
          </div>

          {/* WhatsApp + Paramètres */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">WhatsApp & Paramètres</h2>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Message WhatsApp pré-rempli</label>
              <input value={form.waMessage} onChange={e => set('waMessage', e.target.value)}
                placeholder="Bonjour, je suis intéressée par la Box..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] transition-all" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Ordre d'affichage</label>
                <input type="number" value={form.order} onChange={e => set('order', e.target.value)}
                  min={0}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-[#1A1A2E] text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
              <div className="flex items-end pb-1">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${form.active ? 'bg-[#E91E8C]' : 'bg-gray-200'}`}
                    onClick={() => set('active', !form.active)}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.active ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-[#1A1A2E] text-sm font-semibold">Box visible sur le site</span>
                </label>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 justify-end pb-8">
            <button type="button" onClick={() => router.push('/admin/boxs')}
              className="px-6 py-3 rounded-xl border border-gray-200 text-[#4A4A6A] text-sm font-semibold hover:border-gray-300 transition-all">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="px-8 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60 transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? 'Enregistrement...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
