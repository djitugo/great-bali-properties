'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useT, useLang } from '../../lib/i18n'

const fadeUp = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0, transition: { duration: 0.6 } } }
const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } }

const content = {
  en: {
    steps: [
      { step: '01', title: 'Initial Offer & LOI', time: '1–3 days', desc: 'Once you find a property, you submit a Letter of Intent (LOI) with your offer price and proposed terms. This is non-binding but signals serious interest and typically locks the property off-market for 7–14 days.' },
      { step: '02', title: 'Notary Introduction', time: '2–5 days', desc: 'You select (or we recommend) a licensed Indonesian notary (PPAT) who will handle the transaction. The notary is neutral — they represent the legality of the transaction, not either party. Expect a preliminary meeting to explain the process.' },
      { step: '03', title: 'Due Diligence', time: '7–14 days', desc: 'The notary verifies: (1) land certificate is valid and unencumbered, (2) seller has legal authority to sell, (3) building permits (PBG/IMB) are current, (4) zoning allows your intended use, (5) no outstanding tax or utility debts. This is the most important stage — never skip it.' },
      { step: '04', title: 'Price Negotiation & Final Offer', time: '3–7 days', desc: 'Based on due diligence findings, you finalize price and terms. Any issues discovered (expired permits, boundary disputes, etc.) can be used to renegotiate or walk away. A deposit (typically 10% of purchase price) is placed in escrow.' },
      { step: '05', title: 'Conditional Sale Agreement (PPJB)', time: '3–5 days', desc: 'The Preliminary Sale and Purchase Agreement is drafted by the notary and signed by both parties. This is legally binding and outlines all terms: price, payment schedule, handover date, conditions precedent, and penalty clauses.' },
      { step: '06', title: 'Final Payment & Tax Clearance', time: '5–10 days', desc: 'Buyer pays remaining balance. Seller pays PPh (income tax, 2.5%), buyer pays BPHTB (acquisition duty, 5%). Both taxes must clear before the title transfer can be recorded. Notary handles submissions.' },
      { step: '07', title: 'Title Transfer (AJB / Lease Registration)', time: '1–2 days', desc: 'For freehold (Indonesian buyers): Akta Jual Beli (deed of sale) is signed at the notary. For leasehold: lease agreement is registered and recorded in the land book. This is the moment ownership/rights legally transfer.' },
      { step: '08', title: 'Handover & Utilities Transfer', time: '1–3 days', desc: 'Keys handed over. Utilities (PLN electricity, PDAM water, internet) are transferred to your name. Final walk-through. Optional: connect with villa management company for ongoing operations.' },
    ],
    documents: [
      { name: 'Land Certificate (Sertifikat)', desc: 'The title document — can be SHM (freehold), HGB (right to build), or Hak Pakai. Check the type, holder name, boundaries, and any annotations on the back. Must match what\'s being sold.' },
      { name: 'Building Permit (PBG / IMB)', desc: 'Proves the structure is legally built. Expired or missing permits can mean demolition risk. Recent (post-2023) permits are called PBG; older ones are IMB.' },
      { name: 'Pondok Wisata License (for tourism rentals)', desc: 'Required if you\'ll operate a short-term rental villa. Verify it exists and is current — without it, Airbnb and similar platforms are operating illegally.' },
      { name: 'Tax Clearance (SPPT PBB)', desc: 'Annual land and building tax receipts. Outstanding tax debts transfer to the new owner. Verify all years are paid.' },
      { name: 'Owner ID (KTP/Passport)', desc: 'For freehold: seller\'s KTP. For leasehold: both parties\' IDs. Notary verifies authenticity against government records.' },
      { name: 'Spouse Consent (if applicable)', desc: 'Indonesian law requires spousal consent for sales. Missing consent makes the transaction voidable later. Notary verifies marital status and obtains consent.' },
    ],
    costs: [
      { item: 'BPHTB (Buyer)', amount: '5% of transaction price', who: 'Buyer', note: 'Acquisition duty — paid to regional government' },
      { item: 'PPh (Seller)', amount: '2.5% of transaction price', who: 'Seller', note: 'Income tax on the sale' },
      { item: 'Notary Fee', amount: '0.5–1% of price', who: 'Usually split 50/50', note: 'Covers drafting, verification, registration' },
      { item: 'Agent Commission', amount: '2–5% of price', who: 'Seller (usually)', note: 'Paid to property agent; shared if dual-agency' },
      { item: 'Due Diligence', amount: 'IDR 5–15M', who: 'Buyer', note: 'Optional but strongly recommended — covers legal deep-dive' },
      { item: 'Title Insurance', amount: '0.3–0.5% of price', who: 'Buyer', note: 'Optional in Indonesia but increasingly common for large deals' },
      { item: 'Annual PBB (Land Tax)', amount: 'IDR 2–10M/year', who: 'Owner (ongoing)', note: 'Very low — based on NJOP (government-assessed value)' },
    ],
    pitfalls: [
      { title: 'Using a notary recommended by the seller only', desc: 'The notary must be neutral. Accepting a seller-recommended notary without independent verification creates conflict-of-interest risk. Either agree on a third-party notary or bring your own trusted one.' },
      { title: 'Skipping the due diligence stage', desc: 'Many foreign buyers skip this to save time or money. It\'s the #1 reason for post-purchase legal disputes. Budget IDR 5–15M and 1–2 weeks — it\'s insurance you\'ll never regret buying.' },
      { title: 'Paying the deposit directly to the seller', desc: 'Deposits should go into notary escrow, not directly to the seller. If the deal falls through due to seller issues, recovering a direct deposit is much harder than recovering escrowed funds.' },
      { title: 'Signing the final agreement in a language you don\'t fully read', desc: 'Agreements are often in Indonesian. Always request a bilingual version (Indonesian + English) and have a legal advisor review the English version. Never rely solely on verbal translation.' },
      { title: 'Not understanding spouse consent requirements', desc: 'Under Indonesian law, property acquired during marriage requires spousal consent to sell. Missing consent can void the transaction years later. Always verify the seller\'s marital status and obtain written consent if applicable.' },
      { title: 'Assuming "lease" and "lease registered" are the same', desc: 'A signed lease contract is just paper. Only a lease REGISTERED at the notary and recorded in the land book has legal force. Always verify registration, not just the signed contract.' },
    ],
    faqs: [
      { q: 'How long does the full process take?', a: 'Typically 30–90 days from offer to handover. Straightforward transactions with clean paperwork can close in 3–4 weeks. Complex cases (multi-seller inheritance, incomplete documents, zoning issues) can take 3–6 months. Budget 60 days as realistic.' },
      { q: 'Do I need to be physically in Bali for the transaction?', a: 'Ideally yes — at least for the final signing. However, most stages (LOI, due diligence review, PPJB) can be done remotely with a Power of Attorney (POA) to your notary or agent. The final AJB signing generally requires presence, though some notaries accept video witnessing for international buyers.' },
      { q: 'Can I use an Indonesian lawyer instead of a notary?', a: 'In Indonesia, land transactions are handled by a specialized notary (PPAT — Pejabat Pembuat Akta Tanah). A regular lawyer cannot record a land title transfer. You can (and should) have a lawyer review contracts alongside the notary, but the notary must execute the transaction.' },
      { q: 'What currency should I pay in?', a: 'Indonesian law requires domestic transactions to be denominated in IDR. You can wire USD or EUR and convert, but the official transaction amount on the AJB must be in IDR. Use the mid-market exchange rate on the transaction day; notary will confirm the IDR amount for tax calculation.' },
      { q: 'What happens if the seller refuses to complete after I paid the deposit?', a: 'Your PPJB should include penalty clauses. Typically, the seller forfeits 2× the deposit amount if they back out without cause. If they refuse to pay, you can sue via Indonesian civil court — which is why having funds in notary escrow (not direct to seller) matters. Well-drafted PPJBs protect you well.' },
      { q: 'Is it safe to buy from an elderly owner?', a: 'Extra care required. Verify mental capacity, check if there are adult children (who may have inheritance claims), and ensure all heirs consent in writing if the property was inherited. Have the notary obtain a "statement of heirs" (keterangan ahli waris) if the title is inherited.' },
    ],
  },
  id: {
    steps: [
      { step: '01', title: 'Penawaran Awal & LOI', time: '1–3 hari', desc: 'Setelah menemukan properti, kamu kirim Letter of Intent (LOI) dengan harga penawaran dan syarat-syaratnya. Ini non-binding tapi nunjukkin kamu serius dan biasanya lock properti dari market selama 7–14 hari.' },
      { step: '02', title: 'Kenalan dengan Notaris', time: '2–5 hari', desc: 'Kamu pilih (atau kami rekomendasiin) notaris (PPAT) berlisensi yang akan handle transaksi. Notaris bersifat netral — mereka mewakili legalitas transaksi, bukan salah satu pihak. Biasanya ada meeting awal untuk jelasin prosesnya.' },
      { step: '03', title: 'Due Diligence', time: '7–14 hari', desc: 'Notaris verifikasi: (1) sertifikat tanah valid dan bebas beban, (2) penjual punya otoritas menjual, (3) izin bangunan (PBG/IMB) masih berlaku, (4) zoning cocok dengan penggunaan yang kamu rencanakan, (5) nggak ada tunggakan pajak atau utilitas. Tahap paling penting — jangan pernah di-skip.' },
      { step: '04', title: 'Negosiasi Harga & Penawaran Final', time: '3–7 hari', desc: 'Berdasarkan temuan due diligence, kamu finalisasi harga dan term. Issue yang ditemukan (izin expired, sengketa batas, dll) bisa dipakai buat negosiasi ulang atau mundur. Deposit (biasanya 10% dari harga) masuk ke escrow.' },
      { step: '05', title: 'Perjanjian Jual Beli Awal (PPJB)', time: '3–5 hari', desc: 'Perjanjian Pengikatan Jual Beli di-draft notaris dan ditandatangan kedua pihak. Ini legally binding dan memuat semua term: harga, jadwal pembayaran, tanggal serah terima, syarat tangguh, dan klausul penalti.' },
      { step: '06', title: 'Pembayaran Final & Clearance Pajak', time: '5–10 hari', desc: 'Pembeli bayar sisa. Penjual bayar PPh (pajak penghasilan, 2,5%), pembeli bayar BPHTB (bea perolehan, 5%). Kedua pajak harus clear sebelum transfer sertifikat bisa dicatat. Notaris handle submission-nya.' },
      { step: '07', title: 'Transfer Sertifikat (AJB / Registrasi Lease)', time: '1–2 hari', desc: 'Untuk freehold (pembeli WNI): Akta Jual Beli ditandatangani di notaris. Untuk leasehold: perjanjian lease di-register dan dicatat di buku tanah. Di momen inilah kepemilikan/hak berpindah secara legal.' },
      { step: '08', title: 'Serah Terima & Transfer Utilitas', time: '1–3 hari', desc: 'Kunci diserahkan. Utilitas (PLN, PDAM, internet) dipindah atas nama kamu. Walk-through terakhir. Opsional: kenalan dengan villa management buat operasional ke depan.' },
    ],
    documents: [
      { name: 'Sertifikat Tanah', desc: 'Dokumen sertifikat — bisa SHM (freehold), HGB (hak guna bangunan), atau Hak Pakai. Cek jenisnya, nama pemegang, batas-batas tanah, dan catatan di belakang sertifikat. Harus match dengan yang dijual.' },
      { name: 'Izin Bangunan (PBG / IMB)', desc: 'Bukti bahwa bangunan legal. Izin yang expired atau hilang bisa berarti risiko pembongkaran. Izin terbaru (pasca-2023) disebut PBG; yang lama IMB.' },
      { name: 'Pondok Wisata (untuk rental turis)', desc: 'Wajib kalau mau operasiin rental villa jangka pendek. Verifikasi izinnya ada dan aktif — tanpa ini, Airbnb dan platform sejenis operasi secara ilegal.' },
      { name: 'Clearance Pajak (SPPT PBB)', desc: 'Bukti pembayaran PBB (Pajak Bumi dan Bangunan) tahunan. Tunggakan pajak pindah ke pemilik baru. Verifikasi semua tahun sudah dibayar.' },
      { name: 'Identitas Pemilik (KTP/Paspor)', desc: 'Untuk freehold: KTP penjual. Untuk leasehold: ID kedua pihak. Notaris verifikasi keasliannya ke catatan pemerintah.' },
      { name: 'Persetujuan Pasangan (kalau relevan)', desc: 'Hukum Indonesia mewajibkan persetujuan pasangan untuk penjualan. Tanpa persetujuan, transaksi bisa dibatalkan di kemudian hari. Notaris verifikasi status perkawinan dan mendapatkan persetujuan.' },
    ],
    costs: [
      { item: 'BPHTB (Pembeli)', amount: '5% dari harga transaksi', who: 'Pembeli', note: 'Bea perolehan — dibayar ke pemerintah daerah' },
      { item: 'PPh (Penjual)', amount: '2,5% dari harga transaksi', who: 'Penjual', note: 'Pajak penghasilan atas penjualan' },
      { item: 'Biaya Notaris', amount: '0,5–1% dari harga', who: 'Biasanya share 50/50', note: 'Drafting, verifikasi, registrasi' },
      { item: 'Komisi Agen', amount: '2–5% dari harga', who: 'Penjual (biasanya)', note: 'Dibayar ke agen; share kalau dual-agency' },
      { item: 'Due Diligence', amount: 'IDR 5–15 juta', who: 'Pembeli', note: 'Opsional tapi sangat direkomendasikan — legal deep-dive' },
      { item: 'Asuransi Sertifikat', amount: '0,3–0,5% dari harga', who: 'Pembeli', note: 'Opsional di Indonesia tapi makin umum untuk deal besar' },
      { item: 'PBB Tahunan', amount: 'IDR 2–10 juta/tahun', who: 'Pemilik (ongoing)', note: 'Sangat rendah — berdasar NJOP' },
    ],
    pitfalls: [
      { title: 'Pakai notaris yang cuma direkomendasiin penjual', desc: 'Notaris harus netral. Nerima notaris yang direkomendasiin penjual tanpa verifikasi independen bikin conflict-of-interest. Entah sepakat pakai notaris pihak ketiga atau bawa notaris kepercayaan sendiri.' },
      { title: 'Skip tahap due diligence', desc: 'Banyak pembeli asing skip ini buat hemat waktu atau uang. Ini alasan nomor 1 sengketa legal pasca-pembelian. Siapin IDR 5–15 juta dan 1–2 minggu — ini asuransi yang nggak akan kamu sesali.' },
      { title: 'Bayar deposit langsung ke penjual', desc: 'Deposit harusnya masuk escrow notaris, bukan langsung ke penjual. Kalau deal batal karena masalah penjual, recover deposit langsung lebih susah dibanding recover dana yang di-escrow.' },
      { title: 'Tanda tangan perjanjian final dalam bahasa yang nggak kamu pahami', desc: 'Perjanjian sering dalam Bahasa Indonesia. Selalu minta versi bilingual (Indonesia + Inggris) dan suruh advisor legal review versi Inggrisnya. Jangan cuma andelin terjemahan lisan.' },
      { title: 'Nggak paham syarat persetujuan pasangan', desc: 'Menurut hukum Indonesia, properti yang diperoleh saat pernikahan butuh persetujuan pasangan untuk dijual. Tanpa persetujuan, transaksi bisa void bertahun-tahun kemudian. Selalu verifikasi status perkawinan penjual dan dapatkan persetujuan tertulis kalau relevan.' },
      { title: 'Anggap "lease" dan "lease yang diregistrasi" sama', desc: 'Kontrak lease yang ditandatangan cuma selembar kertas. Cuma lease yang DIREGISTRASI di notaris dan dicatat di buku tanah yang punya kekuatan hukum. Selalu verifikasi registrasinya, bukan cuma kontraknya.' },
    ],
    faqs: [
      { q: 'Berapa lama proses keseluruhan?', a: 'Biasanya 30–90 hari dari offer ke serah terima. Transaksi straightforward dengan dokumen bersih bisa close dalam 3–4 minggu. Kasus kompleks (warisan multi-penjual, dokumen nggak lengkap, issue zoning) bisa 3–6 bulan. Realistis budget 60 hari.' },
      { q: 'Wajib ada di Bali selama transaksi?', a: 'Idealnya iya — setidaknya buat signing final. Tapi, mayoritas tahap (LOI, review due diligence, PPJB) bisa dilakuin remote pakai Surat Kuasa (POA) ke notaris atau agen kamu. Signing AJB final umumnya butuh kehadiran, meski beberapa notaris terima video witnessing buat pembeli internasional.' },
      { q: 'Bisa pakai pengacara Indonesia aja, tanpa notaris?', a: 'Di Indonesia, transaksi tanah ditangani notaris khusus (PPAT — Pejabat Pembuat Akta Tanah). Pengacara biasa nggak bisa mencatat transfer sertifikat tanah. Kamu bisa (dan sebaiknya) ada pengacara buat review kontrak bareng notaris, tapi notaris yang eksekusi transaksinya.' },
      { q: 'Bayar pakai mata uang apa?', a: 'Hukum Indonesia mewajibkan transaksi domestik dalam IDR. Kamu bisa transfer USD atau EUR lalu convert, tapi jumlah resmi transaksi di AJB harus dalam IDR. Pakai kurs tengah pasar di hari transaksi; notaris akan konfirmasi jumlah IDR buat perhitungan pajak.' },
      { q: 'Kalau penjual mundur setelah aku bayar deposit?', a: 'PPJB kamu harusnya memuat klausul penalti. Biasanya penjual wajib bayar 2× deposit kalau mundur tanpa sebab. Kalau mereka nolak bayar, bisa tuntut via pengadilan perdata Indonesia — makanya dana di escrow notaris (bukan langsung ke penjual) itu penting. PPJB yang di-draft dengan baik melindungi kamu dengan baik.' },
      { q: 'Aman beli dari pemilik yang sudah lansia?', a: 'Harus extra hati-hati. Verifikasi kapasitas mental, cek apakah ada anak dewasa (yang mungkin punya klaim warisan), dan pastiin semua ahli waris kasih persetujuan tertulis kalau propertinya hasil warisan. Minta notaris dapatkan "keterangan ahli waris" kalau sertifikatnya warisan.' },
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

export default function LegalClient() {
  const t = useT()
  const { lang } = useLang()
  const c = content[lang] || content.en

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>
      <div style={{ paddingTop: '64px' }}>
        <div style={{ position: 'relative', height: 'clamp(320px, 50vw, 540px)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1800&q=80" alt="Legal process"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Bali Guide')}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              {t('Legal Process')}<br /><strong>{lang === 'id' ? 'Beli Properti di Bali' : 'for Buying in Bali'}</strong>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '640px', lineHeight: 1.6 }}>
              {t('A step-by-step walkthrough of the notary, due diligence, and contract process — what actually happens, how long each stage takes, and where foreign buyers typically get tripped up.')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Why This Matters')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.3 }}>
            {t("The legal process isn't scary — if you know what to expect")}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.9 }}>
            {t('Bali property transactions follow a clear legal process. The horror stories you hear usually come from buyers who skipped due diligence, used unqualified notaries, or tried to cut corners on paperwork. Done properly, the process is well-protected by Indonesian law and takes 30–90 days from offer to handover.')}
          </motion.p>
        </motion.div>
      </div>

      {/* 8 STEPS */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('The Process')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('From offer to handover in 8 steps')}
            </motion.h2>
            <div>
              {c.steps.map((s, i) => (
                <motion.div key={s.step} variants={fadeUp}
                  style={{ display: 'grid', gridTemplateColumns: '72px 1fr', gap: '24px', paddingBottom: '32px', paddingTop: i > 0 ? '32px' : 0, borderTop: i > 0 ? '1px solid #e5e7eb' : 'none' }}>
                  <div style={{ textAlign: 'center', paddingTop: '4px' }}>
                    <div style={{ width: '44px', height: '44px', backgroundColor: 'black', color: 'white', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700, margin: '0 auto' }}>
                      {s.step}
                    </div>
                  </div>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
                      <h3 style={{ fontWeight: 600, fontSize: '16px' }}>{s.title}</h3>
                      <span style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '1px' }}>{s.time}</span>
                    </div>
                    <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.8 }}>{s.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* KEY DOCUMENTS */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Key Documents')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('What you should actually read')}
          </motion.h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
            {c.documents.map(d => (
              <motion.div key={d.name} variants={fadeUp}
                style={{ border: '1px solid #e5e7eb', padding: '24px' }}>
                <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '10px' }}>{d.name}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{d.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* COSTS TABLE */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Costs Breakdown')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('Who pays what — typical fees for a Bali transaction')}
            </motion.h2>
            <motion.div variants={fadeUp} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', overflowX: 'auto' }}>
              <div style={{ minWidth: '600px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 2fr', backgroundColor: 'black', color: 'white' }}>
                  {[lang === 'id' ? 'Item' : 'Item', lang === 'id' ? 'Jumlah' : 'Amount', lang === 'id' ? 'Dibayar' : 'Paid by', lang === 'id' ? 'Catatan' : 'Note'].map((h, i) => (
                    <div key={i} style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: i > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>{h}</div>
                  ))}
                </div>
                {c.costs.map((row, i) => (
                  <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr 2fr', borderTop: '1px solid #f3f4f6' }}>
                    <div style={{ padding: '14px 16px', fontSize: '13px', fontWeight: 600 }}>{row.item}</div>
                    <div style={{ padding: '14px 16px', fontSize: '13px', color: 'black', borderLeft: '1px solid #f3f4f6' }}>{row.amount}</div>
                    <div style={{ padding: '14px 16px', fontSize: '13px', color: '#6b7280', borderLeft: '1px solid #f3f4f6' }}>{row.who}</div>
                    <div style={{ padding: '14px 16px', fontSize: '13px', color: '#6b7280', borderLeft: '1px solid #f3f4f6' }}>{row.note}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* PITFALLS */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#dc2626', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
            {t('Common Pitfalls')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('What foreign buyers often miss')}
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {c.pitfalls.map(p => (
              <motion.div key={p.title} variants={fadeUp}
                style={{ borderLeft: '3px solid #dc2626', paddingLeft: '20px' }}>
                <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px' }}>{p.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{p.desc}</p>
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
            {t('Start Legal Due Diligence')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(28px, 5vw, 44px)', fontWeight: 300, marginBottom: '16px', lineHeight: 1.2 }}>
            {t('Ready to move forward?')}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '14px', color: 'rgba(255,255,255,0.55)', marginBottom: '36px', lineHeight: 1.7 }}>
            {t("Once you've found a property, we coordinate the full legal process — notary introduction, due diligence, contract drafting, and completion. You'll have full visibility at every step.")}
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
