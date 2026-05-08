'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  href: string
  children: React.ReactNode
  variant?: 'gradient' | 'ghost' | 'white' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
  target?: string
  external?: boolean
}

const base = 'inline-flex items-center gap-2 rounded-full font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E91E8C] focus-visible:ring-offset-2'
const sizes = { sm: 'px-5 py-2.5 text-[12px]', md: 'px-7 py-3.5 text-[13px]', lg: 'px-9 py-4 text-[14px]' }

const variants = {
  gradient: 'bg-gradient-to-r from-[#E91E8C] via-[#FF6B9D] to-[#FFB347] text-white shadow-[0_8px_24px_rgba(233,30,140,0.3)] hover:shadow-[0_20px_40px_rgba(233,30,140,0.45)] hover:-translate-y-0.5',
  ghost:    'bg-white/10 text-white border border-white/35 backdrop-blur-sm hover:bg-white/18 hover:border-white hover:-translate-y-0.5',
  white:    'bg-white text-[#E91E8C] hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] hover:-translate-y-0.5',
  outline:  'bg-white text-[#4A4A6A] border border-[rgba(74,74,106,0.18)] hover:border-[#E91E8C] hover:text-[#E91E8C]',
}

export function GradientButton({ href, children, variant = 'gradient', size = 'md', className, target, external }: Props) {
  const cls = cn(base, sizes[size], variants[variant], className)
  if (external || target === '_blank') {
    return (
      <motion.a href={href} target="_blank" rel="noopener" className={cls} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
        {children}
      </motion.a>
    )
  }
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }} className="inline-block">
      <Link href={href} className={cls}>{children}</Link>
    </motion.div>
  )
}
