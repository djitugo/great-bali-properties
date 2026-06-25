'use client'
import { useState, useEffect } from 'react'
import { useLang, useT } from '../lib/i18n'

function buildMenus(t) {
  return [
    { id: 'home', label: t('Home'), href: '/' },
    {
      id: 'properties', label: t('Properties'),
      items: [
        { label: t('All Properties'), href: '/properties' },
        { label: t('Villas for Sale'), href: '/properties?type=villa&status=for_sale' },
        { label: t('Land for Sale'), href: '/properties?type=land&status=for_sale' },
        { label: t('Leasehold'), href: '/properties?price_type=leasehold' },
      ]
    },
    { id: 'about', label: t('About'), href: '/about' },
    {
      id: 'guide', label: t('Bali Guide'),
      items: [
        { label: t('Why Invest in Bali'), href: '/guide' },
        { label: t('Best Areas to Buy'), href: '/guide/areas' },
        { label: t('Leasehold vs Freehold'), href: '/guide/ownership' },
        { label: t('Legal Process'), href: '/guide/legal' },
        { label: t('Rental Yields & ROI'), href: '/guide/roi' },
      ]
    },
    {
      id: 'featured', label: t('Featured'),
      items: [
        { label: t('Featured Villas'), href: '/properties?featured=true' },
        { label: t('New Listings'), href: '/properties?sort=new' },
      ]
    },
    { id: 'contact', label: t('Contact'), href: '/contact' },
  ]
}

export default function Navbar() {
  const { lang, setLang } = useLang()
  const t = useT()
  const [openMenu, setOpenMenu] = useState(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [currency, setCurrency] = useState('IDR')
  const [scrolled, setScrolled] = useState(false)
  const [openCurrency, setOpenCurrency] = useState(false)
  const [openLang, setOpenLang] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gbp_currency')
      if (saved) setCurrency(saved)
    } catch {}
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleCurrency = (code) => {
    setCurrency(code)
    try { localStorage.setItem('gbp_currency', code) } catch {}
    setOpenCurrency(false)
    window.dispatchEvent(new CustomEvent('currencyChange', { detail: code }))
  }

  // #6 — Manual translate, tanpa Google Translate redirect. Cukup ubah state.
  const handleLang = (code) => {
    setLang(code)
    setOpenLang(false)
    setMobileOpen(false)
    // Update <html lang> supaya screen reader & SEO konsisten
    try { document.documentElement.lang = code === 'id' ? 'id' : 'en' } catch {}
  }

  useEffect(() => {
    try { document.documentElement.lang = lang === 'id' ? 'id' : 'en' } catch {}
  }, [lang])

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = '/properties?q=' + encodeURIComponent(searchQuery.trim())
    }
  }

  const menus = buildMenus(t)

  const drop = {
    position: 'absolute', top: '110%', right: 0, backgroundColor: 'white',
    border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    zIndex: 9999, minWidth: '160px', padding: '4px 0'
  }
  const dropBtn = {
    display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px',
    fontSize: '13px', color: '#374151', background: 'none', border: 'none',
    cursor: 'pointer', whiteSpace: 'nowrap'
  }
  const menuDrop = {
    position: 'absolute', top: '100%', left: 0, backgroundColor: 'white',
    border: '1px solid #e5e7eb', boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    zIndex: 9999, minWidth: '200px', padding: '4px 0'
  }

  // #5 — Tampilkan bahasa yang aktif sekarang (bukan yang bisa dipilih)
  const currentLangLabel = lang === 'id' ? 'ID' : 'EN'

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 9999,
        backgroundColor: 'white', borderBottom: '1px solid #e5e7eb',
        boxShadow: scrolled ? '0 1px 8px rgba(0,0,0,0.06)' : 'none',
        transition: 'box-shadow 0.3s'
      }}>
        <div style={{ padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', gap: '16px' }}>

          {/* Site logo — tidak pernah diterjemahkan */}
          <a href="/" translate="no" aria-label="Great Bali Properties" style={{ textDecoration: 'none', flexShrink: 0, display: 'flex', alignItems: 'center' }}>
            <img src="/logo.png" alt="Great Bali Properties" style={{ display: 'block', height: '40px', width: 'auto' }} />
          </a>

          {/* Search */}
          <form onSubmit={handleSearch} className="gbp-desktop" style={{ flex: 1, maxWidth: '280px', display: 'flex', alignItems: 'center', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder={t('Search properties...')}
              style={{ flex: 1, border: 'none', padding: '8px 12px', fontSize: '13px', outline: 'none', backgroundColor: 'transparent', color: '#374151' }}
            />
            <button type="submit" aria-label="Search" style={{ background: 'none', border: 'none', padding: '8px 10px', cursor: 'pointer', color: '#9ca3af', display: 'flex', alignItems: 'center' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
          </form>

          {/* Desktop Menu */}
          <div className="gbp-desktop" style={{ display: 'flex', alignItems: 'center', gap: '2px', marginLeft: 'auto' }}>
            {menus.map(m => (
              <div key={m.id} style={{ position: 'relative' }}
                onMouseEnter={() => setOpenMenu(m.id)}
                onMouseLeave={() => setOpenMenu(null)}>
                {m.href && !m.items ? (
                  <a href={m.href} style={{ padding: '8px 10px', fontSize: '13px', color: '#374151', textDecoration: 'none', display: 'block', whiteSpace: 'nowrap' }}>
                    {m.label}
                  </a>
                ) : (
                  <button style={{ padding: '8px 10px', fontSize: '13px', color: '#374151', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px', whiteSpace: 'nowrap' }}>
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

            {/* Language — tombol menampilkan bahasa yang SEDANG AKTIF */}
            <div style={{ position: 'relative', marginLeft: '4px' }}>
              <button onClick={() => { setOpenLang(!openLang); setOpenCurrency(false) }}
                aria-label="Switch language"
                style={{ padding: '6px 10px', fontSize: '13px', fontWeight: 500, color: '#374151', background: 'none', border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {currentLangLabel} <span style={{ fontSize: '8px' }}>▾</span>
              </button>
              {openLang && (
                <div style={drop}>
                  <button onClick={() => handleLang('en')} style={{ ...dropBtn, fontWeight: lang === 'en' ? 700 : 400, backgroundColor: lang === 'en' ? '#f9fafb' : 'transparent' }}>EN — English</button>
                  <button onClick={() => handleLang('id')} style={{ ...dropBtn, fontWeight: lang === 'id' ? 700 : 400, backgroundColor: lang === 'id' ? '#f9fafb' : 'transparent' }}>ID — Bahasa</button>
                </div>
              )}
            </div>

            {/* Currency */}
            <div style={{ position: 'relative', marginLeft: '4px' }}>
              <button onClick={() => { setOpenCurrency(!openCurrency); setOpenLang(false) }}
                aria-label="Switch currency"
                style={{ padding: '6px 10px', fontSize: '13px', fontWeight: 500, color: '#374151', background: 'none', border: '1px solid #e5e7eb', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {currency} <span style={{ fontSize: '8px' }}>▾</span>
              </button>
              {openCurrency && (
                <div style={drop}>
                  <button onClick={() => handleCurrency('IDR')} style={{ ...dropBtn, fontWeight: currency === 'IDR' ? 700 : 400 }}>IDR — Rupiah</button>
                  <button onClick={() => handleCurrency('USD')} style={{ ...dropBtn, fontWeight: currency === 'USD' ? 700 : 400 }}>USD — Dollar</button>
                </div>
              )}
            </div>

            {/* WhatsApp */}
            <a href="https://wa.me/6282122973363" target="_blank" rel="noopener noreferrer"
              style={{ marginLeft: '8px', backgroundColor: 'black', color: 'white', padding: '8px 16px', fontSize: '13px', fontWeight: 600, textDecoration: 'none', whiteSpace: 'nowrap' }}>
              {t('WhatsApp')}
            </a>
          </div>

          {/* Hamburger */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="gbp-mobile"
            aria-label="Menu"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '8px', marginLeft: 'auto' }}>
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
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('Search properties...')}
                style={{ flex: 1, border: '1px solid #e5e7eb', padding: '10px 12px', fontSize: '14px', outline: 'none' }}
              />
              <button type="submit" aria-label="Search"
                style={{ backgroundColor: 'black', color: 'white', padding: '10px 14px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
              </button>
            </form>

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
              {['EN', 'ID'].map(l => (
                <button key={l} onClick={() => handleLang(l.toLowerCase())}
                  style={{ flex: 1, padding: '8px', fontSize: '13px', border: lang === l.toLowerCase() ? '2px solid black' : '1px solid #e5e7eb', background: lang === l.toLowerCase() ? 'black' : 'white', color: lang === l.toLowerCase() ? 'white' : '#374151', cursor: 'pointer', minWidth: '60px' }}>
                  {l}
                </button>
              ))}
              {['IDR', 'USD'].map(c => (
                <button key={c} onClick={() => handleCurrency(c)}
                  style={{ flex: 1, padding: '8px', fontSize: '13px', border: currency === c ? '2px solid black' : '1px solid #e5e7eb', background: currency === c ? 'black' : 'white', color: currency === c ? 'white' : '#374151', cursor: 'pointer', minWidth: '60px' }}>
                  {c}
                </button>
              ))}
            </div>
            <a href="https://wa.me/6282122973363" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', backgroundColor: 'black', color: 'white', textAlign: 'center', padding: '13px', fontSize: '14px', textDecoration: 'none', marginTop: '16px', fontWeight: 600 }}>
              {t('WhatsApp Us')}
            </a>
          </div>
        )}
      </nav>

      {/* Floating WhatsApp */}
      <a href="https://wa.me/6282122973363" target="_blank" rel="noopener noreferrer"
        aria-label="WhatsApp"
        style={{
          position: 'fixed', bottom: '24px', right: '24px', zIndex: 9998,
          backgroundColor: 'black', color: 'white', width: '52px', height: '52px',
          borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(0,0,0,0.25)', textDecoration: 'none',
          transition: 'transform 0.2s, box-shadow 0.2s'
        }}
        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.08)'; e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.35)' }}
        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.25)' }}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>

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
