# AttractionProject — מסלולי טיול בישראל

אפליקציית Full Stack לגלישה, סינון, דירוג ושמירת מסלולי טיול בישראל — עם תגובות, מועדפים והרשמה אופציונלית.

## מבנה הפרויקט

```
AttractionProject/
├── server/          ← Spring Boot (Java 17) — REST API + H2
├── client/          ← React + Vite — ממשק משתמש
└── README.md
```

## טכנולוגיות

| שכבה | טכנולוגיה |
|------|-----------|
| Backend | Java 17, Spring Boot 3.4.5, Spring Data JPA, H2, MapStruct |
| Frontend | React 19, Vite, React Router |
| Auth (client) | localStorage — אופציונלי, לא חובה לגלישה |

## הרצה מהירה

### 1. שרת

```cmd
cd server
mvnw.cmd spring-boot:run
```

השרת: **http://localhost:8585**

### 2. Client

```cmd
cd client
npm install
npm run dev
```

האתר: **http://localhost:5173**

> בפיתוח, Vite מפנה `/api` לשרת (port 8585). CORS מוגדר ב-`server/.../config/WebConfig.java`.

### H2 Console

- http://localhost:8585/h2-console
- JDBC: `jdbc:h2:./AttractionProject1`
- User: `sa` / Password: `1234`

---

## מה האפליקציה יודעת לעשות

### מסלולים (Attractions)
- **24+ מסלולים** בישראל (בנייאס, עין גדי, מכתש רמון, תל דן, נחל עיון, בית שאן ועוד)
- כרטיס עם **תמונה**, תיאור, דירוג כוכבים, תגובות
- **סינון מתקדם** (כפתור נפתח/נסגר): חיפוש חופשי, אזור, גיל, קושי, זמן משוער, נגישות/משפחות
- **דף מסלול** — מידע מלא + תגובות + דירוג

### תגובות ודירוגים
- כל מסלול עם **תגובות משלו**
- דירוג **1–5 כוכבים** בכל תגובה (שדה `rating` בשרת)
- ממוצע דירוג מחושב מתגובות עם כוכבים

### מועדפים והרשמה (client)
- **הרשמה / התחברות** — אופציונלי (Navbar)
- **שמירת מסלול** — רק למשתמש מחובר
- **מועדפים** — רשימה אישית per user
- התחברות חכמה: אימייל לא תקין → שגיאה | אימייל לא רשום → מעבר להרשמה | סיסמה שגויה → הודעה מדויקת
- **הצג/הסתר סיסמה** (עין) בטופס התחברות והרשמה

### גלריה
- תמונות Unsplash תואמות לכל מסלול (client-side mapping ב-`tripImages.js`)

---

## הזנת נתונים (Postman / API)

הנתונים נכנסים דרך **POST** — כמו שהוזן טיול הבנייאס:

```http
POST http://localhost:8585/api/Attraction/add
Content-Type: application/json
```

```json
{
  "nameTraveler": "הבנייאס",
  "timeAttraction": "01:23:00",
  "difficultyLevel": "קל",
  "age": "מבוגרים",
  "priceOfAttraction": 1111,
  "area": "צפון"
}
```

### Enums (ערכים בעברית)

| שדה | ערכים |
|-----|--------|
| difficultyLevel | קל, בינוני, קשה |
| age | תינוקות, ילדים, נערים, מבוגרים |
| area | צפון, דרום, מרכז, נגב |

### דוגמת תגובה עם כוכבים

```json
POST /api/Comments/add

{
  "idAttraction": { "id": 1 },
  "traveler": { "idTraveler": 1 },
  "content": "מסלול מדהים!",
  "rating": 5
}
```

---

## API עיקרי

| משאב | Base path |
|------|-----------|
| מסלולים | `api/Attraction` |
| מטיילים | `api/travel` |
| תגובות | `api/Comments` |
| תמונות | `api/imageAttr` |

Endpoints נפוצים: `GET /getAll`, `GET /get/{id}`, `POST /add`, `PUT /update`, `DELETE /delete/{id}`

**תגובות:**
- `GET /api/Comments/byAttraction/{id}` — תגובות למסלול בודד (ממוין מהחדש לישן)

פירוט מלא: [server/README.md](server/README.md)

---

## מסכי Client

| נתיב | תיאור |
|------|--------|
| `/` | דף בית — Hero, מסלולים מומלצים, סינון לפי אזור |
| `/attractions` | כל המסלולים + פילטרים + הוספת מסלול |
| `/attractions/:id` | פרטי מסלול, תגובות, דירוג, שמירה |
| `/favorites` | מועדפים (דורש התחברות) |
| `/images` | גלריית תמונות |
| `/login` / `/register` | התחברות / הרשמה (אופציונלי) |
| `/comments` | ניהול תגובות |
| `/travelers` | ניהול מטיילים |

פירוט Client: [client/README.md](client/README.md)

---

## הערות חשובות

- **תמונות מסלולים** — mapping ב-client (`client/src/constants/tripImages.js`), לא בשרver
- **מועדפים / משתמשים** — localStorage בדפדפן (לא ב-DB)
- **JsonIgnore** על getters ב-`Attraction` / `Traveler` — מונע JSON אינסופי בתגובות

## בדיקות

```cmd
cd server
mvnw.cmd test
```

```cmd
cd client
npm run build
```
