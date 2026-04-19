import LegalClient from './LegalClient'

export const metadata = {
  title: 'Legal Process for Buying Property in Bali',
  description: 'Step-by-step walkthrough of the notary, due diligence, and contract process for buying property in Bali — what happens at each stage, how long it takes, and how to avoid common legal pitfalls.',
  alternates: { canonical: '/guide/legal' },
  openGraph: {
    title: 'Legal Process for Buying Property in Bali',
    description: 'A complete walkthrough of notary, due diligence, and contract stages for Bali property transactions.',
    url: 'https://greatbaliproperties.com/guide/legal',
    type: 'article',
    images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Legal Process for Buying Property in Bali',
    description: 'Step-by-step notary, due diligence, and contract process.',
    images: ['https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&q=80'],
  },
}

export default function Page() {
  return <LegalClient />
}
