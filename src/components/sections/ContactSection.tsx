import { motion } from 'framer-motion'
import { MapPinned, MessageCircleMore, PhoneCall, Share2 } from 'lucide-react'
import type { ContactConfig, ContactSectionContent, Locale } from '../../types/site'
import { fadeUp, staggerContainer, viewport } from '../../utils/animations'
import { ActionButton } from '../ui/ActionButton'
import { SectionHeading } from '../ui/SectionHeading'

type ContactSectionProps = {
  content: ContactSectionContent
  contactConfig: ContactConfig
  locale: Locale
}

const contactMetaCopy = {
  vi: {
    originHint: 'Đây là nơi xe đậu trước khi nhận chuyến, không phải điểm đón cố định của khách.',
    originLabel: 'Xe đậu tại',
  },
  en: {
    originHint: 'This is where the vehicle is based before confirmed bookings, not the guest pickup point.',
    originLabel: 'Vehicle based in',
  },
} as const

export default function ContactSection({
  content,
  contactConfig,
  locale,
}: ContactSectionProps) {
  const metaCopy = contactMetaCopy[locale]

  const cards = [
    {
      icon: PhoneCall,
      label: content.phoneLabel,
      value: contactConfig.phoneDisplay,
      href: contactConfig.phoneHref,
    },
    {
      icon: MessageCircleMore,
      label: 'Zalo',
      value: content.zaloValue,
      href: contactConfig.zaloHref,
    },
    {
      icon: Share2,
      label: 'Facebook',
      value: content.facebookValue,
      href: contactConfig.facebookHref,
    },
  ]

  return (
    <section className="section-padding pb-28 md:pb-20" id="contact">
      <div className="section-shell">
        <div className="mx-auto max-w-[86rem] soft-card p-6 sm:p-8 lg:p-10">
          <SectionHeading
            align="center"
            description={content.description}
            eyebrow={content.eyebrow}
            title={content.title}
          />

          <motion.div
            className="mt-8 grid gap-4 lg:grid-cols-3"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewport}
            whileInView="visible"
          >
            {cards.map((card) => {
              const Icon = card.icon

              return (
                <motion.a
                  key={card.label}
                  className="rounded-[1.7rem] border border-[var(--border)] bg-[var(--surface-muted)] p-5 transition hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                  href={card.href}
                  rel={card.href.startsWith('http') ? 'noreferrer' : undefined}
                  target={card.href.startsWith('http') ? '_blank' : undefined}
                  variants={fadeUp}
                >
                  <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--accent-soft)] text-[var(--accent)]">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-4 text-sm uppercase tracking-[0.2em] text-[var(--muted)]">
                    {card.label}
                  </p>
                  <p className="mt-2 text-xl font-semibold text-[var(--heading)]">
                    {card.value}
                  </p>
                </motion.a>
              )
            })}
          </motion.div>

          <motion.div
            className="mt-4 grid gap-4 lg:grid-cols-2"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewport}
            whileInView="visible"
          >
            <motion.div
              className="rounded-[1.8rem] border border-[var(--border)] bg-[var(--surface-muted)] p-6"
              variants={fadeUp}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                {content.coverageLabel}
              </p>
              <p className="mt-3 text-base leading-7 text-[var(--text)]">
                {content.coverage[locale]}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {content.responseTime[locale]}
              </p>
            </motion.div>

            <motion.div
              className="rounded-[1.8rem] border border-[var(--border)] bg-[var(--surface-muted)] p-6"
              variants={fadeUp}
            >
              <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                {metaCopy.originLabel}
              </p>
              <p className="mt-3 text-base font-semibold leading-7 text-[var(--heading)]">
                {contactConfig.originAddress[locale]}
              </p>
              <p className="mt-4 text-sm leading-7 text-[var(--muted)]">
                {metaCopy.originHint}
              </p>
            </motion.div>
          </motion.div>

          <motion.div
            className="mt-4 rounded-[2rem] border border-[var(--border)] bg-[var(--surface-muted)] p-4 sm:p-5"
            initial={{ opacity: 0, y: 28 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            viewport={viewport}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-[var(--accent)]">
                  {content.mapLabel}
                </p>
                <p className="mt-2 text-lg font-semibold text-[var(--heading)]">
                  {content.mapTitle}
                </p>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {contactConfig.originAddress[locale]}
                </p>
              </div>
              <a
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--text)] transition hover:border-[var(--accent)]"
                href={contactConfig.mapLink}
                rel="noreferrer"
                target="_blank"
              >
                <MapPinned className="h-4 w-4" />
                <span>{content.openMap}</span>
              </a>
            </div>

            <div className="overflow-hidden rounded-[1.8rem] border border-[var(--border)]">
              <iframe
                className="h-[21rem] w-full md:h-[26rem]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                src={contactConfig.mapEmbedUrl}
                title={content.mapTitle}
              />
            </div>
          </motion.div>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <ActionButton
              href={contactConfig.phoneHref}
              icon={<PhoneCall className="h-4 w-4" />}
              size="sm"
            >
              {content.callNow}
            </ActionButton>
            <ActionButton
              href={contactConfig.zaloHref}
              icon={<MessageCircleMore className="h-4 w-4" />}
              rel="noreferrer"
              size="sm"
              target="_blank"
              variant="zalo"
            >
              Zalo
            </ActionButton>
          </div>
        </div>
      </div>
    </section>
  )
}
