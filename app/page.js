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
          The smart way to invest <strong>in Bali real estate</strong>
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '32px' }}>
          {[
            {
              eyebrow: 'Legal Integrity',
              title: 'Uncompromising Legal Security',
              desc: "Navigating property laws shouldn't be stressful. We handle the complexities so you don't have to.",
              bullets: [
                { strong: 'Rigorous Due Diligence:', text: ' Comprehensive verification of permits (PBG/SLF) and land zoning.' },
                { strong: 'Safe Structures:', text: ' Expert guidance on Leasehold and Freehold ownership.' },
                { strong: 'Trusted Network:', text: ' Direct coordination with reputable public notaries for a secure transaction.' },
              ],
            },
            {
              eyebrow: 'Curated Portfolio',
              title: 'Selection Over Collection',
              desc: 'We prioritize quality over quantity, focusing only on properties that promise real value.',
              bullets: [
                { strong: 'Hand-Selected Units:', text: ' Every villa is vetted for architectural integrity and prime location.' },
                { strong: 'Market-Ready Designs:', text: ' We list properties designed to perform in Bali\u2019s competitive rental market.' },
                { strong: 'High-Yield Focus:', text: ' Only the best-performing assets in high-demand areas make it to our list.' },
              ],
            },
            {
              eyebrow: 'Seamless Management',
              title: 'Investment Without the Stress',
              desc: 'Our partnership continues long after the keys are handed over.',
              bullets: [
                { strong: 'End-to-End Service:', text: ' A smooth transition from property buyer to profitable landlord.' },
                { strong: 'Professional Oversight:', text: ' Full management including aggressive marketing and guest relations.' },
                { strong: 'Passive Income:', text: ' We handle the daily operations and maintenance while you enjoy the returns.' },
              ],
            },
          ].map(f => (
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

      {/* FEATURED LISTINGS */}
      <div id="listings" style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '32px', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>Properties</p>
              <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300 }}>Featured <strong>Listings</strong></h2>
            </div>
            <a href="/properties" style={{ fontSize: '13px', color: 'black', textDecoration: 'none', border: '1px solid #e5e7eb', padding: '8px 16px', whiteSpace: 'nowrap' }}>
              View All Properties →
            </a>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {properties?.slice(0, 6).map(p => <PropertyCard key={p.slug} property={p} />)}
          </div>
          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <a href="/properties" style={{ display: 'inline-block', border: '1px solid black', color: 'black', fontSize: '14px', padding: '13px 32px', textDecoration: 'none', fontWeight: 500 }}>
              Browse All Properties
            </a>
          </div>
        </div>
      </div>

      {/* LOCATIONS */}
      <div style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', backgroundColor: '#f9fafb' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>Areas We Cover</p>
          <h2 style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '32px' }}>Popular <strong>Locations</strong></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            {['Canggu', 'Seminyak', 'Ubud', 'Jimbaran', 'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan'].map(loc => (
              <a key={loc} href={'/properties?location=' + loc} style={{
                backgroundColor: 'white', border: '1px solid #e5e7eb', padding: 'clamp(14px, 2vw, 20px) clamp(12px, 2vw, 16px)',
                textDecoration: 'none', color: 'black', display: 'block'
              }}>
                <p style={{ fontWeight: 500, fontSize: 'clamp(12px, 1.5vw, 14px)' }}>{loc}</p>
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
            Ready to find your <strong>perfect villa?</strong>
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
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Great Bali Properties</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>Premium villa and land listings across Bali. A proud partner of Great Bali Villas.</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Properties</p>
            <a href="/properties" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>All Properties</a>
            <a href="/properties?type=villa" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>Villas</a>
            <a href="/properties?type=land" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Land</a>
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