import { Suspense, lazy, startTransition, useEffect, useState } from 'react'
import { Footer } from '../components/layout/Footer'
import { Navbar } from '../components/layout/Navbar'
import { StickyMobileBar } from '../components/layout/StickyMobileBar'
import { Seo } from '../components/seo/Seo'
import { AboutSection } from '../components/sections/AboutSection'
import { HeroSection } from '../components/sections/HeroSection'
import { PricingSection } from '../components/sections/PricingSection'
import { ServicesSection } from '../components/sections/ServicesSection'
import { WhyChooseUsSection } from '../components/sections/WhyChooseUsSection'
import { SectionSkeleton } from '../components/ui/SectionSkeleton'
import { siteContent, siteConfig } from '../data/siteContent'
import type { Locale, ThemeMode } from '../types/site'

const VehicleShowcaseSection = lazy(
  () => import('../components/sections/VehicleShowcaseSection'),
)
const BookingSection = lazy(() => import('../components/sections/BookingSection'))
const ContactSection = lazy(() => import('../components/sections/ContactSection'))

const THEME_STORAGE_KEY = 'le-thao-chauffeur-theme'
const LOCALE_STORAGE_KEY = 'le-thao-chauffeur-locale'

function getInitialTheme(): ThemeMode {
  if (typeof window === 'undefined') {
    return 'light'
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY)
  if (storedTheme === 'light' || storedTheme === 'dark') {
    return storedTheme
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light'
}

function getInitialLocale(): Locale {
  if (typeof window === 'undefined') {
    return 'vi'
  }

  const storedLocale = window.localStorage.getItem(LOCALE_STORAGE_KEY)
  return storedLocale === 'en' ? 'en' : 'vi'
}

export default function App() {
  const [theme, setTheme] = useState<ThemeMode>(getInitialTheme)
  const [locale, setLocale] = useState<Locale>(getInitialLocale)
  const content = siteContent[locale]

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    document.documentElement.dataset.theme = theme
    document.documentElement.style.colorScheme = theme
    window.localStorage.setItem(THEME_STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    document.documentElement.lang = locale
    window.localStorage.setItem(LOCALE_STORAGE_KEY, locale)
  }, [locale])

  return (
    <>
      <Seo content={content.seo} locale={locale} theme={theme} />
      <div className="min-h-screen bg-[var(--bg)] text-[var(--text)]">
        <Navbar
          brandName={siteConfig.brand[locale]}
          content={content.nav}
          locale={locale}
          theme={theme}
          onToggleLocale={() =>
            startTransition(() =>
              setLocale((currentLocale) =>
                currentLocale === 'vi' ? 'en' : 'vi',
              ),
            )
          }
          onToggleTheme={() =>
            setTheme((currentTheme) =>
              currentTheme === 'light' ? 'dark' : 'light',
            )
          }
        />

        <main>
          <HeroSection content={content.hero} locale={locale} />
          <AboutSection content={content.about} locale={locale} />

          <Suspense fallback={<SectionSkeleton />}>
            <VehicleShowcaseSection
              content={content.vehicle}
              locale={locale}
              vehicleConfig={siteConfig.vehicle}
            />
          </Suspense>

          <ServicesSection content={content.services} locale={locale} />
          <WhyChooseUsSection content={content.whyChooseUs} />
          <PricingSection content={content.pricing} locale={locale} />

          <Suspense fallback={<SectionSkeleton dense />}>
            <BookingSection
              content={content.booking}
              locale={locale}
              vehicleName={siteConfig.vehicle.name}
            />
          </Suspense>

          <Suspense fallback={<SectionSkeleton dense />}>
            <ContactSection
              content={content.contact}
              locale={locale}
              contactConfig={siteConfig.contact}
            />
          </Suspense>
        </main>

        <Footer
          brandName={siteConfig.brand[locale]}
          content={content.footer}
          contactConfig={siteConfig.contact}
          locale={locale}
          navLinks={content.nav.links}
        />

        <StickyMobileBar
          bookingLabel={content.mobileBar.book}
          callLabel={content.mobileBar.call}
          zaloLabel={content.mobileBar.zalo}
        />
      </div>
    </>
  )
}
