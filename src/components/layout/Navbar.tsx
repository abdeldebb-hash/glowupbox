'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { href: '/boxs',        label: 'Boxs' },
  { href: '/boutique',    label: 'Boutique' },
  { href: '/conseil-peau',label: 'Conseil Peau' },
  { href: '/b2b',         label: 'B2B' },
  { href: '/blog',        label: 'Blog' },
  { href: '/a-propos',    label: 'À Propos' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <nav className={cn(
        'fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-3rem)] max-w-6xl px-7 py-3.5 rounded-full flex items-center justify-between transition-all duration-400',
        scrolled
          ? 'bg-white/95 backdrop-blur-xl border border-black/6 shadow-lg shadow-black/8'
          : 'bg-[rgba(26,26,46,0.5)] backdrop-blur-xl border border-white/10'
      )}>
        <Link href="/" className={cn('font-playfair font-black text-lg', scrolled ? 'text-[#1A1A2E]' : 'text-white')}>
          GLOW UP BOX ✦
        </Link>

        <ul className="hidden lg:flex items-center gap-8">
          {links.map(l => (
            <li key={l.href}>
              <Link href={l.href} className={cn('text-[13px] font-medium tracking-wide transition-colors', scrolled ? 'text-[#4A4A6A] hover:text-[#E91E8C]' : 'text-white/80 hover:text-white')}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href={`https://wa.me/${process.env.NEXT_PUBLIC_WA_NUMBER ?? '212600000000'}?text=${encodeURIComponent('Bonjour Glow Up Box !')}`}
            target="_blank"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-[12px] font-bold uppercase tracking-wider text-white gradient-bg hover:-translate-y-0.5 transition-transform"
          >
            WhatsApp
          </Link>
          <button className={cn('lg:hidden', scrolled ? 'text-[#1A1A2E]' : 'text-white')} onClick={() => setOpen(true)}>
            <Menu size={22} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99] dark-gradient-bg flex flex-col items-center justify-center gap-8"
          >
            <button className="absolute top-7 right-7 text-white" onClick={() => setOpen(false)}>
              <X size={26} />
            </button>
            {links.map((l, i) => (
              <motion.div key={l.href} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={l.href} onClick={() => setOpen(false)} className="text-white font-playfair text-4xl font-bold opacity-80 hover:opacity-100 transition-opacity">
                  {l.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
