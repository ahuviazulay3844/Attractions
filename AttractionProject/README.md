# AttractionProject

אפליקציית Spring Boot לניהול אטרקציות ומסלולי טיול — מטיילים, תגובות ותמונות.

## טכנולוגיות

- Java 17
- Spring Boot 3.4.5
- Spring Data JPA
- H2 Database
- MapStruct
- Lombok
- Maven

## הרצה

### דרישות

- JDK 17+
- Maven (או `mvnw` / `mvnw.cmd`)

### הפעלה

```bash
./mvnw spring-boot:run
```

ב-Windows:

```cmd
mvnw.cmd spring-boot:run
```

השרת עולה על: **http://localhost:8585**

### H2 Console

- URL: http://localhost:8585/h2-console
- JDBC URL: `jdbc:h2:./AttractionProject1`
- Username: `sa`
- Password: `1234`

## מבנה הפרויקט

```
src/main/java/com/example/attractionproject/
├── Controller/     # REST API
├── Dto/            # Data Transfer Objects + Enums
├── model/          # JPA Entities
├── Repository/     # Spring Data JPA
└── Service/        # MapStruct Mapper
```

## API Endpoints

### Attraction — `api/Attraction`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל האטרקציות |
| GET | `/getAllDto` | אטרקציות כ-DTO |
| GET | `/get/{id}` | אטרקציה לפי id |
| GET | `/getDto/{id}` | אטרקציה לפי id כ-DTO |
| POST | `/add` | הוספת אטרקציה |
| POST | `/addDto` | הוספת אטרקציה (DTO) |
| PUT | `/update` | עדכון אטרקציה |
| PUT | `/updateDto` | עדכון אטרקציה (DTO) |
| DELETE | `/delete/{id}` | מחיקת אטרקציה |

### Traveler — `api/travel`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל המטיילים |
| GET | `/getAllDto` | מטיילים כ-DTO |
| GET | `/get/{id}` | מטייל לפי id |
| GET | `/getDto/{id}` | מטייל לפי id כ-DTO |
| POST | `/add` | הוספת מטייל |
| POST | `/addDto` | הוספת מטייל (DTO) |
| PUT | `/update` | עדכון מטייל |
| PUT | `/updateDto` | עדכון מטייל (DTO) |
| DELETE | `/delete/{id}` | מחיקת מטייל |

### Comments — `api/Comments`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל התגובות |
| GET | `/getAllDto` | תגובות כ-DTO |
| GET | `/get/{id}` | תגובה לפי id |
| GET | `/getDto/{id}` | תגובה לפי id כ-DTO |
| POST | `/add` | הוספת תגובה (תאריך אוטומטי אם חסר) |
| POST | `/addDto` | הוספת תגובה (DTO) |
| PUT | `/update` | עדכון תגובה |
| PUT | `/updateDto` | עדכון תגובה (DTO) |
| DELETE | `/delete/{id}` | מחיקת תגובה |

### ImageOfAttraction — `api/imageAttr`

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/getAll` | כל התמונות |
| GET | `/getAllDto` | תמונות כ-DTO (bytes) |
| GET | `/get/{id}` | תמונה לפי id |
| GET | `/getDto/{id}` | תמונה לפי id כ-DTO |
| POST | `/add` | הוספת תמונה |
| POST | `/addDto` | הוספת תמונה עם העלאת קובץ |
| PUT | `/update` | עדכון תמונה |
| PUT | `/updateDto` | עדכון תמונה (DTO) |
| DELETE | `/delete/{id}` | מחיקת תמונה |

תמונות נשמרות בתיקייה `images/` בשורש הפרויקט.

## ישויות

| ישות | שדות עיקריים |
|------|--------------|
| **Attraction** | שם, זמן, רמת קושי, גיל, מחיר, אזור, תמונות, תגובות |
| **Traveler** | שם, מייל, גיל, תגובות |
| **Comments** | תוכן, תאריך, קישור לאטרקציה ולמטייל |
| **ImageOfAttraction** | תמונה (קובץ / bytes), קישור לאטרקציה |

### Enums

- **DifficultyLevel**: קל, בינוני, קשה
- **Age**: תינוקות, ילדים, נערים, מבוגרים
- **Area**: צפון, דרום, מרכז, נגב

## סטטוס פיתוח

| רכיב | סטטוס |
|------|--------|
| Models + Repositories | ✅ |
| Controllers + CRUD | ✅ |
| DTOs + MapStruct | ✅ |
| העלאת תמונות | ✅ |
| Tests | ❌ |
| Frontend | ❌ |

## הרצת בדיקות

```bash
./mvnw test
```
