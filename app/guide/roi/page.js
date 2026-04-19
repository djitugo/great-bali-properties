import RoiClient from './RoiClient'

export const metadata = {
  title: 'Rental Yields & ROI in Bali — Investor Guide',
  description: 'An honest guide to calculating real returns on a Bali villa — gross vs net yield, appreciation, occupancy assumptions, and how to stress-test any investment projection before you commit.',
  alternates: { canonical: '/guide/roi' },
  openGraph: {
    title: 'Rental Yields & ROI in Bali — Investor Guide',
    description: 'Gross vs net yield, real cost breakdowns, occupancy scenarios, and stress tests for Bali villa investments.',
    url: 'https://greatbaliproperties.com/guide/roi',
    type: 'article',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Rental Yields & ROI in Bali',
    description: 'An honest guide to calculating real returns on a Bali villa.',
    images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&q=80'],
  },
}

export default function Page() {
  return <RoiClient />
}
