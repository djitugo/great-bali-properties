'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useT } from '../lib/i18n'
import { SITE_WA } from '../lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

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
  const t = useT()

  const reasons = [
    {
      num: '01',
      title: t('World-Class Tourism Destination'),
      desc: t('Bali welcomes over 6 million international visitors annually, creating consistent demand for quality short-term rentals. High occupancy rates translate directly into strong rental yields for property owners.'),
      stat: '6M+',
      statLabel: t('Annual Visitors')
    },
    {
      num: '02',
      title: t('High Rental Yields'),
      desc: t('Well-located villas in areas like Canggu, Seminyak, and Uluwatu regularly achieve gross rental yields of 12–20% per year — significantly higher than most global real estate markets.'),
      stat: '15%',
      statLabel: t('Average Gross Yield')
    },
    {
      num: '03',
      title: t('Strong Capital Appreciation'),
      desc: t('Bali property values have grown consistently at 7–15% annually in prime areas. Limited land supply, rising tourism, and growing expat demand continue to push prices higher.'),
      stat: '10%+',
      statLabel: t('Annual Appreciation')
    },
    {
      num: '04',
      title: t('Digital Nomad & Expat Hub'),
      desc: t("Bali has become one of the world's leading destinations for remote workers and digital nomads. Long-stay demand is surging, creating opportunities for mid-term rental income beyond traditional tourism."),
      stat: '80K+',
      statLabel: t('Digital Nomads in Bali')
    },
    {
      num: '05',
      title: t('Affordable Entry Point'),
      desc: t('Compared to equivalent lifestyle destinations in Europe, Australia, or Southeast Asian financial hubs, Bali still offers exceptional value. A premium villa with pool can be acquired for a fraction of comparable properties elsewhere.'),
      stat: '$180K',
      statLabel: t('Entry-Level Villa Price')
    },
    {
      num: '06',
      title: t('Lifestyle & Investment Combined'),
      desc: t('Unlike pure investment markets, Bali lets you enjoy your asset. When not rented, your property is your private retreat — offering a lifestyle ROI that no spreadsheet can fully capture.'),
      stat: '365',
      statLabel: t('Days of Sun Per Year')
    },
  ]

  const areas = [
    {
      name: 'Canggu',
      type: t('Surf & Lifestyle'),
      yield: '14–18%',
      price: 'IDR 2.5B–8B',
      desc: t("Bali's most popular area for digital nomads and surfers. High occupancy, strong short-term rental demand, and a vibrant café culture make this the top choice for investor-lifestyle buyers."),
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'
    },
    {
      name: 'Seminyak',
      type: t('Luxury & Lifestyle'),
      yield: '12–16%',
      price: 'IDR 3B–15B',
      desc: t("Bali's premium lifestyle hub with high-end restaurants, beach clubs, and boutiques. Attracts affluent travelers who pay premium nightly rates, ensuring strong revenue even at lower occupancy."),
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&q=80'
    },
    {
      name: 'Uluwatu',
      type: t('Clifftop Luxury'),
      yield: '13–17%',
      price: 'IDR 2.5B–12B',
      desc: t('Dramatic clifftop villas with ocean views. The fastest-appreciating area in Bali over the past 5 years. World-class surf, luxury resorts, and a rapidly expanding hospitality scene.'),
      img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=600&q=80'
    },
    {
      name: 'Ubud',
      type: t('Wellness & Culture'),
      yield: '10–14%',
      price: 'IDR 1.5B–7B',
      desc: t("Bali's spiritual and cultural heart. Consistent year-round demand from wellness seekers, yoga retreats, and cultural tourists. Longer average stays mean lower turnover and management costs."),
      img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=600&q=80'
    },
    {
      name: 'Sanur',
      type: t('Relaxed & Family'),
      yield: '10–13%',
      price: 'IDR 1.8B–6B',
      desc: t("Bali's most established expat and retiree community. Calm beach, excellent infrastructure, and proximity to the new Sanur harbor and Bali International Hospital make this a stable long-term investment."),
      img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80'
    },
    {
      name: 'Jimbaran',
      type: t('Beach & Airport'),
      yield: '11–15%',
      price: 'IDR 2B–8B',
      desc: t('Convenient beachside living minutes from the airport. Famous for seafood restaurants and a relaxed atmosphere. Strong demand from families and couples seeking a quieter Bali experience.'),
      img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=600&q=80'
    },
  ]

  const faqs = [
    {
      q: t('Can foreigners buy property in Bali?'),
      a: t('Foreigners cannot hold freehold land title (Hak Milik) directly. However, there are several legal structures available: leasehold agreements (typically 25–30 years with extension options), nominee structures, or ownership through a PT PMA (foreign-owned company). Each has different implications — we always recommend working with a qualified notary and legal advisor.')
    },
    {
      q: t('What is the difference between leasehold and freehold?'),
      a: t('Freehold (Hak Milik) is outright ownership of land and building, available only to Indonesian citizens. Leasehold gives you the right to use a property for a fixed period — typically 25–30 years with options to extend. Leasehold is the most common structure used by foreign investors and can provide excellent returns within the lease period.')
    },
    {
      q: t('What taxes apply when buying property in Bali?'),
      a: t('The buyer typically pays BPHTB (Land and Building Acquisition Duty) of 5% of the transaction value. The seller pays PPh (Income Tax) of 2.5%. Notary fees are usually shared and range from 0.5–1%. There is also an annual land and building tax (PBB) which is very low — typically under IDR 5 million per year for most residential properties.')
    },
    {
      q: t('How much can I realistically earn from renting my villa?'),
      a: t('A well-managed 2-bedroom villa in a prime area like Canggu or Seminyak can generate gross revenue of IDR 600M–1.2B per year. After management fees (typically 15–25%), utilities, maintenance, and platform fees, net income often represents 60–70% of gross. Always ask for conservative projections, not optimistic ones.')
    },
    {
      q: t('Do I need to be in Bali to manage my investment?'),
      a: t('No. A reputable villa management company like Great Bali Villas can handle everything — guest bookings, housekeeping, maintenance, marketing, and financial reporting. You receive monthly income reports and can monitor performance remotely. Many of our clients have never visited their property since purchase.')
    },
    {
      q: t('What is a PT PMA and do I need one?'),
      a: t("A PT PMA (Penanaman Modal Asing) is a foreign direct investment company in Indonesia. It allows foreigners to legally operate a business and hold certain property rights. It's generally recommended for commercial hospitality investments or those purchasing multiple properties, rather than a single private villa. Setup costs around $2,000–5,000 USD and has ongoing compliance requirements.")
    },
  ]

  const steps = [
    { step: '01', title: t('Define Your Goals'), desc: t('Investment yield, lifestyle use, or both? Budget range? Leasehold or freehold? Getting clear on your objectives helps us find the right properties for you.') },
    { step: '02', title: t('Property Search & Viewings'), desc: t("We curate a shortlist based on your criteria and arrange property viewings — either in person or via detailed video tours if you're not yet in Bali.") },
    { step: '03', title: t('Due Diligence'), desc: t('Once you find a property you love, we conduct thorough legal due diligence — checking land certificates, zoning, permits, and any encumbrances on the title.') },
    { step: '04', title: t('Price Negotiation'), desc: t('We negotiate on your behalf to secure the best possible price and terms. Our local market knowledge gives you a significant advantage.') },
    { step: '05', title: t('Legal Process & Notary'), desc: t('We coordinate with a trusted notary to prepare all agreements. A deposit (typically 10%) secures the property during this phase.') },
    { step: '06', title: t('Completion & Handover'), desc: t('Final payment is made and the property is officially transferred. Keys are handed over and we can connect you with our villa management team if needed.') },
  ]

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
              {t('Bali Guide')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              {t('Why Invest')}<br /><strong>{t('in Bali?')}</strong>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '560px', lineHeight: 1.6 }}>
              {t("A complete guide to understanding Bali's real estate market — the opportunities, the numbers, and what every investor needs to know before buying.")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('The Opportunity')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.3 }}>
            {t('Bali offers a rare combination of')}<br /><strong>{t('lifestyle and strong returns')}</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.9 }}>
            {t("In most investment markets, you choose between returns and enjoyment. Bali is one of the few places in the world where you genuinely don't have to. A well-purchased villa can generate 12–20% annual yields while sitting empty between your own visits — and appreciate in value at the same time.")}
          </motion.p>
        </motion.div>
      </div>

      {/* 6 REASONS */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('The Case for Bali')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('6 reasons to invest')} <strong>{t('in Bali real estate')}</strong>
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
            {t('Location Guide')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '12px' }}>
            {t('Best areas to')} <strong>{t('invest in Bali')}</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '48px', maxWidth: '600px', lineHeight: 1.7 }}>
            {t('Location is the single most important factor in Bali real estate. Each area has a distinct character, target guest profile, and yield potential.')}
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
                      <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase' }}>{t('Gross Yield')}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: '12px', color: '#9ca3af', marginBottom: '10px' }}>{a.price}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7, marginBottom: '16px' }}>{a.desc}</p>
                  <a href={'/properties?location=' + a.name}
                    style={{ fontSize: '12px', border: '1px solid #e5e7eb', padding: '7px 14px', textDecoration: 'none', color: 'black', display: 'inline-block' }}>
                    {t('View {name} listings →').replace('{name}', a.name)}
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
              {t('How It Works')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('The buying process')}
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
            {t('Common Questions')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('Frequently asked questions')}
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
              {t('Continue Reading')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 4vw, 34px)', fontWeight: 300, marginBottom: '32px' }}>
              {t('More Bali Guides')}
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
              {[
                { title: t('Leasehold vs Freehold'), desc: t('Understanding ownership structures in Bali'), href: '/guide/ownership', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80' },
                { title: t('Legal Process Guide'), desc: t('Step-by-step through the notary process'), href: '/guide/legal', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
                { title: t('ROI & Rental Yields'), desc: t('How to calculate your real returns'), href: '/guide/roi', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80' },
                { title: t('Best Areas to Buy'), desc: t('Neighborhood-by-neighborhood breakdown'), href: '/guide/areas', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80' },
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
            {t('Ready to Invest?')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            {t('Start your Bali')}<br /><strong>{t('property journey')}</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            {t('Our team is available 7 days a week for a free consultation. No pressure, no obligations — just honest advice.')}
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${SITE_WA}`} target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: 'white', color: 'black', fontSize: '14px', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}>
              {t('WhatsApp Us')}
            </a>
            <a href="/properties"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '14px', padding: '14px 32px', textDecoration: 'none' }}>
              {t('Browse Properties')}
            </a>
          </motion.div>
        </motion.div>
      </div>

    </main>
  )
}
