'use client'
import { useEffect, useRef, useState } from 'react'
import { useT } from '../lib/i18n'

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
  const t = useT()
  const mapRef = useRef(null)
  const mapInstance = useRef(null)
  const markersRef = useRef([])
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
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)

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
        setMapLoaded(false)
      }
    }
  }, [])

  useEffect(() => {
    if (!mapLoaded || !mapInstance.current || !window.L) return
    const L = window.L
    const map = mapInstance.current

    // Clear existing markers
    markersRef.current.forEach(m => map.removeLayer(m))
    markersRef.current = []

    properties.forEach(p => {
      const coords = LOCATION_COORDS[p.location]
      if (!coords) return

      const priceLabel = formatPrice(p.price)

      const icon = L.divIcon({
        html: `
          <div style="
            background-color: #000000;
            color: #ffffff;
            padding: 5px 10px;
            font-size: 11px;
            font-weight: 700;
            font-family: Inter, sans-serif;
            white-space: nowrap;
            box-shadow: 0 2px 8px rgba(0,0,0,0.4);
            cursor: pointer;
            border-radius: 3px;
            display: inline-block;
            line-height: 1.4;
            position: relative;
          ">
            ${priceLabel}
            <div style="
              position: absolute;
              bottom: -5px;
              left: 50%;
              transform: translateX(-50%);
              width: 0;
              height: 0;
              border-left: 5px solid transparent;
              border-right: 5px solid transparent;
              border-top: 5px solid #000000;
            "></div>
          </div>
        `,
        className: '',
        iconAnchor: [0, 0],
        iconSize: null,
      })

      const jitter = 0.006
      const marker = L.marker(
        [
          coords.lat + (Math.random() - 0.5) * jitter,
          coords.lng + (Math.random() - 0.5) * jitter
        ],
        { icon }
      ).addTo(map)

      marker.on('click', () => setSelected(p))
      markersRef.current.push(marker)
    })
  }, [mapLoaded, properties, currency])

  return (
    <div style={{ position: 'relative', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      <div ref={mapRef} style={{ height: '420px', width: '100%', backgroundColor: '#f3f4f6' }} />

      {/* Selected Property Card */}
      {selected && (
        <div style={{
          position: 'absolute', bottom: '16px', left: '16px',
          width: '300px', backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
          zIndex: 1000, overflow: 'hidden'
        }}>
          <button onClick={() => setSelected(null)}
            style={{
              position: 'absolute', top: '8px', right: '10px',
              background: 'none', border: 'none', cursor: 'pointer',
              fontSize: '14px', color: '#9ca3af', zIndex: 2, lineHeight: 1
            }}>
            ✕
          </button>

          <img
            src={selected.images ? selected.images.split(',')[0].trim() : ''}
            alt={selected.title}
            style={{ width: '100%', height: '140px', objectFit: 'cover', display: 'block' }}
          />

          <div style={{ padding: '12px 14px 14px' }}>
            <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '4px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              {selected.location}, Bali
            </p>
            <p style={{ fontSize: '13px', fontWeight: 600, lineHeight: 1.35, marginBottom: '8px', color: 'black', paddingRight: '20px' }}>
              {selected.title}
            </p>
            <p style={{ fontSize: '15px', fontWeight: 700, marginBottom: '12px', color: 'black' }}>
              {formatPrice(selected.price)}
            </p>
            <a href={'/property/' + selected.slug}
              style={{
                display: 'block', textAlign: 'center',
                backgroundColor: 'black', color: 'white',
                fontSize: '12px', fontWeight: 600,
                padding: '9px', textDecoration: 'none'
              }}>
              {t('View Property →')}
            </a>
          </div>
        </div>
      )}

      {/* Properties count badge */}
      <div style={{
        position: 'absolute', top: '12px', left: '52px',
        backgroundColor: 'white', padding: '6px 12px',
        fontSize: '12px', fontWeight: 600, color: '#374151',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 999
      }}>
        {properties.length} {t(properties.length === 1 ? 'Property' : 'Properties')}
      </div>

      <style>{`
        .leaflet-div-icon {
          background: transparent !important;
          border: none !important;
        }
      `}</style>
    </div>
  )
}