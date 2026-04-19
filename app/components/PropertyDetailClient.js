'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const USD_RATE = 0.000062

export default function PropertyDetailClient({ property: p }) {
  const [currency, setCurrency] = useState('IDR')
  const [mainImg, setMainImg] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('gbp_currency')
    if (saved) setCurrency(saved)
    const handler = (e) => setCurrency(e.detail)
    window.addEventListener('currencyChange', handler)
    return () => window.removeEventListener('currencyChange', handler)
  }, [])

  const formatPrice = (price) => {
    if (currency === 'USD') {
      const usd = price * USD_RATE
      if (usd >= 1000000) return `$${(usd / 1000000).toFixed(1)}M`
      if (usd >= 1000) return `$${Math.round(usd / 1000)}K`
      return `$${Math.round(usd).toLocaleString()}`
    }
    if (price >= 1000000000) return `IDR ${(price / 1000000000).toFixed(1)}B`
    if (price >= 1000000) return `IDR ${(price / 1000000).toFixed(0)}M`
    return `IDR ${price.toLocaleString()}`
  }

  const images = p.images ? p.images.split(',').map(s => s.trim()).filter(Boolean) : []
  const typeLabel = { leasehold: 'Leasehold', freehold: 'Freehold', yearly: 'Yearly Rent' }
  const waMessage = encodeURIComponent('Hi, I am interested in ' + p.title)
  const waLink = 'https://wa.me/' + p.whatsapp + '?text=' + waMessage

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', minHeight: '100vh', paddingTop: '64px' }}>

      {/* Hero Image Slider */}
      <div style={{ position: 'relative', height: 'clamp(300px, 55vw, 560px)', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
        <motion.img
          key={mainImg}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          src={images[mainImg] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200'}
          alt={p.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 60%, rgba(0,0,0,0.4) 100%)' }} />

        {/* Arrows */}
        {images.length > 1 && (
          <>
            <button onClick={() => setMainImg((mainImg - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', width: '44px', height: '44px', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ‹
            </button>
            <button onClick={() => setMainImg((mainImg + 1) % images.length)}
              style={{ position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', width: '44px', height: '44px', fontSize: '22px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ›
            </button>
          </>
        )}

        {/* Image counter */}
        <div style={{ position: 'absolute', bottom: '16px', right: '16px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '12px', padding: '4px 10px' }}>
          {mainImg + 1} / {images.length}
        </div>

        {/* Back link */}
        <a href="/properties" style={{ position: 'absolute', top: '16px', left: '16px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', fontSize: '13px', padding: '8px 14px', textDecoration: 'none', fontWeight: 500 }}>
          ← All Properties
        </a>
      </div>

      {/* Thumbnail Gallery */}
      {images.length > 1 && (
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '16px clamp(20px, 5vw, 48px)' }}>
          <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
            {images.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                style={{ flexShrink: 0, width: '80px', height: '60px', padding: 0, border: i === mainImg ? '2px solid black' : '2px solid transparent', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 320px', gap: '48px', alignItems: 'start' }}>

          {/* Left */}
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{p.location}, Bali</p>
            <h1 style={{ fontSize: 'clamp(22px, 4vw, 36px)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.2 }}>{p.title}</h1>
            <p style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontWeight: 700, marginBottom: '4px' }}>{formatPrice(p.price)}</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '32px' }}>{typeLabel[p.price_type] || p.price_type}</p>

            {/* Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '16px', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '24px 0', marginBottom: '32px' }}>
              {p.bedrooms > 0 && (
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Bedrooms</p>
                  <p style={{ fontWeight: 600, fontSize: '16px' }}>{p.bedrooms}</p>
                </div>
              )}
              {p.bathrooms > 0 && (
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Bathrooms</p>
                  <p style={{ fontWeight: 600, fontSize: '16px' }}>{p.bathrooms}</p>
                </div>
              )}
              {p.land_size > 0 && (
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Land Size</p>
                  <p style={{ fontWeight: 600, fontSize: '16px' }}>{p.land_size} sqm</p>
                </div>
              )}
              {p.building_size > 0 && (
                <div>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Building</p>
                  <p style={{ fontWeight: 600, fontSize: '16px' }}>{p.building_size} sqm</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>About this property</h2>
              <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8 }}>{p.description}</p>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div>
                <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Photo Gallery</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '8px' }}>
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setMainImg(i)}
                      style={{ cursor: 'pointer', overflow: 'hidden', aspectRatio: '4/3', border: i === mainImg ? '2px solid black' : '2px solid transparent' }}>
                      <img src={img} alt={p.title + ' ' + (i + 1)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right — CTA */}
          <div style={{ position: 'sticky', top: '80px' }}>
            <div style={{ border: '1px solid #e5e7eb', padding: '24px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Interested?</p>
              <p style={{ fontWeight: 700, fontSize: '22px', marginBottom: '4px' }}>{formatPrice(p.price)}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '24px' }}>{typeLabel[p.price_type]}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', width: '100%', textAlign: 'center', backgroundColor: 'black', color: 'white', fontSize: '14px', fontWeight: 600, padding: '14px', textDecoration: 'none', marginBottom: '10px', boxSizing: 'border-box' }}>
                WhatsApp Inquiry
              </a>
              <a href="/properties"
                style={{ display: 'block', width: '100%', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '14px', padding: '13px', textDecoration: 'none', boxSizing: 'border-box' }}>
                View All Listings
              </a>
            </div>

            {/* Property details sidebar */}
            <div style={{ border: '1px solid #e5e7eb', padding: '20px', marginTop: '16px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Property Details</p>
              {[
                { label: 'Status', value: p.status === 'for_sale' ? 'For Sale' : 'For Rent' },
                { label: 'Type', value: p.property_type },
                { label: 'Ownership', value: typeLabel[p.price_type] || p.price_type },
                { label: 'Location', value: p.location + ', ' + p.area },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#9ca3af' }}>{d.label}</span>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>

    </main>
  )
}