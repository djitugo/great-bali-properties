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

  const { data: properties } = await query

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-white text-black">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <div>
          <span className="font-semibold tracking-tight text-base">Great Bali Properties</span>
          <span className="text-xs text-gray-400 ml-2 hidden md:inline">by Great Bali Villas</span>
        </div>
        <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
          className="text-sm border border-black px-4 py-1.5 hover:bg-black hover:text-white transition">
          WhatsApp Us
        </a>
      </nav>

      {/* HERO */}
      <div className="pt-16 min-h-screen flex flex-col justify-center px-6 md:px-16 max-w-6xl mx-auto">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-6">Bali Real Estate · Est. 2024</p>
        <h1 className="text-5xl md:text-7xl font-light leading-tight mb-8">
          Find Your<br />
          <span className="font-semibold">Dream Villa</span><br />
          in Bali
        </h1>
        <p className="text-gray-500 text-base md:text-lg max-w-lg mb-10">
          Curated selection of premium villas and land for sale across Bali's most sought-after locations. Trusted by investors worldwide.
        </p>
        <div className="flex gap-4">
          <a href="#listings"
            className="bg-black text-white text-sm px-8 py-3 hover:bg-gray-800 transition">
            View Listings
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="border border-black text-sm px-8 py-3 hover:bg-black hover:text-white transition">
            Contact Agent
          </a>
        </div>
      </div>

      {/* STATS */}
      <div className="border-t border-b border-gray-100 py-12 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { number: '50+', label: 'Properties Listed' },
            { number: '10+', label: 'Years Experience' },
            { number: '1000+', label: 'Villas Managed' },
            { number: '100%', label: 'Trusted Service' },
          ].map(s => (
            <div key={s.label}>
              <p className="text-3xl font-light mb-1">{s.number}</p>
              <p className="text-xs text-gray-400 uppercase tracking-wider">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* WHY US */}
      <div className="py-20 px-6 max-w-5xl mx-auto">
        <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Why Choose Us</p>
        <h2 className="text-3xl font-light mb-12">The smart way to invest<br /><span className="font-semibold">in Bali real estate</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            { title: 'Curated Listings', desc: 'Every property is hand-selected and verified by our local team. No fake listings, no hidden surprises.' },
            { title: 'Legal Assistance', desc: 'We guide you through Indonesian property law, leasehold & freehold structures, and notary processes.' },
            { title: 'Direct WhatsApp', desc: 'Skip the forms. Connect directly with our agents on WhatsApp for fast, personal responses.' },
          ].map(f => (
            <div key={f.title} className="border-t border-gray-200 pt-6">
              <h3 className="font-semibold mb-3">{f.title}</h3>
              <p className="text-sm text-gray-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* LISTINGS */}
      <div id="listings" className="border-t border-gray-100 py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Properties</p>
          <h2 className="text-3xl font-light mb-10">Available <span className="font-semibold">Listings</span></h2>
          <FilterBar />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {properties?.map(p => <PropertyCard key={p.slug} property={p} />)}
            {(!properties || properties.length === 0) && (
              <p className="col-span-3 text-center text-gray-300 py-20 text-sm">No properties found.</p>
            )}
          </div>
        </div>
      </div>

      {/* LOCATIONS */}
      <div className="border-t border-gray-100 py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Areas We Cover</p>
          <h2 className="text-3xl font-light mb-10">Popular <span className="font-semibold">Locations</span></h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['Canggu', 'Seminyak', 'Ubud', 'Jimbaran', 'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan'].map(loc => (
              <div key={loc} className="bg-white border border-gray-100 px-4 py-5 hover:border-gray-300 transition cursor-pointer">
                <p className="font-medium text-sm">{loc}</p>
                <p className="text-xs text-gray-400 mt-1">Bali, Indonesia</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-24 px-6 text-center">
        <div className="max-w-2xl mx-auto">
          <p className="text-xs tracking-widest text-gray-400 uppercase mb-4">Get In Touch</p>
          <h2 className="text-4xl font-light mb-4">Ready to find your<br /><span className="font-semibold">perfect villa?</span></h2>
          <p className="text-gray-500 text-sm mb-8">Our local team is ready to help you find the right property in Bali. Reach out on WhatsApp for a free consultation.</p>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="inline-block bg-black text-white text-sm px-10 py-3 hover:bg-gray-800 transition">
            Start on WhatsApp
          </a>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="border-t border-gray-100 px-6 py-10">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <p className="font-semibold mb-2">Great Bali Properties</p>
            <p className="text-xs text-gray-400 leading-relaxed">Premium villa and land listings across Bali. A proud partner of Great Bali Villas.</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Locations</p>
            <p className="text-xs text-gray-500 leading-relaxed">Canggu · Seminyak · Ubud<br />Jimbaran · Uluwatu · Sanur</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 uppercase tracking-wider mb-3">Contact</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              className="text-xs text-gray-500 hover:text-black transition block mb-1">WhatsApp</a>
            <p className="text-xs text-gray-500">info@greatbaliproperties.com</p>
          </div>
        </div>
        <div className="border-t border-gray-100 mt-8 pt-6 text-center">
          <p className="text-xs text-gray-400">© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>

    </main>
  )
}