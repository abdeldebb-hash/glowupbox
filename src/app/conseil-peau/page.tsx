import type { Metadata } from 'next'
import { ConseilPeauClient } from './ConseilPeauClient'

export const metadata: Metadata = {
  title:       'Bilan Peau Gratuit — Conseil Personnalisé K-Beauty sur WhatsApp',
  description: 'Répondez à 6 questions sur votre peau et recevez une recommandation K-Beauty personnalisée sur WhatsApp. Gratuit, sans engagement. Service Glow Up Box Maroc.',
  alternates:  { canonical: 'https://www.glowup-box.com/conseil-peau' },
  openGraph: {
    title:       'Bilan Peau Gratuit | Glow Up Box',
    description: 'Votre profil peau en 6 questions — recommandation personnalisée sur WhatsApp.',
    url:         'https://www.glowup-box.com/conseil-peau',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type':    'FAQPage',
  mainEntity: [
    {
      '@type':          'Question',
      name:             'Le bilan peau est-il vraiment gratuit ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Oui, le bilan peau est 100% gratuit et sans engagement. Vous recevez une recommandation personnalisée sur WhatsApp.' },
    },
    {
      '@type':          'Question',
      name:             'Comment fonctionne le conseil peau Glow Up Box ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Répondez à 6 questions sur votre type de peau et vos préoccupations. Votre profil est envoyé sur WhatsApp et vous recevez une recommandation de coffret K-Beauty personnalisée.' },
    },
    {
      '@type':          'Question',
      name:             'Quels types de peau prenez-vous en charge ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Nous conseillons toutes les types de peau : sensible, grasse, mixte, sèche, terne et les peaux matures anti-âge.' },
    },
    {
      '@type':          'Question',
      name:             'La K-Beauty convient-elle aux peaux sensibles ?',
      acceptedAnswer:   { '@type': 'Answer', text: 'Oui, la cosmétique coréenne est réputée pour ses formules douces. Notre Box Douceur Coréenne est spécialement conçue pour les peaux sensibles avec des ingrédients apaisants comme le centella asiatica et l\'aloe vera.' },
    },
  ],
}

export default function ConseilPeauPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <ConseilPeauClient />
    </>
  )
}
