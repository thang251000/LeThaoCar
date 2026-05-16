import { motion } from 'framer-motion'
import { BadgeCheck, Clock3, ShieldCheck, Sparkles, UsersRound } from 'lucide-react'
import type { AboutContent, Locale } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { ImageWithSkeleton } from '../ui/ImageWithSkeleton'
import { SectionHeading } from '../ui/SectionHeading'

const highlightIcons = [ShieldCheck, Sparkles, Clock3, BadgeCheck, UsersRound]

const aboutMediaCopy = {
  vi: {
    portraitAlt: 'Chủ xe Lê Thảo',
    portraitLabel: 'Chủ xe trực tiếp phục vụ',
    vehicleAlt: 'VinFast Limo Green phục vụ các chuyến đi riêng',
    vehicleLabel: 'Xe phục vụ',
  },
  en: {
    portraitAlt: 'Le Thao, the owner-driver',
    portraitLabel: 'Owner-driver',
    vehicleAlt: 'VinFast Limo Green used for private trips',
    vehicleLabel: 'Serving vehicle',
  },
} as const

type AboutSectionProps = {
  content: AboutContent
  locale: Locale
}

export function AboutSection({ content, locale }: AboutSectionProps) {
  const mediaCopy = aboutMediaCopy[locale]

  return (
    <section className="section-padding" id="about">
      <div className="section-shell">
        <motion.div
          className="soft-card overflow-hidden p-6 sm:p-8 lg:p-10"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewport}
          whileInView="visible"
        >
          <div className="grid gap-6">
            <div className="grid gap-6 xl:grid-cols-2">
              <motion.div
                className="grid gap-4"
                variants={staggerContainer}
              >
                <motion.article
                  className="rounded-[1.9rem] border border-[var(--border)] bg-[var(--surface)] p-6 sm:p-8"
                  variants={fadeUp}
                >
                  <SectionHeading
                    align="left"
                    description={content.description}
                    eyebrow={content.eyebrow}
                    title={content.title}
                  />
                </motion.article>

                <motion.article
                  className="overflow-hidden rounded-[1.9rem] border border-[var(--border)] bg-[var(--surface-muted)] shadow-[var(--shadow-soft)]"
                  variants={fadeUp}
                >
                  <div className="border-b border-[var(--border)] px-5 py-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                      {mediaCopy.vehicleLabel}
                    </p>
                  </div>
                  <ImageWithSkeleton
                    alt={mediaCopy.vehicleAlt}
                    className="min-h-[18rem] bg-[var(--surface)]"
                    imageClassName="h-full w-full object-cover object-center"
                    src="/images/limo-green-white.png"
                  />
                </motion.article>
              </motion.div>

              <motion.div
                className="grid gap-4"
                variants={staggerContainer}
              >
                <motion.article
                  className="overflow-hidden rounded-[1.9rem] border border-[var(--border)] bg-[var(--surface-muted)] shadow-[var(--shadow-soft)]"
                  variants={fadeUp}
                >
                  <div className="border-b border-[var(--border)] px-5 py-4">
                    <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                      {mediaCopy.portraitLabel}
                    </p>
                  </div>
                  <ImageWithSkeleton
                    alt={mediaCopy.portraitAlt}
                    className="min-h-[24rem] bg-[var(--surface)]"
                    imageClassName="h-full w-full object-cover object-center"
                    priority
                    src="/images/lethao.jpg"
                  />
                </motion.article>

                <motion.article
                  className="rounded-[1.9rem] border border-[var(--border)] bg-[var(--surface-muted)] p-5 shadow-[var(--shadow-soft)] sm:p-6"
                  variants={fadeUp}
                >
                  <p className="text-sm uppercase tracking-[0.22em] text-[var(--accent)]">
                    {content.differenceTitle}
                  </p>
                  <div className="mt-4 grid gap-3">
                    {content.differencePoints.map((point) => (
                      <div
                        key={point}
                        className="flex items-center gap-3 rounded-[1.2rem] border border-[var(--border)] bg-[var(--surface)] px-4 py-3 text-sm font-medium leading-6 text-[var(--text)]"
                      >
                        <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--accent-soft)] text-[var(--accent)]">
                          <BadgeCheck className="h-4 w-4" />
                        </span>
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>
                </motion.article>
              </motion.div>
            </div>

            <motion.div
              className="grid gap-3 md:grid-cols-2 xl:grid-cols-3"
              variants={staggerContainer}
            >
              {content.highlights.map((item, index) => {
                const Icon = highlightIcons[index % highlightIcons.length]

                return (
                  <motion.article
                    key={item.title}
                    className="h-full rounded-[1.45rem] border border-[var(--border)] bg-[var(--surface-muted)] p-4"
                    variants={fadeUp}
                  >
                    <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="mt-4 text-lg font-semibold text-[var(--heading)]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                      {item.description}
                    </p>
                  </motion.article>
                )
              })}
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
