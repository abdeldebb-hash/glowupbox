'use client'
import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { SectionBadge } from '@/components/ui/SectionBadge'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const testimonials = [
  { quote: 'Le bilan peau m\'a vraiment aidée à comprendre mes besoins. La Box Douceur Coréenne a transformé ma peau sensible en 3 semaines !', name: 'Salma R.', meta: 'Peau sensible · Casablanca', initial: 'S' },
  { quote: 'J\'étais sceptique sur le K-Beauty mais le conseil gratuit m\'a convaincue. Mon teint est vraiment plus lumineux maintenant !', name: 'Nadia M.', meta: 'Peau terne · Rabat', initial: 'N' },
  { quote: 'Service impeccable ! La réponse WhatsApp était rapide et la recommandation parfaitement adaptée à ma peau mixte.', name: 'Imane B.', meta: 'Peau mixte · Marrakech', initial: 'I' },
  { quote: 'Le Gua Sha Quartz Rose est devenu mon indispensable matin ! Livraison à Fès ultra rapide. Je recommande à toutes mes amies.', name: 'Fatima Z.', meta: 'Peau grasse · Fès', initial: 'F' },
  { quote: 'Les produits sont vrais et efficaces. On sent vraiment la différence avec les cosmétiques classiques. La Box Youth Élixir est une merveille.', name: 'Houda A.', meta: 'Anti-âge · Tanger', initial: 'H' },
]

// Adapté du pattern 21st Magic TestimonialsCarousel
function MarqueeTrack({ items, speed = 28 }: { items: typeof testimonials; speed?: number }) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)
  const doubled = [...items, ...items]

  useEffect(() => {
    if (trackRef.current) setWidth(trackRef.current.scrollWidth / 2)
  }, [])

  return (
    <div className="overflow-hidden relative" ref={trackRef}>
      <motion.div
        className="flex gap-5"
        animate={width ? { x: [0, -width] } : {}}
        transition={{ duration: speed, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' }}
      >
        {doubled.map((t, i) => (
          <motion.div
            key={i}
            className="bg-[#FDF0F5] rounded-[22px] p-7 w-[320px] flex-shrink-0"
            whileHover={{ scale: 1.02, rotateZ: 0.5 }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          >
            {/* Étoiles */}
            <div className="flex gap-1 mb-4">
              {Array(5).fill(0).map((_, j) => (
                <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="#FFB347">
                  <polygon points="7,1 8.8,4.8 13,5.3 10,8.2 10.7,12.5 7,10.5 3.3,12.5 4,8.2 1,5.3 5.2,4.8"/>
                </svg>
              ))}
            </div>
            <p className="text-[14.5px] text-[#4A4A6A] leading-relaxed italic mb-5">"{t.quote}"</p>
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                style={{ background: 'linear-gradient(135deg,#E91E8C,#FFB347)' }}>
                {t.initial}
              </div>
              <div>
                <div className="font-bold text-[14px] text-[#1A1A2E]">{t.name}</div>
                <div className="text-[12px] text-[#4A4A6A] mt-0.5">{t.meta}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  )
}

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white overflow-hidden">
      <div className="text-center px-6 mb-14">
        <ScrollReveal>
          <SectionBadge className="justify-center">Elles témoignent</SectionBadge>
          <h2 className="font-playfair font-bold text-[#1A1A2E]" style={{ fontSize: 'clamp(1.8rem,3.5vw,2.8rem)' }}>
            Ce qu'elles en pensent
          </h2>
          <p className="text-[#4A4A6A] mt-3 text-[1.05rem]">Plus de 200 clientes satisfaites.</p>
        </ScrollReveal>
      </div>

      <div className="relative">
        {/* Fade masks */}
        <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-32 z-10 bg-gradient-to-l from-white to-transparent" />
        <MarqueeTrack items={testimonials} speed={28} />
      </div>
    </section>
  )
}
