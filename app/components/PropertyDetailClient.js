'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const USD_RATE = 0.000062

export default function PropertyDetailClient({ property: p, related }) {
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

      {/* Hero Slider */}
      <div style={{ position: 'relative', height: 'clamp(260px, 50vw, 520px)', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
        <motion.img
          key={mainImg}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          src={images[mainImg] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200'}
          alt={p.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)' }} />

        {images.length > 1 && (
          <>
            <button onClick={() => setMainImg((mainImg - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>‹</button>
            <button onClick={() => setMainImg((mainImg + 1) % images.length)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', width: '40px', height: '40px', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>›</button>
          </>
        )}

        <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '11px', padding: '3px 8px', zIndex: 2 }}>
          {mainImg + 1} / {images.length}
        </div>
        <a href="/properties" style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.9)', color: 'black', fontSize: '12px', padding: '7px 12px', textDecoration: 'none', fontWeight: 500, zIndex: 2 }}>
          ← Back
        </a>
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div style={{ borderBottom: '1px solid #f3f4f6', padding: '12px clamp(20px, 5vw, 48px)', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '8px', maxWidth: '1100px', margin: '0 auto' }}>
            {images.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                style={{ flexShrink: 0, width: '72px', height: '52px', padding: 0, border: i === mainImg ? '2px solid black' : '2px solid transparent', cursor: 'pointer', overflow: 'hidden' }}>
                <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gap: '32px' }} className="detail-grid">

          {/* Info */}
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>{p.location}, Bali</p>
            <h1 style={{ fontSize: 'clamp(20px, 4vw, 32px)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.25 }}>{p.title}</h1>
            <p style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, marginBottom: '4px' }}>{formatPrice(p.price)}</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '24px' }}>{typeLabel[p.price_type] || p.price_type}</p>

            {/* Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '20px 0', marginBottom: '24px' }}>
              {p.bedrooms > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Beds</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.bedrooms}</p></div>}
              {p.bathrooms > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Baths</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.bathrooms}</p></div>}
              {p.land_size > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Land</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.land_size} sqm</p></div>}
              {p.building_size > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Building</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.building_size} sqm</p></div>}
            </div>

            {/* Description */}
            <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>About this property</h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '32px' }}>{p.description}</p>

            {/* CTA mobile */}
            <div style={{ border: '1px solid #e5e7eb', padding: '20px', marginBottom: '32px' }} className="mobile-cta">
              <p style={{ fontWeight: 700, fontSize: '20px', marginBottom: '4px' }}>{formatPrice(p.price)}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>{typeLabel[p.price_type]}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', backgroundColor: 'black', color: 'white', fontSize: '14px', fontWeight: 600, padding: '13px', textDecoration: 'none', marginBottom: '8px' }}>
                WhatsApp Inquiry
              </a>
              <a href="/properties"
                style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '13px', padding: '11px', textDecoration: 'none' }}>
                View All Listings
              </a>
            </div>

            {/* Gallery */}
            {images.length > 1 && (
              <div style={{ marginBottom: '40px' }}>
                <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '16px' }}>Photo Gallery</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '8px' }}>
                  {images.map((img, i) => (
                    <div key={i} onClick={() => { setMainImg(i); window.scrollTo({ top: 64, behavior: 'smooth' }) }}
                      style={{ cursor: 'pointer', overflow: 'hidden', aspectRatio: '4/3', border: i === mainImg ? '2px solid black' : '2px solid transparent' }}>
                      <img src={img} alt={p.title + ' ' + (i + 1)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s' }}
                        onMouseEnter={e => e.target.style.transform = 'scale(1.06)'}
                        onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Property Details */}
            <div style={{ border: '1px solid #e5e7eb', padding: '20px', marginBottom: '40px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>Property Details</p>
              {[
                { label: 'Status', value: p.status === 'for_sale' ? 'For Sale' : 'For Rent' },
                { label: 'Type', value: p.property_type },
                { label: 'Ownership', value: typeLabel[p.price_type] || p.price_type },
                { label: 'Location', value: p.location + ', Bali' },
                { label: 'Area', value: p.area },
              ].map(d => (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#9ca3af' }}>{d.label}</span>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{d.value}</span>
                </div>
              ))}
            </div>

            {/* Related Properties */}
            {related && related.length > 0 && (
              <div>
                <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px' }}>Other Properties You Might Like</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '16px' }}>
                  {related.map(r => (
                    <a key={r.slug} href={'/property/' + r.slug} style={{ textDecoration: 'none', color: 'black', border: '1px solid #f3f4f6', display: 'block' }}>
                      <img src={r.images ? r.images.split(',')[0].trim() : ''} alt={r.title}
                        style={{ width: '100%', height: '160px', objectFit: 'cover', display: 'block' }} />
                      <div style={{ padding: '12px' }}>
                        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px' }}>{r.location}, Bali</p>
                        <p style={{ fontSize: '13px', fontWeight: 500, marginBottom: '8px', lineHeight: 1.4 }}>{r.title}</p>
                        <p style={{ fontSize: '14px', fontWeight: 700 }}>{formatPrice(r.price)}</p>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>

      {/* Sticky CTA desktop */}
      <div style={{ position: 'fixed', bottom: '90px', right: '24px', zIndex: 100, width: '280px' }} className="desktop-cta">
        <div style={{ border: '1px solid #e5e7eb', padding: '20px', backgroundColor: 'white', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <p style={{ fontWeight: 700, fontSize: '18px', marginBottom: '4px' }}>{formatPrice(p.price)}</p>
          <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>{typeLabel[p.price_type]}</p>
          <a href={waLink} target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', textAlign: 'center', backgroundColor: 'black', color: 'white', fontSize: '13px', fontWeight: 600, padding: '12px', textDecoration: 'none', marginBottom: '8px' }}>
            WhatsApp Inquiry
          </a>
          <a href="/properties"
            style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '13px', padding: '10px', textDecoration: 'none' }}>
            All Listings
          </a>
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (min-width: 900px) {
          .detail-grid { grid-template-columns: minmax(0, 1fr) 300px !important; }
          .mobile-cta { display: none !important; }
        }
        @media (max-width: 899px) {
          .desktop-cta { display: none !important; }
        }
      `}</style>
    </main>
  )
}