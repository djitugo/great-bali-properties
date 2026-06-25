'use client'
import { useT } from '../lib/i18n'
import SortSelect from './SortSelect'

export default function PropertiesHeader({ count, sort }) {
  const t = useT()
  return (
    <div style={{ paddingTop: '64px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
      <div style={{ padding: 'clamp(28px, 5vw, 48px) clamp(20px, 5vw, 48px)' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px' }}>{t('Browse')}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 300, marginBottom: '6px' }}>
              <strong>{t('All Properties')}</strong>
            </h1>
            <p style={{ fontSize: '14px', color: '#6b7280' }}>{count} {t('properties found')}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <label style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>{t('Sort by:')}</label>
            <SortSelect currentSort={sort} />
          </div>
        </div>
      </div>
    </div>
  )
}
