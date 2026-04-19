'use client'
import { motion } from 'framer-motion'

export default function HeroSection() {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1800&q=80"
          alt="Bali Villa"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-16 max-w-6xl mx-auto w-full pt-20">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-xs tracking-widest text-white/60 uppercase mb-6">
          Bali Real Estate · Premium Properties
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl md:text-7xl font-light leading-tight mb-6 text-white">
          Find Your<br />
          <span className="font-semibold">Dream Villa</span><br />
          in Bali
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-white/70 text-base md:text-lg max-w-lg mb-10">
          Curated villas and land for sale across Bali's most sought-after locations. Trusted by investors worldwide.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-wrap gap-4">
          <a href="#listings"
            className="bg-white text-black text-sm px-8 py-3 hover:bg-gray-100 transition font-medium">
            View Listings
          </a>
          <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
            className="border border-white text-white text-sm px-8 py-3 hover:bg-white hover:text-black transition">
            Contact Agent
          </a>
        </motion.div>

        {/* Quick stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex gap-8 mt-16">
          {[
            { n: '50+', l: 'Properties' },
            { n: '10+', l: 'Years Experience' },
            { n: '1000+', l: 'Villas Managed' },
          ].map(s => (
            <div key={s.l}>
              <p className="text-2xl font-light text-white">{s.n}</p>
              <p className="text-xs text-white/50 uppercase tracking-wider mt-0.5">{s.l}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
        <p className="text-white/40 text-xs uppercase tracking-widest">Scroll</p>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-0.5 h-8 bg-white/30" />
      </motion.div>
    </div>
  )
}