import { Helmet } from 'react-helmet-async'
import { siteConfig } from '../../data/siteContent'
import type { Locale, SeoContent, ThemeMode } from '../../types/site'

type SeoProps = {
  content: SeoContent
  locale: Locale
  theme: ThemeMode
}

const DEFAULT_SITE_URL = 'https://le-thao-car.vercel.app'
const SITE_URL =
  import.meta.env.VITE_SITE_URL?.trim().replace(/\/+$/, '') || DEFAULT_SITE_URL
const OG_IMAGE_WIDTH = '1200'
const OG_IMAGE_HEIGHT = '630'

export function Seo({ content, locale, theme }: SeoProps) {
  const title = content.title
  const description = content.description
  const brandName = siteConfig.brand[locale]
  const ogImage = new URL(siteConfig.ogImage, SITE_URL).toString()
  const ogImageAlt =
    locale === 'vi'
      ? '\u1ea2nh chia s\u1ebb d\u1ecbch v\u1ee5 L\u00ea Th\u1ea3o L\u00e1i xe v\u1edbi VinFast Limo Green 7 ch\u1ed7.'
      : 'Preview image for Le Thao Lai Xe private chauffeur service with the VinFast Limo Green 7-seat vehicle.'
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
      <link href={ogImage} rel="image_src" />
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
      <meta content={ogImage} property="og:image:secure_url" />
      <meta content="image/png" property="og:image:type" />
      <meta content={OG_IMAGE_WIDTH} property="og:image:width" />
      <meta content={OG_IMAGE_HEIGHT} property="og:image:height" />
      <meta content={ogImageAlt} property="og:image:alt" />
      <meta content={locale === 'vi' ? 'vi_VN' : 'en_US'} property="og:locale" />
      <meta
        content={locale === 'vi' ? 'en_US' : 'vi_VN'}
        property="og:locale:alternate"
      />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content="summary_large_image" name="twitter:card" />
      <meta content={SITE_URL} name="twitter:url" />
      <meta content={ogImage} name="twitter:image" />
      <meta content={ogImageAlt} name="twitter:image:alt" />
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  )
}
