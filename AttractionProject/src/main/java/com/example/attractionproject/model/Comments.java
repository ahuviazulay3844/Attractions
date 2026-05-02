package com.example.attractionproject.model;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import java.time.LocalDate;
@Entity
//תגובות
public class Comments {
    @Id
    private  int idComments;//ת"ז תגובה
    @ManyToOne
    @JoinColumn(name="id_Attraction")
    private Attraction idAttraction;//,אטרקציה

    @ManyToOne
    @JoinColumn(name="id_traveler")

    private  Traveler traveler;//מטייל
    private  String content;//תגובת המטייל
    private LocalDate localDate;//תאריך תגובה
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

    public LocalDate getLocalDate() {
        return localDate;
    }

    public void setLocalDate(LocalDate localDate) {
        this.localDate = localDate;
    }


}
