'use client'

import { motion, useReducedMotion } from 'motion/react'
import type { ReactNode } from 'react'

export function MotionReveal({ children, className }: { readonly children: ReactNode; readonly className?: string }) {
  const reduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduceMotion ? undefined : { opacity: [0.96, 1], y: [8, 0] }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
