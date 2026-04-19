'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const USD_RATE = 0.000062

function RelatedCard({ property }) {
  const [currency, setCurrency] = useState('IDR')
  const [imgIndex, setImgIndex] = useState(0)
  const [direction, setDirection] = useState(1)

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
      return `$${Math.round(usd / 1000)}K`
    }
    if (price >= 1000000000) return `IDR ${(price / 1000000000).toFixed(1)}B`
    if (price >= 1000000) return `IDR ${(price / 1000000).toFixed(0)}M`
    return `IDR ${price.toLocaleString()}`
  }

  const images = property.images ? property.images.split(',').map(s => s.trim()).filter(Boolean) : []
  const typeLabel = { leasehold: 'Leasehold', freehold: 'Freehold', yearly: 'Yearly' }

  const goTo = (i, dir) => { setDirection(dir); setImgIndex(i) }
  const goPrev = (e) => { e.preventDefault(); goTo((imgIndex - 1 + images.length) % images.length, -1) }
  const goNext = (e) => { e.preventDefault(); goTo((imgIndex + 1) % images.length, 1) }

  return (
    <div style={{ border: '1px solid #f3f4f6', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: '200px', flexShrink: 0 }}>
        <a href={'/property/' + property.slug} style={{ display: 'block', height: '100%' }}>
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={imgIndex}
              custom={direction}
              variants={{
                enter: (d) => ({ x: d > 0 ? '100%' : '-100%', opacity: 0 }),
                center: { x: 0, opacity: 1 },
                exit: (d) => ({ x: d > 0 ? '-100%' : '100%', opacity: 0 }),
              }}
              initial="enter" animate="center" exit="exit"
              transition={{ duration: 0.35, ease: 'easeInOut' }}
              src={images[imgIndex] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'}
              alt={property.title}
              style={{ width: '100%', height: '200px', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0 }}
            />
          </AnimatePresence>
        </a>

        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', zIndex: 2 }}>
          <span style={{ backgroundColor: 'white', color: 'black', fontSize: '10px', padding: '3px 8px', fontWeight: 600 }}>
            {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
          </span>
          {property.featured && (
            <span style={{ backgroundColor: 'black', color: 'white', fontSize: '10px', padding: '3px 8px', fontWeight: 600 }}>Featured</span>
          )}
        </div>

        {images.length > 1 && (
          <>
            <button onClick={goPrev} style={{ position: 'absolute', left: '6px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', width: '26px', height: '26px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>‹</button>
            <button onClick={goNext} style={{ position: 'absolute', right: '6px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', width: '26px', height: '26px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 3 }}>›</button>
          </>
        )}
      </div>

      <a href={'/property/' + property.slug} style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '14px 14px 10px', flex: 1 }}>
        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{property.location}, Bali</p>
        <h3 style={{ fontWeight: 500, fontSize: '13px', lineHeight: 1.45, marginBottom: '10px', color: 'black' }}>{property.title}</h3>
        <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: '#9ca3af', marginBottom: '12px' }}>
          {property.bedrooms > 0 && <span>{property.bedrooms} Beds</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} Baths</span>}
          {property.land_size > 0 && <span>{property.land_size} sqm</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '15px', color: 'black', marginBottom: '2px' }}>{formatPrice(property.price)}</p>
            <p style={{ fontSize: '10px', color: '#9ca3af' }}>{typeLabel[property.price_type] || property.price_type}</p>
          </div>
          <span style={{ fontSize: '11px', border: '1px solid #e5e7eb', padding: '5px 12px', color: '#374151' }}>View →</span>
        </div>
      </a>

      <div style={{ padding: '0 14px 14px' }}>
        <a href={'https://wa.me/' + property.whatsapp + '?text=' + encodeURIComponent('Hi, I am interested in ' + property.title)}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '11px', padding: '8px', textDecoration: 'none' }}>
          WhatsApp Inquiry
        </a>
      </div>
    </div>
  )
}

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
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImg}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={images[mainImg] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200'}
            alt={p.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
        </AnimatePresence>
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
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '32px' }}>

          {/* Left — Details */}
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>{p.location}, Bali</p>
            <h1 style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.2 }}>{p.title}</h1>
            <p style={{ fontSize: 'clamp(20px, 3vw, 26px)', fontWeight: 700, marginBottom: '4px' }}>{formatPrice(p.price)}</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '28px' }}>{typeLabel[p.price_type] || p.price_type}</p>

            {/* Specs */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: '12px', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb', padding: '20px 0', marginBottom: '28px' }}>
              {p.bedrooms > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Beds</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.bedrooms}</p></div>}
              {p.bathrooms > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Baths</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.bathrooms}</p></div>}
              {p.land_size > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Land</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.land_size} sqm</p></div>}
              {p.building_size > 0 && <div><p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>Building</p><p style={{ fontWeight: 600, fontSize: '16px' }}>{p.building_size} sqm</p></div>}
            </div>

            {/* Description */}
            <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '12px' }}>About this property</h2>
            <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8, marginBottom: '32px' }}>{p.description}</p>

            {/* Mobile CTA */}
            <div className="mobile-cta" style={{ border: '1px solid #e5e7eb', padding: '20px', marginBottom: '32px' }}>
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
              ].map(d => d.value && (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#9ca3af' }}>{d.label}</span>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Sticky CTA desktop */}
          <div className="desktop-cta" style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
            <div style={{ border: '1px solid #e5e7eb', padding: '24px', marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Interested?</p>
              <p style={{ fontWeight: 700, fontSize: '22px', marginBottom: '4px' }}>{formatPrice(p.price)}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '20px' }}>{typeLabel[p.price_type]}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', backgroundColor: 'black', color: 'white', fontSize: '14px', fontWeight: 600, padding: '13px', textDecoration: 'none', marginBottom: '10px' }}>
                WhatsApp Inquiry
              </a>
              <a href="/properties"
                style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '13px', padding: '11px', textDecoration: 'none' }}>
                All Listings
              </a>
            </div>

            <div style={{ border: '1px solid #e5e7eb', padding: '20px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>Property Details</p>
              {[
                { label: 'Status', value: p.status === 'for_sale' ? 'For Sale' : 'For Rent' },
                { label: 'Type', value: p.property_type },
                { label: 'Ownership', value: typeLabel[p.price_type] || p.price_type },
                { label: 'Location', value: p.location + ', Bali' },
              ].map(d => d.value && (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#9ca3af' }}>{d.label}</span>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── OTHER LISTINGS YOU MIGHT LIKE ── */}
      {related && related.length > 0 && (
        <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 48px)', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>
                  You Might Also Like
                </p>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 300 }}>
                  Other <strong>Listings</strong>
                </h2>
              </div>
              <a href="/properties"
                style={{ fontSize: '13px', color: 'black', textDecoration: 'none', border: '1px solid #e5e7eb', padding: '8px 16px', backgroundColor: 'white', whiteSpace: 'nowrap' }}>
                View All Properties →
              </a>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
              {related.map(r => (
                <RelatedCard key={r.slug} property={r} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @media (min-width: 900px) {
          .detail-grid { grid-template-columns: minmax(0, 1fr) 300px !important; }
          .mobile-cta { display: none !important; }
          .desktop-cta { display: block !important; }
        }
        @media (max-width: 899px) {
          .desktop-cta { display: none !important; }
          .mobile-cta { display: block !important; }
        }
      `}</style>
    </main>
  )
}