'use client'

import { useState }      from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, Clock, Star, ChevronDown, ArrowRight, Shield, Zap } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'

const FAQS = [
  { q: 'Comment passer une commande ?',                     a: 'Tout se passe via WhatsApp. Cliquez sur le bouton de commande sur chaque produit — WhatsApp s\'ouvre avec un message pré-rempli. Vous n\'avez plus qu\'à envoyer.' },
  { q: 'Le conseil peau est vraiment gratuit ?',            a: 'Oui, 100% gratuit et sans engagement. Vous remplissez le bilan, on vous conseille — si notre recommandation ne vous convient pas, vous n\'achetez rien.' },
  { q: 'Vous livrez partout au Maroc ?',                    a: 'Oui, partout au Maroc depuis Rabat. Les délais et frais de livraison sont communiqués lors de votre commande sur WhatsApp.' },
  { q: 'Quels sont les délais de livraison ?',              a: 'Les délais varient selon votre ville. Contactez-nous sur WhatsApp avec votre ville et on vous communique le délai exact.' },
  { q: 'Comment fonctionne le suivi personnalisé 1 mois ?', a: 'Après votre commande, on reste disponibles pendant 1 mois pour vous aider à rester régulière, adapter votre routine si besoin et répondre à vos questions — via WhatsApp.' },
  { q: 'Puis-je commander plusieurs boxs ?',                a: 'Bien sûr ! Pour les commandes groupées ou les cadeaux d\'entreprise, consultez notre offre B2B ou contactez-nous directement sur WhatsApp.' },
]

const DISPO = [
  { icon: MessageCircle, title: 'WhatsApp',    desc: 'Réponse rapide, disponible 24h/24 — 7j/7.' },
  { icon: Star,          title: 'Instagram',   desc: 'Suivez-nous et écrivez-nous en DM.' },
  { icon: Zap,           title: 'Bilan peau',  desc: 'Conseil personnalisé gratuit, sans engagement.' },
]

const containerV = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}
const itemV = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.34, 1.56, 0.64, 1] } },
}

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main>

      {/* ── HERO ── */}
      <section className="bg-dark-gradient min-h-[52vh] flex items-center pt-32 pb-20 px-5 relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(233,30,140,.2) 0%,transparent 70%)' }} />
        <div className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(255,107,157,.12) 0%,transparent 70%)', filter: 'blur(60px)' }} />

        <div className="max-w-4xl mx-auto w-full relative z-10">
          <motion.div variants={containerV} initial="hidden" animate="visible">
            <motion.p variants={itemV} className="text-white/40 text-[11px] uppercase tracking-widest mb-5 flex items-center gap-2">
              <a href="/" className="hover:text-coral transition-colors">Accueil</a>
              <span>›</span>
              <span className="text-white/65">Contact</span>
            </motion.p>

            <motion.div variants={itemV}>
              <span className="inline-flex items-center gap-2 bg-[rgba(37,211,102,.12)] border border-[rgba(37,211,102,.25)] text-[#25D366] px-4 py-2 rounded-full text-[11px] font-bold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                Disponible 24h/24 · 7j/7
              </span>
            </motion.div>

            <motion.h1 variants={itemV}
              className="font-playfair font-bold italic text-white mb-5"
              style={{ fontSize: 'clamp(2.8rem,6vw,5rem)' }}
            >
              On est là<br />
              <span className="gradient-text">pour vous</span>
            </motion.h1>

            <motion.p variants={itemV} className="text-white/60 text-lg max-w-lg leading-relaxed">
              Une question, une commande, un conseil — on vous répond toujours.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* ── CARD WHATSAPP FEATURED ── */}
      <section className="py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Nous joindre</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
              Comment nous <span className="gradient-text">contacter</span> ?
            </h2>
          </ScrollReveal>

          {/* Card WhatsApp featured — centrée, large */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 40px 80px rgba(37,211,102,.2)' }}
              transition={{ type: 'spring', stiffness: 260, damping: 20 }}
              className="bg-dark-gradient rounded-3xl p-10 md:p-14 relative overflow-hidden border border-[rgba(37,211,102,.15)] max-w-2xl mx-auto"
            >
              {/* Orb décoratif */}
              <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full pointer-events-none"
                style={{ background: 'radial-gradient(circle,rgba(37,211,102,.15) 0%,transparent 70%)' }} />

              {/* Badge Recommandé */}
              <span className="inline-flex items-center gap-1.5 bg-[rgba(255,179,71,.15)] border border-[rgba(255,179,71,.3)] text-[#FFB347] text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mb-8">
                <Star className="w-3 h-3 fill-[#FFB347]" />
                Recommandé
              </span>

              <div className="flex items-start gap-6 mb-8 relative z-10">
                {/* Icône WhatsApp */}
                <div className="w-16 h-16 rounded-2xl bg-[#25D366] flex items-center justify-center flex-shrink-0 shadow-[0_8px_24px_rgba(37,211,102,.4)]">
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="white" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <h2 className="font-playfair font-bold italic text-white text-3xl mb-2">WhatsApp</h2>
                  <p className="text-white/60 text-base leading-relaxed">
                    Le moyen le plus rapide pour nous joindre. Commandes, conseils, questions — tout passe par WhatsApp.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[#25D366] text-sm font-medium mb-8 relative z-10">
                <Clock className="w-4 h-4" />
                Disponible 24h/24 · 7j/7
              </div>

              {/* Suggestions de messages */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-8 relative z-10">
                {[
                  { label: 'Commander une box',    msg: 'Bonjour, je voudrais commander une box soin !' },
                  { label: 'Conseil peau',          msg: 'Bonjour, j\'aimerais un conseil pour ma peau.' },
                  { label: 'Question générale',     msg: 'Bonjour Glow Up Box !' },
                ].map(s => (
                  <motion.a
                    key={s.label}
                    href={waUrl(s.msg)}
                    target="_blank" rel="noopener"
                    whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                    className="flex items-center justify-between gap-2 bg-white/8 border border-white/12 text-white/75 text-[12px] font-medium px-3 py-2.5 rounded-xl hover:bg-white/14 hover:border-[#25D366]/40 hover:text-white transition-all min-h-[44px] cursor-pointer"
                  >
                    {s.label}
                    <ArrowRight className="w-3 h-3 flex-shrink-0" />
                  </motion.a>
                ))}
              </div>

              <GradientButton
                href={waUrl('Bonjour Glow Up Box !')}
                variant="white" size="lg" external
                className="w-full justify-center relative z-10"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="#E91E8C" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Écrire maintenant
              </GradientButton>
            </motion.div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── DISPONIBILITÉ ── */}
      <section className="bg-soft-pink py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Toujours là</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
              Toujours disponibles <span className="gradient-text">pour vous</span>
            </h2>
            <p className="text-brand-gray text-sm max-w-md mx-auto mt-3 leading-relaxed">
              Que ce soit pour une question sur un produit, un conseil peau ou une commande — on vous répond.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {DISPO.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -6, boxShadow: '0 20px 40px rgba(233,30,140,.08)' }}
                  className="bg-white rounded-3xl p-8 border border-[rgba(233,30,140,.08)] transition-shadow duration-300 cursor-default"
                >
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(233,30,140,.08)] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-fuchsia" />
                  </div>
                  <h3 className="font-playfair font-bold italic text-brand-black text-xl mb-2">{title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize: 'clamp(2rem,4vw,3rem)' }}>
              Questions <span className="gradient-text">fréquentes</span>
            </h2>
          </ScrollReveal>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <button
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-brand-black hover:text-fuchsia transition-colors min-h-[56px] cursor-pointer"
                  >
                    <span className="text-[15px]">{faq.q}</span>
                    <motion.div
                      animate={{ rotate: openFaq === i ? 180 : 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="flex-shrink-0"
                    >
                      <ChevronDown className="w-5 h-5 text-fuchsia" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="overflow-hidden"
                      >
                        <p className="px-6 pb-6 text-brand-gray text-sm leading-relaxed">{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-dark-gradient py-20 px-5 text-center relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse at 50% 0%, rgba(233,30,140,.2) 0%, transparent 60%)' }} />
        <ScrollReveal className="relative z-10">
          <h2 className="font-playfair font-bold italic text-white mb-3" style={{ fontSize: 'clamp(2rem,4vw,3.2rem)' }}>
            La façon la plus simple<br />
            <em className="gradient-text not-italic">de nous joindre</em>
          </h2>
          <p className="text-white/60 mb-3 leading-relaxed">WhatsApp, c'est rapide, humain et efficace.<br />On vous répond personnellement.</p>
          <p className="text-white/35 text-[12px] uppercase tracking-widest mb-10">Disponible 24h/24 · 7j/7</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href={waUrl('Bonjour Glow Up Box !')} variant="white" size="lg" external>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#E91E8C" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              Ouvrir WhatsApp
            </GradientButton>
            <GradientButton href="/conseil-peau" variant="ghost" size="lg">
              Mon bilan gratuit
            </GradientButton>
          </div>
        </ScrollReveal>
      </section>

    </main>
  )
}
