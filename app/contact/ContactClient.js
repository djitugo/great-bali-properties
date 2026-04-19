'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useT, useLang } from '../lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

const content = {
  en: {
    methods: [
      {
        label: 'WhatsApp (Fastest)',
        value: '+62 812-3456-7890',
        sub: 'Usually responds in minutes',
        href: 'https://wa.me/6281234567890',
        external: true,
        icon: '💬',
      },
      {
        label: 'Email',
        value: 'info@greatbaliproperties.com',
        sub: 'Response within 24 hours',
        href: 'mailto:info@greatbaliproperties.com',
        icon: '✉️',
      },
      {
        label: 'Office',
        value: 'Jl. Pantai Batu Bolong No. 88, Canggu, Bali',
        sub: 'Open Monday to Saturday',
        href: 'https://maps.google.com/?q=Jl.+Pantai+Batu+Bolong+Canggu',
        external: true,
        icon: '📍',
      },
    ],
    faqs: [
      { q: 'How fast will you respond?', a: 'WhatsApp within minutes during working hours (9am–7pm Bali time, Mon–Sat). Email within 24 hours, seven days a week. Form submissions get a personal reply — not an auto-responder.' },
      { q: 'Do I need an appointment to visit the office?', a: 'Walk-ins are welcome, but we recommend booking 1–2 hours ahead on WhatsApp. This gives us time to prepare a shortlist of listings that match your brief, saving you a generic tour.' },
      { q: 'Can we do everything remotely if I\'m not in Bali?', a: 'Yes. We regularly handle the full process remotely — video property tours, digital due diligence packs, notary coordination, and escrow setup. Many buyers only travel to Bali for the final signing.' },
      { q: 'Do you charge buyers a fee?', a: 'No. Our commission is paid by the seller on successful completion. Our advice, listings, area briefings, and due diligence coordination are free to you as a buyer. You only pay the standard notary and government fees on completion.' },
      { q: 'What languages does your team speak?', a: 'English, Bahasa Indonesia, and basic Mandarin. Our notary partners work in English and Indonesian with certified translations provided for all contracts.' },
    ],
  },
  id: {
    methods: [
      {
        label: 'WhatsApp (Tercepat)',
        value: '+62 812-3456-7890',
        sub: 'Biasanya balas dalam beberapa menit',
        href: 'https://wa.me/6281234567890',
        external: true,
        icon: '💬',
      },
      {
        label: 'Email',
        value: 'info@greatbaliproperties.com',
        sub: 'Balas dalam 24 jam',
        href: 'mailto:info@greatbaliproperties.com',
        icon: '✉️',
      },
      {
        label: 'Kantor',
        value: 'Jl. Pantai Batu Bolong No. 88, Canggu, Bali',
        sub: 'Buka Senin–Sabtu',
        href: 'https://maps.google.com/?q=Jl.+Pantai+Batu+Bolong+Canggu',
        external: true,
        icon: '📍',
      },
    ],
    faqs: [
      { q: 'Seberapa cepat kalian balas?', a: 'WhatsApp dalam hitungan menit di jam kerja (9 pagi–7 malam waktu Bali, Senin–Sabtu). Email dalam 24 jam, tujuh hari seminggu. Submit form dibalas personal — bukan auto-responder.' },
      { q: 'Perlu appointment buat ke kantor?', a: 'Walk-in boleh, tapi kami sarankan booking 1–2 jam sebelumnya via WhatsApp. Jadi kami punya waktu nyiapin shortlist listing yang match sama brief kamu, nggak sekedar tour generik.' },
      { q: 'Bisa semuanya remote kalau saya belum di Bali?', a: 'Bisa. Kami sering handle proses penuh secara remote — video tour properti, paket due diligence digital, koordinasi notaris, dan setup escrow. Banyak pembeli cuma datang ke Bali pas tanda tangan final.' },
      { q: 'Apakah pembeli kena biaya?', a: 'Nggak. Komisi kami dibayar penjual kalau deal berhasil. Saran, listing, briefing area, dan koordinasi due diligence gratis buat pembeli. Kamu cuma bayar biaya notaris dan pemerintah yang standar saat closing.' },
      { q: 'Tim kalian bahasa apa aja?', a: 'Inggris, Bahasa Indonesia, dan Mandarin dasar. Partner notaris kami kerja dalam Bahasa Inggris dan Indonesia dengan terjemahan bersertifikat untuk semua kontrak.' },
    ],
  },
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
        <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} transition={{ duration: 0.3 }} style={{ overflow: 'hidden' }}>
          <p style={{ fontSize: '14px', color: '#6b7280', lineHeight: 1.9, marginTop: '16px', paddingRight: '32px' }}>{a}</p>
        </motion.div>
      )}
    </div>
  )
}

export default function ContactClient() {
  const t = useT()
  const { lang } = useLang()
  const c = content[lang] || content.en

  const [form, setForm] = useState({ name: '', email: '', phone: '', interest: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    // Build a WhatsApp deep link with prefilled details — no backend needed
    const text = `Halo Great Bali Properties,%0A%0A` +
      `Nama: ${encodeURIComponent(form.name)}%0A` +
      `Email: ${encodeURIComponent(form.email)}%0A` +
      `WA: ${encodeURIComponent(form.phone || '-')}%0A` +
      `Minat: ${encodeURIComponent(form.interest || '-')}%0A%0A` +
      `${encodeURIComponent(form.message || '')}`
    window.open(`https://wa.me/6281234567890?text=${text}`, '_blank')
    setSent(true)
  }

  const inputStyle = {
    width: '100%',
    padding: '14px 16px',
    fontSize: '14px',
    border: '1px solid #e5e7eb',
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 0,
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border 0.2s',
  }
  const labelStyle = { display: 'block', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px', fontWeight: 600 }

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>
      {/* HERO */}
      <div style={{ paddingTop: '64px' }}>
        <div style={{ position: 'relative', height: 'clamp(280px, 42vw, 440px)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1528181304800-259b08848526?w=1800&q=80" alt="Bali Contact"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Contact')}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 64px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              {lang === 'id' ? <>Hubungi <strong>kami</strong></> : <>Get in <strong>touch</strong></>}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', lineHeight: 1.6 }}>
              {t("We're here to help you find the perfect Bali property. Reach out via WhatsApp, email, or the form below — we respond within 24 hours, 7 days a week.")}
            </motion.p>
          </div>
        </div>
      </div>

      {/* CONTACT METHODS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}
          style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          {c.methods.map((m, i) => (
            <motion.a key={i} variants={fadeUp} href={m.href} target={m.external ? '_blank' : undefined} rel={m.external ? 'noopener noreferrer' : undefined}
              style={{ border: '1px solid #e5e7eb', padding: 'clamp(24px, 3vw, 32px)', textDecoration: 'none', color: 'inherit', backgroundColor: 'white', transition: 'all 0.2s', display: 'block' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'black'; e.currentTarget.style.transform = 'translateY(-2px)' }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#e5e7eb'; e.currentTarget.style.transform = 'translateY(0)' }}>
              <div style={{ fontSize: '24px', marginBottom: '16px' }}>{m.icon}</div>
              <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', color: '#9ca3af', marginBottom: '8px', fontWeight: 600 }}>{m.label}</p>
              <p style={{ fontSize: '16px', fontWeight: 500, marginBottom: '6px', color: 'black', lineHeight: 1.4 }}>{m.value}</p>
              <p style={{ fontSize: '12px', color: '#9ca3af' }}>{m.sub}</p>
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* FORM */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '720px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px', textAlign: 'center' }}>
              {t('Send us a message')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '40px', textAlign: 'center', lineHeight: 1.3 }}>
              {lang === 'id' ? 'Ceritain apa yang kamu cari, kami kontak balik' : "Tell us what you're looking for, we'll reach back"}
            </motion.h2>

            {sent ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', padding: '48px 32px', textAlign: 'center' }}>
                <div style={{ fontSize: '48px', marginBottom: '16px' }}>✓</div>
                <h3 style={{ fontSize: '20px', fontWeight: 500, marginBottom: '12px' }}>{t('Thank you! We\'ll reach out within 24 hours.')}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.7 }}>
                  {lang === 'id' ? 'WhatsApp sudah terbuka di tab baru. Kirim pesannya supaya kami bisa langsung respon.' : 'WhatsApp has opened in a new tab. Send the message so we can reply immediately.'}
                </p>
              </motion.div>
            ) : (
              <motion.form variants={fadeUp} onSubmit={handleSubmit}
                style={{ display: 'grid', gap: '20px', backgroundColor: 'white', padding: 'clamp(24px, 4vw, 40px)', border: '1px solid #e5e7eb' }}>
                <div>
                  <label style={labelStyle}>{t('Your name')}</label>
                  <input required type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    style={inputStyle} onFocus={(e) => e.target.style.borderColor = 'black'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                  <div>
                    <label style={labelStyle}>{t('Your email')}</label>
                    <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                      style={inputStyle} onFocus={(e) => e.target.style.borderColor = 'black'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                  <div>
                    <label style={labelStyle}>{t('Your WhatsApp number (optional)')}</label>
                    <input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      style={inputStyle} onFocus={(e) => e.target.style.borderColor = 'black'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
                  </div>
                </div>
                <div>
                  <label style={labelStyle}>{t('What are you looking for?')}</label>
                  <select value={form.interest} onChange={(e) => setForm({ ...form, interest: e.target.value })}
                    style={{ ...inputStyle, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath fill=\'%239ca3af\' d=\'M6 9L1 4h10z\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 16px center', paddingRight: '40px' }}>
                    <option value="">{t('Select an option')}</option>
                    <option value={t('Buying a villa')}>{t('Buying a villa')}</option>
                    <option value={t('Buying land')}>{t('Buying land')}</option>
                    <option value={t('Renting a villa')}>{t('Renting a villa')}</option>
                    <option value={t('General inquiry')}>{t('General inquiry')}</option>
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>{t('Tell us more')}</label>
                  <textarea rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder={t('Any specific requirements? Budget? Preferred area?')}
                    style={{ ...inputStyle, resize: 'vertical', lineHeight: 1.6 }}
                    onFocus={(e) => e.target.style.borderColor = 'black'} onBlur={(e) => e.target.style.borderColor = '#e5e7eb'} />
                </div>
                <button type="submit"
                  style={{ backgroundColor: 'black', color: 'white', fontSize: '14px', fontWeight: 600, padding: '16px 32px', border: 'none', cursor: 'pointer', letterSpacing: '1px', transition: 'transform 0.15s' }}
                  onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-1px)'}
                  onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
                  {t('Send Message')}
                </button>
                <p style={{ fontSize: '11px', color: '#9ca3af', textAlign: 'center', lineHeight: 1.7 }}>
                  {lang === 'id'
                    ? 'Mengirim akan membuka WhatsApp dengan detail kamu sudah terisi — tinggal tekan kirim.'
                    : 'Submitting opens WhatsApp with your details pre-filled — just hit send.'}
                </p>
              </motion.form>
            )}
          </motion.div>
        </div>
      </div>

      {/* MAP + OFFICE INFO */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Find Us')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 300, marginBottom: '32px' }}>
            {lang === 'id' ? 'Kantor kami di Canggu' : 'Our office in Canggu'}
          </motion.h2>
          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <div style={{ border: '1px solid #e5e7eb', overflow: 'hidden', minHeight: '320px', position: 'relative', backgroundColor: '#f9fafb' }}>
              <iframe
                title="Great Bali Properties Office"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3945.5!2d115.1355!3d-8.6502!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOMKwMzknMDAuNyJTIDExNcKwMDgnMDcuOCJF!5e0!3m2!1sen!2sid!4v1700000000000"
                width="100%" height="100%" style={{ border: 0, position: 'absolute', inset: 0 }}
                allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
                  {lang === 'id' ? 'Alamat' : 'Address'}
                </p>
                <p style={{ fontSize: '15px', color: 'black', lineHeight: 1.7 }}>
                  Jl. Pantai Batu Bolong No. 88<br />
                  Canggu, Kuta Utara<br />
                  Badung, Bali 80351
                </p>
              </div>
              <div style={{ marginBottom: '24px' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px', fontWeight: 600 }}>
                  {lang === 'id' ? 'Jam Buka' : 'Hours'}
                </p>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9 }}>
                  {lang === 'id' ? 'Senin–Jumat: 09.00–19.00' : 'Monday–Friday: 9:00am–7:00pm'}<br />
                  {lang === 'id' ? 'Sabtu: 10.00–17.00' : 'Saturday: 10:00am–5:00pm'}<br />
                  {lang === 'id' ? 'Minggu: tutup (WhatsApp tetap aktif)' : 'Sunday: closed (WhatsApp still active)'}
                </p>
              </div>
              <a href="https://maps.google.com/?q=Jl.+Pantai+Batu+Bolong+Canggu" target="_blank" rel="noopener noreferrer"
                style={{ display: 'inline-block', fontSize: '13px', color: 'black', fontWeight: 600, textDecoration: 'none', borderBottom: '1px solid black', paddingBottom: '2px' }}>
                {lang === 'id' ? 'Buka di Google Maps →' : 'Open in Google Maps →'}
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* FAQ */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Frequently Asked')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('Quick answers to common questions')}
            </motion.h2>
            <div>
              {c.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
              <div style={{ borderTop: '1px solid #e5e7eb' }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* FOOTER */}
      <footer style={{ borderTop: '1px solid #f3f4f6', padding: 'clamp(32px, 5vw, 48px) clamp(20px, 5vw, 48px)', backgroundColor: 'white' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '32px' }}>
          <div>
            <p translate="no" style={{ fontWeight: 700, marginBottom: '8px', fontSize: '15px' }}>Great Bali Properties</p>
            <p style={{ fontSize: '13px', color: '#9ca3af', lineHeight: 1.7 }}>{t('Premium villa and land listings across Bali. A proud partner of Great Bali Villas.')}</p>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{t('Bali Guides')}</p>
            {[['Why Invest in Bali', '/guide'], ['Best Areas to Buy', '/guide/areas'], ['Leasehold vs Freehold', '/guide/ownership'], ['Legal Process', '/guide/legal'], ['Rental Yields & ROI', '/guide/roi']].map(([label, href]) => (
              <a key={label} href={href} style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>{t(label)}</a>
            ))}
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{t('Properties')}</p>
            <a href="/properties" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>{t('All Properties')}</a>
            <a href="/properties?type=villa" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>{t('Villas')}</a>
            <a href="/properties?type=land" style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none' }}>{t('Land')}</a>
          </div>
          <div>
            <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '12px' }}>{t('Contact')}</p>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ display: 'block', fontSize: '13px', color: '#6b7280', textDecoration: 'none', marginBottom: '6px' }}>{t('WhatsApp')}</a>
            <p style={{ fontSize: '13px', color: '#6b7280' }}>info@greatbaliproperties.com</p>
          </div>
        </div>
        <div style={{ borderTop: '1px solid #f3f4f6', marginTop: '32px', paddingTop: '20px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#d1d5db' }}>© 2025 <span translate="no">Great Bali Properties</span>. {t('All rights reserved.')}</p>
        </div>
      </footer>
    </main>
  )
}
