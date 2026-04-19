import { supabase } from '../../lib/supabase'

export default async function PropertyDetail({ params }) {
  const { slug } = await params
  const { data: p } = await supabase.from('properties').select('*').eq('slug', slug).single()

  if (!p) return <div className="p-10 text-center text-gray-400">Property not found.</div>

  const formatPrice = (price) => {
    if (price >= 1000000000) return 'IDR ' + (price / 1000000000).toFixed(1) + 'B'
    if (price >= 1000000) return 'IDR ' + (price / 1000000).toFixed(0) + 'M'
    return 'IDR ' + price.toLocaleString()
  }

  const typeLabel = { leasehold: 'Leasehold', freehold: 'Freehold', yearly: 'Yearly Rent' }
  const waMessage = encodeURIComponent('Hi, I am interested in ' + p.title)
  const waLink = 'https://wa.me/' + p.whatsapp + '?text=' + waMessage

  return (
    <main style={{ fontFamily: "'Inter', sans-serif" }} className="min-h-screen bg-white text-black">

      {/* Navbar */}
      <nav className="border-b border-gray-100 px-6 py-4 flex justify-between items-center">
        <a href="/" className="font-semibold tracking-tight text-lg">Great Bali Properties</a>
        <a href="/" className="text-sm text-gray-400 hover:text-black transition">← Back to listings</a>
      </nav>

      <div className="max-w-5xl mx-auto px-6 py-12">

        {/* Image */}
        <div className="w-full h-96 overflow-hidden mb-10">
          <img src={p.images} alt={p.title} className="w-full h-full object-cover" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">

          {/* Left — Details */}
          <div className="md:col-span-2">
            <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">{p.location}, Bali</p>
            <h1 className="text-3xl font-light mb-2">{p.title}</h1>
            <p className="text-2xl font-semibold mb-1">{formatPrice(p.price)}</p>
            <p className="text-sm text-gray-400 mb-8">{typeLabel[p.price_type] || p.price_type}</p>

            {/* Specs */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-b border-gray-100 py-6 mb-8">
              {p.bedrooms > 0 && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bedrooms</p>
                  <p className="font-medium">{p.bedrooms}</p>
                </div>
              )}
              {p.bathrooms > 0 && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Bathrooms</p>
                  <p className="font-medium">{p.bathrooms}</p>
                </div>
              )}
              {p.land_size > 0 && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Land Size</p>
                  <p className="font-medium">{p.land_size} sqm</p>
                </div>
              )}
              {p.building_size > 0 && (
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Building</p>
                  <p className="font-medium">{p.building_size} sqm</p>
                </div>
              )}
            </div>

            {/* Description */}
            <div>
              <h2 className="text-xs text-gray-400 uppercase tracking-wider mb-3">About this property</h2>
              <p className="text-gray-600 leading-relaxed text-sm">{p.description}</p>
            </div>
          </div>

          {/* Right — CTA */}
          <div className="md:col-span-1">
            <div className="border border-gray-100 p-6 sticky top-6">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-4">Interested?</p>
              <p className="font-semibold text-lg mb-1">{formatPrice(p.price)}</p>
              <p className="text-xs text-gray-400 mb-6">{typeLabel[p.price_type]}</p>
              <a href={waLink} target="_blank" rel="noopener noreferrer"
                className="block w-full text-center bg-black text-white text-sm font-medium py-3 hover:bg-gray-800 transition mb-3">
                WhatsApp Inquiry
              </a>
              <a href="/"
                className="block w-full text-center border border-gray-200 text-gray-500 text-sm py-3 hover:border-gray-400 transition">
                View All Listings
              </a>
            </div>
          </div>
        </div>
      </div>

      <footer className="border-t border-gray-100 px-6 py-8 mt-10">
        <p className="text-xs text-gray-400 text-center">© 2025 Great Bali Properties. All rights reserved.</p>
      </footer>
    </main>
  )
}