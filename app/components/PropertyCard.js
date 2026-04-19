export default function PropertyCard({ property }) {
  const formatPrice = (price) => {
    if (price >= 1000000000) return 'IDR ' + (price / 1000000000).toFixed(1) + 'B'
    if (price >= 1000000) return 'IDR ' + (price / 1000000).toFixed(0) + 'M'
    return 'IDR ' + price.toLocaleString()
  }

  const typeLabel = { leasehold: 'Leasehold', freehold: 'Freehold', yearly: 'Yearly' }
  const waMessage = encodeURIComponent('Hi, I am interested in ' + property.title)
  const waLink = 'https://wa.me/' + property.whatsapp + '?text=' + waMessage

  return (
    <div className="border border-gray-100 hover:border-gray-300 transition group">
      <a href={'/property/' + property.slug} className="block">
        <div className="relative overflow-hidden">
          <img src={property.images} alt={property.title}
            className="w-full h-52 object-cover group-hover:scale-105 transition duration-500" />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="bg-white text-black text-xs px-2 py-1 font-medium">
              {property.status === 'for_sale' ? 'For Sale' : 'For Rent'}
            </span>
            {property.featured && (
              <span className="bg-black text-white text-xs px-2 py-1 font-medium">Featured</span>
            )}
          </div>
        </div>
        <div className="p-4">
          <p className="text-xs text-gray-400 mb-1">{property.location}, Bali</p>
          <h3 className="font-medium text-sm leading-snug mb-3 line-clamp-2">{property.title}</h3>
          <div className="flex gap-4 text-xs text-gray-400 mb-4">
            {property.bedrooms > 0 && <span>{property.bedrooms} Beds</span>}
            {property.bathrooms > 0 && <span>{property.bathrooms} Baths</span>}
            {property.land_size > 0 && <span>{property.land_size} sqm</span>}
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-base">{formatPrice(property.price)}</p>
              <p className="text-xs text-gray-400">{typeLabel[property.price_type] || property.price_type}</p>
            </div>
            <span className="text-xs border border-black px-3 py-1.5 hover:bg-black hover:text-white transition">
              View Detail
            </span>
          </div>
        </div>
      </a>
      <div className="px-4 pb-4">
        <a href={waLink} target="_blank" rel="noopener noreferrer"
          className="block w-full text-center border border-gray-200 text-gray-500 text-xs py-2 hover:border-black hover:text-black transition">
          WhatsApp Inquiry
        </a>
      </div>
    </div>
  )
}