import { Clock3, MapPinned, MessageCircleMore, PhoneCall, Share2 } from 'lucide-react'
import type { ContactConfig, FooterContent, Locale, NavLink } from '../../types/site'

type FooterProps = {
  brandName: string
  content: FooterContent
  contactConfig: ContactConfig
  locale: Locale
  navLinks: NavLink[]
}

export function Footer({
  brandName,
  content,
  contactConfig,
  locale,
  navLinks,
}: FooterProps) {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-inverse)] text-[var(--text-on-dark)]">
      <div className="section-shell py-14">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr_0.95fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-[var(--accent-strong)]">
              {brandName}
            </p>
            <h2 className="mt-4 font-display text-3xl text-white sm:text-4xl">
              {content.summaryTitle}
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--muted-on-dark)] sm:text-lg">
              {content.summary}
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              {content.quickLinksTitle}
            </h3>
            <ul className="mt-5 space-y-3 text-base text-[var(--muted-on-dark)]">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    className="transition hover:text-white"
                    href={link.href}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--accent-strong)]">
              {content.contactTitle}
            </h3>
            <div className="mt-5 space-y-4 text-base text-[var(--muted-on-dark)]">
              <a
                className="flex items-center gap-3 transition hover:text-white"
                href={contactConfig.phoneHref}
              >
                <PhoneCall className="h-5 w-5 text-[var(--accent-strong)]" />
                <span>{contactConfig.phoneDisplay}</span>
              </a>
              <a
                className="flex items-center gap-3 transition hover:text-white"
                href={contactConfig.zaloHref}
                rel="noreferrer"
                target="_blank"
              >
                <MessageCircleMore className="h-5 w-5 text-[var(--accent-strong)]" />
                <span>Zalo</span>
              </a>
              <a
                className="flex items-center gap-3 transition hover:text-white"
                href={contactConfig.facebookHref}
                rel="noreferrer"
                target="_blank"
              >
                <Share2 className="h-5 w-5 text-[var(--accent-strong)]" />
                <span>Facebook</span>
              </a>
              <a
                className="flex items-start gap-3 transition hover:text-white"
                href={contactConfig.mapLink}
                rel="noreferrer"
                target="_blank"
              >
                <MapPinned className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-strong)]" />
                <span>{contactConfig.originAddress[locale]}</span>
              </a>
              <div className="flex items-start gap-3">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-[var(--accent-strong)]" />
                <span>{content.availability}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-6 text-sm text-[var(--muted-on-dark)]">
          {content.copyright.replace('{year}', String(currentYear))}
        </div>
      </div>
    </footer>
  )
}
