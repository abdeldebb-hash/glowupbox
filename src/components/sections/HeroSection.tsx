'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Link from 'next/link'
import { waUrl } from '@/lib/utils'

const containerV = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.15 } },
}
const itemV = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.85, ease: [0.34, 1.56, 0.64, 1] } },
}

const floatCards = [
  { label: 'Peau sensible', emoji: '🌿', className: 'top-8 -left-8' },
  { label: 'Éclat & Terne',  emoji: '✨', className: 'top-24 -right-10' },
  { label: 'Peau grasse',   emoji: '💧', className: 'bottom-28 -left-6' },
  { label: 'Anti-âge',      emoji: '🌙', className: 'bottom-14 -right-8' },
]

function Counter({ target }: { target: number }) {
  const [val, setVal] = useState(0)
  const ref = useRef(false)
  const divRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !ref.current) {
        ref.current = true
        const start = performance.now()
        const dur = 2000
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1)
          const ease = 1 - Math.pow(1 - p, 3)
          setVal(Math.floor(ease * target))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    if (divRef.current) obs.observe(divRef.current)
    return () => obs.disconnect()
  }, [target])

  return <span ref={divRef}>{val}+</span>
}

type HeroProps = {
  title?:    string
  subtitle?: string
  cta1?:     string
  cta2?:     string
}

export function HeroSection({ title, subtitle, cta1, cta2 }: HeroProps = {}) {
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const visualY  = useTransform(scrollYProgress, [0, 1], [0, -70])
  const orb1Y    = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#1A1A2E] to-[#2D1B4E] pt-32 pb-20 px-6 sm:px-10">

      {/* Vidéo de fond */}
      <video
        autoPlay muted loop playsInline
        poster="/images/hero-bg.jpg"
        className="absolute inset-0 w-full h-full object-cover opacity-30 pointer-events-none"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(26,26,46,0.75) 0%,rgba(45,27,78,0.6) 50%,rgba(233,30,140,0.12) 100%)' }} />

      {/* Orbs de fond */}
      <motion.div
        className="absolute -top-36 -right-36 w-[600px] h-[600px] rounded-full pointer-events-none"
        animate={{ scale: [1, 1.06, 0.94, 1], opacity: [0.22, 0.28, 0.18, 0.22] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        style={{ background: 'radial-gradient(circle, rgba(233,30,140,0.22) 0%, transparent 70%)', y: orb1Y }}
      />
      <div className="absolute bottom-0 left-[5%] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(255,107,157,0.16) 0%, transparent 70%)', filter: 'blur(60px)' }}
      />

      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-14 items-center relative z-10">

        {/* GAUCHE — texte */}
        <motion.div variants={containerV} initial="hidden" animate="visible">
          <motion.div variants={itemV}>
            <span className="inline-flex items-center gap-2 bg-[rgba(233,30,140,0.15)] border border-[rgba(233,30,140,0.3)] text-[#FF6B9D] px-4 py-2 rounded-full text-[11px] font-bold tracking-widest uppercase mb-6">
              <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 6.2,3.8 10,3.8 7,6.1 8.1,10 5,7.6 1.9,10 3,6.1 0,3.8 3.8,3.8"/></svg>
              K-Beauty · Exclusif Maroc
            </span>
          </motion.div>

          <motion.h1 variants={itemV} className="text-white font-playfair font-black leading-[1.12] mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 3.8rem)' }}>
            {title ?? <>Votre peau mérite<br /><em className="gradient-text not-italic">le meilleur</em><br />de la Corée</>}
          </motion.h1>

          <motion.p variants={itemV} className="text-white/65 text-[1.05rem] leading-relaxed mb-9 max-w-md">
            {subtitle ?? "Bilan peau gratuit, Box personnalisée, livraison partout au Maroc. L'expertise K-Beauty enfin accessible."}
          </motion.p>

          <motion.div variants={itemV} className="flex gap-4 flex-wrap">
            <motion.a
              href="/conseil-peau"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E91E8C] via-[#FF6B9D] to-[#FFB347] text-white text-[13px] font-bold uppercase tracking-wider shadow-[0_8px_24px_rgba(233,30,140,0.35)]"
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(233,30,140,0.5)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1 1.2-6.9L2 9.3l6.9-1z"/></svg>
              {cta1 ?? 'Bilan gratuit'}
            </motion.a>
            <motion.a
              href="/boxs"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-white/10 text-white text-[13px] font-bold uppercase tracking-wider border border-white/35 backdrop-blur-sm"
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.18)', borderColor: 'rgba(255,255,255,1)' }}
              whileTap={{ scale: 0.97 }}
            >
              {cta2 ?? 'Voir les Boxs'}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </motion.a>
          </motion.div>

          {/* Stats */}
          <motion.div variants={itemV} className="flex gap-9 mt-12 pt-10 border-t border-white/10 flex-wrap">
            {[
              { value: <Counter target={200} />, label: 'Clientes satisfaites' },
              { value: '4.9 ★', label: 'Note moyenne' },
              { value: '100%', label: 'Conseil gratuit' },
            ].map((s, i) => (
              <div key={i}>
                <span className="block font-playfair font-black text-[2rem] gradient-text">{s.value}</span>
                <span className="text-[11px] text-white/40 font-semibold uppercase tracking-wider mt-1 block">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* DROITE — visuel */}
        <motion.div
          className="relative h-[500px] flex items-center justify-center"
          style={{ y: visualY }}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.34, 1.56, 0.64, 1] }}
        >
          {/* Photo produit morphante */}
          <motion.div
            className="w-[340px] h-[420px] relative overflow-hidden shadow-[0_40px_100px_rgba(233,30,140,0.35)]"
            animate={{ borderRadius: ['60% 40% 70% 30% / 50% 60% 40% 60%', '30% 70% 40% 60% / 60% 30% 70% 40%', '50% 50% 30% 70% / 40% 70% 30% 60%', '60% 40% 70% 30% / 50% 60% 40% 60%'] }}
            transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/peau-sensible.jpg"
              alt="K-Beauty Glow Up Box"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.4) 0%, transparent 60%)' }} />
          </motion.div>

          {/* Floating cards */}
          {floatCards.map((card, i) => (
            <motion.div
              key={card.label}
              className={`absolute ${card.className} flex items-center gap-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl px-4 py-2.5 text-white text-[12px] font-semibold whitespace-nowrap`}
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.8 }}
            >
              <span className="w-2 h-2 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FFB347] flex-shrink-0" />
              {card.emoji} {card.label}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
