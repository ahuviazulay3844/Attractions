const UNSPLASH = (id) => `https://images.unsplash.com/photo-${id}?w=900&q=80&auto=format&fit=crop`

// matching image + short description per trip name (client-side only, no server change)
export const TRIP_META = {
  'הבנייאס': {
    image: UNSPLASH('1433086966358-54859d0ed716'),
    tagline: 'מפלים, נחלים ויער ירוק בגליל העליון',
  },
  'נחל דוד - עין גדי': {
    image: UNSPLASH('1501785888041-af3ef285b470'),
    tagline: 'מעיינות מדבריים ונוף מרהיב על ים המלח',
  },
  'מכתש רמון': {
    image: UNSPLASH('1432405972618-c60b0225b8f9'),
    tagline: 'מכתש ענקי, שקיעות ושמי כוכבים',
  },
  'מצדה - שביל הנחש': {
    image: UNSPLASH('1452421822248-d4c2b47f0c81'),
    tagline: 'עלייה תלולה לתצפית היסטורית מרהיבה',
  },
  'הר מירון': {
    image: UNSPLASH('1506905925346-21bda4d32df4'),
    tagline: 'פסגות, אוויר צלול ויער אורן',
  },
  'שמורת החולה': {
    image: UNSPLASH('1505765050516-f72dcac9c60e'),
    tagline: 'אגמים, ציפורים ושבילי טבע רגועים',
  },
  'נחל יהודייה - רמת הגולן': {
    image: UNSPLASH('1469474968028-56623f02e42e'),
    tagline: 'קניונים, מים קרים וקפיצות לבריכות',
  },
  'חוף הבונים': {
    image: UNSPLASH('1507525428034-b723cf961d3e'),
    tagline: 'חוף ים, סלעים ושקיעה על הים התיכון',
  },
  'פארק הירקון - תל אביב': {
    image: UNSPLASH('1502082553048-f009c37129b9'),
    tagline: 'שבילים ירוקים, אופניים ופיקניק',
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
  }
}
