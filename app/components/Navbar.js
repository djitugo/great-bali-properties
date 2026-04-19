'use client'
import { useState, useEffect } from 'react'

const CURRENCIES = [
  { code: 'IDR', symbol: 'Rp', rate: 1, label: '🇮🇩 IDR' },
  { code: 'USD', symbol: '$', rate: 0.000062, label: '🇺🇸 USD' },
  { code: 'AUD', symbol: 'A$', rate: 0.000097, label: '🇦🇺 AUD' },
  { code: 'EUR', symbol: '€', rate: 0.000057, label: '🇪🇺 EUR' },
  { code: 'GBP', symbol: '£', rate: 0.000049, label: '🇬🇧 GBP' },
  { code: 'SGD', symbol: 'S$', rate: 0.000083, label: '🇸🇬 SGD' },
  { code: 'JPY', symbol: '¥', rate: 0.0094, label: '🇯🇵 JPY' },
  { code: 'CNY', symbol: '¥', rate: 0.00045, label: '🇨🇳 CNY' },
  { code: 'HKD', symbol: 'HK$', rate: 0.00048, label: '🇭🇰 HKD' },
  { code: 'MYR', symbol: 'RM', rate: 0.00029, label: '🇲🇾 MYR' },
]

const LANGUAGES = [
  { code: 'en', label: '🇬🇧 EN', name: 'English' },
  { code: 'id', label: '🇮🇩 ID', name: 'Bahasa' },
]

const menus = [
  { id: 'home', label: 'Home', href: '/' },
  {
    id: 'properties', label: 'Properties',
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
      { label: 'Featured Villas', href: '/?featured=true' },
      { label: 'New Listings', href: '/?sort=new' },
      { label: 'Price Reduced', href: '/?sort=reduced' },
    ]
  },
  { id: 'contact', label: 'Contact', href: '/contact' },
]

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openCurrency, setOpenCurrency] = useState(false)
  const [openLang, setOpenLang] = useState(false)
  const [currency, setCurrency] = useState('IDR')
  const [lang, setLang] = useState('en')
  const [scrolled, setScrolled] = useState(false)

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
      const base = window.location.origin + window.location.pathname + window.location.search
      window.location.href = 'https://translate.google.com/translate?sl=en&tl=id&u=' + encodeURIComponent(base)
    } else {
      // Strip Google Translate wrapper
      const url = window.location.href
      if (url.includes('translate.goog')) {
        const match = url.match(/[?&]u=([^&]+)/)
        if (match) window.location.href = decodeURIComponent(match[1])
        else window.location.href = 'https://greatbaliproperties.com'
      }
    }
  }

  const currentCurrency = CURRENCIES.find(c => c.code === currency)
  const currentLang = LANGUAGES.find(l => l.code === lang)

  const navStyle = {
    position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
    backgroundColor: 'white',
    borderBottom: scrolled ? '1px solid #e5e7eb' : '1px solid transparent',
    boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
    transition: 'all 0.3s', fontFamily: 'Inter, sans-serif'
  }

  const dropdownStyle = {
    position: 'absolute', top: '100%', left: 0, minWidth: '200px',
    backgroundColor: 'white', border: '1px solid #e5e7eb',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)', zIndex: 9999,
    paddingTop: '4px', paddingBottom: '4px', marginTop: '4px'
  }

  const dropItemStyle = {
    display: 'block', padding: '10px 16px', fontSize: '13px',
    color: '#374151', textDecoration: 'none', whiteSpace: 'nowrap',
    background: 'none', border: 'none', cursor: 'pointer', width: '100%', textAlign: 'left'
  }

  return (
    <nav style={navStyle}>
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="/" style={{ textDecoration: 'none', color: 'black' }}>
          <div style={{ fontWeight: 700, fontSize: '15px' }}>Great Bali Properties</div>
          <div style={{ fontSize: '10px', color: '#9ca3af' }}>by Great Bali Villas</div>
        </a>

        {/* Desktop Menu */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '2px', '@media(max-width:768px)': { display: 'none' } }} className="desktop-menu">
          {menus.map(m => (
            <div key={m.id} style={{ position: 'relative' }}
              onMouseEnter={() => setOpenMenu(m.id)}
              onMouseLeave={() => setOpenMenu(null)}>
              {m.href ? (
                <a href={m.href} style={{ padding: '8px 12px', fontSize: '13px', color: '#374151', textDecoration: 'none', display: 'block' }}>
                  {m.label}
                </a>
              ) : (
                <button style={{ padding: '8px 12px', fontSize: '13px', color: '#374151', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  {m.label} <span style={{ fontSize: '9px' }}>▾</span>
                </button>
              )}
              {m.items && openMenu === m.id && (
                <div style={dropdownStyle}>
                  {m.items.map(item => (
                    <a key={item.label} href={item.href} style={dropItemStyle}
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
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setOpenLang(!openLang); setOpenCurrency(false) }}
              style={{ padding: '8px 10px', fontSize: '13px', color: '#374151', background: 'none', border: 'none', cursor: 'pointer' }}>
              {currentLang?.label} <span style={{ fontSize: '9px' }}>▾</span>
            </button>
            {openLang && (
              <div style={{ ...dropdownStyle, left: 'auto', right: 0, minWidth: '140px' }}>
                {LANGUAGES.map(l => (
                  <button key={l.code} onClick={() => handleLang(l.code)} style={{
                    ...dropItemStyle, fontWeight: lang === l.code ? 600 : 400,
                    color: lang === l.code ? 'black' : '#6b7280'
                  }}>
                    {l.label} {l.name}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Currency */}
          <div style={{ position: 'relative' }}>
            <button onClick={() => { setOpenCurrency(!openCurrency); setOpenLang(false) }}
              style={{ padding: '8px 10px', fontSize: '13px', color: '#374151', background: 'none', border: 'none', cursor: 'pointer' }}>
              {currentCurrency?.label} <span style={{ fontSize: '9px' }}>▾</span>
            </button>
            {openCurrency && (
              <div style={{ ...dropdownStyle, left: 'auto', right: 0, minWidth: '150px', maxHeight: '300px', overflowY: 'auto' }}>
                {CURRENCIES.map(c => (
                  <button key={c.code} onClick={() => handleCurrency(c.code)} style={{
                    ...dropItemStyle, fontWeight: currency === c.code ? 600 : 400,
                    color: currency === c.code ? 'black' : '#6b7280'
                  }}>
                    {c.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* WhatsApp CTA */}
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            style={{ marginLeft: '8px', backgroundColor: 'black', color: 'white', padding: '8px 18px', fontSize: '13px', fontWeight: 600, textDecoration: 'none' }}>
            WhatsApp
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '8px' }}
          className="mobile-menu-btn">
          <div style={{ width: '22px', display: 'flex', flexDirection: 'column', gap: '5px' }}>
            <span style={{ display: 'block', height: '2px', backgroundColor: 'black', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', height: '2px', backgroundColor: 'black', transition: 'all 0.3s', opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ display: 'block', height: '2px', backgroundColor: 'black', transition: 'all 0.3s', transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div style={{ backgroundColor: 'white', borderTop: '1px solid #f3f4f6', padding: '16px 24px 24px' }}>
          {menus.map(m => (
            <div key={m.id} style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px' }}>{m.label}</p>
              {m.items ? (
                m.items.map(item => (
                  <a key={item.label} href={item.href}
                    style={{ display: 'block', fontSize: '14px', color: '#374151', textDecoration: 'none', padding: '6px 0' }}>
                    {item.label}
                  </a>
                ))
              ) : (
                <a href={m.href} style={{ display: 'block', fontSize: '14px', color: '#374151', textDecoration: 'none', padding: '6px 0' }}>
                  {m.label}
                </a>
              )}
            </div>
          ))}
          <div style={{ display: 'flex', gap: '8px', marginTop: '8px', flexWrap: 'wrap' }}>
            {LANGUAGES.map(l => (
              <button key={l.code} onClick={() => handleLang(l.code)}
                style={{ padding: '6px 12px', fontSize: '12px', border: lang === l.code ? '1px solid black' : '1px solid #e5e7eb', background: 'none', cursor: 'pointer', fontWeight: lang === l.code ? 600 : 400 }}>
                {l.label}
              </button>
            ))}
          </div>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            style={{ display: 'block', backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '12px', fontSize: '14px', textDecoration: 'none', marginTop: '16px' }}>
            WhatsApp Us
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-menu-btn { display: none !important; }
          .desktop-menu { display: flex !important; }
        }
      `}</style>
    </nav>
  )
}