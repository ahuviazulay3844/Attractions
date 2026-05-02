package com.example.attractionproject.Dto;



import com.example.attractionproject.model.Comments;
import com.example.attractionproject.model.ImageOfAttraction;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;

import java.time.LocalTime;
import java.util.List;


public class AttractionDto {

    private int id;//תעודת זהות
    private String nameTraveler;//שם מטייל


    private LocalTime timeAttraction;//זמן מסלול או אטרקציה


    private DifficultyLevel difficultyLevel;//רמת קושי קל בינוני קשה

    private Age age;//גילאים המתאימים למסלול או לאטרציה
    private int priceOfAttraction;//מחיר לאטרקיציה

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

    public Area getArea() {
        return area;
    }

    public void setArea(Area area) {
        this.area = area;
    }
}
