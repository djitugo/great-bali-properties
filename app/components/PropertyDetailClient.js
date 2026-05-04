'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useT, useLang } from '../lib/i18n'
import { waLinkFor } from '../lib/site'
import { getPropertyDetails } from '../lib/propertyDetails'
import dynamic from 'next/dynamic'

const PropertyLocationMap = dynamic(() => import('./PropertyLocationMap'), { ssr: false })

const USD_RATE = 0.000062

/* ───────── Inline SVG icon set (no external dep) ───────── */
const Icon = ({ name, size = 22, color = '#111827' }) => {
  const common = { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: color, strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round' }
  switch (name) {
    case 'tag':       return <svg {...common}><path d="M20.59 13.41 12 22l-9-9V3h10l9.59 9.59a2 2 0 0 1 0 2.82Z"/><circle cx="7.5" cy="7.5" r="1.5"/></svg>
    case 'hash':      return <svg {...common}><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>
    case 'bed':       return <svg {...common}><path d="M2 17v-5a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v5"/><line x1="2" y1="17" x2="22" y2="17"/><path d="M2 21v-4M22 21v-4"/><circle cx="7" cy="11" r="1.5"/></svg>
    case 'bath':      return <svg {...common}><path d="M3 12h18v3a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4v-3Z"/><path d="M5 12V6a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2"/><line x1="6" y1="22" x2="6" y2="20"/><line x1="18" y1="22" x2="18" y2="20"/></svg>
    case 'shower':    return <svg {...common}><path d="M5 16V8a4 4 0 0 1 8 0v1"/><circle cx="13" cy="9" r="1.5"/><path d="M9 19v.01M12 21v.01M15 19v.01M9 22v.01M12 24v.01M15 22v.01"/><path d="M3 16h12"/></svg>
    case 'building':  return <svg {...common}><rect x="4" y="3" width="16" height="18"/><line x1="9" y1="8" x2="9" y2="8"/><line x1="15" y1="8" x2="15" y2="8"/><line x1="9" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="15" y2="12"/><line x1="9" y1="16" x2="9" y2="16"/><line x1="15" y1="16" x2="15" y2="16"/></svg>
    case 'land':      return <svg {...common}><polygon points="3 20 21 20 17 4 7 4 3 20"/><line x1="3" y1="20" x2="21" y2="20"/></svg>
    case 'calendar':  return <svg {...common}><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
    case 'wifi':      return <svg {...common}><path d="M5 12.55a11 11 0 0 1 14 0"/><path d="M2 8.5a16 16 0 0 1 20 0"/><path d="M8.5 16.5a6 6 0 0 1 7 0"/><circle cx="12" cy="20" r="1"/></svg>
    case 'map':       return <svg {...common}><polygon points="1 6 8 3 16 6 23 3 23 18 16 21 8 18 1 21 1 6"/><line x1="8" y1="3" x2="8" y2="18"/><line x1="16" y1="6" x2="16" y2="21"/></svg>
    case 'check':     return <svg {...common}><polyline points="20 6 9 17 4 12"/></svg>
    case 'star':      return <svg {...common}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    case 'pin':       return <svg {...common}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/></svg>
    case 'pool':      return <svg {...common}><path d="M2 18c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/><path d="M2 14c2 0 2-1 4-1s2 1 4 1 2-1 4-1 2 1 4 1 2-1 4-1"/><path d="M6 13V5a2 2 0 0 1 4 0M14 13V5a2 2 0 0 1 4 0"/></svg>
    case 'view':      return <svg {...common}><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12Z"/><circle cx="12" cy="12" r="3"/></svg>
    case 'car':       return <svg {...common}><path d="M5 17h14l-1.5-7H6.5L5 17Z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/><path d="M3 17h2M19 17h2"/></svg>
    case 'bolt':      return <svg {...common}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
    case 'drop':      return <svg {...common}><path d="M12 2s7 8 7 13a7 7 0 0 1-14 0c0-5 7-13 7-13Z"/></svg>
    case 'sofa':      return <svg {...common}><path d="M3 14v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4"/><path d="M5 14v-3a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3"/><path d="M3 14a2 2 0 0 1 2-2 2 2 0 0 1 2 2v3"/><path d="M21 14a2 2 0 0 0-2-2 2 2 0 0 0-2 2v3"/></svg>
    case 'shield':    return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z"/></svg>
    case 'compass':   return <svg {...common}><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
    case 'sparkle':   return <svg {...common}><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6 7.7 7.7M16.3 16.3l2.1 2.1M5.6 18.4 7.7 16.3M16.3 7.7l2.1-2.1"/></svg>
    case 'arrow':     return <svg {...common}><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
    default:          return <svg {...common}><circle cx="12" cy="12" r="9"/></svg>
  }
}

/* ───────── price formatter — full digits, no B / K ───────── */
function formatPriceFull(price, currency) {
  if (currency === 'USD') {
    const usd = Math.round(price * USD_RATE)
    return `$${usd.toLocaleString('en-US')}`
  }
  return `IDR ${Number(price).toLocaleString('en-US')}`
}

/* ───────── Related listing card (kept compact short prices for tile) ───────── */
function RelatedCard({ property }) {
  const t = useT()
  const { lang } = useLang()
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

  const images = property.images ? property.images.split(',').map(s => s.trim()).filter(Boolean) : []
  const typeLabel = { leasehold: t('Leasehold'), freehold: t('Freehold'), yearly: t('Yearly') }

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
            {property.status === 'for_sale' ? t('For Sale') : t('For Rent')}
          </span>
          {property.featured && (
            <span style={{ backgroundColor: 'black', color: 'white', fontSize: '10px', padding: '3px 8px', fontWeight: 600 }}>{t('Featured')}</span>
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
          {property.bedrooms > 0 && <span>{property.bedrooms} {t('Beds')}</span>}
          {property.bathrooms > 0 && <span>{property.bathrooms} {t('Baths')}</span>}
          {property.land_size > 0 && <span>{property.land_size} {t('sqm')}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: '14px', color: 'black', marginBottom: '2px' }}>{formatPriceFull(property.price, currency)}</p>
            <p style={{ fontSize: '10px', color: '#9ca3af' }}>{typeLabel[property.price_type] || property.price_type}</p>
          </div>
          <span style={{ fontSize: '11px', border: '1px solid #e5e7eb', padding: '5px 12px', color: '#374151' }}>{t('View →')}</span>
        </div>
      </a>

      <div style={{ padding: '0 14px 14px' }}>
        <a href={waLinkFor(property.title, lang, property.whatsapp)}
          target="_blank" rel="noopener noreferrer"
          style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '11px', padding: '8px', textDecoration: 'none' }}>
          {t('WhatsApp Inquiry')}
        </a>
      </div>
    </div>
  )
}

/* ───────── Spec card used in the wide stats strip ───────── */
function SpecCard({ icon, label, value }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: '14px',
      padding: '18px 22px', flex: '1 1 180px', minWidth: '160px',
      borderRight: '1px solid #f1f5f4',
    }}>
      <div style={{
        width: '42px', height: '42px', borderRadius: '50%',
        backgroundColor: '#111827',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        <Icon name={icon} size={20} color="#ffffff" />
      </div>
      <div style={{ minWidth: 0 }}>
        <p style={{ fontWeight: 700, fontSize: '15px', color: '#111827', lineHeight: 1.2, marginBottom: '2px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</p>
        <p style={{ fontSize: '11px', color: '#6b7280', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{label}</p>
      </div>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */

export default function PropertyDetailClient({ property: p, related }) {
  const t = useT()
  const { lang } = useLang()
  const [currency, setCurrency] = useState('IDR')
  const [mainImg, setMainImg] = useState(0)
  const [galleryImg, setGalleryImg] = useState(0)

  useEffect(() => {
    const saved = localStorage.getItem('gbp_currency')
    if (saved) setCurrency(saved)
    const handler = (e) => setCurrency(e.detail)
    window.addEventListener('currencyChange', handler)
    return () => window.removeEventListener('currencyChange', handler)
  }, [])

  const images = p.images ? p.images.split(',').map(s => s.trim()).filter(Boolean) : []
  const typeLabel = { leasehold: t('Leasehold'), freehold: t('Freehold'), yearly: t('Yearly Rent') }
  const propertyTypeLabel = { villa: t('Villa'), land: t('Land'), commercial: t('Commercial') }
  const waLink = waLinkFor(p.title, lang, p.whatsapp)
  const details = getPropertyDetails(p.slug) || {}
  const propTypeText = (typeLabel[p.price_type] ? typeLabel[p.price_type] + ' ' : '') + (propertyTypeLabel[p.property_type] || p.property_type || '')

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', minHeight: '100vh', paddingTop: '64px' }}>

      {/* ───────── Hero Slider ───────── */}
      <div style={{ position: 'relative', height: 'clamp(280px, 55vw, 600px)', overflow: 'hidden', backgroundColor: '#f3f4f6' }}>
        <AnimatePresence mode="wait">
          <motion.img
            key={mainImg}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            src={images[mainImg] || 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1600'}
            alt={p.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
          />
        </AnimatePresence>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.45) 100%)' }} />

        {images.length > 1 && (
          <>
            <button onClick={() => setMainImg((mainImg - 1 + images.length) % images.length)}
              style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', width: '44px', height: '44px', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>‹</button>
            <button onClick={() => setMainImg((mainImg + 1) % images.length)}
              style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(4px)', border: '1px solid rgba(255,255,255,0.4)', color: 'white', width: '44px', height: '44px', fontSize: '20px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>›</button>
          </>
        )}

        <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '12px', padding: '4px 10px', zIndex: 2 }}>
          {mainImg + 1} / {images.length}
        </div>
        <a href="/properties" style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'rgba(255,255,255,0.92)', color: 'black', fontSize: '12px', padding: '7px 14px', textDecoration: 'none', fontWeight: 500, zIndex: 2 }}>
          {t('← Back')}
        </a>
      </div>

      {/* ───────── Wide Stats Strip (Prestige-style) ───────── */}
      <div style={{ borderBottom: '1px solid #f1f5f4', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1500px', margin: '0 auto', padding: '0 clamp(16px, 3vw, 32px)' }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap',
            border: '1px solid #f1f5f4',
            borderRadius: '4px',
            margin: '-32px 0 0',
            position: 'relative', zIndex: 5,
            backgroundColor: 'white',
            boxShadow: '0 8px 24px rgba(0,0,0,0.06)',
          }}>
            <SpecCard icon="tag"      label={t('Property Type')} value={propTypeText || '—'} />
            {details.villa_id && <SpecCard icon="hash" label={t('Ref. ID')} value={details.villa_id} />}
            {p.bedrooms > 0  && <SpecCard icon="bed"      label={t('Bedrooms')}  value={p.bedrooms} />}
            {p.bathrooms > 0 && <SpecCard icon={details.bathroom_type === 'shower' ? 'shower' : 'bath'} label={t('Bathrooms')} value={p.bathrooms} />}
            {p.building_size > 0 && <SpecCard icon="building" label={t('Building (sqm)')} value={p.building_size} />}
            {p.land_size > 0 && <SpecCard icon="land"     label={t('Land (sqm)')} value={p.land_size} />}
            {details.year_built && <SpecCard icon="calendar" label={t('Year Built')} value={details.year_built} />}
          </div>
        </div>
      </div>

      {/* ───────── Main Content ───────── */}
      <div style={{ maxWidth: '1500px', margin: '0 auto', padding: 'clamp(48px, 5vw, 72px) clamp(16px, 3vw, 32px) clamp(32px, 4vw, 48px)' }}>
        <div className="detail-grid" style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '40px' }}>

          {/* ── Left column ── */}
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px' }}>{p.location}, Bali</p>
            <h1 style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '10px', lineHeight: 1.2 }}>{p.title}</h1>
            {details.subtitle && <p style={{ fontSize: '14px', color: '#4b5563', fontWeight: 500, marginBottom: '14px', letterSpacing: '0.3px' }}>{details.subtitle}</p>}
            <p style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, marginBottom: '4px', color: '#111827' }}>{formatPriceFull(p.price, currency)}</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '36px' }}>{typeLabel[p.price_type] || p.price_type}</p>

            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{ fontSize: '22px', fontWeight: 600, marginBottom: '16px', color: '#111827' }}>{t('Description')}</h2>
              <p style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.85, whiteSpace: 'pre-line' }}>{p.description}</p>
            </div>

            {/* Mobile CTA */}
            <div className="mobile-cta" style={{ border: '1px solid #e5e7eb', padding: '20px', marginBottom: '32px' }}>
              <p style={{ fontWeight: 700, fontSize: '20px', marginBottom: '4px', color: '#111827' }}>{formatPriceFull(p.price, currency)}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '16px' }}>{typeLabel[p.price_type]}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', backgroundColor: '#111827', color: 'white', fontSize: '14px', fontWeight: 600, padding: '13px', textDecoration: 'none', marginBottom: '8px' }}>
                {t('WhatsApp Inquiry')}
              </a>
              <a href="/properties"
                style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '13px', padding: '11px', textDecoration: 'none' }}>
                {t('View All Listings')}
              </a>
            </div>

            {/* ───────── Key Features & Advantages ───────── */}
            {details.key_features && details.key_features.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Icon name="sparkle" size={22} color="#111827" />
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827' }}>{t('Key Features & Advantages')}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {details.key_features.map((f, i) => (
                    <div key={i} style={{
                      display: 'flex', gap: '14px',
                      padding: '20px',
                      border: '1px solid #e5e7eb',
                      borderLeft: '3px solid #111827',
                      backgroundColor: '#fafafa',
                    }}>
                      <div style={{ flexShrink: 0, marginTop: '2px' }}>
                        <Icon name="check" size={20} color="#111827" />
                      </div>
                      <div>
                        <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '4px', color: '#111827' }}>{f.title}</p>
                        <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.6 }}>{f.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ───────── Why You Should Buy This Property ───────── */}
            {details.why_buy && details.why_buy.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '20px' }}>
                  <Icon name="star" size={22} color="#111827" />
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827' }}>{t('Why You Should Buy This Property')}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
                  {details.why_buy.map((w, i) => (
                    <div key={i} style={{
                      padding: '24px',
                      border: '1px solid #e5e7eb',
                      backgroundColor: '#ffffff',
                      position: 'relative',
                    }}>
                      <div style={{
                        width: '36px', height: '36px',
                        borderRadius: '50%',
                        backgroundColor: '#111827',
                        color: 'white',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontWeight: 700, fontSize: '14px',
                        marginBottom: '14px',
                      }}>{i + 1}</div>
                      <p style={{ fontSize: '15px', fontWeight: 700, marginBottom: '8px', color: '#111827' }}>{w.title}</p>
                      <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.65 }}>{w.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ───────── Investment Structure ───────── */}
            {details.investment_structure && details.investment_structure.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Icon name="shield" size={22} color="#111827" />
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827' }}>{t('Investment Structure')}</h2>
                </div>
                <ul style={{ listStyle: 'none', padding: 0, border: '1px solid #e5e7eb', backgroundColor: '#fafafa' }}>
                  {details.investment_structure.map((line, i) => (
                    <li key={i} style={{ padding: '14px 20px', borderBottom: i < details.investment_structure.length - 1 ? '1px solid #e5e7eb' : 'none', display: 'flex', gap: '12px', alignItems: 'flex-start', fontSize: '14px', color: '#1f2937' }}>
                      <Icon name="check" size={16} color="#111827" />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* ───────── Photo Gallery (with big preview that follows clicks) ───────── */}
            {images.length > 1 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Icon name="view" size={22} color="#111827" />
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827' }}>{t('Photo Gallery')}</h2>
                </div>

                {/* Big preview */}
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#f3f4f6', marginBottom: '12px' }}>
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={galleryImg}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.35 }}
                      src={images[galleryImg]}
                      alt={p.title + ' ' + (galleryImg + 1)}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }}
                    />
                  </AnimatePresence>
                  <button onClick={() => setGalleryImg((galleryImg - 1 + images.length) % images.length)}
                    style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', width: '40px', height: '40px', cursor: 'pointer', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>‹</button>
                  <button onClick={() => setGalleryImg((galleryImg + 1) % images.length)}
                    style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', backgroundColor: 'rgba(0,0,0,0.45)', color: 'white', border: 'none', width: '40px', height: '40px', cursor: 'pointer', fontSize: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>›</button>
                  <div style={{ position: 'absolute', bottom: '12px', right: '12px', backgroundColor: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '12px', padding: '4px 10px' }}>
                    {galleryImg + 1} / {images.length}
                  </div>
                </div>

                {/* Thumbnails */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '8px' }}>
                  {images.map((img, i) => (
                    <div key={i} onClick={() => setGalleryImg(i)}
                      style={{ cursor: 'pointer', overflow: 'hidden', aspectRatio: '4/3', border: i === galleryImg ? '2px solid #111827' : '2px solid transparent', opacity: i === galleryImg ? 1 : 0.85, transition: 'opacity 0.2s' }}
                      onMouseEnter={e => e.currentTarget.style.opacity = 1}
                      onMouseLeave={e => e.currentTarget.style.opacity = i === galleryImg ? 1 : 0.85}>
                      <img src={img} alt={p.title + ' ' + (i + 1)}
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ───────── Nearby Destinations ───────── */}
            {details.nearby && details.nearby.length > 0 && (
              <div style={{ marginBottom: '48px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Icon name="compass" size={22} color="#111827" />
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827' }}>{t('Nearby Destinations & Accessibility')}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0', border: '1px solid #f3f4f6' }}>
                  {details.nearby.map((n, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 18px', borderBottom: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6' }}>
                      <Icon name="pin" size={16} color="#111827" />
                      <div style={{ flex: 1, fontSize: '13px', color: '#374151' }}>{n.name}</div>
                      <div style={{ fontSize: '13px', color: '#111827', fontWeight: 600 }}>{n.distance}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ───────── Other Details ───────── */}
            {details.other_details && Object.keys(details.other_details).length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <Icon name="building" size={22} color="#111827" />
                  <h2 style={{ fontSize: '22px', fontWeight: 600, color: '#111827' }}>{t('Other Details')}</h2>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '0', border: '1px solid #f3f4f6' }}>
                  {Object.entries(details.other_details).map(([k, v], i) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderBottom: '1px solid #f3f4f6', borderRight: '1px solid #f3f4f6', fontSize: '13px' }}>
                      <span style={{ color: '#6b7280' }}>{k}</span>
                      <span style={{ fontWeight: 600, color: '#111827', textAlign: 'right' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ───────── Property Summary card ───────── */}
            <div style={{ border: '1px solid #e5e7eb', padding: '24px', marginBottom: '24px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '16px' }}>{t('Property Summary')}</p>
              {[
                { label: t('Status'), value: p.status === 'for_sale' ? t('For Sale') : t('For Rent') },
                { label: t('Type'), value: propertyTypeLabel[p.property_type] || p.property_type },
                { label: t('Ownership'), value: typeLabel[p.price_type] || p.price_type },
                { label: t('Location'), value: p.location + ', Bali' },
                { label: t('Area'), value: p.area },
                { label: t('Zoning'), value: details.zoning },
                { label: t('Internet'), value: details.internet },
                { label: t('Year Built'), value: details.year_built },
              ].map(d => d.value && (
                <div key={d.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #f3f4f6', fontSize: '13px' }}>
                  <span style={{ color: '#9ca3af' }}>{d.label}</span>
                  <span style={{ fontWeight: 500, textTransform: 'capitalize' }}>{d.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right — Sticky CTA desktop ── */}
          <div className="desktop-cta" style={{ position: 'sticky', top: '80px', alignSelf: 'start' }}>
            <div style={{ border: '1px solid #e5e7eb', padding: '24px', marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{t('Interested?')}</p>
              <p style={{ fontWeight: 700, fontSize: '20px', marginBottom: '4px', color: '#111827', wordBreak: 'break-word' }}>{formatPriceFull(p.price, currency)}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '20px' }}>{typeLabel[p.price_type]}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                style={{ display: 'block', textAlign: 'center', backgroundColor: '#111827', color: 'white', fontSize: '14px', fontWeight: 600, padding: '13px', textDecoration: 'none', marginBottom: '10px' }}>
                {t('WhatsApp Inquiry')}
              </a>
              <a href="/properties"
                style={{ display: 'block', textAlign: 'center', border: '1px solid #e5e7eb', color: '#6b7280', fontSize: '13px', padding: '11px', textDecoration: 'none' }}>
                {t('All Listings')}
              </a>
            </div>

            <div style={{ border: '1px solid #e5e7eb', padding: '20px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '14px' }}>{t('Property Details')}</p>
              {[
                { label: t('Status'), value: p.status === 'for_sale' ? t('For Sale') : t('For Rent') },
                { label: t('Type'), value: propertyTypeLabel[p.property_type] || p.property_type },
                { label: t('Ownership'), value: typeLabel[p.price_type] || p.price_type },
                { label: t('Location'), value: p.location + ', Bali' },
                { label: t('Ref. ID'), value: details.villa_id },
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

      {/* ── LOCATION MAP ── */}
      <PropertyLocationMap location={p.location} title={p.title} mapUrl={details.map_url} address={details.address} />

      {/* ── OTHER LISTINGS YOU MIGHT LIKE ── */}
      {related && related.length > 0 && (
        <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 3vw, 32px)', backgroundColor: '#f9fafb' }}>
          <div style={{ maxWidth: '1500px', margin: '0 auto' }}>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>
                  {t('You Might Also Like')}
                </p>
                <h2 style={{ fontSize: 'clamp(22px, 4vw, 32px)', fontWeight: 300 }}>
                  <strong>{t('Other Listings')}</strong>
                </h2>
              </div>
              <a href="/properties"
                style={{ fontSize: '13px', color: 'black', textDecoration: 'none', border: '1px solid #e5e7eb', padding: '8px 16px', backgroundColor: 'white', whiteSpace: 'nowrap' }}>
                {t('View All Properties →')}
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

      <style>{`
        @media (min-width: 1000px) {
          .detail-grid { grid-template-columns: minmax(0, 1fr) 340px !important; }
          .mobile-cta { display: none !important; }
          .desktop-cta { display: block !important; }
        }
        @media (max-width: 999px) {
          .desktop-cta { display: none !important; }
          .mobile-cta { display: block !important; }
        }
      `}</style>
    </main>
  )
}
