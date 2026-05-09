'use client'

import { useState, useEffect, FormEvent } from 'react'
import { Loader2, Save, Plus, Trash2 } from 'lucide-react'

/* ─── Types repeaters ─── */
type Testimonial  = { quote: string; name: string; meta: string; initial: string }
type B2BTestimonial = { text: string; name: string; role: string; company: string }

/* ─── Champs simples ─── */
const SECTIONS = [
  {
    title: 'Page d\'accueil — Hero',
    hint:  'Titre et boutons en haut de la homepage',
    fields: [
      { key: 'hero_title',    label: 'Titre H1',           type: 'textarea', placeholder: 'Votre peau mérite le meilleur de la Corée' },
      { key: 'hero_subtitle', label: 'Sous-titre',         type: 'textarea', placeholder: 'Bilan peau gratuit, Box personnalisée...' },
      { key: 'hero_cta1',     label: 'Bouton principal',   type: 'text',     placeholder: 'Bilan gratuit' },
      { key: 'hero_cta2',     label: 'Bouton secondaire',  type: 'text',     placeholder: 'Voir les Boxs' },
    ],
  },
  {
    title: 'Page d\'accueil — Stats',
    hint:  'Chiffres affichés sous les boutons hero',
    fields: [
      { key: 'stat_clients', label: 'Nombre de clientes (chiffre seul)', type: 'text', placeholder: '200' },
      { key: 'stat_rating',  label: 'Note moyenne',                      type: 'text', placeholder: '4.9 ★' },
    ],
  },
  {
    title: 'Page d\'accueil — CTA Final',
    hint:  'Bloc en bas de la homepage',
    fields: [
      { key: 'cta_title',    label: 'Titre',      type: 'text',     placeholder: 'Prête pour votre transformation ?' },
      { key: 'cta_subtitle', label: 'Sous-titre', type: 'textarea', placeholder: 'Votre bilan peau personnalisé est gratuit...' },
    ],
  },
  {
    title: 'Page d\'accueil — Comment ça marche',
    hint:  '4 étapes du processus',
    fields: [
      { key: 'process_step1_title', label: 'Étape 1 — Titre', type: 'text',     placeholder: 'Faites votre bilan peau' },
      { key: 'process_step1_desc',  label: 'Étape 1 — Texte', type: 'textarea', placeholder: '6 questions simples pour cerner votre type de peau...' },
      { key: 'process_step2_title', label: 'Étape 2 — Titre', type: 'text',     placeholder: 'On analyse votre profil' },
      { key: 'process_step2_desc',  label: 'Étape 2 — Texte', type: 'textarea', placeholder: 'Votre bilan nous parvient via WhatsApp...' },
      { key: 'process_step3_title', label: 'Étape 3 — Titre', type: 'text',     placeholder: 'Recommandation personnalisée' },
      { key: 'process_step3_desc',  label: 'Étape 3 — Texte', type: 'textarea', placeholder: 'Vous recevez notre sélection K-Beauty...' },
      { key: 'process_step4_title', label: 'Étape 4 — Titre', type: 'text',     placeholder: 'Livraison partout au Maroc' },
      { key: 'process_step4_desc',  label: 'Étape 4 — Texte', type: 'textarea', placeholder: 'Commandez directement sur WhatsApp...' },
    ],
  },
  {
    title: 'Page d\'accueil — Profils peau',
    hint:  '4 cartes de types de peau',
    fields: [
      { key: 'profile1_name', label: 'Profil 1 — Nom',         type: 'text',     placeholder: 'Peau Sensible' },
      { key: 'profile1_desc', label: 'Profil 1 — Description', type: 'textarea', placeholder: 'Rougeurs, tiraillements, réactivité...' },
      { key: 'profile2_name', label: 'Profil 2 — Nom',         type: 'text',     placeholder: 'Peau Grasse' },
      { key: 'profile2_desc', label: 'Profil 2 — Description', type: 'textarea', placeholder: 'Brillances, pores dilatés...' },
      { key: 'profile3_name', label: 'Profil 3 — Nom',         type: 'text',     placeholder: 'Peau Terne' },
      { key: 'profile3_desc', label: 'Profil 3 — Description', type: 'textarea', placeholder: "Manque d'éclat, teint gris..." },
      { key: 'profile4_name', label: 'Profil 4 — Nom',         type: 'text',     placeholder: 'Peau Mixte' },
      { key: 'profile4_desc', label: 'Profil 4 — Description', type: 'textarea', placeholder: 'Zone T brillante, joues sèches...' },
    ],
  },
  {
    title: 'À Propos',
    hint:  'Page /a-propos',
    fields: [
      { key: 'about_story',   label: 'Histoire de la marque', type: 'textarea', placeholder: 'En 2022, notre fondatrice...' },
      { key: 'about_founder', label: 'Nom de la fondatrice',  type: 'text',     placeholder: 'Salma Benali' },
      { key: 'about_role',    label: 'Rôle',                  type: 'text',     placeholder: 'Fondatrice & Experte K-Beauty' },
      { key: 'about_bio',     label: 'Bio',                   type: 'textarea', placeholder: 'Passionnée de cosmétologie coréenne depuis 2019...' },
    ],
  },
  {
    title: 'Page B2B',
    hint:  'Page /b2b',
    fields: [
      { key: 'b2b_title',    label: 'Titre hero',  type: 'text',     placeholder: 'Fini les cadeaux génériques' },
      { key: 'b2b_subtitle', label: 'Sous-titre',  type: 'textarea', placeholder: 'Offrez à vos collaboratrices...' },
    ],
  },
  {
    title: 'SEO',
    hint:  'Meta description de la homepage',
    fields: [
      { key: 'meta_desc', label: 'Meta description', type: 'textarea', placeholder: 'Glow Up Box — K-Beauty Maroc...' },
    ],
  },
]

const INPUT_CLS = 'w-full px-4 py-3 rounded-xl border border-gray-200 text-sm outline-none focus:border-[#E91E8C] focus:ring-2 focus:ring-[rgba(233,30,140,.1)] transition-all'
const SAVE_BTN  = 'px-8 py-3 rounded-xl text-white text-sm font-semibold flex items-center gap-2 disabled:opacity-60 transition-all hover:-translate-y-0.5'

function Field({ label, type, value, placeholder, onChange }: {
  label: string; type: string; value: string; placeholder: string
  onChange: (v: string) => void
}) {
  return (
    <div>
      <label className="block text-[#1A1A2E] text-sm font-semibold mb-1.5">{label}</label>
      {type === 'textarea'
        ? <textarea value={value} onChange={e => onChange(e.target.value)} rows={3}
            placeholder={placeholder} className={INPUT_CLS + ' resize-none'} />
        : <input value={value} onChange={e => onChange(e.target.value)}
            placeholder={placeholder} className={INPUT_CLS} />}
    </div>
  )
}

function TestimonialsRepeater({ items, onChange }: {
  items: Testimonial[]
  onChange: (items: Testimonial[]) => void
}) {
  function add() {
    onChange([...items, { quote: '', name: '', meta: '', initial: '' }])
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function set(i: number, field: keyof Testimonial, v: string) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: v } : item))
  }
  return (
    <div className="space-y-4">
      {items.map((t, i) => (
        <div key={i} className="bg-[#FDF0F5] rounded-xl p-4 space-y-3 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-wider">Témoignage {i + 1}</span>
            <button type="button" onClick={() => remove(i)}
              className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
          <textarea value={t.quote} onChange={e => set(i, 'quote', e.target.value)}
            placeholder="Citation du témoignage..." rows={3}
            className={INPUT_CLS + ' resize-none bg-white'} />
          <div className="grid grid-cols-3 gap-3">
            <input value={t.name} onChange={e => set(i, 'name', e.target.value)}
              placeholder="Prénom N." className={INPUT_CLS + ' bg-white'} />
            <input value={t.meta} onChange={e => set(i, 'meta', e.target.value)}
              placeholder="Peau sensible · Casablanca" className={INPUT_CLS + ' bg-white'} />
            <input value={t.initial} onChange={e => set(i, 'initial', e.target.value)}
              placeholder="S (initiale)" className={INPUT_CLS + ' bg-white'} maxLength={2} />
          </div>
        </div>
      ))}
      <button type="button" onClick={add}
        className="w-full py-3 rounded-xl border-2 border-dashed border-[#E91E8C]/30 text-[#E91E8C] text-sm font-semibold flex items-center justify-center gap-2 hover:border-[#E91E8C] hover:bg-[rgba(233,30,140,.03)] transition-all">
        <Plus className="w-4 h-4" /> Ajouter un témoignage
      </button>
    </div>
  )
}

function B2BTestimonialsRepeater({ items, onChange }: {
  items: B2BTestimonial[]
  onChange: (items: B2BTestimonial[]) => void
}) {
  function add() {
    onChange([...items, { text: '', name: '', role: '', company: '' }])
  }
  function remove(i: number) {
    onChange(items.filter((_, idx) => idx !== i))
  }
  function set(i: number, field: keyof B2BTestimonial, v: string) {
    onChange(items.map((item, idx) => idx === i ? { ...item, [field]: v } : item))
  }
  return (
    <div className="space-y-4">
      {items.map((t, i) => (
        <div key={i} className="bg-[#FDF0F5] rounded-xl p-4 space-y-3 relative">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[#E91E8C] text-xs font-bold uppercase tracking-wider">Témoignage B2B {i + 1}</span>
            <button type="button" onClick={() => remove(i)}
              className="w-7 h-7 rounded-full bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors">
              <Trash2 className="w-3.5 h-3.5 text-red-500" />
            </button>
          </div>
          <textarea value={t.text} onChange={e => set(i, 'text', e.target.value)}
            placeholder="Citation..." rows={3}
            className={INPUT_CLS + ' resize-none bg-white'} />
          <div className="grid grid-cols-3 gap-3">
            <input value={t.name} onChange={e => set(i, 'name', e.target.value)}
              placeholder="Prénom N." className={INPUT_CLS + ' bg-white'} />
            <input value={t.role} onChange={e => set(i, 'role', e.target.value)}
              placeholder="Directrice RH" className={INPUT_CLS + ' bg-white'} />
            <input value={t.company} onChange={e => set(i, 'company', e.target.value)}
              placeholder="Entreprise · Casablanca" className={INPUT_CLS + ' bg-white'} />
          </div>
        </div>
      ))}
      <button type="button" onClick={add}
        className="w-full py-3 rounded-xl border-2 border-dashed border-[#E91E8C]/30 text-[#E91E8C] text-sm font-semibold flex items-center justify-center gap-2 hover:border-[#E91E8C] hover:bg-[rgba(233,30,140,.03)] transition-all">
        <Plus className="w-4 h-4" /> Ajouter un témoignage B2B
      </button>
    </div>
  )
}

function parseJSON<T>(val: string | undefined, fallback: T): T {
  if (!val) return fallback
  try { return JSON.parse(val) as T } catch { return fallback }
}

export default function ContenuPage() {
  const [data,    setData]    = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving,  setSaving]  = useState(false)
  const [success, setSuccess] = useState(false)
  const [error,   setError]   = useState('')

  const [testimonials,    setTestimonials]    = useState<Testimonial[]>([])
  const [b2bTestimonials, setB2bTestimonials] = useState<B2BTestimonial[]>([])
  const [tickerText,      setTickerText]      = useState('')

  useEffect(() => {
    fetch('/api/admin/options')
      .then(r => r.json())
      .then((d: Record<string, string>) => {
        setData(d)
        setTestimonials(parseJSON(d.testimonials, []))
        setB2bTestimonials(parseJSON(d.b2b_testimonials, []))
        const items: string[] = parseJSON(d.ticker_items, [])
        setTickerText(items.join('\n'))
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSaving(true); setError(''); setSuccess(false)
    const tickerItems = tickerText.split('\n').map(s => s.trim()).filter(Boolean)
    const payload = {
      ...data,
      testimonials:     JSON.stringify(testimonials),
      b2b_testimonials: JSON.stringify(b2bTestimonials),
      ticker_items:     JSON.stringify(tickerItems),
    }
    try {
      const res = await fetch('/api/admin/options', {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) { setError(String(e)) } finally { setSaving(false) }
  }

  function set(key: string, val: string) {
    setData(d => ({ ...d, [key]: val }))
  }

  if (loading) return (
    <div className="ml-64 flex items-center justify-center min-h-screen">
      <Loader2 className="w-8 h-8 animate-spin text-[#E91E8C]" />
    </div>
  )

  return (
    <div className="ml-64 p-8 min-h-screen bg-[#FAFAFA]">
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="font-playfair font-bold italic text-[#1A1A2E] text-3xl mb-1">Contenu des pages</h1>
          <p className="text-[#4A4A6A] text-sm">Tous les textes modifiables de votre site</p>
        </div>

        {error   && <div className="bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">{error}</div>}
        {success && <div className="bg-green-50 border border-green-200 text-green-700 text-sm rounded-xl px-4 py-3 mb-5">✓ Contenu mis à jour avec succès !</div>}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Champs simples par section */}
          {SECTIONS.map(s => (
            <div key={s.title} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-5">
              <div className="border-b border-gray-100 pb-3">
                <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider">{s.title}</h2>
                {s.hint && <p className="text-[#4A4A6A] text-xs mt-0.5">{s.hint}</p>}
              </div>
              {s.fields.map(f => (
                <Field key={f.key} label={f.label} type={f.type}
                  value={data[f.key] ?? ''} placeholder={f.placeholder}
                  onChange={v => set(f.key, v)} />
              ))}
            </div>
          ))}

          {/* Ticker */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider">Bandeau défilant (Ticker)</h2>
              <p className="text-[#4A4A6A] text-xs mt-0.5">Une ligne = un item. Ex : K-BEAUTY AUTHENTIQUE</p>
            </div>
            <textarea
              value={tickerText}
              onChange={e => setTickerText(e.target.value)}
              rows={6}
              placeholder={"K-BEAUTY AUTHENTIQUE\nCONSEIL PEAU GRATUIT\nLIVRAISON MAROC\nCRUELTY FREE\nCOFFRETS PERSONNALISÉS"}
              className={INPUT_CLS + ' resize-none font-mono text-xs'}
            />
          </div>

          {/* Témoignages homepage */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider">Témoignages — Homepage</h2>
              <p className="text-[#4A4A6A] text-xs mt-0.5">Carrousel de témoignages sur la page d&apos;accueil</p>
            </div>
            <TestimonialsRepeater items={testimonials} onChange={setTestimonials} />
          </div>

          {/* Témoignages B2B */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 space-y-4">
            <div className="border-b border-gray-100 pb-3">
              <h2 className="font-semibold text-[#1A1A2E] text-sm uppercase tracking-wider">Témoignages — Page B2B</h2>
              <p className="text-[#4A4A6A] text-xs mt-0.5">Citations clients entreprise</p>
            </div>
            <B2BTestimonialsRepeater items={b2bTestimonials} onChange={setB2bTestimonials} />
          </div>

          <div className="flex justify-end pb-8">
            <button type="submit" disabled={saving} className={SAVE_BTN}
              style={{ background: 'linear-gradient(135deg,#E91E8C,#FFB347)', boxShadow: '0 4px 16px rgba(233,30,140,.3)' }}>
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {saving ? 'Sauvegarde...' : 'Tout enregistrer'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
