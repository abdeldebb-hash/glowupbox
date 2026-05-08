'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Heart, Sparkles, ChevronDown } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'

export type BoxData = {
  id:          number
  name:        string
  slug:        string
  skinType:    string
  skinLabel:   string
  description: string
  products:    string[]
  img:         string
  waMessage:   string
}

const FILTERS = [
  { id: 'all',      label: 'Toutes' },
  { id: 'sensible', label: 'Sensible' },
  { id: 'terne',    label: 'Terne' },
  { id: 'grasse',   label: 'Grasse' },
  { id: 'seche',    label: 'Sèche' },
  { id: 'mixte',    label: 'Mixte' },
  { id: 'anti-age', label: 'Anti-âge' },
]

const STEPS = [
  { num: '01', title: 'Bilan peau gratuit',  desc: 'Répondez à 6 questions sur votre peau en 2 minutes.' },
  { num: '02', title: 'Recommandation',       desc: 'On vous conseille la box idéale pour votre profil.' },
  { num: '03', title: 'Commande WhatsApp',    desc: 'Commandez simplement via WhatsApp, sans stress.' },
  { num: '04', title: 'Livraison Maroc',      desc: 'Recevez votre box partout au Maroc.' },
]

const FAQS = [
  { q: "Pourquoi les boxs n'ont pas de prix affiché ?",         a: "Chaque box est personnalisée après un bilan peau gratuit. Le prix dépend de votre profil et des produits sélectionnés. Contactez-nous pour recevoir votre tarif personnalisé." },
  { q: 'En quoi consiste le suivi personnalisé 1 mois offert ?', a: 'Après réception de votre box, notre équipe reste disponible pendant 1 mois pour adapter votre routine si besoin, répondre à vos questions et vous accompagner vers de vrais résultats.' },
  { q: 'Les produits sont-ils adaptés au marché marocain ?',     a: 'Oui, tous nos produits K-Beauty sont sélectionnés en tenant compte du climat marocain et des types de peau locaux.' },
  { q: 'Quelle est la durée de livraison ?',                     a: 'La livraison est disponible dans tout le Maroc. Les délais varient selon votre ville, contactez-nous pour plus d\'informations.' },
]

export function BoxesClient({ boxes }: { boxes: BoxData[] }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [openFaq, setOpenFaq]           = useState<number | null>(null)

  const filtered = activeFilter === 'all'
    ? boxes
    : boxes.filter(b => b.skinType === activeFilter)

  return (
    <main>
      {/* HERO */}
      <section className="bg-dark-gradient min-h-[48vh] flex items-center pt-24 pb-16 px-5 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]"
          style={{ backgroundImage:'radial-gradient(circle at 30% 50%,#E91E8C 0%,transparent 60%),radial-gradient(circle at 70% 50%,#FFB347 0%,transparent 60%)' }} />
        <div className="max-w-5xl mx-auto relative z-10 text-center w-full">
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:.6 }}>
            <SectionBadge light>Coffrets K-Beauty</SectionBadge>
            <h1 className="font-playfair font-bold italic text-white mt-2 mb-5" style={{ fontSize:'clamp(2rem,5vw,3.8rem)' }}>
              Vos Boxs <span className="gradient-text">Glow Up</span>
            </h1>
            <p className="text-white/70 max-w-xl mx-auto text-lg leading-relaxed">
              Des coffrets K-Beauty pensés pour votre type de peau. Conseillées avant d'être commandées.
            </p>
          </motion.div>
        </div>
      </section>

      {/* BANNER */}
      <section className="bg-soft-pink border-y border-[#E91E8C]/10 py-5 px-5">
        <div className="max-w-3xl mx-auto flex flex-wrap items-center gap-3 justify-center text-center">
          <span className="text-2xl">💬</span>
          <p className="text-brand-gray text-sm">
            <strong className="text-fuchsia">Pourquoi pas de prix affiché ?</strong>{' '}
            Parce que chaque peau est unique. Un bilan gratuit nous permet de vous recommander exactement ce dont vous avez besoin.
          </p>
          <GradientButton href="/conseil-peau" size="sm">Bilan gratuit</GradientButton>
        </div>
      </section>

      {/* FILTRES + GRILLE */}
      <section className="py-14 px-5">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center mb-12">
            {FILTERS.map(f => (
              <button key={f.id} onClick={() => setActiveFilter(f.id)}
                className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 min-h-[44px] ${
                  activeFilter === f.id
                    ? 'bg-brand-gradient text-white shadow-[0_4px_16px_rgba(233,30,140,0.3)]'
                    : 'bg-white border border-gray-200 text-brand-gray hover:border-fuchsia hover:text-fuchsia'
                }`}>{f.label}</button>
            ))}
          </div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence mode="popLayout">
              {filtered.map((box, i) => (
                <motion.article key={box.id} layout
                  initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }}
                  exit={{ opacity:0, scale:.95 }}
                  transition={{ duration:.4, delay:i*.05 }}
                  className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col"
                >
                  <div className="h-44 relative overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={box.img} alt={box.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(26,26,46,.3) 0%,transparent 50%)' }} />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <span className="inline-block bg-soft-pink text-fuchsia text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 self-start">
                      {box.skinLabel}
                    </span>
                    <h2 className="font-playfair font-bold text-brand-black text-xl mb-2">{box.name}</h2>
                    <p className="text-brand-gray text-sm leading-relaxed mb-4">{box.description}</p>
                    <ul className="space-y-1.5 mb-5 flex-1">
                      {box.products.map(p => (
                        <li key={p} className="flex items-start gap-2 text-sm text-brand-gray">
                          <span className="text-fuchsia mt-0.5 flex-shrink-0 text-[10px]">✦</span>{p}
                        </li>
                      ))}
                    </ul>
                    <div className="bg-soft-pink rounded-xl px-3 py-2 flex items-center gap-2 mb-4">
                      <Heart className="w-3.5 h-3.5 text-fuchsia flex-shrink-0" />
                      <span className="text-fuchsia text-[12px] font-semibold">Suivi personnalisé 1 mois offert</span>
                    </div>
                    <p className="text-[11px] text-brand-gray/50 text-center mb-3">Prix communiqué après bilan peau gratuit</p>
                    <GradientButton href={waUrl(box.waMessage)} size="sm" external className="w-full justify-center">
                      <MessageCircle className="w-4 h-4" />Demander un conseil
                    </GradientButton>
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </motion.div>

          {filtered.length === 0 && (
            <p className="text-center text-brand-gray/50 py-16 font-playfair italic">Aucune box pour ce type de peau.</p>
          )}
        </div>
      </section>

      {/* PROCESS */}
      <section className="bg-dark-gradient py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <SectionBadge light>Comment ça marche</SectionBadge>
            <h2 className="font-playfair font-bold text-white mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)' }}>
              Simple comme <span className="gradient-text">bonjour</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.num} delay={i*.1}>
                <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-playfair font-bold gradient-text mb-3">{s.num}</div>
                  <h3 className="text-white font-bold mb-2">{s.title}</h3>
                  <p className="text-white/60 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-5 bg-soft-pink">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Questions fréquentes</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)' }}>
              Vos questions, <span className="gradient-text">nos réponses</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i*.05}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-brand-black hover:text-fuchsia transition-colors min-h-[44px]">
                    <span>{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration:.2 }} className="flex-shrink-0">
                      <ChevronDown className="w-5 h-5 text-fuchsia" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div key="a" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.3, ease:'easeInOut' }} className="overflow-hidden">
                        <p className="px-6 pb-5 text-brand-gray text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-gradient py-16 px-5 text-center">
        <ScrollReveal>
          <h2 className="font-playfair font-bold italic text-white mb-4" style={{ fontSize:'clamp(1.8rem,3.5vw,2.8rem)' }}>
            Pas sûre de votre type de peau ?
          </h2>
          <p className="text-white/80 mb-8 max-w-md mx-auto">Faites le bilan en 2 minutes et recevez une recommandation box personnalisée.</p>
          <GradientButton href="/conseil-peau" variant="white" size="lg">
            <Sparkles className="w-4 h-4" />Bilan peau gratuit
          </GradientButton>
        </ScrollReveal>
      </section>
    </main>
  )
}
