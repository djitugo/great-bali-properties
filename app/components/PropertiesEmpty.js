'use client'
import { useT } from '../lib/i18n'

export default function PropertiesEmpty() {
  const t = useT()
  return (
    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0' }}>
      <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '16px' }}>{t('No properties found.')}</p>
      <a href="/properties" style={{ fontSize: '14px', color: 'black', textDecoration: 'underline' }}>{t('Clear all filters')}</a>
    </div>
  )
}
