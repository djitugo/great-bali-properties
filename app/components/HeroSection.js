'use client'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div style={{
      position: 'relative',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden'
    }}>
      {/* Background */}
      <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
        <img
          src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80"
          alt="Bali"
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, padding: '0 48px', maxWidth: '1100px', margin: '0 auto', width: '100%', paddingTop: '80px' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '24px' }}>
          Bali Real Estate · Premium Properties
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: '72px', fontWeight: 300, lineHeight: 1.1, color: 'white', marginBottom: '24px' }}>
          Find Your<br />
          <span style={{ fontWeight: 700 }}>Dream Villa</span><br />
          in Bali
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', maxWidth: '480px', marginBottom: '40px', lineHeight: 1.6 }}>
          Curated villas and land across Bali's most sought-after locations. Trusted by investors worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          <a href="#listings" style={{
            backgroundColor: 'white', color: 'black', fontSize: '13px', padding: '14px 32px',
            textDecoration: 'none', fontWeight: 500
          }}>View Listings</a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={{
            border: '1px solid white', color: 'white', fontSize: '13px', padding: '14px 32px',
            textDecoration: 'none'
          }}>Contact Agent</a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', gap: '48px', marginTop: '80px' }}>
          {[{ n: '50+', l: 'Properties' }, { n: '10+', l: 'Years Exp' }, { n: '1000+', l: 'Managed' }].map(s => (
            <div key={s.l}>
              <div style={{ fontSize: '28px', fontWeight: 300, color: 'white' }}>{s.n}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
        style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', textTransform: 'uppercase', letterSpacing: '3px' }}>Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}
          style={{ width: '1px', height: '32px', backgroundColor: 'rgba(255,255,255,0.25)' }} />
      </motion.div>
    </div>
  )
}