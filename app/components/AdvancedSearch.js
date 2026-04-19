'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'

const MAX_PRICE = 10000000000

export default function AdvancedSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [priceType, setPriceType] = useState(searchParams.get('price_type') || '')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
  const [minPrice, setMinPrice] = useState(Number(searchParams.get('minPrice')) || 0)
  const [maxPrice, setMaxPrice] = useState(Number(searchParams.get('maxPrice')) || MAX_PRICE)
  const [showAdvanced, setShowAdvanced] = useState(false)

  const formatIDR = (val) => {
    if (val >= 1000000000) return `IDR ${(val / 1000000000).toFixed(1)}B`
    if (val >= 1000000) return `IDR ${(val / 1000000).toFixed(0)}M`
    return `IDR ${val.toLocaleString()}`
  }

  const sel = {
    border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px',
    backgroundColor: 'white', color: '#374151', width: '100%',
    cursor: 'pointer', appearance: 'none',
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E\")",
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '14px', paddingRight: '32px'
  }
  const label = { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (status) params.set('status', status)
    if (priceType) params.set('price_type', priceType)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (minPrice > 0) params.set('minPrice', minPrice)
    if (maxPrice < MAX_PRICE) params.set('maxPrice', maxPrice)
    router.push('/?' + params.toString())
  }

  const handleReset = () => {
    setLocation(''); setType(''); setStatus(''); setPriceType(''); setBedrooms('')
    setMinPrice(0); setMaxPrice(MAX_PRICE)
    router.push('/')
  }

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '24px', marginBottom: '32px' }}>

      {/* Basic Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px', alignItems: 'end' }}>
        <div>
          <label style={label}>Location</label>
          <select value={location} onChange={e => setLocation(e.target.value)} style={sel}>
            <option value="">All Locations</option>
            {['Canggu','Seminyak','Ubud','Jimbaran','Uluwatu','Sanur','Pererenan','Kerobokan'].map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={label}>Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={sel}>
            <option value="">All Types</option>
            <option value="villa">Villa</option>
            <option value="land">Land</option>
            <option value="commercial">Commercial</option>
          </select>
        </div>
        <div>
          <label style={label}>Status</label>
          <select value={status} onChange={e => setStatus(e.target.value)} style={sel}>
            <option value="">For Sale & Rent</option>
            <option value="for_sale">For Sale</option>
            <option value="for_rent">For Rent</option>
          </select>
        </div>
        <div>
          <label style={label}>Ownership</label>
          <select value={priceType} onChange={e => setPriceType(e.target.value)} style={sel}>
            <option value="">All</option>
            <option value="freehold">Freehold</option>
            <option value="leasehold">Leasehold</option>
          </select>
        </div>
        <div>
          <button onClick={handleSearch}
            style={{ width: '100%', backgroundColor: 'black', color: 'white', padding: '10px 16px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            Search
          </button>
        </div>
        <div>
          <button onClick={handleReset}
            style={{ width: '100%', backgroundColor: 'white', color: '#6b7280', padding: '10px 16px', fontSize: '13px', border: '1px solid #e5e7eb', cursor: 'pointer' }}>
            Reset
          </button>
        </div>
      </div>

      {/* Advanced Toggle */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}
        style={{ marginTop: '16px', background: 'none', border: 'none', fontSize: '12px', color: '#6b7280', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span>{showAdvanced ? '▲' : '▼'}</span> Advanced Filters
      </button>

      {/* Advanced Section */}
      {showAdvanced && (
        <div style={{ marginTop: '20px', paddingTop: '20px', borderTop: '1px solid #f3f4f6' }}>

          {/* Price Slider */}
          <div style={{ marginBottom: '20px' }}>
            <label style={label}>Price Range</label>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{formatIDR(minPrice)}</span>
              <span style={{ fontSize: '13px', color: '#374151', fontWeight: 500 }}>{maxPrice >= MAX_PRICE ? 'No limit' : formatIDR(maxPrice)}</span>
            </div>
            <div style={{ position: 'relative', height: '20px', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: 0, right: 0, height: '4px', backgroundColor: '#e5e7eb', borderRadius: '2px' }} />
              <div style={{
                position: 'absolute', height: '4px', backgroundColor: 'black', borderRadius: '2px',
                left: (minPrice / MAX_PRICE * 100) + '%',
                right: (100 - maxPrice / MAX_PRICE * 100) + '%'
              }} />
              <input type="range" min={0} max={MAX_PRICE} step={100000000}
                value={minPrice} onChange={e => setMinPrice(Math.min(Number(e.target.value), maxPrice - 100000000))}
                style={{ position: 'absolute', width: '100%', opacity: 0, cursor: 'pointer', zIndex: 2, height: '20px' }} />
              <input type="range" min={0} max={MAX_PRICE} step={100000000}
                value={maxPrice} onChange={e => setMaxPrice(Math.max(Number(e.target.value), minPrice + 100000000))}
                style={{ position: 'absolute', width: '100%', opacity: 0, cursor: 'pointer', zIndex: 3, height: '20px' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px' }}>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>IDR 0</span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>IDR 10B+</span>
            </div>
          </div>

          {/* Bedrooms */}
          <div>
            <label style={label}>Min Bedrooms</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              {['Any', '1', '2', '3', '4', '5+'].map(b => (
                <button key={b} onClick={() => setBedrooms(b === 'Any' ? '' : b.replace('+', ''))}
                  style={{
                    padding: '8px 16px', fontSize: '13px', cursor: 'pointer',
                    backgroundColor: (b === 'Any' && !bedrooms) || bedrooms === b.replace('+', '') ? 'black' : 'white',
                    color: (b === 'Any' && !bedrooms) || bedrooms === b.replace('+', '') ? 'white' : '#374151',
                    border: '1px solid #e5e7eb'
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