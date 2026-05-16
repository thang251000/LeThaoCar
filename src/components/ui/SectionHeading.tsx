import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'

type SectionHeadingProps = {
  align?: 'left' | 'center'
  description: ReactNode
  eyebrow: string
  title: ReactNode
}

export function SectionHeading({
  align = 'left',
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  const alignment = align === 'center' ? 'text-center mx-auto' : 'text-left'
  const titleWidth = align === 'center' ? 'max-w-[20ch]' : 'max-w-[18ch]'

  return (
    <motion.div
      className={alignment}
      initial="hidden"
      variants={staggerContainer}
      viewport={viewport}
      whileInView="visible"
    >
      <motion.p className="eyebrow" variants={fadeUp}>
        {eyebrow}
      </motion.p>
      <motion.h2
        className={`heading-balance mt-4 ${titleWidth} font-display text-[clamp(2rem,3.4vw,3.35rem)] leading-[1.05] tracking-[-0.035em] text-[var(--heading)] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        variants={fadeUp}
      >
        {title}
      </motion.h2>
      <motion.p
        className={`mt-4 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg sm:leading-8 ${
          align === 'center' ? 'mx-auto' : ''
        }`}
        variants={fadeUp}
      >
        {description}
      </motion.p>
    </motion.div>
  )
}
