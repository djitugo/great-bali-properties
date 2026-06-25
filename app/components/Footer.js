'use client'
import { useT } from '../lib/i18n'
import {
  SITE_WA,
  SITE_WA_DISPLAY,
  SITE_EMAIL,
  SITE_ADDRESS_LINES,
  SITE_MAP_URL,
} from '../lib/site'

const FOOTER_LOCATIONS = [
  'Canggu', 'Seminyak', 'Ubud', 'Jimbaran',
  'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan',
]

export default function Footer() {
  const t = useT()
  const year = new Date().getFullYear()

  const linkStyle = {
    display: 'block', fontSize: '13px', color: '#6b7280',
    textDecoration: 'none', marginBottom: '6px',
  }
  const labelStyle = {
    fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase',
    letterSpacing: '2px', marginBottom: '12px', fontWeight: 600,
  }

  return (
    <footer style={{
      borderTop: '1px solid #f3f4f6',
      padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)',
      backgroundColor: 'white',
    }}>
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '32px',
      }}>
        <div>
          <img translate="no" src="/logo.png" alt="Great Bali Properties" style={{ display: 'block', height: '44px', width: 'auto', marginBottom: '14px' }} />
          <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>
            {t('Premium villa and land listings across Bali. A proud partner of Great Bali Villas.')}
          </p>
        </div>

        <div>
          <p style={labelStyle}>{t('Properties')}</p>
          <a href="/properties" style={linkStyle}>{t('All Properties')}</a>
          <a href="/properties?type=villa&status=for_sale" style={linkStyle}>{t('Villas for Sale')}</a>
          <a href="/properties?type=land&status=for_sale" style={linkStyle}>{t('Land for Sale')}</a>
          <a href="/properties?price_type=leasehold" style={linkStyle}>{t('Leasehold')}</a>
        </div>

        <div>
          <p style={labelStyle}>{t('Locations')}</p>
          {FOOTER_LOCATIONS.map(loc => (
            <a key={loc} href={'/properties?location=' + encodeURIComponent(loc)} style={linkStyle}>{loc}</a>
          ))}
        </div>

        <div>
          <p style={labelStyle}>{t('Contact')}</p>
          <a href={`https://wa.me/${SITE_WA}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
            {t('WhatsApp')} — {SITE_WA_DISPLAY}
          </a>
          <a href={`mailto:${SITE_EMAIL}`} style={linkStyle}>{SITE_EMAIL}</a>
          <a href={SITE_MAP_URL} target="_blank" rel="noopener noreferrer"
            style={{ ...linkStyle, marginTop: '10px', lineHeight: 1.6 }}>
            {SITE_ADDRESS_LINES.join(', ')}
          </a>
        </div>
      </div>

      <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '32px', paddingTop: '20px', textAlign: 'center' }}>
        <p style={{ fontSize: '12px', color: '#d1d5db' }}>
          © {year} <span translate="no">Great Bali Properties</span>. {t('All rights reserved.')}
        </p>
      </div>
    </footer>
  )
}
