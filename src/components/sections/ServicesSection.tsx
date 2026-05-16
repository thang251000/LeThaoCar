import { motion } from 'framer-motion'
import {
  BriefcaseBusiness,
  CalendarClock,
  CarFront,
  MapPinned,
  PartyPopper,
  Plane,
} from 'lucide-react'
import type { Locale, ServicesContent } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { SectionHeading } from '../ui/SectionHeading'

const serviceIcons = {
  airport: Plane,
  business: BriefcaseBusiness,
  daily: CalendarClock,
  event: PartyPopper,
  family: CarFront,
  province: MapPinned,
}

const cardLayout = [
  'md:col-span-2 xl:col-span-5 xl:row-span-2',
  'xl:col-span-4',
  'xl:col-span-3',
  'xl:col-span-3',
  'xl:col-span-4',
  'xl:col-span-5',
]

const copyByLocale = {
  vi: {
    featured: 'Dịch vụ được hỏi nhiều',
    privateLabel: 'Dịch vụ tài xế riêng',
  },
  en: {
    featured: 'Most requested format',
    privateLabel: 'Private chauffeur service',
  },
} as const

type ServicesSectionProps = {
  content: ServicesContent
  locale: Locale
}

export function ServicesSection({ content, locale }: ServicesSectionProps) {
  const copy = copyByLocale[locale]

  return (
    <section className="section-padding" id="services">
      <div className="section-shell">
        <SectionHeading
          align="center"
          description={content.description}
          eyebrow={content.eyebrow}
          title={content.title}
        />

        <motion.div
          className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-12"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewport}
          whileInView="visible"
        >
          {content.items.map((item, index) => {
            const Icon = serviceIcons[item.icon as keyof typeof serviceIcons]
            const isFeatured = index === 0

            return (
              <motion.article
                key={item.title}
                className={`group relative overflow-hidden rounded-[2rem] border border-[var(--border)] ${
                  isFeatured
                    ? 'bg-[var(--surface-inverse)] text-[var(--text-on-dark)] shadow-[0_32px_80px_rgba(9,13,18,0.22)]'
                    : 'bg-[var(--surface)] text-[var(--text)] shadow-[var(--shadow-soft)]'
                } ${cardLayout[index] ?? 'xl:col-span-4'}`}
                style={
                  isFeatured
                    ? {
                        background:
                          'radial-gradient(circle at top right, rgba(216,181,116,0.2), transparent 28%), linear-gradient(145deg, #111922, #0b1118)',
                      }
                    : {
                        background:
                          'radial-gradient(circle at top right, rgba(183,148,85,0.08), transparent 26%), linear-gradient(160deg, var(--surface), rgba(255,255,255,0.42))',
                      }
                }
                variants={fadeUp}
                whileHover={{ y: -6 }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(140deg,transparent,rgba(255,255,255,0.03))]" />

                <div className={`relative h-full p-6 sm:p-7 ${isFeatured ? 'lg:p-8' : ''}`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="inline-flex h-14 w-14 items-center justify-center rounded-[1.5rem] bg-[var(--accent-soft)] text-[var(--accent)] transition duration-300 group-hover:scale-105">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-xs font-semibold uppercase tracking-[0.22em] ${
                          isFeatured
                            ? 'text-[var(--accent-strong)]'
                            : 'text-[var(--muted)]'
                        }`}
                      >
                        {index === 0 ? copy.featured : copy.privateLabel}
                      </p>
                      <p
                        className={`mt-2 text-sm ${
                          isFeatured
                            ? 'text-[var(--muted-on-dark)]'
                            : 'text-[var(--muted)]'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </p>
                    </div>
                  </div>

                  <h3
                    className={`mt-6 font-semibold tracking-[-0.02em] ${
                      isFeatured
                        ? 'max-w-[12ch] text-[2rem] leading-[1.08] sm:text-[2.35rem]'
                        : 'text-2xl'
                    } ${
                      isFeatured ? 'text-[var(--text-on-dark)]' : 'text-[var(--heading)]'
                    }`}
                  >
                    {item.title}
                  </h3>

                  <p
                    className={`mt-4 ${
                      isFeatured
                        ? 'max-w-xl text-base leading-8 text-[var(--muted-on-dark)]'
                        : 'text-base leading-8 text-[var(--muted)]'
                    }`}
                  >
                    {item.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span
                      className={`rounded-full border px-3 py-2 text-sm ${
                        isFeatured
                          ? 'border-white/12 bg-white/6 text-[var(--text-on-dark)]'
                          : 'border-[var(--border)] bg-[var(--surface-muted)] text-[var(--muted)]'
                      }`}
                    >
                      {copy.privateLabel}
                    </span>
                    {isFeatured ? (
                      <span className="rounded-full border border-white/12 bg-white/6 px-3 py-2 text-sm text-[var(--accent-strong)]">
                        {copy.featured}
                      </span>
                    ) : null}
                  </div>
                </div>
              </motion.article>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
