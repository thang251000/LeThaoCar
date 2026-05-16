export type Locale = 'vi' | 'en'
export type ThemeMode = 'light' | 'dark'

export type NavLink = {
  href: string
  label: string
}

export type IconKey =
  | 'airport'
  | 'booking'
  | 'business'
  | 'clean'
  | 'comfort'
  | 'daily'
  | 'driver'
  | 'event'
  | 'family'
  | 'ontime'
  | 'province'
  | 'support'

export type StatItem = {
  label: string
  value: string
}

export type HighlightItem = {
  description: string
  title: string
}

export type FeatureItem = {
  description: string
  icon: IconKey
  title: string
}

export type PriceRow = {
  description: string
  price: string
  service: string
}

export type TestimonialItem = {
  name: string
  quote: string
  role: string
}

export type SpecItem = {
  label: string
  value: string
}

export type BookingField = {
  label: string
  placeholder: string
}

export type BookingFormValues = {
  dateTime: string
  destination: string
  name: string
  notes: string
  phone: string
  pickup: string
}

export type BookingFieldKey = keyof BookingFormValues

export type BookingSubmissionPayload = BookingFormValues & {
  locale: Locale
  source: string
  status: string
  vehicle: string
}

export type NavbarContent = {
  callNow: string
  closeMenu: string
  darkLabel: string
  languageToggleLabel: string
  lightLabel: string
  links: NavLink[]
  openMenu: string
  switchToDark: string
  switchToLight: string
  tagline: string
  zalo: string
}

export type HeroContent = {
  assuranceLabel: string
  assurances: string[]
  badges: string[]
  carCardLabel: string
  description: string
  eyebrow: string
  imageAlt: string
  primaryCta: string
  secondaryCta: string
  stats: StatItem[]
  title: string
}

export type AboutContent = {
  description: string
  differencePoints: string[]
  differenceTitle: string
  eyebrow: string
  highlights: HighlightItem[]
  title: string
}

export type VehicleContent = {
  description: string
  eyebrow: string
  specs: SpecItem[]
  title: string
  usageLabel: string
  usageNotes: string[]
}

export type ServicesContent = {
  description: string
  eyebrow: string
  items: FeatureItem[]
  title: string
}

export type WhyChooseUsContent = {
  description: string
  eyebrow: string
  items: FeatureItem[]
  title: string
}

export type PricingContent = {
  cta: string
  description: string
  eyebrow: string
  note: string
  rows: PriceRow[]
  table: {
    price: string
    service: string
    suitableFor: string
  }
  title: string
}

export type TestimonialsContent = {
  description: string
  eyebrow: string
  items: TestimonialItem[]
  title: string
}

export type BookingContent = {
  description: string
  errorFallback: string
  errors: Record<'dateTime' | 'dateTimePast' | 'destination' | 'name' | 'phone' | 'pickup', string>
  eyebrow: string
  fields: Record<BookingFieldKey, BookingField>
  privacyNote: string
  reassurance: HighlightItem[]
  submitLabel: string
  submittingLabel: string
  successMessage: string
  title: string
}

export type ContactSectionContent = {
  callNow: string
  coverage: Record<Locale, string>
  coverageLabel: string
  description: string
  eyebrow: string
  facebookValue: string
  mapLabel: string
  mapTitle: string
  openMap: string
  phoneLabel: string
  responseTime: Record<Locale, string>
  title: string
  zaloValue: string
}

export type FooterContent = {
  availability: string
  contactTitle: string
  copyright: string
  location: string
  quickLinksTitle: string
  summary: string
  summaryTitle: string
}

export type MobileBarContent = {
  book: string
  call: string
  zalo: string
}

export type SeoContent = {
  description: string
  title: string
}

export type LocalizedVehicleImage = {
  accent: string
  alt: Record<Locale, string>
  color: Record<Locale, string>
  src: string
}

export type VehicleConfig = {
  gallery: LocalizedVehicleImage[]
  heroImage: string
  name: string
}

export type ContactConfig = {
  facebookHref: string
  mapEmbedUrl: string
  mapLink: string
  originAddress: Record<Locale, string>
  originRouteQuery: string
  phoneDisplay: string
  phoneHref: string
  zaloHref: string
}

export type SiteConfig = {
  brand: Record<Locale, string>
  contact: ContactConfig
  ogImage: string
  serviceArea: Record<Locale, string>
  vehicle: VehicleConfig
}

export type LocalizedPageContent = {
  about: AboutContent
  booking: BookingContent
  contact: ContactSectionContent
  footer: FooterContent
  hero: HeroContent
  mobileBar: MobileBarContent
  nav: NavbarContent
  pricing: PricingContent
  seo: SeoContent
  services: ServicesContent
  testimonials: TestimonialsContent
  vehicle: VehicleContent
  whyChooseUs: WhyChooseUsContent
}

export type SiteContent = Record<Locale, LocalizedPageContent>
