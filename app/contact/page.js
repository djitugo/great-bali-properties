import ContactClient from './ContactClient'

export const metadata = {
  title: 'Contact Great Bali Properties',
  description: 'Get in touch with our Bali property team — WhatsApp, email, or visit our office in Canggu. Fast response, honest advice, and a local team that knows every neighborhood.',
  alternates: { canonical: '/contact' },
  openGraph: {
    title: 'Contact Great Bali Properties',
    description: 'WhatsApp, email, or visit our Canggu office. Fast response, honest advice from a local Bali property team.',
    url: 'https://greatbaliproperties.com/contact',
    type: 'website',
    images: ['https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Great Bali Properties',
    description: 'Reach our Bali team via WhatsApp, email, or visit in person.',
    images: ['https://images.unsplash.com/photo-1528181304800-259b08848526?w=1200&q=80'],
  },
}

export default function Page() {
  return <ContactClient />
}
