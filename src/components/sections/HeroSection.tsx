import { motion } from 'framer-motion'
import {
  BadgeCheck,
  Clock3,
  MessageCircleMore,
  PhoneCall,
  ShieldCheck,
} from 'lucide-react'
import { siteConfig } from '../../data/siteContent'
import type { HeroContent, Locale } from '../../types/site'
import { ActionButton } from '../ui/ActionButton'

type HeroSectionProps = {
  content: HeroContent
  locale: Locale
}

const statIcons = [ShieldCheck, Clock3, BadgeCheck]
const heroUiCopy = {
  vi: {
    basedIn: 'Xe đậu tại Nhơn Trạch và nhận chuyến theo lịch hẹn trước.',
    highlightPill: 'Trắng ngọc trai',
    personalService: 'Chủ xe trực tiếp phục vụ',
  },
  en: {
    basedIn: 'Vehicle based in Nhon Trach and serving trips by advance booking.',
    highlightPill: 'Pearl white finish',
    personalService: 'Owner-operated service',
  },
} as const

export function HeroSection({ content, locale }: HeroSectionProps) {
  const uiCopy = heroUiCopy[locale]

  return (
    <section
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden px-4 pb-[5rem] pt-32 sm:px-6 sm:pb-20 sm:pt-36 lg:px-8 lg:pb-24 lg:pt-40"
      id="home"
    >
      <div className="absolute inset-0 overflow-hidden">
        <div className="hero-gradient absolute inset-0" />
        <motion.div
          animate={{ opacity: [0.68, 1, 0.74], scale: [1, 1.08, 1] }}
          className="absolute right-[-12%] top-[6%] h-[24rem] w-[24rem] rounded-full bg-[rgba(207,173,92,0.18)] blur-3xl"
          transition={{ duration: 7.5, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          animate={{ opacity: [0.18, 0.34, 0.18], y: [0, -16, 0] }}
          className="absolute bottom-[8%] left-[-10%] h-[18rem] w-[18rem] rounded-full bg-white/10 blur-3xl"
          transition={{ duration: 9, ease: 'easeInOut', repeat: Infinity }}
        />
        <motion.div
          animate={{ rotate: 360, scale: [1, 1.04, 1] }}
          className="absolute right-[10%] top-[18%] hidden h-[24rem] w-[24rem] rounded-full border border-white/10 lg:block"
          transition={{ duration: 18, ease: 'linear', repeat: Infinity }}
        />
      </div>

      <div className="section-shell relative grid w-full items-center gap-8 lg:grid-cols-[minmax(0,0.94fr)_minmax(0,1.06fr)] lg:gap-10">
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="max-w-[37rem] text-white"
          initial={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="inline-flex max-w-max rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-[var(--accent-strong)] backdrop-blur">
            {content.eyebrow}
          </p>
          <h1 className="heading-balance mt-5 max-w-[11ch] font-display text-[clamp(2.55rem,4.25vw,4.35rem)] leading-[0.95] tracking-[-0.045em] text-white">
            {content.title}
          </h1>
          <p className="mt-4 max-w-[32rem] text-base leading-7 text-white/76 sm:text-[1.02rem] sm:leading-8">
            {content.description}
          </p>

          <div className="mt-6 flex max-w-[34rem] flex-wrap gap-2.5">
            {content.badges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-medium text-white/84 backdrop-blur"
              >
                {badge}
              </span>
            ))}
          </div>

          <div className="mt-7 flex flex-col gap-4 sm:flex-row">
            <ActionButton
              href={siteConfig.contact.phoneHref}
              icon={<PhoneCall className="h-4 w-4" />}
              size="lg"
              variant="hero"
            >
              {content.primaryCta}
            </ActionButton>
            <ActionButton
              href={siteConfig.contact.zaloHref}
              icon={<MessageCircleMore className="h-4 w-4" />}
              rel="noreferrer"
              size="lg"
              target="_blank"
              variant="zalo"
            >
              {content.secondaryCta}
            </ActionButton>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {content.stats.map((item, index) => {
              const Icon = statIcons[index % statIcons.length]

              return (
                <motion.article
                  key={item.value}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-[1.5rem] border border-white/12 bg-white/8 p-4 backdrop-blur-md"
                  initial={{ opacity: 0, y: 18 }}
                  transition={{
                    duration: 0.45,
                    delay: 0.2 + index * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Icon className="h-5 w-5 text-[var(--accent-strong)]" />
                  <p className="mt-3 text-lg font-semibold text-white">{item.value}</p>
                  <p className="mt-2 text-xs leading-5 text-white/72 sm:text-sm">
                    {item.label}
                  </p>
                </motion.article>
              )
            })}
          </div>
        </motion.div>

        <motion.div
          animate={{ opacity: 1, x: 0 }}
          className="relative lg:ml-auto lg:w-full lg:max-w-[43rem]"
          initial={{ opacity: 0, x: 26 }}
          transition={{ duration: 0.75, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="absolute inset-x-10 bottom-10 h-28 rounded-full bg-black/40 blur-3xl" />
          <div className="rounded-[2.15rem] border border-white/12 bg-[linear-gradient(160deg,rgba(255,255,255,0.12),rgba(255,255,255,0.04))] p-3 shadow-[0_40px_120px_rgba(0,0,0,0.38)] backdrop-blur-xl sm:p-4">
            <div className="relative overflow-hidden rounded-[1.85rem] border border-white/10 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.26),transparent_26%),linear-gradient(160deg,rgba(255,255,255,0.16),rgba(255,255,255,0.04))] px-4 py-6 sm:px-6 sm:py-6">
              <motion.div
                animate={{ x: [-140, 520] }}
                className="absolute inset-y-10 -left-28 z-0 w-28 rotate-12 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.52),transparent)] blur-2xl"
                transition={{
                  duration: 5.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatDelay: 1.2,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(207,173,92,0.22),transparent_34%)]" />
              <div className="absolute inset-x-[16%] top-5 h-16 rounded-full bg-white/24 blur-3xl" />
              <motion.div
                animate={{ y: [0, -6, 0] }}
                className="absolute right-4 top-4 z-20 hidden items-center gap-2 rounded-full border border-white/14 bg-[#101720]/70 px-4 py-2 text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-white/84 backdrop-blur md:flex"
                transition={{ duration: 5.6, ease: 'easeInOut', repeat: Infinity }}
              >
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                {uiCopy.highlightPill}
              </motion.div>
              <motion.div
                animate={{ x: [0, 8, 0], y: [0, -4, 0] }}
                className="absolute left-4 top-5 z-20 hidden rounded-full border border-white/12 bg-white/10 px-4 py-2 text-sm font-medium text-white/88 backdrop-blur sm:flex"
                transition={{ duration: 6.8, ease: 'easeInOut', repeat: Infinity }}
              >
                {uiCopy.personalService}
              </motion.div>
              <motion.img
                alt={content.imageAlt}
                animate={{ rotate: [0, 0.5, 0], y: [0, -10, 0] }}
                className="relative z-10 mx-auto w-full max-w-[41rem] scale-[1.03] object-contain drop-shadow-[0_35px_45px_rgba(0,0,0,0.4)]"
                src={siteConfig.vehicle.heroImage}
                transition={{
                  duration: 7.4,
                  ease: 'easeInOut',
                  repeat: Infinity,
                  repeatType: 'mirror',
                }}
              />

              <div className="relative z-10 mt-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.5rem] border border-white/10 bg-black/24 p-5 text-white/88 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent-strong)]">
                    {content.carCardLabel}
                  </p>
                  <p className="mt-3 text-2xl font-semibold text-white">
                    {siteConfig.vehicle.name}
                  </p>
                  <p className="mt-3 text-sm leading-6 text-white/72">
                    {siteConfig.serviceArea[locale]}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-white/62">
                    {uiCopy.basedIn}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-white/88 backdrop-blur">
                  <p className="text-xs uppercase tracking-[0.26em] text-[var(--accent-strong)]">
                    {content.assuranceLabel}
                  </p>
                  <ul className="mt-3 space-y-3 text-sm leading-6 text-white/78">
                    {content.assurances.map((assurance) => (
                      <li key={assurance} className="flex items-start gap-3">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--accent-strong)]" />
                        <span>{assurance}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
