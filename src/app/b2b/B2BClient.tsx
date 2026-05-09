'use client'

import { useState }  from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageCircle, CheckCircle, Star, ChevronDown, Building2, Users, Crown, ArrowRight, Clock, Package } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'

const OCCASIONS = [
  { emoji: '🌸', title: 'Journée Internationale de la Femme', desc: 'Le 8 mars, offrez bien plus qu\'un cadeau symbolique' },
  { emoji: '🎁', title: 'Cadeaux de fin d\'année',            desc: 'Clôturez l\'année avec un présent mémorable' },
  { emoji: '🏢', title: 'Séminaires & événements',            desc: 'Un cadeau qui marque les esprits' },
  { emoji: '💎', title: 'Cadeaux clients VIP',                desc: 'Fidélisez vos meilleurs clients' },
  { emoji: '🎉', title: 'Anniversaires d\'entreprise',        desc: 'Célébrez avec vos équipes' },
]

const PACKS = [
  {
    icon:     Package,
    badge:    'Essentiel',
    qty:      'À partir de 5 boxs',
    title:    'Pack Découverte',
    subtitle: 'Pour les petites équipes et premiers essais',
    features: [
      '1 type de box au choix',
      'Emballage standard soigné',
      'Livraison unique coordonnée',
      'Devis personnalisé sous 48h',
      'Interlocuteur dédié',
    ],
    featured: false,
    waMsg: 'Bonjour, je suis intéressée par le Pack Découverte B2B (dès 5 boxs). Occasion : \nQuantité souhaitée : \nBudget :',
  },
  {
    icon:     Users,
    badge:    'Le plus demandé',
    qty:      'À partir de 20 boxs',
    title:    'Pack Entreprise',
    subtitle: 'Pour les événements RH et team building',
    features: [
      'Mélange de boxs possible',
      'Carte message personnalisée',
      'Emballage aux couleurs de votre marque',
      'Livraison coordonnée à la date souhaitée',
      'Interlocuteur dédié',
      'Suivi de commande',
    ],
    featured: true,
    waMsg: 'Bonjour, je suis intéressée par le Pack Entreprise B2B (dès 20 boxs). Occasion : \nQuantité souhaitée : \nBudget :',
  },
  {
    icon:     Crown,
    badge:    'Premium',
    qty:      'À partir de 50 boxs',
    title:    'Pack Grand Compte',
    subtitle: 'Pour les grands événements et cadeaux VIP',
    features: [
      'Boxs entièrement personnalisées',
      'Branding entreprise complet',
      'Livraison multi-sites possible',
      'Tarif préférentiel volume',
      'Suivi de commande dédié',
      'Support prioritaire',
    ],
    featured: false,
    waMsg: 'Bonjour, je suis intéressée par le Pack Grand Compte B2B (dès 50 boxs). Occasion : \nQuantité souhaitée : \nBudget :',
  },
]

const STEPS = [
  { num: '01', title: 'Vous nous contactez',   desc: 'Via WhatsApp avec votre occasion, quantité et budget approximatif.' },
  { num: '02', title: 'On vous propose',        desc: 'Une sélection de boxs adaptée à votre événement sous 48h.' },
  { num: '03', title: 'Vous validez',           desc: 'Le bon de commande et on commence la préparation immédiatement.' },
  { num: '04', title: 'Livraison',              desc: 'À la date souhaitée, partout au Maroc, prêtes à offrir.' },
]

const TESTIMONIALS = [
  { text: '"Nous avons commandé 30 boxs pour la Journée de la Femme. L\'équipe a été réactive, les boxs magnifiquement présentées et nos collaboratrices ont adoré. On renouvelle l\'expérience cette année !"', name: 'Sarah M.', role: 'Directrice des Ressources Humaines', company: 'Entreprise de services · Casablanca' },
  { text: '"Cadeau original et de grande qualité pour nos clients VIP en fin d\'année. Le packaging est très soigné, la livraison parfaitement coordonnée. Exactement ce qu\'on cherchait."', name: 'Karim B.', role: 'Directeur Commercial', company: 'Groupe financier · Rabat' },
]

const FAQS = [
  { q: 'Quel est le minimum de commande ?',                      a: 'Notre minimum est de 5 boxs pour le Pack Découverte. Pour les Packs Entreprise et Grand Compte, le minimum est respectivement de 20 et 50 boxs.' },
  { q: 'Comment obtenir un devis ?',                             a: 'Contactez-nous sur WhatsApp avec votre occasion, la quantité souhaitée et vos besoins de personnalisation. On vous répond avec un devis détaillé sous 48h.' },
  { q: 'Peut-on personnaliser les boxs avec notre logo ?',       a: 'Oui, à partir du Pack Entreprise. On peut intégrer votre branding sur l\'emballage, ajouter une carte message personnalisée et adapter la sélection de produits à votre image.' },
  { q: 'Quels sont les délais pour les commandes groupées ?',    a: 'Les délais varient selon la quantité et la personnalisation. On vous communique un délai précis lors du devis. Nous vous recommandons de nous contacter au moins 2 semaines avant votre événement.' },
  { q: 'Livrez-vous partout au Maroc ?',                         a: 'Oui, partout au Maroc depuis Rabat. Pour les Packs Grand Compte, la livraison multi-sites est possible.' },
]

type B2BTestimonial = { text: string; name: string; role: string; company: string }
type B2BProps = { title?: string; subtitle?: string; testimonials?: B2BTestimonial[] }

export function B2BClient({ title, subtitle, testimonials: testimonialsOverride }: B2BProps = {}) {
  const testimonialsData = (testimonialsOverride && testimonialsOverride.length > 0) ? testimonialsOverride : TESTIMONIALS
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <main>

      {/* ── HERO ── */}
      <section className="bg-dark-gradient pt-32 pb-20 px-5 min-h-[80vh] flex items-center relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(233,30,140,.18) 0%,transparent 70%)' }} />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">

          {/* Gauche — texte */}
          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden:{}, visible:{ transition:{ staggerChildren:.12, delayChildren:.1 } } }}
          >
            {[
              <SectionBadge key="badge" light>Cadeaux d'entreprise</SectionBadge>,
              <h1 key="h1" className="font-playfair font-bold italic text-white my-4" style={{ fontSize:'clamp(2.5rem,5.5vw,4.5rem)' }}>
                {title ?? <>Fini les cadeaux<br /><span className="gradient-text">génériques</span></>}
              </h1>,
              <p key="sub" className="text-white/60 text-base max-w-md leading-relaxed mb-8">
                {subtitle ?? "Offrez à vos collaboratrices un cadeau qui leur ressemble vraiment. Boxs soins personnalisables pour tous vos événements d'entreprise."}
              </p>,
              <div key="stats" className="flex flex-wrap gap-5 mb-9">
                {[
                  { val: '5+',   label: 'Dès 5 boxs' },
                  { val: '48h',  label: 'Devis sous 48h' },
                  { val: '100%', label: 'Personnalisable' },
                ].map(s => (
                  <div key={s.label} className="text-center">
                    <div className="font-playfair font-black gradient-text text-3xl leading-none">{s.val}</div>
                    <div className="text-white/40 text-[10px] uppercase tracking-widest mt-1">{s.label}</div>
                  </div>
                ))},
              </div>,
              <div key="ctas" className="flex flex-wrap gap-3">
                <GradientButton href={waUrl('Bonjour, je souhaite un devis B2B.\nOccasion :\nQuantité :\nBudget :')} size="lg" external>
                  <MessageCircle className="w-4 h-4" /> Demander un devis
                </GradientButton>
                <GradientButton href="#offres" variant="ghost" size="lg">Voir les offres</GradientButton>
              </div>,
            ].map((el, i) => (
              <motion.div key={i} variants={{ hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:.75, ease:[.34,1.56,.64,1] } } }}>
                {el}
              </motion.div>
            ))}
          </motion.div>

          {/* Droite — occasions */}
          <motion.div
            initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:.85, delay:.4, ease:[.34,1.56,.64,1] }}
            className="flex flex-col gap-3"
          >
            {OCCASIONS.map((o, i) => (
              <motion.div key={o.title}
                initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
                transition={{ duration:.6, delay: .5 + i * .08, ease:[.34,1.56,.64,1] }}
                className="flex items-center gap-4 bg-white/6 border border-white/8 rounded-2xl px-5 py-4 backdrop-blur-sm hover:bg-white/10 hover:border-white/15 transition-all duration-200"
              >
                <span className="text-2xl flex-shrink-0">{o.emoji}</span>
                <div>
                  <p className="text-white font-semibold text-sm">{o.title}</p>
                  <p className="text-white/45 text-[12px]">{o.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── PROBLÈME / SOLUTION ── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12 max-w-xl mx-auto">
            <SectionBadge>Pourquoi Glow Up Box ?</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              Un cadeau qui <span className="gradient-text">a du sens</span>
            </h2>
            <p className="text-brand-gray text-sm mt-3 leading-relaxed">
              Chaque collaboratrice mérite un cadeau pensé pour elle. Nos boxs soins combinent bien-être, qualité et originalité — le trifecta du cadeau d'entreprise réussi.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Comparaison — dark card à GAUCHE (comme le HTML) */}
            <ScrollReveal>
              <div className="bg-dark-gradient rounded-3xl p-8">
                <p className="text-[11px] font-bold uppercase tracking-widest text-white/40 mb-5">Cadeau type vs Glow Up Box</p>
                <div className="space-y-3">
                  {[
                    { label: 'Agenda générique',      ok: false },
                    { label: 'Stylo corporate',        ok: false },
                    { label: 'Box soin personnalisée', ok: true  },
                  ].map(item => (
                    <div key={item.label} className={`flex items-center gap-3 p-4 rounded-2xl ${
                      item.ok
                        ? 'bg-brand-gradient/10 border border-[rgba(233,30,140,.3)]'
                        : 'bg-white/5 border border-white/8'
                    }`}>
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${item.ok ? 'bg-brand-gradient' : 'bg-white/10'}`}>
                        {item.ok
                          ? <CheckCircle className="w-3.5 h-3.5 text-white" />
                          : <span className="text-white/40 text-xs font-bold">✕</span>}
                      </div>
                      <span className={`text-sm font-medium ${item.ok ? 'text-coral' : 'text-white/30 line-through'}`}>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Points clés — à DROITE (comme le HTML) */}
            <ScrollReveal delay={0.1}>
              <div className="space-y-5">
                {[
                  { icon: Star,        title: 'Produits de qualité premium', desc: 'Soins sélectionnés pour leur efficacité et leur formulation.' },
                  { icon: Package,     title: 'Packaging élégant',            desc: 'Présentation soignée, prête à offrir — impression garantie.' },
                  { icon: CheckCircle, title: 'Gestion simplifiée',           desc: "On s'occupe de tout : sélection, préparation et livraison coordonnée." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4 items-start p-5 rounded-2xl border border-gray-100 hover:border-[rgba(233,30,140,.2)] hover:shadow-[0_8px_24px_rgba(233,30,140,.06)] transition-all duration-300">
                    <div className="w-10 h-10 rounded-xl bg-soft-pink flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-fuchsia" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-brand-black text-sm mb-1">{title}</h4>
                      <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── OFFRES ── */}
      <section id="offres" className="py-20 px-5 bg-soft-pink">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14">
            <SectionBadge>Nos offres</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              Choisissez votre <span className="gradient-text">pack</span>
            </h2>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PACKS.map((pack, i) => {
              const Icon = pack.icon
              return (
                <ScrollReveal key={pack.title} delay={i * 0.1}>
                  <motion.div
                    whileHover={{ y: pack.featured ? -12 : -6 }}
                    className={`rounded-3xl overflow-hidden flex flex-col h-full ${
                      pack.featured
                        ? 'bg-dark-gradient border-2 border-[rgba(233,30,140,.4)] shadow-[0_24px_60px_rgba(233,30,140,.2)]'
                        : 'bg-white border border-gray-100 shadow-sm'
                    }`}
                  >
                    <div className="p-8 flex-1 flex flex-col">
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-6">
                        <span className={`inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full ${
                          pack.featured
                            ? 'bg-brand-gradient text-white'
                            : 'bg-[rgba(233,30,140,.08)] text-fuchsia'
                        }`}>
                          {pack.featured && <Star className="w-3 h-3 fill-white" />}
                          {pack.badge}
                        </span>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pack.featured ? 'bg-white/10' : 'bg-soft-pink'}`}>
                          <Icon className={`w-5 h-5 ${pack.featured ? 'text-coral' : 'text-fuchsia'}`} />
                        </div>
                      </div>

                      <p className={`text-[11px] font-bold uppercase tracking-widest mb-2 ${pack.featured ? 'text-coral' : 'text-fuchsia'}`}>{pack.qty}</p>
                      <h3 className={`font-playfair font-bold italic text-2xl mb-1 ${pack.featured ? 'text-white' : 'text-brand-black'}`}>{pack.title}</h3>
                      <p className={`text-sm mb-6 ${pack.featured ? 'text-white/55' : 'text-brand-gray'}`}>{pack.subtitle}</p>

                      <ul className="space-y-2.5 flex-1 mb-8">
                        {pack.features.map(f => (
                          <li key={f} className="flex items-start gap-2.5">
                            <CheckCircle className={`w-4 h-4 flex-shrink-0 mt-0.5 ${pack.featured ? 'text-coral' : 'text-fuchsia'}`} />
                            <span className={`text-sm ${pack.featured ? 'text-white/75' : 'text-brand-gray'}`}>{f}</span>
                          </li>
                        ))}
                      </ul>

                      <GradientButton
                        href={waUrl(pack.waMsg)} size="sm" external
                        className="w-full justify-center"
                        variant={pack.featured ? 'gradient' : 'outline'}
                      >
                        <MessageCircle className="w-4 h-4" />
                        Demander un devis
                      </GradientButton>
                    </div>
                  </motion.div>
                </ScrollReveal>
              )
            })}
          </div>

          <ScrollReveal delay={0.2} className="text-center mt-8">
            <p className="text-brand-gray text-sm leading-relaxed max-w-xl mx-auto">
              Tous nos tarifs sont sur devis personnalisé. Contactez-nous avec votre occasion, la quantité souhaitée et vos besoins — on vous répond sous 48h.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* ── PROCESSUS TIMELINE ── */}
      <section className="bg-dark-gradient py-20 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 50% 0%,rgba(233,30,140,.15) 0%,transparent 60%)' }} />
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal className="text-center mb-14">
            <SectionBadge light>Simple & rapide</SectionBadge>
            <h2 className="font-playfair font-bold text-white mt-2" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              De votre besoin à <span className="gradient-text">la livraison</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <ScrollReveal key={s.num} delay={i * 0.1}>
                <div className="relative">
                  {i < STEPS.length - 1 && (
                    <div className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-fuchsia/30 to-transparent z-10" />
                  )}
                  <div className="bg-white/6 border border-white/8 rounded-2xl p-6 backdrop-blur-sm h-full">
                    <div className="font-playfair font-black italic gradient-text text-3xl mb-4">{s.num}</div>
                    <h4 className="text-white font-semibold text-sm mb-2">{s.title}</h4>
                    <p className="text-white/50 text-[13px] leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── TÉMOIGNAGES ── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Ils nous font confiance</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
              Ce qu'ils en <span className="gradient-text">disent</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonialsData.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-soft-pink rounded-3xl p-8 border border-[rgba(233,30,140,.08)] hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex gap-0.5 mb-5">
                    {[...Array(5)].map((_, j) => <Star key={j} className="w-4 h-4 fill-[#FFB347] text-[#FFB347]" />)}
                  </div>
                  <p className="text-brand-gray text-sm leading-relaxed italic mb-6">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {t.name[0]}
                    </div>
                    <div>
                      <p className="font-semibold text-brand-black text-sm">{t.name}</p>
                      <p className="text-brand-gray text-xs">{t.role}</p>
                      <p className="text-brand-gray/60 text-xs">{t.company}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="bg-soft-pink py-20 px-5">
        <div className="max-w-2xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>FAQ</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>
              Vos questions <span className="gradient-text">B2B</span>
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.04}>
                <div className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} aria-expanded={openFaq === i}
                    className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-semibold text-brand-black hover:text-fuchsia transition-colors min-h-[56px] cursor-pointer">
                    <span className="text-[15px]">{faq.q}</span>
                    <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration:.25 }} className="flex-shrink-0">
                      <ChevronDown className="w-5 h-5 text-fuchsia" />
                    </motion.div>
                  </button>
                  <AnimatePresence initial={false}>
                    {openFaq === i && (
                      <motion.div key="a" initial={{ height:0, opacity:0 }} animate={{ height:'auto', opacity:1 }} exit={{ height:0, opacity:0 }} transition={{ duration:.3, ease:[.25,.46,.45,.94] }} className="overflow-hidden">
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
      <section className="bg-brand-gradient py-20 px-5 text-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-52 -left-24 rounded-full bg-white/6 pointer-events-none" />
        <div className="absolute w-72 h-72 -bottom-24 -right-12 rounded-full bg-white/6 pointer-events-none" />
        <ScrollReveal className="relative z-10">
          <span className="inline-flex items-center gap-2 bg-white/15 text-white text-[10px] font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <Clock className="w-3 h-3" /> Devis gratuit · Réponse sous 48h
          </span>
          <h2 className="font-playfair font-bold italic text-white mb-3" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
            Parlons de votre projet
          </h2>
          <p className="text-white/75 max-w-md mx-auto text-sm leading-relaxed mb-10">
            Dites-nous l'occasion, la quantité souhaitée et votre budget. On s'occupe du reste et vous répond sous 48h.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href={waUrl('Bonjour, je souhaite un devis pour des boxs cadeaux d\'entreprise.\nOccasion :\nQuantité :\nBudget :')} variant="white" size="lg" external>
              <MessageCircle className="w-5 h-5" /> Demander un devis gratuit
            </GradientButton>
            <GradientButton href="#offres" variant="ghost" size="lg">
              Voir les offres <ArrowRight className="w-4 h-4" />
            </GradientButton>
          </div>
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            {[['5+','Dès 5 boxs'],['48h','Devis garanti'],['100%','Personnalisable']].map(([v,l]) => (
              <div key={l} className="text-center">
                <div className="font-playfair font-black text-white text-3xl">{v}</div>
                <div className="text-white/45 text-[10px] uppercase tracking-widest mt-1">{l}</div>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </section>

    </main>
  )
}
