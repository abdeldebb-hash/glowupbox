'use client'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { waUrl } from '@/lib/utils'

const tags = ['🎄 Fin d\'année', '👰 Team building', '🏆 Récompenses', '💼 Séminaires', '🌸 Fête des femmes']

export function B2BSection() {
  return (
    <section className="py-14 px-6 sm:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="relative rounded-[2rem] overflow-hidden p-8 sm:p-14 grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-center"
            style={{ background: 'linear-gradient(135deg,#1A1A2E 0%,#2D1B4E 100%)' }}>
            {/* Orb déco */}
            <div className="absolute -top-24 -right-12 w-80 h-80 rounded-full pointer-events-none"
              style={{ background: 'radial-gradient(circle,rgba(233,30,140,0.18) 0%,transparent 70%)' }} />

            <div className="relative z-10">
              <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.15em] uppercase text-[#FF6B9D] mb-4">
                <span className="w-5 h-[1.5px] bg-[#FF6B9D] block" />
                Offre Entreprises
              </div>
              <h2 className="text-white font-playfair font-bold mb-3" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
                Glow Up Box pour vos équipes
              </h2>
              <p className="text-white/65 leading-relaxed max-w-xl">
                Cadeaux d'entreprise, incentives, séminaires… Des Boxs K-Beauty premium pour sublimer vos collaborateurs.
              </p>
              <div className="flex flex-wrap gap-2.5 mt-5">
                {tags.map(t => (
                  <span key={t} className="bg-white/7 border border-white/13 text-white/85 px-3.5 py-1.5 rounded-full text-[12px] font-medium">{t}</span>
                ))}
              </div>
            </div>

            <div className="relative z-10 flex-shrink-0">
              <motion.a
                href={waUrl('Bonjour, coffrets pour mon entreprise.\nOccasion :\nQuantité :\nBudget :')}
                target="_blank" rel="noopener"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FFB347] text-white text-[13px] font-bold uppercase tracking-wider whitespace-nowrap shadow-[0_8px_24px_rgba(233,30,140,0.35)]"
                whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(233,30,140,0.5)' }}
                whileTap={{ scale: 0.97 }}
              >
                Demander un devis
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
