'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Kamus terjemahan manual — Bahasa Indonesia ditulis natural, bukan kaku formal.
// Key = string Inggris. Kalau key tidak ada di id, fallback ke key (Inggris) sendiri.
// Site title "Great Bali Properties" sengaja tidak pernah diterjemahkan — tetap hardcoded di Navbar dengan translate="no".
export const translations = {
  id: {
    // === NAV ===
    'Home': 'Beranda',
    'Properties': 'Properti',
    'About': 'Tentang',
    'Bali Guide': 'Panduan Bali',
    'Featured': 'Pilihan',
    'Contact': 'Kontak',
    'All Properties': 'Semua Properti',
    'Villas for Sale': 'Villa Dijual',
    'Land for Sale': 'Tanah Dijual',
    'Villas for Rent': 'Villa Disewakan',
    'Featured Properties': 'Properti Pilihan',
    'Featured Villas': 'Villa Pilihan',
    'New Listings': 'Listing Terbaru',
    'Why Invest in Bali': 'Kenapa Invest di Bali',
    'Best Areas to Buy': 'Area Terbaik untuk Beli',
    'Leasehold vs Freehold': 'Leasehold vs Freehold',
    'Legal Process': 'Proses Legal',
    'Rental Yields & ROI': 'Yield Sewa & ROI',
    'Search properties...': 'Cari properti...',
    'WhatsApp': 'WhatsApp',
    'WhatsApp Us': 'Chat WhatsApp',
    'EN — English': 'EN — English',
    'ID — Bahasa': 'ID — Bahasa',
    'IDR — Rupiah': 'IDR — Rupiah',
    'USD — Dollar': 'USD — Dollar',

    // === COMMON CTA / FOOTER ===
    'Browse Properties': 'Lihat Properti',
    'Browse All Properties': 'Lihat Semua Properti',
    'View All Properties →': 'Lihat Semua Properti →',
    'Start on WhatsApp': 'Mulai via WhatsApp',
    'Premium villa and land listings across Bali. A proud partner of Great Bali Villas.': 'Listing villa dan tanah premium di seluruh Bali. Partner resmi Great Bali Villas.',
    'All rights reserved.': 'Hak cipta dilindungi.',
    'Locations': 'Lokasi',
    'Bali Guides': 'Panduan Bali',
    'Villas': 'Villa',
    'Land': 'Tanah',
    'Continue Reading': 'Bacaan Lainnya',
    'More Bali Guides': 'Panduan Bali Lainnya',

    // === HOME ===
    'Why Choose Us': 'Kenapa Pilih Kami',
    'The smart way to invest': 'Cara cerdas untuk invest',
    'in Bali real estate': 'di properti Bali',
    'Curated Listings': 'Listing Terpilih',
    'Every property is hand-selected and verified by our local team. No fake listings, no hidden surprises.': 'Setiap properti dipilih dan diverifikasi langsung oleh tim lokal kami. Nggak ada listing palsu, nggak ada kejutan tersembunyi.',
    'Legal Assistance': 'Bantuan Legal',
    'We guide you through Indonesian property law, leasehold & freehold structures, and notary processes.': 'Kami bantu kamu paham hukum properti Indonesia, struktur leasehold & freehold, dan proses notaris dari awal sampai akhir.',
    'Direct WhatsApp': 'Langsung WhatsApp',
    'Skip the forms. Connect directly with our agents on WhatsApp for fast, personal responses.': 'Nggak perlu isi form. Langsung chat agen kami di WhatsApp untuk respon cepat dan personal.',
    'Featured Listings': 'Listing Pilihan',
    'Areas We Cover': 'Area yang Kami Cover',
    'Popular Locations': 'Lokasi Populer',
    'Get In Touch': 'Hubungi Kami',
    'Ready to find your perfect villa?': 'Siap menemukan villa impianmu?',
    'Our local team is ready to help. Reach out on WhatsApp for a free consultation.': 'Tim lokal kami siap bantu. Hubungi via WhatsApp untuk konsultasi gratis.',

    // === GUIDE — SHARED ===
    'The Opportunity': 'Peluangnya',
    'The Case for Bali': 'Alasan Pilih Bali',
    'Location Guide': 'Panduan Lokasi',
    'How It Works': 'Cara Kerjanya',
    'Common Questions': 'Pertanyaan Umum',
    'Ready to Invest?': 'Siap Invest?',
    'Frequently asked questions': 'Pertanyaan yang sering ditanya',
    'questions': 'pertanyaan',
    'process': 'proses',
    'The buying process': 'Proses pembelian',

    // === GUIDE — BEST AREAS ===
    'Best Areas to Buy in Bali': 'Area Terbaik untuk Beli di Bali',
    "A neighborhood-by-neighborhood breakdown of Bali's seven most investable areas — yields, prices, guest profiles, and the trade-offs that never make it into glossy brochures.": 'Breakdown tujuh area paling layak investasi di Bali, area per area — yield, harga, profil tamu, dan trade-off yang nggak pernah disebut di brosur.',
    'Location First': 'Lokasi Dulu',
    "In Bali, location isn't one factor — it's most of them": 'Di Bali, lokasi bukan cuma salah satu faktor — tapi faktor utamanya',
    "Two identical villas, 15 minutes apart, can produce 40% different annual returns. Each area attracts a distinct guest profile, commands its own nightly rate band, and has its own appreciation trajectory. Choosing the right area is the single highest-leverage decision you'll make as a Bali investor.": 'Dua villa identik, jarak 15 menit, bisa menghasilkan return tahunan beda 40%. Tiap area menarik profil tamu yang beda, punya range tarif malam sendiri, dan trajectory apresiasi yang beda. Memilih area yang tepat adalah keputusan paling krusial untuk investor Bali.',
    'Quick Comparison': 'Perbandingan Cepat',
    'Which area wins what?': 'Area mana menang di hal apa?',
    'Area Breakdowns': 'Breakdown Area',
    'Seven areas, seven strategies': 'Tujuh area, tujuh strategi',
    'There is no single "best" area — only the best area for your specific investment goals and guest profile.': 'Nggak ada satu area "terbaik" — yang ada hanya area paling cocok untuk goal investasi dan target tamu kamu.',
    'How to Choose': 'Cara Memilih',
    'A 5-step decision framework': 'Framework 5 langkah untuk memutuskan',
    'Area-specific questions': 'Pertanyaan seputar area',
    'Not Sure Which Area?': 'Bingung Pilih Area?',
    "Let's find the area that fits you": 'Ayo cari area yang paling cocok buat kamu',
    "Share your goals and budget — we'll recommend the 2–3 areas that best match your profile, with real listings to compare.": 'Kasih tahu goal dan budget kamu — kami rekomendasiin 2–3 area yang paling match, lengkap dengan listing nyata untuk dibandingkan.',

    // === GUIDE — OWNERSHIP (LEASEHOLD VS FREEHOLD) ===
    'Leasehold vs Freehold in Bali': 'Leasehold vs Freehold di Bali',
    'Understanding the two ownership structures that matter for foreign buyers in Bali — what each one means, which one fits your goals, and how to protect your investment.': 'Memahami dua struktur kepemilikan yang penting buat pembeli asing di Bali — apa artinya masing-masing, mana yang cocok buat goal kamu, dan cara melindungi investasimu.',
    'The Basics': 'Dasar-dasarnya',
    "Foreigners can't own freehold land — but you have solid options": 'Orang asing nggak bisa punya freehold — tapi ada opsi yang solid',
    'Indonesian law reserves the strongest form of land ownership (Hak Milik / freehold) for Indonesian citizens only. But this doesn\'t mean foreign investors are shut out — there are several legal structures that provide strong, long-term rights to use and profit from property in Bali. Knowing which one fits you is half the battle.': 'Hukum Indonesia membatasi kepemilikan tanah terkuat (Hak Milik / freehold) hanya untuk WNI. Tapi bukan berarti investor asing nggak bisa masuk — ada beberapa struktur legal yang memberi hak kuat dan jangka panjang untuk menggunakan dan menghasilkan uang dari properti di Bali. Tinggal pilih yang paling pas.',
    'Side by Side': 'Sandingan Langsung',
    'Leasehold vs Freehold at a glance': 'Leasehold vs Freehold sekilas',
    'Ownership Options': 'Opsi Kepemilikan',
    'Four legal structures for foreign buyers': 'Empat struktur legal untuk pembeli asing',
    'Decision Framework': 'Framework Keputusan',
    'Which structure fits you?': 'Struktur mana yang cocok buat kamu?',
    'Red Flags': 'Tanda Bahaya',
    'What to avoid when buying in Bali': 'Hal yang harus dihindari saat beli di Bali',
    'Talk to a Legal Expert': 'Konsultasi dengan Ahli Legal',
    'Structure matters — get it right': 'Struktur itu penting — jangan sampai salah pilih',
    "Every buyer's situation is unique. Before you commit, we'll connect you with a trusted Indonesian notary and legal advisor who specialize in foreign property transactions.": 'Setiap situasi pembeli itu unik. Sebelum commit, kami hubungkan kamu dengan notaris Indonesia terpercaya dan advisor legal yang khusus menangani transaksi properti asing.',

    // === GUIDE — LEGAL PROCESS ===
    'Legal Process for Buying Property in Bali': 'Proses Legal Beli Properti di Bali',
    'A step-by-step walkthrough of the notary, due diligence, and contract process — what actually happens, how long each stage takes, and where foreign buyers typically get tripped up.': 'Panduan step-by-step proses notaris, due diligence, dan kontrak — apa yang benar-benar terjadi, berapa lama tiap tahapan, dan di mana pembeli asing biasanya tersandung.',
    'Why This Matters': 'Kenapa Ini Penting',
    "The legal process isn't scary — if you know what to expect": 'Proses legal itu nggak menakutkan — asal kamu tahu apa yang akan terjadi',
    'Bali property transactions follow a clear legal process. The horror stories you hear usually come from buyers who skipped due diligence, used unqualified notaries, or tried to cut corners on paperwork. Done properly, the process is well-protected by Indonesian law and takes 30–90 days from offer to handover.': 'Transaksi properti di Bali mengikuti proses legal yang jelas. Cerita horor yang sering beredar biasanya berasal dari pembeli yang skip due diligence, pakai notaris abal-abal, atau cari jalan pintas di paperwork. Kalau dilakukan dengan benar, prosesnya dilindungi hukum Indonesia dan memakan waktu 30–90 hari dari offer sampai serah terima.',
    'The Process': 'Prosesnya',
    'From offer to handover in 8 steps': 'Dari offer ke serah terima dalam 8 langkah',
    'Key Documents': 'Dokumen Penting',
    'What you should actually read': 'Yang benar-benar harus kamu baca',
    'Costs Breakdown': 'Rincian Biaya',
    'Who pays what — typical fees for a Bali transaction': 'Siapa bayar apa — biaya umum untuk transaksi di Bali',
    'Common Pitfalls': 'Kesalahan yang Sering Terjadi',
    'What foreign buyers often miss': 'Yang sering diabaikan pembeli asing',
    'Start Legal Due Diligence': 'Mulai Due Diligence Legal',
    "Ready to move forward?": 'Siap lanjut?',
    "Once you've found a property, we coordinate the full legal process — notary introduction, due diligence, contract drafting, and completion. You'll have full visibility at every step.": 'Setelah kamu menemukan properti, kami koordinir seluruh proses legal — kenalan dengan notaris, due diligence, drafting kontrak, dan closing. Kamu akan punya visibility penuh di setiap langkah.',

    // === GUIDE — ROI ===
    'Rental Yields & ROI in Bali': 'Yield Sewa & ROI di Bali',
    'An honest guide to calculating real returns on a Bali villa — gross vs net yield, appreciation, occupancy assumptions, and how to stress-test any investment projection before you commit.': 'Panduan jujur untuk menghitung return riil dari villa Bali — gross vs net yield, apresiasi, asumsi occupancy, dan cara stress-test proyeksi investasi sebelum kamu commit.',
    'The Real Numbers': 'Angka Sebenarnya',
    'Not every projection tells the full story': 'Nggak semua proyeksi cerita yang sebenarnya',
    "Brochures love to quote \"up to 20% gross yield\" — but gross yield is only part of the picture. Once you subtract management fees, maintenance, taxes, platform commissions, and vacancy, your actual cash-in-pocket can be 40–50% lower than the headline number. This guide shows you how to calculate the numbers that actually matter.": 'Brosur suka banget quote "yield gross sampai 20%" — tapi gross yield itu cuma sebagian cerita. Setelah dikurangin management fee, maintenance, pajak, komisi platform, dan vacancy, cash riil di kantong kamu bisa 40–50% lebih rendah dari angka headline. Panduan ini nunjukkin cara hitung angka yang benar-benar penting.',
    'Example Calculation': 'Contoh Perhitungan',
    'A real Canggu villa — from gross revenue to net cash': 'Villa nyata di Canggu — dari revenue kotor ke cash bersih',
    'Key Metrics': 'Metrik Penting',
    'The numbers that actually predict returns': 'Angka yang benar-benar memprediksi return',
    'Occupancy & Rates': 'Occupancy & Tarif',
    'How pricing strategy changes everything': 'Bagaimana strategi pricing mengubah segalanya',
    'Stress Testing': 'Stress Test',
    '5 scenarios every investor should run': '5 skenario yang wajib dijalanin setiap investor',
    'Run Your Numbers': 'Hitung Angka Kamu',
    'Get a real projection for a real villa': 'Dapatkan proyeksi riil untuk villa riil',
    'Send us a property you\'re considering and we\'ll run the full numbers for you — conservative, realistic, and transparent. No inflated projections.': 'Kirim properti yang lagi kamu pertimbangkan, kami akan hitungkan angkanya — konservatif, realistis, dan transparan. Nggak pakai proyeksi yang dibesar-besarkan.',

    // === CONTACT ===
    'Get in touch': 'Hubungi kami',
    "We're here to help you find the perfect Bali property. Reach out via WhatsApp, email, or the form below — we respond within 24 hours, 7 days a week.": 'Kami di sini buat bantu kamu menemukan properti Bali yang tepat. Hubungi via WhatsApp, email, atau form di bawah — kami balas dalam 24 jam, setiap hari.',
    'WhatsApp (Fastest)': 'WhatsApp (Tercepat)',
    'Usually responds in minutes': 'Biasanya balas dalam beberapa menit',
    'Email': 'Email',
    'Response within 24 hours': 'Balas dalam 24 jam',
    'Office': 'Kantor',
    'Open Monday to Saturday': 'Buka Senin–Sabtu',
    'Send us a message': 'Kirim pesan ke kami',
    'Your name': 'Nama kamu',
    'Your email': 'Email kamu',
    'Your WhatsApp number (optional)': 'Nomor WhatsApp (opsional)',
    'What are you looking for?': 'Apa yang kamu cari?',
    'Select an option': 'Pilih opsi',
    'Buying a villa': 'Mau beli villa',
    'Buying land': 'Mau beli tanah',
    'Renting a villa': 'Mau sewa villa',
    'General inquiry': 'Pertanyaan umum',
    'Tell us more': 'Ceritain lebih detail',
    'Any specific requirements? Budget? Preferred area?': 'Ada permintaan khusus? Budget? Area yang diincar?',
    'Send Message': 'Kirim Pesan',
    'Thank you! We\'ll reach out within 24 hours.': 'Terima kasih! Kami akan hubungi kamu dalam 24 jam.',
    'Find Us': 'Temukan Kami',
    'Frequently Asked': 'Sering Ditanya',
    'Quick answers to common questions': 'Jawaban cepat untuk pertanyaan umum',
  }
}

const LangContext = createContext({ lang: 'en', setLang: () => {}, ready: false })

export function LangProvider({ children }) {
  const [lang, setLangState] = useState('en')
  const [ready, setReady] = useState(false)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('gbp_lang')
      if (saved === 'id' || saved === 'en') setLangState(saved)
    } catch {}
    setReady(true)

    // Dengarkan perubahan dari tab lain atau handler lain
    const onStorage = (e) => {
      if (e.key === 'gbp_lang' && (e.newValue === 'id' || e.newValue === 'en')) {
        setLangState(e.newValue)
      }
    }
    const onLangChange = (e) => {
      const newLang = e.detail
      if (newLang === 'id' || newLang === 'en') setLangState(newLang)
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('langChange', onLangChange)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('langChange', onLangChange)
    }
  }, [])

  const setLang = useCallback((code) => {
    if (code !== 'id' && code !== 'en') return
    setLangState(code)
    try { localStorage.setItem('gbp_lang', code) } catch {}
    window.dispatchEvent(new CustomEvent('langChange', { detail: code }))
  }, [])

  return (
    <LangContext.Provider value={{ lang, setLang, ready }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang() {
  return useContext(LangContext)
}

// Hook terjemahan — pakai bahasa Inggris sebagai key, fallback otomatis kalau key belum ada.
export function useT() {
  const { lang } = useContext(LangContext)
  return useCallback((key) => {
    if (lang === 'en') return key
    const dict = translations[lang]
    if (!dict) return key
    return dict[key] ?? key
  }, [lang])
}

// Helper untuk komponen non-React (jarang dipakai, tapi kadang berguna)
export function translate(lang, key) {
  if (lang === 'en') return key
  const dict = translations[lang]
  if (!dict) return key
  return dict[key] ?? key
}
