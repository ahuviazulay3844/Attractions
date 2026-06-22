# AttractionProject — Client (React)

ממשק משתמש לגלישה במסלולי טיול בישראל — סינון, דירוגים, תגובות, מועדפים והרשמה אופציונלית.

## טכנולוגיות

- React 19 + Vite
- React Router 7
- CSS מותאם (RTL, עברית)
- Fetch API — ללא axios
- Auth + Favorites — localStorage

## דרישות

- Node.js 18+
- שרת Spring Boot על `http://localhost:8585`

## הרצה

```cmd
cd client
npm install
npm run dev
```

**http://localhost:5173**

Proxy: `/api` → `http://localhost:8585` (`vite.config.js`)

## סקריפטים

| פקודה | תיאור |
|--------|--------|
| `npm run dev` | שרת פיתוח |
| `npm run build` | build ל-production |
| `npm run preview` | תצוגה מקדימה |
| `npm run lint` | ESLint |

## מבנה

```
client/src/
├── api/                 # attractions, travelers, comments, images
├── components/
│   ├── Navbar.jsx
│   ├── TripCard.jsx
│   ├── TripFilters.jsx  # סינון + חיפוש (נפתח/נסגר)
│   ├── StarRating.jsx   # כוכבים צבעוניים
│   ├── SaveTripButton.jsx
│   ├── Icons.jsx        # SVG מונוכרומטי
│   ├── Field.jsx        # Input, PasswordInput (עין), Select
│   ├── Modal.jsx, Toast.jsx, States.jsx
├── constants/
│   ├── enums.js         # ערכי enum תואמים לשרver
│   ├── tripImages.js    # metadata + mapping per trip
│   └── tripImageArt.js  # SVG artwork (offline, no external URLs)
├── context/
│   └── AuthContext.jsx
├── pages/
│   ├── Home.jsx
│   ├── Attractions.jsx
│   ├── TripDetail.jsx   # מידע + תגובות + דירוג
│   ├── Favorites.jsx
│   ├── Images.jsx       # גלריה
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Comments.jsx
│   └── Travelers.jsx
├── utils/
│   ├── auth.js          # הרשמה/התחברות + ולידציית אימייל
│   ├── favorites.js     # מועדפים per user
│   ├── ratings.js       # ממוצע דירוג מתגובות
│   └── tripUtils.js     # פילטרים, זמן, נגישות
├── App.jsx
└── index.css
```

## מסכים ויכולות

| מסך | יכולות |
|-----|--------|
| **בית** | Hero, מסלולים מומלצים, קישור לפי אזור |
| **מסלולים** | רשימה, פילטרים משולבים, הוספת מסלול |
| **פרטי מסלול** | תמונה, מידע, כוכבים, תגובות, פרסום תגובה+דירוג, שמור מסלול |
| **מועדפים** | מסלולים שמורים (רק מחובר) |
| **גלריה** | תמונה לכל מסלול |
| **התחברות** | אימייל + סיסמה, עין להצגה, מעבר להרשמה אם לא רשום |
| **הרשמה** | שם, אימייל, סיסמה — אופציונלי |
| **תגובות / מטיילים** | CRUD דרך API |

## סינון וחיפוש

כפתור **"סינון וחיפוש"** — פותח/סוגר פאנל:

- חיפוש חופשי (שם, מילות מפתח)
- אזור · גיל · רמת קושי
- זמן: עד שעה / 1–3 שעות / מעל 3 שעות
- נגישות: עגלות / ילדים / משפחות
- שילוב כל הפילטרים + "נקה הכל"

## הרשמה והתחברות

- **לא חובה** — אפשר לגלוש בלי חשבון
- **מועדפים + שמור מסלול** — דורש התחברות
- ולידציית אימייל (`name@domain.com`)
- אימייל לא רשום → מעבר אוטומטי להרשמה עם אימייל מולא
- סיסמה שגויה בלבד → "הסיסמה שגויה"
- הצג/הסתר סיסמה (אייקון עין)

נתונים נשמרים ב-`localStorage` (`trip-app-users`, `trip-app-session`, `saved-trips-{userId}`).

## תמונות מסלולים

לא מהשרver — SVG מקומי ב-`constants/tripImageArt.js` + metadata ב-`tripImages.js`. עובד גם כש-Unsplash/Wikimedia חסומים ברשת.

## דירוגים

- כל תגובה עם `rating` 1–5 (נשלח לשרver)
- כוכבים מוצגים בזהב/אפור לפי הדירוג
- ממוצע מסלול — מחושב מתגובות עם כוכבים (fallback ל-baseRating ב-tripImages)

## חיבור ל-API

```js
// src/api/client.js
const BASE_URL = '/api'
```

Endpoints בשימוש עיקרי:
- `GET /api/Attraction/getAll`
- `GET /api/Comments/byAttraction/{id}`
- `POST /api/Comments/add` (כולל `rating`)
