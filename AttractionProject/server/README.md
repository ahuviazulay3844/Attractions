# AttractionProject — Server (Spring Boot)

שרת REST API לניהול מסלולי טיול, מטיילים, תגובות ותמונות.

## טכנולוגיות

- Java 17
- Spring Boot 3.4.5
- Spring Data JPA
- H2 Database (קובץ מקומי)
- MapStruct
- Maven

## הרצה

### דרישות

- JDK 17+

### הפעלה

```cmd
mvnw.cmd spring-boot:run
```

השרת: **http://localhost:8585**

### H2 Console

| | |
|--|--|
| URL | http://localhost:8585/h2-console |
| JDBC | `jdbc:h2:./AttractionProject1` |
| User | `sa` |
| Password | `1234` |

## מבנה

```
server/src/main/java/com/example/attractionproject/
├── Controller/     # REST API
├── Dto/            # DTOs + Enums (קל, בינוני, קשה...)
├── model/          # JPA Entities
├── Repository/     # Spring Data JPA
├── Service/        # MapStruct Mapper
└── config/         # CORS (WebConfig.java)
```

## ישויות

| ישות | שדות עיקריים |
|------|--------------|
| **Attraction** | שם, זמן, רמת קושי, גיל, מחיר, אזור |
| **Traveler** | שם, מייל, גיל |
| **Comments** | תוכן, **rating (1–5)**, תאריך, קישור למסלול ולמטייל |
| **ImageOfAttraction** | קובץ תמונה, קישור למסלול |

### Enums (ערכים בעברית)

- **DifficultyLevel**: קל, בינוני, קשה
- **Age**: תינוקות, ילדים, נערים, מבוגרים
- **Area**: צפון, דרום, מרכז, נגב

## API Endpoints

### Attraction — `api/Attraction`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל המסלולים |
| GET | `/getAllDto` | כ-DTO |
| GET | `/get/{id}` | לפי id |
| GET | `/getDto/{id}` | לפי id כ-DTO |
| POST | `/add` | הוספה |
| POST | `/addDto` | הוספה (DTO) |
| PUT | `/update` | עדכון |
| PUT | `/updateDto` | עדכון (DTO) |
| DELETE | `/delete/{id}` | מחיקה |

### Traveler — `api/travel`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל המטיילים |
| GET | `/get/{id}` | לפי id |
| POST | `/add` | הוספה |
| PUT | `/update` | עדכון |
| DELETE | `/delete/{id}` | מחיקה |

(+ גרסאות Dto: `/getAllDto`, `/getDto/{id}`, `/addDto`, `/updateDto`)

### Comments — `api/Comments`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל התגובות |
| GET | **`/byAttraction/{id}`** | תגובות למסלול (חדש → ישן) |
| GET | `/get/{id}` | לפי id |
| POST | `/add` | הוספה (תאריך + rating ברירת מחדל 5) |
| PUT | `/update` | עדכון |
| DELETE | `/delete/{id}` | מחיקה |

**POST body לדוגמה:**

```json
{
  "idAttraction": { "id": 1 },
  "traveler": { "idTraveler": 1 },
  "content": "מסלול מעולה",
  "rating": 5
}
```

### ImageOfAttraction — `api/imageAttr`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל התמונות |
| POST | `/addDto` | העלאת קובץ |
| DELETE | `/delete/{id}` | מחיקה |

תמונות נשמרות בתיקייה `images/` בשורש server.

## הזנת מסלול (Postman)

```json
POST /api/Attraction/add

{
  "nameTraveler": "הבנייאס",
  "timeAttraction": "01:23:00",
  "difficultyLevel": "קל",
  "age": "מבוגרים",
  "priceOfAttraction": 1111,
  "area": "צפון"
}
```

## תיקונים חשובים

- **`@JsonIgnore` על getters** ב-`Attraction` ו-`Traveler` (`getComments`, `getListImage`) — מונע JSON מעגלי בתגובות
- **`reloadComment`** ב-`CommentsController` — מחזיר שם מטייל מלא אחרי POST
- **`rating`** — שדה Integer 1–5 ב-`Comments`

## CORS

מותר מ-`http://localhost:5173` (React dev server) — `config/WebConfig.java`

## Client

יש ממשק React מלא ב-`../client` — ראה [client/README.md](../client/README.md)

## בדיקות

```cmd
mvnw.cmd test
```
