'use client'
import { useT } from '../lib/i18n'
import { SITE_WA } from '../lib/site'
import dynamic from 'next/dynamic'

const BaliLocationsMap = dynamic(() => import('./BaliLocationsMap'), { ssr: false })

export function WhyChooseUsSection() {
  const t = useT()

  const features = [
    {
      eyebrow: t('Legal Integrity'),
      title: t('Uncompromising Legal Security'),
      desc: t("Navigating property laws shouldn't be stressful. We handle the complexities so you don't have to."),
      bullets: [
        { strong: t('Rigorous Due Diligence:'), text: ' ' + t('Comprehensive verification of permits (PBG/SLF) and land zoning.') },
        { strong: t('Safe Structures:'), text: ' ' + t('Expert guidance on Leasehold and Freehold ownership.') },
        { strong: t('Trusted Network:'), text: ' ' + t('Direct coordination with reputable public notaries for a secure transaction.') },
      ],
    },
    {
      eyebrow: t('Curated Portfolio'),
      title: t('Selection Over Collection'),
      desc: t('We prioritize quality over quantity, focusing only on properties that promise real value.'),
      bullets: [
        { strong: t('Hand-Selected Units:'), text: ' ' + t('Every villa is vetted for architectural integrity and prime location.') },
        { strong: t('Market-Ready Designs:'), text: ' ' + t("We list properties designed to perform in Bali's competitive rental market.") },
        { strong: t('High-Yield Focus:'), text: ' ' + t('Only the best-performing assets in high-demand areas make it to our list.') },
      ],
    },
    {
      eyebrow: t('Seamless Management'),
      title: t('Investment Without the Stress'),
      desc: t('Our partnership continues long after the keys are handed over.'),
      bullets: [
        { strong: t('End-to-End Service:'), text: ' ' + t('A smooth transition from property buyer to profitable landlord.') },
        { strong: t('Professional Oversight:'), text: ' ' + t('Full management including aggressive marketing and guest relations.') },
        { strong: t('Passive Income:'), text: ' ' + t('We handle the daily operations and maintenance while you enjoy the returns.') },
      ],
    },
  ]

  return (
    <div style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', maxWidth: '1100px', margin: '0 auto' }}>
      <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>{t('Why Choose Us')}</p>
      <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '40px', lineHeight: 1.2 }}>
        {t('The smart way to invest')} <strong>{t('in Bali real estate')}</strong>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
        {features.map(f => (
          <div key={f.title} style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
            <p style={{ fontSize: '10px', letterSpacing: '2px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px', fontWeight: 600 }}>{f.eyebrow}</p>
            <h3 style={{ fontWeight: 600, marginBottom: '12px', fontSize: '17px', lineHeight: 1.3 }}>{f.title}</h3>
            <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>{f.desc}</p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {f.bullets.map(b => (
                <li key={b.strong} style={{ fontSize: '13px', color: '#374151', lineHeight: 1.6, paddingLeft: '14px', position: 'relative' }}>
                  <span style={{ position: 'absolute', left: 0, top: 0, color: '#9ca3af' }}>•</span>
                  <strong style={{ fontWeight: 600, color: '#111827' }}>{b.strong}</strong>{b.text}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function FeaturedListingsHeader() {
  const t = useT()
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
      <div>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>{t('Properties')}</p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300 }}><strong>{t('Featured Listings')}</strong></h2>
      </div>
      <a href="/properties" style={{ fontSize: '13px', color: 'black', textDecoration: 'none', border: '1px solid #e5e7eb', padding: '8px 16px', whiteSpace: 'nowrap' }}>
        {t('View All Properties →')}
      </a>
    </div>
  )
}

export function BrowseAllPropertiesButton() {
  const t = useT()
  return (
    <div style={{ textAlign: 'center', marginTop: '40px' }}>
      <a href="/properties" style={{ display: 'inline-block', border: '1px solid black', color: 'black', fontSize: '14px', padding: '13px 32px', textDecoration: 'none', fontWeight: 500 }}>
        {t('Browse All Properties')}
      </a>
    </div>
  )
}

export function PopularLocations() {
  const t = useT()
  const locations = ['Canggu', 'Seminyak', 'Ubud', 'Jimbaran', 'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan']
  return (
    <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', backgroundColor: '#f9fafb' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>{t('Where We Operate')}</p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '8px' }}>
          {t('Our')} <strong>{t('Locations')}</strong>
        </h2>
        <p style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '28px' }}>
          {t('Click on a location to explore available properties.')}
        </p>
        <BaliLocationsMap />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '20px' }}>
          {locations.map(loc => (
            <a key={loc} href={'/properties?location=' + loc} style={{
              display: 'inline-flex', alignItems: 'center', gap: '5px',
              backgroundColor: 'white', border: '1px solid #e5e7eb',
              padding: '6px 14px', textDecoration: 'none', color: '#374151',
              fontSize: '12px', fontWeight: 500,
            }}>
              <svg width="8" height="10" viewBox="0 0 8 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 0C1.79 0 0 1.79 0 4c0 3 4 6 4 6s4-3 4-6c0-2.21-1.79-4-4-4z" fill="#111827"/>
              </svg>
              {loc}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}

export function HomeCTA() {
  const t = useT()
  return (
    <div style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>{t('Get In Touch')}</p>
        <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
          <strong>{t('Ready to find your perfect villa?')}</strong>
        </h2>
        <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px', lineHeight: 1.7 }}>
          {t('Our local team is ready to help. Reach out on WhatsApp for a free consultation.')}
        </p>
        <a href={`https://wa.me/${SITE_WA}`} target="_blank" rel="noopener noreferrer"
          style={{ display: 'inline-block', backgroundColor: 'black', color: 'white', fontSize: '14px', padding: '14px 36px', textDecoration: 'none', fontWeight: 500 }}>
          {t('Start on WhatsApp')}
        </a>
      </div>
    </div>
  )
}
