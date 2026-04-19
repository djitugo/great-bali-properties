'use client'
import { useState } from 'react'
import TranslateWidget from './TranslateWidget'

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)

  const nav = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
    backgroundColor: 'white', borderBottom: '1px solid #e5e7eb',
    fontFamily: 'Inter, sans-serif'
  }
  const container = {
    maxWidth: '1280px', margin: '0 auto', padding: '0 24px',
    height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between'
  }
  const logo = { fontWeight: 700, fontSize: '16px', color: 'black', textDecoration: 'none' }
  const menuWrap = { display: 'flex', alignItems: 'center', gap: '4px' }
  const menuBtn = {
    background: 'none', border: 'none', cursor: 'pointer',
    padding: '8px 12px', fontSize: '13px', color: '#374151',
    display: 'flex', alignItems: 'center', gap: '4px', borderRadius: '4px'
  }
  const dropdown = {
    position: 'absolute', top: '100%', left: 0, minWidth: '200px',
    backgroundColor: 'white', border: '1px solid #e5e7eb',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 9999, paddingTop: '4px', paddingBottom: '4px'
  }
  const dropItem = {
    display: 'block', padding: '10px 16px', fontSize: '13px',
    color: '#374151', textDecoration: 'none', whiteSpace: 'nowrap'
  }
  const ctaBtn = {
    backgroundColor: 'black', color: 'white', padding: '8px 16px',
    fontSize: '13px', fontWeight: 500, textDecoration: 'none', marginLeft: '8px'
  }

  const menus = [
    { id: 'home', label: 'Home', href: '/' },
    {
      id: 'properties', label: 'Properties ▾',
      items: [
        { label: 'All Listings', href: '/#listings' },
        { label: 'Villas for Sale', href: '/?type=villa&status=for_sale' },
        { label: 'Land for Sale', href: '/?type=land&status=for_sale' },
        { label: 'Villas for Rent', href: '/?type=villa&status=for_rent' },
        { label: 'Commercial', href: '/?type=commercial' },
      ]
    },
    { id: 'about', label: 'About', href: '/about' },
    {
      id: 'guide', label: 'Bali Guide ▾',
      items: [
        { label: 'Why Invest in Bali', href: '/guide/invest' },
        { label: 'Best Areas to Buy', href: '/guide/areas' },
        { label: 'Leasehold vs Freehold', href: '/guide/ownership' },
        { label: 'Legal Process', href: '/guide/legal' },
        { label: 'Rental Yields & ROI', href: '/guide/roi' },
      ]
    },
    {
      id: 'featured', label: 'Featured ▾',
      items: [
        { label: 'Featured Villas', href: '/?featured=true' },
        { label: 'New Listings', href: '/?sort=new' },
        { label: 'Price Reduced', href: '/?sort=reduced' },
      ]
    },
    { id: 'contact', label: 'Contact', href: '/contact' },
  ]

  return (
    <nav style={nav}>
      <div style={container}>
        {/* Logo */}
        <a href="/" style={logo}>Great Bali Properties</a>

        {/* Desktop Menu */}
        <div style={menuWrap}>
          {menus.map(m => (
            <div key={m.id} style={{ position: 'relative' }}
              onMouseEnter={() => setOpenMenu(m.id)}
              onMouseLeave={() => setOpenMenu(null)}>
              {m.href ? (
                <a href={m.href} style={menuBtn}>{m.label}</a>
              ) : (
                <button style={menuBtn}>{m.label}</button>
              )}
              {m.items && openMenu === m.id && (
                <div style={dropdown}>
                  {m.items.map(item => (
                    <a key={item.label} href={item.href} style={dropItem}
                      onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                      onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                      {item.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}

          {/* Currency & Translate placeholders */}
         <TranslateWidget />
          <button style={{ ...menuBtn, color: '#6b7280' }}>💱 IDR</button>

          {/* CTA */}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer" style={ctaBtn}>
            WhatsApp
          </a>
        </div>
      </div>
    </nav>
  )
}