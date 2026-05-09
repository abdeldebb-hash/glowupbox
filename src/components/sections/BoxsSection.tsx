'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { waUrl }          from '@/lib/utils'
import { useWaNumber }   from '@/lib/wa-context'

export type BoxItem = {
  img:      string
  tag:      string
  name:     string
  desc:     string
  products: string[]
  slug:     string
  waMessage: string
}

const gridV = { hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }
const cardV = { hidden: { opacity: 0, y: 44 }, visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.34, 1.56, 0.64, 1] } } }

export function BoxsSection({ boxes }: { boxes: BoxItem[] }) {
  const waNum = useWaNumber()
  const gridRef = useRef(null)
  const inView  = useInView(gridRef, { once: true, margin: '-60px' })

  if (!boxes.length) return null

  return (
    <section className="py-24 px-6 sm:px-10 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <ScrollReveal>
            <SectionBadge>Nos Boxs K-Beauty</SectionBadge>
            <h2 className="font-playfair font-bold text-[#1A1A2E]" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
              Chaque peau, sa Box
            </h2>
            <p className="text-[#4A4A6A] text-[1.05rem] mt-2 max-w-md leading-relaxed">
              Des routines complètes, soigneusement composées pour des résultats visibles.
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <GradientButton href="/boxs" size="sm">
              Voir toutes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </GradientButton>
          </ScrollReveal>
        </div>

        <motion.div ref={gridRef} variants={gridV} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-3 gap-7">
          {boxes.map(b => <BoxCard key={b.slug} {...b} />)}
        </motion.div>
      </div>
    </section>
  )
}

function BoxCard({ img, tag, name, desc, products, slug, waMessage }: BoxItem) {
  const waNum = useWaNumber()
  return (
    <motion.div variants={cardV}
      className="rounded-4xl overflow-hidden bg-[#FDF0F5] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:outline-none"
      whileHover={{ y: -10, boxShadow: '0 36px 72px rgba(233,30,140,0.14)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <div className="h-52 relative overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, rgba(26,26,46,0.25) 0%, transparent 50%)' }} />
      </div>
      <div className="p-6">
        <span className="inline-flex bg-[rgba(233,30,140,0.1)] text-[#E91E8C] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">{tag}</span>
        <h3 className="font-playfair font-bold text-[#1A1A2E] text-[1.15rem] mb-2">{name}</h3>
        <p className="text-[#4A4A6A] text-[13.5px] leading-relaxed mb-4">{desc}</p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {products.map(p => <span key={p} className="bg-white text-[#4A4A6A] text-[11px] font-medium px-2.5 py-1 rounded-full">{p}</span>)}
        </div>
        <p className="text-[12px] text-[#E91E8C] italic font-semibold mb-4">✦ Prix après bilan peau gratuit</p>
        <div className="flex gap-2">
          <motion.a href={waUrl(waMessage, waNum)} target="_blank" rel="noopener"
            className="flex-1 text-center px-4 py-2.5 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FFB347] text-white text-[12px] font-bold uppercase tracking-wide"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            WhatsApp
          </motion.a>
          <motion.a href={`/boxs/${slug}`}
            className="px-4 py-2.5 rounded-full bg-white text-[#4A4A6A] text-[12px] font-semibold border border-[rgba(74,74,106,0.18)] hover:border-[#E91E8C] hover:text-[#E91E8C] transition-colors"
            whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
            Détails
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
