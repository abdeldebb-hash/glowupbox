import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

const BASE = 'https://www.glowup-box.com'

export const metadata: Metadata = {
  metadataBase: new URL(BASE),
  title: {
    default:  'Glow Up Box — K-Beauty Maroc | Coffrets & Conseil Peau Gratuit',
    template: '%s | Glow Up Box',
  },
  description: 'Coffrets K-Beauty personnalisés après bilan peau gratuit. Cosmétique coréenne authentique livrée partout au Maroc.',
  keywords:    ['K-Beauty Maroc', 'coffret soin coréen', 'cosmétique coréenne Maroc', 'bilan peau gratuit', 'routine coréenne'],
  authors:     [{ name: 'Glow Up Box' }],
  openGraph: {
    siteName:    'Glow Up Box',
    title:       'Glow Up Box — K-Beauty Maroc',
    description: 'Coffrets K-Beauty personnalisés avec bilan peau gratuit. Livraison Maroc.',
    type:        'website',
    url:         BASE,
    locale:      'fr_MA',
    images: [{ url: '/images/hero-bg.jpg', width: 1200, height: 630, alt: 'Glow Up Box K-Beauty Maroc' }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Glow Up Box — K-Beauty Maroc',
    description: 'Coffrets K-Beauty personnalisés avec bilan peau gratuit.',
    images:      ['/images/hero-bg.jpg'],
  },
  robots:     { index: true, follow: true },
  alternates: { canonical: BASE },
}

const orgSchema = {
  '@context':  'https://schema.org',
  '@type':     'Organization',
  name:        'Glow Up Box',
  url:         BASE,
  logo:        `${BASE}/images/hero-bg.jpg`,
  description: 'Coffrets K-Beauty personnalisés pour le marché marocain. Bilan peau gratuit, livraison Maroc.',
  address:     { '@type': 'PostalAddress', addressCountry: 'MA' },
  contactPoint: {
    '@type':           'ContactPoint',
    contactType:       'customer service',
    availableLanguage: ['French', 'Arabic'],
  },
  sameAs: ['https://instagram.com/glowupbox.ma'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body>
        <ScrollProgressBar />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  )
}
