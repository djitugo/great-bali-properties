'use client'
import { motion } from 'framer-motion'
import { useT } from '../lib/i18n'
import { SITE_WA } from '../lib/site'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const locations = [
  'Canggu', 'Seminyak', 'Ubud', 'Jimbaran',
  'Uluwatu', 'Sanur', 'Pererenan', 'Kerobokan',
]

export default function AboutPage() {
  const t = useT()

  const stats = [
    { number: '50+', label: t('Properties Listed') },
    { number: '10+', label: t('Years Experience') },
    { number: '1000+', label: t('Villas Managed') },
    { number: '100%', label: t('Trusted Service') },
  ]

  const values = [
    {
      title: t('Transparency First'),
      desc: t('No hidden fees, no inflated listings. Every property is priced fairly and all legal details are disclosed upfront. We believe informed buyers make the best decisions.')
    },
    {
      title: t('Local Expertise'),
      desc: t('Our team lives and works in Bali. We know every neighborhood, every regulation, and every opportunity — giving you an insider advantage in a complex market.')
    },
    {
      title: t('End-to-End Support'),
      desc: t('From first inquiry to notary signing, we guide you through every step. Legal assistance, property management, and after-sale support are all part of what we offer.')
    },
    {
      title: t('Curated Quality'),
      desc: t("We don't list everything — only properties we've personally vetted. Each listing meets our standards for legal compliance, condition, and investment potential.")
    },
    {
      title: t('Investor Focused'),
      desc: t("Whether you're buying your first holiday villa or building a portfolio, we tailor our guidance to your goals — lifestyle, yield, or long-term appreciation.")
    },
    {
      title: t('Trusted Partnership'),
      desc: t("As a partner of Great Bali Villas, one of Bali's leading villa management companies, we offer unmatched continuity from purchase to profitable operation.")
    },
  ]

  const team = [
    {
      name: 'Aditya Pratama',
      role: t('Founder & Property Director'),
      desc: t("Born and raised in Bali, Aditya has spent over a decade navigating the island's real estate market, helping hundreds of investors find and grow their property portfolios."),
      img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&q=80'
    },
    {
      name: 'Sarah Mitchell',
      role: t('International Sales Manager'),
      desc: t('With a background in luxury real estate across Asia-Pacific, Sarah specializes in connecting international buyers with the right Bali properties for their lifestyle and investment needs.'),
      img: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&q=80'
    },
    {
      name: 'Wayan Suartama',
      role: t('Legal & Notary Liaison'),
      desc: t('Wayan ensures every transaction is legally sound. His deep understanding of Indonesian property law protects buyers and sellers alike throughout the purchase process.'),
      img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80'
    },
  ]

  const whyItems = [
    { title: t('Partner of Great Bali Villas'), desc: t('Strategic partnership with Great Bali Villas, providing a foundation of 10+ years of expertise and access to a vast rental network of 1,000+ villas across Bali.') },
    { title: t('Full Legal Support'), desc: t('In-house legal guidance covering leasehold, freehold, notary processes, and foreign ownership structures.') },
    { title: t('Post-Purchase Management'), desc: t('Comprehensive management from legal finalization to active rental. We handle 50+ properties directly, overseeing ROI optimization and property registration on global rental platforms.') },
    { title: t('Honest Market Valuations'), desc: t('Tailored Investment Guidance. Whether for lifestyle or yield, we provide data-driven insights to ensure your property achieves maximum capital appreciation and rental performance.') },
  ]

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
              {t('About Us')}
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              {t("Bali's Trusted")}<br /><strong>{t('Property Partner')}</strong>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '520px', lineHeight: 1.6 }}>
              {t('A curated real estate agency dedicated to helping investors and dreamers find their perfect piece of Bali.')}
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
              {t('Our Story')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 300, marginBottom: '8px', lineHeight: 1.2 }}>
              {t('Elevating Bali Real Estate:')}
            </motion.h2>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(22px, 3.5vw, 34px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.2 }}>
              <strong>{t('Our Journey and Commitment')}</strong>
            </motion.h2>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '2px', color: '#111827', textTransform: 'uppercase', fontWeight: 600, marginBottom: '14px' }}>
              {t('Our Story: Born from a Passion for Bali')}
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9, marginBottom: '20px' }}>
              {t('Great Bali Properties was founded on a singular, powerful conviction: buying property in Bali should be an inspiring and seamless journey, not a source of stress. Having witnessed many investors struggle with complex legalities, misleading listings, and lack of accountability, we set out to build something fundamentally different.')}
            </motion.p>
            <motion.p variants={fadeUp} style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9 }}>
              {t("We established a real estate agency rooted in transparency, profound local knowledge, and a genuine commitment to our clients' success. As a proud partner of Great Bali Villas — one of the island's most respected villa management companies — we bring over a decade of on-the-ground expertise to every transaction. Today, we serve a global community of buyers and investors, helping them navigate the Indonesian property market with absolute confidence — from the first inquiry to the final handover and beyond.")}
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
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '4px' }}>{t('Years in Bali')}</p>
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
              {t('What We Stand For')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '48px', lineHeight: 1.2 }}>
              {t('Our')} <strong>{t('Values')}</strong>
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
            {t('The People Behind It')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '48px', lineHeight: 1.2 }}>
            {t('Meet the')} <strong>{t('Team')}</strong>
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
              {t('Where We Operate')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '32px' }}>
              {t('Our')} <strong>{t('Locations')}</strong>
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
              {t('Why Partner With Us?')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 300, marginBottom: '32px', lineHeight: 1.2 }}>
              {t('The')} <strong>Great Bali Properties</strong> {t('difference')}
            </motion.h2>
            {whyItems.map((item, i) => (
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
            {t('Ready to Invest?')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            {t("Let's secure your next")}<br /><strong>{t('Bali investment')}</strong>
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            {t('Our expert team is available 7 days a week. Connect with us on WhatsApp for a private consultation and market insights.')}
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
