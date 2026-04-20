'use client'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <img
        src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80"
        alt="Bali Villa"
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}
      />
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.52)', zIndex: 1 }} />

      <div style={{ position: 'relative', zIndex: 2, padding: '120px 24px 80px', textAlign: 'center', maxWidth: '800px', margin: '0 auto', width: '100%' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '20px' }}>
          Bali Real Estate · Premium Properties
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15 }}
          style={{ fontSize: 'clamp(48px, 7vw, 80px)', fontWeight: 300, lineHeight: 1.1, color: 'white', margin: '0 0 24px' }}>
          Find Your<br /><span style={{ fontWeight: 700 }}>Dream Villa</span><br />in Bali
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.25 }}
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', marginBottom: '36px', lineHeight: 1.65 }}>
          Curated villas and land across Bali's most sought-after locations.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#listings" style={{ backgroundColor: 'white', color: 'black', fontSize: '14px', padding: '14px 32px', textDecoration: 'none', fontWeight: 600 }}>
            View Listings
          </a>
          <a href="https://wa.me/6282122973363" target="_blank" rel="noopener noreferrer"
            style={{ border: '1.5px solid rgba(255,255,255,0.6)', color: 'white', fontSize: '14px', padding: '14px 32px', textDecoration: 'none' }}>
            Contact Agent
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6 }}
          style={{ display: 'flex', gap: '48px', marginTop: '72px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {[{ n: '50+', l: 'Properties' }, { n: '10+', l: 'Years Exp' }, { n: '1000+', l: 'Villas Managed' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 300, color: 'white' }}>{s.n}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', zIndex: 2 }}>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '3px' }}>Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
      </motion.div>
    </div>
  )
}