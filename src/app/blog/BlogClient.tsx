'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Clock, ArrowRight, Tag, TrendingUp } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'

export type ArticleData = {
  id:       number
  slug:     string
  cat:      string
  catLabel: string
  title:    string
  excerpt:  string
  date:     string
  readTime: string
  img:      string
  featured: boolean
}

const CATEGORIES = [
  { id: 'tous',            label: 'Tous les articles' },
  { id: 'routine',         label: 'Routine skincare' },
  { id: 'types-peau',      label: 'Types de peau' },
  { id: 'ingredients',     label: 'Ingrédients' },
  { id: 'conseils-beaute', label: 'Conseils beauté' },
  { id: 'avant-apres',     label: 'Avant / Après' },
  { id: 'kbeauty',         label: 'K-Beauty' },
]

const TAGS = ['Routine','Peau sensible','SPF','Hydratation','Sébum','Actifs','Nettoyage','Anti-âge']

const CAT_COLORS: Record<string, string> = {
  'routine':         'bg-[rgba(233,30,140,.08)] text-fuchsia',
  'types-peau':      'bg-[rgba(255,107,157,.1)] text-coral',
  'ingredients':     'bg-[rgba(255,179,71,.1)] text-[#B8860B]',
  'conseils-beaute': 'bg-[rgba(45,27,78,.08)] text-purple',
  'avant-apres':     'bg-soft-pink text-brand-gray',
  'kbeauty':         'bg-[rgba(233,30,140,.06)] text-fuchsia',
}

export function BlogClient({ articles }: { articles: ArticleData[] }) {
  const [activeFilter, setActiveFilter] = useState('tous')
  const [search,       setSearch]       = useState('')

  const featured    = articles.find(a => a.featured) ?? articles[0]
  const nonFeatured = articles.filter(a => a !== featured)
  const populaires  = articles.slice(0, 5)

  const filtered = useMemo(() => {
    let list = nonFeatured
    if (activeFilter !== 'tous') list = list.filter(a => a.cat === activeFilter)
    if (search.trim()) {
      const q = search.toLowerCase()
      list = list.filter(a => a.title.toLowerCase().includes(q) || a.excerpt.toLowerCase().includes(q))
    }
    return list
  }, [activeFilter, search, nonFeatured])

  const displayed = filtered.slice(0, 6)

  return (
    <main>
      {/* HERO */}
      <section className="bg-dark-gradient pt-32 pb-16 px-5 relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(233,30,140,.15) 0%,transparent 70%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
            <SectionBadge light>Skincare & beauté</SectionBadge>
            <h1 className="font-playfair font-bold italic text-white mt-2 mb-4" style={{ fontSize:'clamp(2.5rem,5vw,4.5rem)' }}>
              Le Blog <span className="gradient-text">Beauté</span>
            </h1>
            <p className="text-white/60 max-w-lg text-base leading-relaxed mb-8">
              Conseils skincare, routines et astuces beauté — tout pour prendre soin de votre peau au quotidien.
            </p>
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
              <input type="search" value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher un article..."
                className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-white/8 border border-white/12 text-white placeholder-white/35 text-sm outline-none focus:border-fuchsia/60 focus:bg-white/12 transition-all" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ARTICLE VEDETTE */}
      {featured && (
        <section className="py-12 px-5 bg-white">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal>
              <motion.a href={`/blog/${featured.slug}`} whileHover={{ y:-4 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_24px_60px_rgba(233,30,140,.1)] transition-shadow duration-300 group block">
                <div className="h-64 lg:h-auto relative overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={featured.img} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0" style={{ background:'linear-gradient(to right,transparent 60%,rgba(255,255,255,.05))' }} />
                  <span className="absolute top-5 left-5 bg-brand-gradient text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Article vedette</span>
                </div>
                <div className="p-9 flex flex-col justify-center bg-soft-pink">
                  <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-4 self-start ${CAT_COLORS[featured.cat] ?? 'bg-soft-pink text-brand-gray'}`}>
                    {featured.catLabel}
                  </span>
                  <h2 className="font-playfair font-bold text-brand-black text-2xl mb-3 leading-snug group-hover:text-fuchsia transition-colors">{featured.title}</h2>
                  <p className="text-brand-gray text-sm leading-relaxed mb-6">{featured.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-brand-gray/60 text-[12px]">
                      <span>{featured.date}</span><span>·</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{featured.readTime}</span>
                    </div>
                    <span className="flex items-center gap-1 text-fuchsia text-[12px] font-bold group-hover:gap-2 transition-all">
                      Lire <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.a>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* FILTRES + GRILLE + SIDEBAR */}
      <section className="py-10 px-5 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-[1fr_280px] gap-12">

          <div>
            <div className="flex flex-wrap gap-2 mb-10">
              {CATEGORIES.map(c => (
                <button key={c.id} onClick={() => setActiveFilter(c.id)}
                  className={`px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-wide transition-all min-h-[40px] cursor-pointer ${activeFilter===c.id?'bg-brand-gradient text-white shadow-[0_4px_16px_rgba(233,30,140,.28)]':'bg-soft-pink text-brand-gray hover:text-fuchsia'}`}>
                  {c.label}
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div key={activeFilter+search} initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }} transition={{ duration:.2 }}>
                {displayed.length === 0 ? (
                  <div className="text-center py-16 text-brand-gray/50">
                    <p className="text-lg font-playfair italic">Aucun article trouvé</p>
                    {articles.length === 0 && <p className="text-sm mt-2">Aucun article publié pour l'instant.</p>}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayed.map((article, i) => (
                      <ScrollReveal key={article.id} delay={i*.05}>
                        <motion.a href={`/blog/${article.slug}`} whileHover={{ y:-6 }}
                          className="block bg-white rounded-3xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-[0_16px_40px_rgba(233,30,140,.1)] hover:border-[rgba(233,30,140,.15)] transition-all duration-300 group">
                          <div className="h-48 relative overflow-hidden bg-soft-pink">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400" loading="lazy" />
                          </div>
                          <div className="p-5">
                            <span className={`inline-block text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full mb-3 ${CAT_COLORS[article.cat] ?? 'bg-soft-pink text-brand-gray'}`}>
                              {article.catLabel}
                            </span>
                            <h3 className="font-playfair font-bold text-brand-black text-lg leading-snug mb-2 group-hover:text-fuchsia transition-colors line-clamp-2">{article.title}</h3>
                            <p className="text-brand-gray text-[13px] leading-relaxed mb-4 line-clamp-2">{article.excerpt}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 text-brand-gray/50 text-[11px]">
                                <span>{article.date}</span><span>·</span>
                                <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readTime}</span>
                              </div>
                              <span className="text-fuchsia text-[11px] font-bold flex items-center gap-1 group-hover:gap-2 transition-all">Lire <ArrowRight className="w-3 h-3" /></span>
                            </div>
                          </div>
                        </motion.a>
                      </ScrollReveal>
                    ))}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-8 lg:sticky lg:top-28 self-start">
            <div className="bg-soft-pink rounded-3xl p-6">
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-4 h-4 text-fuchsia" />
                <h3 className="font-playfair font-bold text-brand-black text-lg">Populaires</h3>
              </div>
              <div className="space-y-4">
                {populaires.map((a, i) => (
                  <a key={a.id} href={`/blog/${a.slug}`} className="flex items-start gap-3 group">
                    <span className="font-playfair font-black italic gradient-text text-xl w-6 flex-shrink-0 leading-tight">{String(i+1).padStart(2,'0')}</span>
                    <div>
                      <p className="text-brand-black text-[13px] font-medium leading-snug group-hover:text-fuchsia transition-colors line-clamp-2">{a.title}</p>
                      <span className="text-brand-gray/50 text-[11px]">{a.catLabel}</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-6 border border-gray-100">
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-4 h-4 text-fuchsia" />
                <h3 className="font-playfair font-bold text-brand-black text-lg">Sujets</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {TAGS.map(tag => (
                  <button key={tag} onClick={() => setSearch(tag)}
                    className="px-3 py-1.5 rounded-full bg-soft-pink text-brand-gray text-[12px] font-medium hover:bg-[rgba(233,30,140,.08)] hover:text-fuchsia transition-all cursor-pointer min-h-[36px]">
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-dark-gradient rounded-3xl p-6 text-white">
              <h3 className="font-playfair font-bold italic text-xl mb-2">Votre profil peau</h3>
              <p className="text-white/60 text-sm leading-relaxed mb-5">Vous voulez une routine adaptée ? Faites votre bilan gratuit en 2 minutes.</p>
              <GradientButton href="/conseil-peau" size="sm" className="w-full justify-center">Mon bilan gratuit</GradientButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
