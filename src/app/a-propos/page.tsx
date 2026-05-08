'use client'

import { useRef }  from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CheckCircle, Heart, Star, Award, Instagram } from 'lucide-react'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { waUrl }          from '@/lib/utils'

const STATS = [
  { value: '200+', label: 'Clientes satisfaites' },
  { value: '4.9★', label: 'Note moyenne' },
  { value: '3 ans', label: "D'expertise K-Beauty" },
  { value: '100%', label: 'Bilan peau gratuit' },
]

const VALEURS = [
  {
    icon: Star,
    title: 'Authenticité',
    desc:  "Chaque produit est rigoureusement sélectionné pour son efficacité et son authenticité. Pas de copie, pas de compromis — uniquement des formules K-Beauty approuvées.",
    tag:   'Produits 100% originaux',
  },
  {
    icon: Award,
    title: 'Expertise',
    desc:  "Le bilan peau gratuit n'est pas une formalité — c'est le cœur de notre service. Chaque recommandation est pensée pour votre type de peau, vos problématiques et votre routine.",
    tag:   'Conseil personnalisé gratuit',
  },
  {
    icon: Heart,
    title: 'Proximité',
    desc:  "On reste à vos côtés pendant 1 mois après chaque commande. Questions, ajustements, doutes — on est là sur WhatsApp. Parce qu'une belle peau se construit dans la durée.",
    tag:   'Suivi 1 mois inclus',
  },
]

const ENGAGEMENTS = [
  { num: '01', title: 'Produits 100% authentiques',   desc: "Nous sourçons directement auprès de fournisseurs vérifiés. Chaque produit est contrôlé avant d'entrer dans une box. Jamais de contrefaçon, jamais de doute." },
  { num: '02', title: 'Conseil personnalisé gratuit', desc: "Aucune box n'est envoyée sans bilan peau. C'est notre différence fondamentale. On recommande ce qui est bon pour votre peau — pas ce qui est le plus vendu." },
  { num: '03', title: 'Livraison partout au Maroc',   desc: 'De Tanger à Laâyoune, on livre dans toutes les villes marocaines. Délais communiqués à la commande. Emballage soigné, protection maximale.' },
  { num: '04', title: 'Suivi 1 mois WhatsApp',        desc: "Après livraison, on reste disponibles pendant 30 jours. Votre peau évolue, votre routine aussi — on vous accompagne dans cette évolution." },
]

export default function AProposPage() {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const imgY = useTransform(scrollYProgress, [0, 1], [0, -60])

  return (
    <main>

      {/* ── HERO SPLIT ── */}
      <section ref={heroRef} className="bg-dark-gradient pt-32 pb-20 px-5 min-h-[90vh] flex items-center relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(233,30,140,.18) 0%,transparent 70%)' }} />
        <div className="absolute -bottom-[10%] left-0 w-80 h-80 rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle,rgba(255,179,71,.08) 0%,transparent 70%)', filter: 'blur(60px)' }} />

        <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">

          {/* Texte */}
          <motion.div
            initial="hidden" animate="visible"
            variants={{ hidden:{}, visible:{ transition:{ staggerChildren:.12, delayChildren:.1 } } }}
          >
            {[
              <p key="bc" className="text-white/40 text-[11px] uppercase tracking-widest mb-5 flex items-center gap-2">
                <a href="/" className="hover:text-coral transition-colors">Accueil</a>
                <span>›</span>
                <span className="text-white/65">À Propos</span>
              </p>,
              <span key="badge" className="inline-flex items-center gap-2 bg-[rgba(233,30,140,.12)] border border-[rgba(233,30,140,.25)] text-coral px-4 py-2 rounded-full text-[11px] font-semibold uppercase tracking-widest mb-6">
                <span className="w-2 h-2 rounded-full bg-fuchsia" />
                Fondée à Rabat · K-Beauty authentique
              </span>,
              <h1 key="h1" className="font-playfair font-bold italic text-white mb-5" style={{ fontSize:'clamp(2.5rem,5.5vw,4.5rem)' }}>
                Notre histoire,<br /><span className="gradient-text">votre beauté</span>
              </h1>,
              <p key="sub" className="text-white/60 text-base max-w-md leading-relaxed mb-9">
                Glow Up Box est née d'une passion simple : rendre les soins coréens accessibles à toutes les femmes marocaines, avec un conseil honnête et personnalisé.
              </p>,
              <div key="ctas" className="flex flex-wrap gap-3">
                <GradientButton href="/conseil-peau" size="md"><Heart className="w-4 h-4" />Mon bilan gratuit</GradientButton>
                <GradientButton href="/boxs" variant="ghost" size="md">Découvrir les boxs</GradientButton>
              </div>,
            ].map((el, i) => (
              <motion.div key={i} variants={{ hidden:{ opacity:0, y:30 }, visible:{ opacity:1, y:0, transition:{ duration:.75, ease:[.34,1.56,.64,1] } } }}>
                {el}
              </motion.div>
            ))}
          </motion.div>

          {/* Image + floating quote */}
          <motion.div
            style={{ y: imgY }}
            initial={{ opacity:0, x:40 }} animate={{ opacity:1, x:0 }}
            transition={{ duration:.9, delay:.35, ease:[.34,1.56,.64,1] }}
            className="relative hidden lg:block"
          >
            <div className="rounded-3xl overflow-hidden aspect-[3/4] shadow-[0_40px_80px_rgba(0,0,0,.4)]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Fondatrice Glow Up Box avec produits K-Beauty" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background:'linear-gradient(to top,rgba(26,26,46,.5) 0%,transparent 50%)' }} />
            </div>
            <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }}
              className="absolute -bottom-6 -left-8 bg-white rounded-2xl p-5 shadow-[0_20px_48px_rgba(0,0,0,.15)] max-w-[260px]">
              <p className="text-brand-gray text-[13px] italic leading-relaxed mb-2">
                "Chaque peau est unique. C'est pourquoi chaque conseil l'est aussi."
              </p>
              <p className="text-fuchsia text-[11px] font-bold">— Fondatrice, Glow Up Box</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── HISTOIRE ── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <ScrollReveal direction="left">
            <div className="rounded-3xl overflow-hidden aspect-[4/3] relative shadow-[0_24px_72px_rgba(26,26,46,.1)] group">
              <span className="absolute top-5 left-5 z-10 bg-brand-gradient text-white text-[9px] font-bold uppercase tracking-widest px-4 py-2 rounded-full">Depuis 2022</span>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Produits K-Beauty Glow Up Box" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={0.15}>
            <SectionBadge>Notre histoire</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2 mb-5" style={{ fontSize:'clamp(1.8rem,3.5vw,3rem)' }}>
              Née d'une frustration, <span className="gradient-text">construite avec passion</span>
            </h2>
            <p className="text-brand-gray text-sm leading-relaxed mb-5">
              En 2022, notre fondatrice cherchait des soins coréens adaptés à sa peau mixte sensible. Elle s'est retrouvée face à une multitude de produits importés, sans conseil, sans garantie d'authenticité, sans accompagnement.
            </p>
            <div className="bg-soft-pink border-l-4 border-fuchsia rounded-r-2xl pl-5 pr-4 py-4 mb-5">
              <p className="text-brand-black font-playfair italic text-lg leading-relaxed">
                "Je voulais une K-Beauty honnête — des produits vrais, un conseil sincère et un suivi qui dure au-delà de la commande."
              </p>
              <cite className="text-fuchsia text-[12px] font-bold mt-2 block not-italic">— Fondatrice, Glow Up Box</cite>
            </div>
            <p className="text-brand-gray text-sm leading-relaxed mb-7">
              Glow Up Box est née de cette conviction : toute femme mérite une routine qui lui ressemble. Aujourd'hui, plus de 200 clientes nous font confiance pour leur peau.
            </p>
            <GradientButton href="/conseil-peau" size="md">
              Commencer mon bilan <CheckCircle className="w-4 h-4" />
            </GradientButton>
          </ScrollReveal>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <div className="bg-dark-gradient py-14 px-5 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background:'radial-gradient(ellipse at 50% 50%,rgba(233,30,140,.12) 0%,transparent 60%)' }} />
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 relative z-10">
          {STATS.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="font-playfair font-black gradient-text" style={{ fontSize:'clamp(2rem,4vw,3rem)' }}>{s.value}</div>
              <div className="text-white/45 text-[11px] font-semibold uppercase tracking-wider mt-1">{s.label}</div>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* ── VALEURS ── */}
      <section className="py-20 px-5 bg-soft-pink">
        <div className="max-w-5xl mx-auto">
          <ScrollReveal className="text-center mb-14 max-w-xl mx-auto">
            <SectionBadge>Nos valeurs</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              Ce qui nous guide <span className="gradient-text">chaque jour</span>
            </h2>
            <p className="text-brand-gray text-sm mt-3 leading-relaxed">Trois principes fondateurs qui orientent chaque décision, chaque box, chaque conseil.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {VALEURS.map(({ icon: Icon, title, desc, tag }, i) => (
              <ScrollReveal key={title} delay={i * 0.12}>
                <motion.div whileHover={{ y:-8, boxShadow:'0 24px 48px rgba(233,30,140,.1)' }}
                  className="bg-white rounded-3xl p-8 border border-[rgba(233,30,140,.08)] transition-shadow duration-300 cursor-default h-full flex flex-col">
                  <div className="w-14 h-14 rounded-2xl bg-[rgba(233,30,140,.08)] flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-fuchsia" />
                  </div>
                  <h3 className="font-playfair font-bold italic text-brand-black text-2xl mb-3">{title}</h3>
                  <p className="text-brand-gray text-sm leading-relaxed flex-1 mb-5">{desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-fuchsia text-[11px] font-bold uppercase tracking-wide">
                    <CheckCircle className="w-3.5 h-3.5" />{tag}
                  </span>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGAGEMENTS ── */}
      <section className="py-20 px-5 bg-white">
        <div className="max-w-4xl mx-auto">
          <ScrollReveal className="text-center mb-14 max-w-lg mx-auto">
            <SectionBadge>Nos engagements</SectionBadge>
            <h2 className="font-playfair font-bold text-brand-black mt-2" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              La promesse <span className="gradient-text">Glow Up Box</span>
            </h2>
            <p className="text-brand-gray text-sm mt-3">Quatre engagements concrets qui font la différence.</p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {ENGAGEMENTS.map((e, i) => (
              <ScrollReveal key={e.num} delay={i * 0.1}>
                <motion.div whileHover={{ y:-4 }}
                  className="flex gap-5 p-7 rounded-3xl border border-gray-100 hover:border-[rgba(233,30,140,.2)] hover:shadow-[0_12px_32px_rgba(233,30,140,.07)] transition-all duration-300 cursor-default">
                  <span className="font-playfair font-black italic gradient-text text-3xl leading-none w-9 flex-shrink-0">{e.num}</span>
                  <div>
                    <h4 className="font-semibold text-brand-black text-base mb-2">{e.title}</h4>
                    <p className="text-brand-gray text-sm leading-relaxed">{e.desc}</p>
                  </div>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── FONDATRICE ── */}
      <section className="bg-dark-gradient py-20 px-5 relative overflow-hidden">
        <div className="absolute -top-1/4 -right-[5%] w-[450px] h-[450px] rounded-full pointer-events-none"
          style={{ background:'radial-gradient(circle,rgba(233,30,140,.15) 0%,transparent 70%)' }} />
        <div className="max-w-4xl mx-auto relative z-10">
          <ScrollReveal className="mb-12">
            <SectionBadge light>L'équipe</SectionBadge>
            <h2 className="font-playfair font-bold text-white mt-2" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
              La femme <span className="gradient-text">derrière les boxs</span>
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="bg-white/6 border border-white/10 rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-[auto_1fr] backdrop-blur-sm">
              <div className="w-full md:w-64 h-64 md:h-auto relative overflow-hidden flex-shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="https://images.pexels.com/photos/3762875/pexels-photo-3762875.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Salma Benali, fondatrice de Glow Up Box" className="w-full h-full object-cover" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <h3 className="font-playfair font-bold italic text-white text-3xl mb-1">Salma Benali</h3>
                <span className="text-coral text-[11px] font-bold uppercase tracking-widest mb-5 block">Fondatrice & Experte K-Beauty</span>
                <p className="text-white/60 text-sm leading-relaxed mb-7">
                  Passionnée de cosmétologie coréenne depuis 2019, Salma a fondé Glow Up Box pour partager ce qu'elle a mis des années à apprendre : comment choisir les bons produits pour sa peau.
                </p>
                <div className="flex gap-3">
                  <motion.a href="#" aria-label="Instagram de Salma" whileHover={{ scale:1.1 }} whileTap={{ scale:.95 }}
                    className="w-11 h-11 rounded-full bg-white/8 border border-white/12 flex items-center justify-center hover:bg-fuchsia hover:border-fuchsia transition-all">
                    <Instagram className="w-4 h-4 text-white" />
                  </motion.a>
                  <motion.a href={waUrl('Bonjour Salma !')} target="_blank" rel="noopener" aria-label="WhatsApp"
                    whileHover={{ scale:1.1 }} whileTap={{ scale:.95 }}
                    className="w-11 h-11 rounded-full bg-[#25D366]/15 border border-[#25D366]/25 flex items-center justify-center hover:bg-[#25D366] transition-all">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  </motion.a>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section className="bg-brand-gradient py-20 px-5 text-center relative overflow-hidden">
        <div className="absolute w-[500px] h-[500px] -top-52 -left-24 rounded-full bg-white/6 pointer-events-none" />
        <div className="absolute w-72 h-72 -bottom-24 -right-12 rounded-full bg-white/6 pointer-events-none" />
        <ScrollReveal className="relative z-10">
          <h2 className="font-playfair font-bold italic text-white mb-3" style={{ fontSize:'clamp(2rem,4vw,3.2rem)' }}>
            Prête à découvrir<br /><em className="not-italic">votre routine idéale ?</em>
          </h2>
          <p className="text-white/75 max-w-md mx-auto text-sm leading-relaxed mb-10">
            Commencez par un bilan peau gratuit. En 2 minutes, on connaît votre peau — et on vous conseille honnêtement.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <GradientButton href="/conseil-peau" variant="white" size="lg">
              <Heart className="w-4 h-4" /> Mon bilan gratuit
            </GradientButton>
            <GradientButton href={waUrl('Bonjour Glow Up Box !')} variant="ghost" size="lg" external>WhatsApp direct</GradientButton>
          </div>
          <p className="text-white/40 text-[11px] uppercase tracking-widest mt-8">Disponible 24h/24 · 7j/7 · Livraison Maroc</p>
        </ScrollReveal>
      </section>
    </main>
  )
}
