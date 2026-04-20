// Konstanta kontak & lokasi terpusat — dipakai di seluruh site supaya
// kalau nomor/alamat/jam berubah, cukup edit di satu tempat.

export const SITE_WA = '6282122973363'
export const SITE_WA_DISPLAY = '+62 821-2297-3363'
export const SITE_EMAIL = 'info@greatbaliproperties.com'

export const SITE_ADDRESS_LINES = [
  'Jln Bukit Sari Utara No.88X',
  'Padangsambian Kaja, Denpasar Barat',
  'Denpasar City, Bali 80117',
]
export const SITE_ADDRESS_ONELINE =
  'Jln Bukit Sari Utara No.88X, Padangsambian Kaja, Denpasar Barat, Denpasar City, Bali 80117'
export const SITE_MAP_QUERY = encodeURIComponent(
  'Jln Bukit Sari Utara No.88X, Padangsambian Kaja, Denpasar Barat, Bali 80117'
)
export const SITE_MAP_URL = `https://maps.google.com/?q=${SITE_MAP_QUERY}`
export const SITE_MAP_EMBED = `https://www.google.com/maps?q=${SITE_MAP_QUERY}&output=embed`

export const SITE_HOURS = {
  en: [
    { days: 'Monday – Friday', time: '9:00am – 6:00pm' },
    { days: 'Saturday – Sunday', time: 'Closed (WhatsApp still active)' },
  ],
  id: [
    { days: 'Senin – Jumat', time: '09.00 – 18.00' },
    { days: 'Sabtu – Minggu', time: 'Tutup (WhatsApp tetap aktif)' },
  ],
}
// Short hours label for cards
export const SITE_HOURS_SHORT = {
  en: 'Monday – Friday, 9am – 6pm',
  id: 'Senin – Jumat, 09.00 – 18.00',
}

// Helper: bikin link WhatsApp dengan pesan awal yang sudah terisi untuk properti.
// `propertyTitle` opsional — kalau kosong, pakai pesan default umum.
export function waLinkFor(propertyTitle, lang = 'en', wa = SITE_WA) {
  let text
  if (propertyTitle) {
    text = lang === 'id'
      ? `Halo, saya tertarik dan ingin tanya lebih lanjut tentang "${propertyTitle}".`
      : `Hello, I'd like to ask more about "${propertyTitle}".`
  } else {
    text = lang === 'id'
      ? 'Halo, saya ingin bertanya tentang properti di Bali.'
      : 'Hello, I\'d like to ask about properties in Bali.'
  }
  return `https://wa.me/${wa}?text=${encodeURIComponent(text)}`
}

// General CTA link (no specific property)
export function waLinkGeneral(lang = 'en') {
  return waLinkFor(null, lang)
}
