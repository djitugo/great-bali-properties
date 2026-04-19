import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from './components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Great Bali Properties',
  description: 'Premium Villas & Land for Sale in Bali',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, fontFamily: 'Inter, sans-serif' }}>
        <Navbar />
        {children}
      </body>
    </html>
  )
}