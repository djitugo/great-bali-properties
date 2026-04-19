import OwnershipClient from './OwnershipClient'

export const metadata = {
  title: 'Leasehold vs Freehold in Bali — Ownership Guide',
  description: 'A clear breakdown of leasehold, freehold, Hak Pakai, and PT PMA ownership structures for foreign buyers in Bali — which one fits your investment goals and how to stay legally protected.',
  alternates: { canonical: '/guide/ownership' },
  openGraph: {
    title: 'Leasehold vs Freehold in Bali — Ownership Guide',
    description: 'Understanding the four legal ownership structures available to foreign buyers in Bali, and how to choose the right one.',
    url: 'https://greatbaliproperties.com/guide/ownership',
    type: 'article',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Leasehold vs Freehold in Bali',
    description: 'A clear breakdown of ownership structures for foreign buyers in Bali.',
    images: ['https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&q=80'],
  },
}

export default function Page() {
  return <OwnershipClient />
}
