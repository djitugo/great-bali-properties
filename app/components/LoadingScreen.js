'use client'
import { useEffect, useState, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'

// Loading screen: muncul saat initial load dan saat pindah route.
// Logo + thin progress bar yang ngisi sebelum overlay fade out.
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true)
  const pathname = usePathname()
  const firstLoad = useRef(true)
  const [duration, setDuration] = useState(700)

  useEffect(() => {
    const ms = firstLoad.current ? 800 : 500
    setDuration(ms)
    firstLoad.current = false
    setVisible(true)
    const timer = setTimeout(() => setVisible(false), ms)
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
            gap: '24px',
            pointerEvents: visible ? 'auto' : 'none',
          }}>
          {/* Site logo */}
          <img
            translate="no"
            src="/logo.png"
            alt="Great Bali Properties"
            style={{
              display: 'block',
              height: '52px',
              width: 'auto',
              maxWidth: '70vw',
            }}
          />

          {/* Thin progress bar */}
          <div
            role="progressbar"
            aria-label="Loading"
            style={{
              width: '180px',
              height: '2px',
              backgroundColor: '#f3f4f6',
              overflow: 'hidden',
              position: 'relative',
            }}>
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '100%',
                backgroundColor: 'black',
                transformOrigin: 'left center',
                animation: `gbp-progress ${duration}ms ease-out forwards`,
              }}
            />
          </div>

          <style>{`
            @keyframes gbp-progress {
              from { transform: scaleX(0); }
              to   { transform: scaleX(1); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
