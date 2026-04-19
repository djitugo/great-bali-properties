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
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      backgroundColor: 'white',
      borderBottom: '1px solid #f3f4f6',
      boxShadow: scrolled ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
      transition: 'box-shadow 0.3s'
    }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
          <div style={{ fontWeight: 600, fontSize: '15px', letterSpacing: '-0.3px' }}>Great Bali Properties</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '1px' }}>by Great Bali Villas</div>
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '28px' }}>
          {menuItems.map(item => (
            <div key={item.label} style={{ position: 'relative' }}
              onMouseEnter={() => setOpenMenu(item.label)}
              onMouseLeave={() => setOpenMenu(null)}>
              {item.href ? (
                <a href={item.href} style={{ fontSize: '13px', color: '#4b5563', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {item.label}
                </a>
              ) : (
                <button style={{ fontSize: '13px', color: '#4b5563', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', padding: 0 }}>
                  {item.label}
                  <svg style={{ width: '10px', height: '10px', transform: openMenu === item.label ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              )}

              {/* Dropdown */}
              {item.dropdown && openMenu === item.label && (
                <div style={{
                  position: 'absolute', top: '100%', left: 0, paddingTop: '8px', width: '200px', zIndex: 100
                }}>
                  <div style={{ background: 'white', border: '1px solid #f3f4f6', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', padding: '8px 0' }}>
                    {item.dropdown.map(sub => (
                      <a key={sub.label} href={sub.href} style={{
                        display: 'block', padding: '10px 16px', fontSize: '13px', color: '#4b5563', textDecoration: 'none'
                      }}
                        onMouseEnter={e => e.target.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={e => e.target.style.backgroundColor = 'transparent'}>
                        {sub.label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}

          {/* CTA */}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            style={{ fontSize: '13px', backgroundColor: 'black', color: 'white', padding: '8px 18px', textDecoration: 'none', fontWeight: 500 }}>
            WhatsApp Us
          </a>
        </div>
      </div>
    </nav>
  )
}