'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const MAX_IDR = 10000000000
const USD_RATE = 0.000062

export default function AdvancedSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()
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

  const toDisplay = (idr) => {
    if (currency === 'USD') return idr * USD_RATE
    return idr
  }

  const toIDR = (val) => {
    if (currency === 'USD') return val / USD_RATE
    return val
  }

  const maxDisplay = currency === 'USD' ? Math.round(MAX_IDR * USD_RATE) : MAX_IDR
  const step = currency === 'USD' ? 1000 : 100000000

  const formatLabel = (idr) => {
    if (currency === 'USD') {
      const usd = idr * USD_RATE
      if (usd >= 1000000) return `$${(usd / 1000000).toFixed(1)}M`
      return `$${Math.round(usd).toLocaleString()}`
    }
    if (idr >= 1000000000) return `IDR ${(idr / 1000000000).toFixed(1)}B`
    if (idr >= 1000000) return `IDR ${(idr / 1000000).toFixed(0)}M`
    return `IDR ${idr.toLocaleString()}`
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
    router.push('/?' + params.toString())
  }

  const handleReset = () => {
    setLocation(''); setType(''); setStatus(''); setPriceType(''); setBedrooms('')
    setMinPrice(0); setMaxPrice(MAX_IDR)
    router.push('/')
  }

  const sel = {
    border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px',
    backgroundColor: 'white', color: '#374151', width: '100%', cursor: 'pointer',
    appearance: 'none',
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '14px', paddingRight: '32px'
  }
  const lbl = { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: 'clamp(16px, 3vw, 24px)', marginBottom: '24px' }}>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '12px', alignItems: 'end' }}>
        <div>
          <label style={lbl}>Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={sel}>
            <option value="">All Locations</option>
            {['Canggu','Seminyak','Ubud','Jimbaran','Uluwatu','Sanur','Pererenan','Kerobokan'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={lbl}>Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={sel}>
            <option value="">All Types</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label style={lbl}>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={sel}>
            <option value="">For Sale & Rent</option>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
          </select>
        </div>
        <div>
          <label style={lbl}>Ownership</label>
          <select value={priceType} onChange={e => setPriceType(e.target.value)} style={sel}>
            <option value="">All</option>
            <option value="freehold">Freehold</option>
            <option value="leasehold">Leasehold</option>
          </select>
        </div>
        <button onClick={handleSearch}
          style={{ backgroundColor: 'black', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', height: '42px' }}>
          Search
        </button>
        <button onClick={handleReset}
          style={{ backgroundColor: 'white', color: '#6b7280', padding: '10px 16px', fontSize: '13px', border: '1px solid #e5e7eb', cursor: 'pointer', height: '42px' }}>
          Reset
        </button>
      </div>

      <button onClick={() => setShowAdvanced(!showAdvanced)}
        style={{ marginTop: '14px', background: 'none', border: 'none', fontSize: '12px', color: '#6b7280', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
        {showAdvanced ? '▲' : '▼'} Advanced Filters
      </button>

      {showAdvanced && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>

          {/* Price Slider */}
          <div style={{ marginBottom: '24px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <label style={lbl}>Price Range ({currency})</label>
              <span style={{ fontSize: '12px', color: '#374151', fontWeight: 500 }}>
                {formatLabel(minPrice)} — {maxPrice >= MAX_IDR ? 'No limit' : formatLabel(maxPrice)}
              </span>
            </div>
            <div style={{ position: 'relative', height: '24px', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: '3px', backgroundColor: '#e5e7eb', borderRadius: '2px' }} />
              <div style={{
                position: 'absolute', height: '3px', backgroundColor: 'black', borderRadius: '2px',
                left: (minPrice / MAX_IDR * 100) + '%',
                right: (100 - maxPrice / MAX_IDR * 100) + '%'
              }} />
              <input type="range" min={0} max={MAX_IDR} step={step}
                value={minPrice}
                onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - step))}
                style={{ position: 'absolute', width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, height: '24px', margin: 0 }} />
              <input type="range" min={0} max={MAX_IDR} step={step}
                value={maxPrice}
                onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + step))}
                style={{ position: 'absolute', width: '100%', opacity: 0, cursor: 'pointer', zIndex: 3, height: '24px', margin: 0 }} />
              {/* Thumb indicators */}
              <div style={{ position: 'absolute', left: (minPrice / MAX_IDR * 100) + '%', width: '16px', height: '16px', backgroundColor: 'black', borderRadius: '50%', transform: 'translateX(-50%)', zIndex: 1, pointerEvents: 'none' }} />
              <div style={{ position: 'absolute', left: (maxPrice / MAX_IDR * 100) + '%', width: '16px', height: '16px', backgroundColor: 'black', borderRadius: '50%', transform: 'translateX(-50%)', zIndex: 1, pointerEvents: 'none' }} />
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label style={lbl}>Min Bedrooms</label>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Any', '1', '2', '3', '4', '5+'].map(b => (
                <button key={b} onClick={() => setBedrooms(b === 'Any' ? '' : b.replace('+', ''))}
                  style={{
                    padding: '7px 14px', fontSize: '13px', cursor: 'pointer', border: '1px solid #e5e7eb',
                    backgroundColor: (b === 'Any' && !bedrooms) || bedrooms === b.replace('+', '') ? 'black' : 'white',
                    color: (b === 'Any' && !bedrooms) || bedrooms === b.replace('+', '') ? 'white' : '#374151',
                  }}>
                  {b}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}