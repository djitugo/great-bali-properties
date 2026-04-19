import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'
import AdvancedSearch from '../components/AdvancedSearch'
import PropertiesMap from '../components/PropertiesMap'
import SortSelect from '../components/SortSelect'

export default async function PropertiesPage({ searchParams }) {
  const params = await searchParams
  const location = params?.location || ''
  const type = params?.type || ''
  const status = params?.status || ''
  const minPrice = params?.minPrice || ''
  const maxPrice = params?.maxPrice || ''
  const bedrooms = params?.bedrooms || ''
  const priceTypeParam = params?.price_type || ''
  const sort = params?.sort || 'featured'

  let query = supabase.from('properties').select('*')

  if (location) query = query.eq('location', location)
  if (type) query = query.eq('property_type', type)
  if (status) query = query.eq('status', status)
  if (minPrice) query = query.gte('price', minPrice)
  if (maxPrice) query = query.lte('price', maxPrice)
  if (bedrooms) query = query.gte('bedrooms', bedrooms)
  if (priceTypeParam) query = query.eq('price_type', priceTypeParam)

  // #2 — Sort
  if (sort === 'price_asc') query = query.order('price', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price', { ascending: false })
  else if (sort === 'alpha') query = query.order('title', { ascending: true })
  else if (sort === 'new') query = query.order('created_at', { ascending: false })
  else query = query.order('featured', { ascending: false })

  const { data: properties } = await query

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>

      {/* Page Header */}
      <div style={{ paddingTop: '64px', backgroundColor: '#f9fafb', borderBottom: '1px solid #e5e7eb' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(28px, 5vw, 48px) clamp(20px, 5vw, 48px)' }}>
          <p style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '10px' }}>Browse</p>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h1 style={{ fontSize: 'clamp(26px, 5vw, 44px)', fontWeight: 300, marginBottom: '6px' }}>
                All <strong>Properties</strong>
              </h1>
              <p style={{ fontSize: '14px', color: '#6b7280' }}>{properties?.length || 0} properties found</p>
            </div>

            {/* #2 — Sort dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <label style={{ fontSize: '13px', color: '#6b7280', whiteSpace: 'nowrap' }}>Sort by:</label>
             <SortSelect currentSort={sort} />
            </div>
          </div>
        </div>
      </div>

      {/* Search + Results */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(20px, 5vw, 48px)' }}>
        <AdvancedSearch />

        {/* #5 — Map */}
        <div style={{ marginBottom: '32px' }}>
          <PropertiesMap properties={properties || []} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {properties?.map(p => <PropertyCard key={p.slug} property={p} />)}
          {(!properties || properties.length === 0) && (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '80px 0' }}>
              <p style={{ fontSize: '16px', color: '#9ca3af', marginBottom: '16px' }}>No properties found.</p>
              <a href="/properties" style={{ fontSize: '14px', color: 'black', textDecoration: 'underline' }}>Clear all filters</a>
            </div>
          )}
        </div>
      </div>

      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white', marginTop: '48px' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>
    </main>
  )
}