'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const reasons = [
  {
    num: '01',
    title: 'World-Class Tourism Destination',
    desc: 'Bali welcomes over 6 million international visitors annually, creating consistent demand for quality short-term rentals. High occupancy rates translate directly into strong rental yields for property owners.',
    stat: '6M+',
    statLabel: 'Annual Visitors'
  },
  {
    num: '02',
    title: 'High Rental Yields',
    desc: 'Well-located villas in areas like Canggu, Seminyak, and Uluwatu regularly achieve gross rental yields of 12–20% per year — significantly higher than most global real estate markets.',
    stat: '15%',
    statLabel: 'Average Gross Yield'
  },
  {
    num: '03',
    title: 'Strong Capital Appreciation',
    desc: 'Bali property values have grown consistently at 7–15% annually in prime areas. Limited land supply, rising tourism, and growing expat demand continue to push prices higher.',
    stat: '10%+',
    statLabel: 'Annual Appreciation'
  },
  {
    num: '04',
    title: 'Digital Nomad & Expat Hub',
    desc: 'Bali has become one of the world\'s leading destinations for remote workers and digital nomads. Long-stay demand is surging, creating opportunities for mid-term rental income beyond traditional tourism.',
    stat: '80K+',
    statLabel: 'Digital Nomads in Bali'
  },
  {
    num: '05',
    title: 'Affordable Entry Point',
    desc: 'Compared to equivalent lifestyle destinations in Europe, Australia, or Southeast Asian financial hubs, Bali still offers exceptional value. A premium villa with pool can be acquired for a fraction of comparable properties elsewhere.',
    stat: '$180K',
    statLabel: 'Entry-Level Villa Price'
  },
  {
    num: '06',
    title: 'Lifestyle & Investment Combined',
    desc: 'Unlike pure investment markets, Bali lets you enjoy your asset. When not rented, your property is your private retreat — offering a lifestyle ROI that no spreadsheet can fully capture.',
    stat: '365',
    statLabel: 'Days of Sun Per Year'
  },
]

const areas = [
  {
    name: 'Canggu',
    type: 'Surf & Lifestyle',
    yield: '14–18%',
    price: 'IDR 2.5B–8B',
    desc: 'Bali\'s most popular area for digital nomads and surfers. High occupancy, strong short-term rental demand, and a vibrant café culture make this the top choice for investor-lifestyle buyers.',
    img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
  },
  {
    name: 'Seminyak',
    type: 'Luxury & Lifestyle',
    yield: '12–16%',
    price: 'IDR 3B–15B',
    desc: 'Bali\'s premium lifestyle hub with high-end restaurants, beach clubs, and boutiques. Attracts affluent travelers who pay premium nightly rates, ensuring strong revenue even at lower occupancy.',
    img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80'
  },
  {
    name: 'Uluwatu',
    type: 'Clifftop Luxury',
    yield: '13–17%',
    price: 'IDR 2.5B–12B',
    desc: 'Dramatic clifftop villas with ocean views. The fastest-appreciating area in Bali over the past 5 years. World-class surf, luxury resorts, and a rapidly expanding hospitality scene.',
    img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&q=80'
  },
  {
    name: 'Ubud',
    type: 'Wellness & Culture',
    yield: '10–14%',
    price: 'IDR 1.5B–7B',
    desc: 'Bali\'s spiritual and cultural heart. Consistent year-round demand from wellness seekers, yoga retreats, and cultural tourists. Longer average stays mean lower turnover and management costs.',
    img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80'
  },
  {
    name: 'Sanur',
    type: 'Relaxed & Family',
    yield: '10–13%',
    price: 'IDR 1.8B–6B',
    desc: 'Bali\'s most established expat and retiree community. Calm beach, excellent infrastructure, and proximity to the new Sanur harbor and Bali International Hospital make this a stable long-term investment.',
    img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80'
  },
  {
    name: 'Jimbaran',
    type: 'Beach & Airport',
    yield: '11–15%',
    price: 'IDR 2B–8B',
    desc: 'Convenient beachside living minutes from the airport. Famous for seafood restaurants and a relaxed atmosphere. Strong demand from families and couples seeking a quieter Bali experience.',
    img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80'
  },
]

const faqs = [
  {
    q: 'Can foreigners buy property in Bali?',
    a: 'Foreigners cannot hold freehold land title (Hak Milik) directly. However, there are several legal structures available: leasehold agreements (typically 25–30 years with extension options), nominee structures, or ownership through a PT PMA (foreign-owned company). Each has different implications — we always recommend working with a qualified notary and legal advisor.'
  },
  {
    q: 'What is the difference between leasehold and freehold?',
    a: 'Freehold (Hak Milik) is outright ownership of land and building, available only to Indonesian citizens. Leasehold gives you the right to use a property for a fixed period — typically 25–30 years with options to extend. Leasehold is the most common structure used by foreign investors and can provide excellent returns within the lease period.'
  },
  {
    q: 'What taxes apply when buying property in Bali?',
    a: 'The buyer typically pays BPHTB (Land and Building Acquisition Duty) of 5% of the transaction value. The seller pays PPh (Income Tax) of 2.5%. Notary fees are usually shared and range from 0.5–1%. There is also an annual land and building tax (PBB) which is very low — typically under IDR 5 million per year for most residential properties.'
  },
  {
    q: 'How much can I realistically earn from renting my villa?',
    a: 'A well-managed 2-bedroom villa in a prime area like Canggu or Seminyak can generate gross revenue of IDR 600M–1.2B per year. After management fees (typically 15–25%), utilities, maintenance, and platform fees, net income often represents 60–70% of gross. Always ask for conservative projections, not optimistic ones.'
  },
  {
    q: 'Do I need to be in Bali to manage my investment?',
    a: 'No. A reputable villa management company like Great Bali Villas can handle everything — guest bookings, housekeeping, maintenance, marketing, and financial reporting. You receive monthly income reports and can monitor performance remotely. Many of our clients have never visited their property since purchase.'
  },
  {
    q: 'What is a PT PMA and do I need one?',
    a: 'A PT PMA (Penanaman Modal Asing) is a foreign direct investment company in Indonesia. It allows foreigners to legally operate a business and hold certain property rights. It\'s generally recommended for commercial hospitality investments or those purchasing multiple properties, rather than a single private villa. Setup costs around $2,000–5,000 USD and has ongoing compliance requirements.'
  },
]

const steps = [
  { step: '01', title: 'Define Your Goals', desc: 'Investment yield, lifestyle use, or both? Budget range? Leasehold or freehold? Getting clear on your objectives helps us find the right properties for you.' },
  { step: '02', title: 'Property Search & Viewings', desc: 'We curate a shortlist based on your criteria and arrange property viewings — either in person or via detailed video tours if you\'re not yet in Bali.' },
  { step: '03', title: 'Due Diligence', desc: 'Once you find a property you love, we conduct thorough legal due diligence — checking land certificates, zoning, permits, and any encumbrances on the title.' },
  { step: '04', title: 'Price Negotiation', desc: 'We negotiate on your behalf to secure the best possible price and terms. Our local market knowledge gives you a significant advantage.' },
  { step: '05', title: 'Legal Process & Notary', desc: 'We coordinate with a trusted notary to prepare all agreements. A deposit (typically 10%) secures the property during this phase.' },
  { step: '06', title: 'Completion & Handover', desc: 'Final payment is made and the property is officially transferred. Keys are handed over and we can connect you with our villa management team if needed.' },
]

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ borderTop: '1px solid #e5e7eb', padding: '20px 0' }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', padding: 0 }}>
        <span style={{ fontSize: '15px', fontWeight: 500, lineHeight: 1.5, color: 'black' }}>{q}</span>
        <span style={{ fontSize: '20px', color: '#9ca3af', flexShrink: 0, transition: 'transform 0.3s', transform: open ? 'rotate(45deg)' : 'none', lineHeight: 1 }}>+</span>
      </button>
      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          transition={{ duration: 0.3 }}
          style={{ overflow: 'hidden' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.9, marginTop: '16px', paddingRight: '32px' }}>{a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function WhyInvestPage() {
  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>

      {/* HERO */}
      <div style={{ paddingTop: '64px' }}>
        <div style={{ position: 'relative', height: 'clamp(320px, 50vw, 540px)', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1800&q=80"
            alt="Bali Investment"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px' }}>
              Bali Guide
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              Why Invest<br /><strong>in Bali?</strong>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', lineHeight: 1.6 }}>
              A complete guide to understanding Bali's real estate market — the opportunities, the numbers, and what every investor needs to know before buying.
            </motion.p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            The Opportunity
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.3 }}>
            Bali offers a rare combination of<br /><strong>lifestyle and strong returns</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.9 }}>
            In most investment markets, you choose between returns and enjoyment. Bali is one of the few places in the world where you genuinely don't have to. A well-purchased villa can generate 12–20% annual yields while sitting empty between your own visits — and appreciate in value at the same time.
          </motion.p>
        </motion.div>
      </div>

      {/* 6 REASONS */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              The Case for Bali
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              6 reasons to invest <strong>in Bali real estate</strong>
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
              {reasons.map(r => (
                <motion.div key={r.num} variants={fadeUp}
                  style={{ backgroundColor: 'white', padding: '28px', border: '1px solid #e5e7eb' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
                    <span style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '2px' }}>{r.num}</span>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '24px', fontWeight: 700, lineHeight: 1 }}>{r.stat}</p>
                      <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '2px' }}>{r.statLabel}</p>
                    </div>
                  </div>
                  <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '12px' }}>{r.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{r.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* BEST AREAS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            Location Guide
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '12px' }}>
            Best areas to <strong>invest in Bali</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.7 }}>
            Location is the single most important factor in Bali real estate. Each area has a distinct character, target guest profile, and yield potential.
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
            {areas.map(a => (
              <motion.div key={a.name} variants={fadeUp}
                style={{ border: '1px solid #f3f4f6', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '200px', overflow: 'hidden' }}>
                  <img src={a.img} alt={a.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                    onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'black', color: 'white', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>
                    {a.type}
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <h3 style={{ fontWeight: 700, fontSize: '17px' }}>{a.name}</h3>
                    <div style={{ textAlign: 'right' }}>
                      <p style={{ fontSize: '13px', fontWeight: 700, color: 'black' }}>{a.yield}</p>
                      <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase' }}>Gross Yield</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>{a.price}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>{a.desc}</p>
                  <a href={'/properties?location=' + a.name}
                    style={{ fontSize: '12px', border: '1px solid #e5e7eb', padding: '7px 14px', textDecoration: 'none', color: 'black', display: 'inline-block' }}>
                    View {a.name} listings →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* BUYING PROCESS */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              How It Works
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              The buying <strong>process</strong>
            </motion.h2>
            <div>
              {steps.map((s, i) => (
                <motion.div key={s.step} variants={fadeUp}
                  style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '24px', paddingBottom: '32px', paddingTop: i > 0 ? '32px' : 0, borderTop: i > 0 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ textAlign: 'center', paddingTop: '4px' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: 'black', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, margin: '0 auto' }}>
                      {s.step}
                    </div>
                  </div>
                  <div>
                    <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '10px' }}>{s.title}</h3>
                    <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            Common Questions
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            Frequently asked <strong>questions</strong>
          </motion.h2>
          <div>
            {faqs.map((f, i) => (
              <FAQItem key={i} q={f.q} a={f.a} />
            ))}
            <div style={{ borderTop: '1px solid #e5e7eb' }} />
          </div>
        </motion.div>
      </div>

      {/* RELATED GUIDES */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              Continue Reading
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 300, marginBottom: '32px' }}>
              More <strong>Bali Guides</strong>
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[
                { title: 'Leasehold vs Freehold', desc: 'Understanding ownership structures in Bali', href: '/guide/ownership', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80' },
                { title: 'Legal Process Guide', desc: 'Step-by-step through the notary process', href: '/guide/legal', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
                { title: 'ROI & Rental Yields', desc: 'How to calculate your real returns', href: '/guide/roi', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80' },
                { title: 'Best Areas to Buy', desc: 'Neighborhood-by-neighborhood breakdown', href: '/guide/areas', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
              ].map(g => (
                <motion.a key={g.title} variants={fadeUp} href={g.href}
                  style={{ textDecoration: 'none', color: 'black', border: '1px solid #e5e7eb', overflow: 'hidden', backgroundColor: 'white', display: 'block' }}>
                  <div style={{ height: '140px', overflow: 'hidden' }}>
                    <img src={g.img} alt={g.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s' }}
                      onMouseEnter={e => e.target.style.transform = 'scale(1.05)'}
                      onMouseLeave={e => e.target.style.transform = 'scale(1)'} />
                  </div>
                  <div style={{ padding: '14px 16px' }}>
                    <p style={{ fontWeight: 600, fontSize: '13px', marginBottom: '5px' }}>{g.title}</p>
                    <p style={{ fontSize: '12px', color: '#9ca3af', lineHeight: 1.5 }}>{g.desc}</p>
                  </div>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: 'black', color: 'white', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '16px' }}>
            Ready to Invest?
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            Start your Bali<br /><strong>property journey</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            Our team is available 7 days a week for a free consultation. No pressure, no obligations — just honest advice.
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

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
          <div>
            <p style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Great Bali Properties</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>Premium villa and land listings across Bali. A proud partner of Great Bali Villas.</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Bali Guides</p>
            {[
              ['Why Invest in Bali', '/guide/invest'],
              ['Best Areas to Buy', '/guide/areas'],
              ['Leasehold vs Freehold', '/guide/ownership'],
              ['Legal Process', '/guide/legal'],
              ['ROI & Yields', '/guide/roi'],
            ].map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>{label}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>Properties</p>
            <a href="/properties" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>All Properties</a>
            <a href="/properties?type=villa" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>Villas</a>
            <a href="/properties?type=land" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>Land</a>
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