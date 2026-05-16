import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import clsx from 'clsx'

type Variant = 'primary' | 'secondary' | 'zalo' | 'hero' | 'ghostHero'
type Size = 'sm' | 'lg'

type SharedProps = {
  children: ReactNode
  className?: string
  icon?: ReactNode
  size?: Size
  variant?: Variant
}

type LinkProps = SharedProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string
  }

type NativeProps = SharedProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never
  }

function getButtonClassName(variant: Variant, size: Size, className?: string) {
  return clsx(
    'inline-flex items-center justify-center gap-2 rounded-full font-semibold tracking-[0.02em] no-underline transition duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)] disabled:pointer-events-none disabled:opacity-70',
    size === 'lg' ? 'min-h-[3.6rem] px-6 text-base sm:px-7' : 'min-h-[2.95rem] px-5 text-sm',
    variant === 'primary' &&
      'bg-[var(--navy)] !text-white shadow-[var(--shadow-soft)] hover:-translate-y-0.5 hover:brightness-110 dark:bg-[var(--accent)] dark:!text-[#101720]',
    variant === 'secondary' &&
      'border border-[var(--border)] bg-[var(--surface)] !text-[var(--text)] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:shadow-[var(--shadow-soft)]',
    variant === 'zalo' &&
      'bg-[var(--zalo-blue)] !text-white shadow-[0_18px_40px_rgba(0,104,255,0.28)] hover:-translate-y-0.5 hover:bg-[var(--zalo-blue-strong)] hover:shadow-[0_24px_48px_rgba(0,104,255,0.34)]',
    variant === 'hero' &&
      'bg-[var(--accent)] !text-[#11181f] shadow-[0_28px_60px_rgba(16,24,31,0.32)] hover:-translate-y-0.5 hover:bg-[var(--accent-strong)]',
    variant === 'ghostHero' &&
      'border border-white/16 bg-white/8 !text-white backdrop-blur hover:-translate-y-0.5 hover:border-[var(--accent-strong)] hover:bg-white/12',
    className,
  )
}

export function ActionButton(props: LinkProps | NativeProps) {
  if ('href' in props && typeof props.href === 'string') {
    const {
      children,
      className,
      href,
      icon,
      rel,
      size = 'lg',
      target,
      variant = 'primary',
      ...rest
    } = props
    const buttonClassName = getButtonClassName(variant, size, className)

    return (
      <a className={buttonClassName} href={href} rel={rel} target={target} {...rest}>
        {icon ? (
          <span className="inline-flex shrink-0 !text-current [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:!text-current">
            {icon}
          </span>
        ) : null}
        <span className="!text-current">{children}</span>
      </a>
    )
  }

  const {
    children,
    className,
    icon,
    size = 'lg',
    type = 'button',
    variant = 'primary',
    ...rest
  } = props
  const buttonClassName = getButtonClassName(variant, size, className)

  return (
    <button className={buttonClassName} type={type} {...rest}>
      {icon ? (
        <span className="inline-flex shrink-0 !text-current [&_svg]:h-4 [&_svg]:w-4 [&_svg]:shrink-0 [&_svg]:!text-current">
          {icon}
        </span>
      ) : null}
      <span className="!text-current">{children}</span>
    </button>
  )
}
