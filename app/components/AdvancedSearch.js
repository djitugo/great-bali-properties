'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { useT } from '../lib/i18n'

const MAX_IDR = 10000000000
const USD_RATE = 0.000062

export default function AdvancedSearch() {
  const t = useT()
  const router = useRouter()
  const searchParams = useSearchParams()
  const minRef = useRef(null)
  const maxRef = useRef(null)
  const trackRef = useRef(null)

  const [currency, setCurrency] = useState('IDR')
  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [priceType, setPriceType] = useState(searchParams.get('price_type') || '')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('minPrice')) || 0)
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || MAX_IDR)
  const [showAdvanced, setShowAdvanced] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gbp_currency')
    if (saved) setCurrency(saved)
    const handler = (e) => setCurrency(e.detail)
    window.addEventListener('currencyChange', handler)
    return () => window.removeEventListener('currencyChange', handler)
  }, [])

  const formatLabel = (idr) => {
    if (currency === 'USD') {
      const usd = idr * USD_RATE
      if (usd >= 1000000) return `$${(usd / 1000000).toFixed(1)}M`
      if (usd >= 1000) return `$${Math.round(usd / 1000)}K`
      return `$${Math.round(usd)}`
    }
    if (idr >= 1000000000) return `IDR ${(idr / 1000000000).toFixed(1)}B`
    if (idr >= 1000000) return `IDR ${(idr / 1000000).toFixed(0)}M`
    return `IDR ${idr.toLocaleString()}`
  }

  const step = 100000000

  const handleMinChange = (e) => {
    const val = Number(e.target.value)
    setMinPrice(Math.min(val, maxPrice - step))
  }

  const handleMaxChange = (e) => {
    const val = Number(e.target.value)
    setMaxPrice(Math.max(val, minPrice + step))
  }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (status) params.set('status', status)
    if (priceType) params.set('price_type', priceType)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (minPrice > 0) params.set('minPrice', Math.round(minPrice))
    if (maxPrice < MAX_IDR) params.set('maxPrice', Math.round(maxPrice))
    router.push('/properties?' + params.toString())
  }

  const handleReset = () => {
    setLocation(''); setType(''); setStatus(''); setPriceType(''); setBedrooms('')
    setMinPrice(0); setMaxPrice(MAX_IDR)
    router.push('/properties')
  }

  const minPct = (minPrice / MAX_IDR) * 100
  const maxPct = (maxPrice / MAX_IDR) * 100

  const sel = {
    border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px',
    backgroundColor: 'white', color: '#374151', width: '100%', cursor: 'pointer',
    appearance: 'none',
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '14px', paddingRight: '32px'
  }
  const lbl = { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: 'clamp(14px, 3vw, 20px)', marginBottom: '24px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '10px', alignItems: 'end' }}>
        <div>
          <label style={lbl}>{t('Location')}</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={sel}>
            <option value="">{t('All Locations')}</option>
            {['Canggu','Seminyak','Ubud','Jimbaran','Uluwatu','Sanur','Pererenan','Kerobokan'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={lbl}>{t('Type')}</label>
          <select value={type} onChange={e => setType(e.target.value)} style={sel}>
            <option value="">{t('All Types')}</option>
            <option value="villa">{t('Villa')}</option>
            <option value="land">{t('Land')}</option>
            <option value="commercial">{t('Commercial')}</option>
          </select>
        </div>
        <div>
          <label style={lbl}>{t('Status')}</label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={sel}>
            <option value="">{t('For Sale & Rent')}</option>
            <option value="for_sale">{t('For Sale')}</option>
            <option value="for_rent">{t('For Rent')}</option>
          </select>
        </div>
        <div>
          <label style={lbl}>{t('Ownership')}</label>
          <select value={priceType} onChange={e => setPriceType(e.target.value)} style={sel}>
            <option value="">{t('All')}</option>
            <option value="freehold">{t('Freehold')}</option>
            <option value="leasehold">{t('Leasehold')}</option>
          </select>
        </div>
        <button onClick={handleSearch}
          style={{ backgroundColor: 'black', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', height: '42px' }}>
          {t('Search')}
        </button>
        <button onClick={handleReset}
          style={{ backgroundColor: 'white', color: '#6b7280', padding: '10px 16px', fontSize: '13px', border: '1px solid #e5e7eb', cursor: 'pointer', height: '42px' }}>
          {t('Reset')}
        </button>
      </div>

      <button onClick={() => setShowAdvanced(!showAdvanced)}
        style={{ marginTop: '12px', background: 'none', border: 'none', fontSize: '12px', color: '#6b7280', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
        {showAdvanced ? '▲' : '▼'} {t('Advanced Filters')}
      </button>

      {showAdvanced && (
        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>

          {/* Price Range Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <label style={lbl}>{t('Price Range')}</label>
              <span style={{ fontSize: '12px', color: '#374151', fontWeight: 600 }}>
                {formatLabel(minPrice)} — {maxPrice >= MAX_IDR ? t('No limit') : formatLabel(maxPrice)}
              </span>
            </div>

            {/* Dual range slider */}
            <div ref={trackRef} style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center', margin: '0 8px' }}>
              {/* Track background */}
              <div style={{ position: 'absolute', left: 0, right: 0, height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }} />
              {/* Active track */}
              <div style={{
                position: 'absolute', height: '4px', backgroundColor: 'black', borderRadius: '2px',
                left: minPct + '%', right: (100 - maxPct) + '%'
              }} />
              {/* Min thumb */}
              <input
                ref={minRef}
                type="range"
                min={0} max={MAX_IDR} step={step}
                value={minPrice}
                onChange={handleMinChange}
                style={{
                  position: 'absolute', width: '100%', height: '20px',
                  opacity: 0, cursor: 'pointer',
                  zIndex: minPrice > MAX_IDR * 0.95 ? 5 : 3,
                  margin: 0, padding: 0
                }}
              />
              {/* Max thumb */}
              <input
                ref={maxRef}
                type="range"
                min={0} max={MAX_IDR} step={step}
                value={maxPrice}
                onChange={handleMaxChange}
                style={{
                  position: 'absolute', width: '100%', height: '20px',
                  opacity: 0, cursor: 'pointer',
                  zIndex: 4,
                  margin: 0, padding: 0
                }}
              />
              {/* Min thumb visual */}
              <div style={{
                position: 'absolute',
                left: `calc(${minPct}% - 8px)`,
                width: '18px', height: '18px',
                backgroundColor: 'white', border: '2px solid black',
                borderRadius: '50%', pointerEvents: 'none', zIndex: 2,
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }} />
              {/* Max thumb visual */}
              <div style={{
                position: 'absolute',
                left: `calc(${maxPct}% - 8px)`,
                width: '18px', height: '18px',
                backgroundColor: 'black', border: '2px solid black',
                borderRadius: '50%', pointerEvents: 'none', zIndex: 2,
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }} />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>{currency === 'USD' ? '$0' : 'IDR 0'}</span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>{currency === 'USD' ? '$620K+' : 'IDR 10B+'}</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label style={lbl}>{t('Min Bedrooms')}</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Any', '1', '2', '3', '4', '5+'].map(b => (
                <button key={b} onClick={() => setBedrooms(b === 'Any' ? '' : b.replace('+', ''))}
                  style={{
                    padding: '7px 14px', fontSize: '13px', cursor: 'pointer', border: '1px solid #e5e7eb',
                    backgroundColor: (b === 'Any' && !bedrooms) || bedrooms === b.replace('+', '') ? 'black' : 'white',
                    color: (b === 'Any' && !bedrooms) || bedrooms === b.replace('+', '') ? 'white' : '#374151',
                  }}>
                  {b === 'Any' ? t('Any') : b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}