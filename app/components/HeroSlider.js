'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const slides = [
  {
    url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80',
    label: 'Bali Temple & Rice Fields'
  },
  {
    url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1800&q=80',
    label: 'Luxury Villa Pool'
  },
  {
    url: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1800&q=80',
    label: 'Bali Tropical Nature'
  },
  {
    url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1800&q=80',
    label: 'Bali Sunset'
  },
]

export default function HeroSlider() {
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(prev => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      {/* Slides */}
      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img src={slides[current].url} alt={slides[current].label}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.55) 100%)' }} />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px', maxWidth: '1000px', width: '100%' }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: '24px' }}>
          Premium Bali Real Estate
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: 'clamp(52px, 8vw, 96px)', fontWeight: 300, lineHeight: 1.05, color: 'white', margin: '0 0 28px', letterSpacing: '-1px' }}>
          Find Your <span style={{ fontWeight: 700 }}>Dream Villa</span> in Bali
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.65)', fontSize: '17px', marginBottom: '40px', lineHeight: 1.65, maxWidth: '540px', margin: '0 auto 40px' }}>
          Curated villas and land across Bali's most sought-after locations. Trusted by investors worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#listings" style={{ backgroundColor: 'white', color: 'black', fontSize: '14px', padding: '15px 36px', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.3px' }}>
            View Listings
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            style={{ border: '1.5px solid rgba(255,255,255,0.6)', color: 'white', fontSize: '14px', padding: '15px 36px', textDecoration: 'none', letterSpacing: '0.3px' }}>
            Contact Agent
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
          style={{ display: 'flex', gap: '56px', justifyContent: 'center', marginTop: '72px', flexWrap: 'wrap' }}>
          {[{ n: '50+', l: 'Properties' }, { n: '10+', l: 'Years Exp' }, { n: '1000+', l: 'Villas Managed' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '36px', fontWeight: 300, color: 'white', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '8px' }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Slide Dots */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}
            style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>

      {/* Slide Arrows */}
      <button onClick={() => setCurrent((current - 1 + slides.length) % slides.length)}
        style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', zIndex: 3, backdropFilter: 'blur(4px)' }}>
        ‹
      </button>
      <button onClick={() => setCurrent((current + 1) % slides.length)}
        style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.3)', color: 'white', width: '44px', height: '44px', cursor: 'pointer', fontSize: '18px', zIndex: 3, backdropFilter: 'blur(4px)' }}>
        ›
      </button>
    </div>
  )
}