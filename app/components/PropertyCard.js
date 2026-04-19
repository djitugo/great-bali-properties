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
      return `$${Math.round(usd).toLocaleString()}`
    }
    if (price >= 1000000000) return `IDR ${(price / 1000000000).toFixed(1)}B`
    if (price >= 1000000) return `IDR ${(price / 1000000).toFixed(0)}M`
    return `IDR ${price.toLocaleString()}`
  }

  const typeLabel = { leasehold: 'Leasehold', freehold: 'Freehold', yearly: 'Yearly' }
  const waMessage = encodeURIComponent('Hi, I am interested in ' + property.title)
  const waLink = 'https://wa.me/' + property.whatsapp + '?text=' + waMessage

  // Support multiple images (comma separated) or single
  const images = property.images ? property.images.split(',').map(s => s.trim()) : []
  const hasMultiple = images.length > 1

  return (
    <div style={{ border: '1px solid #f3f4f6', backgroundColor: 'white', transition: 'border-color 0.2s' }}
      onMouseEnter={e => e.currentTarget.style.borderColor = '#d1d5db'}
      onMouseLeave={e => e.currentTarget.style.borderColor = '#f3f4f6'}>

      {/* Image Slider */}
      <div style={{ position: 'relative', overflow: 'hidden', height: '220px' }}>
        <a href={'/property/' + property.slug}>
          <img src={images[imgIndex] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800'}
            alt={property.title}
            style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
            onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
            onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
        </a>

        {/* Badges */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', display: 'flex', gap: '6px' }}>
          <span style={{ backgroundColor: 'white', color: 'black', fontSize: '11px', padding: '4px 10px', fontWeight: 600 }}>
            {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
          </span>
          {property.featured && (
            <span style={{ backgroundColor: 'black', color: 'white', fontSize: '11px', padding: '4px 10px', fontWeight: 600 }}>
              Featured
            </span>
          )}
        </div>

        {/* Image Nav Arrows */}
        {hasMultiple && (
          <>
            <button onClick={() => setImgIndex((imgIndex - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: '8px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ‹
            </button>
            <button onClick={() => setImgIndex((imgIndex + 1) % images.length)}
              style={{ position: 'absolute', right: '8px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.4)', color: 'white', border: 'none', width: '28px', height: '28px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ›
            </button>
            <div style={{ position: 'absolute', bottom: '8px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '4px' }}>
              {images.map((_, i) => (
                <div key={i} onClick={() => setImgIndex(i)}
                  style={{ width: i === imgIndex ? '16px' : '6px', height: '6px', borderRadius: '3px', backgroundColor: 'white', opacity: i === imgIndex ? 1 : 0.5, cursor: 'pointer', transition: 'all 0.3s' }} />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <a href={'/property/' + property.slug} style={{ textDecoration: 'none', color: 'black', display: 'block', padding: '16px 16px 12px' }}>
        <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '4px' }}>{property.location}, Bali</p>
        <h3 style={{ fontWeight: 500, fontSize: '14px', lineHeight: 1.4, marginBottom: '12px', color: 'black' }}>{property.title}</h3>
        <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: '#9ca3af', marginBottom: '14px' }}>
          {property.bedrooms > 0 && <span>{property.bedrooms} Beds</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} Baths</span>}
          {property.land_size > 0 && <span>{property.land_size} sqm</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '16px', color: 'black', marginBottom: '2px' }}>{formatPrice(property.price)}</p>
            <p style={{ fontSize: '11px', color: '#9ca3af' }}>{typeLabel[property.price_type] || property.price_type}</p>
          </div>
          <span style={{ fontSize: '12px', border: '1px solid black', padding: '6px 14px', color: 'black', fontWeight: 500 }}>
            View Detail
          </span>
        </div>
      </a>

      {/* WhatsApp */}
      <div style={{ padding: '0 16px 16px' }}>
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '12px', padding: '8px', textDecoration: 'none', transition: 'all 0.2s' }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.color = 'black' }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.color = '#6b7280' }}>
          WhatsApp Inquiry
        </a>
      </div>
    </div>
  )
}