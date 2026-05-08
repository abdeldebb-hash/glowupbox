'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const steps = [
  { n: '1', title: 'Faites votre bilan peau', desc: '6 questions simples pour cerner votre type de peau, vos préoccupations et vos objectifs.' },
  { n: '2', title: 'On analyse votre profil',  desc: 'Votre bilan nous parvient via WhatsApp. On l\'analyse pour vous proposer la bonne Box.' },
  { n: '3', title: 'Recommandation personnalisée', desc: 'Vous recevez notre sélection K-Beauty adaptée à votre peau, avec explications des produits.' },
  { n: '4', title: 'Livraison partout au Maroc', desc: 'Commandez directement sur WhatsApp. Livraison rapide partout au Maroc.' },
]

const features = [
  { icon: '🎁', title: 'Boxs curatées', desc: 'Chaque Box est sélectionnée par des experts K-Beauty avec des produits complémentaires.' },
  { icon: '💬', title: 'Conseil humain, pas un bot', desc: 'Un vrai conseiller répond à chaque bilan et explique chaque produit recommandé.' },
  { icon: '🇰🇷', title: 'Produits authentiques', desc: 'Cosmétiques coréens certifiés, sélectionnés pour leur efficacité prouvée.' },
  { icon: '✅', title: '0 risque, 0 engagement', desc: 'Bilan et conseil 100% gratuits. Vous achetez seulement si vous êtes convaincue.' },
]

const stepsV = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }
const stepItemV = { hidden: { opacity: 0, x: -28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }
const featsV = { hidden: {}, visible: { transition: { staggerChildren: 0.12 } } }
const featItemV = { hidden: { opacity: 0, x: 28 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] } } }

export function ProcessSection() {
  const stepsRef = useRef(null)
  const featsRef = useRef(null)
  const stepsInView = useInView(stepsRef, { once: true, margin: '-60px' })
  const featsInView = useInView(featsRef, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-6 sm:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#1A1A2E 0%,#2D1B4E 100%)' }}>
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#E91E8C]/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <SectionBadge light>Notre méthode</SectionBadge>
          <h2 className="text-white font-playfair font-bold mb-3" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
            Comment ça marche ?
          </h2>
          <p className="text-white/60 text-[1.05rem] max-w-lg leading-relaxed">
            De votre profil peau à votre Box idéale — simple, gratuit, personnalisé.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-14">
          {/* Étapes */}
          <motion.div ref={stepsRef} variants={stepsV} initial="hidden" animate={stepsInView ? 'visible' : 'hidden'} className="flex flex-col">
            {steps.map((s, i) => (
              <motion.div key={s.n} variants={stepItemV} className="flex gap-6 py-7 relative">
                {i < steps.length - 1 && (
                  <div className="absolute left-[18px] top-[68px] bottom-0 w-px bg-gradient-to-b from-[rgba(233,30,140,0.4)] to-transparent" />
                )}
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-playfair font-bold text-[15px] text-white flex-shrink-0"
                  style={{ background: 'linear-gradient(135deg,#E91E8C,#FF6B9D,#FFB347)' }}>
                  {s.n}
                </div>
                <div>
                  <h3 className="text-white font-bold text-[1.05rem] mb-1.5">{s.title}</h3>
                  <p className="text-white/70 text-[13.5px] leading-relaxed">{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Features */}
          <motion.div ref={featsRef} variants={featsV} initial="hidden" animate={featsInView ? 'visible' : 'hidden'} className="flex flex-col gap-3.5">
            {features.map((f) => (
              <motion.div
                key={f.title}
                variants={featItemV}
                className="flex gap-4 p-5 rounded-2xl border border-white/7 bg-white/5 cursor-default"
                whileHover={{ backgroundColor: 'rgba(233,30,140,0.07)', borderColor: 'rgba(233,30,140,0.2)' }}
                transition={{ duration: 0.2 }}
              >
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-[1.1rem] flex-shrink-0"
                  style={{ background: 'rgba(233,30,140,0.15)' }}>
                  {f.icon}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-[14px] mb-1">{f.title}</h4>
                  <p className="text-white/70 text-[13px] leading-relaxed">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
