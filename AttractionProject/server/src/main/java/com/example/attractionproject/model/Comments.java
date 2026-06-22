package com.example.attractionproject.model;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
@Entity
//comments
public class Comments {
    @Id
    @GeneratedValue
    private  int idComments;//comment id
    @ManyToOne
    @JoinColumn(name="id_Attraction")
    private Attraction idAttraction;//attraction

    @ManyToOne
    @JoinColumn(name="id_traveler")

    private  Traveler traveler;//traveler
    private  String content;//traveler comment
    private Integer rating;//star rating 1-5, null = no rating
    private LocalDate localDate;//comment date
    public void setIdComments(int idComments) {
        this.idComments = idComments;
    }
    public Attraction getIdAttraction() {
        return idAttraction;
    }
    public int getIdComments() {
        return idComments;
    }
    public void setIdAttraction(Attraction idAttraction) {
        this.idAttraction = idAttraction;
    }
    public Traveler getTraveler() {
        return traveler;
    }
    public void setTraveler(Traveler traveler) {
        this.traveler = traveler;
    }
    public String getContent() {
        return content;
    }
    public void setContent(String content) {
        this.content = content;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public LocalDate getLocalDate() {
        return localDate;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }


}
