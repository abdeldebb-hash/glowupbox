import type { Metadata } from 'next'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { WhatsAppFloat } from '@/components/layout/WhatsAppFloat'
import { ScrollProgressBar } from '@/components/ui/ScrollProgressBar'

export const metadata: Metadata = {
  title: 'Glow Up Box ✦ — K-Beauty Maroc | Coffrets & Conseil Peau Gratuit',
  description: 'Coffrets K-Beauty personnalisés après bilan peau gratuit. Cosmétique coréenne authentique. Livraison partout au Maroc.',
  openGraph: {
    title: 'Glow Up Box ✦ — K-Beauty Maroc',
    description: 'Coffrets K-Beauty personnalisés avec conseil peau gratuit.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
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
