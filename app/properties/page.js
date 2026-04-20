import { supabase } from '../lib/supabase'
import PropertyCard from '../components/PropertyCard'
import AdvancedSearch from '../components/AdvancedSearch'
import PropertiesMap from '../components/PropertiesMap'
import PropertiesHeader from '../components/PropertiesHeader'
import PropertiesEmpty from '../components/PropertiesEmpty'

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

  if (sort === 'price_asc') query = query.order('price', { ascending: true })
  else if (sort === 'price_desc') query = query.order('price', { ascending: false })
  else if (sort === 'alpha') query = query.order('title', { ascending: true })
  else if (sort === 'new') query = query.order('created_at', { ascending: false })
  else query = query.order('featured', { ascending: false })

  const { data: properties } = await query

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', minHeight: '100vh' }}>

      <PropertiesHeader count={properties?.length || 0} sort={sort} />

      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: 'clamp(24px, 4vw, 40px) clamp(20px, 5vw, 48px)' }}>
        <AdvancedSearch />

        <div style={{ marginBottom: '32px' }}>
          <PropertiesMap properties={properties || []} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {properties?.map(p => <PropertyCard key={p.slug} property={p} />)}
          {(!properties || properties.length === 0) && <PropertiesEmpty />}
        </div>
      </div>

    </main>
  )
}
