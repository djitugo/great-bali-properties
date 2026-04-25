'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useT } from '../../lib/i18n'
import { SITE_WA } from '../../lib/site'

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

export default function BestAreasPage() {
  const t = useT()

  const areas = [
    {
      name: 'Canggu',
      tagline: t('The Digital Nomad Capital'),
      type: t('Surf & Lifestyle'),
      yield: '14–18%',
      price: 'IDR 2.5B–8B',
      appreciation: '12–15% / yr',
      occupancy: '75–85%',
      img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
      desc: t("Once a sleepy surf village, Canggu has transformed into Bali's most dynamic lifestyle hub. Cafés, co-working spaces, and boutique hotels line the rice paddies, attracting a non-stop stream of digital nomads, surfers, and young professionals who stay for weeks — not days."),
      bestFor: [t('Digital nomads'), t('Short-term rental investors'), t('Lifestyle buyers under 40')],
      pros: [t('Highest short-term rental demand on the island'), t('Strong café and co-working infrastructure'), t('World-class surf breaks'), t('Deep expat community')],
      cons: [t('Heavy traffic during peak hours'), t('Rapidly rising land prices'), t('Some areas over-developed')],
      subAreas: ['Berawa', 'Batu Bolong', 'Echo Beach', 'Pererenan', 'Babakan']
    },
    {
      name: t('Uluwatu & Bukit'),
      tagline: t('Clifftop Luxury'),
      type: t('Luxury Ocean Views'),
      yield: '13–17%',
      price: 'IDR 2.5B–12B',
      appreciation: '15–20% / yr',
      occupancy: '70–80%',
      img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200&q=80',
      desc: t("The Bukit Peninsula offers Bali's most dramatic landscapes — limestone cliffs plunging into turquoise water. Uluwatu has exploded in popularity over the past 5 years, becoming the fastest-appreciating area on the island with world-class surf breaks and destination beach clubs."),
      bestFor: [t('Luxury investors'), t('Capital appreciation seekers'), t('Surfers')],
      pros: [t('Fastest capital appreciation on the island'), t('Unmatched ocean views'), t('Premium nightly rates'), t('World-class surf')],
      cons: [t('Limited fresh water in some zones'), t('Distance from central Bali'), t('Higher construction costs')],
      subAreas: ['Uluwatu', 'Bingin', 'Balangan', 'Nusa Dua', 'Pecatu']
    },
    {
      name: 'Seminyak',
      tagline: t('Established Luxury'),
      type: t('Premium Lifestyle'),
      yield: '12–16%',
      price: 'IDR 3B–15B',
      appreciation: '6–9% / yr',
      occupancy: '72–82%',
      img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200&q=80',
      desc: t("Bali's original luxury hub. Five-star hotels, Michelin-aspiring restaurants, beach clubs, and designer boutiques line every street. The market has matured — slower appreciation than Canggu or Uluwatu, but rock-solid demand from affluent travelers who pay premium rates."),
      bestFor: [t('Established investors'), t('Luxury brand operators'), t('Steady cash-flow seekers')],
      pros: [t('Premium nightly rates'), t('Mature infrastructure'), t('Proven rental track record'), t('High-end guest profile')],
      cons: [t('Slower capital appreciation'), t('Highest entry prices'), t('Crowded in peak season')],
      subAreas: ['Oberoi', 'Petitenget', 'Kerobokan', 'Double Six']
    },
    {
      name: 'Ubud',
      tagline: t('Wellness & Culture'),
      type: t('Jungle & Spiritual'),
      yield: '10–14%',
      price: 'IDR 1.5B–7B',
      appreciation: '8–11% / yr',
      occupancy: '65–75%',
      img: 'https://images.unsplash.com/photo-1573790387438-4da905039392?w=1200&q=80',
      desc: t("Bali's spiritual and artistic heart — rice terraces, yoga retreats, and wellness centers draw a different guest profile than the coast. Longer average stays (7–14 days) mean lower turnover costs and more stable occupancy year-round."),
      bestFor: [t('Wellness retreat operators'), t('Long-stay rental investors'), t('Lower-budget entry')],
      pros: [t('Lower entry prices'), t('Longer average stays'), t('Year-round demand'), t('Unique jungle setting')],
      cons: [t('Lower nightly rates than coastal areas'), t('Further from the airport (1.5 hrs)'), t('No beach access')],
      subAreas: ['Central Ubud', 'Penestanan', 'Tegallalang', 'Payangan']
    },
    {
      name: 'Sanur',
      tagline: t('The Quiet Veteran'),
      type: t('Family & Retiree'),
      yield: '10–13%',
      price: 'IDR 1.8B–6B',
      appreciation: '8–12% / yr',
      occupancy: '68–78%',
      img: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=1200&q=80',
      desc: t("Bali's most established expat community — calm beach, flat walkable streets, and excellent infrastructure. The new Sanur harbor (gateway to Nusa Penida) and the massive Bali International Hospital have made this the most stable long-term investment on the island."),
      bestFor: [t('Long-term rental investors'), t('Retirees'), t('Family buyers'), t('Conservative investors')],
      pros: [t('Stable, mature market'), t('Excellent healthcare access'), t('Calm beach, no surf'), t('Strong long-stay demand')],
      cons: [t('Older demographic = lower nightly rates'), t('Less nightlife / "buzz"'), t('Slower appreciation')],
      subAreas: ['Sanur Kaja', 'Sanur Kauh', 'Batu Jimbar', 'Mertasari']
    },
    {
      name: 'Jimbaran',
      tagline: t('Beach Meets Convenience'),
      type: t('Beach & Airport'),
      yield: '11–15%',
      price: 'IDR 2B–8B',
      appreciation: '10–13% / yr',
      occupancy: '70–80%',
      img: 'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
      desc: t('A 10-minute drive from the airport, Jimbaran offers beachside living without the Seminyak price tag. Famous for sunset seafood grills along the bay. Strong demand from families and couples who want a quieter, more authentic Bali experience.'),
      bestFor: [t('Families'), t('Short-trip travelers'), t('Couples seeking quiet')],
      pros: [t('Closest beach area to the airport'), t('Calmer than Seminyak / Canggu'), t('Strong mid-market demand'), t('Authentic atmosphere')],
      cons: [t('Less nightlife'), t('Fewer co-working / nomad amenities'), t('Traffic during peak season')],
      subAreas: ['Jimbaran Bay', 'Four Seasons area', 'Ungasan']
    },
    {
      name: t('Tabanan & West Coast'),
      tagline: t('The Next Frontier'),
      type: t('Emerging Market'),
      yield: '12–16% (projected)',
      price: 'IDR 1B–4B',
      appreciation: '15–25% / yr',
      occupancy: '60–75%',
      img: 'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200&q=80',
      desc: t('The west coast — Tabanan, Tanah Lot, Nyanyi, Selemadeg — is where savvy early investors are moving as Canggu saturates. Still rural, still affordable, but infrastructure is catching up fast and the first wave of boutique hotels is already open.'),
      bestFor: [t('Early-stage investors'), t('High-appreciation seekers'), t('Land buyers')],
      pros: [t('Cheapest land on the island'), t('Highest projected appreciation'), t('Ocean-view parcels still available'), t('Uncrowded beaches')],
      cons: [t('Infrastructure still developing'), t('Lower current rental demand'), t('Longer drive to amenities')],
      subAreas: ['Nyanyi', 'Tanah Lot', 'Selemadeg', 'Balian']
    },
  ]

  const comparison = [
    { metric: t('Highest Yield'), area: 'Canggu', value: '14–18%' },
    { metric: t('Fastest Appreciation'), area: 'Uluwatu', value: '15–20% / yr' },
    { metric: t('Lowest Entry Price'), area: 'Tabanan', value: t('From IDR 1B') },
    { metric: t('Most Stable'), area: 'Sanur', value: t('10+ yr track record') },
    { metric: t('Best for Long Stays'), area: 'Ubud', value: t('7–14 day avg') },
    { metric: t('Closest to Airport'), area: 'Jimbaran', value: t('10 min drive') },
  ]

  const decisionSteps = [
    { step: '01', title: t('Identify Your Priority'), desc: t('Are you optimizing for cash yield, capital appreciation, lifestyle, or a balance? Your answer narrows the shortlist to 2–3 areas immediately.') },
    { step: '02', title: t('Match Guest Profile to Area'), desc: t('Each area attracts a distinct guest. Surfers and nomads fill Canggu. Luxury travelers fill Seminyak and Uluwatu. Wellness seekers fill Ubud. Match your target guest to the right neighborhood.') },
    { step: '03', title: t('Check Sub-Area Micro-Markets'), desc: t('Within every area there are premium and secondary pockets. Berawa vs Pererenan in Canggu, Bingin vs Pecatu in Uluwatu — the price and yield differences can be 30%+.') },
    { step: '04', title: t('Verify Zoning & Licensing'), desc: t('Not every plot in a popular area is zoned for tourism rental (Pondok Wisata / villa permits). Always verify before committing — zoning trumps location.') },
    { step: '05', title: t('Stress-Test the Numbers'), desc: t('Ask for conservative rental projections — 60% occupancy, not 85%. If the deal still works at the conservative number, you have a winner.') },
  ]

  const faqs = [
    { q: t('Which area has the highest rental yield?'), a: t('Canggu currently leads with gross yields of 14–18% for well-located, well-managed properties. Uluwatu follows at 13–17%. Yields in both areas are driven by strong short-term rental demand from digital nomads, surfers, and luxury travelers respectively. Note that "gross yield" excludes management fees (15–25%), which brings net yield to roughly 60–70% of gross.') },
    { q: t('Which area has the best capital appreciation?'), a: t('Uluwatu and the Bukit Peninsula have appreciated 15–20% per year over the past 5 years, driven by limited land supply and booming luxury demand. Emerging west-coast areas (Tabanan, Nyanyi) are projected to outperform in the coming 5 years as infrastructure catches up. Canggu appreciation has slowed to 12–15% as the market matures.') },
    { q: t('Is Canggu over-saturated?'), a: t('Core Canggu (Batu Bolong, central Berawa) is maturing — land prices have tripled in 5 years and competition is fierce. However, adjacent zones like Pererenan, Nyanyi, and Seseh still offer strong value with the same guest demand spilling over. The "Canggu area" is expanding northwest, not saturating.') },
    { q: t('Where should a first-time Bali investor buy?'), a: t('For a first purchase, we usually recommend Canggu (proven demand, easiest to rent), Sanur (most stable, lowest risk), or Jimbaran (balanced yield and lifestyle). Avoid emerging markets like deep west coast for your first investment unless you have strong local support — infrastructure risk is real.') },
    { q: t('How close to the beach does my villa need to be?'), a: t('Counter-intuitively, being ON the beach is often worse than being 5–10 minutes away. Beachfront commands premium rates but has strict zoning, higher maintenance (salt damage), and limited guest parking. Most top-performing villas are 500m–2km from the beach in quiet residential pockets.') },
    { q: t('What about Nusa Lembongan / Nusa Penida?'), a: t('The Nusa islands are a different market — smaller, more seasonal, and with unique logistics challenges (water, power, transport). Yields can be excellent (15%+) but liquidity is lower if you need to sell. Only recommended for experienced Bali investors or those with a specific lifestyle reason to be there.') },
  ]

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>

      {/* HERO */}
      <div style={{ paddingTop: '64px' }}>
        <div style={{ position: 'relative', height: 'clamp(320px, 50vw, 540px)', overflow: 'hidden' }}>
          <img
            src="https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800&q=80"
            alt="Best areas to buy in Bali"
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
              {t('Best Areas to Buy in Bali')}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', lineHeight: 1.6 }}>
              {t("A neighborhood-by-neighborhood breakdown of Bali's seven most investable areas — yields, prices, guest profiles, and the trade-offs that never make it into glossy brochures.")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Location First')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.3 }}>
            {t("In Bali, location isn't one factor — it's most of them")}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.9 }}>
            {t("Two identical villas, 15 minutes apart, can produce 40% different annual returns. Each area attracts a distinct guest profile, commands its own nightly rate band, and has its own appreciation trajectory. Choosing the right area is the single highest-leverage decision you'll make as a Bali investor.")}
          </motion.p>
        </motion.div>
      </div>

      {/* QUICK COMPARISON */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Quick Comparison')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('Which area wins what?')}
            </motion.h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '16px' }}>
              {comparison.map(c => (
                <motion.div key={c.metric} variants={fadeUp}
                  style={{ backgroundColor: 'white', padding: '24px', border: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px' }}>{c.metric}</p>
                  <p style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px' }}>{c.area}</p>
                  <p style={{ fontSize: '13px', color: '#6b7280' }}>{c.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* AREA DEEP DIVES */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Area Breakdowns')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '12px' }}>
            {t('Seven areas, seven strategies')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#6b7280', marginBottom: '48px', maxWidth: '640px', lineHeight: 1.7 }}>
            {t('There is no single "best" area — only the best area for your specific investment goals and guest profile.')}
          </motion.p>
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
          {areas.map((a, i) => (
            <motion.div key={a.name}
              variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start', borderTop: i > 0 ? '1px solid #f3f4f6' : 'none', paddingTop: i > 0 ? '48px' : 0 }}>

              {/* Image + meta */}
              <div>
                <div style={{ position: 'relative', height: 'clamp(220px, 30vw, 320px)', overflow: 'hidden', marginBottom: '16px' }}>
                  <img src={a.img} alt={a.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                  <div style={{ position: 'absolute', top: '12px', left: '12px', backgroundColor: 'black', color: 'white', fontSize: '11px', fontWeight: 600, padding: '4px 10px' }}>
                    {a.type}
                  </div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
                  <div style={{ border: '1px solid #e5e7eb', padding: '14px' }}>
                    <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{t('Gross Yield')}</p>
                    <p style={{ fontSize: '16px', fontWeight: 700 }}>{a.yield}</p>
                  </div>
                  <div style={{ border: '1px solid #e5e7eb', padding: '14px' }}>
                    <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{t('Appreciation')}</p>
                    <p style={{ fontSize: '16px', fontWeight: 700 }}>{a.appreciation}</p>
                  </div>
                  <div style={{ border: '1px solid #e5e7eb', padding: '14px' }}>
                    <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{t('Price Range')}</p>
                    <p style={{ fontSize: '15px', fontWeight: 700 }}>{a.price}</p>
                  </div>
                  <div style={{ border: '1px solid #e5e7eb', padding: '14px' }}>
                    <p style={{ fontSize: '10px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '4px' }}>{t('Occupancy')}</p>
                    <p style={{ fontSize: '16px', fontWeight: 700 }}>{a.occupancy}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div>
                <p style={{ fontSize: '11px', letterSpacing: '2px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '8px' }}>{a.tagline}</p>
                <h3 style={{ fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 300, marginBottom: '16px' }}>
                  <strong>{a.name}</strong>
                </h3>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9, marginBottom: '24px' }}>{a.desc}</p>

                <div style={{ marginBottom: '20px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{t('Best For')}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                    {a.bestFor.map(b => (
                      <span key={b} style={{ fontSize: '12px', padding: '4px 10px', border: '1px solid #e5e7eb', color: '#4b5563' }}>{b}</span>
                    ))}
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#059669', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', fontWeight: 600 }}>{t('Pros')}</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>
                      {a.pros.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px', fontWeight: 600 }}>{t('Trade-offs')}</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>
                      {a.cons.map(c => <li key={c}>{c}</li>)}
                    </ul>
                  </div>
                </div>

                <div style={{ marginBottom: '24px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '8px' }}>{t('Sub-Areas to Know')}</p>
                  <p style={{ fontSize: '13px', color: '#4b5563', lineHeight: 1.7 }}>{a.subAreas.join(' · ')}</p>
                </div>

                <a href={'/properties?location=' + encodeURIComponent(a.name)}
                  style={{ fontSize: '13px', border: '1px solid black', padding: '10px 20px', textDecoration: 'none', color: 'black', display: 'inline-block', fontWeight: 500 }}>
                  {t('View {name} listings →').replace('{name}', a.name)}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* DECISION FRAMEWORK */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('How to Choose')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('A 5-step decision framework')}
            </motion.h2>
            <div>
              {decisionSteps.map((s, i) => (
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
            {t('Area-specific questions')}
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
                { title: t('Why Invest in Bali'), desc: t('The case for Bali real estate'), href: '/guide', img: 'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=400&q=80' },
                { title: t('Leasehold vs Freehold'), desc: t('Understanding ownership structures in Bali'), href: '/guide/ownership', img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&q=80' },
                { title: t('Legal Process Guide'), desc: t('Step-by-step through the notary process'), href: '/guide/legal', img: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&q=80' },
                { title: t('ROI & Rental Yields'), desc: t('How to calculate your real returns'), href: '/guide/roi', img: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&q=80' },
              ].map(g => (
                <motion.a key={g.title} variants={fadeUp} href={g.href}
                  style={{ textDecoration: 'none', color: 'black', border: '1px solid #e5e7eb', overflow: 'hidden', backgroundColor: 'white', display: 'block' }}>
                  <div style={{ height: '140px', overflow: 'hidden' }}>
                    <img src={g.img} alt={g.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
            {t('Not Sure Which Area?')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            {t("Let's find the area that fits you")}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            {t("Share your goals and budget — we'll recommend the 2–3 areas that best match your profile, with real listings to compare.")}
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://wa.me/${SITE_WA}`} target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: 'white', color: 'black', fontSize: '14px', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}>
              {t('Contact an Expert')}
            </a>
            <a href="/properties"
              style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '14px', padding: '14px 32px', textDecoration: 'none' }}>
              {t('Explore Listings')}
            </a>
          </motion.div>
        </motion.div>
      </div>


    </main>
  )
}
