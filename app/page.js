import { supabase } from './lib/supabase'
import PropertyCard from './components/PropertyCard'
import HeroSlider from './components/HeroSlider'
import {
  WhyChooseUsSection,
  FeaturedListingsHeader,
  BrowseAllPropertiesButton,
  PopularLocations,
  HomeCTA,
} from './components/HomeSections'

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
      <WhyChooseUsSection />

      {/* FEATURED LISTINGS */}
      <div id="listings" style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
        <div style={{  }}>
          <FeaturedListingsHeader />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
            {properties?.slice(0, 6).map(p => <PropertyCard key={p.slug} property={p} />)}
          </div>
          <BrowseAllPropertiesButton />
        </div>
      </div>

      {/* LOCATIONS */}
      <PopularLocations />

      {/* CTA */}
      <HomeCTA />

    </main>
  )
}
