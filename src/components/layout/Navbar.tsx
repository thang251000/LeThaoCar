import { AnimatePresence, motion } from 'framer-motion'
import {
  CarFront,
  Globe2,
  Menu,
  MessageCircleMore,
  MoonStar,
  PhoneCall,
  SunMedium,
  X,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { siteConfig } from '../../data/siteContent'
import type { Locale, NavbarContent, ThemeMode } from '../../types/site'
import { ActionButton } from '../ui/ActionButton'

type NavbarProps = {
  brandName: string
  content: NavbarContent
  locale: Locale
  theme: ThemeMode
  onToggleLocale: () => void
  onToggleTheme: () => void
}

export function Navbar({
  brandName,
  content,
  locale,
  theme,
  onToggleLocale,
  onToggleTheme,
}: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 18)

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!isMenuOpen) {
      return undefined
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = originalOverflow
    }
  }, [isMenuOpen])

  const shellClassName = isScrolled
    ? 'border-[var(--border-strong)] bg-[color:var(--surface-nav)] shadow-[var(--shadow-soft)] backdrop-blur-xl'
    : 'border-white/10 bg-white/6 backdrop-blur-md'

  const topTextClassName = isScrolled ? 'text-[var(--text)]' : 'text-white'
  const navLinkClassName = isScrolled
    ? 'rounded-full px-3 py-2 hover:bg-[var(--surface)] hover:text-[var(--heading)] hover:shadow-[var(--shadow-soft)]'
    : 'rounded-full px-3 py-2 hover:bg-white/12 hover:text-white hover:shadow-[0_16px_34px_rgba(0,0,0,0.14)]'
  const utilityButtonClassName = isScrolled
    ? 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:-translate-y-1 hover:scale-[1.03] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)] hover:text-[var(--heading)] hover:shadow-[var(--shadow-soft)] active:scale-[0.99]'
    : 'border-white/15 bg-white/8 text-white hover:-translate-y-1 hover:scale-[1.03] hover:border-[var(--accent-strong)] hover:bg-white/14 hover:text-white hover:shadow-[0_18px_38px_rgba(0,0,0,0.16)] active:scale-[0.99]'

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
      <div className={`section-shell !max-w-[88rem] ${topTextClassName}`}>
        <div
          className={`mx-auto flex min-h-[4rem] items-center justify-between rounded-full border px-4 py-3 transition-all duration-300 sm:px-5 ${shellClassName}`}
        >
          <a className="flex items-center gap-3" href="#home">
            <div className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-[rgba(255,255,255,0.08)] text-[var(--accent-strong)] shadow-[0_14px_34px_rgba(0,0,0,0.2)]">
              <CarFront className="h-4.5 w-4.5" />
              <span className="absolute -bottom-0.5 h-2 w-2 rounded-full border border-[#0f151d] bg-[var(--accent)]" />
            </div>
            <div>
              <p className="font-display text-lg leading-none sm:text-[1.85rem]">
                {brandName}
              </p>
              <p
                className={`mt-1 text-[0.7rem] uppercase tracking-[0.22em] ${
                  isScrolled ? 'text-[var(--muted)]' : 'text-white/70'
                }`}
              >
                {content.tagline}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {content.links.map((link) => (
              <a
                key={link.href}
                className={`text-sm font-medium tracking-[0.03em] transition duration-200 ${navLinkClassName}`}
                href={link.href}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <button
              aria-label={
                theme === 'dark' ? content.switchToLight : content.switchToDark
              }
              className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition duration-200 ${utilityButtonClassName}`}
              onClick={onToggleTheme}
              type="button"
            >
              {theme === 'dark' ? (
                <SunMedium className="h-4 w-4" />
              ) : (
                <MoonStar className="h-4 w-4" />
              )}
              <span>{theme === 'dark' ? content.lightLabel : content.darkLabel}</span>
            </button>

            <button
              aria-label={content.languageToggleLabel}
              className={`inline-flex h-11 items-center gap-2 rounded-full border px-4 text-sm font-medium transition duration-200 ${utilityButtonClassName}`}
              onClick={onToggleLocale}
              type="button"
            >
              <Globe2 className="h-4 w-4" />
              <span>{locale === 'vi' ? 'VI / EN' : 'EN / VI'}</span>
            </button>

            <ActionButton
              className="hover:scale-[1.03] active:scale-[0.99]"
              href={siteConfig.contact.phoneHref}
              icon={<PhoneCall className="h-4 w-4" />}
              size="sm"
              variant="primary"
            >
              {content.callNow}
            </ActionButton>
            <ActionButton
              className="hover:scale-[1.03] active:scale-[0.99]"
              href={siteConfig.contact.zaloHref}
              icon={<MessageCircleMore className="h-4 w-4" />}
              rel="noreferrer"
              size="sm"
              target="_blank"
              variant="zalo"
            >
              {content.zalo}
            </ActionButton>
          </div>

          <button
            aria-label={isMenuOpen ? content.closeMenu : content.openMenu}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full border transition duration-200 lg:hidden ${
              isScrolled
                ? 'border-[var(--border)] bg-[var(--surface)] text-[var(--text)] hover:-translate-y-1 hover:scale-[1.03] hover:border-[var(--accent)] hover:bg-[var(--surface-muted)] hover:shadow-[var(--shadow-soft)] active:scale-[0.99]'
                : 'border-white/15 bg-white/8 text-white hover:-translate-y-1 hover:scale-[1.03] hover:border-[var(--accent-strong)] hover:bg-white/14 active:scale-[0.99]'
            }`}
            onClick={() => setIsMenuOpen((currentState) => !currentState)}
            type="button"
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        <AnimatePresence>
          {isMenuOpen ? (
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="mt-3 overflow-hidden rounded-[2rem] border border-[var(--border-strong)] bg-[color:var(--surface-nav)] p-5 text-[var(--text)] shadow-[var(--shadow-soft)] backdrop-blur-2xl lg:hidden"
              exit={{ opacity: 0, y: -16 }}
              initial={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="grid gap-2">
                {content.links.map((link) => (
                  <a
                    key={link.href}
                    className="rounded-2xl border border-transparent px-4 py-3 text-base font-medium transition hover:border-[var(--border)] hover:bg-[var(--surface)]"
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ))}
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <button
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium !text-[var(--text)] transition hover:border-[var(--accent)]"
                  onClick={onToggleTheme}
                  type="button"
                >
                  {theme === 'dark' ? (
                    <SunMedium className="h-4 w-4" />
                  ) : (
                    <MoonStar className="h-4 w-4" />
                  )}
                  <span>
                    {theme === 'dark' ? content.lightLabel : content.darkLabel}
                  </span>
                </button>
                <button
                  className="inline-flex min-h-[3.25rem] items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-medium !text-[var(--text)] transition hover:border-[var(--accent)]"
                  onClick={onToggleLocale}
                  type="button"
                >
                  <Globe2 className="h-4 w-4" />
                  <span>{locale === 'vi' ? 'VI / EN' : 'EN / VI'}</span>
                </button>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </header>
  )
}
