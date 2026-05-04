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

export default function PropertyLocationMap({ location, title, mapUrl, address }) {
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

      // Grayscale tiles to keep the page strictly black & white
      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      // Black pin with white halo
      const pinSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" width="38" height="50" viewBox="0 0 38 50">
          <path d="M19 0C8.507 0 0 8.507 0 19c0 14 19 31 19 31s19-17 19-31C38 8.507 29.493 0 19 0z" fill="#111827" stroke="white" stroke-width="2"/>
          <circle cx="19" cy="19" r="7" fill="white"/>
          <circle cx="19" cy="19" r="3" fill="#111827"/>
        </svg>
      `

      const icon = L.divIcon({
        html: `
          <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 4px 8px rgba(0,0,0,0.35));">
            ${pinSvg}
          </div>
        `,
        className: '',
        iconAnchor: [19, 50],
        iconSize: [38, 50],
      })

      const marker = L.marker([coords.lat, coords.lng], { icon }).addTo(map)

      // Subtle dark radius around the pin
      L.circle([coords.lat, coords.lng], {
        radius: 600,
        color: '#111827',
        weight: 1.5,
        fillColor: '#111827',
        fillOpacity: 0.08,
      }).addTo(map)

      const popupContent = `
        <div style="font-family:Inter,sans-serif;min-width:220px;padding:6px 4px;">
          <p style="font-size:10px;color:#111827;text-transform:uppercase;letter-spacing:1.5px;margin:0 0 6px;font-weight:600;">${location}, Bali</p>
          <p style="font-size:13px;font-weight:600;color:#111827;margin:0;line-height:1.4">${title}</p>
          ${address ? `<p style="font-size:11px;color:#6b7280;margin:6px 0 0;line-height:1.4">${address}</p>` : ''}
          <p style="font-size:11px;color:#6b7280;margin:6px 0 0">★ Approximate location</p>
        </div>
      `

      marker.bindPopup(popupContent, {
        offset: [0, -46],
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
  }, [location, title, address])

  return (
    <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(40px, 6vw, 72px) clamp(16px, 3vw, 32px)', backgroundColor: '#fafafa' }}>
      <div style={{ maxWidth: '1500px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
          <span style={{ display: 'inline-flex', width: '36px', height: '36px', borderRadius: '50%', backgroundColor: '#111827', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>
            </svg>
          </span>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#111827', textTransform: 'uppercase', fontWeight: 600 }}>Location</p>
        </div>
        <h2 style={{ fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 300, marginBottom: '8px' }}>
          <strong>{location}</strong>, Bali
        </h2>
        {address && <p style={{ fontSize: '13px', color: '#6b7280', marginBottom: '24px' }}>{address}</p>}
        {!address && <div style={{ marginBottom: '24px' }} />}
        <div style={{ position: 'relative', border: '1px solid #e5e7eb', overflow: 'hidden', borderRadius: '4px', boxShadow: '0 4px 14px rgba(0,0,0,0.06)' }}>
          <div ref={mapRef} style={{ height: '460px', width: '100%', backgroundColor: '#f3f4f6' }} />
          <div style={{
            position: 'absolute', bottom: '12px', left: '12px',
            backgroundColor: 'white', padding: '6px 12px',
            fontSize: '11px', color: '#111827', fontWeight: 500,
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)', zIndex: 999,
            borderLeft: '3px solid #111827',
          }}>
            ★ Displayed location is approximate
          </div>
          {mapUrl && (
            <a href={mapUrl} target="_blank" rel="noopener noreferrer" style={{
              position: 'absolute', top: '12px', right: '12px',
              backgroundColor: '#111827', color: 'white',
              padding: '8px 14px', textDecoration: 'none',
              fontSize: '12px', fontWeight: 600,
              boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
              zIndex: 999,
              display: 'flex', alignItems: 'center', gap: '6px',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              Open in Google Maps
            </a>
          )}
        </div>
      </div>
      <style>{`
        .leaflet-div-icon { background: transparent !important; border: none !important; }
        .gbp-popup .leaflet-popup-content-wrapper {
          border-radius: 4px !important;
          box-shadow: 0 6px 24px rgba(0,0,0,0.15) !important;
          border: 1px solid #e5e7eb !important;
        }
        .gbp-popup .leaflet-popup-tip {
          background: white !important;
          box-shadow: 0 6px 24px rgba(0,0,0,0.15) !important;
        }
      `}</style>
    </div>
  )
}
