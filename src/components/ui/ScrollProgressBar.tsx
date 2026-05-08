'use client'
import { useScroll, motion, useSpring } from 'framer-motion'

export function ScrollProgressBar() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 })

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[3px] z-[200] origin-left"
      style={{ scaleX, background: 'linear-gradient(90deg,#E91E8C,#FF6B9D,#FFB347)' }}
    />
  )
}
