'use client'
import { useState, useEffect } from 'react'

const USD_RATE = 0.000062

export default function PropertyCard({ property }) {
  const [currency, setCurrency] = useState('IDR')
  const [imgIndex, setImgIndex] = useState(0)

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

  const typeLabel = { leasehold: 'Leasehold', freehold: 'Freehold', yearly: 'Yearly' }
  const waMessage = encodeURIComponent('Hi, I am interested in ' + property.title)
  const waLink = 'https://wa.me/' + property.whatsapp + '?text=' + waMessage
  const images = property.images ? property.images.split(',').map(s => s.trim()).filter(Boolean) : []
  const hasMultiple = images.length > 1

  return (
    <div style={{ border: '1px solid #f3f4f6', backgroundColor: 'white', display: 'flex', flexDirection: 'column' }}>

      {/* Image Slider */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px', flexShrink: 0 }}>
        <a href={'/property/' + property.slug} style={{ display: 'block', height: '100%' }}>
          <img
            src={images[imgIndex] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'}
            alt={property.title}
            style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.6s ease' }}
          />
        </a>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px', zIndex: 2 }}>
          <span style={{ backgroundColor: 'white', color: 'black', fontSize: '11px', padding: '4px 10px', fontWeight: 600 }}>
            {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
          </span>
          {property.featured && (
            <span style={{ backgroundColor: 'black', color: 'white', fontSize: '11px', padding: '4px 10px', fontWeight: 600 }}>Featured</span>
          )}
        </div>

        {/* Image counter */}
        {hasMultiple && (
          <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'rgba(0,0,0,0.5)', color: 'white', fontSize: '11px', padding: '3px 8px', zIndex: 2 }}>
            {imgIndex + 1} / {images.length}
          </div>
        )}

        {/* Arrows */}
        {hasMultiple && (
          <>
            <button
              onClick={e => { e.preventDefault(); setImgIndex((imgIndex - 1 + images.length) % images.length) }}
              style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', width: '30px', height: '30px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              ‹
            </button>
            <button
              onClick={e => { e.preventDefault(); setImgIndex((imgIndex + 1) % images.length) }}
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', width: '30px', height: '30px', cursor: 'pointer', fontSize: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>
              ›
            </button>

            {/* Dots */}
            <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '5px', zIndex: 2 }}>
              {images.map((_, i) => (
                <button key={i} onClick={e => { e.preventDefault(); setImgIndex(i) }}
                  style={{ width: i === imgIndex ? '18px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: 'white', opacity: i === imgIndex ? 1 : 0.5, border: 'none', cursor: 'pointer', transition: 'all 0.3s', padding: 0 }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <a href={'/property/' + property.slug} style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '16px 16px 10px', flex: 1 }}>
        <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '5px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{property.location}, Bali</p>
        <h3 style={{ fontWeight: 500, fontSize: '14px', lineHeight: 1.45, marginBottom: '12px', color: 'black' }}>{property.title}</h3>
        <div style={{ display: 'flex', gap: '14px', fontSize: '12px', color: '#9ca3af', marginBottom: '14px', flexWrap: 'wrap' }}>
          {property.bedrooms > 0 && <span>{property.bedrooms} Beds</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} Baths</span>}
          {property.land_size > 0 && <span>{property.land_size} sqm</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '16px', color: 'black', marginBottom: '2px' }}>{formatPrice(property.price)}</p>
            <p style={{ fontSize: '11px', color: '#9ca3af' }}>{typeLabel[property.price_type] || property.price_type}</p>
          </div>
          <span style={{ fontSize: '12px', border: '1px solid #e5e7eb', padding: '6px 14px', color: '#374151' }}>
            View →
          </span>
        </div>
      </a>

      {/* WhatsApp */}
      <div style={{ padding: '0 16px 16px' }}>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '12px', padding: '9px', textDecoration: 'none' }}>
          WhatsApp Inquiry
        </a>
      </div>
    </div>
  )
}