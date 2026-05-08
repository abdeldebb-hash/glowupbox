'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, ArrowUpDown, Star, Heart, Truck, ShieldCheck, Headphones, ArrowRight, Zap } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'

export type ProductData = {
  id:         number
  img:        string
  cat:        string
  catLabel:   string
  name:       string
  desc:       string
  price:      number
  oldPrice:   number | null
  rating:     number
  reviews:    number
  badge:      string | null
  featured:   boolean
  stock:      string
  stockLabel: string
  benefits:   string[]
}

const FILTERS = [
  { id: 'tous',      label: 'Tous les produits' },
  { id: 'soin',      label: 'Soin du visage' },
  { id: 'massage',   label: 'Massage & drainage' },
  { id: 'nettoyage', label: 'Nettoyage' },
  { id: 'routine',   label: 'Accessoires routine' },
]

const BADGE_STYLES: Record<string, string> = {
  bestseller: 'bg-brand-gradient text-white',
  new:        'bg-brand-black text-white',
  popular:    'bg-fuchsia text-white',
}
const BADGE_LABELS: Record<string, string> = {
  bestseller: 'Best-seller',
  new:        'Nouveau',
  popular:    'Populaire',
}

const WHY = [
  { Icon: MessageCircle, title: 'Commande via WhatsApp', desc: 'Simple et rapide, on gère tout pour vous.' },
  { Icon: Truck,         title: 'Livraison rapide',      desc: 'Partout au Maroc depuis Rabat.' },
  { Icon: ShieldCheck,   title: 'Sélection qualité',     desc: 'Chaque accessoire testé et approuvé.' },
  { Icon: Headphones,    title: 'SAV réactif',           desc: "Un problème ? On règle ça sur WhatsApp." },
]

function Stars({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star key={i} className="w-3 h-3"
          fill={i <= Math.floor(rating) ? '#FFB347' : 'none'} stroke="#FFB347" strokeWidth={1.5}
          style={{ opacity: i > Math.ceil(rating) ? 0.3 : 1 }} />
      ))}
    </div>
  )
}

export function BoutiqueClient({ products, crossBoxes }: {
  products:   ProductData[]
  crossBoxes: { img: string; cat: string; name: string; slug: string }[]
}) {
  const [activeFilter, setActiveFilter] = useState('tous')
  const [sortBy,       setSortBy]       = useState('default')
  const [liked,        setLiked]        = useState<Set<number>>(new Set())

  function toggleLike(id: number) {
    setLiked(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n })
  }

  const filtered = useMemo(() => {
    let list = products.filter(p => activeFilter === 'tous' || p.cat === activeFilter)
    if (sortBy === 'price-asc')  list = [...list].sort((a, b) => a.price - b.price)
    if (sortBy === 'price-desc') list = [...list].sort((a, b) => b.price - a.price)
    if (sortBy === 'new')        list = [...list].sort((a, b) => (a.badge === 'new' ? -1 : b.badge === 'new' ? 1 : 0))
    return list
  }, [activeFilter, sortBy, products])

  const featured    = filtered.find(p => p.featured)
  const regularList = filtered.filter(p => !p.featured)

  return (
    <main>
      {/* HERO */}
      <section className="bg-dark-gradient pt-36 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-1/5 -right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(233,30,140,.16) 0%,transparent 70%)' }} />
        <div className="absolute -bottom-[10%] left-0 w-72 h-72 rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(255,179,71,.08) 0%,transparent 70%)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
            <p className="text-white/40 text-[11px] uppercase tracking-widest mb-4">
              Accueil <span className="mx-2">›</span><span className="text-white/65">Boutique</span>
            </p>
            <SectionBadge light>Accessoires beauté</SectionBadge>
            <h1 className="font-playfair font-bold italic text-white mt-2 mb-4" style={{ fontSize:'clamp(3rem,7vw,5rem)' }}>
              <span className="gradient-text">Boutique</span>
            </h1>
            <p className="text-white/60 max-w-lg text-base leading-relaxed mb-8">
              Des accessoires soigneusement sélectionnés pour sublimer votre routine beauté au quotidien.
            </p>
            <div className="flex flex-wrap gap-3">
              {[{Icon:Truck,label:'Livraison rapide Maroc'},{Icon:MessageCircle,label:'Commande via WhatsApp'},{Icon:Zap,label:'Sélection qualité'}].map(({Icon,label}) => (
                <span key={label} className="flex items-center gap-2 bg-white/8 border border-white/12 text-white/70 px-4 py-2 rounded-full text-[11px] font-medium tracking-wide uppercase backdrop-blur-sm">
                  <Icon className="w-3.5 h-3.5" />{label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* TOOLBAR */}
      <div className="max-w-6xl mx-auto px-5 mt-10">
        <motion.div initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ duration:.5, delay:.2 }}
          className="bg-soft-pink rounded-2xl px-5 py-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap gap-2">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-all min-h-[40px] ${activeFilter===f.id?'bg-brand-gradient text-white shadow-[0_4px_16px_rgba(233,30,140,.28)]':'bg-white border border-[#F0E0E8] text-brand-gray hover:border-fuchsia hover:text-fuchsia'}`}>
                {f.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <select value={sortBy} onChange={e => setSortBy(e.target.value)}
                className="appearance-none pl-3 pr-8 py-2 border border-[#F0E0E8] rounded-full text-[11px] font-medium text-brand-gray bg-white outline-none focus:border-fuchsia cursor-pointer">
                <option value="default">Par défaut</option>
                <option value="price-asc">Prix croissant</option>
                <option value="price-desc">Prix décroissant</option>
                <option value="new">Nouveautés</option>
              </select>
              <ArrowUpDown className="w-3 h-3 text-brand-gray absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
            <span className="text-[13px] text-brand-gray/60 whitespace-nowrap">{filtered.length} produit{filtered.length>1?'s':''}</span>
          </div>
        </motion.div>
      </div>

      {/* GRILLE */}
      <section className="py-12 px-5 max-w-6xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div key={activeFilter+sortBy} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.25 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

              {featured && (
                <motion.article initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}
                  className="sm:col-span-2 lg:col-span-2 bg-dark-gradient rounded-3xl overflow-hidden border border-white/5 grid grid-cols-1 sm:grid-cols-2 hover:shadow-[0_24px_60px_rgba(26,26,46,.4)] transition-all duration-300 group">
                  <div className="relative overflow-hidden min-h-[260px] sm:min-h-[320px]">
                    <span className="absolute top-4 left-4 z-10 bg-brand-gradient text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Produit vedette</span>
                    <button onClick={() => toggleLike(featured.id)} aria-label="Favoris"
                      className={`absolute top-4 right-4 z-10 w-9 h-9 rounded-full flex items-center justify-center transition-all backdrop-blur-sm ${liked.has(featured.id)?'bg-fuchsia':'bg-white/80'}`}>
                      <Heart className={`w-4 h-4 ${liked.has(featured.id)?'fill-white text-white':'text-fuchsia'}`} />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={featured.img} alt={featured.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" style={{ minHeight:'260px' }} />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <p className="text-coral text-[10px] font-bold uppercase tracking-widest mb-2">{featured.catLabel}</p>
                    <h2 className="font-playfair font-bold italic text-white text-2xl mb-2">{featured.name}</h2>
                    <p className="text-white/55 text-sm leading-relaxed mb-3">{featured.desc}</p>
                    <div className="flex items-center gap-2 mb-3">
                      <Stars rating={featured.rating} />
                      <span className="text-white/45 text-xs">{featured.rating} ({featured.reviews} avis)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {featured.benefits.map(b => <span key={b} className="bg-white/8 text-white/70 text-[11px] px-2.5 py-1 rounded-full">{b}</span>)}
                    </div>
                    <div className="flex items-center justify-between mb-5">
                      <span className="font-playfair font-bold text-white text-3xl">{featured.price} DH</span>
                      <span className="flex items-center gap-1.5 text-[12px] text-white/45">
                        <span className={`w-1.5 h-1.5 rounded-full ${featured.stock==='ok'?'bg-green-400':'bg-orange-400'}`} />{featured.stockLabel}
                      </span>
                    </div>
                    <div className="flex flex-col gap-2">
                      <GradientButton href={waUrl(`Bonjour, je souhaite commander ${featured.name} (${featured.price} DH)`)} size="sm" external className="w-full justify-center">
                        <MessageCircle className="w-4 h-4" />Commander →
                      </GradientButton>
                      <GradientButton href={`/boutique/${featured.id}`} variant="ghost" size="sm" className="w-full justify-center">Voir le détail</GradientButton>
                    </div>
                  </div>
                </motion.article>
              )}

              {regularList.map((p, i) => (
                <motion.article key={p.id} initial={{ opacity:0, y:28 }} animate={{ opacity:1, y:0 }}
                  transition={{ duration:.5, delay:i*.07 }}
                  className="bg-white rounded-3xl overflow-hidden border border-[#F0E0E8] shadow-sm hover:-translate-y-1.5 hover:shadow-[0_20px_48px_rgba(233,30,140,.12)] hover:border-coral transition-all duration-300 group flex flex-col relative">
                  <div className="absolute top-0 inset-x-0 h-[3px] bg-brand-gradient origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
                  <div className="h-[240px] relative overflow-hidden bg-soft-pink">
                    {p.badge && (
                      <span className={`absolute top-3 left-3 z-10 text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${p.badge.startsWith('-')?'bg-peach text-brand-black':BADGE_STYLES[p.badge]??'bg-fuchsia text-white'}`}>
                        {p.badge.startsWith('-')?p.badge:(BADGE_LABELS[p.badge]??p.badge)}
                      </span>
                    )}
                    <button onClick={() => toggleLike(p.id)} aria-label="Favoris"
                      className={`absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center shadow-sm transition-all backdrop-blur-sm min-h-[44px] min-w-[44px] ${liked.has(p.id)?'bg-fuchsia':'bg-white/85 hover:scale-110'}`}>
                      <Heart className={`w-4 h-4 ${liked.has(p.id)?'fill-white text-white':'text-fuchsia'}`} />
                    </button>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                  </div>
                  <div className="p-5 flex flex-col flex-1">
                    <p className="text-fuchsia text-[9px] font-bold uppercase tracking-widest mb-1.5 opacity-75">{p.catLabel}</p>
                    <h2 className="font-playfair font-bold italic text-brand-black text-lg mb-1.5 leading-snug">{p.name}</h2>
                    <p className="text-brand-gray text-[13px] leading-relaxed mb-2.5 line-clamp-2">{p.desc}</p>
                    <div className="flex items-center gap-2 mb-2.5">
                      <Stars rating={p.rating} />
                      <span className="text-brand-gray text-[12px]">{p.rating} ({p.reviews} avis)</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {p.benefits.map(b => <span key={b} className="bg-[rgba(233,30,140,.06)] text-fuchsia text-[11px] px-2.5 py-1 rounded-full">{b}</span>)}
                    </div>
                    <div className="flex items-center justify-between mb-4 mt-auto">
                      <div className="flex items-baseline gap-2">
                        <span className="font-playfair font-bold text-fuchsia text-2xl">{p.price} DH</span>
                        {p.oldPrice && <span className="text-brand-gray/50 text-sm line-through">{p.oldPrice} DH</span>}
                      </div>
                      <span className={`flex items-center gap-1.5 text-[12px] font-medium ${p.stock==='ok'?'text-green-700':'text-orange-600'}`}>
                        <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${p.stock==='ok'?'bg-green-500':'bg-orange-400'}`} />{p.stockLabel}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <GradientButton href={waUrl(`Bonjour, je souhaite commander ${p.name} (${p.price} DH)`)} size="sm" external className="flex-1 justify-center">Commander →</GradientButton>
                      <GradientButton href={`/boutique/${p.id}`} variant="outline" size="sm">Détail</GradientButton>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </section>

      {/* POURQUOI */}
      <section className="bg-soft-pink py-20 px-5">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Nos engagements</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3.5rem)' }}>
              Pourquoi nous <span className="gradient-text">choisir</span> ?
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {WHY.map(({Icon,title,desc},i) => (
              <ScrollReveal key={title} delay={i*.1}>
                <div className="bg-white rounded-2xl p-7 border border-[#F0E0E8] hover:-translate-y-1 hover:shadow-[0_16px_32px_rgba(233,30,140,.08)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(233,30,140,.08)] flex items-center justify-center mb-4"><Icon className="w-5 h-5 text-fuchsia" /></div>
                  <h3 className="font-playfair font-bold italic text-brand-black text-lg mb-2">{title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CROSS-SELL */}
      <section className="bg-dark-gradient py-20 px-5 relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[400px] h-[400px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(233,30,140,.18) 0%,transparent 70%)' }} />
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-end mb-12">
            <ScrollReveal>
              <SectionBadge light>Pour aller plus loin</SectionBadge>
              <h2 className="font-playfair font-bold text-white mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
                Combinez avec <span className="gradient-text">une box soin</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed mt-3 max-w-sm">Les accessoires sont encore plus efficaces associés à une routine complète.</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1} className="flex gap-3 lg:justify-end flex-wrap">
              <GradientButton href="/boxs" size="sm">Voir toutes les boxs →</GradientButton>
              <GradientButton href="/conseil-peau" variant="ghost" size="sm">Mon bilan gratuit</GradientButton>
            </ScrollReveal>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {crossBoxes.map((c, i) => (
              <ScrollReveal key={c.name} delay={i*.1}>
                <motion.a href={`/boxs/${c.slug}`} whileHover={{ y:-4 }}
                  className="block bg-white/6 border border-white/7 rounded-2xl overflow-hidden hover:bg-white/10 transition-colors duration-300">
                  <div className="h-32 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={c.img} alt={c.name} className="w-full h-full object-cover opacity-70" />
                  </div>
                  <div className="p-5">
                    <p className="text-coral text-[9px] font-bold uppercase tracking-widest mb-1.5">{c.cat}</p>
                    <p className="font-playfair font-bold italic text-white text-lg mb-3">{c.name}</p>
                    <span className="flex items-center gap-1 text-white/40 text-[10px] font-bold uppercase tracking-wide">
                      Voir la box <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </motion.a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
