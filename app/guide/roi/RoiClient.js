'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useT, useLang } from '../../lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

// Konten per-bahasa. Angka dan nama area disimpan seragam di dua bahasa supaya enak dibandingin.
const content = {
  en: {
    exampleRows: [
      { label: 'Villa purchase (Canggu, 3BR leasehold, 25 yrs)', value: 'USD 450,000', note: 'One-off' },
      { label: 'Setup + furnishing', value: 'USD 45,000', note: 'One-off' },
      { label: 'Total capital deployed', value: 'USD 495,000', note: '', bold: true },
      { label: 'Gross revenue (65% occupancy × $350 ADR × 365)', value: 'USD 83,100', note: 'Year 1', positive: true },
      { label: 'Platform commission (Airbnb/Booking ~15%)', value: '– USD 12,465', note: '' },
      { label: 'Villa management (20% of net rev)', value: '– USD 14,127', note: '' },
      { label: 'Utilities, pool, garden, internet', value: '– USD 6,000', note: '' },
      { label: 'Maintenance + repairs', value: '– USD 3,500', note: '' },
      { label: 'Property/tourism tax (~10% of rev)', value: '– USD 8,310', note: '' },
      { label: 'Insurance + misc', value: '– USD 1,800', note: '' },
      { label: 'Net operating income (Year 1)', value: 'USD 36,898', note: '', bold: true, positive: true },
      { label: 'Net yield on capital', value: '7.45%', note: 'Per year', bold: true, positive: true },
    ],
    metrics: [
      { name: 'ADR (Average Daily Rate)', desc: 'The average price per night across the year. Canggu 3BRs typically earn $280–420 depending on finish, pool, view, and walk-to-beach.' },
      { name: 'Occupancy rate', desc: 'Percentage of nights booked. Good Canggu villas hit 60–75% annually. Lower is fine if ADR is high; under 50% suggests pricing or positioning issues.' },
      { name: 'RevPAR (Revenue per available night)', desc: 'ADR × occupancy. The single most useful pricing metric — a $350 ADR at 70% beats a $450 ADR at 50%.' },
      { name: 'Net yield', desc: 'Net operating income ÷ total capital deployed. Realistic Bali net yields are 5–9% on leasehold villas, 3–6% on freehold (freehold ties up more capital).' },
      { name: 'Cash-on-cash return', desc: 'If you financed any portion, cash-on-cash is net cash ÷ actual cash you put in. Most Bali deals are all-cash, so it equals net yield.' },
      { name: 'Appreciation', desc: 'Capital growth over time. Canggu land has averaged 10–15% yoy over the last 5 years. Resale value includes land + structure + any remaining leasehold years.' },
    ],
    pricingRows: [
      { tier: 'Budget 3BR — older build, 5 min ride to beach', adr: 'USD 180–240', occ: '55–65%', gross: 'USD 41k–57k' },
      { tier: 'Mid 3BR — modern, private pool, 5–10 min walk', adr: 'USD 280–380', occ: '60–72%', gross: 'USD 61k–99k' },
      { tier: 'Premium 3BR — designer, view or beachwalk', adr: 'USD 400–550', occ: '65–78%', gross: 'USD 95k–157k' },
      { tier: 'Luxury 4BR+ — estate, boutique operator', adr: 'USD 650–1,200', occ: '55–70%', gross: 'USD 130k–306k' },
    ],
    scenarios: [
      { title: 'Base case — steady state', desc: 'Your realistic projection with current ADR, current occupancy, current costs. Most projections you see are already this — or slightly optimistic.' },
      { title: 'Soft market — –20% revenue', desc: 'Occupancy drops to 52%, ADR softens 10%. Does the villa still cover its operating costs and debt service? Any healthy Bali investment should survive this.' },
      { title: 'COVID-level disruption — 6 months at 15% occupancy', desc: 'The stress test every Bali villa should survive. Model at least 4 months of fixed costs with minimal revenue. Your net annual result will go negative — that is fine, the question is whether you can fund the shortfall.' },
      { title: 'Management fee creep — +5% costs', desc: 'Managers renegotiate or quality drops and you change vendor mid-year. Add 5% on top of your baseline operating costs and recheck your net yield.' },
      { title: 'Exit at year 10 — leasehold depreciation', desc: 'A 25-year leasehold at year 10 has 15 years of use remaining. Expect resale value at roughly 50–65% of your original entry price (before any appreciation). Factor this into your total return, not just annual yield.' },
    ],
    faqs: [
      { q: 'What\'s a realistic net yield for a Bali villa?', a: '5–8% net per year is realistic for a well-run leasehold villa in Canggu, Ubud, or Uluwatu. Anything over 10% net either comes from (a) truly exceptional locations + operations, or (b) a projection that has understated costs. Always demand the full cost breakdown, not just the top-line gross yield number.' },
      { q: 'Gross yield vs net yield — why the difference?', a: 'Gross yield is annual revenue ÷ purchase price. Net yield subtracts the real costs of running the villa: management (15–25%), platform fees (12–18%), taxes (~10%), utilities, maintenance, insurance, and vacancy. In Bali, net is typically 40–55% of gross. Any agent quoting "20% yield" without specifying gross vs net is giving you a marketing number, not an investment number.' },
      { q: 'How much should I budget for villa management?', a: '15–25% of gross revenue for full-service management (guest communications, cleaning, maintenance coordination, marketing, price optimization). The cheapest option at 10% usually costs you more in lost revenue than a 20% manager who actually optimizes your listing and handles problems fast.' },
      { q: 'What occupancy should I assume?', a: 'For conservative projections: 60% in primary areas (Canggu, Seminyak, Ubud center), 55% in emerging areas (Pererenan, Nyanyi), 50% in quieter spots (Sanur, Sidemen). Ask the seller for actual booking data, not estimates. If they cannot or will not provide it, assume lower.' },
      { q: 'Does rental income get taxed in Indonesia?', a: 'Yes. Rental income from Indonesian property is taxed. For most individual owners, a final tax of 10% on gross rental revenue applies (PPh 4 ayat 2 — final income tax). PT PMA structures are taxed differently (corporate income tax on net profit). Always model taxes into your net yield calculation, not as an afterthought.' },
      { q: 'How do appreciation and yield combine in total return?', a: 'Total return = annual yield + annual appreciation. A 7% net yield plus 10% appreciation = 17% total return per year. But appreciation is only realized at sale and depends on the remaining leasehold years. For a full picture, model both cash returns during hold and capital returns at exit.' },
    ],
    cta: { title: 'Get a real projection for a real villa', desc: 'Send us a property you\'re considering and we\'ll run the full numbers for you — conservative, realistic, and transparent. No inflated projections.' },
  },
  id: {
    exampleRows: [
      { label: 'Harga beli villa (Canggu, 3BR leasehold, 25 thn)', value: 'USD 450,000', note: 'Sekali bayar' },
      { label: 'Setup + furniture', value: 'USD 45,000', note: 'Sekali bayar' },
      { label: 'Total modal yang dikeluarkan', value: 'USD 495,000', note: '', bold: true },
      { label: 'Revenue kotor (occupancy 65% × ADR $350 × 365)', value: 'USD 83,100', note: 'Tahun 1', positive: true },
      { label: 'Komisi platform (Airbnb/Booking ~15%)', value: '– USD 12,465', note: '' },
      { label: 'Villa management (20% dari net rev)', value: '– USD 14,127', note: '' },
      { label: 'Listrik, kolam, taman, internet', value: '– USD 6,000', note: '' },
      { label: 'Maintenance + perbaikan', value: '– USD 3,500', note: '' },
      { label: 'Pajak properti/turis (~10% dari rev)', value: '– USD 8,310', note: '' },
      { label: 'Asuransi + lain-lain', value: '– USD 1,800', note: '' },
      { label: 'Net operating income (Tahun 1)', value: 'USD 36,898', note: '', bold: true, positive: true },
      { label: 'Net yield atas modal', value: '7.45%', note: 'Per tahun', bold: true, positive: true },
    ],
    metrics: [
      { name: 'ADR (Rata-rata Tarif Harian)', desc: 'Rata-rata harga per malam sepanjang tahun. Villa 3BR di Canggu biasanya dapet $280–420 tergantung finishing, kolam, view, dan jarak ke pantai.' },
      { name: 'Occupancy rate', desc: 'Persentase malam yang dibook. Villa Canggu yang bagus biasanya 60–75% setahun. Lebih rendah nggak apa-apa kalau ADR tinggi; di bawah 50% tanda ada masalah pricing atau positioning.' },
      { name: 'RevPAR (Revenue per malam tersedia)', desc: 'ADR × occupancy. Metrik pricing paling berguna — ADR $350 dengan occupancy 70% menang dari ADR $450 dengan occupancy 50%.' },
      { name: 'Net yield', desc: 'Net operating income ÷ total modal. Net yield realistis di Bali: 5–9% untuk villa leasehold, 3–6% untuk freehold (freehold butuh modal lebih banyak).' },
      { name: 'Cash-on-cash return', desc: 'Kalau sebagian dibiayai pinjaman, cash-on-cash = cash bersih ÷ cash yang beneran kamu keluarin. Transaksi Bali kebanyakan cash penuh, jadi sama dengan net yield.' },
      { name: 'Apresiasi', desc: 'Pertumbuhan capital seiring waktu. Tanah Canggu rata-rata naik 10–15% per tahun selama 5 tahun terakhir. Nilai jual kembali mencakup tanah + bangunan + sisa tahun leasehold.' },
    ],
    pricingRows: [
      { tier: 'Budget 3BR — bangunan lama, 5 menit naik motor ke pantai', adr: 'USD 180–240', occ: '55–65%', gross: 'USD 41k–57k' },
      { tier: 'Mid 3BR — modern, kolam pribadi, 5–10 menit jalan', adr: 'USD 280–380', occ: '60–72%', gross: 'USD 61k–99k' },
      { tier: 'Premium 3BR — designer, view atau dekat beachwalk', adr: 'USD 400–550', occ: '65–78%', gross: 'USD 95k–157k' },
      { tier: 'Luxury 4BR+ — estate, operator butik', adr: 'USD 650–1,200', occ: '55–70%', gross: 'USD 130k–306k' },
    ],
    scenarios: [
      { title: 'Base case — kondisi stabil', desc: 'Proyeksi realistis dengan ADR saat ini, occupancy saat ini, cost saat ini. Mayoritas proyeksi yang kamu lihat biasanya udah ini — atau sedikit optimis.' },
      { title: 'Pasar melemah — revenue turun 20%', desc: 'Occupancy turun ke 52%, ADR melunak 10%. Villa-nya masih bisa cover biaya operasional dan cicilan? Setiap investasi Bali yang sehat harus lolos skenario ini.' },
      { title: 'Disrupsi level COVID — 6 bulan di occupancy 15%', desc: 'Stress test yang harus lolos setiap villa Bali. Model minimal 4 bulan fixed cost dengan revenue minimal. Hasil tahunan bakal minus — itu nggak apa-apa, pertanyaannya kamu bisa nombokin nggak.' },
      { title: 'Biaya management membengkak — +5% cost', desc: 'Manager renegotiate atau kualitas turun dan kamu ganti vendor di tengah tahun. Tambah 5% di atas baseline cost dan recheck net yield-nya.' },
      { title: 'Exit tahun ke-10 — depresiasi leasehold', desc: 'Leasehold 25 tahun di tahun ke-10 punya sisa 15 tahun pakai. Ekspektasi nilai jual kembali sekitar 50–65% dari harga beli awal (sebelum apresiasi). Masukin ini ke total return, bukan cuma yield tahunan.' },
    ],
    faqs: [
      { q: 'Net yield realistis untuk villa Bali berapa?', a: '5–8% net per tahun itu realistis buat villa leasehold yang dikelola dengan baik di Canggu, Ubud, atau Uluwatu. Angka di atas 10% net biasanya datang dari (a) lokasi dan operasi yang benar-benar istimewa, atau (b) proyeksi yang under-estimate biaya. Selalu minta breakdown biaya lengkap, bukan cuma headline gross yield.' },
      { q: 'Gross yield vs net yield — bedanya apa?', a: 'Gross yield = revenue tahunan ÷ harga beli. Net yield dikurangi biaya riil operasional villa: management (15–25%), komisi platform (12–18%), pajak (~10%), utilitas, maintenance, asuransi, dan vacancy. Di Bali, net biasanya 40–55% dari gross. Agen yang quote "yield 20%" tanpa spesifik gross atau net itu ngasih kamu angka marketing, bukan angka investasi.' },
      { q: 'Budget buat villa management berapa?', a: '15–25% dari gross revenue untuk full-service management (komunikasi tamu, cleaning, koordinasi maintenance, marketing, optimasi harga). Opsi termurah di 10% biasanya lebih bikin rugi karena revenue yang hilang dibanding manager 20% yang beneran optimasiin listing dan handle masalah cepat.' },
      { q: 'Asumsi occupancy yang wajar berapa?', a: 'Untuk proyeksi konservatif: 60% di area utama (Canggu, Seminyak, Ubud tengah), 55% di area berkembang (Pererenan, Nyanyi), 50% di area lebih sepi (Sanur, Sidemen). Minta data booking riil ke penjual, bukan estimasi. Kalau dia nggak bisa atau nggak mau kasih, asumsikan lebih rendah.' },
      { q: 'Pendapatan sewa di Indonesia kena pajak?', a: 'Ya. Pendapatan sewa dari properti Indonesia kena pajak. Untuk mayoritas pemilik individu, berlaku pajak final 10% dari gross rental revenue (PPh Pasal 4 ayat 2 — pajak penghasilan final). Struktur PT PMA pajaknya beda (pajak penghasilan badan atas laba bersih). Selalu masukin pajak ke perhitungan net yield, jangan sebagai afterthought.' },
      { q: 'Apresiasi dan yield digabung jadi total return gimana?', a: 'Total return = yield tahunan + apresiasi tahunan. Net yield 7% + apresiasi 10% = total return 17% per tahun. Tapi apresiasi cuma terealisasi saat dijual dan tergantung sisa tahun leasehold. Untuk gambaran lengkap, model cash return selama hold dan capital return saat exit.' },
    ],
    cta: { title: 'Dapatkan proyeksi riil untuk villa riil', desc: 'Kirim properti yang lagi kamu pertimbangkan, kami akan hitungkan angkanya — konservatif, realistis, dan transparan. Nggak pakai proyeksi yang dibesar-besarkan.' },
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

export default function RoiClient() {
  const t = useT()
  const { lang } = useLang()
  const c = content[lang] || content.en

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>
      {/* HERO */}
      <div style={{ paddingTop: '64px' }}>
        <div style={{ position: 'relative', height: 'clamp(320px, 50vw, 540px)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1800&q=80" alt="Bali ROI"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Bali Guide')}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              {lang === 'id' ? <>Yield Sewa & <strong>ROI di Bali</strong></> : <>Rental Yields & <strong>ROI in Bali</strong></>}
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', lineHeight: 1.6 }}>
              {t('An honest guide to calculating real returns on a Bali villa — gross vs net yield, appreciation, occupancy assumptions, and how to stress-test any investment projection before you commit.')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('The Real Numbers')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.3 }}>
            {t('Not every projection tells the full story')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.9 }}>
            {t("Brochures love to quote \"up to 20% gross yield\" — but gross yield is only part of the picture. Once you subtract management fees, maintenance, taxes, platform commissions, and vacancy, your actual cash-in-pocket can be 40–50% lower than the headline number. This guide shows you how to calculate the numbers that actually matter.")}
          </motion.p>
        </motion.div>
      </div>

      {/* EXAMPLE CALCULATION TABLE */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Example Calculation')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '40px' }}>
              {t('A real Canggu villa — from gross revenue to net cash')}
            </motion.h2>
            <motion.div variants={fadeUp} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr', backgroundColor: 'black', color: 'white' }}>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{lang === 'id' ? 'Item' : 'Item'}</div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, textAlign: 'right', borderLeft: '1px solid rgba(255,255,255,0.1)' }}>{lang === 'id' ? 'Jumlah' : 'Amount'}</div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>{lang === 'id' ? 'Catatan' : 'Note'}</div>
              </div>
              {c.exampleRows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr', borderTop: '1px solid #f3f4f6', backgroundColor: row.bold ? '#f9fafb' : 'white' }}>
                  <div style={{ padding: '12px 16px', fontSize: '13px', color: row.bold ? 'black' : '#4b5563', fontWeight: row.bold ? 700 : 500 }}>{row.label}</div>
                  <div style={{ padding: '12px 16px', fontSize: '13px', color: row.positive ? '#059669' : row.value.startsWith('–') ? '#dc2626' : 'black', borderLeft: '1px solid #f3f4f6', textAlign: 'right', fontWeight: row.bold ? 700 : 500 }}>{row.value}</div>
                  <div style={{ padding: '12px 16px', fontSize: '12px', color: '#9ca3af', borderLeft: '1px solid #f3f4f6' }}>{row.note}</div>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: '12px', color: '#9ca3af', marginTop: '16px', fontStyle: 'italic', lineHeight: 1.7 }}>
              {lang === 'id'
                ? 'Contoh ini pakai asumsi konservatif khas Canggu di tahun 2025. Angka real kamu akan bervariasi berdasarkan manager, strategi pricing, dan musim. Ekspektasikan variance ±20%.'
                : 'This example uses conservative Canggu 2025 assumptions. Your actual numbers will vary based on manager, pricing strategy, and season. Expect ±20% variance.'}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* KEY METRICS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Key Metrics')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('The numbers that actually predict returns')}
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {c.metrics.map((m, i) => (
              <motion.div key={m.name} variants={fadeUp}
                style={{ border: '1px solid #e5e7eb', padding: 'clamp(20px, 3vw, 28px)', backgroundColor: 'white' }}>
                <p style={{ fontSize: '11px', color: '#9ca3af', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '8px' }}>{String(i + 1).padStart(2, '0')}</p>
                <h3 style={{ fontSize: '17px', fontWeight: 600, marginBottom: '12px', color: 'black' }}>{m.name}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{m.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* OCCUPANCY & RATES */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Occupancy & Rates')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '40px' }}>
              {t('How pricing strategy changes everything')}
            </motion.h2>
            <motion.div variants={fadeUp} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 1.2fr', backgroundColor: 'black', color: 'white' }}>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600 }}>{lang === 'id' ? 'Tier Villa' : 'Villa Tier'}</div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>ADR</div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>Occ.</div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>{lang === 'id' ? 'Gross/thn' : 'Gross/yr'}</div>
              </div>
              {c.pricingRows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 0.8fr 1.2fr', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: 'black', fontWeight: 500 }}>{row.tier}</div>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: '#4b5563', borderLeft: '1px solid #f3f4f6' }}>{row.adr}</div>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: '#4b5563', borderLeft: '1px solid #f3f4f6' }}>{row.occ}</div>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: 'black', fontWeight: 600, borderLeft: '1px solid #f3f4f6' }}>{row.gross}</div>
                </div>
              ))}
            </motion.div>
            <motion.p variants={fadeUp} style={{ fontSize: '12px', color: '#9ca3af', marginTop: '16px', fontStyle: 'italic', lineHeight: 1.7 }}>
              {lang === 'id'
                ? 'Angka Canggu 2025. Area lain (Seminyak, Ubud, Uluwatu) punya struktur ADR yang beda. Selalu benchmark ke 5–10 villa sejenis di micro-area yang sama sebelum nge-price.'
                : '2025 Canggu figures. Other areas (Seminyak, Ubud, Uluwatu) have different ADR structures. Always benchmark against 5–10 comparable villas in the same micro-area before pricing.'}
            </motion.p>
          </motion.div>
        </div>
      </div>

      {/* STRESS TESTING */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Stress Testing')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('5 scenarios every investor should run')}
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {c.scenarios.map((s, i) => (
              <motion.div key={i} variants={fadeUp}
                style={{ border: '1px solid #e5e7eb', padding: 'clamp(20px, 3vw, 28px)', backgroundColor: 'white', display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '20px', alignItems: 'flex-start' }}>
                <div style={{ fontSize: '28px', fontWeight: 300, color: '#d1d5db', lineHeight: 1, minWidth: '40px' }}>{String(i + 1).padStart(2, '0')}</div>
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'black' }}>{s.title}</h3>
                  <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* FAQ */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Common Questions')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('Frequently asked questions')}
            </motion.h2>
            <div>
              {c.faqs.map((f, i) => <FAQItem key={i} q={f.q} a={f.a} />)}
              <div style={{ borderTop: '1px solid #e5e7eb' }} />
            </div>
          </motion.div>
        </div>
      </div>

      {/* CTA */}
      <div style={{ backgroundColor: 'black', color: 'white', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }} style={{ maxWidth: '600px', margin: '0 auto' }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Run Your Numbers')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            {c.cta.title}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            {c.cta.desc}
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://wa.me/6281234567890" target="_blank" rel="noopener noreferrer"
              style={{ backgroundColor: 'white', color: 'black', fontSize: '14px', fontWeight: 600, padding: '14px 32px', textDecoration: 'none' }}>
              {t('WhatsApp Us')}
            </a>
            <a href="/contact" style={{ border: '1px solid rgba(255,255,255,0.3)', color: 'white', fontSize: '14px', padding: '14px 32px', textDecoration: 'none' }}>
              {t('Contact')}
            </a>
          </motion.div>
        </motion.div>
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
