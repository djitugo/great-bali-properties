'use client'
import { createContext, useContext, useEffect, useState, useCallback } from 'react'

// Kamus terjemahan manual — Bahasa Indonesia ditulis dengan register netral-profesional:
// pakai "kamu" (bukan "Anda" yang terlalu formal, bukan "lu" yang terlalu santai),
// pakai "tidak" (bukan "nggak"), "untuk" (bukan "buat"), "bagaimana" (bukan "gimana").
// Key = string Inggris. Kalau key tidak ada di id, fallback ke key (Inggris) sendiri.
// Site title "Great Bali Properties" sengaja tidak pernah diterjemahkan — tetap hardcoded dengan translate="no".
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
    'Why Invest in Bali': 'Mengapa Investasi di Bali',
    'Best Areas to Buy': 'Area Terbaik untuk Membeli',
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
    'View Listings': 'Lihat Listing',
    'Contact Agent': 'Hubungi Agen',
    'Start on WhatsApp': 'Mulai via WhatsApp',
    'Premium villa and land listings across Bali. A proud partner of Great Bali Villas.': 'Listing villa dan tanah premium di seluruh Bali. Partner resmi Great Bali Villas.',
    'All rights reserved.': 'Hak cipta dilindungi.',
    'Locations': 'Lokasi',
    'Bali Guides': 'Panduan Bali',
    'Villas': 'Villa',
    'Land': 'Tanah',
    'Continue Reading': 'Bacaan Lainnya',
    'More Bali Guides': 'Panduan Bali Lainnya',
    'Navigate': 'Navigasi',
    'View →': 'Lihat →',
    'WhatsApp Inquiry': 'Tanya via WhatsApp',
    'Photo Gallery': 'Galeri Foto',
    'About this property': 'Tentang properti ini',
    'Property Details': 'Detail Properti',
    'All Listings': 'Semua Listing',
    'Interested?': 'Tertarik?',
    'Status': 'Status',
    'Type': 'Tipe',
    'Ownership': 'Kepemilikan',
    'Location': 'Lokasi',
    'Area': 'Area',
    'For Sale': 'Dijual',
    'For Rent': 'Disewakan',
    'Leasehold': 'Leasehold',
    'Freehold': 'Freehold',
    'Yearly': 'Sewa Tahunan',
    'Yearly Rent': 'Sewa Tahunan',
    'Beds': 'KT',
    'Baths': 'KM',
    'Building': 'Bangunan',
    'Gross Yield': 'Gross Yield',
    '← Back': '← Kembali',
    'You Might Also Like': 'Kamu Mungkin Juga Suka',
    'Other Listings': 'Listing Lainnya',
    'properties found': 'properti ditemukan',
    'Sort by:': 'Urutkan:',
    'No properties found.': 'Tidak ada properti yang cocok.',
    'Clear all filters': 'Hapus semua filter',
    'Browse': 'Jelajahi',
    'View Property →': 'Lihat Properti →',
    'Property': 'Properti',
    'sqm': 'm²',

    // === SORT OPTIONS ===
    'Featured First': 'Pilihan Dulu',
    'Price: Low to High': 'Harga: Rendah ke Tinggi',
    'Price: High to Low': 'Harga: Tinggi ke Rendah',
    'Alphabetically': 'Sesuai Abjad',
    'Newest First': 'Terbaru Dulu',

    // === ADVANCED SEARCH ===
    'All Locations': 'Semua Lokasi',
    'All Types': 'Semua Tipe',
    'Villa': 'Villa',
    'Commercial': 'Komersial',
    'For Sale & Rent': 'Dijual & Disewakan',
    'All': 'Semua',
    'Search': 'Cari',
    'Reset': 'Reset',
    'Advanced Filters': 'Filter Lanjutan',
    'Price Range': 'Rentang Harga',
    'No limit': 'Tanpa batas',
    'Min Bedrooms': 'Minimal Kamar',
    'Any': 'Bebas',

    // === HOME — HERO SLIDER ===
    'Premium Bali Real Estate': 'Properti Premium di Bali',
    'Find Your': 'Temukan',
    'Dream Villa': 'Villa Impian',
    'in Bali': 'di Bali',
    "Curated villas and land across Bali's most sought-after locations. Trusted by investors worldwide.": 'Villa dan tanah pilihan di lokasi-lokasi terbaik di Bali. Dipercaya investor dari seluruh dunia.',
    'Years Exp': 'Tahun Pengalaman',
    'Managed': 'Dikelola',

    // === HOME ===
    'Why Choose Us': 'Mengapa Memilih Kami',
    'The smart way to invest': 'Cara cerdas untuk berinvestasi',
    'in Bali real estate': 'di properti Bali',

    // Home — Why Choose Us (3 columns)
    'Legal Integrity': 'Integritas Legal',
    'Uncompromising Legal Security': 'Keamanan Legal Tanpa Kompromi',
    "Navigating property laws shouldn't be stressful. We handle the complexities so you don't have to.": 'Memahami hukum properti tidak perlu menjadi beban. Kami menangani kerumitannya, agar kamu tidak perlu.',
    'Rigorous Due Diligence:': 'Due Diligence Menyeluruh:',
    'Comprehensive verification of permits (PBG/SLF) and land zoning.': 'Verifikasi menyeluruh atas perizinan (PBG/SLF) dan zonasi tanah.',
    'Safe Structures:': 'Struktur yang Aman:',
    'Expert guidance on Leasehold and Freehold ownership.': 'Pendampingan ahli untuk kepemilikan Leasehold dan Freehold.',
    'Trusted Network:': 'Jaringan Terpercaya:',
    'Direct coordination with reputable public notaries for a secure transaction.': 'Koordinasi langsung dengan notaris publik terpercaya untuk transaksi yang aman.',
    'Curated Portfolio': 'Portfolio Terkurasi',
    'Selection Over Collection': 'Seleksi, Bukan Sekadar Koleksi',
    'We prioritize quality over quantity, focusing only on properties that promise real value.': 'Kami mengutamakan kualitas di atas kuantitas, hanya berfokus pada properti yang menawarkan nilai nyata.',
    'Hand-Selected Units:': 'Unit Pilihan Tangan:',
    'Every villa is vetted for architectural integrity and prime location.': 'Setiap villa diseleksi berdasarkan integritas arsitektur dan lokasi premium.',
    'Market-Ready Designs:': 'Desain Siap Pasar:',
    "We list properties designed to perform in Bali's competitive rental market.": 'Kami mendaftarkan properti yang dirancang untuk bersaing di pasar sewa Bali.',
    'High-Yield Focus:': 'Fokus Yield Tinggi:',
    'Only the best-performing assets in high-demand areas make it to our list.': 'Hanya aset dengan performa terbaik di area permintaan tinggi yang masuk ke daftar kami.',
    'Seamless Management': 'Manajemen Tanpa Hambatan',
    'Investment Without the Stress': 'Investasi Tanpa Beban',
    'Our partnership continues long after the keys are handed over.': 'Kemitraan kami berlanjut jauh setelah serah terima kunci.',
    'End-to-End Service:': 'Layanan Menyeluruh:',
    'A smooth transition from property buyer to profitable landlord.': 'Transisi mulus dari pembeli properti menjadi landlord yang menguntungkan.',
    'Professional Oversight:': 'Pengawasan Profesional:',
    'Full management including aggressive marketing and guest relations.': 'Manajemen penuh termasuk marketing agresif dan hubungan tamu.',
    'Passive Income:': 'Pendapatan Pasif:',
    'We handle the daily operations and maintenance while you enjoy the returns.': 'Kami mengurus operasional harian dan perawatan sementara kamu menikmati hasilnya.',

    'Curated Listings': 'Listing Pilihan',
    'Every property is hand-selected and verified by our local team. No fake listings, no hidden surprises.': 'Setiap properti dipilih dan diverifikasi langsung oleh tim lokal kami. Tidak ada listing palsu, tidak ada kejutan tersembunyi.',
    'Legal Assistance': 'Pendampingan Legal',
    'We guide you through Indonesian property law, leasehold & freehold structures, and notary processes.': 'Kami bantu kamu memahami hukum properti Indonesia, struktur leasehold dan freehold, serta proses notaris dari awal sampai selesai.',
    'Direct WhatsApp': 'Langsung WhatsApp',
    'Skip the forms. Connect directly with our agents on WhatsApp for fast, personal responses.': 'Tidak perlu isi form panjang. Chat langsung agen kami di WhatsApp untuk respon cepat dan personal.',
    'Featured Listings': 'Listing Pilihan',
    'Areas We Cover': 'Area yang Kami Cover',
    'Popular Locations': 'Lokasi Populer',
    'Get In Touch': 'Hubungi Kami',
    'Ready to find your perfect villa?': 'Siap menemukan villa idealmu?',
    'Our local team is ready to help. Reach out on WhatsApp for a free consultation.': 'Tim lokal kami siap membantu. Hubungi via WhatsApp untuk konsultasi gratis.',

    // === ABOUT ===
    'About Us': 'Tentang Kami',
    "Bali's Trusted": 'Partner Properti',
    'Property Partner': 'Terpercaya di Bali',
    'A curated real estate agency dedicated to helping investors and dreamers find their perfect piece of Bali.': 'Agensi properti terkurasi yang berdedikasi membantu investor dan pencinta Bali menemukan properti impian mereka.',
    'Properties Listed': 'Properti Terdaftar',
    'Years Experience': 'Tahun Pengalaman',
    'Villas Managed': 'Villa Dikelola',
    'Trusted Service': 'Layanan Terpercaya',
    'Our Story': 'Cerita Kami',
    'Born from a passion': 'Lahir dari kecintaan',
    'for Bali': 'pada Bali',
    'Great Bali Properties was founded with one simple belief: buying property in Bali should be exciting, not stressful. Too many investors had been burned by confusing legalities, misleading listings, and agents who disappeared after the sale.': 'Great Bali Properties didirikan dengan satu keyakinan sederhana: membeli properti di Bali harus jadi pengalaman yang menyenangkan, bukan melelahkan. Terlalu banyak investor yang terjebak karena legalitas yang membingungkan, listing yang menyesatkan, dan agen yang menghilang setelah transaksi.',
    "We set out to build something different — a real estate agency rooted in transparency, local knowledge, and genuine care for our clients. As a proud partner of Great Bali Villas, one of Bali's most respected villa management companies, we bring over a decade of on-the-ground expertise to every transaction.": 'Kami membangun sesuatu yang berbeda — agensi properti yang berlandaskan transparansi, pengetahuan lokal, dan kepedulian yang tulus kepada klien. Sebagai partner resmi Great Bali Villas, salah satu perusahaan manajemen villa paling terpercaya di Bali, kami membawa pengalaman lebih dari satu dekade ke setiap transaksi.',
    'Today, we serve buyers and investors from across the globe, helping them navigate the Indonesian property market with confidence — from first inquiry to final handover and beyond.': 'Hari ini kami melayani pembeli dan investor dari seluruh dunia, membantu mereka menavigasi pasar properti Indonesia dengan percaya diri — dari pertanyaan pertama hingga serah terima akhir dan seterusnya.',
    'Years in Bali': 'Tahun di Bali',
    'What We Stand For': 'Apa yang Kami Pegang',
    'Our': 'Nilai',
    'Values': 'Kami',
    'Transparency First': 'Transparansi Utama',
    'No hidden fees, no inflated listings. Every property is priced fairly and all legal details are disclosed upfront. We believe informed buyers make the best decisions.': 'Tidak ada biaya tersembunyi, tidak ada listing yang dilebih-lebihkan. Setiap properti dihargai secara wajar dan seluruh detail legal disampaikan di awal. Pembeli yang well-informed membuat keputusan terbaik.',
    'Local Expertise': 'Keahlian Lokal',
    'Our team lives and works in Bali. We know every neighborhood, every regulation, and every opportunity — giving you an insider advantage in a complex market.': 'Tim kami tinggal dan bekerja di Bali. Kami paham setiap area, regulasi, dan peluang — memberi kamu keunggulan orang dalam di pasar yang kompleks.',
    'End-to-End Support': 'Pendampingan Menyeluruh',
    'From first inquiry to notary signing, we guide you through every step. Legal assistance, property management, and after-sale support are all part of what we offer.': 'Dari pertanyaan pertama hingga tanda tangan di notaris, kami mendampingi setiap langkah. Bantuan legal, manajemen properti, dan layanan pasca-jual adalah bagian dari apa yang kami tawarkan.',
    'Curated Quality': 'Kualitas Terkurasi',
    "We don't list everything — only properties we've personally vetted. Each listing meets our standards for legal compliance, condition, and investment potential.": 'Kami tidak melisting semuanya — hanya properti yang telah kami verifikasi sendiri. Setiap listing memenuhi standar kami dalam aspek legal, kondisi fisik, dan potensi investasi.',
    'Investor Focused': 'Berfokus pada Investor',
    "Whether you're buying your first holiday villa or building a portfolio, we tailor our guidance to your goals — lifestyle, yield, or long-term appreciation.": 'Baik kamu membeli villa liburan pertama atau sedang membangun portfolio, kami menyesuaikan saran kami dengan tujuanmu — gaya hidup, yield, atau apresiasi jangka panjang.',
    'Trusted Partnership': 'Kemitraan Terpercaya',
    "As a partner of Great Bali Villas, one of Bali's leading villa management companies, we offer unmatched continuity from purchase to profitable operation.": 'Sebagai partner Great Bali Villas, salah satu perusahaan manajemen villa terdepan di Bali, kami menawarkan kontinuitas dari pembelian hingga operasi yang menguntungkan.',
    'The People Behind It': 'Orang di Balik Layar',
    'Meet the': 'Kenalan dengan',
    'Team': 'Tim',
    'Founder & Property Director': 'Founder & Direktur Properti',
    'International Sales Manager': 'Manajer Sales Internasional',
    'Legal & Notary Liaison': 'Penghubung Legal & Notaris',
    "Born and raised in Bali, Aditya has spent over a decade navigating the island's real estate market, helping hundreds of investors find and grow their property portfolios.": 'Lahir dan besar di Bali, Aditya telah lebih dari satu dekade berkecimpung di pasar properti pulau ini, membantu ratusan investor menemukan dan mengembangkan portfolio properti mereka.',
    'With a background in luxury real estate across Asia-Pacific, Sarah specializes in connecting international buyers with the right Bali properties for their lifestyle and investment needs.': 'Dengan latar belakang real estat mewah di Asia-Pasifik, Sarah berfokus menghubungkan pembeli internasional dengan properti Bali yang sesuai kebutuhan gaya hidup dan investasi mereka.',
    'Wayan ensures every transaction is legally sound. His deep understanding of Indonesian property law protects buyers and sellers alike throughout the purchase process.': 'Wayan memastikan setiap transaksi aman secara legal. Pemahamannya yang mendalam terhadap hukum properti Indonesia melindungi pembeli maupun penjual sepanjang proses transaksi.',
    'Where We Operate': 'Area Operasional Kami',
    'The': 'Keunggulan',
    'difference': 'Great Bali Properties',
    'Partner of Great Bali Villas': 'Partner Great Bali Villas',
    'Access to 1,000+ managed villas and a team with 10+ years of on-the-ground Bali experience.': 'Akses ke 1.000+ villa terkelola dan tim dengan 10+ tahun pengalaman langsung di Bali.',
    'Full Legal Support': 'Dukungan Legal Penuh',
    'In-house legal guidance covering leasehold, freehold, notary processes, and foreign ownership structures.': 'Pendampingan legal internal yang mencakup leasehold, freehold, proses notaris, dan struktur kepemilikan asing.',
    'Post-Purchase Management': 'Manajemen Pasca-Pembelian',
    'We can manage your villa for short-term rentals, long-term leases, or simply keep it in perfect condition for your visits.': 'Kami dapat mengelola villamu untuk sewa jangka pendek, sewa jangka panjang, atau sekadar menjaganya tetap prima untuk kunjunganmu.',
    'Honest Market Valuations': 'Valuasi Pasar Jujur',
    'We price properties based on real market data — not inflated numbers designed to maximize our commission.': 'Kami menentukan harga berdasarkan data pasar riil — bukan angka yang dilebih-lebihkan untuk memaksimalkan komisi.',
    'Ready to Start?': 'Siap Memulai?',
    "Let's find your": 'Ayo temukan',
    'dream property': 'properti impianmu',
    'Our team is available 7 days a week. Reach out on WhatsApp for a free consultation with no obligations.': 'Tim kami tersedia 7 hari seminggu. Hubungi via WhatsApp untuk konsultasi gratis tanpa kewajiban.',

    // === GUIDE — SHARED ===
    'The Opportunity': 'Peluangnya',
    'The Case for Bali': 'Alasan Memilih Bali',
    'Location Guide': 'Panduan Lokasi',
    'How It Works': 'Cara Kerjanya',
    'Common Questions': 'Pertanyaan Umum',
    'Ready to Invest?': 'Siap Berinvestasi?',
    'Frequently asked questions': 'Pertanyaan yang sering ditanyakan',
    'questions': 'pertanyaan',
    'process': 'proses',
    'The buying process': 'Proses pembelian',

    // === GUIDE — WHY INVEST ===
    'Why Invest': 'Mengapa Investasi',
    'in Bali?': 'di Bali?',
    "A complete guide to understanding Bali's real estate market — the opportunities, the numbers, and what every investor needs to know before buying.": 'Panduan lengkap untuk memahami pasar properti Bali — peluang, angka-angka, dan hal yang perlu diketahui setiap investor sebelum membeli.',
    'Bali offers a rare combination of': 'Bali menawarkan kombinasi langka antara',
    'lifestyle and strong returns': 'gaya hidup dan return yang kuat',
    "In most investment markets, you choose between returns and enjoyment. Bali is one of the few places in the world where you genuinely don't have to. A well-purchased villa can generate 12–20% annual yields while sitting empty between your own visits — and appreciate in value at the same time.": 'Di kebanyakan pasar investasi, kamu harus memilih antara return atau kenikmatan. Bali adalah salah satu tempat langka di dunia di mana kamu tidak perlu memilih. Villa yang dibeli dengan tepat bisa menghasilkan yield tahunan 12–20% ketika kosong di sela-sela kunjunganmu — sekaligus mengalami apresiasi nilai.',
    '6 reasons to invest': '6 alasan berinvestasi',
    'World-Class Tourism Destination': 'Destinasi Wisata Kelas Dunia',
    'Bali welcomes over 6 million international visitors annually, creating consistent demand for quality short-term rentals. High occupancy rates translate directly into strong rental yields for property owners.': 'Bali menerima lebih dari 6 juta pengunjung internasional per tahun, menciptakan permintaan konsisten untuk sewa jangka pendek berkualitas. Tingkat occupancy yang tinggi berarti yield sewa yang kuat bagi pemilik properti.',
    'High Rental Yields': 'Yield Sewa Tinggi',
    'Well-located villas in areas like Canggu, Seminyak, and Uluwatu regularly achieve gross rental yields of 12–20% per year — significantly higher than most global real estate markets.': 'Villa di lokasi strategis seperti Canggu, Seminyak, dan Uluwatu secara rutin mencapai gross yield 12–20% per tahun — jauh lebih tinggi dari mayoritas pasar properti global.',
    'Strong Capital Appreciation': 'Apresiasi Capital yang Kuat',
    'Bali property values have grown consistently at 7–15% annually in prime areas. Limited land supply, rising tourism, and growing expat demand continue to push prices higher.': 'Nilai properti Bali konsisten tumbuh 7–15% per tahun di area utama. Suplai tanah yang terbatas, pariwisata yang terus berkembang, dan permintaan ekspat yang naik terus mendorong harga lebih tinggi.',
    'Digital Nomad & Expat Hub': 'Pusat Digital Nomad & Ekspat',
    "Bali has become one of the world's leading destinations for remote workers and digital nomads. Long-stay demand is surging, creating opportunities for mid-term rental income beyond traditional tourism.": 'Bali telah menjadi salah satu destinasi utama dunia untuk remote worker dan digital nomad. Permintaan long-stay meningkat pesat, menciptakan peluang pendapatan sewa jangka menengah di luar pariwisata konvensional.',
    'Affordable Entry Point': 'Harga Masuk Terjangkau',
    'Compared to equivalent lifestyle destinations in Europe, Australia, or Southeast Asian financial hubs, Bali still offers exceptional value. A premium villa with pool can be acquired for a fraction of comparable properties elsewhere.': 'Dibandingkan destinasi gaya hidup setara di Eropa, Australia, atau pusat finansial Asia Tenggara, Bali masih menawarkan nilai yang luar biasa. Villa premium dengan kolam bisa diperoleh dengan harga jauh di bawah properti sejenis di tempat lain.',
    'Lifestyle & Investment Combined': 'Gaya Hidup & Investasi Menyatu',
    'Unlike pure investment markets, Bali lets you enjoy your asset. When not rented, your property is your private retreat — offering a lifestyle ROI that no spreadsheet can fully capture.': 'Tidak seperti pasar investasi murni, Bali memungkinkan kamu menikmati aset tersebut. Saat tidak disewakan, propertimu menjadi tempat retreat pribadi — menawarkan ROI gaya hidup yang tidak bisa sepenuhnya ditangkap di spreadsheet.',
    'Annual Visitors': 'Pengunjung Tahunan',
    'Average Gross Yield': 'Rata-rata Gross Yield',
    'Annual Appreciation': 'Apresiasi Tahunan',
    'Digital Nomads in Bali': 'Digital Nomad di Bali',
    'Entry-Level Villa Price': 'Harga Villa Entry-Level',
    'Days of Sun Per Year': 'Hari Cerah per Tahun',
    'Best areas to': 'Area terbaik',
    'invest in Bali': 'untuk investasi di Bali',
    'Location is the single most important factor in Bali real estate. Each area has a distinct character, target guest profile, and yield potential.': 'Lokasi adalah faktor tunggal paling penting dalam properti Bali. Setiap area memiliki karakter, profil tamu target, dan potensi yield yang berbeda.',
    'Surf & Lifestyle': 'Selancar & Gaya Hidup',
    'Luxury & Lifestyle': 'Mewah & Gaya Hidup',
    'Premium Lifestyle': 'Gaya Hidup Premium',
    'Clifftop Luxury': 'Mewah di Tebing',
    'Luxury Ocean Views': 'Pemandangan Laut Mewah',
    'Wellness & Culture': 'Wellness & Budaya',
    'Jungle & Spiritual': 'Hutan & Spiritual',
    'Relaxed & Family': 'Santai & Keluarga',
    'Family & Retiree': 'Keluarga & Pensiunan',
    'Beach & Airport': 'Pantai & Bandara',
    "Bali's most popular area for digital nomads and surfers. High occupancy, strong short-term rental demand, and a vibrant café culture make this the top choice for investor-lifestyle buyers.": 'Area paling populer di Bali untuk digital nomad dan peselancar. Occupancy tinggi, permintaan sewa jangka pendek yang kuat, dan kultur kafe yang hidup menjadikan ini pilihan utama pembeli investor-gaya hidup.',
    "Bali's premium lifestyle hub with high-end restaurants, beach clubs, and boutiques. Attracts affluent travelers who pay premium nightly rates, ensuring strong revenue even at lower occupancy.": 'Pusat gaya hidup premium Bali dengan restoran high-end, beach club, dan butik. Menarik wisatawan berkelas yang membayar tarif malam premium, memastikan revenue yang kuat bahkan saat occupancy rendah.',
    'Dramatic clifftop villas with ocean views. The fastest-appreciating area in Bali over the past 5 years. World-class surf, luxury resorts, and a rapidly expanding hospitality scene.': 'Villa dramatis di atas tebing dengan pemandangan laut. Area dengan apresiasi tercepat di Bali dalam 5 tahun terakhir. Selancar kelas dunia, resort mewah, dan ekosistem hospitality yang berkembang cepat.',
    "Bali's spiritual and cultural heart. Consistent year-round demand from wellness seekers, yoga retreats, and cultural tourists. Longer average stays mean lower turnover and management costs.": 'Jantung spiritual dan budaya Bali. Permintaan konsisten sepanjang tahun dari pencari wellness, retreat yoga, dan wisatawan budaya. Rata-rata masa tinggal yang lebih panjang berarti turnover dan biaya manajemen yang lebih rendah.',
    "Bali's most established expat and retiree community. Calm beach, excellent infrastructure, and proximity to the new Sanur harbor and Bali International Hospital make this a stable long-term investment.": 'Komunitas ekspat dan pensiunan paling mapan di Bali. Pantai tenang, infrastruktur yang baik, serta kedekatan dengan pelabuhan Sanur baru dan Bali International Hospital menjadikan ini investasi jangka panjang yang stabil.',
    'Convenient beachside living minutes from the airport. Famous for seafood restaurants and a relaxed atmosphere. Strong demand from families and couples seeking a quieter Bali experience.': 'Kehidupan pantai yang praktis, hanya beberapa menit dari bandara. Terkenal dengan restoran seafood dan suasana santai. Permintaan kuat dari keluarga dan pasangan yang mencari pengalaman Bali yang lebih tenang.',
    'View {name} listings →': 'Lihat listing {name} →',

    'Define Your Goals': 'Tentukan Tujuanmu',
    'Investment yield, lifestyle use, or both? Budget range? Leasehold or freehold? Getting clear on your objectives helps us find the right properties for you.': 'Yield investasi, penggunaan pribadi, atau keduanya? Rentang budget? Leasehold atau freehold? Memperjelas tujuan membantu kami menemukan properti yang tepat untukmu.',
    'Property Search & Viewings': 'Pencarian & Kunjungan Properti',
    "We curate a shortlist based on your criteria and arrange property viewings — either in person or via detailed video tours if you're not yet in Bali.": 'Kami menyusun shortlist berdasarkan kriteriamu dan mengatur kunjungan properti — langsung di lokasi atau via video tour jika kamu belum berada di Bali.',
    'Due Diligence': 'Due Diligence',
    'Once you find a property you love, we conduct thorough legal due diligence — checking land certificates, zoning, permits, and any encumbrances on the title.': 'Setelah kamu menemukan properti yang disukai, kami lakukan due diligence legal menyeluruh — memeriksa sertifikat tanah, zoning, perizinan, dan beban-beban di sertifikat.',
    'Price Negotiation': 'Negosiasi Harga',
    'We negotiate on your behalf to secure the best possible price and terms. Our local market knowledge gives you a significant advantage.': 'Kami bernegosiasi mewakili kamu untuk mendapatkan harga dan syarat terbaik. Pengetahuan pasar lokal kami memberi kamu keunggulan yang signifikan.',
    'Legal Process & Notary': 'Proses Legal & Notaris',
    'We coordinate with a trusted notary to prepare all agreements. A deposit (typically 10%) secures the property during this phase.': 'Kami berkoordinasi dengan notaris terpercaya untuk menyiapkan seluruh perjanjian. Deposit (biasanya 10%) mengamankan properti di fase ini.',
    'Completion & Handover': 'Pelunasan & Serah Terima',
    'Final payment is made and the property is officially transferred. Keys are handed over and we can connect you with our villa management team if needed.': 'Pembayaran akhir dilakukan dan properti resmi berpindah tangan. Kunci diserahkan dan kami bisa menghubungkanmu dengan tim manajemen villa jika dibutuhkan.',

    'Start your Bali': 'Mulai perjalanan',
    'property journey': 'properti Balimu',
    'Our team is available 7 days a week for a free consultation. No pressure, no obligations — just honest advice.': 'Tim kami tersedia 7 hari seminggu untuk konsultasi gratis. Tanpa tekanan, tanpa kewajiban — hanya saran yang jujur.',

    'Leasehold vs Freehold Card': 'Kartu Leasehold vs Freehold',
    'Understanding ownership structures in Bali': 'Memahami struktur kepemilikan di Bali',
    'Legal Process Guide': 'Panduan Proses Legal',
    'Step-by-step through the notary process': 'Langkah demi langkah proses notaris',
    'ROI & Rental Yields': 'ROI & Yield Sewa',
    'How to calculate your real returns': 'Cara menghitung return yang sebenarnya',
    'Neighborhood-by-neighborhood breakdown': 'Rincian per kawasan',

    // === GUIDE — BEST AREAS (header) ===
    'Best Areas to Buy in Bali': 'Area Terbaik untuk Membeli di Bali',
    "A neighborhood-by-neighborhood breakdown of Bali's seven most investable areas — yields, prices, guest profiles, and the trade-offs that never make it into glossy brochures.": 'Rincian tujuh area paling layak investasi di Bali, kawasan per kawasan — yield, harga, profil tamu, dan trade-off yang tidak pernah muncul di brosur mengkilap.',
    'Location First': 'Lokasi Dulu',
    "In Bali, location isn't one factor — it's most of them": 'Di Bali, lokasi bukan sekadar satu faktor — tapi hampir segalanya',
    "Two identical villas, 15 minutes apart, can produce 40% different annual returns. Each area attracts a distinct guest profile, commands its own nightly rate band, and has its own appreciation trajectory. Choosing the right area is the single highest-leverage decision you'll make as a Bali investor.": 'Dua villa yang identik, berjarak 15 menit, bisa menghasilkan return tahunan yang berbeda hingga 40%. Setiap area menarik profil tamu berbeda, memiliki rentang tarif malam sendiri, dan trajectory apresiasi yang berbeda. Memilih area yang tepat adalah keputusan paling krusial untuk investor Bali.',
    'Quick Comparison': 'Perbandingan Cepat',
    'Which area wins what?': 'Area mana unggul di aspek apa?',
    'Area Breakdowns': 'Rincian Area',
    'Seven areas, seven strategies': 'Tujuh area, tujuh strategi',
    'There is no single "best" area — only the best area for your specific investment goals and guest profile.': 'Tidak ada satu area "terbaik" — yang ada hanya area paling cocok untuk tujuan investasi dan profil tamu spesifikmu.',
    'How to Choose': 'Cara Memilih',
    'A 5-step decision framework': 'Framework keputusan 5 langkah',
    'Area-specific questions': 'Pertanyaan spesifik per area',
    'Not Sure Which Area?': 'Masih Bingung Pilih Area?',
    "Let's find the area that fits you": 'Ayo temukan area yang paling cocok untukmu',
    "Share your goals and budget — we'll recommend the 2–3 areas that best match your profile, with real listings to compare.": 'Bagikan tujuan dan budgetmu — kami akan merekomendasikan 2–3 area yang paling sesuai profilmu, lengkap dengan listing nyata untuk dibandingkan.',

    // === GUIDE — OWNERSHIP ===
    'Leasehold vs Freehold in Bali': 'Leasehold vs Freehold di Bali',
    'Understanding the two ownership structures that matter for foreign buyers in Bali — what each one means, which one fits your goals, and how to protect your investment.': 'Memahami dua struktur kepemilikan yang penting untuk pembeli asing di Bali — artinya masing-masing, mana yang cocok untuk tujuanmu, dan cara melindungi investasimu.',
    'The Basics': 'Dasar-dasarnya',
    "Foreigners can't own freehold land — but you have solid options": 'Orang asing tidak bisa memiliki freehold — tapi ada opsi yang solid',
    'Indonesian law reserves the strongest form of land ownership (Hak Milik / freehold) for Indonesian citizens only. But this doesn\'t mean foreign investors are shut out — there are several legal structures that provide strong, long-term rights to use and profit from property in Bali. Knowing which one fits you is half the battle.': 'Hukum Indonesia membatasi kepemilikan tanah terkuat (Hak Milik / freehold) hanya untuk WNI. Tapi ini tidak berarti investor asing tertutup — ada beberapa struktur legal yang memberikan hak kuat dan jangka panjang untuk menggunakan dan menghasilkan pendapatan dari properti di Bali. Memahami mana yang cocok untukmu adalah separuh dari pertempuran.',
    'Side by Side': 'Sandingan Langsung',
    'Leasehold vs Freehold at a glance': 'Leasehold vs Freehold sekilas',
    'Ownership Options': 'Opsi Kepemilikan',
    'Four legal structures for foreign buyers': 'Empat struktur legal untuk pembeli asing',
    'Decision Framework': 'Framework Keputusan',
    'Which structure fits you?': 'Struktur mana yang cocok untukmu?',
    'Red Flags': 'Tanda Bahaya',
    'What to avoid when buying in Bali': 'Hal yang harus dihindari saat membeli di Bali',
    'Talk to a Legal Expert': 'Konsultasi dengan Ahli Legal',
    'Structure matters — get it right': 'Struktur itu penting — jangan sampai salah pilih',
    "Every buyer's situation is unique. Before you commit, we'll connect you with a trusted Indonesian notary and legal advisor who specialize in foreign property transactions.": 'Setiap situasi pembeli itu unik. Sebelum berkomitmen, kami hubungkan kamu dengan notaris Indonesia terpercaya dan penasihat legal yang khusus menangani transaksi properti asing.',

    // === GUIDE — LEGAL PROCESS ===
    'Legal Process for Buying Property in Bali': 'Proses Legal Membeli Properti di Bali',
    'A step-by-step walkthrough of the notary, due diligence, and contract process — what actually happens, how long each stage takes, and where foreign buyers typically get tripped up.': 'Panduan langkah demi langkah proses notaris, due diligence, dan kontrak — apa yang sebenarnya terjadi, berapa lama tiap tahapan, dan di mana pembeli asing biasanya terjebak.',
    'Why This Matters': 'Kenapa Ini Penting',
    "The legal process isn't scary — if you know what to expect": 'Proses legal tidak menakutkan — asal kamu tahu apa yang akan terjadi',
    'Bali property transactions follow a clear legal process. The horror stories you hear usually come from buyers who skipped due diligence, used unqualified notaries, or tried to cut corners on paperwork. Done properly, the process is well-protected by Indonesian law and takes 30–90 days from offer to handover.': 'Transaksi properti di Bali mengikuti proses legal yang jelas. Cerita horor yang sering beredar biasanya berasal dari pembeli yang melewati due diligence, memakai notaris tidak kompeten, atau mencari jalan pintas di paperwork. Dilakukan dengan benar, prosesnya terlindungi hukum Indonesia dan memakan waktu 30–90 hari dari offer sampai serah terima.',
    'The Process': 'Prosesnya',
    'From offer to handover in 8 steps': 'Dari offer ke serah terima dalam 8 langkah',
    'Key Documents': 'Dokumen Penting',
    'What you should actually read': 'Yang benar-benar harus kamu baca',
    'Costs Breakdown': 'Rincian Biaya',
    'Who pays what — typical fees for a Bali transaction': 'Siapa bayar apa — biaya umum untuk transaksi di Bali',
    'Common Pitfalls': 'Kesalahan yang Sering Terjadi',
    'What foreign buyers often miss': 'Yang sering terlewat oleh pembeli asing',
    'Start Legal Due Diligence': 'Mulai Due Diligence Legal',
    'Ready to move forward?': 'Siap melanjutkan?',
    "Once you've found a property, we coordinate the full legal process — notary introduction, due diligence, contract drafting, and completion. You'll have full visibility at every step.": 'Setelah kamu menemukan properti, kami mengoordinasikan seluruh proses legal — pengenalan dengan notaris, due diligence, drafting kontrak, dan closing. Kamu memiliki visibilitas penuh di setiap langkah.',

    // === GUIDE — ROI ===
    'Rental Yields & ROI in Bali': 'Yield Sewa & ROI di Bali',
    'An honest guide to calculating real returns on a Bali villa — gross vs net yield, appreciation, occupancy assumptions, and how to stress-test any investment projection before you commit.': 'Panduan jujur untuk menghitung return riil dari villa Bali — gross vs net yield, apresiasi, asumsi occupancy, dan cara stress-test proyeksi investasi sebelum kamu berkomitmen.',
    'The Real Numbers': 'Angka Sebenarnya',
    'Not every projection tells the full story': 'Tidak semua proyeksi menceritakan cerita yang utuh',
    "Brochures love to quote \"up to 20% gross yield\" — but gross yield is only part of the picture. Once you subtract management fees, maintenance, taxes, platform commissions, and vacancy, your actual cash-in-pocket can be 40–50% lower than the headline number. This guide shows you how to calculate the numbers that actually matter.": 'Brosur gemar mengutip "yield gross sampai 20%" — tapi gross yield hanya sebagian cerita. Setelah dikurangi management fee, maintenance, pajak, komisi platform, dan vacancy, cash riil di kantongmu bisa 40–50% lebih rendah dari angka headline. Panduan ini menunjukkan cara menghitung angka yang benar-benar penting.',
    'Example Calculation': 'Contoh Perhitungan',
    'A real Canggu villa — from gross revenue to net cash': 'Villa nyata di Canggu — dari revenue kotor ke cash bersih',
    'Key Metrics': 'Metrik Penting',
    'The numbers that actually predict returns': 'Angka yang benar-benar memprediksi return',
    'Occupancy & Rates': 'Occupancy & Tarif',
    'How pricing strategy changes everything': 'Bagaimana strategi pricing mengubah segalanya',
    'Stress Testing': 'Stress Test',
    '5 scenarios every investor should run': '5 skenario yang wajib dijalankan setiap investor',
    'Run Your Numbers': 'Hitung Angkamu',
    'Get a real projection for a real villa': 'Dapatkan proyeksi riil untuk villa riil',
    "Send us a property you're considering and we'll run the full numbers for you — conservative, realistic, and transparent. No inflated projections.": 'Kirim properti yang sedang kamu pertimbangkan, kami akan menghitung angkanya untukmu — konservatif, realistis, dan transparan. Tanpa proyeksi yang dilebih-lebihkan.',

    // === CONTACT ===
    'Get in': 'Hubungi',
    'touch': 'kami',
    "We're here to help you find the perfect Bali property. Reach out via WhatsApp, email, or the form below — we respond within 24 hours, 7 days a week.": 'Kami di sini untuk membantu kamu menemukan properti Bali yang tepat. Hubungi via WhatsApp, email, atau form di bawah — kami merespons dalam 24 jam, setiap hari.',
    'WhatsApp (Fastest)': 'WhatsApp (Tercepat)',
    'Usually responds in minutes': 'Biasanya merespons dalam hitungan menit',
    'Email': 'Email',
    'Response within 24 hours': 'Merespons dalam 24 jam',
    'Office': 'Kantor',
    'Open Monday to Friday': 'Buka Senin sampai Jumat',
    'Send us a message': 'Kirim pesan kepada kami',
    "Tell us what you're looking for, we'll reach back": 'Ceritakan apa yang kamu cari, kami akan menghubungimu',
    'Your name': 'Nama kamu',
    'Your email': 'Email kamu',
    'Your WhatsApp number (optional)': 'Nomor WhatsApp (opsional)',
    'What are you looking for?': 'Apa yang kamu cari?',
    'Select an option': 'Pilih opsi',
    'Buying a villa': 'Ingin membeli villa',
    'Buying land': 'Ingin membeli tanah',
    'Renting a villa': 'Ingin menyewa villa',
    'General inquiry': 'Pertanyaan umum',
    'Tell us more': 'Ceritakan lebih detail',
    'Any specific requirements? Budget? Preferred area?': 'Ada kebutuhan khusus? Budget? Area yang diinginkan?',
    'Send Message': 'Kirim Pesan',
    "Thank you! We'll reach out within 24 hours.": 'Terima kasih! Kami akan menghubungi kamu dalam 24 jam.',
    'Find Us': 'Temukan Kami',
    'Our office in Denpasar': 'Kantor kami di Denpasar',
    'Address': 'Alamat',
    'Hours': 'Jam Buka',
    'Open in Google Maps →': 'Buka di Google Maps →',
    'Frequently Asked': 'Sering Ditanyakan',
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

// Helper untuk komponen non-React
export function translate(lang, key) {
  if (lang === 'en') return key
  const dict = translations[lang]
  if (!dict) return key
  return dict[key] ?? key
}
