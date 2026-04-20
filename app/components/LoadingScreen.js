'use client'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

// Loading screen sederhana: muncul saat initial load dan saat pindah route.
// Menampilkan spinning circle + logo. Durasi minimum ~500ms biar transisi terasa halus,
// tapi tetap fade out begitu konten siap.
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const firstLoad = useRef(true)

  useEffect(() => {
    // Initial mount: tampilin sebentar lalu hide
    if (firstLoad.current) {
      firstLoad.current = false
      const timer = setTimeout(() => setVisible(false), 650)
      return () => clearTimeout(timer)
    }
    // Route change: flash loading singkat
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 450)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loading-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeInOut' }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 99999,
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '20px',
            pointerEvents: visible ? 'auto' : 'none',
          }}>
          {/* Logo / nama site — tidak ikut di-translate */}
          <div translate="no" style={{ fontWeight: 700, fontSize: '14px', color: 'black', letterSpacing: '0.5px' }}>
            Great Bali Properties
          </div>

          {/* Spinning circle */}
          <div
            aria-label="Loading"
            role="status"
            style={{
              width: '32px',
              height: '32px',
              border: '2px solid #e5e7eb',
              borderTopColor: 'black',
              borderRadius: '50%',
              animation: 'gbp-spin 0.8s linear infinite',
            }}
          />

          <style>{`
            @keyframes gbp-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
