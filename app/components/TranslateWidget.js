'use client'
import { useState } from 'react'

const translations = {
  en: { label: '🌐 EN', name: 'English' },
  id: { label: '🌐 ID', name: 'Bahasa' },
  zh: { label: '🌐 中文', name: 'Chinese' },
}

export default function TranslateWidget() {
  const [open, setOpen] = useState(false)
  const [current, setCurrent] = useState('en')

  const handleSelect = (lang) => {
    setCurrent(lang)
    setOpen(false)
    if (lang === 'id') {
      window.location.href = 'https://translate.google.com/translate?sl=en&tl=id&u=' + encodeURIComponent(window.location.href)
    } else if (lang === 'zh') {
      window.location.href = 'https://translate.google.com/translate?sl=en&tl=zh-CN&u=' + encodeURIComponent(window.location.href)
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', color: '#374151', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
        {translations[current].label} ▾
      </button>
      {open && (
        <div style={{
          position: 'absolute', top: '100%', right: 0, backgroundColor: 'white',
          border: '1px solid #e5e7eb', boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
          zIndex: 9999, minWidth: '140px', padding: '4px 0'
        }}>
          {Object.entries(translations).map(([key, val]) => (
            <button key={key} onClick={() => handleSelect(key)}
              style={{
                display: 'block', width: '100%', textAlign: 'left', padding: '10px 16px',
                fontSize: '13px', color: current === key ? 'black' : '#6b7280',
                fontWeight: current === key ? 600 : 400,
                background: 'none', border: 'none', cursor: 'pointer'
              }}>
              {val.label} {val.name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}