import { notFound }    from 'next/navigation'
import { prisma }      from '@/lib/db'
import { motion }      from 'framer-motion'
import { MessageCircle, CheckCircle, Heart, Star, ArrowRight } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'
import type { Box }       from '@prisma/client'

export const dynamic = 'force-dynamic'

const SUIVIS = [
  { icon: MessageCircle, title: 'Réponse sous 24h',       desc: 'Chaque question sur WhatsApp reçoit une réponse personnelle — pas de bot.' },
  { icon: CheckCircle,   title: 'Ajustement de routine',  desc: "Si ta peau réagit différemment, on adapte avec toi." },
  { icon: Star,          title: 'Fiche routine offerte',  desc: "Ordre d'application, fréquence conseillée et astuces pour optimiser tes résultats." },
]

const TESTIMONIALS = [
  { text: '"J\'ai reçu ma box et le suivi WhatsApp a tout changé. Les résultats sont visibles en 3 semaines !"',         name: 'Sara M.',    meta: 'Casablanca' },
  { text: '"La recommandation était parfaitement adaptée à ma peau. Je recommande à toutes mes amies !"',               name: 'Nadia B.',   meta: 'Rabat' },
  { text: '"Simple, efficace et humain. On sent vraiment qu\'elles connaissent leurs produits."',                       name: 'Imane K.',   meta: 'Marrakech' },
]

export default async function BoxDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  let box: Box | null = null
  let related: Box[]  = []

  try {
    box = await prisma.box.findUnique({ where: { slug } })
    if (!box) notFound()
    related = await prisma.box.findMany({
      where:   { active: true, slug: { not: slug } },
      orderBy: { order: 'asc' },
      take:    3,
    })
  } catch {
    notFound()
  }

  if (!box) notFound()

  const products: string[] = (() => { try { return JSON.parse(box.products) } catch { return [] } })()

  return (
    <main>

      {/* ① HERO TITRE */}
      <section className="bg-dark-gradient pt-40 pb-20 px-5 relative overflow-hidden text-center">
        <div className="absolute -top-1/5 -right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(233,30,140,.18) 0%,transparent 70%)' }} />
        <div className="max-w-3xl mx-auto relative z-10">
          <p className="text-white/40 text-[11px] uppercase tracking-widest mb-5 flex items-center justify-center gap-2">
            <a href="/" className="hover:text-coral transition-colors">Accueil</a>
            <span>›</span>
            <a href="/boxs" className="hover:text-coral transition-colors">Boxs</a>
            <span>›</span>
            <span className="text-white/65">{box.name}</span>
          </p>
          <span className="inline-flex items-center bg-[rgba(233,30,140,.15)] border border-[rgba(233,30,140,.28)] text-coral px-5 py-2 rounded-full text-[10px] font-semibold uppercase tracking-widest mb-6">
            {box.tag || box.skinLabel}
          </span>
          <h1 className="font-playfair font-bold italic text-white mb-5" style={{ fontSize:'clamp(2.8rem,6vw,5.5rem)' }}>
            <span className="gradient-text">{box.name}</span>
          </h1>
          <p className="text-white/55 text-base max-w-lg mx-auto leading-relaxed">{box.accroche || box.description}</p>
        </div>
      </section>

      {/* ② SHOWCASE */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-[5fr_7fr] gap-12 items-start">

          {/* Image */}
          <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_24px_72px_rgba(26,26,46,.1)] relative group">
            <span className="absolute top-5 left-5 z-10 bg-brand-gradient text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">
              {box.skinLabel}
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={box.image ?? '/images/peau-sensible.jpg'} alt={box.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
          </div>

          {/* Card 2 colonnes */}
          <div className="rounded-3xl overflow-hidden border border-[rgba(233,30,140,.08)] shadow-[0_12px_40px_rgba(26,26,46,.06)]">
            <div className="px-8 py-5 bg-brand-black flex items-center justify-between">
              <h2 className="font-playfair font-bold italic text-white text-2xl">{box.name}</h2>
              <span className="bg-[rgba(233,30,140,.15)] text-coral text-[9px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Box K-Beauty</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2">
              {/* Gauche */}
              <div className="p-8 bg-white border-r border-[rgba(233,30,140,.07)]">
                <p className="text-fuchsia text-[9px] font-bold uppercase tracking-widest mb-2 opacity-70">La box</p>
                <p className="font-playfair font-bold italic text-brand-black text-xl leading-snug mb-3">{box.accroche || box.description.split('.')[0]}</p>
                <p className="text-brand-gray text-[13px] leading-relaxed mb-5">{box.description}</p>
                <p className="text-fuchsia text-[9px] font-bold uppercase tracking-widest mb-3 opacity-70">Inclus dans toutes les boxs</p>
                <ul className="space-y-2">
                  {['Accessoires offerts','Fiche routine personnalisée','Suivi WhatsApp 1 mois','Livraison Maroc'].map(item => (
                    <li key={item} className="flex items-center gap-2 text-[13px] text-brand-gray">
                      <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)' }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {/* Droite */}
              <div className="p-8 bg-soft-pink">
                <p className="text-fuchsia text-[9px] font-bold uppercase tracking-widest mb-3 opacity-70">Produits inclus</p>
                <ul className="space-y-2 mb-5">
                  {products.map(p => (
                    <li key={p} className="flex items-start gap-2 pb-2 border-b border-[rgba(233,30,140,.08)] last:border-0">
                      <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)' }} />
                      <span className="text-[13px] text-brand-black font-medium leading-snug">{p}</span>
                    </li>
                  ))}
                </ul>
                <div className="bg-white rounded-2xl p-4 mb-5 border border-[rgba(233,30,140,.08)]">
                  <p className="font-playfair font-bold gradient-text text-3xl">[PRIX] DH</p>
                  <p className="text-brand-gray text-[11px] mt-1">Prix communiqué après bilan peau gratuit</p>
                </div>
                <div className="space-y-2.5">
                  <GradientButton href={waUrl(box.waMessage)} size="sm" external className="w-full justify-center">
                    <MessageCircle className="w-4 h-4" />Je veux cette box
                  </GradientButton>
                  <GradientButton href="/conseil-peau" variant="outline" size="sm" className="w-full justify-center">
                    <Star className="w-3.5 h-3.5" />Faire mon bilan d'abord
                  </GradientButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ③ BANDE INCLUS */}
      <div className="bg-brand-black">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/7 max-w-6xl mx-auto">
          {[
            { title:'Produits soins',      items: products },
            { title:'Accessoires offerts', items: ['🎁 2 accessoires surprise','Découvrez-les à la réception ✨'] },
            { title:'Bonus inclus',        items: ['Fiche routine personnalisée','Suivi WhatsApp 1 mois','Conseil d\'utilisation détaillé'] },
          ].map(col => (
            <div key={col.title} className="px-10 py-12">
              <div className="w-12 h-12 rounded-2xl bg-[rgba(233,30,140,.15)] flex items-center justify-center mb-5">
                <Heart className="w-5 h-5 text-fuchsia" />
              </div>
              <p className="text-white/40 text-[11px] font-bold uppercase tracking-widest mb-4">{col.title}</p>
              <ul className="space-y-2">
                {col.items.map(item => (
                  <li key={item} className="flex items-start gap-2 text-white/65 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0" style={{ background:'linear-gradient(135deg,#E91E8C,#FFB347)' }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* ④ PRODUITS */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal>
            <SectionBadge>Les produits</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3.5rem)' }}>
              Ce que contient ta <span className="gradient-text">{box.name}</span>
            </h2>
          </ScrollReveal>
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {products.map((p, i) => (
              <ScrollReveal key={p} delay={i * 0.1}>
                <div className="flex items-start gap-4 p-5 bg-soft-pink rounded-2xl border border-[rgba(233,30,140,.08)]">
                  <span className="font-playfair font-black italic gradient-text text-2xl w-8 flex-shrink-0">{String(i+1).padStart(2,'0')}</span>
                  <div>
                    <h3 className="font-playfair font-bold italic text-brand-black text-lg mb-1">{p}</h3>
                    <p className="text-brand-gray text-sm leading-relaxed">Produit K-Beauty authentique sélectionné pour votre type de peau.</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑤ SUIVI 1 MOIS */}
      <section className="bg-soft-pink py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Accompagnement</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
              Le suivi <span className="gradient-text">1 mois</span> inclus
            </h2>
            <p className="text-brand-gray text-sm max-w-md mx-auto mt-3 leading-relaxed">
              On ne t'envoie pas juste une box. On reste là pour t'aider à l'utiliser correctement.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {SUIVIS.map(({ icon: Icon, title, desc }, i) => (
              <ScrollReveal key={title} delay={i * 0.1}>
                <div className="bg-white rounded-3xl p-8 border border-[rgba(233,30,140,.08)] hover:-translate-y-1.5 hover:shadow-[0_24px_48px_rgba(233,30,140,.1)] transition-all duration-300">
                  <div className="w-12 h-12 rounded-2xl bg-[rgba(233,30,140,.08)] flex items-center justify-center mb-5">
                    <Icon className="w-5 h-5 text-fuchsia" />
                  </div>
                  <h3 className="font-playfair font-bold italic text-brand-black text-xl mb-3">{title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed">{desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑥ TÉMOIGNAGES */}
      <section className="bg-white py-20 px-5">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-12">
            <SectionBadge>Avis clients</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
              Ce qu'elles en <span className="gradient-text">pensent</span>
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="bg-soft-pink rounded-3xl p-7 border border-[rgba(233,30,140,.08)] hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex gap-0.5 mb-4">
                    {[...Array(5)].map((_,j) => <Star key={j} className="w-3.5 h-3.5 fill-[#FFB347] text-[#FFB347]" />)}
                  </div>
                  <p className="text-brand-gray text-sm leading-relaxed italic mb-6">{t.text}</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-gradient flex items-center justify-center text-white font-bold text-sm flex-shrink-0">{t.name[0]}</div>
                    <div>
                      <p className="font-semibold text-brand-black text-sm">{t.name}</p>
                      <p className="text-brand-gray text-xs mt-0.5">{t.meta}</p>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ⑦ CROSS-SELL */}
      {related.length > 0 && (
        <section className="bg-soft-pink py-20 px-5">
          <div className="max-w-5xl mx-auto">
            <ScrollReveal className="text-center mb-12">
              <SectionBadge>Découvrir aussi</SectionBadge>
              <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
                D'autres boxs qui pourraient <span className="gradient-text">te plaire</span>
              </h2>
            </ScrollReveal>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map((b, i) => (
                <ScrollReveal key={b.slug} delay={i * 0.1}>
                  <motion.a href={`/boxs/${b.slug}`} whileHover={{ y: -6 }}
                    className="block bg-white rounded-3xl overflow-hidden border border-[rgba(233,30,140,.08)] hover:shadow-[0_24px_48px_rgba(233,30,140,.12)] transition-shadow duration-300">
                    <div className="h-36 relative overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={b.image ?? '/images/peau-sensible.jpg'} alt={b.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="p-5">
                      <p className="text-fuchsia text-[9px] font-bold uppercase tracking-widest mb-1.5">{b.skinLabel}</p>
                      <p className="font-playfair font-bold italic text-brand-black text-lg mb-3">{b.name}</p>
                      <span className="flex items-center gap-1 text-fuchsia text-[11px] font-bold uppercase tracking-wide">
                        Voir la box <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </motion.a>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ⑧ CTA FINAL */}
      <section className="bg-brand-gradient py-20 px-5 text-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-52 -left-24 rounded-full bg-white/6 pointer-events-none" />
        <ScrollReveal className="relative z-10">
          <p className="text-white/70 text-[11px] font-bold uppercase tracking-widest mb-4">Prête ?</p>
          <h2 className="font-playfair font-bold italic text-white mb-3" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
            Commande ta {box.name}
          </h2>
          <p className="text-white/75 max-w-sm mx-auto text-sm leading-relaxed mb-10">
            Dis-nous que tu veux cette box — on te confirme le tarif et on prépare ta commande.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href={waUrl(box.waMessage)} variant="white" size="lg" external>
              <MessageCircle className="w-4 h-4" />Je veux cette box
            </GradientButton>
            <GradientButton href="/conseil-peau" variant="ghost" size="lg">Faire mon bilan d'abord</GradientButton>
          </div>
        </ScrollReveal>
      </section>

    </main>
  )
}
