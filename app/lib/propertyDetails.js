// Rich property metadata sourced from the Villa For Sale Detail master doc.
// Keyed by property `slug` so each detail page can render full specs,
// key advantages, and "why you should buy" copy without DB schema changes.

// Curated photo lists (Drive file IDs) — overrides DB `images` when present.
// Picked from full Drive folders for wider compositions that crop well at hero.
const driveImg = (id) => `https://lh3.googleusercontent.com/d/${id}=w1600`

const OLIVIA_IMAGES = [
  '1aXOGqFXFvunk4GX4mqXTcgN0NqYn6chk', // bedroom with art panels
  '180DU7CUrHYCLuNxWhhgovFJxvPHBHgy0', // bedroom curtain wide
  '1mFIrjUSCUCzH42OcDxhrxRZxpmX8eOJJ', // bedroom curtain clean
  '1lI1CwkF7pRNdb63oMLvHAUy_UDidyDUV', // bedroom curtain alt
  '1NU9pyPWr-xSqrsQipFzTwdm95MHn4-rC', // bedroom with art panels (alt angle)
  '1GwHa4SjY0qKipz_ccfAntP7cMqy1bWV_', // bedroom with art (alt)
  '1oFIQ4PsSNbPp480fhrlFFjoLblQvztCn', // pool with plants (wider)
  '1auieTSHb0wrwoNFFeuJ9cL1sjH0x6vOk', // pool with plants
  '1Do1oKoSYSXaMUc6AptZJQXU5RiaBzJun', // workspace with mountain wallpaper
  '1zaXG2c5dxrK3E0PeUkgtxU1P3XJK7lTP', // workspace
  '1ITO53DvVOHYELa6JlaIknJSYA5xoaTX0', // bathroom (wide)
  '1p_-_Urn_t1qWLg8ays-jE0WmU7259Zrl', // table
].map(driveImg)

const BAILE_IMAGES = [
  '1rFnraGRF1AfxtOq4_olBbJ-VKjikEZwl', // bedroom with chandelier
  '1kWYWi47J_n3u1c5HNIIEBg4-eE7A46Pb', // bedroom wide
  '1K2-nOZ12WPMDHiGbOle_j0o-7_hdjKVI', // pool view
  '1k3jZ9W_36diWdvISh8OzABqL2XVdCJOv', // bedroom variant
  '1t98oqtQtmCEUuaoCkPpCojikPpcNdhAP', // bedroom angle
  '1CRdnhFLdBBV7ZaBDcSoSBTirgOeJ7jES', // bedroom with TV
  '1jVqymzHY-2NfzHQ8VsiaDT6ArrBv53uR', // bedroom chandelier alt
  '1jztuxOyEMPfadDHJI54xNi16xt4qQnKL', // bedroom alt
  '1vxHKOHR9SqjYJhPVqZyDLAsqgTOc73dw', // bathroom mirror+sink+shower
  '1pDtohhCCkkV58h1AJeRC-r8r_nxBOYLX', // bathroom shower
  '1BRJU3JuuzagKWJw6_qZ1pMgS2wgz5QTk', // bathroom toilet+vanity
  '1Q2vLuwLOOz2FAranklRXLxnbKgfgwzff', // bathroom mirror sink alt
].map(driveImg)

const CASA_IMAGES = [
  '1HrAuN_6cj3k2IwmEcbvS2WQGHh9vxiXs', // bedroom with rose petals
  '115h4SRkGy0vd5Pr4YBQBh_rP7qM2QFMZ', // wardrobe / closets wide
  '14ih6hA0Qn29LxPvnxEKAQnRp9XWOil8U', // bedroom side angle
  '1751e1pcYclLZyHl9H0z99485uWUvXOAR', // bedroom rose petals
  '1yYv973H0708TZZgWNBevWdeBxsa5YnHP', // bedroom with rug + door
  '1EteTRIOTvvGcTr3W5g56J_I3vvBMjkUc', // bedroom alt
  '1NJXy0T7zR2mMPM0dR1DFf3Pmy0JaQUuk', // bedroom open garden door
  '1MT_NfvAHqyIEVWCxZuRczzOP2TLn8Liz', // pool with mural
  '1ZLoMp0Gb2jx6JdPZcJPj2GuxpJQq3EUI', // closet
  '1iZFzB0_RU2WgxqSr2AIMJlPNsNphYB4g', // bedroom rose petals alt
  '1mkjCQY4KB0QTwJg-G3ecRiGHHnNZnCe6', // outdoor pool wide
].map(driveImg)

export const PROPERTY_DETAILS = {
  'duality-villas-ubud': {
    villa_id: 'PV001',
    year_built: 2026,
    zoning: 'Yellow Zone (Residential)',
    internet: 'Fiber Optic',
    bathroom_type: 'bathtub',
    subtitle: 'Brand New Mediterranean-Modern Sanctuary | Near Completion 2026',
    map_url: 'https://maps.app.goo.gl/uT4qQ58NzzCkbYNV8',
    address: 'Duality Villas, Singakerta, Ubud',

    key_features: [
      { title: 'Bedrooms', text: '2 Luxurious Bedrooms with premium ensuite bathrooms and bathtub.' },
      { title: 'Living Area', text: 'Sun-drenched open-plan living and dining space.' },
      { title: 'Private Pool', text: '2m x 6m lap pool.' },
      { title: 'Furnishings', text: 'Fully furnished with high-quality, curated furniture and premium finishes.' },
    ],

    investment_structure: [
      'Leasehold Option: IDR 2,500,000,000 per unit (25-year term).',
      'Freehold Option (SHM): IDR 6,000,000,000 for 2 units.',
      'Extension: Guaranteed extension at market price.',
      'Notary Fee: from buyer.',
      'Legal: SLF, PBG, and Pondok Wisata (Holiday Rental Permit) are currently in progress.',
    ],

    why_buy: [
      {
        title: 'Architecture-Led Revenue',
        text: "In today's market, 'aesthetic' is a powerful business model. Our twin-gable, open-plan design is curated specifically to maximize social media visibility and drive direct booking conversions, significantly lowering customer acquisition costs.",
      },
      {
        title: 'Proven Strategic Location',
        text: "Nestled on the key route to Gianyar's top destinations, the villa offers excellent visibility. It serves as a perfect hub for travelers wanting a genuine Bali experience without sacrificing accessibility to Sanur or Denpasar.",
      },
      {
        title: 'Tangible Asset, Immediate Returns',
        text: 'Unlike high-risk off-plan projects, Duality Villas is near completion (Estimated June 2026). This offers an accelerated path to ROI and minimizes development risks.',
      },
    ],

    nearby: [
      { name: 'Bali Bird Park & Bali Zoo', distance: '3 km' },
      { name: 'Sukawati Art Market', distance: '4 km' },
      { name: 'Tegenungan Waterfall', distance: '5 km' },
      { name: 'Ubud Center', distance: '12 km' },
      { name: 'Sanur Beach', distance: '13 km' },
      { name: 'Denpasar City Center', distance: '14 km' },
      { name: 'Ngurah Rai International Airport', distance: '28 km' },
    ],

    other_details: {
      'Living Area': 'Enclosed',
      'Dining Area': 'Enclosed',
      'Kitchen': 'Enclosed',
      'Storage': 'Yes',
      'Terrace': 'Yes',
      'Balcony': 'Yes',
      'Air Conditioned': '3',
      'Parking': 'Open Car',
      'Parking Size': '2',
      'Floor Level': '2',
      'Water': 'PDAM',
      'Electricity Supply': '5,500 W (pre-paid token)',
      'Furniture': 'Fully Furnished',
      'Property Style': 'Minimalist Modern',
      'Views': 'Rice Field',
      'Pool Size': '2 x 6 m',
      'Building Permit': 'IMB / SLFF / PBG available; PKKPR / KKKPR, ITR available',
    },
  },

  'casa-bei-villa-canggu': {
    villa_id: 'PV002',
    year_built: 2023,
    zoning: 'Yellow Zone (Residential)',
    internet: 'Fiber Optic',
    bathroom_type: 'shower',
    subtitle: 'Modern Sophistication | Tropical Privacy | Unmatched Accessibility',
    map_url: 'https://maps.app.goo.gl/uT4qQ58NzzCkbYNV8',
    address: 'Jl. Tirta Jaya Gg. Dewi Danu No.10, Kerobokan, Kuta Utara, Badung, Bali 80361',
    images: CASA_IMAGES,

    key_features: [
      { title: 'Two Private Suites', text: 'Each bedroom features a spacious ensuite bathroom, a flat-screen TV, and a dedicated workspace—perfect for a modern lifestyle.' },
      { title: 'Tropical Living', text: 'A bright, cozy living area flows directly into the private swimming pool, creating a serene atmosphere for relaxation.' },
      { title: 'Gourmet Kitchen', text: 'A fully equipped, modern kitchen adjoins the dining and sitting areas.' },
      { title: 'Exclusive Rooftop Lounge', text: "The villa's standout feature is the cozy rooftop terrace, furnished with comfortable cushions for sunset viewing or intimate evening gatherings." },
    ],

    investment_structure: [
      'Freehold (SHM): IDR 3,200,000,000.',
      'Notary Fee: from buyer.',
      'Legal: SLF, PBG currently in progress.',
    ],

    why_buy: [
      {
        title: 'Unmatched Accessibility',
        text: "Strategically located at the junction of Canggu, Umalas, and Kerobokan, offering rare and easy access for both cars and motorbikes to Bali's most popular destinations.",
      },
      {
        title: 'Purpose-Built for Modern Living',
        text: 'Designed with the modern professional in mind, featuring dedicated workspaces in every bedroom and a smart two-storey layout that maximizes every inch of space.',
      },
      {
        title: 'Exclusive Private Retreat',
        text: 'Offers a tranquil escape from the crowds, highlighted by a unique rooftop lounge perfect for private sunset relaxation and intimate gatherings.',
      },
    ],

    nearby: [
      { name: 'Canggu Center', distance: '4.2 km' },
      { name: 'Finns Beach Club & Atlas Beach Fest (Berawa)', distance: '5.8 km' },
      { name: 'Echo Beach & Batu Bolong Beach', distance: '6.5 km' },
      { name: 'La Brisa Beach Club', distance: '6.8 km' },
      { name: 'Seminyak Area (Petitenget)', distance: '7.2 km' },
      { name: 'Tanah Lot Temple', distance: '10 km' },
      { name: 'Ngurah Rai International Airport', distance: '16 km' },
    ],

    other_details: {
      'Living Area': 'Enclosed',
      'Dining Area': 'Enclosed',
      'Kitchen': 'Enclosed',
      'Storage': 'Yes',
      'Terrace': 'Yes',
      'Balcony': 'Yes',
      'Air Conditioned': '3',
      'Parking': 'Open Car',
      'Parking Size': '2',
      'Floor Level': '2',
      'Water': 'PDAM',
      'Electricity Supply': '5,500 W (pre-paid token)',
      'Furniture': 'Fully Furnished',
      'Property Style': 'Minimalist Modern',
      'Views': '—',
      'Pool Size': '3 x 7 m',
      'Building Permit': 'IMB / SLFF / PBG available; PKKPR / KKKPR, ITR available',
    },
  },

  'baile-bali-villa-jimbaran': {
    villa_id: 'PV003',
    year_built: 2024,
    zoning: 'Yellow Zone (Residential)',
    internet: 'Fiber Optic',
    bathroom_type: 'shower',
    subtitle: 'Prime 2BR Villa in Jimbaran – 20 Mins to Airport & Close to Seafood Beaches',
    map_url: 'https://maps.app.goo.gl/STtNxB471FMVEsbu9',
    address: 'Kompleks Dharman Village, Jl. Nirmala Indah No B4, Jimbaran, Kuta Sel., Badung, Bali 80361',
    images: BAILE_IMAGES,

    key_features: [
      { title: 'Modern Privacy & Comfort', text: 'Features a stylish enclosed living area with direct access to a 3 x 7 m private pool, blending indoor convenience with outdoor relaxation.' },
      { title: 'Dual-Suite Design', text: 'Two spacious bedrooms equipped with individual Smart TVs and custom wardrobes; the master includes an ensuite, while the second bedroom features a private balcony.' },
      { title: 'Ready-to-Move-In (Turnkey)', text: 'Fully furnished with premium facilities — Saphire beds, a high-end kitchen set, and full modern appliances.' },
    ],

    investment_structure: [
      'Freehold (SHM): IDR 3,150,000,000.',
      'Notary Fee: from buyer.',
      'Legal: SLF, PBG available.',
    ],

    why_buy: [
      {
        title: 'Prime Strategic Location',
        text: "Unbeatable convenience — 20 mins to the Airport, 5 mins to Sidewalk Mall, and a short drive to Jimbaran's world-famous seafood beaches.",
      },
      {
        title: 'Smart "Enclosed" Design',
        text: 'The enclosed living area provides total privacy and perfect climate control, making it much more comfortable than open-living villas.',
      },
      {
        title: 'Secure & Peaceful',
        text: 'Located inside the Dharman Village gated complex, offering better security and a quieter environment compared to standalone villas.',
      },
      {
        title: 'Designed for Modern Living',
        text: "Featuring a warm, 'homey' atmosphere with dedicated workspaces in each bedroom — perfectly suited for those seeking a productive digital nomad lifestyle or a serene permanent residence.",
      },
    ],

    nearby: [
      { name: 'Sidewalk Jimbaran Mall', distance: '1.5 km' },
      { name: "Pepito Supermarket, McDonald's & KFC", distance: '1.2 km' },
      { name: 'Kedonganan & Kelan Beach (Seafood Hub)', distance: '3.8 km' },
      { name: 'Jimbaran Beach', distance: '4.2 km' },
      { name: 'GWK Cultural Park', distance: '4.5 km' },
      { name: 'Ngurah Rai International Airport', distance: '4.5 km' },
      { name: 'Nusa Dua (ITDC Area)', distance: '7.8 km' },
      { name: 'Uluwatu Temple', distance: '14.5 km' },
    ],

    other_details: {
      'Living Area': 'Enclosed',
      'Dining Area': 'Enclosed',
      'Kitchen': 'Enclosed',
      'Storage': 'Yes',
      'Terrace': 'Yes',
      'Balcony': 'Yes',
      'Air Conditioned': '3',
      'Parking': 'Open Car',
      'Parking Size': '2',
      'Floor Level': '2',
      'Water': 'Deep Well',
      'Electricity Supply': '5,500 W (pre-paid token)',
      'Furniture': 'Fully Furnished',
      'Property Style': 'Minimalist Modern',
      'Views': '—',
      'Pool Size': '3 x 7 m',
      'Building Permit': 'IMB / SLFF / PBG available; PKKPR / KKKPR, ITR available',
    },
  },

  'olivia-sanur-workstay': {
    villa_id: 'PV004',
    year_built: 2026,
    zoning: 'Yellow Zone (Residential)',
    internet: 'Fiber Optic',
    bathroom_type: 'shower',
    subtitle: 'Prime Boutique Workstay Investment | Leasehold 19 Years Remaining | Completion May 2026',
    map_url: 'https://maps.app.goo.gl/tAGDyMzzhsPQCDhM9',
    address: 'Gg. Melati II No.14, Sanur Kauh, Denpasar Selatan, Denpasar, Bali 80228',
    images: OLIVIA_IMAGES,

    key_features: [
      { title: 'Nomad-Centric Design', text: 'Purpose-built for remote workers with ergonomic workspaces and high-speed infrastructure in every suite.' },
      { title: 'High-Yield Configuration', text: '11 boutique units (including 3 lofts) optimized for maximum revenue-per-square-meter.' },
      { title: 'Prime Sanur Location', text: 'Minutes from Icon Bali Mall and Bali International Hospital in a high-capital appreciation zone.' },
      { title: 'Immediate ROI', text: 'Handover timed perfectly for the 2026 peak season with a secure 19-year lease horizon.' },
      { title: 'Secure Legal Foundation', text: 'Fully compliant with PBG (Building Permit) available for investor peace of mind.' },
    ],

    investment_structure: [
      'Leasehold Option: IDR 4,500,000,000 (19-year term).',
      'Notary Fee: from buyer.',
      'Legal: SLF, PBG available.',
    ],

    why_buy: [
      {
        title: 'High-Growth Area',
        text: 'Strategically located in the "New Sanur" district, benefiting from massive equity growth driven by the Bali International Hospital and Icon Bali Mall.',
      },
      {
        title: 'Recession-Resistant Niche',
        text: 'Specifically designed for the Digital Nomad market, offering higher occupancy stability and longer average stays than traditional tourism.',
      },
      {
        title: 'Operational Simplicity',
        text: 'Engineered for high efficiency with a lean staffing model and self-sufficient utilities, ensuring maximum Net Operating Income (NOI).',
      },
      {
        title: 'Secure Long-Term Asset',
        text: 'A solid 19-year leasehold with a verified PBG permit provides a clear, safe, and profitable exit strategy for the future.',
      },
    ],

    nearby: [
      { name: 'Sanur Beach', distance: '1.4 km' },
      { name: 'Sindhu Night Market', distance: '1.9 km' },
      { name: 'Massimo Italian Restaurant', distance: '2.1 km' },
      { name: 'Icon Bali Mall', distance: '2.2 km' },
      { name: 'Mertasari Beach', distance: '2.5 km' },
      { name: 'Sanur Harbour', distance: '3.2 km' },
      { name: 'Legian Area', distance: '10.5 km' },
      { name: 'Ngurah Rai International Airport', distance: '12 km' },
      { name: 'Seminyak Area', distance: '12.5 km' },
      { name: 'Canggu Area', distance: '16.5 km' },
    ],

    other_details: {
      'Public Pool': 'Yes',
      'Shared Kitchen': 'Yes',
      'Reading Corner': 'Open',
      'Lobby & Reception': 'Open',
      'Storage': 'Yes',
      'Terrace': 'No',
      'Balcony': 'No',
      'Air Conditioned': 'All Bedrooms',
      'Parking': 'Scooters Only',
      'Car Parking Size': '1',
      'Floor Level': '2',
      'Water': 'Deep Well',
      'Electricity Supply': '16,500 W (post-paid centralized)',
      'Furniture': 'Fully Furnished',
      'Property Style': 'Minimalist Modern',
      'Views': '—',
      'Pool Size': '3 x 5 m',
      'Building Permit': 'IMB / SLFF / PBG in process; PKKPR / KKKPR, ITR available',
    },
  },
}

export function getPropertyDetails(slug) {
  return PROPERTY_DETAILS[slug] || null
}
