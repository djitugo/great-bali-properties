'use client'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

// Loading screen: muncul saat initial load dan saat pindah route.
// Menampilkan logo heart-house dengan heartbeat pulse. Durasi minimum
// ~500ms biar transisi terasa halus, tapi tetap fade out begitu konten siap.
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const firstLoad = useRef(true)

  useEffect(() => {
    // Initial mount: tampilin sebentar lalu hide
    if (firstLoad.current) {
      firstLoad.current = false
      const timer = setTimeout(() => setVisible(false), 800)
      return () => clearTimeout(timer)
    }
    // Route change: flash loading singkat
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), 500)
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
          transition={{ duration: 0.4, ease: 'easeInOut' }}
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
          {/* Heart-house logo with heartbeat pulse */}
          <img
            translate="no"
            src="/logo-icon.svg"
            alt="Great Bali Properties"
            width="88"
            height="88"
            style={{
              display: 'block',
              animation: 'gbp-heartbeat 1.2s ease-in-out infinite',
              transformOrigin: 'center center',
            }}
          />

          {/* Subtle word mark below */}
          <img
            translate="no"
            src="/logo.png"
            alt=""
            aria-hidden="true"
            style={{
              display: 'block',
              height: '20px',
              width: 'auto',
              opacity: 0.55,
            }}
          />

          <style>{`
            @keyframes gbp-heartbeat {
              0%   { transform: scale(1);    }
              14%  { transform: scale(1.12); }
              28%  { transform: scale(1);    }
              42%  { transform: scale(1.12); }
              70%  { transform: scale(1);    }
              100% { transform: scale(1);    }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
