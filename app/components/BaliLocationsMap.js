'use client'
import { useEffect, useRef } from 'react'

const LOCATIONS = [
  { name: 'Canggu',    lat: -8.6478, lng: 115.1385 },
  { name: 'Seminyak',  lat: -8.6906, lng: 115.1619 },
  { name: 'Ubud',      lat: -8.5069, lng: 115.2625 },
  { name: 'Jimbaran',  lat: -8.7921, lng: 115.1628 },
  { name: 'Uluwatu',   lat: -8.8291, lng: 115.0849 },
  { name: 'Sanur',     lat: -8.7028, lng: 115.2620 },
  { name: 'Pererenan', lat: -8.6337, lng: 115.1200 },
  { name: 'Kerobokan', lat: -8.6681, lng: 115.1575 },
]

export default function BaliLocationsMap() {
  const mapRef = useRef(null)
  const mapInstance = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

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
        center: [-8.68, 115.17],
        zoom: 11,
        zoomControl: true,
        scrollWheelZoom: false,
      })

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        attribution: '© OpenStreetMap © CARTO',
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map)

      LOCATIONS.forEach(loc => {
        // Wrapper div has explicit width matching iconSize so Leaflet's anchor
        // calculation stays consistent at every zoom level.
        const html = `<div class="gbp-loc-marker" style="width:80px;height:42px;display:flex;flex-direction:column;align-items:center;justify-content:flex-end;cursor:pointer;line-height:1;"><div style="background:#111827;color:#fff;font-size:10px;font-weight:600;font-family:Inter,sans-serif;padding:3px 8px;border-radius:2px;white-space:nowrap;letter-spacing:0.5px;box-shadow:0 2px 6px rgba(0,0,0,0.25);margin-bottom:3px;">${loc.name}</div><svg xmlns="http://www.w3.org/2000/svg" width="20" height="26" viewBox="0 0 20 26" fill="none" style="display:block;"><path d="M10 0C4.477 0 0 4.477 0 10c0 7.5 10 16 10 16s10-8.5 10-16C20 4.477 15.523 0 10 0z" fill="#111827"/><circle cx="10" cy="10" r="4" fill="white"/></svg></div>`
        const icon = L.divIcon({
          html,
          className: 'gbp-loc-icon',
          iconAnchor: [40, 42],
          iconSize: [80, 42],
        })

        const marker = L.marker([loc.lat, loc.lng], { icon }).addTo(map)
        marker.on('click', () => {
          window.location.href = '/properties?location=' + loc.name
        })
      })

      mapInstance.current = map
    }

    init()

    return () => {
      if (mapInstance.current) {
        mapInstance.current.remove()
        mapInstance.current = null
      }
    }
  }, [])

  return (
    <div style={{ position: 'relative', borderRadius: '2px', overflow: 'hidden', border: '1px solid #e5e7eb' }}>
      <div ref={mapRef} style={{ height: '420px', width: '100%', backgroundColor: '#f3f4f6' }} />
      <style>{`
        .leaflet-div-icon, .gbp-loc-icon { background: transparent !important; border: none !important; padding: 0 !important; }
        .gbp-loc-icon { width: 80px !important; height: 42px !important; }
        .leaflet-container a { color: inherit !important; }
      `}</style>
    </div>
  )
}
