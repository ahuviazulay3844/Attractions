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

| Method | Path | תיאור |
|--------|------|--------|
| GET | `/api/Attraction/getAll` | כל האטרקציות |
| GET | `/api/Attraction/getAllDto` | אטרקציות כ-DTO |
| POST | `/api/Attraction/add` | הוספת אטרקציה |
| POST | `/api/Attraction/addDto` | הוספת אטרקציה (DTO) |
| GET | `/api/travel/getAll` | כל המטיילים |
| GET | `/api/travel/getAllDto` | מטיילים כ-DTO |
| POST | `/api/travel/add` | הוספת מטייל |
| POST | `/api/travel/addDto` | הוספת מטייל (DTO) |
| GET | `/api/Comments/getAll` | כל התגובות |
| GET | `/api/Comments/getAllDto` | תגובות כ-DTO |
| POST | `/api/Comments/add` | הוספת תגובה |
| POST | `/api/Comments/addDto` | הוספת תגובה (DTO) |
| GET | `/api/imageAttr/getAll` | כל התמונות |
| GET | `/api/imageAttr/getAllDto` | תמונות כ-DTO |
| POST | `/api/imageAttr/add` | הוספת תמונה |
| POST | `/api/imageAttr/addDto` | הוספת תמונה עם העלאת קובץ (בפיתוח) |

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
| Controllers בסיסיים | ⚠️ חלקי |
| DTOs + MapStruct | ⚠️ מיפוי לא שלם |
| העלאת תמונות | ❌ בפיתוח |
| CRUD מלא | ❌ |
| Tests | ❌ |
| Frontend | ❌ |

## TODO

- [ ] מחיקת `Controller/String.java` ו-`Controller/ResponseEntity.java` (שוברים קומפילציה)
- [ ] תיקון `ImageOfAttractionController` + imports חסרים
- [ ] השלמת MapStruct (מחיר, קושי, גיל, אזור)
- [ ] תיקון `@OneToMany` / `@ManyToOne` + `mappedBy`
- [ ] `@GeneratedValue` ל-Comments
- [ ] CRUD: GET by id, PUT, DELETE
- [ ] שכבת Service
- [ ] Validation + Exception handling
- [ ] בדיקות יחידה/אינטגרציה

## הרצת בדיקות

```bash
./mvnw test
```
