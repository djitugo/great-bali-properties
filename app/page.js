import { supabase } from './lib/supabase'
import PropertyCard from './components/PropertyCard'
import AdvancedSearch from './components/AdvancedSearch'
import HeroSlider from './components/HeroSlider'

export default async function Home({ searchParams }) {
  const params = await searchParams
  const location = params?.location || ''
  const type = params?.type || ''
  const status = params?.status || ''
  const minPrice = params?.minPrice || ''
  const maxPrice = params?.maxPrice || ''
  const bedrooms = params?.bedrooms || ''
  const priceTypeParam = params?.price_type || ''

  let query = supabase.from('properties').select('*').order('featured', { ascending: false })
  if (location) query = query.eq('location', location)
  if (type) query = query.eq('property_type', type)
  if (status) query = query.eq('status', status)
  if (minPrice) query = query.gte('price', minPrice)
  if (maxPrice) query = query.lte('price', maxPrice)
  if (bedrooms) query = query.gte('bedrooms', bedrooms)
  if (priceTypeParam) query = query.eq('price_type', priceTypeParam)

  const { data: properties } = await query

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>

      <HeroSlider />

      {/* WHY US */}
      <div style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>Why Choose Us</p>
        <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '40px', lineHeight: 1.2 }}>
          The smart way to invest<br /><strong>in Bali real estate</strong>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '32px' }}>
          {[
            { title: 'Curated Listings', desc: 'Every property is hand-selected and verified by our local team. No fake listings, no hidden surprises.' },
            { title: 'Legal Assistance', desc: 'We guide you through Indonesian property law, leasehold & freehold structures, and notary processes.' },
            { title: 'Direct WhatsApp', desc: 'Skip the forms. Connect directly with our agents on WhatsApp for fast, personal responses.' },
          ].map(f => (
            <div key={f.title} style={{ borderTop: '1px solid #e5e7eb', paddingTop: '24px' }}>
              <h3 style={{ fontWeight: 600, marginBottom: '12px', fontSize: '15px' }}>{f.title}</h3>
              <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.7 }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LISTINGS */}
      <div id="listings" style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>Properties</p>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '32px' }}>Available <strong>Listings</strong></h2>
          <AdvancedSearch />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '24px' }}>
            {properties?.map(p => <PropertyCard key={p.slug} property={p} />)}
            {(!properties || properties.length === 0) && (
              <p style={{ gridColumn: '1 / -1', textAlign: 'center', color: '#d1d5db', padding: '60px 0', fontSize: '14px' }}>No properties found.</p>
            )}
          </div>
        </div>
      </div>

      {/* LOCATIONS */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>Areas We Cover</p>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '32px' }}>Popular <strong>Locations</strong></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '12px' }}>
            {['Canggu', 'Seminyak', 'Ubud', 'Jimbaran', 'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan'].map(loc => (
              <a key={loc} href={'/?location=' + loc} style={{
                backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '16px 14px',
                textDecoration: 'none', color: 'black', display: 'block'
              }}>
                <p style={{ fontWeight: 500, fontSize: '13px' }}>{loc}</p>
                <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '3px' }}>Bali</p>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>Get In Touch</p>
          <h2 style={{ fontSize: 'clamp(28px, 5vw, 40px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            Ready to find your<br /><strong>perfect villa?</strong>
          </h2>
          <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px', lineHeight: 1.7 }}>
            Our local team is ready to help. Reach out on WhatsApp for a free consultation.
          </p>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            style={{ display: 'inline-block', backgroundColor: 'black', color: 'white', fontSize: '14px', padding: '14px 36px', textDecoration: 'none', fontWeight: 500 }}>
            Start on WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Great Bali Properties</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>Premium villa and land listings across Bali. A proud partner of Great Bali Villas.</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Locations</p>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 2 }}>Canggu · Seminyak · Ubud<br />Jimbaran · Uluwatu · Sanur</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Contact</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>WhatsApp</a>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>info@greatbaliproperties.com</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '32px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>

    </main>
  )
}