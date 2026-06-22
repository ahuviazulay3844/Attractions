package com.example.attractionproject.model;
import com.example.attractionproject.Dto.Age;
import com.example.attractionproject.Dto.Area;
import com.example.attractionproject.Dto.DifficultyLevel;
import com.fasterxml.jackson.annotation.JsonIgnore;
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
//}//enum of route difficulty level
//enum Age{babies, children, teens, adults};//age
//enum Area {north, south, center, negev};//area
//creates the class
@Entity
public class Attraction {
    @Id//primary key
    @GeneratedValue
    //how to use @ManyToOne
    private int id;//id
    private String nameTraveler;//traveler name
    @JsonIgnore
    @OneToMany(mappedBy = "Attraction")
    private List<ImageOfAttraction> listImage;
    //list of images

    private LocalTime timeAttraction;//route or attraction time
    @Enumerated(EnumType.STRING)

    private DifficultyLevel difficultyLevel;//difficulty level easy medium hard
    @Enumerated(EnumType.STRING)
    private Age age;//ages suitable for route or attraction
    private int priceOfAttraction;//attraction price

    //list of comments
    @JsonIgnore
    @OneToMany(mappedBy = "idAttraction")
    private List<Comments> Comments;//comment
    @Enumerated(EnumType.STRING)
    private Area area;//area
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

    @JsonIgnore
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

    @JsonIgnore
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
