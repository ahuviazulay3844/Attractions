# Attraction Project — Client (React)

צד לקוח למערכת ניהול אטרקציות ומסלולי טיול. נבנה ב-React + Vite, מחובר לשרת Spring Boot.

## טכנולוגיות

- React 19
- Vite
- React Router
- Fetch API (ללא ספריות חיצוניות לתקשורת)
- עיצוב CSS מותאם (Design System), תמיכה מלאה ב-RTL

## דרישות מקדימות

- Node.js 18+
- שרת ה-Spring Boot רץ על `http://localhost:8585` (תיקיית `../server`)

## התקנה והרצה

```bash
cd client
npm install
npm run dev
```

הלקוח עולה על: **http://localhost:5173**

> בזמן פיתוח, כל הקריאות ל-`/api` עוברות דרך **proxy** של Vite אל `http://localhost:8585`
> (מוגדר ב-`vite.config.js`), כך שאין בעיות CORS.

## סקריפטים

| פקודה | תיאור |
|--------|--------|
| `npm run dev` | הרצת שרת פיתוח |
| `npm run build` | בנייה ל-production (תיקיית `dist`) |
| `npm run preview` | תצוגה מקדימה של ה-build |
| `npm run lint` | בדיקת ESLint |

## מבנה הפרויקט

```
client/
├── src/
│   ├── api/              # שכבת תקשורת עם השרת
│   │   ├── client.js     # עוטף fetch בסיסי (get/post/put/del/upload)
│   │   ├── attractions.js
│   │   ├── travelers.js
│   │   ├── comments.js
│   │   └── images.js
│   ├── components/       # רכיבי UI לשימוש חוזר
│   │   ├── Navbar.jsx
│   │   ├── Modal.jsx
│   │   ├── Field.jsx     # Input / Select
│   │   ├── States.jsx    # Loading / Error / Empty
│   │   └── Toast.jsx     # הודעות הצלחה/שגיאה
│   ├── constants/
│   │   └── enums.js      # ערכי enum תואמים לשרת
│   ├── pages/            # עמודים (מסכים)
│   │   ├── Home.jsx
│   │   ├── Attractions.jsx
│   │   ├── Travelers.jsx
│   │   ├── Comments.jsx
│   │   └── Images.jsx
│   ├── App.jsx           # ניתוב ראשי + Layout
│   ├── main.jsx          # נקודת כניסה
│   └── index.css         # מערכת עיצוב גלובלית
├── index.html
└── vite.config.js        # כולל proxy ל-API
```

## מסכים

| מסך | יכולות |
|-----|--------|
| **בית** | דף נחיתה עם ניווט מהיר |
| **אטרקציות** | רשימה, הוספה, עריכה, מחיקה (כולל אזור, רמת קושי, גיל, מחיר) |
| **מטיילים** | רשימה, הוספה, עריכה, מחיקה |
| **תגובות** | רשימה, הוספה (קישור לאטרקציה ומטייל), מחיקה |
| **תמונות** | רשימה, העלאת קובץ ושיוך לאטרקציה, מחיקה |

## חיבור לשרת

הבסיס לכל הקריאות הוא `/api` (ראה `src/api/client.js`).
ה-proxy ב-`vite.config.js` מפנה אותו לשרת:

```js
proxy: { '/api': { target: 'http://localhost:8585', changeOrigin: true } }
```

בנוסף, השרת מוגדר לאפשר CORS מ-`http://localhost:5173`
(ראה `server/.../config/WebConfig.java`).
