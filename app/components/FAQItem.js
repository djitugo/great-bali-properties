'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Accordion item dengan animasi buka DAN tutup (pakai AnimatePresence).
// Sebelumnya motion.div hanya dirender saat open=true, jadi saat ditutup
// unmount langsung tanpa transisi. Ini fix itu.
export default function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid #e5e7eb', padding: '20px 0' }}>
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          width: '100%', textAlign: 'left', background: 'none', border: 'none',
          cursor: 'pointer', display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start', gap: '16px', padding: 0
        }}>
        <span style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.5, color: 'black' }}>{q}</span>
        <span style={{
          fontSize: '20px', color: '#9ca3af', flexShrink: 0,
          transition: 'transform 0.3s',
          transform: open ? 'rotate(45deg)' : 'none',
          lineHeight: 1
        }}>+</span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="content"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}>
            <p style={{
              fontSize: '14px', color: '#6b7280', lineHeight: 1.9,
              marginTop: '16px', paddingRight: '32px'
            }}>{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
