'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useT, useLang, translations } from '../../lib/i18n'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } }
}

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } }
}

// Konten per-bahasa (natural, bukan kaku) — disimpan inline supaya mudah diedit
const content = {
  en: {
    compareRows: [
      { label: 'Who can own it', leasehold: 'Any foreigner, directly', freehold: 'Indonesian citizens only' },
      { label: 'Duration', leasehold: '25–30 years, extendable', freehold: 'Perpetual (forever)' },
      { label: 'Entry price', leasehold: '40–60% of freehold price', freehold: '100% (reference price)' },
      { label: 'Rental income', leasehold: 'Yours during lease term', freehold: 'Yours forever' },
      { label: 'Can be resold', leasehold: 'Yes — remaining years transfer', freehold: 'Yes — full transfer' },
      { label: 'Legal complexity', leasehold: 'Low — clean and direct', freehold: 'High for foreigners — needs structure' },
      { label: 'Recommended for', leasehold: 'Most foreign investors', freehold: 'Indonesian nationals / PT PMA ops' },
    ],
    structures: [
      {
        name: 'Leasehold (Hak Sewa)',
        tag: 'Most Common',
        tagColor: '#059669',
        desc: 'You pay upfront for the right to use the property for a fixed period, typically 25–30 years. The land title stays with the Indonesian owner but your rights are registered at the notary. Extensions are negotiated at or before lease expiry.',
        pros: ['Directly owned by foreigner, no nominee needed', 'Lower upfront cost vs freehold', 'Clean, fast, well-established legal structure', 'Full right to rent out and collect income', 'Can be resold during the lease period'],
        cons: ['Lease expires — you own time, not land', 'Extension pricing negotiated at expiry', 'Banks rarely finance leasehold in Indonesia'],
        bestFor: 'First-time Bali investors, lifestyle buyers, villa-rental investors',
      },
      {
        name: 'Freehold (Hak Milik)',
        tag: 'Strongest Title',
        tagColor: '#dc2626',
        desc: 'The strongest form of land ownership in Indonesia — permanent, transferable, and inheritable. Available only to Indonesian citizens. Foreigners cannot hold Hak Milik directly, but can access it indirectly through a PT PMA company or nominee structure (the latter carries legal risk).',
        pros: ['Permanent ownership, no expiry', 'Highest resale value', 'Easier to use as loan collateral (for Indonesian owners)', 'No extension negotiations'],
        cons: ['Not available to foreigners directly', 'Nominee structures are legally risky', 'PT PMA setup costs $3–5K + ongoing compliance'],
        bestFor: 'Indonesian citizens, PT PMA operators, long-term commercial projects',
      },
      {
        name: 'Hak Pakai (Right to Use)',
        tag: 'Niche Option',
        tagColor: '#9ca3af',
        desc: 'A residential-use title available to foreigners who hold a KITAS/KITAP (long-term visa). Grants 30-year use rights on residential land, extendable up to 80 years total. Less flexible than leasehold for commercial rental use — intended for personal residence.',
        pros: ['Directly held by the foreigner (no leasehold middleman)', 'Long duration (up to 80 years)', 'Registered as a formal land title'],
        cons: ['Requires valid KITAS/KITAP', 'Restricted to residential use — not intended for commercial rental', 'Lost if visa lapses for extended period'],
        bestFor: 'Foreign retirees, long-term residents with KITAS/KITAP',
      },
      {
        name: 'PT PMA (Foreign-Owned Company)',
        tag: 'Commercial',
        tagColor: '#2563eb',
        desc: 'A foreign-owned Indonesian limited liability company that can hold Hak Guna Bangunan (HGB — right to build) for commercial purposes, including tourism villas. Setup takes 2–4 weeks, costs $3–5K USD, and carries annual compliance obligations.',
        pros: ['Closest thing to freehold available to foreigners', 'HGB title is 30 years, extendable to 80', 'Required if operating multiple commercial villas', 'Separates personal from business liability'],
        cons: ['Setup cost $3–5K + ongoing accounting and tax filings', 'Minimum capital requirement (IDR 10B on paper)', 'Must generate business activity — not for pure passive hold', 'More complex to exit than leasehold'],
        bestFor: 'Investors with 2+ commercial villas, boutique hotel operators',
      },
    ],
    decisionSteps: [
      { step: '01', title: 'Are you buying for lifestyle, rental yield, or both?', desc: 'Lifestyle-only buyers with a KITAS may prefer Hak Pakai. Rental-yield investors almost always go leasehold. Mixed-use is usually leasehold.' },
      { step: '02', title: 'How many properties do you plan to own?', desc: 'One villa: leasehold. Two or more commercial rentals: PT PMA starts to make sense due to tax efficiency and operational legitimacy.' },
      { step: '03', title: "What's your holding horizon?", desc: 'Under 25 years: leasehold is ideal. 30+ years and planning to build: PT PMA with HGB gives you long runway and extension options.' },
      { step: '04', title: 'Do you have a valid long-term visa?', desc: 'KITAS/KITAP holders unlock Hak Pakai. Without one, you are limited to leasehold or PT PMA ownership.' },
      { step: '05', title: "What's your exit plan?", desc: 'Leasehold resells easily (remaining years transfer to new buyer). PT PMA requires company transfer — more complex but preserves HGB title. Plan the exit before you enter.' },
    ],
    redFlags: [
      { title: 'Nominee "Freehold" via Indonesian friend', desc: 'A common scheme where the property is registered under an Indonesian friend or employee on your behalf, with a side agreement. This is legally void under Indonesian law — you have no enforceable rights if the relationship sours or the nominee dies. Never do this.' },
      { title: 'Lease without notary registration', desc: 'An unregistered lease (just a signed private contract) gives you nothing. The lease MUST be registered at a notary and recorded in the land book. If a seller resists registration, walk away.' },
      { title: '"Freehold" sold to a foreigner by title', desc: 'Any listing claiming to sell Hak Milik directly to a foreigner is either misleading or illegal. Double-check that what\'s being sold matches what\'s on the certificate — leasehold listings often use the word "freehold" loosely in marketing.' },
      { title: 'Missing or expired building permit (IMB/PBG)', desc: 'The villa may look perfect, but without a valid building permit (now called PBG, formerly IMB), it can be subject to demolition orders. Always check permit status during due diligence.' },
      { title: 'Zoning mismatch for rental use', desc: 'Not every plot zoned as "residential" allows for tourism rental (Pondok Wisata). Verify the zoning (tata ruang) allows commercial villa operation before buying for yield purposes.' },
    ],
    faqs: [
      { q: 'Can I really own property in Bali as a foreigner?', a: 'Yes — just not freehold (Hak Milik). Through leasehold, Hak Pakai (with a KITAS), or a PT PMA company, foreigners have clear legal paths to use, rent out, and resell property in Bali. Millions of dollars in transactions happen this way every month. The structure just has to match your situation.' },
      { q: 'What happens when my leasehold expires?', a: 'You negotiate an extension with the landowner — typically 6–12 months before expiry. Extension pricing is usually 50–80% of current market rate for the extension period. If you cannot agree on terms, the property (including any improvements) reverts to the landowner. This is why due diligence on the landowner\'s reputation matters.' },
      { q: 'Can I convert a leasehold to freehold later?', a: 'No — not directly. Only an Indonesian citizen can hold Hak Milik. However, if you set up a PT PMA, you can potentially have the PT PMA buy the freehold and convert it to HGB (Right to Build), which the PT PMA can then hold long-term. This is a separate transaction, not a "conversion" in the simple sense.' },
      { q: 'Is leasehold safe for a 25-year investment?', a: 'Yes, when done properly. The lease must be (1) signed in front of a licensed Indonesian notary, (2) recorded in the land book, and (3) include clear extension and inheritance clauses. With these in place, leasehold is extremely well-protected. The horror stories come from buyers who skip step 2 or use unqualified notaries.' },
      { q: 'Do I need a PT PMA for a single rental villa?', a: 'Generally no. For one or two villas that you personally own and rent out, leasehold or Hak Pakai is simpler and cheaper. PT PMA starts to make sense when you\'re running 3+ commercial villas, operating a boutique hotel, or want liability protection between business and personal assets.' },
      { q: 'What is the total cost of transferring a leasehold?', a: 'Budget 4–6% of the transaction price for notary fees, BPHTB (acquisition duty for the extended-use transfer), and leasehold registration. Split varies but is usually shared or paid by the buyer. Always ask for a full cost breakdown in writing before signing.' },
    ],
    cta: { title: 'Structure matters — get it right', desc: "Every buyer's situation is unique. Before you commit, we'll connect you with a trusted Indonesian notary and legal advisor who specialize in foreign property transactions." },
  },
  id: {
    compareRows: [
      { label: 'Siapa yang bisa punya', leasehold: 'Orang asing bisa langsung', freehold: 'Hanya WNI' },
      { label: 'Durasi', leasehold: '25–30 tahun, bisa diperpanjang', freehold: 'Selamanya' },
      { label: 'Harga awal', leasehold: '40–60% dari harga freehold', freehold: '100% (harga referensi)' },
      { label: 'Pendapatan sewa', leasehold: 'Milik kamu selama masa lease', freehold: 'Milik kamu selamanya' },
      { label: 'Bisa dijual lagi', leasehold: 'Bisa — sisa tahun ditransfer', freehold: 'Bisa — transfer penuh' },
      { label: 'Kompleksitas legal', leasehold: 'Rendah — bersih dan langsung', freehold: 'Tinggi buat asing — butuh struktur' },
      { label: 'Cocok untuk', leasehold: 'Mayoritas investor asing', freehold: 'WNI / operator PT PMA' },
    ],
    structures: [
      {
        name: 'Leasehold (Hak Sewa)',
        tag: 'Paling Umum',
        tagColor: '#059669',
        desc: 'Kamu bayar di depan untuk hak pakai properti dalam jangka waktu tertentu, biasanya 25–30 tahun. Sertifikat tanah tetap atas nama pemilik WNI, tapi hak kamu dicatat di notaris. Perpanjangan dinegosiasikan menjelang atau saat lease berakhir.',
        pros: ['Langsung atas nama orang asing, nggak perlu nominee', 'Biaya awal lebih murah dari freehold', 'Struktur legal bersih, cepat, dan terbukti', 'Hak penuh untuk menyewakan dan ambil pendapatan', 'Bisa dijual lagi selama masa lease'],
        cons: ['Lease ada masanya — yang kamu beli waktu, bukan tanah', 'Harga perpanjangan baru dinegosiasikan saat mendekati habis', 'Bank Indonesia jarang bisa biayai leasehold'],
        bestFor: 'Investor Bali pertama kali, lifestyle buyer, investor villa sewa',
      },
      {
        name: 'Freehold (Hak Milik)',
        tag: 'Sertifikat Terkuat',
        tagColor: '#dc2626',
        desc: 'Bentuk kepemilikan tanah terkuat di Indonesia — permanen, bisa ditransfer, bisa diwarisin. Cuma tersedia buat WNI. Orang asing nggak bisa pegang Hak Milik langsung, tapi bisa akses via PT PMA atau struktur nominee (yang mana berisiko secara hukum).',
        pros: ['Kepemilikan permanen, nggak ada masa berakhir', 'Nilai jual kembali paling tinggi', 'Lebih gampang dipakai jaminan pinjaman (buat WNI)', 'Nggak perlu negosiasi perpanjangan'],
        cons: ['Nggak bisa buat asing secara langsung', 'Struktur nominee berisiko secara hukum', 'Setup PT PMA $3–5K + kepatuhan tahunan'],
        bestFor: 'WNI, operator PT PMA, proyek komersial jangka panjang',
      },
      {
        name: 'Hak Pakai',
        tag: 'Opsi Khusus',
        tagColor: '#9ca3af',
        desc: 'Sertifikat hak pakai untuk keperluan residensial, tersedia buat orang asing yang punya KITAS/KITAP. Memberikan hak pakai 30 tahun untuk tanah residensial, bisa diperpanjang total sampai 80 tahun. Kurang fleksibel buat komersial — memang didesain untuk hunian pribadi.',
        pros: ['Langsung atas nama orang asing (nggak perlu middleman leasehold)', 'Durasi panjang (sampai 80 tahun)', 'Terdaftar sebagai sertifikat tanah resmi'],
        cons: ['Wajib punya KITAS/KITAP yang aktif', 'Terbatas untuk hunian — nggak didesain untuk rental komersial', 'Bisa hilang kalau visa lapse dalam jangka panjang'],
        bestFor: 'Pensiunan asing, resident jangka panjang dengan KITAS/KITAP',
      },
      {
        name: 'PT PMA (Perusahaan Asing)',
        tag: 'Komersial',
        tagColor: '#2563eb',
        desc: 'Perseroan Terbatas dengan modal asing di Indonesia yang bisa pegang Hak Guna Bangunan (HGB) untuk tujuan komersial, termasuk villa turis. Setup butuh 2–4 minggu, biaya $3–5K USD, plus kewajiban compliance tahunan.',
        pros: ['Paling mendekati freehold yang bisa diakses orang asing', 'Sertifikat HGB 30 tahun, bisa diperpanjang sampai 80', 'Wajib kalau operasiin banyak villa komersial', 'Memisahkan liability pribadi dari bisnis'],
        cons: ['Setup cost $3–5K + accounting dan pajak tahunan', 'Ada minimum kapital (IDR 10M di atas kertas)', 'Harus ada aktivitas bisnis — bukan buat hold pasif murni', 'Exit-nya lebih ribet dibanding leasehold'],
        bestFor: 'Investor dengan 2+ villa komersial, operator boutique hotel',
      },
    ],
    decisionSteps: [
      { step: '01', title: 'Kamu beli buat lifestyle, yield sewa, atau dua-duanya?', desc: 'Yang murni lifestyle dan punya KITAS mungkin lebih cocok Hak Pakai. Investor yield hampir selalu leasehold. Mixed-use biasanya leasehold juga.' },
      { step: '02', title: 'Rencana punya berapa properti?', desc: 'Satu villa: leasehold. Dua atau lebih rental komersial: PT PMA mulai masuk akal karena efisiensi pajak dan legitimasi operasional.' },
      { step: '03', title: 'Horizon kepemilikannya berapa lama?', desc: 'Di bawah 25 tahun: leasehold ideal. 30+ tahun dan berencana bangun: PT PMA dengan HGB kasih runway panjang plus opsi perpanjangan.' },
      { step: '04', title: 'Punya visa jangka panjang yang aktif?', desc: 'Pemegang KITAS/KITAP bisa unlock Hak Pakai. Kalau nggak punya, opsi terbatas ke leasehold atau PT PMA.' },
      { step: '05', title: 'Rencana exit-nya gimana?', desc: 'Leasehold gampang dijual lagi (sisa tahun ditransfer ke pembeli baru). PT PMA butuh transfer perusahaan — lebih kompleks tapi sertifikat HGB tetap aman. Rencanain exit sebelum masuk.' },
    ],
    redFlags: [
      { title: 'Nominee "Freehold" via teman WNI', desc: 'Skema umum di mana properti didaftarkan atas nama teman atau karyawan WNI kamu, dengan perjanjian sampingan. Secara hukum Indonesia ini void — kamu nggak punya hak yang bisa dipaksakan kalau hubungan memburuk atau nominee-nya meninggal. Jangan pernah lakuin ini.' },
      { title: 'Lease tanpa registrasi notaris', desc: 'Lease yang nggak terdaftar (cuma kontrak privat yang ditandatangan) itu nggak ada artinya. Lease WAJIB didaftarkan di notaris dan dicatat di buku tanah. Kalau penjual menolak registrasi, langsung mundur.' },
      { title: '"Freehold" dijual ke orang asing secara langsung', desc: 'Listing mana pun yang klaim menjual Hak Milik langsung ke orang asing itu menyesatkan atau ilegal. Selalu cek apa yang dijual sesuai dengan sertifikatnya — listing leasehold sering pakai kata "freehold" sembarangan di marketing.' },
      { title: 'Izin bangunan (IMB/PBG) hilang atau expired', desc: 'Villa-nya mungkin keliatan sempurna, tapi tanpa izin bangunan yang valid (sekarang disebut PBG, dulu IMB), bisa kena perintah pembongkaran. Selalu cek status izin saat due diligence.' },
      { title: 'Zoning yang nggak cocok buat rental', desc: 'Nggak semua lahan dengan zoning "residensial" boleh buat rental turis (Pondok Wisata). Verifikasi zoning (tata ruang) membolehkan operasi villa komersial sebelum beli buat tujuan yield.' },
    ],
    faqs: [
      { q: 'Beneran orang asing bisa punya properti di Bali?', a: 'Bisa — cuma nggak freehold (Hak Milik). Via leasehold, Hak Pakai (dengan KITAS), atau PT PMA, orang asing punya jalur legal yang jelas untuk pakai, menyewakan, dan menjual properti di Bali. Transaksi jutaan dolar terjadi tiap bulan lewat jalur ini. Struktur-nya aja yang harus cocok sama situasi kamu.' },
      { q: 'Apa yang terjadi kalau leasehold saya berakhir?', a: 'Kamu negosiasi perpanjangan sama pemilik tanah — biasanya 6–12 bulan sebelum habis. Harga perpanjangan biasanya 50–80% dari harga pasar saat itu untuk periode perpanjangan. Kalau nggak deal, properti (termasuk renovasi) kembali ke pemilik tanah. Makanya due diligence soal reputasi pemilik tanah penting banget.' },
      { q: 'Bisa nggak nanti leasehold diubah jadi freehold?', a: 'Nggak bisa — secara langsung. Cuma WNI yang bisa pegang Hak Milik. Tapi kalau kamu setup PT PMA, PT PMA bisa beli freehold itu dan convert ke HGB (Hak Guna Bangunan) yang bisa dipegang PT PMA jangka panjang. Ini transaksi terpisah, bukan "konversi" dalam arti sederhana.' },
      { q: 'Leasehold 25 tahun itu aman buat investasi?', a: 'Aman, asal dilakuin bener. Lease harus (1) ditandatangan di depan notaris Indonesia yang berlisensi, (2) dicatat di buku tanah, dan (3) memuat klausul perpanjangan dan pewarisan yang jelas. Dengan itu semua, leasehold sangat terlindungi. Cerita horor biasanya datang dari pembeli yang skip step 2 atau pakai notaris abal-abal.' },
      { q: 'Butuh PT PMA buat satu villa rental?', a: 'Biasanya nggak. Untuk satu-dua villa yang kamu miliki pribadi dan sewakan, leasehold atau Hak Pakai lebih simpel dan murah. PT PMA mulai masuk akal kalau kamu jalanin 3+ villa komersial, operasiin boutique hotel, atau mau proteksi liability antara aset bisnis dan pribadi.' },
      { q: 'Total biaya transfer leasehold berapa?', a: 'Siapin 4–6% dari harga transaksi buat biaya notaris, BPHTB (bea perolehan hak atas tanah untuk transfer hak pakai yang diperpanjang), dan registrasi leasehold. Pembagiannya bervariasi tapi biasanya share atau dibayar pembeli. Selalu minta breakdown biaya lengkap secara tertulis sebelum tanda tangan.' },
    ],
    cta: { title: 'Struktur itu penting — jangan sampai salah pilih', desc: 'Setiap situasi pembeli itu unik. Sebelum commit, kami hubungkan kamu dengan notaris Indonesia terpercaya dan advisor legal yang khusus menangani transaksi properti asing.' },
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

export default function OwnershipClient() {
  const t = useT()
  const { lang } = useLang()
  const c = content[lang] || content.en

  return (
    <main style={{ fontFamily: 'Inter, sans-serif', backgroundColor: 'white', color: 'black', overflowX: 'hidden' }}>
      {/* HERO */}
      <div style={{ paddingTop: '64px' }}>
        <div style={{ position: 'relative', height: 'clamp(320px, 50vw, 540px)', overflow: 'hidden' }}>
          <img src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1800&q=80" alt="Bali Ownership"
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.72) 100%)' }} />
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', textAlign: 'center', padding: '0 24px' }}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              style={{ fontSize: '11px', letterSpacing: '4px', color: 'rgba(255,255,255,0.5)', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Bali Guide')}
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
              style={{ fontSize: 'clamp(32px, 6vw, 68px)', fontWeight: 300, color: 'white', lineHeight: 1.1, marginBottom: '16px' }}>
              {t('Leasehold vs Freehold in Bali').split(' ').slice(0, -1).join(' ')}<br /><strong>{t('Leasehold vs Freehold in Bali').split(' ').slice(-1)}</strong>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
              style={{ fontSize: 'clamp(14px, 2vw, 17px)', color: 'rgba(255,255,255,0.7)', maxWidth: '620px', lineHeight: 1.6 }}>
              {t('Understanding the two ownership structures that matter for foreign buyers in Bali — what each one means, which one fits your goals, and how to protect your investment.')}
            </motion.p>
          </div>
        </div>
      </div>

      {/* INTRO */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)', textAlign: 'center' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('The Basics')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '24px', lineHeight: 1.3 }}>
            {t("Foreigners can't own freehold land — but you have solid options")}
          </motion.h2>
          <motion.p variants={fadeUp} style={{ fontSize: '15px', color: '#4b5563', lineHeight: 1.9 }}>
            {t('Indonesian law reserves the strongest form of land ownership (Hak Milik / freehold) for Indonesian citizens only. But this doesn\'t mean foreign investors are shut out — there are several legal structures that provide strong, long-term rights to use and profit from property in Bali. Knowing which one fits you is half the battle.')}
          </motion.p>
        </motion.div>
      </div>

      {/* COMPARISON TABLE */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Side by Side')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '40px' }}>
              {t('Leasehold vs Freehold at a glance')}
            </motion.h2>
            <motion.div variants={fadeUp} style={{ backgroundColor: 'white', border: '1px solid #e5e7eb', overflow: 'hidden' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', backgroundColor: 'black', color: 'white' }}>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase' }}></div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>Leasehold</div>
                <div style={{ padding: '14px 16px', fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600, borderLeft: '1px solid rgba(255,255,255,0.1)' }}>Freehold</div>
              </div>
              {c.compareRows.map((row, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr', borderTop: '1px solid #f3f4f6' }}>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: '#6b7280', fontWeight: 500 }}>{row.label}</div>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: 'black', borderLeft: '1px solid #f3f4f6' }}>{row.leasehold}</div>
                  <div style={{ padding: '14px 16px', fontSize: '13px', color: 'black', borderLeft: '1px solid #f3f4f6' }}>{row.freehold}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* 4 STRUCTURES */}
      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
            {t('Ownership Options')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('Four legal structures for foreign buyers')}
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {c.structures.map(s => (
              <motion.div key={s.name} variants={fadeUp}
                style={{ border: '1px solid #e5e7eb', padding: 'clamp(24px, 4vw, 36px)', backgroundColor: 'white' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px', flexWrap: 'wrap', gap: '12px' }}>
                  <h3 style={{ fontSize: 'clamp(18px, 2.5vw, 24px)', fontWeight: 600 }}>{s.name}</h3>
                  <span style={{ fontSize: '11px', color: 'white', backgroundColor: s.tagColor, padding: '4px 10px', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 600 }}>{s.tag}</span>
                </div>
                <p style={{ fontSize: '14px', color: '#4b5563', lineHeight: 1.9, marginBottom: '24px' }}>{s.desc}</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '20px' }}>
                  <div>
                    <p style={{ fontSize: '11px', color: '#059669', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: 600 }}>✓ Pros</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>
                      {s.pros.map(p => <li key={p}>{p}</li>)}
                    </ul>
                  </div>
                  <div>
                    <p style={{ fontSize: '11px', color: '#dc2626', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '10px', fontWeight: 600 }}>✗ Cons</p>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: '#4b5563', lineHeight: 1.8 }}>
                      {s.cons.map(cn => <li key={cn}>{cn}</li>)}
                    </ul>
                  </div>
                </div>
                <div style={{ borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                  <p style={{ fontSize: '11px', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '2px', marginBottom: '6px', fontWeight: 600 }}>Best for</p>
                  <p style={{ fontSize: '13px', color: 'black' }}>{s.bestFor}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* DECISION STEPS */}
      <div style={{ backgroundColor: '#f9fafb', borderTop: '1px solid #f3f4f6', borderBottom: '1px solid #f3f4f6' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
          <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#9ca3af', textTransform: 'uppercase', marginBottom: '16px' }}>
              {t('Decision Framework')}
            </motion.p>
            <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
              {t('Which structure fits you?')}
            </motion.h2>
            <div>
              {c.decisionSteps.map((s, i) => (
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

      {/* RED FLAGS */}
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: 'clamp(48px, 8vw, 96px) clamp(20px, 5vw, 48px)' }}>
        <motion.div variants={stagger} initial="hidden" whileInView="show" viewport={{ once: true }}>
          <motion.p variants={fadeUp} style={{ fontSize: '11px', letterSpacing: '3px', color: '#dc2626', textTransform: 'uppercase', marginBottom: '16px', fontWeight: 600 }}>
            {t('Red Flags')}
          </motion.p>
          <motion.h2 variants={fadeUp} style={{ fontSize: 'clamp(24px, 4vw, 38px)', fontWeight: 300, marginBottom: '48px' }}>
            {t('What to avoid when buying in Bali')}
          </motion.h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {c.redFlags.map(r => (
              <motion.div key={r.title} variants={fadeUp}
                style={{ borderLeft: '3px solid #dc2626', paddingLeft: '20px', paddingTop: '4px', paddingBottom: '4px' }}>
                <h3 style={{ fontWeight: 600, fontSize: '15px', marginBottom: '8px', color: 'black' }}>{r.title}</h3>
                <p style={{ fontSize: '13px', color: '#6b7280', lineHeight: 1.8 }}>{r.desc}</p>
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
            {t('Talk to a Legal Expert')}
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
