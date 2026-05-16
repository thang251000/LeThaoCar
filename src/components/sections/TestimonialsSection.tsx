import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'
import type { TestimonialsContent } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { SectionHeading } from '../ui/SectionHeading'

type TestimonialsSectionProps = {
  content: TestimonialsContent
}

export default function TestimonialsSection({
  content,
}: TestimonialsSectionProps) {
  return (
    <section className="section-padding" id="testimonials">
      <div className="section-shell">
        <SectionHeading
          align="center"
          description={content.description}
          eyebrow={content.eyebrow}
          title={content.title}
        />

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewport}
          whileInView="visible"
        >
          {content.items.map((item) => (
            <motion.article
              key={item.name}
              className="soft-card h-full p-6 sm:p-7"
              variants={fadeUp}
            >
              <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                <Quote className="h-5 w-5" />
              </div>
              <p className="mt-6 text-lg leading-8 text-[var(--text)]">
                “{item.quote}”
              </p>
              <div className="mt-6 border-t border-[var(--border)] pt-5">
                <p className="text-lg font-semibold text-[var(--heading)]">
                  {item.name}
                </p>
                <p className="mt-1 text-sm uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.role}
                </p>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
