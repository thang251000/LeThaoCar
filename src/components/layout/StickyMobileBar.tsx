import { MessageCircleMore, PhoneCall, SquarePen } from 'lucide-react'
import { siteConfig } from '../../data/siteContent'

type StickyMobileBarProps = {
  bookingLabel: string
  callLabel: string
  zaloLabel: string
}

export function StickyMobileBar({
  bookingLabel,
  callLabel,
  zaloLabel,
}: StickyMobileBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[var(--border-strong)] bg-[color:var(--surface-nav)]/95 p-3 backdrop-blur-xl md:hidden">
      <div className="grid grid-cols-3 gap-3">
        <a
          className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface)] px-4 text-sm font-semibold !text-[var(--text)] transition hover:border-[var(--accent)]"
          href={siteConfig.contact.phoneHref}
        >
          <PhoneCall className="h-4 w-4" />
          <span>{callLabel}</span>
        </a>
        <a
          className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-[var(--zalo-blue)] px-4 text-sm font-semibold !text-white shadow-[0_18px_36px_rgba(0,104,255,0.24)] transition hover:-translate-y-0.5 hover:bg-[var(--zalo-blue-strong)] hover:shadow-[0_22px_44px_rgba(0,104,255,0.3)]"
          href={siteConfig.contact.zaloHref}
          rel="noreferrer"
          target="_blank"
        >
          <MessageCircleMore className="h-4 w-4" />
          <span>{zaloLabel}</span>
        </a>
        <a
          className="inline-flex min-h-[3.5rem] items-center justify-center gap-2 rounded-full bg-[var(--navy)] px-4 text-sm font-semibold !text-white shadow-[var(--shadow-soft)] transition hover:-translate-y-0.5 dark:bg-[var(--accent)] dark:!text-[#0f151c] [&_span]:!text-current [&_svg]:!text-current"
          href="#booking"
        >
          <SquarePen className="h-4 w-4" />
          <span>{bookingLabel}</span>
        </a>
      </div>
    </div>
  )
}
