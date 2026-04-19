'use client'
import { useState, useEffect } from 'react'

const menus = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'properties', label: 'Properties',
    items: [
      { label: 'All Properties', href: '/properties' },
      { label: 'Villas for Sale', href: '/properties?type=villa&status=for_sale' },
      { label: 'Land for Sale', href: '/properties?type=land&status=for_sale' },
      { label: 'Villas for Rent', href: '/properties?type=villa&status=for_rent' },
      { label: 'Featured Properties', href: '/properties?featured=true' },
    ]
  },
  { id: 'about', label: 'About', href: '/about' },
  {
    id: 'guide', label: 'Bali Guide',
    items: [
      { label: 'Why Invest in Bali', href: '/guide/invest' },
      { label: 'Best Areas to Buy', href: '/guide/areas' },
      { label: 'Leasehold vs Freehold', href: '/guide/ownership' },
      { label: 'Legal Process', href: '/guide/legal' },
      { label: 'Rental Yields & ROI', href: '/guide/roi' },
    ]
  },
  {
    id: 'featured', label: 'Featured',
    items: [
      { label: 'Featured Villas', href: '/properties?featured=true' },
      { label: 'New Listings', href: '/properties?sort=new' },
      { label: 'Price Reduced', href: '/properties?sort=reduced' },
    ]
  },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currency, setCurrency] = useState('IDR')
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)
  const [openCurrency, setOpenCurrency] = useState(false)
  const [openLang, setOpenLang] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('gbp_currency')
    if (saved) setCurrency(saved)
    const savedLang = localStorage.getItem('gbp_lang')
    if (savedLang) setLang(savedLang)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCurrency = (code) => {
    setCurrency(code)
    localStorage.setItem('gbp_currency', code)
    setOpenCurrency(false)
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: code }))
  }

  const handleLang = (code) => {
    setLang(code)
    localStorage.setItem('gbp_lang', code)
    setOpenLang(false)
    if (code === 'id') {
      window.location.href = 'https://translate.google.com/translate?sl=en&tl=id&u=' + encodeURIComponent('https://greatbaliproperties.com')
    } else {
      window.location.href = 'https://greatbaliproperties.com'
    }
  }

  const drop = {
    position: 'absolute', top: '110%', right: 0, backgroundColor: 'white',
    border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    zIndex: 9999, minWidth: '160px', padding: '4px 0'
  }
  const dropBtn = {
    display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px',
    fontSize: '13px', color: '#374151', background: 'none', border: 'none', cursor: 'pointer',
    whiteSpace: 'nowrap'
  }
  const menuDrop = {
    position: 'absolute', top: '100%', left: 0, backgroundColor: 'white',
    border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    zIndex: 9999, minWidth: '200px', padding: '4px 0'
  }

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        backgroundColor: 'white',
        borderBottom: '1px solid #e5e7eb',
        boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s'
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

          {/* Logo */}
          <a href="/" style={{ textDecoration: 'none', color: 'black', flexShrink: 0 }}>
            <div style={{ fontWeight: 700, fontSize: '15px', lineHeight: 1.2 }}>Great Bali Properties</div>
            <div style={{ fontSize: '10px', color: '#9ca3af' }}>by Great Bali Villas</div>
          </a>

          {/* Desktop Menu */}
          <div className="gbp-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
            {menus.map(m => (
              <div key={m.id} style={{ position: 'relative' }}
                onMouseEnter={() => setOpenMenu(m.id)}
                onMouseLeave={() => setOpenMenu(null)}>
                {m.href && !m.items ? (
                  <a href={m.href} style={{ padding: '8px 11px', fontSize: '13px', color: '#374151', textDecoration: 'none', display: 'block', whiteSpace: 'nowrap' }}>
                    {m.label}
                  </a>
                ) : (
                  <button style={{ padding: '8px 11px', fontSize: '13px', color: '#374151', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
                    {m.label} <span style={{ fontSize: '8px', opacity: 0.5 }}>▾</span>
                  </button>
                )}
                {m.items && openMenu === m.id && (
                  <div style={menuDrop}>
                    {m.items.map(item => (
                      <a key={item.label} href={item.href}
                        style={{ display: 'block', padding: '10px 16px', fontSize: '13px', color: '#374151', textDecoration: 'none', whiteSpace: 'nowrap' }}
                        onMouseEnter={e => e.currentTarget.style.backgroundColor = '#f9fafb'}
                        onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}>
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Language */}
            <div style={{ position: 'relative', marginLeft: '8px' }}>
              <button onClick={() => { setOpenLang(!openLang); setOpenCurrency(false) }}
                style={{ padding: '6px 10px', fontSize: '13px', color: '#374151', background: 'none', border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                {lang === 'en' ? '🇬🇧' : '🇮🇩'} <span style={{ fontSize: '8px' }}>▾</span>
              </button>
              {openLang && (
                <div style={drop}>
                  <button onClick={() => handleLang('en')} style={{ ...dropBtn, fontWeight: lang === 'en' ? 700 : 400 }}>🇬🇧 English</button>
                  <button onClick={() => handleLang('id')} style={{ ...dropBtn, fontWeight: lang === 'id' ? 700 : 400 }}>🇮🇩 Bahasa Indonesia</button>
                </div>
              )}
            </div>

            {/* Currency */}
            <div style={{ position: 'relative', marginLeft: '4px' }}>
              <button onClick={() => { setOpenCurrency(!openCurrency); setOpenLang(false) }}
                style={{ padding: '6px 10px', fontSize: '13px', color: '#374151', background: 'none', border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}>
                {currency} <span style={{ fontSize: '8px' }}>▾</span>
              </button>
              {openCurrency && (
                <div style={drop}>
                  <button onClick={() => handleCurrency('IDR')} style={{ ...dropBtn, fontWeight: currency === 'IDR' ? 700 : 400 }}>Rupiah (IDR)</button>
                  <button onClick={() => handleCurrency('USD')} style={{ ...dropBtn, fontWeight: currency === 'USD' ? 700 : 400 }}>US Dollar (USD)</button>
                </div>
              )}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ marginLeft: '8px', backgroundColor: 'black', color: 'white', padding: '8px 18px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              WhatsApp
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="gbp-mobile"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}>
            <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <span style={{ display: 'block', height: '2px', backgroundColor: 'black', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
              <span style={{ display: 'block', height: '2px', backgroundColor: 'black', opacity: mobileOpen ? 0 : 1, transition: 'all 0.3s' }} />
              <span style={{ display: 'block', height: '2px', backgroundColor: 'black', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div style={{ backgroundColor: 'white', borderTop: '1px solid #f3f4f6', padding: '16px 24px 32px', maxHeight: '85vh', overflowY: 'auto' }}>
            {menus.map(m => (
              <div key={m.id} style={{ marginBottom: '20px' }}>
                <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1.5px', margin: '0 0 8px', fontWeight: 600 }}>{m.label}</p>
                {m.items ? m.items.map(item => (
                  <a key={item.label} href={item.href}
                    style={{ display: 'block', fontSize: '14px', color: '#374151', textDecoration: 'none', padding: '8px 0', borderBottom: '1px solid #f9fafb' }}>
                    {item.label}
                  </a>
                )) : (
                  <a href={m.href} style={{ display: 'block', fontSize: '14px', color: '#374151', textDecoration: 'none', padding: '8px 0' }}>{m.label}</a>
                )}
              </div>
            ))}
            <div style={{ display: 'flex', gap: '8px', marginTop: '16px', flexWrap: 'wrap' }}>
              <button onClick={() => handleLang('en')}
                style={{ flex: 1, padding: '8px', fontSize: '13px', border: lang === 'en' ? '2px solid black' : '1px solid #e5e7eb', background: lang === 'en' ? 'black' : 'white', color: lang === 'en' ? 'white' : '#374151', cursor: 'pointer', minWidth: '60px' }}>
                🇬🇧 EN
              </button>
              <button onClick={() => handleLang('id')}
                style={{ flex: 1, padding: '8px', fontSize: '13px', border: lang === 'id' ? '2px solid black' : '1px solid #e5e7eb', background: lang === 'id' ? 'black' : 'white', color: lang === 'id' ? 'white' : '#374151', cursor: 'pointer', minWidth: '60px' }}>
                🇮🇩 ID
              </button>
              <button onClick={() => handleCurrency('IDR')}
                style={{ flex: 1, padding: '8px', fontSize: '13px', border: currency === 'IDR' ? '2px solid black' : '1px solid #e5e7eb', background: currency === 'IDR' ? 'black' : 'white', color: currency === 'IDR' ? 'white' : '#374151', cursor: 'pointer', minWidth: '60px' }}>
                IDR
              </button>
              <button onClick={() => handleCurrency('USD')}
                style={{ flex: 1, padding: '8px', fontSize: '13px', border: currency === 'USD' ? '2px solid black' : '1px solid #e5e7eb', background: currency === 'USD' ? 'black' : 'white', color: currency === 'USD' ? 'white' : '#374151', cursor: 'pointer', minWidth: '60px' }}>
                USD
              </button>
            </div>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '13px', fontSize: '14px', textDecoration: 'none', marginTop: '16px', fontWeight: 600 }}>
              WhatsApp Us
            </a>
          </div>
        )}
      </nav>

      <style>{`
        @media (max-width: 900px) {
          .gbp-desktop { display: none !important; }
          .gbp-mobile { display: flex !important; }
        }
        @media (min-width: 901px) {
          .gbp-desktop { display: flex !important; }
          .gbp-mobile { display: none !important; }
        }
      `}</style>
    </>
  )
}