'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT } from '../lib/i18n'
import { SITE_WA } from '../lib/site'

const slides = [
  { url: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80', label: 'Bali Temple' },
  { url: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1800&q=80', label: 'Villa Pool' },
  { url: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1800&q=80', label: 'Bali Nature' },
  { url: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1800&q=80', label: 'Bali Villa' },
]

export default function HeroSlider() {
  const t = useT()
  const [current, setCurrent] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    const t = setInterval(() => setCurrent(p => (p + 1) % slides.length), 6000)
    return () => { clearInterval(t); window.removeEventListener('resize', check) }
  }, [])

  const prev = () => setCurrent(p => (p - 1 + slides.length) % slides.length)
  const next = () => setCurrent(p => (p + 1) % slides.length)

  return (
    <div style={{ position: 'relative', height: '100svh', minHeight: '600px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

      <AnimatePresence mode="wait">
        <motion.div key={current}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <motion.img
            src={slides[current].url}
            alt={slides[current].label}
            initial={{ scale: 1.08 }} animate={{ scale: 1 }}
            transition={{ duration: 7, ease: 'linear' }}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          {/* #6 — overlay lebih gelap */}
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.75) 100%)' }} />
        </motion.div>
      </AnimatePresence>

      <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 20px', maxWidth: '1000px', width: '100%' }}>
        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: '20px' }}>
          {t('Premium Bali Real Estate')}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: isMobile ? '36px' : '64px', fontWeight: 300, lineHeight: 1.1, color: 'white', margin: '0 0 16px', letterSpacing: '-0.5px', whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
          {t('Find Your')} <span style={{ fontWeight: 700 }}>{t('Dream Villa')}</span> {t('in Bali')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
          style={{ color: 'rgba(255,255,255,0.75)', fontSize: isMobile ? '14px' : '17px', marginBottom: '32px', lineHeight: 1.5, whiteSpace: isMobile ? 'normal' : 'nowrap' }}>
          {t("Curated villas and land across Bali's most sought-after locations. Trusted by investors worldwide.")}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
          style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="#listings" style={{ backgroundColor: 'white', color: 'black', fontSize: '13px', padding: '13px 28px', textDecoration: 'none', fontWeight: 600 }}>{t('View Listings')}</a>
          <a href={`https://wa.me/${SITE_WA}`} target="_blank" rel="noopener noreferrer"
            style={{ border: '1.5px solid rgba(255,255,255,0.7)', color: 'white', fontSize: '13px', padding: '13px 28px', textDecoration: 'none' }}>
            {t('Contact Agent')}
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
          style={{ display: 'flex', gap: '40px', justifyContent: 'center', marginTop: '56px', flexWrap: 'wrap' }}>
          {[{ n: '50+', l: 'Properties' }, { n: '10+', l: 'Years Exp' }, { n: '1000+', l: 'Managed' }].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: isMobile ? '28px' : '40px', fontWeight: 300, color: 'white', lineHeight: 1 }}>{s.n}</div>
              <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '6px' }}>{t(s.l)}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Arrows — desktop only */}
      {!isMobile && (
        <>
          <button onClick={prev} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
          <button onClick={next} style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.12)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.25)', color: 'white', width: '40px', height: '40px', cursor: 'pointer', fontSize: '20px', zIndex: 3, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
        </>
      )}

      <div style={{ position: 'absolute', bottom: '24px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '8px', zIndex: 3 }}>
        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? '24px' : '8px', height: '8px', borderRadius: '4px', backgroundColor: i === current ? 'white' : 'rgba(255,255,255,0.4)', border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
        ))}
      </div>
    </div>
  )
}