'use client'
import { motion } from 'framer-motion'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { waUrl } from '@/lib/utils'

export function CtaFinalSection({ title, subtitle }: { title?: string; subtitle?: string } = {}) {
  return (
    <section className="py-24 px-6 sm:px-10 relative overflow-hidden" style={{ background: 'linear-gradient(135deg,#E91E8C 0%,#FF6B9D 50%,#FFB347 100%)' }}>
      {/* Orbs déco */}
      <div className="absolute -top-44 -left-20 w-[500px] h-[500px] rounded-full bg-white/6 pointer-events-none" />
      <div className="absolute -bottom-24 -right-12 w-72 h-72 rounded-full bg-white/6 pointer-events-none" />

      <div className="max-w-2xl mx-auto text-center relative z-10">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2.5 text-[11px] font-bold tracking-[0.15em] uppercase text-white/75 mb-6">
            <span className="w-5 h-[1.5px] bg-white/50 block" />
            Commencez maintenant
          </div>
          <h2 className="text-white font-playfair font-bold mb-4" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
            {title ?? 'Prête pour votre transformation ?'}
          </h2>
          <p className="text-white/78 text-[1.05rem] leading-relaxed mb-10">
            {subtitle ?? <>Votre bilan peau personnalisé est gratuit et sans engagement.<br />Découvrez ce que la K-Beauty peut faire pour vous.</>}
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <motion.a
              href="/conseil-peau"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-[#E91E8C] text-[14px] font-bold uppercase tracking-wider"
              whileHover={{ scale: 1.04, boxShadow: '0 20px 40px rgba(0,0,0,0.15)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M12 2l3.1 6.3L22 9.3l-5 4.9 1.2 6.9L12 18l-6.2 3.1 1.2-6.9L2 9.3l6.9-1z"/></svg>
              Bilan gratuit
            </motion.a>
            <motion.a
              href={waUrl('Bonjour Glow Up Box !')}
              target="_blank" rel="noopener"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white/10 text-white text-[14px] font-bold uppercase tracking-wider border border-white/35 backdrop-blur-sm"
              whileHover={{ scale: 1.04, backgroundColor: 'rgba(255,255,255,0.18)' }}
              whileTap={{ scale: 0.97 }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              WhatsApp direct
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
