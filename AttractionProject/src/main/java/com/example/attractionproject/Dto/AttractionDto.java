package com.example.attractionproject.Dto;



import com.example.attractionproject.model.Comments;
import com.example.attractionproject.model.ImageOfAttraction;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;

import java.time.LocalTime;
import java.util.List;


public class AttractionDto {

    private int id;//id
    private String nameTraveler;//traveler name


    private LocalTime timeAttraction;//route or attraction time


    private DifficultyLevel difficultyLevel;//difficulty level easy medium hard

    private Age age;//ages suitable for route or attraction
    private int priceOfAttraction;//attraction price

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
