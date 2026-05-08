'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Loader2, Save, Phone, Instagram, Globe, Mail } from 'lucide-react'

const OPTS = [
  { key: 'wa_number',     label: 'Numéro WhatsApp',    icon: Phone,      placeholder: '212600000000', hint: 'Format international sans + ni espace' },
  { key: 'instagram_url', label: 'Lien Instagram',     icon: Instagram,  placeholder: 'https://instagram.com/glowupbox.ma' },
  { key: 'instagram_handle', label: 'Handle Instagram', icon: Instagram, placeholder: '@glowupbox.ma' },
  { key: 'site_url',      label: 'URL du site',        icon: Globe,      placeholder: 'https://glowupbox.ma' },
  { key: 'email',         label: 'Email de contact',   icon: Mail,       placeholder: 'contact@glowupbox.ma' },
  { key: 'city',          label: 'Ville',              icon: Globe,      placeholder: 'Rabat, Maroc' },
]

type FormData = Record<string, string>

export default function OptionsPage() {
  const [data,    setData]    = useState<FormData>({})
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetch('/api/admin/options')
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true); setSuccess(false)
    try {
      await fetch('/api/admin/options', {
        method:  'PUT',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify(data),
      })
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } finally { setSaving(false) }
  }

  if (loading) return (
    <div className="ml-64 flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-[#E91E8C]" />
    </div>
  )

  return (
    <div className="ml-64 p-8 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">Options & Paramètres</h1>
          <p className="text-[#4A4A6A] text-sm">Coordonnées et informations de contact affichées sur le site</p>
        </div>

        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">✓ Paramètres mis à jour !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
            <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider border-b border-gray-100 pb-3">Coordonnées</h2>
            {OPTS.map(opt => {
              const Icon = opt.icon
              return (
                <div key={opt.key}>
                  <label className="flex items-center gap-2 text-[#1A1A2E] text-sm font-semibold mb-1.5">
                    <Icon className="w-3.5 h-3.5 text-[#E91E8C]" /> {opt.label}
                  </label>
                  <input
                    value={data[opt.key] ?? ''} onChange={e => setData(d => ({ ...d, [opt.key]: e.target.value }))}
                    placeholder={opt.placeholder}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all" />
                  {opt.hint && <p className="text-[#4A4A6A]/50 text-xs mt-1">{opt.hint}</p>}
                </div>
              )
            })}
          </div>

          {/* Info admin */}
          <div className="bg-[rgba(233,30,140,.04)] rounded-2xl border border-[rgba(233,30,140,.1)] p-5">
            <p className="text-[#1A1A2E] text-sm font-semibold mb-1">Compte administrateur</p>
            <p className="text-[#4A4A6A] text-sm">Email : <strong>{process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'admin@glowupbox.ma'}</strong></p>
            <p className="text-[#4A4A6A]/60 text-xs mt-1">Pour changer le mot de passe, modifiez ADMIN_PASSWORD dans le fichier .env.local</p>
          </div>

          <div className="flex justify-end pb-8">
            <button type="submit" disabled={saving}
              className="px-8 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60 transition-all hover:-translate-y-0.5"
              style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow:'0 4px 16px rgba(233,30,140,.3)' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Sauvegarde...' : 'Enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
