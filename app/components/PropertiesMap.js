'use client'
import { useEffect, useRef, useState } from 'react'

const LOCATION_COORDS = {
  'Canggu':    { lat: -8.6478, lng: 115.1385 },
  'Seminyak':  { lat: -8.6906, lng: 115.1619 },
  'Ubud':      { lat: -8.5069, lng: 115.2625 },
  'Jimbaran':  { lat: -8.7921, lng: 115.1628 },
  'Uluwatu':   { lat: -8.8291, lng: 115.0849 },
  'Sanur':     { lat: -8.7028, lng: 115.2620 },
  'Pererenan': { lat: -8.6337, lng: 115.1200 },
  'Kerobokan': { lat: -8.6681, lng: 115.1575 },
}

const USD_RATE = 0.000062

export default function PropertiesMap({ properties }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const [currency, setCurrency] = useState('IDR')
  const [selected, setSelected] = useState(null)
  const [mapLoaded, setMapLoaded] = useState(false)

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

  useEffect(() => {
    if (typeof window === 'undefined') return

    const loadLeaflet = async () => {
      if (!window.L) {
        // Load Leaflet CSS
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)

        // Load Leaflet JS
        await new Promise((resolve) => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      if (mapInstance.current || !mapRef.current) return

      const L = window.L
      const map = L.map(mapRef.current, {
        center: [-8.65, 115.18],
        zoom: 11,
        zoomControl: true,
      })

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
      }).addTo(map)

      mapInstance.current = map
      setMapLoaded(true)
    }

    loadLeaflet()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapInstance.current || !window.L) return
    const L = window.L
    const map = mapInstance.current

    // Clear existing markers
    map.eachLayer(layer => {
      if (layer instanceof L.Marker) map.removeLayer(layer)
    })

    properties.forEach(p => {
      const coords = LOCATION_COORDS[p.location]
      if (!coords) return

      // Custom black pin icon
      const icon = L.divIcon({
        html: `<div style="
          background: black; color: white; padding: 4px 8px;
          font-size: 11px; font-weight: 600; font-family: Inter, sans-serif;
          white-space: nowrap; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
          cursor: pointer; border-radius: 2px;
        ">${formatPrice(p.price)}</div>`,
        className: '',
        iconAnchor: [0, 0],
      })

      const marker = L.marker(
        [coords.lat + (Math.random() - 0.5) * 0.008, coords.lng + (Math.random() - 0.5) * 0.008],
        { icon }
      ).addTo(map)

      marker.on('click', () => setSelected(p))
    })
  }, [mapLoaded, properties, currency])

  return (
    <div style={{ position: 'relative', borderRadius: '0', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      <div ref={mapRef} style={{ height: '400px', width: '100%', backgroundColor: '#f3f4f6' }} />

      {/* Selected Property Popup */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: '16px', left: '16px', right: '16px',
          maxWidth: '320px', backgroundColor: 'white', border: '1px solid #e5e7eb',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)', padding: '16px', zIndex: 1000
        }}>
          <button onClick={() => setSelected(null)}
            style={{ position: 'absolute', top: '10px', right: '12px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '16px', color: '#9ca3af' }}>
            ✕
          </button>
          <div style={{ display: 'flex', gap: '12px' }}>
            <img
              src={selected.images ? selected.images.split(',')[0].trim() : ''}
              alt={selected.title}
              style={{ width: '72px', height: '56px', objectFit: 'cover', flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '3px' }}>{selected.location}, Bali</p>
              <p style={{ fontSize: '13px', fontWeight: 500, lineHeight: 1.3, marginBottom: '6px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{selected.title}</p>
              <p style={{ fontSize: '14px', fontWeight: 700, marginBottom: '8px' }}>{formatPrice(selected.price)}</p>
              <a href={'/property/' + selected.slug}
                style={{ fontSize: '12px', backgroundColor: 'black', color: 'white', padding: '5px 12px', textDecoration: 'none', fontWeight: 500 }}>
                View →
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Map Label */}
      <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'white', padding: '6px 12px', fontSize: '12px', fontWeight: 600, color: '#374151', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 999 }}>
        {properties.length} Properties
      </div>
    </div>
  )
}