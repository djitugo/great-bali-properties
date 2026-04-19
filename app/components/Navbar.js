'use client'
import { useState, useEffect } from 'react'

const menuItems = [
  {
    label: 'Properties',
    dropdown: [
      { label: 'All Listings', href: '/#listings' },
      { label: 'Villas for Sale', href: '/?type=villa&status=for_sale' },
      { label: 'Land for Sale', href: '/?type=land&status=for_sale' },
      { label: 'Villas for Rent', href: '/?type=villa&status=for_rent' },
      { label: 'Commercial', href: '/?type=commercial' },
      { label: 'Featured Properties', href: '/?featured=true' },
    ]
  },
  {
    label: 'Locations',
    dropdown: [
      { label: 'Canggu', href: '/?location=Canggu' },
      { label: 'Seminyak', href: '/?location=Seminyak' },
      { label: 'Ubud', href: '/?location=Ubud' },
      { label: 'Jimbaran', href: '/?location=Jimbaran' },
      { label: 'Uluwatu', href: '/?location=Uluwatu' },
      { label: 'Sanur', href: '/?location=Sanur' },
      { label: 'Pererenan', href: '/?location=Pererenan' },
    ]
  },
  {
    label: 'Investment',
    dropdown: [
      { label: 'Why Invest in Bali', href: '/invest' },
      { label: 'Leasehold vs Freehold', href: '/invest#leasehold' },
      { label: 'ROI & Yields', href: '/invest#roi' },
      { label: 'Legal Guide', href: '/invest#legal' },
    ]
  },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-white shadow-sm' : 'bg-white/80 backdrop-blur-md'
    } border-b border-gray-100`}>
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        {/* Logo */}
        <a href="/" className="flex flex-col">
          <span className="font-semibold tracking-tight text-base leading-none">Great Bali Properties</span>
          <span className="text-xs text-gray-400 mt-0.5">by Great Bali Villas</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {menuItems.map(item => (
            <div key={item.label} className="relative"
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}>
              {item.href ? (
                <a href={item.href}
                  className="text-sm text-gray-600 hover:text-black transition flex items-center gap-1">
                  {item.label}
                </a>
              ) : (
                <button className="text-sm text-gray-600 hover:text-black transition flex items-center gap-1">
                  {item.label}
                  <svg className={`w-3 h-3 transition-transform ${openMenu === item.label ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              {/* Dropdown */}
              {item.dropdown && openMenu === item.label && (
                <div className="absolute top-full left-0 pt-2 w-52">
                  <div className="bg-white border border-gray-100 shadow-lg py-2">
                    {item.dropdown.map(sub => (
                      <a key={sub.label} href={sub.href}
                        className="block px-4 py-2.5 text-sm text-gray-600 hover:text-black hover:bg-gray-50 transition">
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="text-sm bg-black text-white px-4 py-2 hover:bg-gray-800 transition">
            WhatsApp Us
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setMobileOpen(!mobileOpen)}>
          <div className="space-y-1.5">
            <span className={`block w-6 h-0.5 bg-black transition-all ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${mobileOpen ? 'opacity-0' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-black transition-all ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4">
          {menuItems.map(item => (
            <div key={item.label} className="mb-4">
              <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">{item.label}</p>
              {item.dropdown ? (
                item.dropdown.map(sub => (
                  <a key={sub.label} href={sub.href}
                    className="block text-sm text-gray-600 py-1.5 hover:text-black transition">
                    {sub.label}
                  </a>
                ))
              ) : (
                <a href={item.href} className="block text-sm text-gray-600 py-1.5 hover:text-black transition">
                  {item.label}
                </a>
              )}
            </div>
          ))}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="block w-full text-center bg-black text-white text-sm py-3 mt-4">
            WhatsApp Us
          </a>
        </div>
      )}
    </nav>
  )
}