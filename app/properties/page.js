import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'
import AdvancedSearch from '../components/AdvancedSearch'

export default async function PropertiesPage({ searchParams }) {
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
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ paddingTop: '64px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 48px)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '12px' }}>Browse</p>
          <h1 style={{ fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: 300, marginBottom: '8px' }}>
            All <strong>Properties</strong>
          </h1>
          <p style={{ fontSize: '14px', color: '#6b7280' }}>
            {properties?.length || 0} properties found in Bali
          </p>
        </div>
      </div>

      {/* Search + Results */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(24px, 4vw, 48px) clamp(20px, 5vw, 48px)' }}>
        <AdvancedSearch />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '8px' }}>
          {properties?.map(p => <PropertyCard key={p.slug} property={p} />)}
          {(!properties || properties.length === 0) && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '16px' }}>No properties found.</p>
              <a href="/properties" style={{ fontSize: '14px', color: 'black', textDecoration: 'underline' }}>Clear all filters</a>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '32px' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Great Bali Properties</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>Premium villa and land listings across Bali.</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Quick Links</p>
            <a href="/" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>Home</a>
            <a href="/properties" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>All Properties</a>
            <a href="/contact" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Contact</a>
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