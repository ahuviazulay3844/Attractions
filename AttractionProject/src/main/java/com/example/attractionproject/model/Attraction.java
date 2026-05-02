package com.example.attractionproject.model;
import com.example.attractionproject.Dto.Age;
import com.example.attractionproject.Dto.Area;
import com.example.attractionproject.Dto.DifficultyLevel;
import jakarta.persistence.*;
import java.time.LocalTime;
import java.util.List;
// enum DifficultyLevel {
   // EASY,
   // MEDIUM,
    //HARD

//    private final String value;
//
//    DifficultyLevel(String value) {
//        this.value = value;
//    }
//
//    @JsonValue
//    public String getValue() {
//        return value;
//    }
//}//enumשל רמת קושי המסלול
//enum Age{תינוקות ,ילדים,נערים,מבוגרים};//גיל
//enum Area {צפון ,דרום,מרכז,נגב};//אזור
//יוצרת את המחלקה
@Entity
public class Attraction {
    @Id//מפתח
    @GeneratedValue
    //איך משתמשים מה לעשות @ManyToOne
    private int id;//תעודת זהות
    private String nameTraveler;//שם מטייל
    @OneToMany
    private List<ImageOfAttraction> listImage;
    //?רשימה ש תמונות איך עושים

    private LocalTime timeAttraction;//זמן מסלול או אטרקציה
    @Enumerated(EnumType.STRING)

    private DifficultyLevel difficultyLevel;//רמת קושי קל בינוני קשה
    @Enumerated(EnumType.STRING)
    private Age age;//גילאים המתאימים למסלול או לאטרציה
    private int priceOfAttraction;//מחיר לאטרקיציה

    // רשימה של תגובות?
    @OneToMany
    private List<Comments> Comments;//תגובה
    @Enumerated(EnumType.STRING)
    private Area area;//אזור
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getNameTraveler() {
        return nameTraveler;
    }

    public void setNameTraveler(String nameTraveler) {
        this.nameTraveler = nameTraveler;
    }

    public List<ImageOfAttraction> getListImage() {
        return listImage;
    }

    public void setListImage(List<ImageOfAttraction> listImage) {
        this.listImage = listImage;
    }

    public LocalTime getTimeAttraction() {
        return timeAttraction;
    }

    public void setTimeAttraction(LocalTime timeAttraction) {
        this.timeAttraction = timeAttraction;
    }

    public DifficultyLevel getDifficultyLevel() {
        return difficultyLevel;
    }

    public void setDifficultyLevel(DifficultyLevel difficultyLevel) {
        this.difficultyLevel = difficultyLevel;
    }

    public Age getAge() {
        return age;
    }

    public void setAge(Age age) {
        this.age = age;
    }

    public int getPriceOfAttraction() {
        return priceOfAttraction;
    }

    public void setPriceOfAttraction(int priceOfAttraction) {
        this.priceOfAttraction = priceOfAttraction;
    }

    public List<com.example.attractionproject.model.Comments> getComments() {
        return Comments;
    }

    public void setComments(List<com.example.attractionproject.model.Comments> comments) {
        Comments = comments;
    }

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }


}
