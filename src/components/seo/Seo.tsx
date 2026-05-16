import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../data/siteContent'
import type { Locale, SeoContent, ThemeMode } from '../../types/site'

type SeoProps = {
  content: SeoContent
  locale: Locale
  theme: ThemeMode
}

const SITE_URL = 'https://lethaocar.web.app'

export function Seo({ content, locale, theme }: SeoProps) {
  const title = content.title
  const description = content.description
  const brandName = siteConfig.brand[locale]
  const ogImage = new URL(siteConfig.ogImage, SITE_URL).toString()
  const keywords =
    locale === 'vi'
      ? 'Lê Thảo Lái xe, lái xe riêng, tài xế riêng, đưa đón sân bay, xe đi tỉnh, lái xe công tác'
      : 'Le Thao Lai Xe, private driver Vietnam, airport transfer, chauffeur service, intercity ride, business travel driver'

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${SITE_URL}#business`,
    name: brandName,
    description,
    image: ogImage,
    telephone: siteConfig.contact.phoneDisplay,
    url: SITE_URL,
    areaServed: siteConfig.serviceArea[locale],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Nhon Trach',
      addressRegion: 'Dong Nai',
      addressCountry: 'VN',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: siteConfig.contact.phoneDisplay,
      areaServed: 'VN',
      availableLanguage: ['vi', 'en'],
    },
    sameAs: [siteConfig.contact.facebookHref, siteConfig.contact.mapLink],
    makesOffer: {
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        name:
          locale === 'vi'
            ? 'Dịch vụ lái xe riêng, đưa đón sân bay và đi tỉnh'
            : 'Private driver, airport transfer, and intercity ride service',
      },
    },
  }

  return (
    <Helmet>
      <html lang={locale} />
      <title>{title}</title>
      <link href={SITE_URL} rel="canonical" />
      <meta content={description} name="description" />
      <meta content={keywords} name="keywords" />
      <meta content={brandName} name="author" />
      <meta
        content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"
        name="robots"
      />
      <meta content={theme === 'dark' ? '#0b1117' : '#f4efe8'} name="theme-color" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content="website" property="og:type" />
      <meta content={SITE_URL} property="og:url" />
      <meta content={brandName} property="og:site_name" />
      <meta content={ogImage} property="og:image" />
      <meta content={brandName} property="og:image:alt" />
      <meta content={locale === 'vi' ? 'vi_VN' : 'en_US'} property="og:locale" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={ogImage} name="twitter:image" />
      <meta content={brandName} name="twitter:image:alt" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
