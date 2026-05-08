'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { SectionBadge }   from '@/components/ui/SectionBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { ScrollReveal }   from '@/components/ui/ScrollReveal'
import { waUrl }          from '@/lib/utils'

export type ProductItem = {
  id:       number
  img:      string
  cat:      string
  name:     string
  price:    number
  desc:     string
}

const gridV = { hidden: {}, visible: { transition: { staggerChildren: 0.1 } } }
const cardV = { hidden: { opacity: 0, y: 36 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.34, 1.56, 0.64, 1] } } }

export function BoutiqueSection({ products }: { products: ProductItem[] }) {
  const gridRef = useRef(null)
  const inView  = useInView(gridRef, { once: true, margin: '-60px' })

  if (!products.length) return null

  return (
    <section className="py-24 px-6 sm:px-10 bg-[#FDF0F5]">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between gap-6 mb-14 flex-wrap">
          <ScrollReveal>
            <SectionBadge>Accessoires K-Beauty</SectionBadge>
            <h2 className="font-playfair font-bold text-[#1A1A2E]" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
              Les rituels qui font la différence
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <GradientButton href="/boutique" size="sm">
              Voir tout
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </GradientButton>
          </ScrollReveal>
        </div>

        <motion.div ref={gridRef} variants={gridV} initial="hidden" animate={inView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map(p => <ProductCard key={p.id} {...p} />)}
        </motion.div>
      </div>
    </section>
  )
}

function ProductCard({ img, cat, name, price, desc }: ProductItem) {
  return (
    <motion.div variants={cardV}
      className="bg-white rounded-[22px] overflow-hidden cursor-pointer focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:outline-none"
      whileHover={{ y: -8, boxShadow: '0 28px 56px rgba(233,30,140,0.11)' }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
    >
      <div className="h-[150px] relative overflow-hidden bg-[#F5E6D3]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={name} className="w-full h-full object-cover" />
      </div>
      <div className="p-5">
        <div className="text-[10px] font-bold tracking-[0.12em] uppercase text-[#E91E8C] mb-1.5">{cat}</div>
        <h3 className="font-playfair font-bold text-[#1A1A2E] text-[.98rem] mb-1.5 leading-snug">{name}</h3>
        <p className="text-[#4A4A6A] text-[13px] leading-relaxed mb-4">{desc}</p>
        <div className="flex items-center justify-between">
          <span className="font-playfair font-bold text-[1.2rem] text-[#E91E8C]">{price} DH</span>
          <motion.a href={waUrl(`Bonjour, je souhaite commander ${name}`)} target="_blank" rel="noopener"
            className="px-4 py-2 rounded-full bg-gradient-to-r from-[#E91E8C] to-[#FFB347] text-white text-[12px] font-bold uppercase tracking-wide"
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Commander
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}
