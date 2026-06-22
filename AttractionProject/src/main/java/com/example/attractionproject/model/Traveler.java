package com.example.attractionproject.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

import java.util.List;

@Entity
public class Traveler {
    @Id
    @GeneratedValue
    private int idTraveler;//traveler id
    private String nameOfTraveler;//traveler name
    private String emailOfTraveler;//traveler email
    @OneToMany(mappedBy = "traveler")
    private List<Comments> Comments;//comment
    private int ageOfTraveler;//traveler age
    public int getIdTraveler() {
        return idTraveler;
    }

    public void setIdTraveler(int idTraveler) {
        this.idTraveler = idTraveler;
    }

    public String getNameOfTraveler() {
        return nameOfTraveler;
    }

    public void setNameOfTraveler(String nameOfTraveler) {
        this.nameOfTraveler = nameOfTraveler;
    }
    public String getEmailOfTraveler() {
        return emailOfTraveler;
    }

    public void setEmailOfTraveler(String emailOfTraveler) {
        this.emailOfTraveler = emailOfTraveler;
    }

    public List<com.example.attractionproject.model.Comments> getComments() {
        return Comments;
    }

    public void setComments(List<com.example.attractionproject.model.Comments> comments) {
        Comments = comments;
    }

    public int getAgeOfTraveler() {
        return ageOfTraveler;
    }

    public void setAgeOfTraveler(int ageOfTraveler) {
        this.ageOfTraveler = ageOfTraveler;
    }

}
