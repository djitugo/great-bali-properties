'use client'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const stats = [
  { number: '50+', label: 'Properties Listed' },
  { number: '10+', label: 'Years Experience' },
  { number: '1000+', label: 'Villas Managed' },
  { number: '100%', label: 'Trusted Service' },
]

const values = [
  {
    title: 'Transparency First',
    desc: 'No hidden fees, no inflated listings. Every property is priced fairly and all legal details are disclosed upfront. We believe informed buyers make the best decisions.'
  },
  {
    title: 'Local Expertise',
    desc: 'Our team lives and works in Bali. We know every neighborhood, every regulation, and every opportunity — giving you an insider advantage in a complex market.'
  },
  {
    title: 'End-to-End Support',
    desc: 'From first inquiry to notary signing, we guide you through every step. Legal assistance, property management, and after-sale support are all part of what we offer.'
  },
  {
    title: 'Curated Quality',
    desc: 'We don\'t list everything — only properties we\'ve personally vetted. Each listing meets our standards for legal compliance, condition, and investment potential.'
  },
  {
    title: 'Investor Focused',
    desc: 'Whether you\'re buying your first holiday villa or building a portfolio, we tailor our guidance to your goals — lifestyle, yield, or long-term appreciation.'
  },
  {
    title: 'Trusted Partnership',
    desc: 'As a partner of Great Bali Villas, one of Bali\'s leading villa management companies, we offer unmatched continuity from purchase to profitable operation.'
  },
]

const team = [
  {
    name: 'Aditya Pratama',
    role: 'Founder & Property Director',
    desc: 'Born and raised in Bali, Aditya has spent over a decade navigating the island\'s real estate market, helping hundreds of investors find and grow their property portfolios.',
    img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
  },
  {
    name: 'Sarah Mitchell',
    role: 'International Sales Manager',
    desc: 'With a background in luxury real estate across Asia-Pacific, Sarah specializes in connecting international buyers with the right Bali properties for their lifestyle and investment needs.',
    img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
  },
  {
    name: 'Wayan Suartama',
    role: 'Legal & Notary Liaison',
    desc: 'Wayan ensures every transaction is legally sound. His deep understanding of Indonesian property law protects buyers and sellers alike throughout the purchase process.',
    img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
  },
]

const locations = [
  'Canggu', 'Seminyak', 'Ubud', 'Jimbaran',
  'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan',
]

export default function AboutPage() {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>

      {/* HERO */}
      <div style={{ paddingTop: '64px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 'clamp(320px, 50vw, 520px)', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80"
            alt="Bali"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.7) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', marginBottom: '16px' }}>
              About Us
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              Bali's Trusted<br /><strong>Property Partner</strong>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', lineHeight: 1.6 }}>
              A curated real estate agency dedicated to helping investors and dreamers find their perfect piece of Bali.
            </motion.p>
          </div>
        </div>
      </div>

      {/* STATS */}
      <div style={{ borderBottom: '1px solid #f3f4f6', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 48px)' }}>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
            style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '32px', textAlign: 'center' }}>
            {stats.map(s => (
              <motion.div key={s.label} variants={fadeUp}>
                <p style={{ fontSize: 'clamp(36px, 5vw, 52px)', fontWeight: 300, marginBottom: '8px', lineHeight: 1 }}>{s.number}</p>
                <p style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px' }}>{s.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* OUR STORY */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              Our Story
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.2 }}>
              Born from a passion<br /><strong>for Bali</strong>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9, marginBottom: '20px' }}>
              Great Bali Properties was founded with one simple belief: buying property in Bali should be exciting, not stressful. Too many investors had been burned by confusing legalities, misleading listings, and agents who disappeared after the sale.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9, marginBottom: '20px' }}>
              We set out to build something different — a real estate agency rooted in transparency, local knowledge, and genuine care for our clients. As a proud partner of Great Bali Villas, one of Bali's most respected villa management companies, we bring over a decade of on-the-ground expertise to every transaction.
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9 }}>
              Today, we serve buyers and investors from across the globe, helping them navigate the Indonesian property market with confidence — from first inquiry to final handover and beyond.
            </motion.p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <div style={{ position: 'relative' }}>
              <img
                src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=800&q=80"
                alt="Bali Villa"
                style={{ width: '100%', aspectRatio: '4/3', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', bottom: '-20px', right: '-20px', backgroundColor: 'black', color: 'white', padding: '20px 24px', maxWidth: '200px' }}>
                <p style={{ fontSize: '28px', fontWeight: 300, lineHeight: 1 }}>10+</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>Years in Bali</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* OUR VALUES */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div
            variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              What We Stand For
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '48px', lineHeight: 1.2 }}>
              Our <strong>Values</strong>
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
              {values.map((v, i) => (
                <motion.div key={v.title} variants={fadeUp}
                  style={{ borderTop: '2px solid black', paddingTop: '20px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginBottom: '8px' }}>0{i + 1}</p>
                  <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '12px' }}>{v.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* TEAM */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            The People Behind It
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '48px', lineHeight: 1.2 }}>
            Meet the <strong>Team</strong>
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
            {team.map(member => (
              <motion.div key={member.name} variants={fadeUp}>
                <div style={{ overflow: 'hidden', marginBottom: '20px', aspectRatio: '4/3' }}>
                  <img
                    src={member.img}
                    alt={member.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top', display: 'block', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.04)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'}
                  />
                </div>
                <h3 style={{ fontWeight: 600, fontSize: '16px', marginBottom: '4px' }}>{member.name}</h3>
                <p style={{ fontSize: '12px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px' }}>{member.role}</p>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{member.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* LOCATIONS */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              Where We Operate
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '32px' }}>
              Our <strong>Locations</strong>
            </motion.h2>
            <motion.div variants={stagger} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
              {locations.map(loc => (
                <motion.a key={loc} variants={fadeUp} href={'/properties?location=' + loc}
                  style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '16px 14px', textDecoration: 'none', color: 'black', display: 'block', transition: 'border-color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.borderColor = '#374151'}
                  onMouseLeave={e => e.currentTarget.style.borderColor = '#e5e7eb'}>
                  <p style={{ fontWeight: 500, fontSize: '13px' }}>{loc}</p>
                  <p style={{ fontSize: '11px', color: '#9ca3af', marginTop: '3px' }}>Bali</p>
                </motion.a>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* WHY GREAT BALI PROPERTIES */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '64px', alignItems: 'center' }}>
          <div>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              Why Choose Us
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '32px', lineHeight: 1.2 }}>
              The <strong>Great Bali Properties</strong> difference
            </motion.h2>
            {[
              { title: 'Partner of Great Bali Villas', desc: 'Access to 1,000+ managed villas and a team with 10+ years of on-the-ground Bali experience.' },
              { title: 'Full Legal Support', desc: 'In-house legal guidance covering leasehold, freehold, notary processes, and foreign ownership structures.' },
              { title: 'Post-Purchase Management', desc: 'We can manage your villa for short-term rentals, long-term leases, or simply keep it in perfect condition for your visits.' },
              { title: 'Honest Market Valuations', desc: 'We price properties based on real market data — not inflated numbers designed to maximize our commission.' },
            ].map((item, i) => (
              <motion.div key={item.title} variants={fadeUp}
                style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
                <div style={{ width: '32px', height: '32px', backgroundColor: 'black', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, flexShrink: 0, marginTop: '2px' }}>
                  {i + 1}
                </div>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '14px', marginBottom: '6px' }}>{item.title}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
            <img
              src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&q=80"
              alt="Bali Villa"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
            />
          </motion.div>
        </motion.div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: 'black', color: 'white', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div
          variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '16px' }}>
            Ready to Start?
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            Let's find your<br /><strong>dream property</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            Our team is available 7 days a week. Reach out on WhatsApp for a free consultation with no obligations.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: 'white', color: 'black', fontSize: '14px', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}>
              WhatsApp Us
            </a>
            <a href="/properties"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '14px', padding: '14px 32px', textDecoration: 'none' }}>
              Browse Properties
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Great Bali Properties</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>Premium villa and land listings across Bali. A proud partner of Great Bali Villas.</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Navigate</p>
            {[['Home', '/'], ['Properties', '/properties'], ['About', '/about'], ['Contact', '/contact']].map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>{label}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Locations</p>
            <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 2 }}>Canggu · Seminyak · Ubud<br />Jimbaran · Uluwatu · Sanur</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Contact</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>WhatsApp</a>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>info@greatbaliproperties.com</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '32px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 Great Bali Properties. All rights reserved.</p>
        </div>
      </footer>

    </main>
  )
}