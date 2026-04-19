'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function AdvancedSearch() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [location, setLocation] = useState(searchParams.get('location') || '')
  const [type, setType] = useState(searchParams.get('type') || '')
  const [status, setStatus] = useState(searchParams.get('status') || '')
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '')
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '')
  const [bedrooms, setBedrooms] = useState(searchParams.get('bedrooms') || '')
  const [priceType, setPriceType] = useState(searchParams.get('price_type') || '')
  const [showAdvanced, setShowAdvanced] = useState(false)

  const sel = {
    border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px',
    backgroundColor: 'white', color: '#374151', width: '100%', appearance: 'none',
    backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%236b7280\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'/%3E%3C/svg%3E")',
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 10px center', backgroundSize: '14px',
    paddingRight: '32px', cursor: 'pointer'
  }
  const inp = { border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '13px', width: '100%', color: '#374151', boxSizing: 'border-box' }
  const label = { fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px', display: 'block' }

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (type) params.set('type', type)
    if (status) params.set('status', status)
    if (minPrice) params.set('minPrice', minPrice)
    if (maxPrice) params.set('maxPrice', maxPrice)
    if (bedrooms) params.set('bedrooms', bedrooms)
    if (priceType) params.set('price_type', priceType)
    router.push('/?' + params.toString())
  }

  const handleReset = () => {
    setLocation(''); setType(''); setStatus('')
    setMinPrice(''); setMaxPrice(''); setBedrooms(''); setPriceType('')
    router.push('/')
  }

  return (
    <div style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '24px', marginBottom: '32px' }}>
      {/* Basic Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr) auto auto', gap: '12px', alignItems: 'end' }}>
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
          <label style={label}>Property Type</label>
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
        <button onClick={handleSearch}
          style={{ backgroundColor: 'black', color: 'white', padding: '10px 24px', fontSize: '13px', fontWeight: 600, border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Search
        </button>
        <button onClick={handleReset}
          style={{ backgroundColor: 'white', color: '#6b7280', padding: '10px 16px', fontSize: '13px', border: '1px solid #e5e7eb', cursor: 'pointer', whiteSpace: 'nowrap' }}>
          Reset
        </button>
      </div>

      {/* Advanced Toggle */}
      <button onClick={() => setShowAdvanced(!showAdvanced)}
        style={{ marginTop: '16px', background: 'none', border: 'none', fontSize: '12px', color: '#6b7280', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: '4px' }}>
        {showAdvanced ? '▲' : '▼'} Advanced Filters
      </button>

      {/* Advanced Row */}
      {showAdvanced && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid #f3f4f6' }}>
          <div>
            <label style={label}>Min Price (IDR)</label>
            <input type="number" value={minPrice} onChange={e => setMinPrice(e.target.value)}
              placeholder="e.g. 1000000000" style={inp} />
          </div>
          <div>
            <label style={label}>Max Price (IDR)</label>
            <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)}
              placeholder="e.g. 5000000000" style={inp} />
          </div>
          <div>
            <label style={label}>Min Bedrooms</label>
            <select value={bedrooms} onChange={e => setBedrooms(e.target.value)} style={sel}>
              <option value="">Any</option>
              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>
        </div>
      )}
    </div>
  )
}