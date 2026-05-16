import { motion } from 'framer-motion'
import { BadgeCheck, CalendarCheck2, HeartHandshake, ShieldCheck, Sparkles, Timer } from 'lucide-react'
import type { WhyChooseUsContent } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { SectionHeading } from '../ui/SectionHeading'

const featureIcons = {
  booking: CalendarCheck2,
  clean: Sparkles,
  comfort: HeartHandshake,
  driver: ShieldCheck,
  ontime: Timer,
  support: BadgeCheck,
}

type WhyChooseUsSectionProps = {
  content: WhyChooseUsContent
}

export function WhyChooseUsSection({ content }: WhyChooseUsSectionProps) {
  return (
    <section className="section-padding" id="why-us">
      <div className="section-shell">
        <SectionHeading
          align="center"
          description={content.description}
          eyebrow={content.eyebrow}
          title={content.title}
        />

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewport}
          whileInView="visible"
        >
          {content.items.map((item) => {
            const Icon = featureIcons[item.icon as keyof typeof featureIcons]

            return (
              <motion.article
                key={item.title}
                className="soft-card h-full p-6"
                variants={fadeUp}
              >
                <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-[var(--accent-soft)] text-[var(--accent)]">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-6 text-2xl font-semibold text-[var(--heading)]">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-8 text-[var(--muted)]">
                  {item.description}
                </p>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
