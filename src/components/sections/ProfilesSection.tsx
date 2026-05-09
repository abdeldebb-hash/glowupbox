'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Link from 'next/link'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const profiles = [
  { emoji: '🌿', type: 'Profil 01', name: 'Peau Sensible', desc: 'Rougeurs, tiraillements, réactivité. Votre peau a besoin de douceur et de protection barrière.' },
  { emoji: '💧', type: 'Profil 02', name: 'Peau Grasse',   desc: 'Brillances, pores dilatés, imperfections. Équilibre et légèreté sont vos alliés.' },
  { emoji: '✨', type: 'Profil 03', name: 'Peau Terne',    desc: 'Manque d\'éclat, teint gris, fatigue visible. La K-Beauty a les solutions pour vous illuminer.' },
  { emoji: '🌙', type: 'Profil 04', name: 'Peau Mixte',   desc: 'Zone T brillante, joues sèches. Votre routine doit équilibrer sans agresser.' },
]

const gridV = { hidden: {}, visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } } }
const cardV = {
  hidden:  { opacity: 0, y: 36, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.65, ease: [0.34, 1.56, 0.64, 1] } },
}

type ProfileItem = { name: string; desc: string }

export function ProfilesSection({ profiles: profilesOverride }: { profiles?: ProfileItem[] } = {}) {
  const profilesData = (profilesOverride && profilesOverride.length > 0)
    ? profiles.map((p, i) => ({ ...p, ...(profilesOverride[i] ?? {}) }))
    : profiles
  const gridRef = useRef(null)
  const inView = useInView(gridRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6 sm:px-10 bg-[#FDF0F5]">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal className="text-center mb-14">
          <SectionBadge className="justify-center">Votre peau, notre priorité</SectionBadge>
          <h2 className="font-playfair font-bold text-[#1A1A2E]" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
            Vous reconnaissez-vous ?
          </h2>
          <p className="text-[#4A4A6A] text-[1.05rem] mt-3 max-w-xl mx-auto leading-relaxed">
            Chaque peau est unique. Identifiez votre profil et recevez une recommandation 100% personnalisée.
          </p>
        </ScrollReveal>

        <motion.div
          ref={gridRef}
          variants={gridV}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {profilesData.map((p) => (
            <ProfileCard key={p.name} {...p} />
          ))}
        </motion.div>

        <ScrollReveal className="text-center mt-12" delay={0.2}>
          <GradientButton href="/conseil-peau">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1 1.2-6.9L2 9.3l6.9-1z"/></svg>
            Faire mon bilan peau gratuit
          </GradientButton>
        </ScrollReveal>
      </div>
    </section>
  )
}

function ProfileCard({ emoji, type, name, desc }: typeof profiles[0]) {
  return (
    <motion.div
      variants={cardV}
      className="bg-white rounded-3xl p-8 text-center cursor-pointer group focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:outline-none"
      whileHover={{ y: -10, boxShadow: '0 28px 56px rgba(233,30,140,0.13)' }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="text-[2.4rem] block mb-4">{emoji}</span>
      <div className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#E91E8C] mb-2">{type}</div>
      <h3 className="font-playfair font-bold text-[#1A1A2E] text-[1.15rem] mb-3">{name}</h3>
      <p className="text-[13.5px] text-[#4A4A6A] leading-relaxed">{desc}</p>
      <Link href="/conseil-peau" className="inline-flex items-center gap-1.5 text-[#E91E8C] text-[12px] font-bold uppercase tracking-wider mt-5 group-hover:gap-3 transition-all">
        Mon bilan
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
      </Link>
    </motion.div>
  )
}
