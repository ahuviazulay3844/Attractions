const UNSPLASH = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`

// matching image + metadata per trip name (client-side only, no server change)
export const TRIP_META = {
  'הבנייאס': {
    image: UNSPLASH('1433086966358-54859d0ed716'),
    tagline: 'מפלים, נחלים ויער ירוק בגליל העליון',
    keywords: ['מפל', 'מים', 'נחל', 'גליל', 'צפון', 'טבע'],
    strollerFriendly: true,
    kidFriendly: true,
    familyFriendly: true,
    baseRating: 4.8,
    baseReviews: 24,
  },
  'נחל דוד - עין גדי': {
    image: UNSPLASH('1501785888041-af3ef285b470'),
    tagline: 'מעיינות מדבריים ונוף מרהיב על ים המלח',
    keywords: ['מעיין', 'מדבר', 'ים המלח', 'נחל', 'תצפית', 'דרום'],
    strollerFriendly: false,
    kidFriendly: true,
    familyFriendly: true,
    baseRating: 4.9,
    baseReviews: 31,
  },
  'מכתש רמון': {
    image: UNSPLASH('1432405972618-c60b0225b8f9'),
    tagline: 'מכתש ענקי, שקיעות ושמי כוכבים',
    keywords: ['מכתש', 'נגב', 'שקיעה', 'כוכבים', 'תצפית', 'מדבר'],
    strollerFriendly: false,
    kidFriendly: false,
    familyFriendly: false,
    baseRating: 4.7,
    baseReviews: 19,
  },
  'מצדה - שביל הנחש': {
    image: UNSPLASH('1452421822248-d4c2b47f0c81'),
    tagline: 'עלייה תלולה לתצפית היסטורית מרהיבה',
    keywords: ['מצדה', 'היסטוריה', 'תצפית', 'שביל', 'דרום', 'זריחה'],
    strollerFriendly: false,
    kidFriendly: false,
    familyFriendly: false,
    baseRating: 4.6,
    baseReviews: 22,
  },
  'הר מירון': {
    image: UNSPLASH('1506905925346-21bda4d32df4'),
    tagline: 'פסגות, אוויר צלול ויער אורן',
    keywords: ['הר', 'פסגה', 'יער', 'גליל', 'צפון', 'טיול'],
    strollerFriendly: false,
    kidFriendly: true,
    familyFriendly: true,
    baseRating: 4.5,
    baseReviews: 14,
  },
  'שמורת החולה': {
    image: UNSPLASH('1505765050516-f72dcac9c60e'),
    tagline: 'אגמים, ציפורים ושבילי טבע רגועים',
    keywords: ['ציפורים', 'אגם', 'שמורה', 'משפחה', 'צפון', 'טבע'],
    strollerFriendly: true,
    kidFriendly: true,
    familyFriendly: true,
    baseRating: 4.7,
    baseReviews: 18,
  },
  'נחל יהודייה - רמת הגולן': {
    image: UNSPLASH('1469474968028-56623f02e42e'),
    tagline: 'קניונים, מים קרים וקפיצות לבריכות',
    keywords: ['קניון', 'מים', 'גולן', 'קפיצה', 'מפל', 'צפון'],
    strollerFriendly: false,
    kidFriendly: false,
    familyFriendly: false,
    baseRating: 4.9,
    baseReviews: 27,
  },
  'חוף הבונים': {
    image: UNSPLASH('1507525428034-b723cf961d3e'),
    tagline: 'חוף ים, סלעים ושקיעה על הים התיכון',
    keywords: ['חוף', 'ים', 'שקיעה', 'מרכז', 'קיץ', 'משפחה'],
    strollerFriendly: true,
    kidFriendly: true,
    familyFriendly: true,
    baseRating: 4.4,
    baseReviews: 16,
  },
  'פארק הירקון - תל אביב': {
    image: UNSPLASH('1502082553048-f009c37129b9'),
    tagline: 'שבילים ירוקים, אופניים ופיקניק',
    keywords: ['פארק', 'אופניים', 'פיקניק', 'ירקון', 'תל אביב', 'מרכז'],
    strollerFriendly: true,
    kidFriendly: true,
    familyFriendly: true,
    baseRating: 4.3,
    baseReviews: 20,
  },
}

const AREA_FALLBACK = {
  צפון: UNSPLASH('1519681393784-d120267933ba'),
  דרום: UNSPLASH('1500534623283-312aade485b7'),
  נגב: UNSPLASH('1426604966848-d7adac402bff'),
  מרכז: UNSPLASH('1439066615861-d1af74d74000'),
}

export function getTripMeta(trip) {
  const name = trip?.nameTraveler || ''
  if (TRIP_META[name]) return TRIP_META[name]
  return {
    image: AREA_FALLBACK[trip?.area] || UNSPLASH('1470770841072-f978cf4d019e'),
    tagline: `מסלול טיול באזור ${trip?.area || 'ישראל'}`,
    keywords: [trip?.area, trip?.difficultyLevel].filter(Boolean),
    baseRating: 4.0,
    baseReviews: 5,
  }
}
