import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import LoadingScreen from './components/LoadingScreen'
import { LangProvider } from './lib/i18n'

const inter = Inter({ subsets: ['latin'] })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair', weight: ['400', '600', '700'] })

const SITE_URL = 'https://greatbaliproperties.com'
const SITE_NAME = 'Great Bali Properties'
const SITE_DESC = 'Premium villa and land listings across Bali — freehold, leasehold, and lifestyle investments. Trusted local experts with end-to-end legal support.'

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Premium Villas & Land in Bali`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESC,
  applicationName: SITE_NAME,
  keywords: [
    'bali property', 'bali real estate', 'villa for sale bali',
    'land for sale bali', 'leasehold bali', 'freehold bali',
    'canggu villa', 'seminyak villa', 'uluwatu villa', 'ubud villa',
    'bali investment', 'bali rental yield', 'bali villa investment',
    'great bali properties', 'great bali villas',
  ],
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: '/',
    languages: {
      'en-US': '/',
      'id-ID': '/',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Premium Villas & Land in Bali`,
    description: SITE_DESC,
    images: [
      {
        url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Clifftop villa in Bali',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Premium Villas & Land in Bali`,
    description: SITE_DESC,
    images: ['https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=80'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // icons auto-detected from app/icon.svg + app/favicon.ico
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({ children }) {
  // JSON-LD structured data untuk Organization + WebSite
  const orgJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESC,
    areaServed: {
      '@type': 'Place',
      name: 'Bali, Indonesia',
    },
    sameAs: [],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Jln Bukit Sari Utara No.88X, Padangsambian Kaja',
      addressLocality: 'Denpasar Barat',
      addressRegion: 'Bali',
      postalCode: '80117',
      addressCountry: 'ID',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+62-821-2297-3363',
      contactType: 'sales',
      areaServed: 'ID',
      availableLanguage: ['English', 'Indonesian'],
    },
  }

  const siteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${SITE_URL}/properties?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  return (
    <html lang="en" className={playfair.variable}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(siteJsonLd) }}
        />
      </head>
      <body style={{ margin: 0, padding: 0, fontFamily: 'Inter, sans-serif' }}>
        <LangProvider>
          <LoadingScreen />
          <Navbar />
          {children}
          <Footer />
        </LangProvider>
      </body>
    </html>
  )
}
