package com.example.attractionproject.model;
import jakarta.persistence.*;
@Entity
public class ImageOfAttraction {
    @Id//primary key
    @GeneratedValue
    private int idImage;//image id
    @ManyToOne
    @JoinColumn(name="id_Attraction")
    private Attraction Attraction;//attraction id
    private String img;//image
    public int getIdImage() {
        return idImage;
    }
    public void setIdImage(int idImage) {
        this.idImage = idImage;
    }
    public com.example.attractionproject.model.Attraction getAttraction() {
        return Attraction;
    }
    public void setAttraction(com.example.attractionproject.model.Attraction attraction) {
        Attraction = attraction;
    }
    public String getImg() {
        return img;
    }
    public void setImg(String img) {
        this.img = img;
    }

}
