'use client'

import { useState, FormEvent } from 'react'
import { useRouter }           from 'next/navigation'
import { Loader2, ArrowLeft, Save } from 'lucide-react'
import { ImageUpload }  from '../components/ImageUpload'
import { TagsInput }    from '../components/TagsInput'
import type { Product } from '@prisma/client'

interface Props { product?: Product }

const CATEGORIES = [
  { value: 'soin',      label: 'Soin du visage' },
  { value: 'massage',   label: 'Massage & drainage' },
  { value: 'nettoyage', label: 'Nettoyage' },
  { value: 'routine',   label: 'Accessoires routine' },
]

export function ProductForm({ product }: Props) {
  const router = useRouter()
  const isEdit = !!product

  const [form, setForm] = useState({
    name:        product?.name        ?? '',
    description: product?.description ?? '',
    tagline:     product?.tagline     ?? '',
    category:    product?.category    ?? 'soin',
    catLabel:    product?.catLabel    ?? '',
    price:       product?.price       ?? '',
    oldPrice:    product?.oldPrice    ?? '',
    stock:       product?.stock       ?? 0,
    stockStatus: product?.stockStatus ?? 'ok',
    image:       product?.image       ?? '',
    badge:       product?.badge       ?? '',
    featured:    product?.featured    ?? false,
    active:      product?.active      ?? true,
    order:       product?.order       ?? 0,
    benefits:    (() => { try { return JSON.parse(product?.benefits ?? '[]') as string[] } catch { return [] } })(),
  })

  const [loading, setLoading] = useState(false)
  const [error,   setError]   = useState('')
  const [success, setSuccess] = useState(false)

  function set(key: string, value: unknown) { setForm(prev => ({ ...prev, [key]: value })) }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setLoading(true); setError('')
    try {
      const url    = isEdit ? `/api/admin/products/${product.id}` : '/api/admin/products'
      const method = isEdit ? 'PUT' : 'POST'
      const res    = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      if (!res.ok) throw new Error((await res.json()).error)
      setSuccess(true)
      setTimeout(() => router.push('/admin/boutique'), 800)
    } catch (e) { setError(String(e)) } finally { setLoading(false) }
  }

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-3xl mx-auto">

        <div className="flex items-center gap-3 mb-8">
          <button onClick={() => router.push('/admin/boutique')}
            className="p-2 rounded-xl border border-gray-200 text-[#4A4A6A] hover:border-[#E91E8C] hover:text-[#E91E8C] transition-all">
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl">
              {isEdit ? `Modifier "${product.name}"` : 'Nouvel accessoire'}
            </h1>
          </div>
        </div>

        {error   && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">✓ Enregistré !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Informations</h2>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Nom du produit *</label>
              <input required value={form.name} onChange={e => set('name', e.target.value)}
                placeholder="Ex: Ice Roller Visage"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all" />
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Tagline</label>
              <input value={form.tagline} onChange={e => set('tagline', e.target.value)}
                placeholder="Ex: Le secret des coréennes pour un teint parfait"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
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
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Label catégorie</label>
                <input value={form.catLabel} onChange={e => set('catLabel', e.target.value)}
                  placeholder="Ex: Massage & drainage"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Description *</label>
              <textarea required value={form.description} onChange={e => set('description', e.target.value)}
                rows={3} placeholder="Description courte du produit..."
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all resize-none" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Prix & Stock</h2>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Prix (DH) *</label>
                <input required type="number" min="0" step="0.01" value={form.price} onChange={e => set('price', e.target.value)}
                  placeholder="89"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Ancien prix (DH)</label>
                <input type="number" min="0" step="0.01" value={form.oldPrice as string} onChange={e => set('oldPrice', e.target.value)}
                  placeholder="120 (barré)"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Stock</label>
                <input type="number" min="0" value={form.stock} onChange={e => set('stock', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
              </div>
              <div>
                <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Statut stock</label>
                <select value={form.stockStatus} onChange={e => set('stockStatus', e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all bg-white">
                  <option value="ok">En stock</option>
                  <option value="low">Stock limité</option>
                  <option value="out">Épuisé</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">Badge</label>
              <input value={form.badge as string} onChange={e => set('badge', e.target.value)}
                placeholder="Ex: Populaire, Nouveau, -17%"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] transition-all" />
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">Bénéfices</h2>
            <TagsInput value={form.benefits} onChange={v => set('benefits', v)} label="Points forts" placeholder="Ex: Réduit les rougeurs..." />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">Image</h2>
            <ImageUpload value={form.image} onChange={v => set('image', v)} label="Photo du produit" />
          </div>

          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3 mb-5">Paramètres</h2>
            <div className="flex flex-wrap gap-6">
              {[
                { key: 'active',   label: 'Visible sur le site' },
                { key: 'featured', label: 'Produit vedette (première position)' },
              ].map(({ key, label }) => (
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <div className={`relative w-12 h-6 rounded-full transition-colors ${form[key as keyof typeof form] ? 'bg-[#E91E8C]' : 'bg-gray-200'}`}
                    onClick={() => set(key, !form[key as keyof typeof form])}>
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form[key as keyof typeof form] ? 'translate-x-6' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="text-[#1A1A2E] text-sm font-medium">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex gap-3 justify-end pb-8">
            <button type="button" onClick={() => router.push('/admin/boutique')}
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
