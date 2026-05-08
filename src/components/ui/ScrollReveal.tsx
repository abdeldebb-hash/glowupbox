'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { cn } from '@/lib/utils'

interface Props {
  children: React.ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'left' | 'right'
  once?: boolean
}

export function ScrollReveal({ children, className, delay = 0, direction = 'up', once = true }: Props) {
  const ref = useRef(null)
  const inView = useInView(ref, { once, margin: '-60px' })

  const initial = {
    opacity: 0,
    y: direction === 'up' ? 28 : 0,
    x: direction === 'left' ? -28 : direction === 'right' ? 28 : 0,
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial={initial}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : initial}
      transition={{ duration: 0.7, delay, ease: [0.34, 1.56, 0.64, 1] }}
    >
      {children}
    </motion.div>
  )
}
