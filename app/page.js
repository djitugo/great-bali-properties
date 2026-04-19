import { supabase } from './lib/supabase'
import PropertyCard from './components/PropertyCard'
import FilterBar from './components/FilterBar'

export default async function Home({ searchParams }) {
  const params = await searchParams
  const location = params?.location || ''
  const type = params?.type || ''
  const status = params?.status || ''

  let query = supabase.from('properties').select('*').order('featured', { ascending: false })
  if (location) query = query.eq('location', location)
  if (type) query = query.eq('property_type', type)
  if (status) query = query.eq('status', status)

  const { data: properties, error } = await query

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-white text-black">

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <span className="font-semibold tracking-tight text-lg">Great Bali Properties</span>
        <a href="https://wa.me/6281234567890" target="_blank"
          className="text-sm border border-black px-4 py-1.5 hover:bg-black hover:text-white transition">
          Contact Us
        </a>
      </nav>

      {/* Hero */}
      <div className="px-6 py-20 max-w-4xl mx-auto">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Bali Real Estate</p>
        <h1 className="text-5xl font-light leading-tight mb-6">
          Find Your<br />
          <span className="font-semibold">Dream Villa</span><br />
          in Bali
        </h1>
        <p className="text-gray-500 text-base max-w-md">
          Curated selection of premium villas and land for sale across Bali's most sought-after locations.
        </p>
      </div>

      {/* Filter + Listings */}
      <div className="border-t border-gray-100 px-6 py-10 max-w-6xl mx-auto">
        <FilterBar />
        {error && <p className="text-red-400 mt-6 text-sm">Failed to load properties.</p>}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {properties?.map(p => <PropertyCard key={p.id} property={p} />)}
          {(!properties || properties.length === 0) && (
            <p className="col-span-3 text-center text-gray-300 py-20 text-sm">No properties found.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-6 py-8 mt-10">
        <p className="text-xs text-gray-400 text-center">© 2025 Great Bali Properties. All rights reserved.</p>
      </footer>
    </main>
  )
}