'use client'
import { useEffect, useRef } from 'react'

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

export default function PropertyLocationMap({ location, title }) {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const coords = LOCATION_COORDS[location] || { lat: -8.65, lng: 115.18 }

    const init = async () => {
      if (!window.L) {
        const link = document.createElement('link')
        link.rel = 'stylesheet'
        link.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.css'
        document.head.appendChild(link)

        await new Promise(resolve => {
          const script = document.createElement('script')
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js'
          script.onload = resolve
          document.head.appendChild(script)
        })
      }

      if (mapInstance.current || !mapRef.current) return

      const L = window.L
      const map = L.map(mapRef.current, {
        center: [coords.lat, coords.lng],
        zoom: 14,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      const pinSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42">
          <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26C32 7.163 24.837 0 16 0z" fill="#111827"/>
          <circle cx="16" cy="16" r="6" fill="white"/>
        </svg>
      `

      const icon = L.divIcon({
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;">
            ${pinSvg}
          </div>
        `,
        className: '',
        iconAnchor: [16, 42],
        iconSize: [32, 42],
      })

      const marker = L.marker([coords.lat, coords.lng], { icon }).addTo(map)

      const popupContent = `
        <div style="font-family:Inter,sans-serif;min-width:200px;padding:4px 2px;">
          <p style="font-size:10px;color:#9ca3af;text-transform:uppercase;letter-spacing:1px;margin:0 0 4px">${location}, Bali</p>
          <p style="font-size:13px;font-weight:600;color:#111827;margin:0;line-height:1.4">${title}</p>
          <p style="font-size:11px;color:#6b7280;margin:6px 0 0">★ Approximate location</p>
        </div>
      `

      marker.bindPopup(popupContent, {
        offset: [0, -38],
        closeButton: false,
        className: 'gbp-popup',
      }).openPopup()

      mapInstance.current = map
    }

    init()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [location, title])

  return (
    <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 48px)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px' }}>Location</p>
        <h2 style={{ fontSize: 'clamp(20px, 3vw, 28px)', fontWeight: 300, marginBottom: '24px' }}>
          <strong>{location}</strong>, Bali
        </h2>
        <div style={{ position: 'relative', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div ref={mapRef} style={{ height: '420px', width: '100%', backgroundColor: '#f3f4f6' }} />
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px',
            backgroundColor: 'white', padding: '6px 12px',
            fontSize: '11px', color: '#6b7280',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 999,
          }}>
            ★ Displayed location is approximate
          </div>
        </div>
      </div>
      <style>{`
        .leaflet-div-icon { background: transparent !important; border: none !important; }
        .gbp-popup .leaflet-popup-content-wrapper {
          border-radius: 2px !important;
          box-shadow: 0 4px 20px rgba(0,0,0,0.12) !important;
          border: 1px solid #e5e7eb !important;
        }
        .gbp-popup .leaflet-popup-tip { display: none !important; }
      `}</style>
    </div>
  )
}
